import type { UnitContent } from '@/logic/course';

const unit: UnitContent = {
  id: 'u07',
  title: 'Множественное число -lar/-ler',
  theory: [
    {
      type: 'text',
      text:
        'Множественное число в турецком — один суффикс с двумя вариантами по гармонии: ' +
        '-ler после мягких гласных (e, i, ö, ü) и -lar после твёрдых (a, ı, o, u).',
    },
    {
      type: 'table',
      title: 'Как выбрать',
      headers: ['Последняя гласная', 'Суффикс', 'Пример'],
      rows: [
        ['e, i, ö, ü', '-ler', 'ev → evler, göz → gözler'],
        ['a, ı, o, u', '-lar', 'kız → kızlar, çocuk → çocuklar'],
      ],
    },
    {
      type: 'tip',
      text:
        'Главное правило-ловушка: после числа множественное НЕ ставится! ' +
        '«три книги» — üç kitap, а не üç kitaplar. Число само показывает множество.',
    },
    {
      type: 'examples',
      title: 'Послушай',
      items: [
        { tr: 'çocuklar', ru: 'дети' },
        { tr: 'arkadaşlar', ru: 'друзья' },
        { tr: 'öğrenciler', ru: 'ученики' },
        { tr: 'iki kitap', ru: 'две книги (без -lar!)' },
        { tr: 'beş elma', ru: 'пять яблок (без -lar!)' },
      ],
    },
  ],
  vocab: [
    { tr: 'çocuk', ru: 'ребёнок' },
    { tr: 'arkadaş', ru: 'друг' },
    { tr: 'kuş', ru: 'птица' },
    { tr: 'ağaç', ru: 'дерево' },
    { tr: 'ev', ru: 'дом' },
    { tr: 'çocuklar', ru: 'дети' },
    { tr: 'arkadaşlar', ru: 'друзья' },
    { tr: 'kuşlar', ru: 'птицы' },
    { tr: 'insanlar', ru: 'люди' },
    { tr: 'çok', ru: 'много / очень' },
  ],
  exercises: [
    {
      type: 'blank',
      ru: 'дома́ (мн. число)',
      sentence: 'ev___',
      options: ['ler', 'lar', 'lör', 'lir'],
      correct: 0,
      explain: 'Последняя гласная e → -ler.',
    },
    {
      type: 'blank',
      ru: 'дети (мн. число)',
      sentence: 'çocuk___',
      options: ['lar', 'ler', 'lır', 'lor'],
      correct: 0,
      explain: 'Последняя гласная u → -lar.',
    },
    {
      type: 'blank',
      ru: 'глаза (мн. число)',
      sentence: 'göz___',
      options: ['ler', 'lar', 'lör', 'lür'],
      correct: 0,
      explain: 'Последняя гласная ö → -ler.',
    },
    {
      type: 'choice',
      prompt: 'Как правильно «три книги»?',
      promptIsTurkish: false,
      options: ['üç kitap', 'üç kitaplar', 'kitaplar üç', 'üç kitapler'],
      correct: 0,
      explain: 'После числа множественное не ставится: üç kitap.',
    },
    {
      type: 'choice',
      prompt: 'çocuklar',
      promptIsTurkish: true,
      options: ['дети', 'ребёнок', 'детей', 'у детей'],
      correct: 0,
    },
    {
      type: 'choice',
      prompt: 'Как правильно «пять яблок»?',
      promptIsTurkish: false,
      options: ['beş elma', 'beş elmalar', 'elmalar beş', 'beş elmaler'],
      correct: 0,
      explain: 'Число beş уже показывает множество — elma без суффикса.',
    },
    {
      type: 'flashcard',
      tr: 'arkadaşlar',
      ru: 'друзья',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'çocuklar', ru: 'дети' },
        { tr: 'kuşlar', ru: 'птицы' },
        { tr: 'evler', ru: 'дома́' },
        { tr: 'insanlar', ru: 'люди' },
      ],
    },
    {
      type: 'blank',
      ru: 'друзья (мн. число)',
      sentence: 'arkadaş___',
      options: ['lar', 'ler', 'lır', 'lor'],
      correct: 0,
      explain: 'Последняя гласная a → -lar.',
    },
    {
      type: 'assemble',
      ru: 'два ребёнка',
      words: ['iki', 'çocuk'],
      correct: 'iki çocuk',
      explain: 'После числа iki — без -lar: iki çocuk.',
    },
  ],
  test: [
    {
      type: 'blank',
      ru: 'птицы (мн. число)',
      sentence: 'kuş___',
      options: ['lar', 'ler', 'lır', 'lor'],
      correct: 0,
      explain: 'Последняя гласная u → твёрдый -lar.',
    },
    {
      type: 'blank',
      ru: 'ученики (мн. число)',
      sentence: 'öğrenci___',
      options: ['ler', 'lar', 'lır', 'lor'],
      correct: 0,
      explain: 'Последняя гласная i → мягкий -ler.',
    },
    {
      type: 'choice',
      prompt: 'Как правильно «четыре дерева»?',
      promptIsTurkish: false,
      options: ['dört ağaç', 'dört ağaçlar', 'ağaçlar dört', 'dört ağaçler'],
      correct: 0,
      explain: 'После числа множественное не ставится: dört ağaç.',
    },
    {
      type: 'choice',
      prompt: 'Как сказать «друзья» (arkadaş)?',
      promptIsTurkish: false,
      options: ['arkadaşlar', 'arkadaşler', 'arkadaşlır', 'arkadaşlor'],
      correct: 0,
      explain: 'Последняя гласная a → -lar.',
    },
    {
      type: 'choice',
      prompt: 'insanlar',
      promptIsTurkish: true,
      options: ['люди', 'человек', 'детей', 'друзья'],
      correct: 0,
    },
    {
      type: 'blank',
      ru: 'деревья (мн. число)',
      sentence: 'ağaç___',
      options: ['lar', 'ler', 'tar', 'ta'],
      correct: 0,
      explain: 'Последняя гласная a → -lar. (Суффикс мн. числа не отвердевает.)',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'çocuk', ru: 'ребёнок' },
        { tr: 'kuş', ru: 'птица' },
        { tr: 'ağaç', ru: 'дерево' },
        { tr: 'arkadaş', ru: 'друг' },
      ],
    },
    {
      type: 'assemble',
      ru: 'пять яблок',
      words: ['beş', 'elma'],
      correct: 'beş elma',
      explain: 'Число уже показывает множество — elma без -lar.',
    },
  ],
};

export default unit;
