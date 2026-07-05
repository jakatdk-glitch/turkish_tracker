import type { UnitContent } from '@/logic/course';

const unit: UnitContent = {
  id: 'u13',
  title: 'Настоящее время -iyor',
  theory: [
    {
      type: 'text',
      text:
        'Настоящее время (то, что происходит сейчас или вообще) строится так: ' +
        'основа глагола + -iyor + личное окончание. gel- (приходить) → geliyorum ' +
        '(я прихожу). Инфинитив всегда кончается на -mek/-mak, его отбрасываем.',
    },
    {
      type: 'table',
      title: 'Спряжение gelmek (приходить)',
      headers: ['Кто', 'Форма'],
      rows: [
        ['ben (я)', 'geliyorum'],
        ['sen (ты)', 'geliyorsun'],
        ['o (он/она)', 'geliyor'],
        ['biz (мы)', 'geliyoruz'],
        ['onlar (они)', 'geliyorlar'],
      ],
    },
    {
      type: 'tip',
      text:
        'Гласная в -iyor подстраивается по гармонии на 4: gel→geliyor, bak→bakıyor, ' +
        'gör→görüyor, otur→oturuyor.',
    },
    {
      type: 'tip',
      text:
        'Если основа кончается на e/a, эта гласная выпадает: bekle→bekliyor, ' +
        'başla→başlıyor. И запомни: gitmek → gidiyorum (t смягчается в d).',
    },
    {
      type: 'examples',
      title: 'Что я делаю',
      items: [
        { tr: 'Su içiyorum.', ru: 'Я пью воду.' },
        { tr: 'Kitap okuyorum.', ru: 'Я читаю книгу.' },
        { tr: 'Eve gidiyorum.', ru: 'Я иду домой.' },
        { tr: 'Ne yapıyorsun?', ru: 'Что ты делаешь?' },
      ],
    },
  ],
  vocab: [
    { tr: 'gelmek', ru: 'приходить' },
    { tr: 'gitmek', ru: 'идти / уходить' },
    { tr: 'yapmak', ru: 'делать' },
    { tr: 'içmek', ru: 'пить' },
    { tr: 'okumak', ru: 'читать' },
    { tr: 'bakmak', ru: 'смотреть' },
    { tr: 'geliyorum', ru: 'я прихожу' },
    { tr: 'gidiyorum', ru: 'я иду' },
    { tr: 'yapıyorum', ru: 'я делаю' },
    { tr: 'içiyorum', ru: 'я пью' },
  ],
  exercises: [
    {
      type: 'blank',
      ru: 'я прихожу (gel + …)',
      sentence: 'geli___',
      options: ['yorum', 'yorsun', 'yor', 'yoruz'],
      correct: 0,
      explain: 'Личное окончание «я» — -um: geliyorum.',
    },
    {
      type: 'blank',
      ru: 'ты приходишь',
      sentence: 'geli___',
      options: ['yorsun', 'yorum', 'yor', 'yorlar'],
      correct: 0,
      explain: 'Окончание «ты» — -sun: geliyorsun.',
    },
    {
      type: 'choice',
      prompt: 'Как будет «я делаю» (yapmak)?',
      promptIsTurkish: false,
      options: ['yapıyorum', 'yapiyorum', 'yapuyorum', 'yapıyorsun'],
      correct: 0,
      explain: 'Основа yap, последняя гласная a → -ıyor + um: yapıyorum.',
    },
    {
      type: 'choice',
      prompt: 'Ne yapıyorsun?',
      promptIsTurkish: true,
      options: ['Что ты делаешь?', 'Что я делаю?', 'Что он делает?', 'Куда идёшь?'],
      correct: 0,
    },
    {
      type: 'assemble',
      ru: 'Я пью воду.',
      words: ['Su', 'içiyorum'],
      correct: 'Su içiyorum',
      explain: 'Объект (su) перед глаголом — турецкий порядок слов.',
    },
    {
      type: 'flashcard',
      tr: 'okuyorum',
      ru: 'я читаю',
    },
    {
      type: 'choice',
      prompt: 'Как будет «я иду» (gitmek)?',
      promptIsTurkish: false,
      options: ['gidiyorum', 'gitiyorum', 'gidiyorsun', 'gidyorum'],
      correct: 0,
      explain: 'gitmek особый: t смягчается в d → gidiyorum.',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'geliyorum', ru: 'я прихожу' },
        { tr: 'gidiyorum', ru: 'я иду' },
        { tr: 'içiyorum', ru: 'я пью' },
        { tr: 'okuyorum', ru: 'я читаю' },
      ],
    },
    {
      type: 'assemble',
      ru: 'Я иду домой.',
      words: ['Eve', 'gidiyorum'],
      correct: 'Eve gidiyorum',
      explain: 'Направление (eve — домой) перед глаголом: Eve gidiyorum.',
    },
    {
      type: 'blank',
      ru: 'он смотрит (bak + …)',
      sentence: 'bak___',
      options: ['ıyor', 'iyor', 'uyor', 'ıyorum'],
      correct: 0,
      explain: 'Основа bak → -ıyor, «он» без окончания: bakıyor.',
    },
  ],
  test: [
    {
      type: 'blank',
      ru: 'я пью (iç + …)',
      sentence: 'içi___',
      options: ['yorum', 'yorsun', 'yor', 'yoruz'],
      correct: 0,
      explain: 'içi + yorum = içiyorum (я пью).',
    },
    {
      type: 'choice',
      prompt: 'Как будет «я смотрю» (bakmak)?',
      promptIsTurkish: false,
      options: ['bakıyorum', 'bakiyorum', 'bakuyorum', 'bakıyorsun'],
      correct: 0,
      explain: 'Основа bak, гласная a → -ıyor + um: bakıyorum.',
    },
    {
      type: 'choice',
      prompt: 'Как будет «он видит» (görmek)?',
      promptIsTurkish: false,
      options: ['görüyor', 'goruyor', 'göriyor', 'görüyorum'],
      correct: 0,
      explain: 'Основа gör, гласная ö → -üyor; «он» без окончания: görüyor.',
    },
    {
      type: 'blank',
      ru: 'мы приходим (gel + …)',
      sentence: 'geli___',
      options: ['yoruz', 'yorum', 'yorsun', 'yorlar'],
      correct: 0,
      explain: 'Окончание «мы» — -uz: geliyoruz.',
    },
    {
      type: 'choice',
      prompt: 'Как будет «я читаю» (okumak)?',
      promptIsTurkish: false,
      options: ['okuyorum', 'okıyorum', 'okuyoruz', 'okumuyorum'],
      correct: 0,
      explain: 'Основа oku + yor + um = okuyorum.',
    },
    {
      type: 'choice',
      prompt: 'Eve gidiyorum.',
      promptIsTurkish: true,
      options: ['Я иду домой.', 'Я иду из дома.', 'Ты идёшь домой.', 'Я пошёл домой.'],
      correct: 0,
    },
    {
      type: 'assemble',
      ru: 'Я читаю книгу.',
      words: ['Kitap', 'okuyorum'],
      correct: 'Kitap okuyorum',
      explain: 'Объект (kitap) перед глаголом — турецкий порядок слов.',
    },
    {
      type: 'blank',
      ru: 'ты делаешь (yap + …)',
      sentence: 'yapı___',
      options: ['yorsun', 'yorum', 'yor', 'yoruz'],
      correct: 0,
      explain: 'yap → -ıyor, окончание «ты» -sun: yapıyorsun.',
    },
  ],
};

export default unit;
