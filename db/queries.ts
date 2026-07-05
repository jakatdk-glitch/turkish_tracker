import { getDb } from './db';

export interface Session {
  id: number;
  date: string;
  duration_minutes: number;
  xp_earned: number;
  lesson_id: number | null;
}

export interface Lesson {
  id: number;
  title: string;
  category: string;
  order_index: number;
}

export interface Card {
  id: number;
  lesson_id: number;
  front: string;
  back: string;
  ease_factor: number;
  interval_days: number;
  next_review_date: string | null;
  repetitions: number;
  // 0 — турецкий → перевод, 1 — перевод → турецкий
  reversed: number;
}

export interface Achievement {
  id: number;
  key: string;
  unlocked_at: string | null;
}

export interface Profile {
  id: number;
  total_xp: number;
  current_streak: number;
  longest_streak: number;
  last_session_date: string | null;
}

// --- profile ---

export async function getProfile(): Promise<Profile> {
  const db = await getDb();
  const row = await db.getFirstAsync<Profile>(`SELECT * FROM profile WHERE id = 1`);
  if (!row) {
    throw new Error('Profile row missing — did initDb() run?');
  }
  return row;
}

export async function updateProfile(patch: Partial<Omit<Profile, 'id'>>): Promise<void> {
  const db = await getDb();
  const entries = Object.entries(patch);
  if (entries.length === 0) return;
  const setClause = entries.map(([key]) => `${key} = ?`).join(', ');
  const values = entries.map(([, value]) => value ?? null);
  await db.runAsync(`UPDATE profile SET ${setClause} WHERE id = 1`, values);
}

// --- sessions ---

export async function createSession(session: {
  date: string;
  duration_minutes: number;
  xp_earned: number;
  lesson_id: number | null;
}): Promise<number> {
  const db = await getDb();
  const result = await db.runAsync(
    `INSERT INTO sessions (date, duration_minutes, xp_earned, lesson_id) VALUES (?, ?, ?, ?)`,
    [session.date, session.duration_minutes, session.xp_earned, session.lesson_id]
  );
  return result.lastInsertRowId;
}

export async function getAllSessions(): Promise<Session[]> {
  const db = await getDb();
  return db.getAllAsync<Session>(`SELECT * FROM sessions ORDER BY date ASC`);
}

export async function getSessionCount(): Promise<number> {
  const db = await getDb();
  const row = await db.getFirstAsync<{ count: number }>(`SELECT COUNT(*) as count FROM sessions`);
  return row?.count ?? 0;
}

// --- lessons ---

export async function listLessons(): Promise<Lesson[]> {
  const db = await getDb();
  return db.getAllAsync<Lesson>(`SELECT * FROM lessons ORDER BY order_index ASC`);
}

export async function getLessonById(id: number): Promise<Lesson | null> {
  const db = await getDb();
  const row = await db.getFirstAsync<Lesson>(`SELECT * FROM lessons WHERE id = ?`, [id]);
  return row ?? null;
}

export async function seedLessons(
  lessons: { id: number; title: string; category: string; order_index: number }[]
): Promise<void> {
  const db = await getDb();
  for (const lesson of lessons) {
    await db.runAsync(
      `INSERT OR IGNORE INTO lessons (id, title, category, order_index) VALUES (?, ?, ?, ?)`,
      [lesson.id, lesson.title, lesson.category, lesson.order_index]
    );
  }
}

// --- cards ---

export async function listCardsByLesson(lessonId: number): Promise<Card[]> {
  const db = await getDb();
  // Сначала прямые карточки (новые слова), потом обратные.
  return db.getAllAsync<Card>(`SELECT * FROM cards WHERE lesson_id = ? ORDER BY reversed ASC, id ASC`, [
    lessonId,
  ]);
}

// Due = карточка уже показывалась (есть next_review_date) и срок повторения наступил.
// Новые карточки изучаются в сессиях уроков, а не в повторении.
export async function getDueCards(today: string): Promise<Card[]> {
  const db = await getDb();
  return db.getAllAsync<Card>(
    `SELECT * FROM cards WHERE next_review_date IS NOT NULL AND next_review_date <= ? ORDER BY next_review_date ASC`,
    [today]
  );
}

export async function countDueCards(today: string): Promise<number> {
  const db = await getDb();
  const row = await db.getFirstAsync<{ count: number }>(
    `SELECT COUNT(*) as count FROM cards WHERE next_review_date IS NOT NULL AND next_review_date <= ?`,
    [today]
  );
  return row?.count ?? 0;
}

export interface LessonProgress {
  lesson_id: number;
  total: number;
  learned: number;
}

export async function getLessonProgress(): Promise<LessonProgress[]> {
  const db = await getDb();
  // DISTINCT front — слово считается одно на оба направления карточки.
  return db.getAllAsync<LessonProgress>(
    `SELECT lesson_id,
            COUNT(DISTINCT front) as total,
            COUNT(DISTINCT CASE WHEN next_review_date IS NOT NULL THEN front END) as learned
     FROM cards GROUP BY lesson_id`
  );
}

export async function seedCards(
  cards: { lesson_id: number; front: string; back: string; reversed: number }[]
): Promise<void> {
  const db = await getDb();
  for (const card of cards) {
    const existing = await db.getFirstAsync<{ id: number }>(
      `SELECT id FROM cards WHERE lesson_id = ? AND front = ? AND reversed = ?`,
      [card.lesson_id, card.front, card.reversed]
    );
    if (!existing) {
      await db.runAsync(`INSERT INTO cards (lesson_id, front, back, reversed) VALUES (?, ?, ?, ?)`, [
        card.lesson_id,
        card.front,
        card.back,
        card.reversed,
      ]);
    }
  }
}

