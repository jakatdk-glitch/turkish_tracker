// Движок турецкой именной морфологии: корень + мн. число + притяжательность + падеж.
// Все правила детерминированы (гармония гласных, смягчение/отвердение согласных,
// буферные буквы), поэтому слова и переводы собираются на лету, офлайн.

export type PersonKey = '1sg' | '2sg' | '3sg' | '1pl' | '2pl' | '3pl';
export type CaseKey = 'loc' | 'dat' | 'abl' | 'acc' | 'gen';

export interface MorphChoices {
  plural: boolean;
  possessive: PersonKey | null;
  grammarCase: CaseKey | null;
}

export type MorphKind = 'root' | 'plural' | 'possessive' | 'case';

export interface MorphPart {
  text: string;
  kind: MorphKind;
  gloss: string;
}

export interface MorphNote {
  title: string;
  text: string;
}

export interface BuiltWord {
  surface: string;
  parts: MorphPart[];
  notes: MorphNote[];
  ru: string;
}

// ---------- Русская сторона: склонение для живого перевода ----------

type RuCase = 'nom' | 'gen' | 'dat' | 'acc' | 'loc';
type RuGender = 'm' | 'f' | 'n';

interface RuForms {
  nom: string;
  gen: string;
  dat: string;
  acc: string;
  loc: string;
}

export interface MorphRoot {
  tr: string;
  // Финальная глухая p/ç/t/k озвончается перед суффиксом на гласную (kitap → kitabım).
  soften?: boolean;
  gender: RuGender;
  sg: RuForms;
  pl: RuForms;
  locPrep: 'в' | 'на';
  dirPrep: 'в' | 'на' | 'к';
  ablPrep: 'из' | 'с' | 'от';
}

const POSS_LABEL: Record<PersonKey, string> = {
  '1sg': 'мой',
  '2sg': 'твой',
  '3sg': 'его/её',
  '1pl': 'наш',
  '2pl': 'ваш',
  '3pl': 'их',
};

export const CASE_LABEL: Record<CaseKey, string> = {
  loc: 'где?',
  dat: 'куда?',
  abl: 'откуда?',
  acc: 'кого? что?',
  gen: 'чей?',
};

type DeclinablePerson = '1sg' | '2sg' | '1pl' | '2pl';

const POSS_RU: Record<DeclinablePerson, Record<RuGender | 'pl', RuForms>> = {
  '1sg': {
    m: { nom: 'мой', gen: 'моего', dat: 'моему', acc: 'мой', loc: 'моём' },
    f: { nom: 'моя', gen: 'моей', dat: 'моей', acc: 'мою', loc: 'моей' },
    n: { nom: 'моё', gen: 'моего', dat: 'моему', acc: 'моё', loc: 'моём' },
    pl: { nom: 'мои', gen: 'моих', dat: 'моим', acc: 'мои', loc: 'моих' },
  },
  '2sg': {
    m: { nom: 'твой', gen: 'твоего', dat: 'твоему', acc: 'твой', loc: 'твоём' },
    f: { nom: 'твоя', gen: 'твоей', dat: 'твоей', acc: 'твою', loc: 'твоей' },
    n: { nom: 'твоё', gen: 'твоего', dat: 'твоему', acc: 'твоё', loc: 'твоём' },
    pl: { nom: 'твои', gen: 'твоих', dat: 'твоим', acc: 'твои', loc: 'твоих' },
  },
  '1pl': {
    m: { nom: 'наш', gen: 'нашего', dat: 'нашему', acc: 'наш', loc: 'нашем' },
    f: { nom: 'наша', gen: 'нашей', dat: 'нашей', acc: 'нашу', loc: 'нашей' },
    n: { nom: 'наше', gen: 'нашего', dat: 'нашему', acc: 'наше', loc: 'нашем' },
    pl: { nom: 'наши', gen: 'наших', dat: 'нашим', acc: 'наши', loc: 'наших' },
  },
  '2pl': {
    m: { nom: 'ваш', gen: 'вашего', dat: 'вашему', acc: 'ваш', loc: 'вашем' },
    f: { nom: 'ваша', gen: 'вашей', dat: 'вашей', acc: 'вашу', loc: 'вашей' },
    n: { nom: 'ваше', gen: 'вашего', dat: 'вашему', acc: 'ваше', loc: 'вашем' },
    pl: { nom: 'ваши', gen: 'ваших', dat: 'вашим', acc: 'ваши', loc: 'ваших' },
  },
};

