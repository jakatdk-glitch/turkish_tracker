const BASE_XP_PER_SESSION = 10;
const XP_PER_MINUTE = 1;
const FULL_SESSION_BONUS_MINUTES = 20;
const FULL_SESSION_BONUS_XP = 10;

export function calculateSessionXp(durationMinutes: number): number {
  const xp = BASE_XP_PER_SESSION + durationMinutes * XP_PER_MINUTE;
  const bonus = durationMinutes >= FULL_SESSION_BONUS_MINUTES ? FULL_SESSION_BONUS_XP : 0;
  return xp + bonus;
}

// XP required to go from level N to level N+1 grows linearly with N.
function xpForLevel(level: number): number {
  return level * 100;
}

export interface LevelInfo {
  level: number;
  xpIntoLevel: number;
  xpForNextLevel: number;
  progress: number; // 0..1
}

export function getLevelInfo(totalXp: number): LevelInfo {
  let level = 1;
  let remaining = totalXp;

  while (remaining >= xpForLevel(level)) {
    remaining -= xpForLevel(level);
    level += 1;
  }

  const xpForNextLevel = xpForLevel(level);
  return {
    level,
    xpIntoLevel: remaining,
    xpForNextLevel,
    progress: xpForNextLevel === 0 ? 0 : remaining / xpForNextLevel,
  };
}
