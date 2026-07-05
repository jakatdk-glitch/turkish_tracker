import {
  completeUnit,
  countReviewedCards,
  createSession,
  getProfile,
  getSessionCount,
  listAchievements,
  unlockAchievement,
  updateProfile,
} from '@/db/queries';
import { ACHIEVEMENT_DEFS } from '@/db/schema';
import { applySessionToStreak, todayStr } from '@/logic/streak';
import { getNewlyUnlockedKeys } from '@/logic/achievements';

export const UNIT_XP = 30; // за сдачу теста юнита
export const PRACTICE_XP = 10; // за прохождение практики
export const TEST_PASS_THRESHOLD = 70; // процент для зачёта

export interface SessionRewards {
  xpEarned: number;
  currentStreak: number;
  newlyUnlockedTitles: string[];
}

/** Общие награды за занятие: сессия, XP, стрик, проверка достижений. */
async function grantSessionRewards(
  xpEarned: number,
  durationMinutes: number
): Promise<SessionRewards> {
  const today = todayStr();

  await createSession({
    date: today,
    duration_minutes: Math.max(1, durationMinutes),
    xp_earned: xpEarned,
    lesson_id: null,
  });

  const profile = await getProfile();
  const streakState = applySessionToStreak(
    {
      current_streak: profile.current_streak,
      longest_streak: profile.longest_streak,
      last_session_date: profile.last_session_date,
    },
    today
  );
  await updateProfile({ ...streakState, total_xp: profile.total_xp + xpEarned });

  const [sessionCount, reviewedCardCount, achievements] = await Promise.all([
    getSessionCount(),
    countReviewedCards(),
    listAchievements(),
  ]);
  const alreadyUnlocked = new Set(
    achievements.filter((a) => a.unlocked_at !== null).map((a) => a.key)
  );
  const newlyUnlockedKeys = getNewlyUnlockedKeys(
    { currentStreak: streakState.current_streak, reviewedCardCount, sessionCount },
    alreadyUnlocked
  );
  for (const key of newlyUnlockedKeys) {
    await unlockAchievement(key, today);
  }

  return {
    xpEarned,
    currentStreak: streakState.current_streak,
    newlyUnlockedTitles: ACHIEVEMENT_DEFS.filter((a) => newlyUnlockedKeys.includes(a.key)).map(
      (a) => a.title
    ),
  };
}

/** Юнит пройден (сдан тест или завершён юнит без упражнений). */
export async function completeUnitWithRewards(
  unitId: string,
  options: { durationMinutes: number; testScore?: number | null }
): Promise<SessionRewards> {
  await completeUnit(unitId, options.testScore ?? null, todayStr());
  return grantSessionRewards(UNIT_XP, options.durationMinutes);
}

/** Практика пройдена (юнит при этом не завершается — его завершает тест). */
export async function grantPracticeRewards(durationMinutes: number): Promise<SessionRewards> {
  return grantSessionRewards(PRACTICE_XP, durationMinutes);
}
