import lessonsData from '@/data/lessons.json';

import { seedCards, seedLessons } from './queries';

export async function seedContent(): Promise<void> {
  await seedLessons(lessonsData.lessons);

  // Для reversible-уроков каждое слово получает вторую карточку
  // «перевод → турецкий» со своим собственным SM-2-прогрессом.
  const reversibleIds = new Set(
    lessonsData.lessons.filter((l) => l.reversible).map((l) => l.id)
  );
  const rows: { lesson_id: number; front: string; back: string; reversed: number }[] = [];
  for (const card of lessonsData.cards) {
    rows.push({ ...card, reversed: 0 });
    if (reversibleIds.has(card.lesson_id)) {
      rows.push({ ...card, reversed: 1 });
    }
  }
  await seedCards(rows);
}
