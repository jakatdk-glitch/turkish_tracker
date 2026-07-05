# Turkish Tracker — офлайн трекер прогресса в турецком

Pet-проект: React Native (Expo), полностью офлайн, без сервера.

## Стек

- **React Native + Expo** (managed workflow)
- **expo-sqlite** — хранение данных (надёжнее MMKV в managed workflow, не требует dev build)
- **expo-notifications** — локальные напоминания ("не сломай стрик")
- **date-fns** — работа с датами/стриками
- **react-native-svg** или готовая либа — heatmap-календарь

## Структура проекта

```
turkish-tracker/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx          # Главный экран — стрик, XP, кнопка "Пройти сессию"
│   │   ├── progress.tsx       # Heatmap-календарь + статистика
│   │   ├── lessons.tsx        # Список тем/уроков
│   │   └── achievements.tsx   # Бейджи/достижения
│   ├── session/
│   │   └── [lessonId].tsx     # Экран прохождения сессии/карточек
│   └── _layout.tsx
├── db/
│   ├── schema.ts               # SQL-схема таблиц
│   ├── db.ts                   # Инициализация expo-sqlite
│   └── queries.ts              # CRUD-функции
├── logic/
│   ├── streak.ts                # Расчёт стрика (не сломан/сломан)
│   ├── xp.ts                    # Начисление XP, уровни
│   ├── spacedRepetition.ts      # SM-2 алгоритм для карточек
│   └── achievements.ts          # Проверка условий для бейджей
├── data/
│   └── lessons.json             # Контент уроков (темы, слова, фразы)
├── components/
│   ├── StreakCounter.tsx
│   ├── HeatmapCalendar.tsx
│   ├── XPBar.tsx
│   ├── Flashcard.tsx
│   └── BadgeCard.tsx
├── notifications/
│   └── reminders.ts             # Локальные push через expo-notifications
└── app.json
```

## Схема SQLite (черновик)

```sql
-- Ежедневные сессии
CREATE TABLE sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,          -- YYYY-MM-DD
  duration_minutes INTEGER,
  xp_earned INTEGER,
  lesson_id INTEGER
);

-- Уроки/темы
CREATE TABLE lessons (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,               -- алфавит, приветствия, грамматика...
  order_index INTEGER
);

-- Карточки слов/фраз (для spaced repetition)
CREATE TABLE cards (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  lesson_id INTEGER,
  front TEXT,                  -- турецкое слово/фраза
  back TEXT,                   -- перевод
  ease_factor REAL DEFAULT 2.5,
  interval_days INTEGER DEFAULT 1,
  next_review_date TEXT,
  repetitions INTEGER DEFAULT 0
);

-- Достижения
CREATE TABLE achievements (
  id INTEGER PRIMARY KEY,
  key TEXT UNIQUE,             -- 'streak_7', 'streak_30', 'words_100'
  unlocked_at TEXT
);

-- Профиль/агрегаты (кэш, можно пересчитывать на лету)
CREATE TABLE profile (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  total_xp INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_session_date TEXT
);
```

## MVP — минимальный набор фич

1. Экран сессии: таймер на 20 минут + отметка "сессия завершена"
2. Расчёт стрика: сессия сегодня → +1 к стрику; пропуск дня → сброс
3. XP за сессию (фикс. количество или бонус за длину)
4. Heatmap-календарь по последним сессиям
5. 3-5 достижений (7 дней, 30 дней, 50 слов и т.д.)

## Что добавить после MVP

- Spaced repetition для слов/фраз (SM-2)
- Экспорт/импорт прогресса в JSON (бэкап при смене телефона)
- Кастомизация напоминаний (время, текст)
- Уровни с визуальным прогресс-баром (не просто число XP)

## Порядок разработки (черновой план)

1. Инициализация Expo-проекта, настройка навигации (expo-router)
2. Схема SQLite + базовые CRUD-функции
3. Экран сессии с таймером → запись в БД
4. Логика стрика + отображение на главном экране
5. Heatmap-календарь
6. Достижения
7. Локальные уведомления
8. Полировка UI, экспорт/импорт данных
