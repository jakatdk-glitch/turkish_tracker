// Лексикон для «рентгена слова»: все турецкие слова, которые приложение
// уже знает, — словари юнитов, корни лаборатории, сказки, оба разговорника
// и небольшой кураторский список служебных слов.

import { getAllVocab } from '@/data/course/units';
import { PHRASEBOOK } from '@/data/phrasebook';
import { LIFE_PHRASEBOOK } from '@/data/reallife';
import { TALES } from '@/data/tales';
import { MORPH_ROOTS } from './morphology';
import { cleanToken, trLower } from './wordXray';

// Частые слова из сказок и живой речи, которых нет в словарях курса.
const CURATED: [string, string][] = [
  ['hoca', 'ходжа'],
  ['keloğlan', 'Кельоглан'],
  ['zaten', 'и так, уже'],
  ['biraz', 'немного'],
  ['sonra', 'потом'],
  ['önce', 'раньше, сначала'],
  ['içeri', 'внутрь'],
  ['dışarı', 'наружу'],
  ['şey', 'вещь, штука'],
  ['her', 'каждый'],
  ['hiç', 'совсем (не), разве'],
  ['gibi', 'как, подобно'],
  ['diye', 'мол, говоря'],
  ['ile', 'с (кем/чем)'],
  ['için', 'для, ради'],
  ['ama', 'но'],
  ['gün', 'день'],
  ['adam', 'человек, мужчина'],
  ['kapı', 'дверь'],
  ['yol', 'дорога'],
  ['mı', 'вопросительная частица'],
  ['mi', 'вопросительная частица'],
  ['mu', 'вопросительная частица'],
  ['mü', 'вопросительная частица'],
];

let cache: Map<string, string> | null = null;

export function getXrayLexicon(): Map<string, string> {
  if (cache) return cache;
  const map = new Map<string, string>();

  const add = (tr: string, ru: string) => {
    const key = trLower(cleanToken(tr));
    // Только отдельные слова: фразы и шаблоны с «…» лексикону не нужны.
    if (!key || key.includes(' ') || key.includes('…')) return;
    if (!map.has(key)) map.set(key, ru);
  };

  for (const root of MORPH_ROOTS) add(root.tr, root.sg.nom);
  for (const item of getAllVocab()) add(item.tr, item.ru);
  for (const tale of TALES) for (const w of tale.vocab) add(w.tr, w.ru);
  for (const cat of [...PHRASEBOOK, ...LIFE_PHRASEBOOK]) {
    for (const p of cat.phrases) add(p.tr, p.ru);
  }
  for (const [tr, ru] of CURATED) add(tr, ru);

  cache = map;
  return map;
}
