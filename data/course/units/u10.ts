import type { UnitContent } from '@/logic/course';

const unit: UnitContent = {
  id: 'u10',
  title: 'Семья и притяжательность',
  theory: [
    {
      type: 'text',
      text:
        '«Мой», «твой» в турецком — тоже суффиксы, не отдельные слова. ' +
        'anne (мама) → annem (моя мама), ev (дом) → evim (мой дом). ' +
        'Это притяжательные суффиксы.',
    },
    {
      type: 'table',
      title: 'Суффикс «мой» (1 лицо)',
      headers: ['Слово кончается на', 'Суффикс', 'Пример'],
      rows: [
        ['гласную', '-m', 'anne → annem, baba → babam'],
        ['согласную', '-im/-ım/-um/-üm', 'ev → evim, kardeş → kardeşim'],
      ],
    },
    {
      type: 'tip',
      text:
        'После гласной хватает одной -m (annem), после согласной нужна связка-гласная ' +
        'по гармонии (evim, okulum). «Твой» — по той же логике с -n: annen, evin.',
    },
    {
      type: 'examples',
      title: 'Моя семья',
      items: [
        { tr: 'Bu benim annem.', ru: 'Это моя мама.' },
        { tr: 'babam', ru: 'мой папа' },
        { tr: 'kardeşim', ru: 'мой брат / сестра' },
        { tr: 'Ailem büyük.', ru: 'Моя семья большая.' },
      ],
    },
  ],
  vocab: [
    { tr: 'aile', ru: 'семья' },
    { tr: 'anne', ru: 'мама' },
    { tr: 'baba', ru: 'папа' },
    { tr: 'kardeş', ru: 'брат / сестра (младш.)' },
    { tr: 'abla', ru: 'старшая сестра' },
    { tr: 'abi', ru: 'старший брат' },
    { tr: 'eş', ru: 'супруг(а)' },
    { tr: 'annem', ru: 'моя мама' },
    { tr: 'babam', ru: 'мой папа' },
    { tr: 'evim', ru: 'мой дом' },
  ],
  exercises: [
    {
      type: 'blank',
      ru: 'моя мама (кончается на гласную)',
      sentence: 'anne___',
      options: ['m', 'im', 'ım', 'um'],
      correct: 0,
      explain: 'anne кончается на гласную e → хватает -m: annem.',
    },
    {
      type: 'blank',
      ru: 'мой дом (кончается на согласную)',
      sentence: 'ev___',
      options: ['im', 'm', 'ım', 'um'],
      correct: 0,
      explain: 'ev кончается на согласную, гласная e → связка -im: evim.',
    },
    {
      type: 'blank',
      ru: 'мой папа',
      sentence: 'baba___',
      options: ['m', 'im', 'ım', 'um'],
      correct: 0,
      explain: 'baba кончается на гласную a → -m: babam.',
    },
    {
      type: 'choice',
      prompt: 'Как сказать «мой брат/сестра»?',
      promptIsTurkish: false,
      options: ['kardeşim', 'kardeşm', 'kardeşum', 'kardeşimm'],
      correct: 0,
      explain: 'kardeş — согласная ş, гармония e → -im: kardeşim.',
    },
    {
      type: 'flashcard',
      tr: 'aile',
      ru: 'семья',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'anne', ru: 'мама' },
        { tr: 'baba', ru: 'папа' },
        { tr: 'abla', ru: 'старшая сестра' },
        { tr: 'abi', ru: 'старший брат' },
      ],
    },
    {
      type: 'assemble',
      ru: 'Это моя мама.',
      words: ['Bu', 'benim', 'annem'],
      correct: 'Bu benim annem',
      explain: 'benim («мой») усиливает суффикс -m: benim annem.',
    },
    {
      type: 'choice',
      prompt: 'kardeş',
      promptIsTurkish: true,
      options: ['брат / сестра', 'мама', 'папа', 'семья'],
      correct: 0,
    },
    {
      type: 'blank',
      ru: 'мой старший брат (кончается на гласную)',
      sentence: 'abi___',
      options: ['m', 'im', 'ım', 'um'],
      correct: 0,
      explain: 'abi кончается на гласную i → -m: abim.',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'annem', ru: 'моя мама' },
        { tr: 'babam', ru: 'мой папа' },
        { tr: 'evim', ru: 'мой дом' },
        { tr: 'ailem', ru: 'моя семья' },
      ],
    },
  ],
  test: [
    {
      type: 'blank',
      ru: 'моя старшая сестра (кончается на гласную)',
      sentence: 'abla___',
      options: ['m', 'ım', 'im', 'um'],
      correct: 0,
      explain: 'abla кончается на гласную a → хватает -m: ablam.',
    },
    {
      type: 'blank',
      ru: 'мой супруг (кончается на согласную)',
      sentence: 'eş___',
      options: ['im', 'm', 'ım', 'um'],
      correct: 0,
      explain: 'eş кончается на согласную, гармония e → связка -im: eşim.',
    },
    {
      type: 'choice',
      prompt: 'Как сказать «моя семья»?',
      promptIsTurkish: false,
      options: ['ailem', 'ailim', 'aileim', 'ailemm'],
      correct: 0,
      explain: 'aile кончается на гласную e → -m: ailem.',
    },
    {
      type: 'choice',
      prompt: 'Почему «annem» с одной -m, а «evim» с -im?',
      promptIsTurkish: false,
      options: [
        'anne на гласную, ev на согласную',
        'это исключения',
        'из-за числа',
        'из-за апострофа',
      ],
      correct: 0,
      explain: 'После гласной хватает -m; после согласной нужна связка-гласная (-im).',
    },
    {
      type: 'blank',
      ru: 'моя комната (кончается на гласную)',
      sentence: 'oda___',
      options: ['m', 'ım', 'im', 'um'],
      correct: 0,
      explain: 'oda кончается на гласную a → -m: odam.',
    },
    {
      type: 'choice',
      prompt: 'kardeşim',
      promptIsTurkish: true,
      options: ['мой брат / сестра', 'брат / сестра', 'моя мама', 'семья'],
      correct: 0,
    },
    {
      type: 'match',
      pairs: [
        { tr: 'anne', ru: 'мама' },
        { tr: 'baba', ru: 'папа' },
        { tr: 'abla', ru: 'старшая сестра' },
        { tr: 'eş', ru: 'супруг(а)' },
      ],
    },
    {
      type: 'assemble',
      ru: 'Это мой папа.',
      words: ['Bu', 'benim', 'babam'],
      correct: 'Bu benim babam',
      explain: 'benim («мой») усиливает суффикс -m: benim babam.',
    },
  ],
};

export default unit;
