export const SCHEMA_SQL = `
PRAGMA journal_mode = WAL;

CREATE TABLE IF NOT EXISTS sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,
  duration_minutes INTEGER,
  xp_earned INTEGER,
  lesson_id INTEGER
);

CREATE TABLE IF NOT EXISTS lessons (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,
  order_index INTEGER
);

CREATE TABLE IF NOT EXISTS cards (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  lesson_id INTEGER,
  front TEXT,
  back TEXT,
  ease_factor REAL DEFAULT 2.5,
  interval_days INTEGER DEFAULT 1,
  next_review_date TEXT,
  repetitions INTEGER DEFAULT 0,
  reversed INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,
  card_id INTEGER,
  grade TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS achievements (
  id INTEGER PRIMARY KEY,
  key TEXT UNIQUE,
  unlocked_at TEXT
);

CREATE TABLE IF NOT EXISTS profile (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  total_xp INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_session_date TEXT
);

-- v2: прогресс по юнитам курса (запись = юнит завершён)
CREATE TABLE IF NOT EXISTS unit_progress (
  unit_id TEXT PRIMARY KEY,
  test_score INTEGER,
  completed_at TEXT NOT NULL
);

-- v2: избранное (фразы разговорника, пословицы, сказки)
CREATE TABLE IF NOT EXISTS favorites (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  item_type TEXT NOT NULL,
  item_id TEXT NOT NULL,
  UNIQUE(item_type, item_id)
);

-- v2: прочитанные сказки
CREATE TABLE IF NOT EXISTS tale_progress (
  tale_id TEXT PRIMARY KEY,
  read_at TEXT NOT NULL
);

-- v2: простое хранилище флагов (онбординг и т.п.)
CREATE TABLE IF NOT EXISTS app_meta (
  key TEXT PRIMARY KEY,
  value TEXT
);
`;

export const ACHIEVEMENT_DEFS: { key: string; title: string; description: string }[] = [
  { key: 'streak_7', title: 'Неделя без пропусков', description: '7 дней подряд' },
  { key: 'streak_30', title: 'Месяц дисциплины', description: '30 дней подряд' },
  { key: 'words_50', title: 'Полсотни слов', description: '50 карточек пройдено' },
  { key: 'words_100', title: 'Сотня слов', description: '100 карточек пройдено' },
  { key: 'sessions_10', title: 'Десять сессий', description: '10 завершённых сессий' },
];
