import type { UnitContent } from '@/logic/course';

const unit: UnitContent = {
  id: 'u24',
  title: 'Сравнение: daha, en',
  theory: [
    {
      type: 'text',
      text:
        '«Более» — daha перед прилагательным: daha büyük (больше), daha güzel (красивее). ' +
        '«Самый» — en: en büyük (самый большой), en iyi (лучший).',
    },
    {
      type: 'text',
      text:
        '«Чем» — исходный падеж -dan/-den на том, с чем сравниваем: ' +
        'Ali benden daha uzun — «Али выше меня» (дословно «чем я»). benden = «чем я».',
    },
    {
      type: 'table',
      title: 'Степени',
      headers: ['Форма', 'Пример', 'Смысл'],
      rows: [
        ['прилагательное', 'büyük', 'большой'],
        ['daha + прил.', 'daha büyük', 'больше'],
        ['en + прил.', 'en büyük', 'самый большой'],
        ['-dan daha', 'benden daha büyük', 'больше, чем я'],
      ],
    },
    {
      type: 'tip',
      text:
        'Порядок: [с чем]-dan + daha + прилагательное. ' +
        'kısa — короткий/низкий, uzun — длинный/высокий.',
    },
    {
      type: 'examples',
      title: 'Сравниваем',
      items: [
        { tr: 'Bu daha güzel.', ru: 'Это красивее.' },
        { tr: 'En iyi bu.', ru: 'Лучший — это.' },
        { tr: 'Ali benden daha uzun.', ru: 'Али выше меня.' },
        { tr: 'Bu en büyük.', ru: 'Это самое большое.' },
      ],
    },
  ],
  vocab: [
    { tr: 'daha', ru: 'более' },
    { tr: 'en', ru: 'самый' },
    { tr: 'daha iyi', ru: 'лучше' },
    { tr: 'en iyi', ru: 'лучший' },
    { tr: 'daha büyük', ru: 'больше' },
    { tr: 'en güzel', ru: 'самый красивый' },
    { tr: 'uzun', ru: 'длинный / высокий' },
    { tr: 'kısa', ru: 'короткий / низкий' },
    { tr: 'benden', ru: 'чем я' },
    { tr: 'çok', ru: 'очень' },
  ],
  exercises: [
    {
      type: 'choice',
      prompt: 'Как «красивее»?',
      promptIsTurkish: false,
      options: ['daha güzel', 'en güzel', 'güzel daha', 'çok güzel'],
      correct: 0,
      explain: 'daha перед прилагательным = «более».',
    },
    {
      type: 'choice',
      prompt: 'Как «лучший»?',
      promptIsTurkish: false,
      options: ['en iyi', 'daha iyi', 'iyi en', 'çok iyi'],
      correct: 0,
      explain: 'en = «самый».',
    },
    {
      type: 'choice',
      prompt: 'Bu daha büyük.',
      promptIsTurkish: true,
      options: ['Это больше.', 'Это самое большое.', 'Это очень большое.', 'Это маленькое.'],
      correct: 0,
    },
    {
      type: 'assemble',
      ru: 'Али выше меня.',
      words: ['Ali', 'benden', 'daha', 'uzun'],
      correct: 'Ali benden daha uzun',
      explain: '[чем я] benden + daha + uzun.',
    },
    {
      type: 'flashcard',
      tr: 'uzun',
      ru: 'длинный / высокий',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'daha', ru: 'более' },
        { tr: 'en', ru: 'самый' },
        { tr: 'uzun', ru: 'длинный' },
        { tr: 'kısa', ru: 'короткий' },
      ],
    },
    {
      type: 'choice',
      prompt: '«больше, чем я» — как?',
      promptIsTurkish: false,
      options: ['benden daha büyük', 'daha büyük ben', 'en büyük', 'ben büyük'],
      correct: 0,
      explain: 'benden (чем я) + daha büyük.',
    },
    {
      type: 'choice',
      prompt: 'En iyi bu.',
      promptIsTurkish: true,
      options: ['Лучший — это.', 'Это лучше.', 'Это хорошо.', 'Это не лучшее.'],
      correct: 0,
    },
    {
      type: 'flashcard',
      tr: 'daha iyi',
      ru: 'лучше',
    },
    {
      type: 'choice',
      prompt: 'В чём разница daha и en?',
      promptIsTurkish: false,
      options: ['daha — более, en — самый', 'это одно и то же', 'daha — самый', 'en — очень'],
      correct: 0,
    },
  ],
  test: [
    {
      type: 'choice',
      prompt: 'Как «больше» (büyük)?',
      promptIsTurkish: false,
      options: ['daha büyük', 'en büyük', 'büyük daha', 'çok büyük'],
      correct: 0,
      explain: 'daha = «более».',
    },
    {
      type: 'choice',
      prompt: 'Как «самый красивый» (güzel)?',
      promptIsTurkish: false,
      options: ['en güzel', 'daha güzel', 'güzel en', 'çok güzel'],
      correct: 0,
      explain: 'en = «самый».',
    },
    {
      type: 'choice',
      prompt: 'Bu daha iyi.',
      promptIsTurkish: true,
      options: ['Это лучше.', 'Это лучший.', 'Это хорошо.', 'Это плохо.'],
      correct: 0,
    },
    {
      type: 'assemble',
      ru: 'Это больше, чем дом.',
      words: ['Bu', 'evden', 'daha', 'büyük'],
      correct: 'Bu evden daha büyük',
      explain: 'evden (чем дом) + daha büyük.',
    },
    {
      type: 'choice',
      prompt: 'Что добавляет «-dan/-den» в сравнении?',
      promptIsTurkish: false,
      options: ['«чем …» (с чем сравниваем)', 'множественное', 'место', 'время'],
      correct: 0,
      explain: 'benden = «чем я».',
    },
    {
      type: 'choice',
      prompt: '«самый длинный» — как?',
      promptIsTurkish: false,
      options: ['en uzun', 'daha uzun', 'uzun en', 'çok uzun'],
      correct: 0,
    },
    {
      type: 'match',
      pairs: [
        { tr: 'daha', ru: 'более' },
        { tr: 'en', ru: 'самый' },
        { tr: 'daha iyi', ru: 'лучше' },
        { tr: 'en iyi', ru: 'лучший' },
      ],
    },
    {
      type: 'choice',
      prompt: '«Ali benden daha uzun» значит…',
      promptIsTurkish: false,
      options: ['Али выше меня', 'Я выше Али', 'Али такой же', 'Али ниже меня'],
      correct: 0,
    },
  ],
};

export default unit;
