import type { UnitContent } from '@/logic/course';

const unit: UnitContent = {
  id: 'u03',
  title: 'Знакомство: Ben… / Sen…',
  theory: [
    {
      type: 'text',
      text:
        'Чтобы сказать «я учитель» или «ты студент», в турецком не нужен глагол ' +
        '«быть» — вместо него к слову прибавляется личный суффикс.',
    },
    {
      type: 'table',
      title: 'Личные суффиксы',
      headers: ['Кто', 'Суффикс', 'Пример'],
      rows: [
        ['Ben (я)', '-im', 'Ben öğretmenim — я учитель'],
        ['Sen (ты)', '-sin', 'Sen öğretmensin — ты учитель'],
        ['O (он/она)', '— (без суффикса)', 'O öğretmen — он(а) учитель'],
      ],
    },
    {
      type: 'text',
      text:
        'Суффикс «я» -im начинается с гласной. Если слово тоже кончается на гласную, ' +
        'между ними вставляется буфер -y-, чтобы две гласные не сталкивались: ' +
        'öğrenci → öğrenciyim (я студент), Rusyalı → Rusyalıyım (я из России).',
    },
    {
      type: 'tip',
      text:
        'Осторожно: без буфера öğrencim значит «мой студент», а не «я студент»! ' +
        'Буква -y- меняет смысл. С -sin (ты) буфер не нужен: öğrencisin.',
    },
    {
      type: 'tip',
      text:
        'Гласная суффикса подстраивается под слово: doktorUM, но öğretmenIM. ' +
        'Это гармония гласных из предыдущего юнита — теперь она в деле.',
    },
    {
      type: 'examples',
      title: 'Знакомимся',
      items: [
        { tr: 'Adım Ali.', ru: 'Меня зовут Али.' },
        { tr: 'Adın ne?', ru: 'Как тебя зовут?' },
        { tr: 'Memnun oldum.', ru: 'Приятно познакомиться.' },
        { tr: 'Nerelisin?', ru: 'Откуда ты?' },
        { tr: 'Rusyalıyım.', ru: 'Я из России.' },
      ],
    },
    {
      type: 'text',
      text:
        'Adım — дословно «моё имя», Adın — «твоё имя». Поэтому «меня зовут Айше» — ' +
        'просто Adım Ayşe, без глагола.',
    },
  ],
  vocab: [
    { tr: 'ben', ru: 'я' },
    { tr: 'sen', ru: 'ты' },
    { tr: 'o', ru: 'он / она / оно' },
    { tr: 'Adım …', ru: 'меня зовут…' },
    { tr: 'Adın ne?', ru: 'как тебя зовут?' },
    { tr: 'Memnun oldum', ru: 'приятно познакомиться' },
    { tr: 'öğretmen', ru: 'учитель' },
    { tr: 'öğrenci', ru: 'ученик / студент' },
    { tr: 'doktor', ru: 'врач' },
    { tr: 'Nerelisin?', ru: 'откуда ты?' },
    { tr: 'Rusyalıyım', ru: 'я из России' },
  ],
  exercises: [
    {
      type: 'choice',
      prompt: 'Как спросить «как тебя зовут?»',
      promptIsTurkish: false,
      options: ['Adın ne?', 'Nasılsın?', 'Nerelisin?', 'Memnun oldum'],
      correct: 0,
      explain: 'Adın — «твоё имя», ne — «что». Дословно: «твоё имя что?»',
    },
    {
      type: 'choice',
      prompt: 'Скажи «я учитель»',
      promptIsTurkish: false,
      options: ['Ben öğretmenim', 'Ben öğretmensin', 'Sen öğretmenim', 'O öğretmenim'],
      correct: 0,
      explain: 'К «я» (ben) добавляется суффикс -im: öğretmenim.',
    },
    {
      type: 'choice',
      prompt: 'Скажи «ты студент»',
      promptIsTurkish: false,
      options: ['Sen öğrencisin', 'Sen öğrenciyim', 'Ben öğrencisin', 'O öğrencisin'],
      correct: 0,
      explain: 'К «ты» (sen) добавляется суффикс -sin: öğrencisin.',
    },
    {
      type: 'flashcard',
      tr: 'Memnun oldum',
      ru: 'приятно познакомиться',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'ben', ru: 'я' },
        { tr: 'sen', ru: 'ты' },
        { tr: 'o', ru: 'он / она' },
        { tr: 'öğretmen', ru: 'учитель' },
      ],
    },
    {
      type: 'choice',
      prompt: '«O doktor» означает…',
      promptIsTurkish: false,
      options: ['Он(а) врач', 'Я врач', 'Ты врач', 'Врач ли он?'],
      correct: 0,
      explain: 'У «o» (он/она) нет суффикса — просто O doktor.',
    },
    {
      type: 'choice',
      prompt: 'Nerelisin?',
      promptIsTurkish: true,
      options: ['Откуда ты?', 'Как дела?', 'Кто ты?', 'Где ты?'],
      correct: 0,
    },
    {
      type: 'flashcard',
      tr: 'öğrenci',
      ru: 'ученик / студент',
    },
    {
      type: 'choice',
      prompt: 'Скажи «меня зовут Айше»',
      promptIsTurkish: false,
      options: ['Adım Ayşe', 'Adın Ayşe', 'Ayşe adın ne', 'Sen Ayşe'],
      correct: 0,
      explain: 'Adım — «моё имя». Adın — «твоё имя», это было бы про собеседника.',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'Adım …', ru: 'меня зовут…' },
        { tr: 'Memnun oldum', ru: 'приятно познакомиться' },
        { tr: 'Nerelisin?', ru: 'откуда ты?' },
        { tr: 'doktor', ru: 'врач' },
      ],
    },
    {
      type: 'blank',
      ru: 'Я учитель.',
      sentence: 'Ben öğretmen___',
      options: ['im', 'sin', 'sınız', '(ничего)'],
      correct: 0,
      explain: 'К «я» (ben) — суффикс -im: öğretmenim.',
    },
    {
      type: 'blank',
      ru: 'Ты врач.',
      sentence: 'Sen doktor___',
      options: ['sun', 'sın', 'sin', 'im'],
      correct: 0,
      explain: 'Суффикс «ты» -sin по гармонии: doktor → o, значит -sun.',
    },
    {
      type: 'blank',
      ru: 'Я студент. (слово кончается на гласную!)',
      sentence: 'Ben öğrenci___',
      options: ['yim', 'im', 'yım', 'ım'],
      correct: 0,
      explain: 'öğrenci кончается на гласную → буфер y + -im = -yim. Без y будет öğrencim — «мой студент»!',
    },
    {
      type: 'blank',
      ru: 'Я из России.',
      sentence: 'Ben Rusyalı___',
      options: ['yım', 'ım', 'yim', 'im'],
      correct: 0,
      explain: 'Rusyalı кончается на гласную ı → буфер y + гармония ı = -yım.',
    },
    {
      type: 'assemble',
      ru: 'Меня зовут Али.',
      words: ['Adım', 'Ali'],
      correct: 'Adım Ali',
      explain: 'Adım — «моё имя». Глагол «быть» не нужен.',
    },
    {
      type: 'assemble',
      ru: 'Я учитель.',
      words: ['Ben', 'öğretmenim'],
      correct: 'Ben öğretmenim',
      explain: 'Личный суффикс -im уже встроен в слово: öğretmenim.',
    },
  ],
  test: [
    {
      type: 'choice',
      prompt: 'Скажи «ты учитель»',
      promptIsTurkish: false,
      options: ['Sen öğretmensin', 'Sen öğretmenim', 'Ben öğretmensin', 'O öğretmensin'],
      correct: 0,
      explain: 'К «ты» (sen) добавляется суффикс -sin: öğretmensin.',
    },
    {
      type: 'choice',
      prompt: '«Ben doktorum» означает…',
      promptIsTurkish: false,
      options: ['Я врач', 'Ты врач', 'Он врач', 'Я не врач'],
      correct: 0,
      explain: 'Суффикс -um («я») по гармонии после o: doktorum.',
    },
    {
      type: 'blank',
      ru: 'Ты студент.',
      sentence: 'Sen öğrenci___',
      options: ['sin', 'yim', 'yın', 'im'],
      correct: 0,
      explain: 'С «ты» (-sin) буфер y не нужен: öğrencisin.',
    },
    {
      type: 'blank',
      ru: 'Он учитель.',
      sentence: 'O öğretmen___',
      options: ['—', 'im', 'sin', 'ler'],
      correct: 0,
      explain: 'У «o» (он/она) личного суффикса нет: O öğretmen.',
    },
    {
      type: 'choice',
      prompt: 'Как спросить «откуда ты?»',
      promptIsTurkish: false,
      options: ['Nerelisin?', 'Adın ne?', 'Nasılsın?', 'Kim?'],
      correct: 0,
    },
    {
      type: 'assemble',
      ru: 'Ты врач.',
      words: ['Sen', 'doktorsun'],
      correct: 'Sen doktorsun',
      explain: 'Суффикс «ты» по гармонии после o → -sun: doktorsun.',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'ben', ru: 'я' },
        { tr: 'sen', ru: 'ты' },
        { tr: 'öğretmen', ru: 'учитель' },
        { tr: 'öğrenci', ru: 'студент' },
      ],
    },
    {
      type: 'choice',
      prompt: 'Почему «Sen doktorsun», а не «doktorsin»?',
      promptIsTurkish: false,
      options: [
        'гармония: после o берём -sun',
        'ошибка, надо -sin',
        'это множественное число',
        'нужен буфер y',
      ],
      correct: 0,
      explain: 'Гармония на 4: doktor кончается на o → суффикс -sun.',
    },
  ],
};

export default unit;