function possRu(person: PersonKey, gender: RuGender, plural: boolean, cas: RuCase): string {
  if (person === '3sg') return 'его';
  if (person === '3pl') return 'их';
  const table = POSS_RU[person];
  return plural ? table.pl[cas] : table[gender][cas];
}

// ---------- Турецкая сторона: фонетика ----------

const VOWELS = 'aıoueiöü';
const BACK_VOWELS = 'aıou';
const VOICELESS = 'pçtkfsşh'; // мнемоника: fıstıkçı şahap
const SOFTEN_MAP: Record<string, string> = { p: 'b', ç: 'c', t: 'd', k: 'ğ' };
const HARMONY_FLIP: Record<string, string> = {
  a: 'e', e: 'a', ı: 'i', i: 'ı', u: 'ü', ü: 'u', o: 'ö', ö: 'o',
};

export function isVowel(ch: string): boolean {
  return VOWELS.includes(ch);
}

export function isBackVowel(ch: string): boolean {
  return BACK_VOWELS.includes(ch);
}

function lastVowel(s: string): string {
  for (let i = s.length - 1; i >= 0; i--) {
    if (VOWELS.includes(s[i])) return s[i];
  }
  return 'e';
}

// Гармония на 2: a/ı/o/u → a, e/i/ö/ü → e.
function harmonyA(s: string): 'a' | 'e' {
  return BACK_VOWELS.includes(lastVowel(s)) ? 'a' : 'e';
}

// Гармония на 4: a/ı → ı, o/u → u, e/i → i, ö/ü → ü.
function harmonyI(s: string): 'ı' | 'i' | 'u' | 'ü' {
  const v = lastVowel(s);
  if (v === 'a' || v === 'ı') return 'ı';
  if (v === 'o' || v === 'u') return 'u';
  if (v === 'ö' || v === 'ü') return 'ü';
  return 'i';
}

function endsWithVowel(s: string): boolean {
  return VOWELS.includes(s[s.length - 1]);
}

// ---------- Сборка слова ----------

export interface AttachResult {
  surface: string;
  parts: MorphPart[];
  notes: MorphNote[];
}

/**
 * Низкоуровневая сборка поверхности: корень + суффиксы по правилам гармонии.
 * Используется и генератором (buildWord), и рентгеном слова — анализ
 * проверяется пересборкой кандидата.
 */
