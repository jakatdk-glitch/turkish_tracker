import type { UnitContent } from '@/logic/course';

const unit: UnitContent = {
  id: 'u08',
  title: 'Var / Yok — есть / нет',
  theory: [
    {
      type: 'text',
      text:
        'Два коротких слова решают половину бытовых ситуаций: var — «есть, имеется», ' +
        'yok — «нет, отсутствует». Ставятся в конце: Masada kitap var — «На столе есть книга».',
    },
    {
      type: 'table',
      title: 'Var / Yok',
      headers: ['Турецкий', 'Смысл'],
      rows: [
        ['… var', 'есть / имеется'],
        ['… yok', 'нет / отсутствует'],
        ['… var mı?', 'есть ли …?'],
      ],
    },
    {
      type: 'examples',
      title: 'В жизни',
      items: [
        { tr: 'Boş oda var mı?', ru: 'Есть свободный номер?' },
        { tr: 'Evet, var.', ru: 'Да, есть.' },
        { tr: 'Hayır, yok.', ru: 'Нет, нету.' },
        { tr: 'Çay var mı?', ru: 'Чай есть?' },
        { tr: 'Para yok.', ru: 'Денег нет.' },
      ],
    },
    {
      type: 'tip',
      text:
        'Вопрос строится частицей mı после var: «var mı?». Ответ — одно слово: ' +
        'Var (есть) или Yok (нет). Коротко и по-турецки.',
    },
  ],
  vocab: [
    { tr: 'var', ru: 'есть / имеется' },
    { tr: 'yok', ru: 'нет / отсутствует' },
    { tr: 'para', ru: 'деньги' },
    { tr: 'oda', ru: 'комната / номер' },
    { tr: 'boş', ru: 'свободный / пустой' },
    { tr: 'dolu', ru: 'полный / занятый' },
    { tr: 'masa', ru: 'стол' },
    { tr: 'zaman', ru: 'время' },
  ],
  exercises: [
    {
      type: 'choice',
      prompt: 'Как спросить «Чай есть?»',
      promptIsTurkish: false,
      options: ['Çay var mı?', 'Çay yok mu?', 'Çay nerede?', 'Çay mı var?'],
      correct: 0,
      explain: 'Схема: предмет + var + mı? → Çay var mı?',
    },
    {
      type: 'choice',
      prompt: 'Para yok.',
      promptIsTurkish: true,
      options: ['Денег нет.', 'Деньги есть.', 'Где деньги?', 'Дай денег.'],
      correct: 0,
    },
    {
      type: 'choice',
      prompt: '«Свободный номер есть?» — Boş oda …?',
      promptIsTurkish: false,
      options: ['var mı', 'yok mu', 'nerede', 'mı var'],
      correct: 0,
      explain: 'boş oda («свободный номер») + var mı? = есть ли.',
    },
    {
      type: 'flashcard',
      tr: 'boş',
      ru: 'свободный / пустой',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'var', ru: 'есть' },
        { tr: 'yok', ru: 'нет' },
        { tr: 'para', ru: 'деньги' },
        { tr: 'oda', ru: 'комната' },
      ],
    },
    {
      type: 'assemble',
      ru: 'Чай есть?',
      words: ['Çay', 'var', 'mı'],
      correct: 'Çay var mı',
      explain: 'Предмет → var → вопросительная частица mı.',
    },
    {
      type: 'choice',
      prompt: 'Как ответить «Нет» на «Oda var mı?»',
      promptIsTurkish: false,
      options: ['Yok', 'Var', 'Evet', 'Değil'],
      correct: 0,
      explain: 'На «var mı?» отвечают одним словом: Var или Yok.',
    },
    {
      type: 'assemble',
      ru: 'На столе есть книга.',
      words: ['Masada', 'kitap', 'var'],
      correct: 'Masada kitap var',
      explain: 'Где (masada) → что (kitap) → var. var всегда в конце.',
    },
    {
      type: 'choice',
      prompt: 'dolu',
      promptIsTurkish: true,
      options: ['полный / занятый', 'свободный', 'пустой', 'красивый'],
      correct: 0,
    },
    {
      type: 'flashcard',
      tr: 'zaman',
      ru: 'время',
    },
  ],
  test: [
    {
      type: 'choice',
      prompt: 'Как спросить «Есть время?»',
      promptIsTurkish: false,
      options: ['Zaman var mı?', 'Zaman yok mu?', 'Zaman nerede?', 'Var zaman mı?'],
      correct: 0,
      explain: 'Схема: предмет + var + mı? → Zaman var mı?',
    },
    {
      type: 'choice',
      prompt: 'Oda yok.',
      promptIsTurkish: true,
      options: ['Номера нет.', 'Номер есть.', 'Где номер?', 'Номер занят.'],
      correct: 0,
    },
    {
      type: 'choice',
      prompt: 'Где в предложении стоят var и yok?',
      promptIsTurkish: false,
      options: ['в конце', 'в начале', 'перед предметом', 'не важно'],
      correct: 0,
      explain: 'var/yok всегда в конце: Masada kitap var.',
    },
    {
      type: 'assemble',
      ru: 'На столе есть деньги.',
      words: ['Masada', 'para', 'var'],
      correct: 'Masada para var',
      explain: 'Где (masada) → что (para) → var.',
    },
    {
      type: 'choice',
      prompt: 'Как коротко ответить «Есть» на «Çay var mı?»',
      promptIsTurkish: false,
      options: ['Var', 'Yok', 'Hayır', 'Değil'],
      correct: 0,
      explain: 'Отвечают одним словом: Var (есть) или Yok (нет).',
    },
    {
      type: 'choice',
      prompt: 'boş',
      promptIsTurkish: true,
      options: ['свободный / пустой', 'полный', 'занятый', 'время'],
      correct: 0,
    },
    {
      type: 'match',
      pairs: [
        { tr: 'var', ru: 'есть' },
        { tr: 'yok', ru: 'нет' },
        { tr: 'masa', ru: 'стол' },
        { tr: 'zaman', ru: 'время' },
      ],
    },
    {
      type: 'assemble',
      ru: 'Есть свободный номер?',
      words: ['Boş', 'oda', 'var', 'mı'],
      correct: 'Boş oda var mı',
      explain: 'boş oda (свободный номер) + var + вопросительная mı.',
    },
  ],
};

export default unit;
