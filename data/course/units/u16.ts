import type { UnitContent } from '@/logic/course';

const unit: UnitContent = {
  id: 'u16',
  title: 'Хочу и могу',
  theory: [
    {
      type: 'text',
      text:
        'istemek — «хотеть». Su istiyorum — «хочу воды». А чтобы сказать «хочу что-то ' +
        'сделать», ставим инфинитив + istiyorum: Gitmek istiyorum — «хочу пойти».',
    },
    {
      type: 'examples',
      title: 'Хочу…',
      items: [
        { tr: 'Çay istiyorum.', ru: 'Хочу чаю.' },
        { tr: 'Gitmek istiyorum.', ru: 'Хочу пойти.' },
        { tr: 'Uyumak istiyorum.', ru: 'Хочу спать.' },
      ],
    },
    {
      type: 'text',
      text:
        '«Могу» — суффикс -abil/-ebil + окончание. gel → gelebilirim (могу прийти), ' +
        'yap → yapabilirim (могу сделать). -ebil после мягких гласных, -abil после твёрдых.',
    },
    {
      type: 'examples',
      title: 'Могу…',
      items: [
        { tr: 'Yardım edebilirim.', ru: 'Я могу помочь.' },
        { tr: 'Gelebilir misin?', ru: 'Ты можешь прийти?' },
        { tr: 'Yapabilirim.', ru: 'Я могу это сделать.' },
      ],
    },
    {
      type: 'tip',
      text:
        'Вежливая просьба часто звучит как вопрос «можешь ли»: ' +
        'Yardım edebilir misiniz? — «Не могли бы вы помочь?»',
    },
  ],
  vocab: [
    { tr: 'istemek', ru: 'хотеть' },
    { tr: 'istiyorum', ru: 'я хочу' },
    { tr: 'uyumak', ru: 'спать' },
    { tr: 'yardım', ru: 'помощь' },
    { tr: 'gelebilirim', ru: 'я могу прийти' },
    { tr: 'yapabilirim', ru: 'я могу сделать' },
    { tr: 'belki', ru: 'может быть' },
    { tr: 'tabii', ru: 'конечно' },
  ],
  exercises: [
    {
      type: 'choice',
      prompt: 'Как сказать «Хочу пойти»?',
      promptIsTurkish: false,
      options: ['Gitmek istiyorum', 'Gidiyorum istiyorum', 'Gitmek istiyor', 'İstiyorum gitmek'],
      correct: 0,
      explain: 'Инфинитив (gitmek) + istiyorum: Gitmek istiyorum.',
    },
    {
      type: 'choice',
      prompt: 'Çay istiyorum.',
      promptIsTurkish: true,
      options: ['Хочу чаю.', 'Пью чай.', 'Есть чай?', 'Где чай?'],
      correct: 0,
    },
    {
      type: 'assemble',
      ru: 'Хочу пить. (хочу пить = пить + хочу)',
      words: ['İçmek', 'istiyorum'],
      correct: 'İçmek istiyorum',
      explain: 'Инфинитив içmek + istiyorum: İçmek istiyorum.',
    },
    {
      type: 'choice',
      prompt: 'Как сказать «Я могу сделать»?',
      promptIsTurkish: false,
      options: ['Yapabilirim', 'Yapabilir', 'Yapiyorum', 'Yapmak istiyorum'],
      correct: 0,
      explain: 'yap + -abil + -ir + -im = yapabilirim.',
    },
    {
      type: 'flashcard',
      tr: 'yardım',
      ru: 'помощь',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'istiyorum', ru: 'я хочу' },
        { tr: 'gelebilirim', ru: 'я могу прийти' },
        { tr: 'yardım', ru: 'помощь' },
        { tr: 'belki', ru: 'может быть' },
      ],
    },
    {
      type: 'choice',
      prompt: 'Gelebilir misin?',
      promptIsTurkish: true,
      options: ['Ты можешь прийти?', 'Ты приходишь?', 'Ты хочешь прийти?', 'Ты пришёл?'],
      correct: 0,
      explain: '-ebilir misin — «можешь ли ты»: Gelebilir misin?',
    },
    {
      type: 'assemble',
      ru: 'Хочу чаю.',
      words: ['Çay', 'istiyorum'],
      correct: 'Çay istiyorum',
      explain: 'Объект (çay) перед istiyorum.',
    },
    {
      type: 'choice',
      prompt: 'Как будет «Я могу прийти»?',
      promptIsTurkish: false,
      options: ['Gelebilirim', 'Gelabilirim', 'Geliyorum', 'Gelmek istiyorum'],
      correct: 0,
      explain: 'gel — мягкая основа → -ebil: gelebilirim.',
    },
    {
      type: 'flashcard',
      tr: 'tabii',
      ru: 'конечно',
    },
  ],
  test: [
    {
      type: 'choice',
      prompt: 'Как сказать «Хочу спать» (uyumak)?',
      promptIsTurkish: false,
      options: ['Uyumak istiyorum', 'Uyuyorum istiyorum', 'Uyumak istiyor', 'İstiyorum uyumak'],
      correct: 0,
      explain: 'Инфинитив (uyumak) + istiyorum.',
    },
    {
      type: 'assemble',
      ru: 'Хочу пойти.',
      words: ['Gitmek', 'istiyorum'],
      correct: 'Gitmek istiyorum',
      explain: 'Инфинитив gitmek + istiyorum.',
    },
    {
      type: 'choice',
      prompt: 'Как сказать «Я могу прийти» (gelmek)?',
      promptIsTurkish: false,
      options: ['Gelebilirim', 'Gelabilirim', 'Geliyorum', 'Gelmek istiyorum'],
      correct: 0,
      explain: 'gel — мягкая основа → -ebil: gelebilirim.',
    },
    {
      type: 'choice',
      prompt: 'Как сказать «Я могу помочь»?',
      promptIsTurkish: false,
      options: ['Yardım edebilirim', 'Yardım ediyorum', 'Yardım yapabilirim', 'Yardım istiyorum'],
      correct: 0,
      explain: 'yardım et- + -ebil = Yardım edebilirim.',
    },
    {
      type: 'choice',
      prompt: 'Gitmek istiyorum.',
      promptIsTurkish: true,
      options: ['Хочу пойти.', 'Я иду.', 'Могу пойти.', 'Я пошёл.'],
      correct: 0,
    },
    {
      type: 'choice',
      prompt: 'После твёрдой основы (yap) какой суффикс «могу»?',
      promptIsTurkish: false,
      options: ['-abil (yapabilirim)', '-ebil (yapebilirim)', '-iyor', '-mek'],
      correct: 0,
      explain: 'Твёрдые гласные → -abil: yapabilirim.',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'istiyorum', ru: 'я хочу' },
        { tr: 'gelebilirim', ru: 'я могу прийти' },
        { tr: 'yardım', ru: 'помощь' },
        { tr: 'tabii', ru: 'конечно' },
      ],
    },
    {
      type: 'assemble',
      ru: 'Ты можешь прийти?',
      words: ['Gelebilir', 'misin'],
      correct: 'Gelebilir misin',
      explain: '-ebilir misin — «можешь ли ты»: Gelebilir misin?',
    },
  ],
};

export default unit;
