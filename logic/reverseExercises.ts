import type { Exercise, VocabItem } from '@/logic/course';

// Сколько обратных упражнений добавлять к юниту максимум.
const MAX_REVERSE = 4;
// Минимум слов, чтобы набрать правильный вариант + 3 отвлекающих.
const MIN_VOCAB = 4;

/**
 * Генерирует «продуктивные» упражнения РУ→ТУР: показываем русское слово, просим
 * выбрать турецкое из 4 вариантов. Отвлекающие варианты берём из словаря того же
 * юнита. В отличие от узнавания (ТУР→РУ), это заставляет вспоминать форму активно.
 *
 * Детерминировано (без Math.random): позиция правильного варианта и набор
 * отвлекающих зависят только от индекса — очередь стабильна между рендерами.
 */
export function buildReverseChoices(vocab: VocabItem[], max = MAX_REVERSE): Exercise[] {
  // Оставляем слова с уникальным русским переводом — иначе среди вариантов
  // окажется два правильных ответа (напр. два «пока»).
  const seenRu = new Set<string>();
  const pool = vocab.filter((v) => {
    const key = v.ru.toLowerCase();
    if (seenRu.has(key)) return false;
    seenRu.add(key);
    return true;
  });
  if (pool.length < MIN_VOCAB) return [];

  const count = Math.min(max, pool.length);
  const exercises: Exercise[] = [];
  for (let i = 0; i < count; i++) {
    const answer = pool[i];
    const others = pool.filter((_, j) => j !== i);
    // Три разных отвлекающих через скользящее окно по остальным словам.
    const distractors = [0, 1, 2].map((k) => others[(i + k) % others.length]);
    const correctPos = i % 4;
    const options = [...distractors];
    options.splice(correctPos, 0, answer);
    exercises.push({
      type: 'choice',
      prompt: answer.ru,
      promptIsTurkish: false,
      options: options.map((o) => o.tr),
      correct: correctPos,
      explain: `«${answer.ru}» по-турецки — ${answer.tr}.`,
    });
  }
  return exercises;
}
