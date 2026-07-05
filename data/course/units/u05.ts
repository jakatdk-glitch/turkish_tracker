import type { UnitContent } from '@/logic/course';

const unit: UnitContent = {
  id: 'u05',
  title: 'Числа 0–100',
  theory: [
    {
      type: 'text',
      text:
        'Турецкие числа — конструктор без исключений: выучи 0–10 и десятки, ' +
        'остальное собирается само. 25 = yirmi (20) + beş (5) = yirmi beş.',
    },
    {
      type: 'table',
      title: 'Числа 0–10',
      headers: ['Число', 'Турецкий'],
      rows: [
        ['0', 'sıfır'],
        ['1', 'bir'],
        ['2', 'iki'],
        ['3', 'üç'],
        ['4', 'dört'],
        ['5', 'beş'],
        ['6', 'altı'],
        ['7', 'yedi'],
        ['8', 'sekiz'],
        ['9', 'dokuz'],
        ['10', 'on'],
      ],
    },
    {
      type: 'table',
      title: 'Десятки',
      headers: ['Число', 'Турецкий'],
      rows: [
        ['20', 'yirmi'],
        ['30', 'otuz'],
        ['40', 'kırk'],
        ['50', 'elli'],
        ['60', 'altmış'],
        ['70', 'yetmiş'],
        ['80', 'seksen'],
        ['90', 'doksan'],
        ['100', 'yüz'],
      ],
    },
    {
      type: 'examples',
      title: 'Составные числа',
      items: [
        { tr: 'on bir', ru: '11' },
        { tr: 'yirmi beş', ru: '25' },
        { tr: 'kırk iki', ru: '42' },
        { tr: 'doksan dokuz', ru: '99' },
      ],
    },
    {
      type: 'tip',
      text:
        'Kaç? — «сколько?». Bu kaç lira? — «сколько это лир?» — главная фраза ' +
        'на базаре. Ответ поймёшь, если знаешь числа!',
    },
  ],
  vocab: [
    { tr: 'sıfır', ru: '0' },
    { tr: 'yirmi', ru: '20' },
    { tr: 'otuz', ru: '30' },
    { tr: 'kırk', ru: '40' },
    { tr: 'elli', ru: '50' },
    { tr: 'altmış', ru: '60' },
    { tr: 'yetmiş', ru: '70' },
    { tr: 'seksen', ru: '80' },
    { tr: 'doksan', ru: '90' },
    { tr: 'yüz', ru: '100' },
    { tr: 'Kaç?', ru: 'сколько?' },
  ],
  exercises: [
    {
      type: 'choice',
      prompt: 'Как сказать «25»?',
      promptIsTurkish: false,
      options: ['yirmi beş', 'beş yirmi', 'yirmi bir', 'otuz beş'],
      correct: 0,
      explain: 'Сначала десяток, потом единица: yirmi (20) + beş (5).',
    },
    {
      type: 'choice',
      prompt: 'kırk iki',
      promptIsTurkish: true,
      options: ['42', '24', '44', '40'],
      correct: 0,
    },
    {
      type: 'match',
      pairs: [
        { tr: 'yirmi', ru: '20' },
        { tr: 'otuz', ru: '30' },
        { tr: 'elli', ru: '50' },
        { tr: 'yüz', ru: '100' },
      ],
    },
    {
      type: 'choice',
      prompt: 'Как сказать «99»?',
      promptIsTurkish: false,
      options: ['doksan dokuz', 'dokuz doksan', 'doksan sekiz', 'seksen dokuz'],
      correct: 0,
    },
    {
      type: 'flashcard',
      tr: 'elli',
      ru: '50',
    },
    {
      type: 'choice',
      prompt: 'on yedi',
      promptIsTurkish: true,
      options: ['17', '70', '7', '27'],
      correct: 0,
      explain: 'on (10) + yedi (7) = 17. А 70 — yetmiş.',
    },
    {
      type: 'choice',
      prompt: 'Как спросить «сколько?»',
      promptIsTurkish: false,
      options: ['Kaç?', 'Ne?', 'Kim?', 'Nerede?'],
      correct: 0,
    },
    {
      type: 'match',
      pairs: [
        { tr: 'kırk', ru: '40' },
        { tr: 'altmış', ru: '60' },
        { tr: 'yetmiş', ru: '70' },
        { tr: 'doksan', ru: '90' },
      ],
    },
    {
      type: 'choice',
      prompt: 'Как сказать «34»?',
      promptIsTurkish: false,
      options: ['otuz dört', 'dört otuz', 'otuz üç', 'kırk dört'],
      correct: 0,
    },
    {
      type: 'flashcard',
      tr: 'yüz',
      ru: '100',
    },
  ],
  test: [
    {
      type: 'choice',
      prompt: 'Как сказать «63»?',
      promptIsTurkish: false,
      options: ['altmış üç', 'altı üç', 'altmış beş', 'yetmiş üç'],
      correct: 0,
      explain: 'Сначала десяток, потом единица: altmış (60) + üç (3).',
    },
    {
      type: 'choice',
      prompt: 'Как сказать «88»?',
      promptIsTurkish: false,
      options: ['seksen sekiz', 'sekiz seksen', 'seksen altı', 'doksan sekiz'],
      correct: 0,
      explain: 'seksen (80) + sekiz (8).',
    },
    {
      type: 'choice',
      prompt: 'yetmiş bir',
      promptIsTurkish: true,
      options: ['71', '17', '61', '77'],
      correct: 0,
      explain: 'yetmiş (70) + bir (1) = 71. А 17 — on yedi.',
    },
    {
      type: 'choice',
      prompt: 'elli dört',
      promptIsTurkish: true,
      options: ['54', '45', '44', '40'],
      correct: 0,
    },
    {
      type: 'blank',
      ru: '25 (двадцать пять)',
      sentence: 'yirmi ___',
      options: ['beş', 'elli', 'iki', 'yüz'],
      correct: 0,
      explain: '25 = yirmi (20) + beş (5).',
    },
    {
      type: 'choice',
      prompt: 'Как спросить «сколько это лир?»',
      promptIsTurkish: false,
      options: ['Bu kaç lira?', 'Bu ne lira?', 'Kim lira?', 'Bu nerede?'],
      correct: 0,
      explain: 'Kaç — «сколько». Bu kaç lira? — главная фраза на базаре.',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'otuz', ru: '30' },
        { tr: 'altmış', ru: '60' },
        { tr: 'seksen', ru: '80' },
        { tr: 'yüz', ru: '100' },
      ],
    },
    {
      type: 'choice',
      prompt: 'Как сказать «100»?',
      promptIsTurkish: false,
      options: ['yüz', 'bin', 'doksan', 'on'],
      correct: 0,
    },
  ],
};

export default unit;
