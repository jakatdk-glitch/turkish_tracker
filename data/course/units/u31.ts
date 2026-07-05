import type { UnitContent } from '@/logic/course';

const unit: UnitContent = {
  id: 'u31',
  title: 'Итоговый юнит: собираем всё вместе',
  theory: [
    {
      type: 'text',
      text:
        'Финал курса — соберём грамматику модулей 4–5 в живых диалогах: планы, желания, ' +
        'условия, время. Ничего нового, только повторение в связке.',
    },
    {
      type: 'examples',
      title: 'Диалог: планы на вечер',
      items: [
        { tr: 'Bu akşam ne yapacaksın?', ru: 'Что будешь делать вечером?' },
        { tr: 'İşten sonra spor yapacağım.', ru: 'После работы позанимаюсь спортом.' },
        { tr: 'İstersen birlikte gideriz.', ru: 'Если хочешь, пойдём вместе.' },
        { tr: 'Tabii! Seninle gelirim.', ru: 'Конечно! Я приду с тобой.' },
      ],
    },
    {
      type: 'examples',
      title: 'Диалог: в кафе',
      items: [
        { tr: 'Bir çay istiyorum, mümkün mü?', ru: 'Хочу чай, можно?' },
        { tr: 'Tabii, hemen getiririm.', ru: 'Конечно, сейчас принесу.' },
        { tr: 'Vaktim yok, hesap alabilir miyim?', ru: 'У меня нет времени, можно счёт?' },
      ],
    },
    {
      type: 'tip',
      text:
        'Заметь, как всё работает вместе: будущее (yapacağım), аорист (gideriz), ' +
        'условие (istersen), «у меня нет» (vaktim yok), послелоги (seninle, işten sonra).',
    },
  ],
  vocab: [
    { tr: 'birlikte', ru: 'вместе' },
    { tr: 'mümkün', ru: 'возможно / можно' },
    { tr: 'hemen', ru: 'сразу / немедленно' },
    { tr: 'getirmek', ru: 'приносить' },
    { tr: 'bu akşam', ru: 'сегодня вечером' },
    { tr: 'plan', ru: 'план' },
    { tr: 'birlikte gideriz', ru: 'пойдём вместе' },
    { tr: 'seninle gelirim', ru: 'я приду с тобой' },
    { tr: 'hesap', ru: 'счёт' },
    { tr: 'spor', ru: 'спорт' },
  ],
  exercises: [
    {
      type: 'choice',
      prompt: 'Bu akşam ne yapacaksın?',
      promptIsTurkish: true,
      options: ['Что будешь делать вечером?', 'Что ты делал вечером?', 'Что делаешь сейчас?', 'Где ты вечером?'],
      correct: 0,
    },
    {
      type: 'assemble',
      ru: 'После работы позанимаюсь спортом.',
      words: ['İşten', 'sonra', 'spor', 'yapacağım'],
      correct: 'İşten sonra spor yapacağım',
      explain: 'işten sonra (после работы) + будущее yapacağım.',
    },
    {
      type: 'choice',
      prompt: 'Как «Если хочешь, пойдём вместе»?',
      promptIsTurkish: false,
      options: ['İstersen birlikte gideriz', 'İstiyorsun birlikte', 'Birlikte gittik', 'Gidersen birlikte'],
      correct: 0,
      explain: 'Условие istersen + аорист gideriz.',
    },
    {
      type: 'assemble',
      ru: 'Я приду с тобой.',
      words: ['Seninle', 'gelirim'],
      correct: 'Seninle gelirim',
      explain: 'seninle (с тобой) + аорист gelirim.',
    },
    {
      type: 'flashcard',
      tr: 'birlikte',
      ru: 'вместе',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'birlikte', ru: 'вместе' },
        { tr: 'mümkün', ru: 'можно' },
        { tr: 'hemen', ru: 'сразу' },
        { tr: 'getirmek', ru: 'приносить' },
      ],
    },
    {
      type: 'choice',
      prompt: 'Vaktim yok.',
      promptIsTurkish: true,
      options: ['У меня нет времени.', 'У меня есть время.', 'Который час?', 'Я не могу.'],
      correct: 0,
    },
    {
      type: 'choice',
      prompt: 'Как вежливо «Можно счёт?»',
      promptIsTurkish: false,
      options: ['Hesap alabilir miyim?', 'Hesap var mı?', 'Hesap istiyorum?', 'Hesap nerede?'],
      correct: 0,
      explain: '-abilir miyim — «можно ли мне».',
    },
    {
      type: 'flashcard',
      tr: 'hemen',
      ru: 'сразу',
    },
    {
      type: 'assemble',
      ru: 'Что будешь делать вечером?',
      words: ['Bu', 'akşam', 'ne', 'yapacaksın'],
      correct: 'Bu akşam ne yapacaksın',
      explain: 'bu akşam (вечером) + будущее-вопрос yapacaksın.',
    },
  ],
  test: [
    {
      type: 'choice',
      prompt: 'Как «После работы позанимаюсь спортом»?',
      promptIsTurkish: false,
      options: ['İşten sonra spor yapacağım', 'İşten önce spor yaptım', 'İş sonra spor', 'Spor işten sonra'],
      correct: 0,
      explain: 'işten sonra + будущее yapacağım.',
    },
    {
      type: 'choice',
      prompt: 'Как «Если хочешь, приходи»?',
      promptIsTurkish: false,
      options: ['İstersen gel', 'İstiyorsun gel', 'İstedin gel', 'İstemek gel'],
      correct: 0,
      explain: 'Условие istersen.',
    },
    {
      type: 'assemble',
      ru: 'Я приду с тобой вечером.',
      words: ['Bu', 'akşam', 'seninle', 'gelirim'],
      correct: 'Bu akşam seninle gelirim',
      explain: 'bu akşam + seninle + аорист gelirim.',
    },
    {
      type: 'choice',
      prompt: 'Birlikte gideriz.',
      promptIsTurkish: true,
      options: ['Пойдём вместе.', 'Мы пошли вместе.', 'Идём вместе сейчас.', 'Иди со мной.'],
      correct: 0,
    },
    {
      type: 'choice',
      prompt: 'Как сказать «У меня нет времени»?',
      promptIsTurkish: false,
      options: ['Vaktim yok', 'Vaktim var', 'Zaman ne', 'Vakit yok mu'],
      correct: 0,
      explain: 'vaktim (моё время) + yok.',
    },
    {
      type: 'choice',
      prompt: 'Как вежливо «Можно счёт?»',
      promptIsTurkish: false,
      options: ['Hesap alabilir miyim?', 'Hesap var', 'Hesap nerede', 'Hesap istiyorum'],
      correct: 0,
      explain: '-abilir miyim — «можно ли мне».',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'birlikte', ru: 'вместе' },
        { tr: 'mümkün', ru: 'можно' },
        { tr: 'hemen', ru: 'сразу' },
        { tr: 'bu akşam', ru: 'вечером' },
      ],
    },
    {
      type: 'assemble',
      ru: 'Что будешь делать вечером?',
      words: ['Bu', 'akşam', 'ne', 'yapacaksın'],
      correct: 'Bu akşam ne yapacaksın',
      explain: 'Будущее-вопрос yapacaksın.',
    },
  ],
};

export default unit;
