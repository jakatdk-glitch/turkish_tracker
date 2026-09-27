import type { Exercise } from '@/logic/course';

export interface ExerciseDigest {
  prompt: string;
  answer: string;
  explain?: string;
}

/**
 * Короткое описание упражнения для «работы над ошибками»: что спрашивали,
 * какой правильный ответ и (если есть) пояснение.
 */
export function describeExercise(ex: Exercise): ExerciseDigest {
  switch (ex.type) {
    case 'choice':
      return { prompt: ex.prompt, answer: ex.options[ex.correct], explain: ex.explain };
    case 'blank':
      return {
        prompt: `${ex.sentence} (${ex.ru})`,
        answer: ex.options[ex.correct],
        explain: ex.explain,
      };
    case 'assemble':
      return { prompt: ex.ru, answer: ex.correct, explain: ex.explain };
    case 'flashcard':
      return { prompt: ex.tr, answer: ex.ru };
    case 'match':
      return {
        prompt: 'Соедини пары',
        answer: ex.pairs.map((p) => `${p.tr} — ${p.ru}`).join(', '),
      };
    case 'morph':
      return {
        prompt: ex.ru,
        answer: ex.rootText + ex.suffixes.join(''),
        explain: ex.explain,
      };
    case 'listen':
      return { prompt: 'Аудирование', answer: ex.options[ex.correct] };
  }
}
