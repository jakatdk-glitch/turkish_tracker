import * as SQLite from 'expo-sqlite';

import { ACHIEVEMENT_DEFS, SCHEMA_SQL } from './schema';

const DB_NAME = 'turkish_tracker.db';

let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

export function getDb(): Promise<SQLite.SQLiteDatabase> {
  if (!dbPromise) {
    dbPromise = SQLite.openDatabaseAsync(DB_NAME);
  }
  return dbPromise;
}

let initPromise: Promise<void> | null = null;

export function initDb(): Promise<void> {
  if (!initPromise) {
    initPromise = runInit();
  }
  return initPromise;
}

async function runInit(): Promise<void> {
  const db = await getDb();
  await db.execAsync(SCHEMA_SQL);

  // Миграция для БД, созданных до появления обратных карточек.
  try {
    await db.execAsync(`ALTER TABLE cards ADD COLUMN reversed INTEGER NOT NULL DEFAULT 0`);
  } catch {
    // колонка уже существует
  }

  await db.runAsync(
    `INSERT OR IGNORE INTO profile (id, total_xp, current_streak, longest_streak, last_session_date) VALUES (1, 0, 0, 0, NULL)`
  );

  for (const achievement of ACHIEVEMENT_DEFS) {
    await db.runAsync(`INSERT OR IGNORE INTO achievements (key, unlocked_at) VALUES (?, NULL)`, [
      achievement.key,
    ]);
  }
}
