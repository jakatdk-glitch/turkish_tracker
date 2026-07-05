import type { UnitContent } from '@/logic/course';

const unit: UnitContent = {
  id: 'u27',
  title: 'önce, sonra, kadar (до, после, пока)',
  theory: [
    {
      type: 'text',
      text:
        'önce = «до / раньше / назад», sonra = «после / потом», kadar = «до (какого-то ' +
        'момента)». С существительным önce и sonra требуют -dan/-den: yemekten sonra (после еды).',
    },
    {
      type: 'text',
      text:
        'kadar требует дательного -a/-e: akşama kadar (до вечера), sabaha kadar (до утра). ' +
        '«X назад» — X önce: beş dakika önce (пять минут назад).',
    },
    {
      type: 'table',
      title: 'Время',
      headers: ['Турецкий', 'Смысл'],
      rows: [
        ['yemekten önce', 'перед едой'],
        ['yemekten sonra', 'после еды'],
        ['üç gün önce', 'три дня назад'],
        ['akşama kadar', 'до вечера'],
      ],
    },
    {
      type: 'tip',
      text: '«Потом» само по себе — просто sonra: Sonra görüşürüz (потом увидимся).',
    },
    {
      type: 'examples',
      title: 'В расписании',
      items: [
        { tr: 'Yemekten sonra çay içeriz.', ru: 'После еды пьём чай.' },
        { tr: 'İşten önce spor yaparım.', ru: 'До работы занимаюсь спортом.' },
        { tr: 'Akşama kadar buradayım.', ru: 'Я здесь до вечера.' },
        { tr: 'Beş dakika önce geldi.', ru: 'Он пришёл пять минут назад.' },
      ],
    },
  ],
  vocab: [
    { tr: 'önce', ru: 'до / раньше / назад' },
    { tr: 'sonra', ru: 'после / потом' },
    { tr: 'kadar', ru: 'до (момента)' },
    { tr: 'yemekten sonra', ru: 'после еды' },
    { tr: 'yemekten önce', ru: 'перед едой' },
    { tr: 'akşama kadar', ru: 'до вечера' },
    { tr: 'dakika', ru: 'минута' },
    { tr: 'yemek', ru: 'еда' },
    { tr: 'spor', ru: 'спорт' },
    { tr: 'şimdi', ru: 'сейчас' },
  ],
  exercises: [
    {
      type: 'choice',
      prompt: 'Как «после еды»?',
      promptIsTurkish: false,
      options: ['yemekten sonra', 'yemek sonra', 'yemekte sonra', 'sonra yemek'],
      correct: 0,
      explain: 'sonra требует -dan/-den: yemekten sonra.',
    },
    {
      type: 'choice',
      prompt: 'Как «перед едой»?',
      promptIsTurkish: false,
      options: ['yemekten önce', 'yemek önce', 'önce yemek', 'yemeğe önce'],
      correct: 0,
      explain: 'önce тоже с -dan/-den: yemekten önce.',
    },
    {
      type: 'choice',
      prompt: 'Как «до вечера»?',
      promptIsTurkish: false,
      options: ['akşama kadar', 'akşamdan kadar', 'akşam kadar', 'akşamda kadar'],
      correct: 0,
      explain: 'kadar с дательным -a/-e: akşama kadar.',
    },
    {
      type: 'choice',
      prompt: 'Beş dakika önce geldi.',
      promptIsTurkish: true,
      options: ['Он пришёл пять минут назад.', 'Он придёт через пять минут.', 'Пять минут до прихода.', 'Он ждал пять минут.'],
      correct: 0,
      explain: '«X önce» = «X назад».',
    },
    {
      type: 'flashcard',
      tr: 'kadar',
      ru: 'до (момента)',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'önce', ru: 'до / назад' },
        { tr: 'sonra', ru: 'после / потом' },
        { tr: 'kadar', ru: 'до момента' },
        { tr: 'dakika', ru: 'минута' },
      ],
    },
    {
      type: 'assemble',
      ru: 'После еды пьём чай.',
      words: ['Yemekten', 'sonra', 'çay', 'içeriz'],
      correct: 'Yemekten sonra çay içeriz',
      explain: 'yemekten sonra + аорист içeriz.',
    },
    {
      type: 'choice',
      prompt: 'Какой падеж нужен перед kadar?',
      promptIsTurkish: false,
      options: ['дательный -a/-e (akşama kadar)', 'исходный -dan', 'местный -da', 'никакой'],
      correct: 0,
    },
    {
      type: 'flashcard',
      tr: 'sonra',
      ru: 'потом / после',
    },
    {
      type: 'choice',
      prompt: 'Akşama kadar buradayım.',
      promptIsTurkish: true,
      options: ['Я здесь до вечера.', 'Я приду вечером.', 'Вечером меня нет.', 'Я был до вечера.'],
      correct: 0,
    },
  ],
  test: [
    {
      type: 'choice',
      prompt: 'Как «перед работой»?',
      promptIsTurkish: false,
      options: ['işten önce', 'iş önce', 'işe önce', 'önce iş'],
      correct: 0,
      explain: 'önce с -dan/-den: işten önce.',
    },
    {
      type: 'choice',
      prompt: 'Как «после школы»?',
      promptIsTurkish: false,
      options: ['okuldan sonra', 'okul sonra', 'okula sonra', 'sonra okul'],
      correct: 0,
      explain: 'sonra с -dan/-den: okuldan sonra.',
    },
    {
      type: 'choice',
      prompt: 'Как «до утра»?',
      promptIsTurkish: false,
      options: ['sabaha kadar', 'sabahtan kadar', 'sabah kadar', 'sabahta kadar'],
      correct: 0,
      explain: 'kadar с дательным: sabaha kadar.',
    },
    {
      type: 'choice',
      prompt: '«üç gün önce» значит…',
      promptIsTurkish: false,
      options: ['три дня назад', 'через три дня', 'три дня подряд', 'до трёх дней'],
      correct: 0,
    },
    {
      type: 'choice',
      prompt: 'önce и sonra с существительным требуют падежа…',
      promptIsTurkish: false,
      options: ['исходного -dan/-den', 'дательного -a/-e', 'местного -da', 'винительного'],
      correct: 0,
    },
    {
      type: 'assemble',
      ru: 'До работы занимаюсь спортом.',
      words: ['İşten', 'önce', 'spor', 'yaparım'],
      correct: 'İşten önce spor yaparım',
      explain: 'işten önce + аорист yaparım.',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'yemekten sonra', ru: 'после еды' },
        { tr: 'yemekten önce', ru: 'перед едой' },
        { tr: 'akşama kadar', ru: 'до вечера' },
        { tr: 'dakika', ru: 'минута' },
      ],
    },
    {
      type: 'choice',
      prompt: 'Yemekten sonra çay içeriz.',
      promptIsTurkish: true,
      options: ['После еды пьём чай.', 'Перед едой пьём чай.', 'Пьём чай и едим.', 'Едим после чая.'],
      correct: 0,
    },
  ],
};

export default unit;
