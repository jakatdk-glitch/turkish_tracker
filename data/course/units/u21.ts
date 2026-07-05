import type { UnitContent } from '@/logic/course';

const unit: UnitContent = {
  id: 'u21',
  title: '«У меня есть»: benim … var',
  theory: [
    {
      type: 'text',
      text:
        '«У меня есть машина» строится через притяжательность + var: (benim) arabam var — ' +
        'дословно «моя машина имеется». «Нет» — yok: Param yok — «денег у меня нет».',
    },
    {
      type: 'table',
      title: 'Схема обладания',
      headers: ['Русский', 'Турецкий'],
      rows: [
        ['у меня есть машина', '(benim) arabam var'],
        ['у меня нет денег', '(benim) param yok'],
        ['у тебя есть время?', '(senin) vaktin var mı?'],
        ['у него есть брат', '(onun) kardeşi var'],
      ],
    },
    {
      type: 'tip',
      text:
        'Слово «иметь» не нужно — работает притяжательный суффикс (-m «мой», -n «твой», ' +
        '-i/-sı «его») + var/yok. Местоимение benim/senin можно опустить.',
    },
    {
      type: 'examples',
      title: 'В жизни',
      items: [
        { tr: 'Arabam var.', ru: 'У меня есть машина.' },
        { tr: 'Vaktim yok.', ru: 'У меня нет времени.' },
        { tr: 'Bir sorum var.', ru: 'У меня есть вопрос.' },
        { tr: 'Paran var mı?', ru: 'У тебя есть деньги?' },
      ],
    },
  ],
  vocab: [
    { tr: 'arabam var', ru: 'у меня есть машина' },
    { tr: 'param yok', ru: 'у меня нет денег' },
    { tr: 'vaktim var', ru: 'у меня есть время' },
    { tr: 'vaktim yok', ru: 'у меня нет времени' },
    { tr: 'sorum var', ru: 'у меня есть вопрос' },
    { tr: 'fikrim yok', ru: 'без понятия / нет идеи' },
    { tr: 'kardeşin var mı', ru: 'у тебя есть брат/сестра?' },
    { tr: 'zaman', ru: 'время' },
    { tr: 'soru', ru: 'вопрос' },
    { tr: 'fikir', ru: 'идея / мысль' },
  ],
  exercises: [
    {
      type: 'choice',
      prompt: 'Как сказать «У меня есть машина»?',
      promptIsTurkish: false,
      options: ['Arabam var', 'Araba var', 'Ben araba', 'Arabam yok'],
      correct: 0,
      explain: 'Притяжательный -m («моя») + var: arabam var.',
    },
    {
      type: 'choice',
      prompt: 'Vaktim yok.',
      promptIsTurkish: true,
      options: ['У меня нет времени.', 'У меня есть время.', 'Который час?', 'Нет машины.'],
      correct: 0,
    },
    {
      type: 'blank',
      ru: 'у меня есть вопрос (soru + «мой» + var)',
      sentence: 'Bir soru__ var',
      options: ['m', 'n', 'i', 'um'],
      correct: 0,
      explain: '«Мой вопрос» — sorum, дальше var: Bir sorum var.',
    },
    {
      type: 'choice',
      prompt: 'Как спросить «У тебя есть деньги?»',
      promptIsTurkish: false,
      options: ['Paran var mı?', 'Param var mı?', 'Para var?', 'Paran yok mu?'],
      correct: 0,
      explain: '«Твои деньги» — paran, дальше var mı: Paran var mı?',
    },
    {
      type: 'flashcard',
      tr: 'fikrim yok',
      ru: 'без понятия',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'arabam var', ru: 'у меня есть машина' },
        { tr: 'param yok', ru: 'у меня нет денег' },
        { tr: 'vaktim var', ru: 'у меня есть время' },
        { tr: 'sorum var', ru: 'у меня есть вопрос' },
      ],
    },
    {
      type: 'assemble',
      ru: 'У меня нет времени.',
      words: ['Vaktim', 'yok'],
      correct: 'Vaktim yok',
      explain: 'vakit → vaktim («моё время») + yok.',
    },
    {
      type: 'choice',
      prompt: 'Почему «у меня есть машина» = «arabam var», а не «ben araba var»?',
      promptIsTurkish: false,
      options: [
        'нужен притяжательный суффикс -m',
        'это ошибка',
        'нужен глагол «иметь»',
        'нужно число',
      ],
      correct: 0,
      explain: 'Обладание = притяжательный суффикс + var/yok.',
    },
    {
      type: 'flashcard',
      tr: 'zaman',
      ru: 'время',
    },
    {
      type: 'choice',
      prompt: 'Bir sorum var.',
      promptIsTurkish: true,
      options: ['У меня есть вопрос.', 'У меня нет вопроса.', 'Какой вопрос?', 'Есть вопросы?'],
      correct: 0,
    },
  ],
  test: [
    {
      type: 'choice',
      prompt: 'Как сказать «У меня есть брат/сестра»?',
      promptIsTurkish: false,
      options: ['Kardeşim var', 'Kardeş var', 'Ben kardeş', 'Kardeşin var'],
      correct: 0,
      explain: 'kardeşim («мой брат») + var.',
    },
    {
      type: 'blank',
      ru: 'у меня нет времени (vakit → «моё время»)',
      sentence: 'Vakti__ yok',
      options: ['m', 'n', 'i', 'um'],
      correct: 0,
      explain: '«Моё время» — vaktim, дальше yok.',
    },
    {
      type: 'choice',
      prompt: 'Как спросить «У тебя есть время?»',
      promptIsTurkish: false,
      options: ['Vaktin var mı?', 'Vaktim var mı?', 'Vakit var?', 'Zaman mı?'],
      correct: 0,
      explain: '«Твоё время» — vaktin, дальше var mı.',
    },
    {
      type: 'choice',
      prompt: 'Param yok.',
      promptIsTurkish: true,
      options: ['У меня нет денег.', 'У меня есть деньги.', 'Где деньги?', 'Дай денег.'],
      correct: 0,
    },
    {
      type: 'choice',
      prompt: 'Что показывает обладание в турецком?',
      promptIsTurkish: false,
      options: [
        'притяжательный суффикс + var/yok',
        'отдельный глагол «иметь»',
        'падеж -da',
        'число',
      ],
      correct: 0,
    },
    {
      type: 'assemble',
      ru: 'У меня есть вопрос.',
      words: ['Bir', 'sorum', 'var'],
      correct: 'Bir sorum var',
      explain: 'sorum («мой вопрос») + var.',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'arabam var', ru: 'есть машина' },
        { tr: 'param yok', ru: 'нет денег' },
        { tr: 'vaktin var mı', ru: 'есть ли у тебя время' },
        { tr: 'fikrim yok', ru: 'без понятия' },
      ],
    },
    {
      type: 'choice',
      prompt: '«У него есть машина» — как?',
      promptIsTurkish: false,
      options: ['Arabası var', 'Arabam var', 'Araban var', 'Araba var'],
      correct: 0,
      explain: '«Его машина» — arabası (-sı «его») + var.',
    },
  ],
};

export default unit;
