export interface AchievementStats {
  currentStreak: number;
  reviewedCardCount: number;
  sessionCount: number;
}

const CONDITIONS: Record<string, (stats: AchievementStats) => boolean> = {
  streak_7: (s) => s.currentStreak >= 7,
  streak_30: (s) => s.currentStreak >= 30,
  words_50: (s) => s.reviewedCardCount >= 50,
  words_100: (s) => s.reviewedCardCount >= 100,
  sessions_10: (s) => s.sessionCount >= 10,
};

/** Returns the keys of achievements whose unlock condition is now met. */
export function getNewlyUnlockedKeys(
  stats: AchievementStats,
  alreadyUnlockedKeys: Set<string>
): string[] {
  return Object.entries(CONDITIONS)
    .filter(([key, isMet]) => !alreadyUnlockedKeys.has(key) && isMet(stats))
    .map(([key]) => key);
}
