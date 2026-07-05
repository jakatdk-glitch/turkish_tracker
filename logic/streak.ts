import { differenceInCalendarDays, format, parseISO } from 'date-fns';

export function todayStr(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

export interface StreakState {
  current_streak: number;
  longest_streak: number;
  last_session_date: string | null;
}

/**
 * Called once per completed session. Idempotent for repeat sessions on the
 * same day — the streak only advances on the first session of a new day.
 */
export function applySessionToStreak(state: StreakState, today: string = todayStr()): StreakState {
  if (state.last_session_date === today) {
    return state;
  }

  const daysSinceLast =
    state.last_session_date === null
      ? null
      : differenceInCalendarDays(parseISO(today), parseISO(state.last_session_date));

  const nextStreak = daysSinceLast === 1 ? state.current_streak + 1 : 1;

  return {
    current_streak: nextStreak,
    longest_streak: Math.max(state.longest_streak, nextStreak),
    last_session_date: today,
  };
}

/**
 * True once a day has passed with no session — used to show a "streak lost"
 * state on app open, independent of logging a new session.
 */
export function isStreakBroken(lastSessionDate: string | null, today: string = todayStr()): boolean {
  if (lastSessionDate === null) return false;
  const gap = differenceInCalendarDays(parseISO(today), parseISO(lastSessionDate));
  return gap > 1;
}