export async function updateCardReview(
  cardId: number,
  review: { ease_factor: number; interval_days: number; next_review_date: string; repetitions: number }
): Promise<void> {
  const db = await getDb();
  await db.runAsync(
    `UPDATE cards SET ease_factor = ?, interval_days = ?, next_review_date = ?, repetitions = ? WHERE id = ?`,
    [review.ease_factor, review.interval_days, review.next_review_date, review.repetitions, cardId]
  );
}

// Считает слова, а не карточки: прямая и обратная карточка одного слова — одно слово.
export async function countReviewedCards(): Promise<number> {
  const db = await getDb();
  const row = await db.getFirstAsync<{ count: number }>(
    `SELECT COUNT(DISTINCT lesson_id || ':' || front) as count FROM cards WHERE repetitions > 0`
  );
  return row?.count ?? 0;
}

/**
 * Добавляет слово в повторение (например, из сказки): карточка со сроком
 * «сегодня», чтобы сразу попала в очередь. Дедуп по слову — не плодим дубликаты.
 */
export async function addReviewWord(tr: string, ru: string, today: string): Promise<void> {
  const db = await getDb();
  const existing = await db.getFirstAsync<{ id: number }>(
    `SELECT id FROM cards WHERE front = ? AND reversed = 0`,
    [tr]
  );
  if (existing) return;
  await db.runAsync(
    `INSERT INTO cards (lesson_id, front, back, next_review_date, reversed) VALUES (NULL, ?, ?, ?, 0)`,
    [tr, ru, today]
  );
}

// --- reviews (история оценок для статистики точности) ---

export interface DayAccuracy {
  date: string;
  total: number;
  failed: number;
}

export async function insertReview(review: {
  date: string;
  card_id: number;
  grade: string;
}): Promise<void> {
  const db = await getDb();
  await db.runAsync(`INSERT INTO reviews (date, card_id, grade) VALUES (?, ?, ?)`, [
    review.date,
    review.card_id,
    review.grade,
  ]);
}

export async function getAccuracyByDay(since: string): Promise<DayAccuracy[]> {
  const db = await getDb();
  return db.getAllAsync<DayAccuracy>(
    `SELECT date,
            COUNT(*) as total,
            SUM(CASE WHEN grade = 'again' THEN 1 ELSE 0 END) as failed
     FROM reviews WHERE date >= ? GROUP BY date ORDER BY date ASC`,
    [since]
  );
}

// --- app_meta (флаги: онбординг и т.п.) ---

export async function getMeta(key: string): Promise<string | null> {
  const db = await getDb();
  const row = await db.getFirstAsync<{ value: string }>(
    `SELECT value FROM app_meta WHERE key = ?`,
    [key]
  );
  return row?.value ?? null;
}

export async function setMeta(key: string, value: string): Promise<void> {
  const db = await getDb();
  await db.runAsync(
    `INSERT INTO app_meta (key, value) VALUES (?, ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
    [key, value]
  );
}

// --- unit progress (v2: курс) ---

export interface UnitProgress {
  unit_id: string;
  test_score: number | null;
  completed_at: string;
}

export async function getCompletedUnits(): Promise<UnitProgress[]> {
  const db = await getDb();
  return db.getAllAsync<UnitProgress>(`SELECT * FROM unit_progress`);
}

export async function completeUnit(
  unitId: string,
  testScore: number | null,
  completedAt: string
): Promise<void> {
  const db = await getDb();
  await db.runAsync(
    `INSERT INTO unit_progress (unit_id, test_score, completed_at) VALUES (?, ?, ?)
     ON CONFLICT(unit_id) DO UPDATE SET test_score = excluded.test_score`,
    [unitId, testScore, completedAt]
  );
}

// --- favorites (v2: фразы, пословицы, сказки) ---

export type FavoriteType = 'phrase' | 'proverb' | 'tale';

export async function listFavorites(type: FavoriteType): Promise<string[]> {
  const db = await getDb();
  const rows = await db.getAllAsync<{ item_id: string }>(
    `SELECT item_id FROM favorites WHERE item_type = ?`,
    [type]
  );
  return rows.map((r) => r.item_id);
}

export async function toggleFavorite(type: FavoriteType, itemId: string): Promise<boolean> {
  const db = await getDb();
  const existing = await db.getFirstAsync<{ id: number }>(
    `SELECT id FROM favorites WHERE item_type = ? AND item_id = ?`,
    [type, itemId]
  );
  if (existing) {
    await db.runAsync(`DELETE FROM favorites WHERE id = ?`, [existing.id]);
    return false;
  }
  await db.runAsync(`INSERT INTO favorites (item_type, item_id) VALUES (?, ?)`, [type, itemId]);
  return true;
}

// --- tale progress (v2: прочитанные сказки) ---

export async function markTaleRead(taleId: string, readAt: string): Promise<void> {
  const db = await getDb();
  await db.runAsync(
    `INSERT OR IGNORE INTO tale_progress (tale_id, read_at) VALUES (?, ?)`,
    [taleId, readAt]
  );
}

export async function listReadTales(): Promise<string[]> {
  const db = await getDb();
  const rows = await db.getAllAsync<{ tale_id: string }>(`SELECT tale_id FROM tale_progress`);
  return rows.map((r) => r.tale_id);
}

// --- achievements ---

export async function listAchievements(): Promise<Achievement[]> {
  const db = await getDb();
  return db.getAllAsync<Achievement>(`SELECT * FROM achievements ORDER BY id ASC`);
}

export async function unlockAchievement(key: string, unlockedAt: string): Promise<void> {
  const db = await getDb();
  await db.runAsync(
    `UPDATE achievements SET unlocked_at = ? WHERE key = ? AND unlocked_at IS NULL`,
    [unlockedAt, key]
  );
}