export function attachChain(
  rootText: string,
  soften: boolean,
  choices: MorphChoices
): AttachResult {
  const parts: MorphPart[] = [{ text: rootText, kind: 'root', gloss: '' }];
  const notes: MorphNote[] = [];
  let cur = rootText;

  const append = (text: string, kind: MorphKind, gloss: string) => {
    parts.push({ text, kind, gloss });
    cur += text;
  };

  // Озвончение финальной глухой согласной корня перед суффиксом на гласную.
  const maybeSoften = (suffix: string) => {
    if (!soften || cur !== rootText || !VOWELS.includes(suffix[0])) return;
    const last = cur[cur.length - 1];
    const soft = SOFTEN_MAP[last];
    if (!soft) return;
    parts[0] = { ...parts[0], text: rootText.slice(0, -1) + soft };
    cur = parts[0].text;
    notes.push({
      title: `${last} → ${soft}`,
      text: `Глухая ${last} на конце корня озвончается перед суффиксом на гласную: ${rootText} → ${cur}…`,
    });
  };

  const poss = choices.possessive;

  if (choices.plural) {
    append('l' + harmonyA(cur) + 'r', 'plural', 'мн. ч.');
  }

  if (poss) {
    const v = endsWithVowel(cur);
    let text = '';
    switch (poss) {
      case '1sg':
        text = v ? 'm' : harmonyI(cur) + 'm';
        break;
      case '2sg':
        text = v ? 'n' : harmonyI(cur) + 'n';
        break;
      case '3sg':
        if (v) {
          text = 's' + harmonyI(cur);
          notes.push({
            title: 'буфер s',
            text: 'Две гласные не встречаются: между корнем и суффиксом «его/её» появляется s.',
          });
        } else {
          text = harmonyI(cur);
        }
        break;
      case '1pl': {
        text = v ? 'm' : harmonyI(cur) + 'm';
        text += harmonyI(cur + text) + 'z';
        break;
      }
      case '2pl': {
        text = v ? 'n' : harmonyI(cur) + 'n';
        text += harmonyI(cur + text) + 'z';
        break;
      }
      case '3pl': {
        if (choices.plural) {
          // evler + i: показатель мн. числа уже есть.
          text = harmonyI(cur);
        } else {
          const lar = 'l' + harmonyA(cur) + 'r';
          text = lar + harmonyI(cur + lar);
        }
        break;
      }
    }
    maybeSoften(text);
    append(text, 'possessive', POSS_LABEL[poss]);
  }

  if (choices.grammarCase) {
    // После притяжательного 3-го лица падеж крепится через соединительную n.
    const after3 = poss === '3sg' || poss === '3pl';
    const v = endsWithVowel(cur);
    let text = '';
    switch (choices.grammarCase) {
      case 'loc': {
        const hard = !after3 && VOICELESS.includes(cur[cur.length - 1]);
        text = (after3 ? 'n' : '') + (hard ? 't' : 'd') + harmonyA(cur);
        if (hard) {
          notes.push({
            title: 'd → t',
            text: 'После глухой согласной суффикс -da отвердевает: kitap + da → kitapta.',
          });
        }
        break;
      }
      case 'abl': {
        const hard = !after3 && VOICELESS.includes(cur[cur.length - 1]);
        text = (after3 ? 'n' : '') + (hard ? 't' : 'd') + harmonyA(cur) + 'n';
        if (hard) {
          notes.push({
            title: 'd → t',
            text: 'После глухой согласной суффикс -dan отвердевает: kitap + dan → kitaptan.',
          });
        }
        break;
      }
      case 'dat': {
        if (after3) {
          text = 'n' + harmonyA(cur);
        } else if (v) {
          text = 'y' + harmonyA(cur);
          notes.push({
            title: 'буфер y',
            text: 'Две гласные не встречаются: перед падежом появляется y (araba + a → arabaya).',
          });
        } else {
          text = harmonyA(cur);
        }
        break;
      }
      case 'acc': {
        if (after3) {
          text = 'n' + harmonyI(cur);
        } else if (v) {
          text = 'y' + harmonyI(cur);
          notes.push({
            title: 'буфер y',
            text: 'Две гласные не встречаются: перед падежом появляется y (araba + ı → arabayı).',
          });
        } else {
          text = harmonyI(cur);
        }
        break;
      }
      case 'gen': {
        text = (v ? 'n' : '') + harmonyI(cur) + 'n';
        if (v && !after3) {
          notes.push({
            title: 'буфер n',
            text: 'В родительном падеже после гласной появляется n: araba + ın → arabanın.',
          });
        }
        break;
      }
    }
    if (after3 && text.startsWith('n')) {
      notes.push({
        title: 'буфер n',
        text: 'После притяжательного 3-го лица падеж присоединяется через n: evi + de → evinde.',
      });
    }
    maybeSoften(text);
    append(text, 'case', CASE_LABEL[choices.grammarCase]);
  }

  return { surface: cur, parts, notes };
}

export function buildWord(root: MorphRoot, choices: MorphChoices): BuiltWord {
  const r = attachChain(root.tr, !!root.soften, choices);
  r.parts[0] = { ...r.parts[0], gloss: root.sg.nom };
  return { ...r, ru: buildRu(root, choices) };
}

