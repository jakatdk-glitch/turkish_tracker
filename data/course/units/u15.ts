import type { UnitContent } from '@/logic/course';

const unit: UnitContent = {
  id: 'u15',
  title: 'Куда? Откуда? -a/-e, -dan/-den',
  theory: [
    {
      type: 'text',
      text:
        'Три вопроса о месте образуют тройку: Nerede? (где — падеж -da/-de), ' +
        'Nereye? (куда — падеж -a/-e), Nereden? (откуда — падеж -dan/-den). ' +
        'Один корень — три направления.',
    },
    {
      type: 'table',
      title: 'Куда? Дательный -a/-e',
      headers: ['Слово', 'Форма', 'Смысл'],
      rows: [
        ['ev', 'eve', 'домой'],
        ['okul', 'okula', 'в школу'],
        ['iş', 'işe', 'на работу'],
        ['araba', 'arabaya', 'в машину (буфер y!)'],
      ],
    },
    {
      type: 'table',
      title: 'Откуда? Исходный -dan/-den',
      headers: ['Слово', 'Форма', 'Смысл'],
      rows: [
        ['ev', 'evden', 'из дома'],
        ['okul', 'okuldan', 'из школы'],
        ['sokak', 'sokaktan', 'с улицы (глухая k → -tan)'],
        ['iş', 'işten', 'с работы (глухая ş → -ten)'],
      ],
    },
    {
      type: 'tip',
      text:
        'Дательный -a/-e берёт буфер -y- после гласной: araba → arabaya. ' +
        'Исходный -dan/-den твердеет в -tan/-ten после глухих согласных, как и местный.',
    },
    {
      type: 'examples',
      title: 'В движении',
      items: [
        { tr: 'Okula gidiyorum.', ru: 'Я иду в школу.' },
        { tr: 'Evden geliyorum.', ru: 'Я иду из дома.' },
        { tr: 'Nereye gidiyorsun?', ru: 'Куда ты идёшь?' },
      ],
    },
  ],
  vocab: [
    { tr: 'nereye', ru: 'куда' },
    { tr: 'nereden', ru: 'откуда' },
    { tr: 'eve', ru: 'домой' },
    { tr: 'okula', ru: 'в школу' },
    { tr: 'evden', ru: 'из дома' },
    { tr: 'okuldan', ru: 'из школы' },
    { tr: 'işe', ru: 'на работу' },
    { tr: 'işten', ru: 'с работы' },
  ],
  exercises: [
    {
      type: 'blank',
      ru: 'домой (куда?)',
      sentence: 'ev___',
      options: ['e', 'a', 'den', 'dan'],
      correct: 0,
      explain: 'Дательный «куда»: гласная e → -e: eve.',
    },
    {
      type: 'blank',
      ru: 'в школу (куда?)',
      sentence: 'okul___',
      options: ['a', 'e', 'dan', 'den'],
      correct: 0,
      explain: 'Дательный: гласная o → -a: okula.',
    },
    {
      type: 'blank',
      ru: 'из дома (откуда?)',
      sentence: 'ev___',
      options: ['den', 'dan', 'ten', 'e'],
      correct: 0,
      explain: 'Исходный «откуда»: звонкая v, гласная e → -den: evden.',
    },
    {
      type: 'blank',
      ru: 'с улицы (откуда, глухая k!)',
      sentence: 'sokak___',
      options: ['tan', 'dan', 'ten', 'a'],
      correct: 0,
      explain: 'sokak кончается на глухую k → отвердение: sokaktan.',
    },
    {
      type: 'blank',
      ru: 'в машину (кончается на гласную!)',
      sentence: 'araba___',
      options: ['ya', 'a', 'yan', 'dan'],
      correct: 0,
      explain: 'После гласной a — буфер y + -a = -ya: arabaya.',
    },
    {
      type: 'choice',
      prompt: 'Как спросить «Куда идёшь?»',
      promptIsTurkish: false,
      options: ['Nereye gidiyorsun?', 'Nerede gidiyorsun?', 'Nereden gidiyorsun?', 'Ne gidiyorsun?'],
      correct: 0,
      explain: 'Nereye — «куда» (направление).',
    },
    {
      type: 'flashcard',
      tr: 'nereden',
      ru: 'откуда',
    },
    {
      type: 'assemble',
      ru: 'Я иду в школу.',
      words: ['Okula', 'gidiyorum'],
      correct: 'Okula gidiyorum',
      explain: 'Куда (okula) → глагол: Okula gidiyorum.',
    },
    {
      type: 'assemble',
      ru: 'Я иду из дома.',
      words: ['Evden', 'geliyorum'],
      correct: 'Evden geliyorum',
      explain: 'Откуда (evden) → глагол: Evden geliyorum.',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'eve', ru: 'домой' },
        { tr: 'evden', ru: 'из дома' },
        { tr: 'işe', ru: 'на работу' },
        { tr: 'işten', ru: 'с работы' },
      ],
    },
  ],
  test: [
    {
      type: 'blank',
      ru: 'на работу (куда?)',
      sentence: 'iş___',
      options: ['e', 'a', 'ten', 'den'],
      correct: 0,
      explain: 'Дательный «куда»: гласная i → -e: işe.',
    },
    {
      type: 'blank',
      ru: 'с работы (откуда, глухая ş!)',
      sentence: 'iş___',
      options: ['ten', 'den', 'tan', 'e'],
      correct: 0,
      explain: 'iş кончается на глухую ş → отвердение: işten.',
    },
    {
      type: 'blank',
      ru: 'из школы (откуда?)',
      sentence: 'okul___',
      options: ['dan', 'den', 'tan', 'a'],
      correct: 0,
      explain: 'okul — звонкая l, гласная o → -dan: okuldan.',
    },
    {
      type: 'blank',
      ru: 'на стол (куда, кончается на гласную!)',
      sentence: 'masa___',
      options: ['ya', 'a', 'yan', 'dan'],
      correct: 0,
      explain: 'После гласной a — буфер y + -a = -ya: masaya.',
    },
    {
      type: 'choice',
      prompt: 'Как спросить «Откуда ты идёшь?»',
      promptIsTurkish: false,
      options: [
        'Nereden geliyorsun?',
        'Nereye gidiyorsun?',
        'Nerede geliyorsun?',
        'Ne zaman geliyorsun?',
      ],
      correct: 0,
      explain: 'Nereden — «откуда» (исходная точка).',
    },
    {
      type: 'choice',
      prompt: '«с улицы» — почему sokaktan, а не sokakdan?',
      promptIsTurkish: false,
      options: ['k — глухая → -tan', 'это исключение', 'из-за гармонии', 'нужен буфер y'],
      correct: 0,
      explain: 'После глухой k исходный суффикс твердеет: -dan → -tan.',
    },
    {
      type: 'assemble',
      ru: 'Я иду на работу.',
      words: ['İşe', 'gidiyorum'],
      correct: 'İşe gidiyorum',
      explain: 'Куда (işe) → глагол: İşe gidiyorum.',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'eve', ru: 'домой' },
        { tr: 'evden', ru: 'из дома' },
        { tr: 'okula', ru: 'в школу' },
        { tr: 'okuldan', ru: 'из школы' },
      ],
    },
  ],
};

export default unit;
