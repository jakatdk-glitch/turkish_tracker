import type { UnitContent } from '@/logic/course';

const unit: UnitContent = {
  id: 'u26',
  title: 'Условие -se/-sa (если)',
  theory: [
    {
      type: 'text',
      text:
        '«Если» — суффикс -se/-sa. Чаще всего к аористу: istersen (если хочешь), ' +
        'gelirse (если он придёт), yağmur yağarsa (если пойдёт дождь). Гармония на 2.',
    },
    {
      type: 'table',
      title: 'istemek → «если хочешь»',
      headers: ['Кто', 'Форма', 'Смысл'],
      rows: [
        ['ben', 'istersem', 'если я хочу'],
        ['sen', 'istersen', 'если ты хочешь'],
        ['o', 'isterse', 'если он хочет'],
      ],
    },
    {
      type: 'tip',
      text:
        'Схема: основа + аорист + -se/-sa + личное окончание. ' +
        'С прилагательным/существительным напрямую: müsaitsen (если ты свободен), varsa (если есть).',
    },
    {
      type: 'examples',
      title: 'Условия',
      items: [
        { tr: 'İstersen gel.', ru: 'Если хочешь — приходи.' },
        { tr: 'Vaktin varsa ara.', ru: 'Если есть время — позвони.' },
        { tr: 'Yağmur yağarsa evde kalırım.', ru: 'Если пойдёт дождь, останусь дома.' },
        { tr: 'Müsaitsen konuşuruz.', ru: 'Если ты свободен, поговорим.' },
      ],
    },
  ],
  vocab: [
    { tr: 'istersen', ru: 'если хочешь' },
    { tr: 'istersem', ru: 'если я хочу' },
    { tr: 'gelirse', ru: 'если он придёт' },
    { tr: 'olursa', ru: 'если будет / случится' },
    { tr: 'varsa', ru: 'если есть' },
    { tr: 'yoksa', ru: 'если нет / иначе' },
    { tr: 'müsait', ru: 'свободный / доступный' },
    { tr: 'yağmur', ru: 'дождь' },
    { tr: 'kalmak', ru: 'оставаться' },
    { tr: 'eğer', ru: 'если (усилитель)' },
  ],
  exercises: [
    {
      type: 'choice',
      prompt: 'Как «если хочешь» (istemek)?',
      promptIsTurkish: false,
      options: ['istersen', 'istiyorsun', 'istedin', 'isteme'],
      correct: 0,
      explain: 'Аорист ister + -sen: istersen.',
    },
    {
      type: 'choice',
      prompt: 'İstersen gel.',
      promptIsTurkish: true,
      options: ['Если хочешь — приходи.', 'Ты хочешь прийти.', 'Приходи с желанием.', 'Хочешь, приду.'],
      correct: 0,
    },
    {
      type: 'blank',
      ru: 'если есть время (var + -sa)',
      sentence: 'Vaktin var__ ara',
      options: ['sa', 'se', 'sın', 'dı'],
      correct: 0,
      explain: 'varsa — «если есть».',
    },
    {
      type: 'choice',
      prompt: 'Как «если он придёт»?',
      promptIsTurkish: false,
      options: ['gelirse', 'geliyor', 'geldi', 'gelecek'],
      correct: 0,
      explain: 'gelir + -se: gelirse.',
    },
    {
      type: 'flashcard',
      tr: 'müsait',
      ru: 'свободный / доступный',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'istersen', ru: 'если хочешь' },
        { tr: 'gelirse', ru: 'если он придёт' },
        { tr: 'varsa', ru: 'если есть' },
        { tr: 'olursa', ru: 'если будет' },
      ],
    },
    {
      type: 'assemble',
      ru: 'Если хочешь — позвони.',
      words: ['İstersen', 'ara'],
      correct: 'İstersen ara',
      explain: 'istersen (если хочешь) + ara (позвони).',
    },
    {
      type: 'choice',
      prompt: 'Что значит суффикс -se/-sa?',
      promptIsTurkish: false,
      options: ['если', 'когда', 'потому что', 'чтобы'],
      correct: 0,
    },
    {
      type: 'flashcard',
      tr: 'yağmur',
      ru: 'дождь',
    },
    {
      type: 'choice',
      prompt: 'Yağmur yağarsa evde kalırım.',
      promptIsTurkish: true,
      options: [
        'Если пойдёт дождь, останусь дома.',
        'Идёт дождь, я дома.',
        'Дождь шёл, я остался.',
        'Дождь пойдёт, выйду.',
      ],
      correct: 0,
    },
  ],
  test: [
    {
      type: 'choice',
      prompt: 'Как «если ты свободен» (müsait)?',
      promptIsTurkish: false,
      options: ['müsaitsen', 'müsaitsin', 'müsaitti', 'müsait'],
      correct: 0,
      explain: 'müsait + -sen: müsaitsen.',
    },
    {
      type: 'blank',
      ru: 'если хочешь (ister + …)',
      sentence: 'ister__ gel',
      options: ['sen', 'sem', 'se', 'din'],
      correct: 0,
      explain: '«Если ты хочешь» — istersen.',
    },
    {
      type: 'choice',
      prompt: 'Как «если будет / случится»?',
      promptIsTurkish: false,
      options: ['olursa', 'oluyor', 'oldu', 'olacak'],
      correct: 0,
      explain: 'olur + -sa: olursa.',
    },
    {
      type: 'choice',
      prompt: 'Vaktin varsa ara.',
      promptIsTurkish: true,
      options: ['Если есть время, позвони.', 'У тебя есть время?', 'Времени нет, звони.', 'Позвони вовремя.'],
      correct: 0,
    },
    {
      type: 'choice',
      prompt: 'Суффикс -se/-sa выражает…',
      promptIsTurkish: false,
      options: ['условие «если»', 'время «когда»', 'цель «чтобы»', 'причину'],
      correct: 0,
    },
    {
      type: 'assemble',
      ru: 'Если хочешь — приходи.',
      words: ['İstersen', 'gel'],
      correct: 'İstersen gel',
      explain: 'istersen + gel.',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'istersen', ru: 'если хочешь' },
        { tr: 'gelirse', ru: 'если придёт' },
        { tr: 'varsa', ru: 'если есть' },
        { tr: 'olursa', ru: 'если будет' },
      ],
    },
    {
      type: 'choice',
      prompt: '«gelirse» значит…',
      promptIsTurkish: false,
      options: ['если он придёт', 'когда он пришёл', 'он придёт', 'он приходит'],
      correct: 0,
    },
  ],
};

export default unit;