function buildRu(root: MorphRoot, choices: MorphChoices): string {
  const plural = choices.plural;
  const noun = plural ? root.pl : root.sg;
  let cas: RuCase = 'nom';
  let prefix = '';
  switch (choices.grammarCase) {
    case 'loc':
      cas = 'loc';
      prefix = root.locPrep + ' ';
      break;
    case 'dat':
      // Направление: «в дом» (в/на + вин.), «к врачу» (к + дат.).
      cas = root.dirPrep === 'к' ? 'dat' : 'acc';
      prefix = root.dirPrep + ' ';
      break;
    case 'abl':
      cas = 'gen';
      prefix = root.ablPrep + ' ';
      break;
    case 'acc':
      cas = 'acc';
      break;
    case 'gen':
      cas = 'gen';
      break;
  }
  const possStr = choices.possessive
    ? possRu(choices.possessive, root.gender, plural, cas)
    : '';
  return (prefix + [possStr, noun[cas]].filter(Boolean).join(' ')).trim();
}

// ---------- Корни для лаборатории ----------

export const MORPH_ROOTS: MorphRoot[] = [
  {
    tr: 'ev', gender: 'm', locPrep: 'в', dirPrep: 'в', ablPrep: 'из',
    sg: { nom: 'дом', gen: 'дома', dat: 'дому', acc: 'дом', loc: 'доме' },
    pl: { nom: 'дома', gen: 'домов', dat: 'домам', acc: 'дома', loc: 'домах' },
  },
  {
    tr: 'araba', gender: 'f', locPrep: 'в', dirPrep: 'в', ablPrep: 'из',
    sg: { nom: 'машина', gen: 'машины', dat: 'машине', acc: 'машину', loc: 'машине' },
    pl: { nom: 'машины', gen: 'машин', dat: 'машинам', acc: 'машины', loc: 'машинах' },
  },
  {
    tr: 'kitap', soften: true, gender: 'f', locPrep: 'в', dirPrep: 'в', ablPrep: 'из',
    sg: { nom: 'книга', gen: 'книги', dat: 'книге', acc: 'книгу', loc: 'книге' },
    pl: { nom: 'книги', gen: 'книг', dat: 'книгам', acc: 'книги', loc: 'книгах' },
  },
  {
    tr: 'okul', gender: 'f', locPrep: 'в', dirPrep: 'в', ablPrep: 'из',
    sg: { nom: 'школа', gen: 'школы', dat: 'школе', acc: 'школу', loc: 'школе' },
    pl: { nom: 'школы', gen: 'школ', dat: 'школам', acc: 'школы', loc: 'школах' },
  },
  {
    tr: 'çanta', gender: 'f', locPrep: 'в', dirPrep: 'в', ablPrep: 'из',
    sg: { nom: 'сумка', gen: 'сумки', dat: 'сумке', acc: 'сумку', loc: 'сумке' },
    pl: { nom: 'сумки', gen: 'сумок', dat: 'сумкам', acc: 'сумки', loc: 'сумках' },
  },
  {
    tr: 'otel', gender: 'm', locPrep: 'в', dirPrep: 'в', ablPrep: 'из',
    sg: { nom: 'отель', gen: 'отеля', dat: 'отелю', acc: 'отель', loc: 'отеле' },
    pl: { nom: 'отели', gen: 'отелей', dat: 'отелям', acc: 'отели', loc: 'отелях' },
  },
  {
    tr: 'köy', gender: 'f', locPrep: 'в', dirPrep: 'в', ablPrep: 'из',
    sg: { nom: 'деревня', gen: 'деревни', dat: 'деревне', acc: 'деревню', loc: 'деревне' },
    pl: { nom: 'деревни', gen: 'деревень', dat: 'деревням', acc: 'деревни', loc: 'деревнях' },
  },
  {
    tr: 'bahçe', gender: 'm', locPrep: 'в', dirPrep: 'в', ablPrep: 'из',
    sg: { nom: 'сад', gen: 'сада', dat: 'саду', acc: 'сад', loc: 'саду' },
    pl: { nom: 'сады', gen: 'садов', dat: 'садам', acc: 'сады', loc: 'садах' },
  },
  {
    tr: 'dolap', soften: true, gender: 'm', locPrep: 'в', dirPrep: 'в', ablPrep: 'из',
    sg: { nom: 'шкаф', gen: 'шкафа', dat: 'шкафу', acc: 'шкаф', loc: 'шкафу' },
    pl: { nom: 'шкафы', gen: 'шкафов', dat: 'шкафам', acc: 'шкафы', loc: 'шкафах' },
  },
  {
    tr: 'durak', soften: true, gender: 'f', locPrep: 'на', dirPrep: 'на', ablPrep: 'с',
    sg: { nom: 'остановка', gen: 'остановки', dat: 'остановке', acc: 'остановку', loc: 'остановке' },
    pl: { nom: 'остановки', gen: 'остановок', dat: 'остановкам', acc: 'остановки', loc: 'остановках' },
  },
  {
    tr: 'deniz', gender: 'n', locPrep: 'в', dirPrep: 'в', ablPrep: 'из',
    sg: { nom: 'море', gen: 'моря', dat: 'морю', acc: 'море', loc: 'море' },
    pl: { nom: 'моря', gen: 'морей', dat: 'морям', acc: 'моря', loc: 'морях' },
  },
  {
    tr: 'telefon', gender: 'm', locPrep: 'в', dirPrep: 'в', ablPrep: 'из',
    sg: { nom: 'телефон', gen: 'телефона', dat: 'телефону', acc: 'телефон', loc: 'телефоне' },
    pl: { nom: 'телефоны', gen: 'телефонов', dat: 'телефонам', acc: 'телефоны', loc: 'телефонах' },
  },
];

