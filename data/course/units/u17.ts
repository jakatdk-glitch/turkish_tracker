import type { UnitContent } from '@/logic/course';

const unit: UnitContent = {
  id: 'u17',
  title: 'В кафе: заказываем еду',
  theory: [
    {
      type: 'text',
      text:
        'Собираем всё вместе в реальной сцене — заказ в кафе. Здесь работают ' +
        'винительный падеж, istiyorum, var mı и числа. Ничего нового — только практика.',
    },
    {
      type: 'examples',
      title: 'Типичный заказ',
      items: [
        { tr: 'Menü var mı?', ru: 'Меню есть?' },
        { tr: 'Bir çay istiyorum.', ru: 'Хочу один чай.' },
        { tr: 'İki kahve, lütfen.', ru: 'Два кофе, пожалуйста.' },
        { tr: 'Bunu istiyorum.', ru: 'Хочу вот это.' },
        { tr: 'Hesap, lütfen.', ru: 'Счёт, пожалуйста.' },
      ],
    },
    {
      type: 'tip',
      text:
        'Bir значит и «один», и «какой-то» — с ним заказ звучит мягче: ' +
        'Bir çay (чайку). После числа существительное без -lar: iki kahve.',
    },
    {
      type: 'text',
      text:
        'Официант — garson. Позвать вежливо: Bakar mısınız? («Посмотрите, пожалуйста» = ' +
        '«можно вас?»). Пожелание перед едой — Afiyet olsun.',
    },
  ],
  vocab: [
    { tr: 'garson', ru: 'официант' },
    { tr: 'menü', ru: 'меню' },
    { tr: 'hesap', ru: 'счёт' },
    { tr: 'sipariş', ru: 'заказ' },
    { tr: 'tatlı', ru: 'десерт / сладкое' },
    { tr: 'kahve', ru: 'кофе' },
    { tr: 'çay', ru: 'чай' },
    { tr: 'Afiyet olsun', ru: 'приятного аппетита' },
  ],
  exercises: [
    {
      type: 'assemble',
      ru: 'Хочу один чай.',
      words: ['Bir', 'çay', 'istiyorum'],
      correct: 'Bir çay istiyorum',
      explain: 'Bir çay (чай) → istiyorum. Объект перед глаголом.',
    },
    {
      type: 'choice',
      prompt: 'Как попросить счёт?',
      promptIsTurkish: false,
      options: ['Hesap, lütfen', 'Menü, lütfen', 'Garson, lütfen', 'Tatlı, lütfen'],
      correct: 0,
      explain: 'hesap — счёт. Hesap, lütfen.',
    },
    {
      type: 'choice',
      prompt: 'Menü var mı?',
      promptIsTurkish: true,
      options: ['Меню есть?', 'Где меню?', 'Это меню.', 'Меню, пожалуйста.'],
      correct: 0,
    },
    {
      type: 'assemble',
      ru: 'Два кофе, пожалуйста.',
      words: ['İki', 'kahve', 'lütfen'],
      correct: 'İki kahve lütfen',
      explain: 'После числа iki — kahve без -lar: İki kahve lütfen.',
    },
    {
      type: 'flashcard',
      tr: 'tatlı',
      ru: 'десерт / сладкое',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'menü', ru: 'меню' },
        { tr: 'hesap', ru: 'счёт' },
        { tr: 'garson', ru: 'официант' },
        { tr: 'tatlı', ru: 'десерт' },
      ],
    },
    {
      type: 'choice',
      prompt: 'Что сказать перед едой?',
      promptIsTurkish: false,
      options: ['Afiyet olsun', 'Hoşça kal', 'Teşekkürler', 'Görüşürüz'],
      correct: 0,
      explain: 'Afiyet olsun — «приятного аппетита».',
    },
    {
      type: 'choice',
      prompt: 'Как сказать «Хочу вот это» (показывая в меню)?',
      promptIsTurkish: false,
      options: ['Bunu istiyorum', 'Bu istiyorum', 'Bunu istiyor', 'Bu var mı'],
      correct: 0,
      explain: 'bu → bunu (винительный, определённый объект): Bunu istiyorum.',
    },
    {
      type: 'assemble',
      ru: 'Счёт, пожалуйста.',
      words: ['Hesap', 'lütfen'],
      correct: 'Hesap lütfen',
      explain: 'Hesap (счёт) + lütfen (пожалуйста).',
    },
    {
      type: 'flashcard',
      tr: 'garson',
      ru: 'официант',
    },
  ],
  test: [
    {
      type: 'assemble',
      ru: 'Хочу один кофе.',
      words: ['Bir', 'kahve', 'istiyorum'],
      correct: 'Bir kahve istiyorum',
      explain: 'Bir kahve (кофе) → istiyorum. Объект перед глаголом.',
    },
    {
      type: 'choice',
      prompt: 'Как попросить меню?',
      promptIsTurkish: false,
      options: ['Menü, lütfen', 'Hesap, lütfen', 'Garson, lütfen', 'Tatlı, lütfen'],
      correct: 0,
      explain: 'menü — меню. Menü, lütfen.',
    },
    {
      type: 'choice',
      prompt: 'Как сказать «два чая»?',
      promptIsTurkish: false,
      options: ['iki çay', 'iki çaylar', 'çaylar iki', 'iki çayler'],
      correct: 0,
      explain: 'После числа существительное без -lar: iki çay.',
    },
    {
      type: 'choice',
      prompt: 'Hesap, lütfen.',
      promptIsTurkish: true,
      options: ['Счёт, пожалуйста.', 'Меню, пожалуйста.', 'Приятного аппетита.', 'Счёт есть?'],
      correct: 0,
    },
    {
      type: 'choice',
      prompt: 'Как вежливо позвать официанта?',
      promptIsTurkish: false,
      options: ['Bakar mısınız?', 'Afiyet olsun', 'Hesap lütfen', 'Menü var mı'],
      correct: 0,
      explain: 'Bakar mısınız? — «можно вас?» (дословно «посмотрите, пожалуйста»).',
    },
    {
      type: 'choice',
      prompt: 'Как сказать «Хочу вот это» (показывая в меню)?',
      promptIsTurkish: false,
      options: ['Bunu istiyorum', 'Bu istiyorum', 'Bunu istiyor', 'Bu var mı'],
      correct: 0,
      explain: 'bu → bunu (винительный, определённый объект): Bunu istiyorum.',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'garson', ru: 'официант' },
        { tr: 'menü', ru: 'меню' },
        { tr: 'hesap', ru: 'счёт' },
        { tr: 'tatlı', ru: 'десерт' },
      ],
    },
    {
      type: 'assemble',
      ru: 'Меню есть?',
      words: ['Menü', 'var', 'mı'],
      correct: 'Menü var mı',
      explain: 'Предмет (menü) → var → вопросительная mı.',
    },
  ],
};

export default unit;
