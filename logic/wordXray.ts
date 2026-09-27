// Рентген слова: морфологический анализатор — обратная сторона движка.
// Кандидаты (точка разреза корня × комбинация суффиксов) проверяются
// пересборкой через attachChain, поэтому ложных «гармонически невозможных»
// разборов не бывает. Работает офлайн, без словарных баз.

import {
  attachChain,
  type CaseKey,
  type MorphNote,
  type MorphPart,
  type PersonKey,
} from './morphology';

export interface XrayResult {
  surface: string; // слово в нижнем регистре (или с апострофом-корнем как в оригинале)
  parts: MorphPart[];
  notes: MorphNote[];
  rootRu: string | null; // перевод корня из лексикона
  wholeRu: string | null; // перевод целого слова, если оно есть в лексиконе
}

// Турецкий нижний регистр: пары İ/i и I/ı локале-зависимы, остальное — Unicode.
export function trLower(s: string): string {
  return s.replace(/İ/g, 'i').replace(/I/g, 'ı').toLowerCase();
}

export function cleanToken(raw: string): string {
  return raw.replace(/[.,!?;:"«»„“()[\]{}…—–*]/g, '').trim();
}

const PERSONS: (PersonKey | null)[] = [null, '1sg', '2sg', '3sg', '1pl', '2pl', '3pl'];
const CASES: (CaseKey | null)[] = [null, 'loc', 'dat', 'abl', 'acc', 'gen'];
const UNSOFTEN: Record<string, string> = { b: 'p', c: 'ç', d: 't', ğ: 'k' };

interface Candidate {
  key: string; // тексты морфем — для дедупликации
  parts: MorphPart[];
  notes: MorphNote[];
  rootKnown: boolean;
  score: number;
}

interface CollectOptions {
  fixedRootLen?: number; // имя собственное: корень задан апострофом
  allowSoften?: boolean;
}

function collect(
  word: string,
  lexicon: Map<string, string>,
  opts: CollectOptions = {}
): Candidate[] {
  const byKey = new Map<string, Candidate>();
  const rootLens = opts.fixedRootLen
    ? [opts.fixedRootLen]
    : Array.from({ length: Math.max(0, word.length - 1) }, (_, i) => i + 2);
  const allowSoften = opts.allowSoften ?? true;

  for (const len of rootLens) {
    if (len > word.length) continue;
    const rootSurface = word.slice(0, len);
    const variants: { dictRoot: string; soften: boolean }[] = [
      { dictRoot: rootSurface, soften: false },
    ];
    const soft = UNSOFTEN[rootSurface[len - 1]];
    if (allowSoften && soft && len < word.length) {
      variants.push({ dictRoot: rootSurface.slice(0, -1) + soft, soften: true });
    }

    for (const variant of variants) {
      const known = lexicon.has(variant.dictRoot);
      // Против ложных разборов: неизвестный корень короче 3 букв не предлагаем
      // (иначе güler «расшифруется» как gü + ler). Для имён собственных корень задан.
      if (!known && !opts.fixedRootLen && variant.dictRoot.length < 3) continue;

      for (const plural of [false, true]) {
        for (const possessive of PERSONS) {
          for (const grammarCase of CASES) {
            if (!plural && !possessive && !grammarCase) {
              // Слово без суффиксов — только если оно целиком в лексиконе.
              if (len === word.length && known && !variant.soften) {
                pushCandidate(byKey, {
                  key: variant.dictRoot,
                  parts: [
                    {
                      text: variant.dictRoot,
                      kind: 'root',
                      gloss: lexicon.get(variant.dictRoot) ?? '',
                    },
                  ],
                  notes: [],
                  rootKnown: true,
                  score: 1000 + len * 10 + 30,
                });
              }
              continue;
            }

            const built = attachChain(variant.dictRoot, variant.soften, {
              plural,
              possessive,
              grammarCase,
            });
            if (built.surface !== word) continue;

            const parts = built.parts.map((p, i) =>
              i === 0 ? { ...p, gloss: lexicon.get(variant.dictRoot) ?? '?' } : p
            );
            pushCandidate(byKey, {
              key: parts.map((p) => p.text).join('|'),
              parts,
              notes: built.notes,
              rootKnown: known,
              score:
                (known ? 1000 : 0) + len * 10 + parts.length * 30 + (variant.soften ? 2 : 0),
            });
          }
        }
      }
    }
  }

  return [...byKey.values()].sort((a, b) => b.score - a.score);
}

// Дедупликация одинаковых сегментаций. Побеждает кандидат с большим счётом
// (kitabı: «kitap + озвончение» бьёт неизвестный корень «kitab»), а глоссы
// различающихся морфем объединяются: evleri — «кого? что? / его/её / их».
function pushCandidate(byKey: Map<string, Candidate>, cand: Candidate) {
  const existing = byKey.get(cand.key);
  if (!existing) {
    byKey.set(cand.key, cand);
    return;
  }
  const winner = cand.score > existing.score ? cand : existing;
  const loser = winner === cand ? existing : cand;
  winner.parts = winner.parts.map((p, i) => {
    const other = loser.parts[i]?.gloss;
    if (!other || other === '?' || other === p.gloss) return p;
    if (!p.gloss || p.gloss === '?') return p; // «?» корня не смешиваем с переводом
    const merged = new Set([...p.gloss.split(' / '), ...other.split(' / ')]);
    return { ...p, gloss: [...merged].join(' / ') };
  });
  byKey.set(cand.key, winner);
}

function formatParse(parts: MorphPart[]): string {
  const chain = parts.map((p) => p.text).join('-');
  const gloss = parts.map((p) => p.gloss || '?').join(' + ');
  return `${chain} («${gloss}»)`;
}

export function analyzeWord(raw: string, lexicon: Map<string, string>): XrayResult | null {
  const cleaned = cleanToken(raw);
  if (!cleaned) return null;

  // Имя собственное: İstanbul'da — корень задан апострофом.
  const apos = cleaned.search(/['’]/);
  if (apos > 0 && apos < cleaned.length - 1) {
    return analyzeProper(cleaned, apos, lexicon);
  }

  const word = trLower(cleaned.replace(/['’]/g, ''));
  if (!word) return null;
  const wholeRu = lexicon.get(word) ?? null;

  const candidates = collect(word, lexicon);
  if (candidates.length === 0) {
    if (!wholeRu) return null;
    return {
      surface: word,
      parts: [{ text: word, kind: 'root', gloss: wholeRu }],
      notes: [],
      rootRu: wholeRu,
      wholeRu,
    };
  }

  const best = candidates[0];
  const notes = [...best.notes];
  // Честно показываем равновероятный альтернативный разбор (evinde: твой/его).
  const alt = candidates.find((c) => c !== best && c.score === best.score);
  if (alt) {
    notes.push({
      title: 'другой вариант',
      text: `Это слово можно разобрать и так: ${formatParse(alt.parts)}.`,
    });
  }

  return {
    surface: word,
    parts: best.parts,
    notes,
    rootRu: best.rootKnown ? best.parts[0].gloss : null,
    wholeRu,
  };
}

function analyzeProper(
  cleaned: string,
  apos: number,
  lexicon: Map<string, string>
): XrayResult | null {
  const rootDisplay = cleaned.slice(0, apos);
  const rootLower = trLower(rootDisplay);
  const suffix = trLower(cleaned.slice(apos + 1));
  if (!rootLower || !suffix) return null;

  const word = rootLower + suffix;
  const candidates = collect(word, lexicon, {
    fixedRootLen: rootLower.length,
    allowSoften: false, // на письме имена собственные не озвончаются: Zonguldak'a
  });
  if (candidates.length === 0) return null;

  const best = candidates[0];
  const rootRu = lexicon.get(rootLower) ?? null;
  const parts = best.parts.map((p, i) =>
    i === 0 ? { ...p, text: rootDisplay + '’', gloss: rootRu ?? 'имя собственное' } : p
  );
  return {
    surface: rootDisplay + '’' + parts.slice(1).map((p) => p.text).join(''),
    parts,
    notes: [
      ...best.notes,
      {
        title: 'апостроф',
        text: 'Суффиксы к именам собственным присоединяются через апостроф: İstanbul’da.',
      },
    ],
    rootRu,
    wholeRu: null,
  };
}