// ---------- Генератор заданий «собери слово» ----------

export interface MorphChallenge {
  ru: string;
  rootText: string; // поверхностная форма корня (уже озвончённая: kitab-)
  rootRu: string;
  suffixes: string[];
  distractors: string[];
  surface: string;
  explain?: string;
}

function flipHarmony(suffix: string): string {
  return suffix
    .split('')
    .map((ch) => HARMONY_FLIP[ch] ?? ch)
    .join('');
}

const PERSON_POOL: (PersonKey | null)[] = [null, null, '1sg', '2sg', '3sg', '1pl', '2pl', '3pl'];
const CASE_POOL: (CaseKey | null)[] = [null, null, 'loc', 'dat', 'abl', 'acc', 'gen'];

export function generateChallenge(rand: () => number = Math.random): MorphChallenge {
  const pick = <T,>(arr: T[]): T => arr[Math.floor(rand() * arr.length)];

  const root = pick(MORPH_ROOTS);
  let choices: MorphChoices = {
    plural: rand() < 0.45,
    possessive: pick(PERSON_POOL),
    grammarCase: pick(CASE_POOL),
  };
  if (!choices.plural && !choices.possessive && !choices.grammarCase) {
    choices = { ...choices, grammarCase: pick(['loc', 'dat', 'abl'] as CaseKey[]) };
  }

  const built = buildWord(root, choices);
  const suffixes = built.parts.slice(1).map((p) => p.text);

  const distractors: string[] = [];
  for (const s of suffixes) {
    const flipped = flipHarmony(s);
    if (flipped !== s && !suffixes.includes(flipped) && !distractors.includes(flipped)) {
      distractors.push(flipped);
    }
  }
  // Дистрактор на отвердение/озвончение d↔t для падежных суффиксов.
  const caseSuffix = suffixes[suffixes.length - 1];
  if (choices.grammarCase === 'loc' || choices.grammarCase === 'abl') {
    const swapped = caseSuffix.startsWith('t')
      ? 'd' + caseSuffix.slice(1)
      : caseSuffix.startsWith('d')
        ? 't' + caseSuffix.slice(1)
        : null;
    if (swapped && !suffixes.includes(swapped) && !distractors.includes(swapped)) {
      distractors.push(swapped);
    }
  }

  // Подсказка вопросом, если перевод без предлога неоднозначен.
  let ru = built.ru;
  if (choices.grammarCase === 'acc') ru += ' (кого? что?)';
  if (choices.grammarCase === 'gen') ru += ' (чей?)';

  return {
    ru,
    rootText: built.parts[0].text,
    rootRu: root.sg.nom,
    suffixes,
    distractors,
    surface: built.surface,
    explain: built.notes.map((n) => `${n.title}: ${n.text}`).join('\n') || undefined,
  };
}
