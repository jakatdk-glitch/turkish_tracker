import type { UnitContent } from '@/logic/course';

const unit: UnitContent = {
  id: 'u06',
  title: 'Вопрос mı/mi и Evet/Hayır',
  theory: [
    {
      type: 'text',
      text:
        'Вопрос «да/нет» в турецком строится волшебно просто: после слова ставится ' +
        'вопросительная частица mı/mi/mu/mü. Она пишется отдельно и подчиняется ' +
        'гармонии гласных на 4.',
    },
    {
      type: 'table',
      title: 'Какую частицу выбрать',
      headers: ['Последняя гласная', 'Частица', 'Пример'],
      rows: [
        ['a, ı', 'mı', 'araba mı? — машина?'],
        ['e, i', 'mi', 'öğretmen mi? — учитель?'],
        ['o, u', 'mu', 'doktor mu? — врач?'],
        ['ö, ü', 'mü', 'şoför mü? — водитель?'],
      ],
    },
    {
      type: 'examples',
      title: 'Вопросы и ответы',
      items: [
        { tr: 'Bu çay mı?', ru: 'Это чай?' },
        { tr: 'Evet, çay.', ru: 'Да, чай.' },
        { tr: 'O doktor mu?', ru: 'Он врач?' },
        { tr: 'Hayır, öğretmen.', ru: 'Нет, учитель.' },
      ],
    },
    {
      type: 'text',
      text:
        'Отрицание «не» — отдельное слово değil: Ben doktor değilim — я не врач. ' +
        'Bu çay değil — это не чай.',
    },
    {
      type: 'tip',
      text:
        'Bu ne? — «что это?» — самый полезный вопрос для пополнения словаря. ' +
        'Показывай на предмет и спрашивай!',
    },
  ],
  vocab: [
    { tr: 'Evet', ru: 'да' },
    { tr: 'Hayır', ru: 'нет' },
    { tr: 'Belki', ru: 'может быть' },
    { tr: 'değil', ru: 'не (отрицание)' },
    { tr: 'Bu', ru: 'это' },
    { tr: 'Bu ne?', ru: 'что это?' },
    { tr: 'Kim?', ru: 'кто?' },
    { tr: 'tamam', ru: 'хорошо / ок' },
    { tr: 'peki', ru: 'ладно' },
    { tr: 'anladım', ru: 'я понял(а)' },
  ],
  exercises: [
    {
      type: 'choice',
      prompt: 'araba …? Какая частица?',
      promptIsTurkish: false,
      options: ['mı', 'mi', 'mu', 'mü'],
      correct: 0,
      explain: 'Последняя гласная a → mı (гармония на 4).',
    },
    {
      type: 'choice',
      prompt: 'doktor …? Какая частица?',
      promptIsTurkish: false,
      options: ['mu', 'mı', 'mi', 'mü'],
      correct: 0,
      explain: 'Последняя гласная o → mu.',
    },
    {
      type: 'choice',
      prompt: 'şoför …? Какая частица?',
      promptIsTurkish: false,
      options: ['mü', 'mu', 'mı', 'mi'],
      correct: 0,
      explain: 'Последняя гласная ö → mü.',
    },
    {
      type: 'choice',
      prompt: 'Bu çay mı?',
      promptIsTurkish: true,
      options: ['Это чай?', 'Это чай.', 'Где чай?', 'Чей это чай?'],
      correct: 0,
    },
    {
      type: 'flashcard',
      tr: 'tamam',
      ru: 'хорошо / ок',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'Evet', ru: 'да' },
        { tr: 'Hayır', ru: 'нет' },
        { tr: 'Belki', ru: 'может быть' },
        { tr: 'tamam', ru: 'ок' },
      ],
    },
    {
      type: 'choice',
      prompt: 'Скажи «я не врач»',
      promptIsTurkish: false,
      options: ['Ben doktor değilim', 'Ben doktor mu', 'Ben değil doktor', 'Hayır doktorum'],
      correct: 0,
      explain: 'değil ставится после слова и принимает личный суффикс: değilim.',
    },
    {
      type: 'flashcard',
      tr: 'anladım',
      ru: 'я понял(а)',
    },
    {
      type: 'choice',
      prompt: 'öğretmen …? Какая частица?',
      promptIsTurkish: false,
      options: ['mi', 'mı', 'mu', 'mü'],
      correct: 0,
      explain: 'Последняя гласная e → mi.',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'Bu ne?', ru: 'что это?' },
        { tr: 'Kim?', ru: 'кто?' },
        { tr: 'değil', ru: 'не' },
        { tr: 'peki', ru: 'ладно' },
      ],
    },
    {
      type: 'blank',
      ru: 'Это чай?',
      sentence: 'Bu çay ___?',
      options: ['mı', 'mi', 'mu', 'mü'],
      correct: 0,
      explain: 'Последняя гласная в çay — a, значит частица mı.',
    },
    {
      type: 'blank',
      ru: 'Он врач?',
      sentence: 'O doktor ___?',
      options: ['mu', 'mı', 'mi', 'mü'],
      correct: 0,
      explain: 'Последняя гласная в doktor — o, значит частица mu.',
    },
    {
      type: 'assemble',
      ru: 'Это чай?',
      words: ['Bu', 'çay', 'mı'],
      correct: 'Bu çay mı',
      explain: 'Вопросительная частица mı ставится в конце.',
    },
    {
      type: 'assemble',
      ru: 'Я не врач.',
      words: ['Ben', 'doktor', 'değilim'],
      correct: 'Ben doktor değilim',
      explain: 'değil («не») идёт после слова и берёт личный суффикс: değilim.',
    },
  ],
  test: [
    {
      type: 'choice',
      prompt: 'kedi …? Какая вопросительная частица?',
      promptIsTurkish: false,
      options: ['mi', 'mı', 'mu', 'mü'],
      correct: 0,
      explain: 'Последняя гласная i → mi.',
    },
    {
      type: 'choice',
      prompt: 'su …? Какая вопросительная частица?',
      promptIsTurkish: false,
      options: ['mu', 'mı', 'mi', 'mü'],
      correct: 0,
      explain: 'Последняя гласная u → mu.',
    },
    {
      type: 'blank',
      ru: 'Это машина?',
      sentence: 'Bu araba ___?',
      options: ['mı', 'mi', 'mu', 'mü'],
      correct: 0,
      explain: 'araba кончается на a → частица mı.',
    },
    {
      type: 'blank',
      ru: 'Ты учитель?',
      sentence: 'Sen öğretmen ___?',
      options: ['mi', 'mı', 'mu', 'mü'],
      correct: 0,
      explain: 'öğretmen кончается на e → частица mi.',
    },
    {
      type: 'choice',
      prompt: 'Скажи «это не чай»',
      promptIsTurkish: false,
      options: ['Bu çay değil', 'Bu çay mı', 'Bu değil çay', 'Çay bu değil'],
      correct: 0,
      explain: 'değil («не») ставится после слова: Bu çay değil.',
    },
    {
      type: 'assemble',
      ru: 'Он врач?',
      words: ['O', 'doktor', 'mu'],
      correct: 'O doktor mu',
      explain: 'Частица идёт в конце; doktor → o → mu.',
    },
    {
      type: 'choice',
      prompt: 'Bu ne?',
      promptIsTurkish: true,
      options: ['Что это?', 'Кто это?', 'Где это?', 'Это чай?'],
      correct: 0,
    },
    {
      type: 'match',
      pairs: [
        { tr: 'Evet', ru: 'да' },
        { tr: 'Hayır', ru: 'нет' },
        { tr: 'değil', ru: 'не' },
        { tr: 'Belki', ru: 'может быть' },
      ],
    },
  ],
};

export default unit;
