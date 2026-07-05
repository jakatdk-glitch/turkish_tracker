import type { UnitContent } from '@/logic/course';

const unit: UnitContent = {
  id: 'u19',
  title: 'Прошедшее время -di',
  theory: [
    {
      type: 'text',
      text:
        'Прошедшее время — суффикс -di + личное окончание. gel → geldim (я пришёл), ' +
        'gör → gördüm (я увидел). Гласная в -di подстраивается по гармонии на 4.',
    },
    {
      type: 'table',
      title: 'Прошедшее gelmek (приходить)',
      headers: ['Кто', 'Форма'],
      rows: [
        ['ben (я)', 'geldim'],
        ['sen (ты)', 'geldin'],
        ['o (он/она)', 'geldi'],
        ['biz (мы)', 'geldik'],
        ['onlar (они)', 'geldiler'],
      ],
    },
    {
      type: 'tip',
      text:
        'После глухих согласных (p,ç,t,k,s,ş,h,f) -di твердеет в -ti: ' +
        'yaptım (сделал), gittim (пошёл), içtim (выпил), baktım (посмотрел).',
    },
    {
      type: 'examples',
      title: 'Что было',
      items: [
        { tr: 'Dün geldim.', ru: 'Вчера я пришёл.' },
        { tr: 'Ne yaptın?', ru: 'Что ты делал?' },
        { tr: 'Eve gittim.', ru: 'Я пошёл домой.' },
        { tr: 'Çay içtim.', ru: 'Я выпил чаю.' },
      ],
    },
  ],
  vocab: [
    { tr: 'dün', ru: 'вчера' },
    { tr: 'geldim', ru: 'я пришёл' },
    { tr: 'gittim', ru: 'я пошёл' },
    { tr: 'yaptım', ru: 'я сделал' },
    { tr: 'gördüm', ru: 'я увидел' },
    { tr: 'içtim', ru: 'я выпил' },
    { tr: 'oldu', ru: 'случилось / стало' },
    { tr: 'ne yaptın', ru: 'что ты делал' },
  ],
  exercises: [
    {
      type: 'blank',
      ru: 'я пришёл (gel + …)',
      sentence: 'gel___',
      options: ['dim', 'dın', 'tim', 'dum'],
      correct: 0,
      explain: 'Звонкая l, гласная e → -di + m = geldim.',
    },
    {
      type: 'blank',
      ru: 'я сделал (yap + …, глухая p!)',
      sentence: 'yap___',
      options: ['tım', 'dım', 'tim', 'dim'],
      correct: 0,
      explain: 'yap кончается на глухую p → отвердение: yaptım.',
    },
    {
      type: 'blank',
      ru: 'я выпил (iç + …, глухая ç!)',
      sentence: 'iç___',
      options: ['tim', 'dim', 'tım', 'dım'],
      correct: 0,
      explain: 'iç кончается на глухую ç → отвердение: içtim.',
    },
    {
      type: 'choice',
      prompt: 'Как сказать «я увидел» (görmek)?',
      promptIsTurkish: false,
      options: ['gördüm', 'gordum', 'gördim', 'gördum'],
      correct: 0,
      explain: 'Основа gör, гласная ö → -dü + m = gördüm.',
    },
    {
      type: 'choice',
      prompt: 'Ne yaptın?',
      promptIsTurkish: true,
      options: ['Что ты делал?', 'Что ты делаешь?', 'Что ты сделаешь?', 'Куда ты пошёл?'],
      correct: 0,
    },
    {
      type: 'flashcard',
      tr: 'dün',
      ru: 'вчера',
    },
    {
      type: 'assemble',
      ru: 'Вчера я пришёл.',
      words: ['Dün', 'geldim'],
      correct: 'Dün geldim',
      explain: 'Dün (вчера) + geldim (я пришёл).',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'geldim', ru: 'я пришёл' },
        { tr: 'gittim', ru: 'я пошёл' },
        { tr: 'yaptım', ru: 'я сделал' },
        { tr: 'gördüm', ru: 'я увидел' },
      ],
    },
    {
      type: 'assemble',
      ru: 'Я пошёл домой.',
      words: ['Eve', 'gittim'],
      correct: 'Eve gittim',
      explain: 'Куда (eve) → глагол в прошедшем (gittim).',
    },
    {
      type: 'blank',
      ru: 'ты пришёл',
      sentence: 'gel___',
      options: ['din', 'dim', 'tin', 'dun'],
      correct: 0,
      explain: 'Окончание «ты» в прошедшем — -n: geldin.',
    },
  ],
  test: [
    {
      type: 'blank',
      ru: 'я посмотрел (bak + …, глухая k!)',
      sentence: 'bak___',
      options: ['tım', 'dım', 'tim', 'dim'],
      correct: 0,
      explain: 'bak кончается на глухую k → отвердение: baktım.',
    },
    {
      type: 'blank',
      ru: 'я прочитал (oku + …)',
      sentence: 'oku___',
      options: ['dum', 'tum', 'dım', 'dim'],
      correct: 0,
      explain: 'oku кончается на гласную u → -du: okudum.',
    },
    {
      type: 'choice',
      prompt: 'Как сказать «я пошёл» (gitmek)?',
      promptIsTurkish: false,
      options: ['gittim', 'gitdim', 'gittım', 'gidtim'],
      correct: 0,
      explain: 'git кончается на глухую t → отвердение: gittim.',
    },
    {
      type: 'choice',
      prompt: 'Что значит «geldin»?',
      promptIsTurkish: false,
      options: ['ты пришёл', 'я пришёл', 'он пришёл', 'мы пришли'],
      correct: 0,
      explain: 'Окончание «ты» в прошедшем — -n: geldin.',
    },
    {
      type: 'blank',
      ru: 'мы пришли (gel + …)',
      sentence: 'gel___',
      options: ['dik', 'dim', 'din', 'diler'],
      correct: 0,
      explain: 'Окончание «мы» — -k: geldik.',
    },
    {
      type: 'choice',
      prompt: 'Çay içtim.',
      promptIsTurkish: true,
      options: ['Я выпил чаю.', 'Я пью чай.', 'Хочу чаю.', 'Ты выпил чай?'],
      correct: 0,
    },
    {
      type: 'assemble',
      ru: 'Вчера я пошёл домой.',
      words: ['Dün', 'eve', 'gittim'],
      correct: 'Dün eve gittim',
      explain: 'Время (dün) → направление (eve) → глагол (gittim).',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'geldim', ru: 'я пришёл' },
        { tr: 'gittim', ru: 'я пошёл' },
        { tr: 'gördüm', ru: 'я увидел' },
        { tr: 'içtim', ru: 'я выпил' },
      ],
    },
  ],
};

export default unit;
