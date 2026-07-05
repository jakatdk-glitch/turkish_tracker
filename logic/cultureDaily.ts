import { PROVERBS, type Proverb } from '@/data/proverbs';
import { TWISTERS, type Twister } from '@/data/twisters';
import { TALES, type Tale } from '@/data/tales';
import { CULTURE, type CultureTopic } from '@/data/culture';

export type DailyCulture =
  | { type: 'proverb'; proverb: Proverb }
  | { type: 'twister'; twister: Twister }
  | { type: 'tale'; tale: Tale }
  | { type: 'topic'; topic: CultureTopic; sectionTitle: string };

function hashDate(dateStr: string): number {
  let h = 0;
  for (let i = 0; i < dateStr.length; i++) {
    h = (h * 31 + dateStr.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

/**
 * «Культура дня»: детерминированно по дате чередует тип контента
 * (пословица → скороговорка → сказка → тема) и выбирает конкретный элемент.
 * В течение дня не меняется, каждый день — новое.
 */
export function getCultureOfTheDay(dateStr: string): DailyCulture {
  const h = hashDate(dateStr);
  switch (h % 4) {
    case 0:
      return { type: 'proverb', proverb: PROVERBS[h % PROVERBS.length] };
    case 1:
      return { type: 'twister', twister: TWISTERS[h % TWISTERS.length] };
    case 2:
      return { type: 'tale', tale: TALES[h % TALES.length] };
    default: {
      const all = CULTURE.flatMap((s) =>
        s.topics.map((topic) => ({ topic, sectionTitle: s.title }))
      );
      const pick = all[h % all.length];
      return { type: 'topic', topic: pick.topic, sectionTitle: pick.sectionTitle };
    }
  }
}
