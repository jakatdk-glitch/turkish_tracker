import type { UnitContent } from '@/logic/course';

const unit: UnitContent = {
  id: 'u01',
  title: 'Алфавит и произношение',
  theory: [
    {
      type: 'text',
      text:
        'Турецкий использует латиницу — 29 букв. Главная хорошая новость: ' +
        'слова читаются ровно так, как пишутся, всегда. Выучив 8 особых букв, ' +
        'ты сможешь прочитать любое турецкое слово.',
    },
    {
      type: 'table',
      title: '8 особых букв',
      headers: ['Буква', 'Звук', 'Пример'],
      rows: [
        ['C c', 'дж', 'cam — стекло'],
        ['Ç ç', 'ч', 'çay — чай'],
        ['Ğ ğ', 'не читается, тянет гласный', 'dağ — гора'],
        ['I ı', 'ы (без точки!)', 'ısı — тепло'],
        ['İ i', 'и (с точкой)', 'iyi — хорошо'],
        ['Ö ö', 'ё без «й» (как в нём)', 'göz — глаз'],
        ['Ş ş', 'ш', 'şeker — сахар'],
        ['Ü ü', 'ю без «й» (как в тюль)', 'üzüm — виноград'],
      ],
    },
    {
      type: 'tip',
      text:
        'Ловушка для русскоговорящих: ı (без точки) и i (с точкой) — разные буквы ' +
        'и разные звуки! kız (девочка) читается «кыз», а kim (кто) — «ким».',
    },
    {
      type: 'examples',
      title: 'Послушай и повтори',
      items: [
        { tr: 'çay', ru: 'чай' },
        { tr: 'şeker', ru: 'сахар' },
        { tr: 'göz', ru: 'глаз' },
        { tr: 'üzüm', ru: 'виноград' },
        { tr: 'dağ', ru: 'гора' },
        { tr: 'iyi', ru: 'хорошо' },
        { tr: 'kız', ru: 'девочка' },
        { tr: 'cam', ru: 'стекло' },
      ],
    },
    {
      type: 'text',
      text:
        'Ударение в турецком почти всегда падает на последний слог: ' +
        'merhaBA, teşekKÜR. Ещё одна приятность — в турецком нет рода: ' +
        'o значит и «он», и «она», и «оно».',
    },
  ],
  vocab: [
    { tr: 'çay', ru: 'чай' },
    { tr: 'su', ru: 'вода' },
    { tr: 'şeker', ru: 'сахар' },
    { tr: 'göz', ru: 'глаз' },
    { tr: 'üzüm', ru: 'виноград' },
    { tr: 'dağ', ru: 'гора' },
    { tr: 'iyi', ru: 'хорошо' },
    { tr: 'güzel', ru: 'красивый / прекрасно' },
    { tr: 'kız', ru: 'девочка' },
    { tr: 'cam', ru: 'стекло' },
  ],
  exercises: [
    {
      type: 'choice',
      prompt: 'Как читается буква Ç ç?',
      promptIsTurkish: false,
      options: ['ч', 'дж', 'ш', 'дз'],
      correct: 0,
      explain: 'Ç с хвостиком — «ч» (çay — чай). Без хвостика C — «дж» (cam — стекло).',
    },
    {
      type: 'choice',
      prompt: 'Какая буква даёт звук «ы»?',
      promptIsTurkish: false,
      options: ['ı (без точки)', 'i (с точкой)', 'ü', 'ö'],
      correct: 0,
      explain: 'ı без точки — твёрдое «ы», i с точкой — мягкое «и». Это разные буквы!',
    },
    {
      type: 'choice',
      prompt: 'çay',
      promptIsTurkish: true,
      options: ['чай', 'вода', 'сахар', 'стекло'],
      correct: 0,
    },
    {
      type: 'flashcard',
      tr: 'üzüm',
      ru: 'виноград',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'çay', ru: 'чай' },
        { tr: 'su', ru: 'вода' },
        { tr: 'dağ', ru: 'гора' },
        { tr: 'iyi', ru: 'хорошо' },
      ],
    },
    {
      type: 'choice',
      prompt: 'Как читается dağ (гора)?',
      promptIsTurkish: false,
      options: ['«да:» — ğ тянет гласный', '«даг»', '«дач»', '«дай»'],
      correct: 0,
      explain: 'Ğ (yumuşak g) не произносится — она удлиняет предыдущий гласный.',
    },
    {
      type: 'choice',
      prompt: 'Выбери слово «глаз»',
      promptIsTurkish: false,
      options: ['göz', 'kız', 'cam', 'su'],
      correct: 0,
    },
    {
      type: 'flashcard',
      tr: 'güzel',
      ru: 'красивый / прекрасно',
    },
    {
      type: 'choice',
      prompt: 'Выбери слово «сахар»',
      promptIsTurkish: false,
      options: ['şeker', 'seker', 'çeker', 'sekiz'],
      correct: 0,
      explain: 'Ş с хвостиком — «ш»: şeker читается «шекер».',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'göz', ru: 'глаз' },
        { tr: 'üzüm', ru: 'виноград' },
        { tr: 'kız', ru: 'девочка' },
        { tr: 'cam', ru: 'стекло' },
      ],
    },
  ],
  test: [
    {
      type: 'choice',
      prompt: 'Как читается буква C c (без хвостика)?',
      promptIsTurkish: false,
      options: ['дж', 'ч', 'с', 'к'],
      correct: 0,
      explain: 'C без хвостика — «дж» (cam — стекло). С хвостиком Ç — «ч».',
    },
    {
      type: 'choice',
      prompt: 'Какая буква не читается и удлиняет предыдущий гласный?',
      promptIsTurkish: false,
      options: ['Ğ ğ', 'C c', 'Ş ş', 'Ö ö'],
      correct: 0,
      explain: 'Ğ (yumuşak g) не произносится — она тянет гласный: dağ звучит «да:».',
    },
    {
      type: 'choice',
      prompt: 'Как читается Ö ö?',
      promptIsTurkish: false,
      options: ['ё без «й» (как в нём)', 'о', 'ю', 'ы'],
      correct: 0,
      explain: 'Ö — как «ё» в слове «нём», без начального «й». Пример: göz — глаз.',
    },
    {
      type: 'choice',
      prompt: 'Как читается Ü ü?',
      promptIsTurkish: false,
      options: ['ю без «й» (как в тюль)', 'у', 'и', 'ё'],
      correct: 0,
      explain: 'Ü — как «ю» в слове «тюль», без «й». Пример: üzüm — виноград.',
    },
    {
      type: 'choice',
      prompt: 'В каком слове есть звук «ы»?',
      promptIsTurkish: false,
      options: ['kız', 'kim', 'iyi', 'çay'],
      correct: 0,
      explain: 'ı без точки — «ы»: kız звучит «кыз». А kim с точечной i — «ким».',
    },
    {
      type: 'choice',
      prompt: 'su',
      promptIsTurkish: true,
      options: ['вода', 'сахар', 'чай', 'стекло'],
      correct: 0,
    },
    {
      type: 'match',
      pairs: [
        { tr: 'şeker', ru: 'сахар' },
        { tr: 'güzel', ru: 'красивый' },
        { tr: 'dağ', ru: 'гора' },
        { tr: 'su', ru: 'вода' },
      ],
    },
    {
      type: 'choice',
      prompt: 'Как читается Ş ş?',
      promptIsTurkish: false,
      options: ['ш', 'с', 'ч', 'ж'],
      correct: 0,
      explain: 'Ş с хвостиком — «ш»: şeker звучит «шекер».',
    },
  ],
};

export default unit;
