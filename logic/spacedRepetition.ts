import { addDays, format } from 'date-fns';

export type Grade = 'again' | 'hard' | 'good' | 'easy';

// SM-2 quality scale is 0-5; "again" is treated as a failed recall (<3).
const QUALITY_BY_GRADE: Record<Grade, number> = {
  again: 1,
  hard: 3,
  good: 4,
  easy: 5,
};

export interface CardReviewState {
  ease_factor: number;
  interval_days: number;
  repetitions: number;
}

export interface CardReviewResult extends CardReviewState {
  next_review_date: string;
}

/** SM-2 spaced repetition scheduling. */
export function scheduleNextReview(
  state: CardReviewState,
  grade: Grade,
  today: Date = new Date()
): CardReviewResult {
  const quality = QUALITY_BY_GRADE[grade];

  let { repetitions, interval_days: interval } = state;
  let easeFactor = state.ease_factor;

  if (quality < 3) {
    repetitions = 0;
    interval = 1;
  } else {
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  }

  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (easeFactor < 1.3) easeFactor = 1.3;

  return {
    ease_factor: easeFactor,
    interval_days: interval,
    repetitions,
    next_review_date: format(addDays(today, interval), 'yyyy-MM-dd'),
  };
}
