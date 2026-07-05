import type { UnitContent } from '@/logic/course';

const unit: UnitContent = {
  id: 'u04',
  title: 'Гармония гласных',
  theory: [
    {
      type: 'text',
      text:
        'Главный секрет турецкого: гласные в суффиксах подстраиваются под последнюю ' +
        'гласную слова. Поэтому один и тот же суффикс имеет 2 или 4 варианта. ' +
        'Звучит страшно — на деле это просто «мелодия» языка.',
    },
    {
      type: 'table',
      title: 'Гармония на 2 (суффиксы с e/a, напр. -ler/-lar)',
      headers: ['Последняя гласная', 'Вариант', 'Пример'],
      rows: [
        ['e, i, ö, ü', 'e', 'ev → evler (дома́)'],
        ['a, ı, o, u', 'a', 'araba → arabalar (машины)'],
      ],
    },
    {
      type: 'table',
      title: 'Гармония на 4 (суффиксы с i/ı/u/ü, напр. -im)',
      headers: ['Последняя гласная', 'Вариант', 'Пример'],
      rows: [
        ['e, i', 'i', 'öğretmen → öğretmenim'],
        ['a, ı', 'ı', 'kız → kızım (моя дочка)'],
        ['o, u', 'u', 'doktor → doktorum'],
        ['ö, ü', 'ü', 'şoför → şoförüm'],
      ],
    },
    {
      type: 'examples',
      title: 'Послушай мелодию',
      items: [
        { tr: 'evler', ru: 'дома́' },
        { tr: 'arabalar', ru: 'машины' },
        { tr: 'kediler', ru: 'кошки' },
        { tr: 'köpekler', ru: 'собаки' },
        { tr: 'doktorum', ru: 'я врач' },
        { tr: 'şoförüm', ru: 'я водитель' },
      ],
    },
    {
      type: 'tip',
      text:
        'Не заучивай таблицы наизусть — ухо привыкнет быстрее. Турецкие слова «поют» ' +
        'в одной тональности: e-vler-de, a-ra-ba-lar-da. Если суффикс «не поётся» — ' +
        'он неправильный.',
    },
  ],
  vocab: [
    { tr: 'ev', ru: 'дом' },
    { tr: 'araba', ru: 'машина' },
    { tr: 'kedi', ru: 'кошка' },
    { tr: 'köpek', ru: 'собака' },
    { tr: 'şoför', ru: 'водитель' },
    { tr: 'evler', ru: 'дома́' },
    { tr: 'arabalar', ru: 'машины' },
    { tr: 'kediler', ru: 'кошки' },
    { tr: 'köpekler', ru: 'собаки' },
    { tr: 'doktorum', ru: 'я врач' },
  ],
  exercises: [
    {
      type: 'choice',
      prompt: 'Множественное число от ev (дом)?',
      promptIsTurkish: false,
      options: ['evler', 'evlar', 'evlör', 'evlir'],
      correct: 0,
      explain: 'Последняя гласная e → суффикс -ler: evler.',
    },
    {
      type: 'choice',
      prompt: 'Множественное число от araba (машина)?',
      promptIsTurkish: false,
      options: ['arabalar', 'arabaler', 'arabalır', 'arabalur'],
      correct: 0,
      explain: 'Последняя гласная a → суффикс -lar: arabalar.',
    },
    {
      type: 'choice',
      prompt: '«Я врач» (doktor + суффикс)?',
      promptIsTurkish: false,
      options: ['doktorum', 'doktorim', 'doktorüm', 'doktorem'],
      correct: 0,
      explain: 'Последняя гласная o → в гармонии на 4 берём u: doktorum.',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'ev', ru: 'дом' },
        { tr: 'araba', ru: 'машина' },
        { tr: 'kedi', ru: 'кошка' },
        { tr: 'köpek', ru: 'собака' },
      ],
    },
    {
      type: 'choice',
      prompt: 'kediler',
      promptIsTurkish: true,
      options: ['кошки', 'кошка', 'я кошка', 'у кошки'],
      correct: 0,
    },
    {
      type: 'flashcard',
      tr: 'köpek',
      ru: 'собака',
    },
    {
      type: 'choice',
      prompt: '«Я водитель» (şoför + суффикс)?',
      promptIsTurkish: false,
      options: ['şoförüm', 'şoförum', 'şoförim', 'şoförım'],
      correct: 0,
      explain: 'Последняя гласная ö → в гармонии на 4 берём ü: şoförüm.',
    },
    {
      type: 'choice',
      prompt: 'Множественное число от köpek (собака)?',
      promptIsTurkish: false,
      options: ['köpekler', 'köpeklar', 'köpeklör', 'köpeklur'],
      correct: 0,
      explain: 'Последняя гласная e → -ler: köpekler.',
    },
    {
      type: 'flashcard',
      tr: 'şoför',
      ru: 'водитель',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'evler', ru: 'дома́' },
        { tr: 'arabalar', ru: 'машины' },
        { tr: 'kediler', ru: 'кошки' },
        { tr: 'köpekler', ru: 'собаки' },
      ],
    },
    {
      type: 'blank',
      ru: 'дома́ (мн. число)',
      sentence: 'ev___',
      options: ['ler', 'lar', 'lör', 'lir'],
      correct: 0,
      explain: 'Последняя гласная e → мягкий вариант -ler.',
    },
    {
      type: 'blank',
      ru: 'машины (мн. число)',
      sentence: 'araba___',
      options: ['lar', 'ler', 'lır', 'lor'],
      correct: 0,
      explain: 'Последняя гласная a → твёрдый вариант -lar.',
    },
    {
      type: 'blank',
      ru: 'я врач',
      sentence: 'doktor___',
      options: ['um', 'ım', 'im', 'üm'],
      correct: 0,
      explain: 'Гармония на 4: после o берём u → doktorum.',
    },
    {
      type: 'blank',
      ru: 'я водитель',
      sentence: 'şoför___',
      options: ['üm', 'um', 'ım', 'im'],
      correct: 0,
      explain: 'Гармония на 4: после ö берём ü → şoförüm.',
    },
  ],
  test: [
    {
      type: 'choice',
      prompt: 'Какой суффикс мн. числа после гласных a, ı, o, u?',
      promptIsTurkish: false,
      options: ['-lar', '-ler', '-lir', '-lür'],
      correct: 0,
      explain: 'Твёрдые гласные (a, ı, o, u) → -lar. Мягкие (e, i, ö, ü) → -ler.',
    },
    {
      type: 'choice',
      prompt: 'Слово кончается на ö. Суффикс «я» (гармония на 4)?',
      promptIsTurkish: false,
      options: ['-üm', '-um', '-ım', '-im'],
      correct: 0,
      explain: 'ö → ü: şoför → şoförüm.',
    },
    {
      type: 'blank',
      ru: 'кошки (мн. число)',
      sentence: 'kedi___',
      options: ['ler', 'lar', 'lör', 'lir'],
      correct: 0,
      explain: 'Последняя гласная i → мягкий вариант -ler.',
    },
    {
      type: 'choice',
      prompt: 'Почему «arabalar», а не «arabaler»?',
      promptIsTurkish: false,
      options: [
        'последняя гласная a → твёрдый -lar',
        'araba — исключение',
        'это ошибка',
        'из-за буфера y',
      ],
      correct: 0,
      explain: 'Гармония: a — твёрдая гласная, значит -lar.',
    },
    {
      type: 'choice',
      prompt: 'arabalar',
      promptIsTurkish: true,
      options: ['машины', 'машина', 'моя машина', 'в машине'],
      correct: 0,
    },
    {
      type: 'match',
      pairs: [
        { tr: 'ev', ru: 'дом' },
        { tr: 'kedi', ru: 'кошка' },
        { tr: 'şoför', ru: 'водитель' },
        { tr: 'araba', ru: 'машина' },
      ],
    },
    {
      type: 'blank',
      ru: 'собаки (мн. число)',
      sentence: 'köpek___',
      options: ['ler', 'lar', 'lür', 'lir'],
      correct: 0,
      explain: 'Последняя гласная e → -ler.',
    },
    {
      type: 'choice',
      prompt: 'Почему «doktorum», а не «doktorim»?',
      promptIsTurkish: false,
      options: [
        'последняя гласная o → берём u',
        'это ошибка',
        'гармония на 2',
        'нужен буфер y',
      ],
      correct: 0,
      explain: 'Гармония на 4: после o суффикс «я» берёт u → doktorum.',
    },
  ],
};

export default unit;
