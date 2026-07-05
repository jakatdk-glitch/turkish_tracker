import type { UnitContent } from '@/logic/course';

const unit: UnitContent = {
  id: 'u20',
  title: 'Аорист: привычки и общее -er/-ir',
  theory: [
    {
      type: 'text',
      text:
        'Аорист (geniş zaman) — время привычек, общих истин и предложений. ' +
        'В отличие от -iyor («делаю прямо сейчас»), аорист — «делаю вообще»: ' +
        'Her sabah çay içerim — «Я каждое утро пью чай».',
    },
    {
      type: 'table',
      title: 'Положительная форма (я)',
      headers: ['Глагол', 'Я-форма', 'Смысл'],
      rows: [
        ['içmek', 'içerim', 'я пью (обычно)'],
        ['gitmek', 'giderim', 'я хожу'],
        ['gelmek', 'gelirim', 'я прихожу'],
        ['yapmak', 'yaparım', 'я делаю'],
        ['sevmek', 'severim', 'я люблю'],
      ],
    },
    {
      type: 'tip',
      text:
        'Гласная аориста: у многих коротких основ — -ar/-er (yaparım, içerim), ' +
        'у длинных — -ır/-ir/-ur/-ür (otururum). Частые глаголы проще запомнить целиком.',
    },
    {
      type: 'text',
      text:
        'Отрицание особенное — -mem/-mam: içmem (я не пью), gitmem (я не хожу). ' +
        'Для «он» — -mez/-maz: O et yemez (он не ест мяса).',
    },
    {
      type: 'examples',
      title: 'Привычки',
      items: [
        { tr: 'Her gün süt içerim.', ru: 'Я каждый день пью молоко.' },
        { tr: 'Sabah kahve içerim.', ru: 'Утром я пью кофе.' },
        { tr: 'Et yemem.', ru: 'Я не ем мясо.' },
        { tr: 'Çay içer misin?', ru: 'Будешь чай? (пьёшь ли ты чай)' },
      ],
    },
  ],
  vocab: [
    { tr: 'içerim', ru: 'я пью (обычно)' },
    { tr: 'giderim', ru: 'я хожу' },
    { tr: 'gelirim', ru: 'я прихожу' },
    { tr: 'yaparım', ru: 'я делаю' },
    { tr: 'severim', ru: 'я люблю' },
    { tr: 'bilirim', ru: 'я знаю' },
    { tr: 'içmem', ru: 'я не пью' },
    { tr: 'her gün', ru: 'каждый день' },
    { tr: 'her sabah', ru: 'каждое утро' },
    { tr: 'bazen', ru: 'иногда' },
  ],
  exercises: [
    {
      type: 'choice',
      prompt: '«Каждое утро я пью чай» — какое время?',
      promptIsTurkish: false,
      options: ['Her sabah çay içerim', 'Şu an çay içiyorum', 'Çay içtim', 'Çay içeceğim'],
      correct: 0,
      explain: 'Привычка → аорист içerim. içiyorum — «пью прямо сейчас».',
    },
    {
      type: 'choice',
      prompt: 'Her gün süt içerim.',
      promptIsTurkish: true,
      options: ['Я каждый день пью молоко.', 'Я сейчас пью молоко.', 'Я выпил молоко.', 'Я буду пить молоко.'],
      correct: 0,
    },
    {
      type: 'blank',
      ru: 'я хожу (git → аорист)',
      sentence: 'gid___',
      options: ['erim', 'ersin', 'iyorum', 'ecek'],
      correct: 0,
      explain: 'giderim — «я хожу (вообще)».',
    },
    {
      type: 'choice',
      prompt: 'Как сказать «Я не ем мясо» (привычка)?',
      promptIsTurkish: false,
      options: ['Et yemem', 'Et yemiyorum', 'Et yedim', 'Et yiyorum'],
      correct: 0,
      explain: 'Отрицание аориста «я» — -mem: yemem.',
    },
    {
      type: 'flashcard',
      tr: 'severim',
      ru: 'я люблю',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'içerim', ru: 'я пью' },
        { tr: 'giderim', ru: 'я хожу' },
        { tr: 'gelirim', ru: 'я прихожу' },
        { tr: 'yaparım', ru: 'я делаю' },
      ],
    },
    {
      type: 'choice',
      prompt: 'Чем «içerim» отличается от «içiyorum»?',
      promptIsTurkish: false,
      options: [
        'içerim — вообще/обычно, içiyorum — сейчас',
        'это одно и то же',
        'içerim — прошлое',
        'içerim — будущее',
      ],
      correct: 0,
    },
    {
      type: 'assemble',
      ru: 'Я каждый день пью чай.',
      words: ['Her', 'gün', 'çay', 'içerim'],
      correct: 'Her gün çay içerim',
      explain: 'her gün (каждый день) + аорист içerim.',
    },
    {
      type: 'choice',
      prompt: 'Çay içer misin?',
      promptIsTurkish: true,
      options: ['Будешь чай?', 'Ты пьёшь чай сейчас?', 'Ты выпил чай?', 'Ты любишь чай?'],
      correct: 0,
      explain: 'Аорист-вопрос — вежливое предложение «будешь ли».',
    },
    {
      type: 'flashcard',
      tr: 'her gün',
      ru: 'каждый день',
    },
  ],
  test: [
    {
      type: 'choice',
      prompt: 'Как сказать «Я каждое утро пью кофе»?',
      promptIsTurkish: false,
      options: ['Her sabah kahve içerim', 'Şimdi kahve içiyorum', 'Kahve içtim', 'Kahve içeceğim'],
      correct: 0,
      explain: 'Привычка → аорист içerim.',
    },
    {
      type: 'blank',
      ru: 'я прихожу (gel → аорист)',
      sentence: 'gel___',
      options: ['irim', 'erim', 'iyorum', 'dim'],
      correct: 0,
      explain: 'gelirim — «я прихожу (вообще)».',
    },
    {
      type: 'choice',
      prompt: 'Как сказать «я не хожу» (аорист-отрицание)?',
      promptIsTurkish: false,
      options: ['gitmem', 'gitmiyorum', 'gitmedim', 'gidiyorum'],
      correct: 0,
      explain: 'Отрицание аориста «я» — -mem: gitmem.',
    },
    {
      type: 'choice',
      prompt: 'Sabah kahve içerim.',
      promptIsTurkish: true,
      options: ['Утром я пью кофе.', 'Утром я пил кофе.', 'Сейчас я пью кофе.', 'Утром выпью кофе.'],
      correct: 0,
    },
    {
      type: 'choice',
      prompt: 'Какое время значит «вообще, обычно»?',
      promptIsTurkish: false,
      options: ['аорист (içerim)', 'настоящее (içiyorum)', 'прошедшее (içtim)', 'будущее (içeceğim)'],
      correct: 0,
    },
    {
      type: 'assemble',
      ru: 'Я иногда пью кофе.',
      words: ['Bazen', 'kahve', 'içerim'],
      correct: 'Bazen kahve içerim',
      explain: 'bazen (иногда) + аорист içerim.',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'severim', ru: 'я люблю' },
        { tr: 'bilirim', ru: 'я знаю' },
        { tr: 'giderim', ru: 'я хожу' },
        { tr: 'gelirim', ru: 'я прихожу' },
      ],
    },
    {
      type: 'choice',
      prompt: 'Как вежливо предложить «Будешь чай?»',
      promptIsTurkish: false,
      options: ['Çay içer misin?', 'Çay içiyor musun?', 'Çay içtin mi?', 'Çay var mı?'],
      correct: 0,
      explain: 'Аорист-вопрос = мягкое предложение.',
    },
  ],
};

export default unit;
