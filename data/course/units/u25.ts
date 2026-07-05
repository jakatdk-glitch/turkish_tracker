import type { UnitContent } from '@/logic/course';

const unit: UnitContent = {
  id: 'u25',
  title: 'Послелоги ile (с) и için (для)',
  theory: [
    {
      type: 'text',
      text:
        'ile = «с» (вместе) или «на» (транспорт/инструмент). Часто прилипает как -le/-la: ' +
        'otobüs ile = otobüsle (на автобусе). Личная форма: benimle — «со мной».',
    },
    {
      type: 'text',
      text:
        'için = «для» / «чтобы». senin için — «для тебя», bunun için — «поэтому». ' +
        'С инфинитивом: görmek için — «чтобы увидеть».',
    },
    {
      type: 'table',
      title: 'ile и için',
      headers: ['Турецкий', 'Смысл'],
      rows: [
        ['benimle', 'со мной'],
        ['seninle', 'с тобой'],
        ['otobüsle', 'на автобусе'],
        ['senin için', 'для тебя'],
        ['gitmek için', 'чтобы пойти'],
      ],
    },
    {
      type: 'tip',
      text:
        'Личные формы ile: benimle, seninle, onunla, bizimle. ' +
        'için с местоимениями берёт родительный: benim için, senin için, onun için.',
    },
    {
      type: 'examples',
      title: 'В речи',
      items: [
        { tr: 'Seninle geliyorum.', ru: 'Я иду с тобой.' },
        { tr: 'Bu senin için.', ru: 'Это для тебя.' },
        { tr: 'Otobüsle gidiyorum.', ru: 'Я еду на автобусе.' },
        { tr: 'Görmek için geldim.', ru: 'Я пришёл, чтобы увидеть.' },
      ],
    },
  ],
  vocab: [
    { tr: 'ile', ru: 'с / на (вместе)' },
    { tr: 'için', ru: 'для / чтобы' },
    { tr: 'benimle', ru: 'со мной' },
    { tr: 'seninle', ru: 'с тобой' },
    { tr: 'otobüsle', ru: 'на автобусе' },
    { tr: 'senin için', ru: 'для тебя' },
    { tr: 'benim için', ru: 'для меня' },
    { tr: 'bunun için', ru: 'поэтому / для этого' },
    { tr: 'gelmek', ru: 'приходить' },
    { tr: 'otobüs', ru: 'автобус' },
  ],
  exercises: [
    {
      type: 'choice',
      prompt: 'Как «со мной»?',
      promptIsTurkish: false,
      options: ['benimle', 'benim için', 'benden', 'bende'],
      correct: 0,
      explain: 'ile в личной форме: benimle.',
    },
    {
      type: 'choice',
      prompt: 'Как «для тебя»?',
      promptIsTurkish: false,
      options: ['senin için', 'seninle', 'senden', 'sana'],
      correct: 0,
      explain: 'için с родительным: senin için.',
    },
    {
      type: 'choice',
      prompt: 'Otobüsle gidiyorum.',
      promptIsTurkish: true,
      options: ['Я еду на автобусе.', 'Я иду к автобусу.', 'Автобус едет.', 'Я жду автобус.'],
      correct: 0,
    },
    {
      type: 'choice',
      prompt: 'Как «чтобы увидеть» (görmek)?',
      promptIsTurkish: false,
      options: ['görmek için', 'görmekle', 'görüyor için', 'görmek ile'],
      correct: 0,
      explain: 'Инфинитив + için = «чтобы».',
    },
    {
      type: 'flashcard',
      tr: 'için',
      ru: 'для / чтобы',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'benimle', ru: 'со мной' },
        { tr: 'seninle', ru: 'с тобой' },
        { tr: 'senin için', ru: 'для тебя' },
        { tr: 'otobüsle', ru: 'на автобусе' },
      ],
    },
    {
      type: 'assemble',
      ru: 'Это для тебя.',
      words: ['Bu', 'senin', 'için'],
      correct: 'Bu senin için',
      explain: 'senin için — «для тебя».',
    },
    {
      type: 'choice',
      prompt: 'Seninle geliyorum.',
      promptIsTurkish: true,
      options: ['Я иду с тобой.', 'Я иду к тебе.', 'Я иду для тебя.', 'Ты идёшь со мной.'],
      correct: 0,
    },
    {
      type: 'flashcard',
      tr: 'otobüs',
      ru: 'автобус',
    },
    {
      type: 'choice',
      prompt: 'В чём разница ile и için?',
      promptIsTurkish: false,
      options: ['ile — «с», için — «для/чтобы»', 'это одно и то же', 'ile — «для»', 'için — «на»'],
      correct: 0,
    },
  ],
  test: [
    {
      type: 'choice',
      prompt: 'Как «с тобой»?',
      promptIsTurkish: false,
      options: ['seninle', 'senin için', 'senden', 'sende'],
      correct: 0,
      explain: 'ile в личной форме: seninle.',
    },
    {
      type: 'choice',
      prompt: 'Как «для меня»?',
      promptIsTurkish: false,
      options: ['benim için', 'benimle', 'benden', 'bana'],
      correct: 0,
      explain: 'için + родительный: benim için.',
    },
    {
      type: 'choice',
      prompt: 'Как «на автобусе»?',
      promptIsTurkish: false,
      options: ['otobüsle', 'otobüs için', 'otobüse', 'otobüsten'],
      correct: 0,
      explain: 'ile = «на» (транспорт): otobüsle.',
    },
    {
      type: 'choice',
      prompt: 'Как «чтобы прийти» (gelmek)?',
      promptIsTurkish: false,
      options: ['gelmek için', 'gelmekle', 'geliyor için', 'gelmek ile'],
      correct: 0,
      explain: 'Инфинитив + için.',
    },
    {
      type: 'choice',
      prompt: 'Bu senin için.',
      promptIsTurkish: true,
      options: ['Это для тебя.', 'Это с тобой.', 'Это твоё.', 'Это от тебя.'],
      correct: 0,
    },
    {
      type: 'assemble',
      ru: 'Я иду с тобой.',
      words: ['Seninle', 'geliyorum'],
      correct: 'Seninle geliyorum',
      explain: 'seninle (с тобой) + глагол.',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'ile', ru: 'с' },
        { tr: 'için', ru: 'для / чтобы' },
        { tr: 'benimle', ru: 'со мной' },
        { tr: 'senin için', ru: 'для тебя' },
      ],
    },
    {
      type: 'choice',
      prompt: '«Görmek için geldim» значит…',
      promptIsTurkish: false,
      options: ['Я пришёл, чтобы увидеть', 'Я пришёл с …', 'Я вижу', 'Я увидел'],
      correct: 0,
    },
  ],
};

export default unit;
