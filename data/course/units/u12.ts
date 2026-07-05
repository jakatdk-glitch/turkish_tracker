import type { UnitContent } from '@/logic/course';

const unit: UnitContent = {
  id: 'u12',
  title: 'Дни недели и время',
  theory: [
    {
      type: 'text',
      text:
        'Дни недели в турецком легко запомнить по паре подсказок: Cuma — пятница ' +
        '(день молитвы), а Cumartesi — «после пятницы» — суббота. Pazar — воскресенье ' +
        '(и заодно «базар»!), Pazartesi — «после воскресенья» — понедельник.',
    },
    {
      type: 'table',
      title: 'Дни недели (haftanın günleri)',
      headers: ['Турецкий', 'День'],
      rows: [
        ['Pazartesi', 'понедельник'],
        ['Salı', 'вторник'],
        ['Çarşamba', 'среда'],
        ['Perşembe', 'четверг'],
        ['Cuma', 'пятница'],
        ['Cumartesi', 'суббота'],
        ['Pazar', 'воскресенье'],
      ],
    },
    {
      type: 'examples',
      title: 'Время и дни',
      items: [
        { tr: 'Saat kaç?', ru: 'Который час?' },
        { tr: 'Saat üç.', ru: 'Три часа.' },
        { tr: 'Bugün Cuma.', ru: 'Сегодня пятница.' },
        { tr: 'Yarın Cumartesi.', ru: 'Завтра суббота.' },
      ],
    },
    {
      type: 'tip',
      text:
        'Saat — это и «час», и «часы». Saat kaç? — «который час?», Saat beş — «пять часов». ' +
        'bugün — сегодня, yarın — завтра, dün — вчера.',
    },
  ],
  vocab: [
    { tr: 'gün', ru: 'день' },
    { tr: 'hafta', ru: 'неделя' },
    { tr: 'bugün', ru: 'сегодня' },
    { tr: 'yarın', ru: 'завтра' },
    { tr: 'dün', ru: 'вчера' },
    { tr: 'saat', ru: 'час / часы' },
    { tr: 'sabah', ru: 'утро' },
    { tr: 'akşam', ru: 'вечер' },
    { tr: 'Cuma', ru: 'пятница' },
    { tr: 'Pazar', ru: 'воскресенье' },
  ],
  exercises: [
    {
      type: 'match',
      pairs: [
        { tr: 'Pazartesi', ru: 'понедельник' },
        { tr: 'Salı', ru: 'вторник' },
        { tr: 'Çarşamba', ru: 'среда' },
        { tr: 'Perşembe', ru: 'четверг' },
      ],
    },
    {
      type: 'match',
      pairs: [
        { tr: 'Cuma', ru: 'пятница' },
        { tr: 'Cumartesi', ru: 'суббота' },
        { tr: 'Pazar', ru: 'воскресенье' },
        { tr: 'hafta', ru: 'неделя' },
      ],
    },
    {
      type: 'choice',
      prompt: 'Как спросить «Который час?»',
      promptIsTurkish: false,
      options: ['Saat kaç?', 'Kaç saat?', 'Ne zaman?', 'Saat ne?'],
      correct: 0,
      explain: 'Saat kaç? — дословно «час сколько?».',
    },
    {
      type: 'choice',
      prompt: 'bugün',
      promptIsTurkish: true,
      options: ['сегодня', 'завтра', 'вчера', 'неделя'],
      correct: 0,
    },
    {
      type: 'flashcard',
      tr: 'yarın',
      ru: 'завтра',
    },
    {
      type: 'assemble',
      ru: 'Сегодня пятница.',
      words: ['Bugün', 'Cuma'],
      correct: 'Bugün Cuma',
      explain: 'Глагол «быть» не нужен: Bugün Cuma.',
    },
    {
      type: 'choice',
      prompt: 'Какой день Perşembe?',
      promptIsTurkish: false,
      options: ['четверг', 'среда', 'вторник', 'пятница'],
      correct: 0,
    },
    {
      type: 'match',
      pairs: [
        { tr: 'bugün', ru: 'сегодня' },
        { tr: 'yarın', ru: 'завтра' },
        { tr: 'dün', ru: 'вчера' },
        { tr: 'saat', ru: 'час' },
      ],
    },
    {
      type: 'assemble',
      ru: 'Завтра суббота.',
      words: ['Yarın', 'Cumartesi'],
      correct: 'Yarın Cumartesi',
      explain: 'Yarın (завтра) + Cumartesi (суббота).',
    },
    {
      type: 'choice',
      prompt: 'sabah',
      promptIsTurkish: true,
      options: ['утро', 'вечер', 'ночь', 'день'],
      correct: 0,
    },
  ],
  test: [
    {
      type: 'choice',
      prompt: 'Какой день «Salı»?',
      promptIsTurkish: false,
      options: ['вторник', 'среда', 'понедельник', 'четверг'],
      correct: 0,
    },
    {
      type: 'choice',
      prompt: 'Какой день «Cumartesi»?',
      promptIsTurkish: false,
      options: ['суббота', 'пятница', 'воскресенье', 'четверг'],
      correct: 0,
      explain: 'Cumartesi — «после пятницы» (Cuma) → суббота.',
    },
    {
      type: 'choice',
      prompt: 'Как сказать «(сейчас) три часа»?',
      promptIsTurkish: false,
      options: ['Saat üç', 'Üç saat', 'Saat kaç', 'Saat üçler'],
      correct: 0,
      explain: 'Saat üç — «три часа». Üç saat — «три часа» как длительность.',
    },
    {
      type: 'choice',
      prompt: 'dün',
      promptIsTurkish: true,
      options: ['вчера', 'сегодня', 'завтра', 'неделя'],
      correct: 0,
    },
    {
      type: 'assemble',
      ru: 'Сегодня понедельник.',
      words: ['Bugün', 'Pazartesi'],
      correct: 'Bugün Pazartesi',
      explain: 'Глагол «быть» не нужен: Bugün Pazartesi.',
    },
    {
      type: 'choice',
      prompt: '«Pazar» — это…',
      promptIsTurkish: false,
      options: ['воскресенье', 'понедельник', 'пятница', 'суббота'],
      correct: 0,
      explain: 'Pazar — воскресенье (и заодно «базар»).',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'bugün', ru: 'сегодня' },
        { tr: 'yarın', ru: 'завтра' },
        { tr: 'dün', ru: 'вчера' },
        { tr: 'akşam', ru: 'вечер' },
      ],
    },
    {
      type: 'choice',
      prompt: 'hafta',
      promptIsTurkish: true,
      options: ['неделя', 'день', 'час', 'утро'],
      correct: 0,
    },
  ],
};

export default unit;
