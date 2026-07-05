import type { UnitContent } from '@/logic/course';

const unit: UnitContent = {
  id: 'u28',
  title: '-ken: пока, во время',
  theory: [
    {
      type: 'text',
      text:
        '-ken = «пока / когда / во время (процесса)». Прибавляется к аористу/настоящему ' +
        'или к существительному: gelirken (по пути сюда), yürürken (идя пешком), çocukken (в детстве).',
    },
    {
      type: 'table',
      title: 'Формы',
      headers: ['Форма', 'Смысл'],
      rows: [
        ['gelirken', 'когда шёл сюда / по пути'],
        ['giderken', 'по дороге туда'],
        ['yürürken', 'идя пешком'],
        ['çocukken', 'в детстве'],
      ],
    },
    {
      type: 'tip',
      text:
        '-ken описывает фон, длящийся процесс («в то время как»). ' +
        'Сравни: -ken (пока, длится) ↔ -ince (когда, момент — следующий юнит).',
    },
    {
      type: 'examples',
      title: 'Фоном',
      items: [
        { tr: 'Eve giderken ekmek aldım.', ru: 'По дороге домой я купил хлеб.' },
        { tr: 'Çocukken burada yaşadım.', ru: 'В детстве я жил здесь.' },
        { tr: 'Yemek yerken konuşmam.', ru: 'Во время еды я не разговариваю.' },
        { tr: 'Uyurken konuşuyor.', ru: 'Он разговаривает во сне.' },
      ],
    },
  ],
  vocab: [
    { tr: 'gelirken', ru: 'когда иду сюда / по пути' },
    { tr: 'giderken', ru: 'по дороге туда' },
    { tr: 'yürürken', ru: 'идя пешком' },
    { tr: 'çocukken', ru: 'в детстве' },
    { tr: 'yerken', ru: 'во время еды' },
    { tr: 'uyurken', ru: 'во сне / когда спит' },
    { tr: 'yürümek', ru: 'идти пешком' },
    { tr: 'yaşamak', ru: 'жить' },
    { tr: 'telefon', ru: 'телефон' },
    { tr: 'ekmek', ru: 'хлеб' },
  ],
  exercises: [
    {
      type: 'choice',
      prompt: 'Как «по дороге домой» (eve gitmek)?',
      promptIsTurkish: false,
      options: ['eve giderken', 'eve gidince', 'eve gittim', 'eve gider'],
      correct: 0,
      explain: '-ken = «пока / по пути»: giderken.',
    },
    {
      type: 'choice',
      prompt: 'Çocukken burada yaşadım.',
      promptIsTurkish: true,
      options: ['В детстве я жил здесь.', 'Ребёнок жил здесь.', 'Я живу здесь с детства.', 'Дети жили тут.'],
      correct: 0,
      explain: 'çocuk + ken — «в детстве».',
    },
    {
      type: 'blank',
      ru: 'идя пешком (yürü + -rken)',
      sentence: 'yürü___',
      options: ['rken', 'yorum', 'dük', 'rim'],
      correct: 0,
      explain: 'yürürken — «идя пешком».',
    },
    {
      type: 'choice',
      prompt: '-ken описывает…',
      promptIsTurkish: false,
      options: ['процесс/фон «пока, во время»', 'точный момент', 'причину', 'условие'],
      correct: 0,
    },
    {
      type: 'flashcard',
      tr: 'çocukken',
      ru: 'в детстве',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'gelirken', ru: 'по пути сюда' },
        { tr: 'giderken', ru: 'по пути туда' },
        { tr: 'yürürken', ru: 'идя пешком' },
        { tr: 'çocukken', ru: 'в детстве' },
      ],
    },
    {
      type: 'assemble',
      ru: 'По дороге домой я купил хлеб.',
      words: ['Eve', 'giderken', 'ekmek', 'aldım'],
      correct: 'Eve giderken ekmek aldım',
      explain: 'eve giderken (по пути домой) + aldım.',
    },
    {
      type: 'choice',
      prompt: 'Uyurken konuşuyor.',
      promptIsTurkish: true,
      options: ['Он разговаривает во сне.', 'Он спит и молчит.', 'Он не спит.', 'Он уснул.'],
      correct: 0,
    },
    {
      type: 'flashcard',
      tr: 'yaşamak',
      ru: 'жить',
    },
    {
      type: 'choice',
      prompt: '«gelirken» значит…',
      promptIsTurkish: false,
      options: ['по дороге сюда / когда шёл', 'когда пришёл', 'я приду', 'я прихожу'],
      correct: 0,
    },
  ],
  test: [
    {
      type: 'choice',
      prompt: 'Как «во время еды» (yemek yemek)?',
      promptIsTurkish: false,
      options: ['yemek yerken', 'yemek yeyince', 'yemek yedim', 'yemek yer'],
      correct: 0,
      explain: '-ken = «во время»: yerken.',
    },
    {
      type: 'choice',
      prompt: 'Как «по дороге туда» (gitmek)?',
      promptIsTurkish: false,
      options: ['giderken', 'gidince', 'gittim', 'gider'],
      correct: 0,
      explain: 'giderken.',
    },
    {
      type: 'blank',
      ru: 'в детстве (çocuk + -ken)',
      sentence: 'çocuk___',
      options: ['ken', 'tı', 'um', 'lar'],
      correct: 0,
      explain: 'çocukken — «в детстве».',
    },
    {
      type: 'choice',
      prompt: 'Eve giderken ekmek aldım.',
      promptIsTurkish: true,
      options: ['По дороге домой я купил хлеб.', 'Дома я купил хлеб.', 'Я пошёл домой за хлебом.', 'Я купил хлеб и пошёл.'],
      correct: 0,
    },
    {
      type: 'choice',
      prompt: '-ken — это…',
      promptIsTurkish: false,
      options: ['процесс «пока, во время»', 'точный момент «как только»', 'условие', 'цель'],
      correct: 0,
    },
    {
      type: 'assemble',
      ru: 'В детстве я жил здесь.',
      words: ['Çocukken', 'burada', 'yaşadım'],
      correct: 'Çocukken burada yaşadım',
      explain: 'çocukken (в детстве) + yaşadım.',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'gelirken', ru: 'по пути сюда' },
        { tr: 'yürürken', ru: 'идя пешком' },
        { tr: 'çocukken', ru: 'в детстве' },
        { tr: 'uyurken', ru: 'во сне' },
      ],
    },
    {
      type: 'choice',
      prompt: '«yürürken» значит…',
      promptIsTurkish: false,
      options: ['идя пешком', 'когда пошёл', 'он идёт', 'идти пешком'],
      correct: 0,
    },
  ],
};

export default unit;
