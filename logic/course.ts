// Типы контента курса (v2). Контент лежит в data/course/.

export interface CourseModule {
  id: string;
  title: string;
  units: UnitMeta[];
}

export interface UnitMeta {
  id: string;
  title: string;
  emoji: string;
}

export type TheoryBlock =
  | { type: 'text'; text: string }
  | { type: 'table'; title?: string; headers: string[]; rows: string[][] }
  // Примеры с озвучкой турецкой части
  | { type: 'examples'; title?: string; items: { tr: string; ru: string }[] }
  | { type: 'tip'; text: string };

export interface VocabItem {
  tr: string;
  ru: string;
}

export type Exercise =
  | {
      type: 'choice';
      prompt: string;
      promptIsTurkish: boolean; // озвучивать ли prompt
      options: string[];
      correct: number; // индекс в options
      explain?: string;
    }
  | { type: 'match'; pairs: VocabItem[] }
  | { type: 'flashcard'; tr: string; ru: string }
  | {
      type: 'assemble';
      ru: string; // что нужно сказать
      words: string[]; // банк слов (в перемешанном порядке)
      correct: string; // правильное предложение
      explain?: string;
    }
  | {
      type: 'blank';
      sentence: string; // с ___ на месте пропуска
      ru: string;
      options: string[];
      correct: number;
      explain?: string;
    }
  | {
      type: 'listen';
      tr: string; // что озвучить
      options: string[];
      correct: number;
    };

export interface UnitContent {
  id: string;
  title: string;
  theory: TheoryBlock[];
  vocab: VocabItem[];
  exercises: Exercise[];
  test: Exercise[];
}

export type UnitStatus = 'done' | 'available' | 'locked';

/**
 * Статусы юнитов: пройденные — done, первый непройденный — available,
 * остальные — locked. Порядок задаётся манифестом курса.
 */
export function computeUnitStatuses(
  modules: CourseModule[],
  completedIds: Set<string>
): Map<string, UnitStatus> {
  const statuses = new Map<string, UnitStatus>();
  let availableGiven = false;
  for (const module of modules) {
    for (const unit of module.units) {
      if (completedIds.has(unit.id)) {
        statuses.set(unit.id, 'done');
      } else if (!availableGiven) {
        statuses.set(unit.id, 'available');
        availableGiven = true;
      } else {
        statuses.set(unit.id, 'locked');
      }
    }
  }
  return statuses;
}
