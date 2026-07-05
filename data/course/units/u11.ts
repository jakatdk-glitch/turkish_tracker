import type { UnitContent } from '@/logic/course';

const unit: UnitContent = {
  id: 'u11',
  title: 'Цвета и прилагательные',
  theory: [
    {
      type: 'text',
      text:
        'Хорошая новость: прилагательное в турецком не меняется и стоит ПЕРЕД ' +
        'существительным, как в русском. kırmızı elma — красное яблоко, ' +
        'büyük ev — большой дом.',
    },
    {
      type: 'tip',
      text:
        'Прилагательное не согласуется и не множится: kırmızı elma (красное яблоко), ' +
        'kırmızı elmalar (красные яблоки) — само kırmızı не меняется.',
    },
    {
      type: 'table',
      title: 'Базовые цвета',
      headers: ['Турецкий', 'Цвет'],
      rows: [
        ['kırmızı', 'красный'],
        ['mavi', 'синий'],
        ['yeşil', 'зелёный'],
        ['sarı', 'жёлтый'],
        ['siyah', 'чёрный'],
        ['beyaz', 'белый'],
      ],
    },
    {
      type: 'examples',
      title: 'Опиши предмет',
      items: [
        { tr: 'büyük ev', ru: 'большой дом' },
        { tr: 'küçük kedi', ru: 'маленькая кошка' },
        { tr: 'güzel bir kız', ru: 'красивая девушка' },
        { tr: 'çok güzel', ru: 'очень красиво' },
      ],
    },
  ],
  vocab: [
    { tr: 'renk', ru: 'цвет' },
    { tr: 'kırmızı', ru: 'красный' },
    { tr: 'mavi', ru: 'синий' },
    { tr: 'büyük', ru: 'большой' },
    { tr: 'küçük', ru: 'маленький' },
    { tr: 'güzel', ru: 'красивый' },
    { tr: 'yeni', ru: 'новый' },
    { tr: 'eski', ru: 'старый' },
    { tr: 'iyi', ru: 'хороший' },
    { tr: 'kötü', ru: 'плохой' },
  ],
  exercises: [
    {
      type: 'assemble',
      ru: 'красное яблоко',
      words: ['kırmızı', 'elma'],
      correct: 'kırmızı elma',
      explain: 'Прилагательное идёт перед существительным: kırmızı elma.',
    },
    {
      type: 'assemble',
      ru: 'большой дом',
      words: ['büyük', 'ev'],
      correct: 'büyük ev',
      explain: 'Сначала признак, потом предмет: büyük ev.',
    },
    {
      type: 'choice',
      prompt: 'Какой цвет mavi?',
      promptIsTurkish: false,
      options: ['синий', 'красный', 'зелёный', 'жёлтый'],
      correct: 0,
    },
    {
      type: 'choice',
      prompt: 'Как сказать «маленькая кошка»?',
      promptIsTurkish: false,
      options: ['küçük kedi', 'kedi küçük', 'küçük kediler', 'kedi küçüğü'],
      correct: 0,
      explain: 'Прилагательное перед существительным, без изменений: küçük kedi.',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'kırmızı', ru: 'красный' },
        { tr: 'mavi', ru: 'синий' },
        { tr: 'yeşil', ru: 'зелёный' },
        { tr: 'sarı', ru: 'жёлтый' },
      ],
    },
    {
      type: 'flashcard',
      tr: 'güzel',
      ru: 'красивый',
    },
    {
      type: 'choice',
      prompt: 'Как сказать «очень красиво»?',
      promptIsTurkish: false,
      options: ['çok güzel', 'güzel çok', 'çok güzeller', 'güzel bir'],
      correct: 0,
      explain: 'çok («очень») ставится перед прилагательным: çok güzel.',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'büyük', ru: 'большой' },
        { tr: 'küçük', ru: 'маленький' },
        { tr: 'yeni', ru: 'новый' },
        { tr: 'eski', ru: 'старый' },
      ],
    },
    {
      type: 'assemble',
      ru: 'новая машина',
      words: ['yeni', 'araba'],
      correct: 'yeni araba',
      explain: 'yeni (новый) → araba (машина): yeni araba.',
    },
    {
      type: 'choice',
      prompt: 'siyah',
      promptIsTurkish: true,
      options: ['чёрный', 'белый', 'синий', 'красный'],
      correct: 0,
    },
  ],
  test: [
    {
      type: 'assemble',
      ru: 'синий дом',
      words: ['mavi', 'ev'],
      correct: 'mavi ev',
      explain: 'Прилагательное идёт перед существительным: mavi ev.',
    },
    {
      type: 'assemble',
      ru: 'старая машина',
      words: ['eski', 'araba'],
      correct: 'eski araba',
      explain: 'Сначала признак, потом предмет: eski araba.',
    },
    {
      type: 'choice',
      prompt: 'Как сказать «красные яблоки»?',
      promptIsTurkish: false,
      options: ['kırmızı elmalar', 'kırmızılar elma', 'elmalar kırmızı', 'kırmızılar elmalar'],
      correct: 0,
      explain: 'Прилагательное не множится: множественное берёт только существительное — kırmızı elmalar.',
    },
    {
      type: 'choice',
      prompt: 'Какой цвет «yeşil»?',
      promptIsTurkish: false,
      options: ['зелёный', 'жёлтый', 'синий', 'чёрный'],
      correct: 0,
    },
    {
      type: 'choice',
      prompt: 'Как сказать «очень большой»?',
      promptIsTurkish: false,
      options: ['çok büyük', 'büyük çok', 'çok büyükler', 'büyük bir'],
      correct: 0,
      explain: 'çok («очень») ставится перед прилагательным: çok büyük.',
    },
    {
      type: 'choice',
      prompt: 'beyaz',
      promptIsTurkish: true,
      options: ['белый', 'чёрный', 'красный', 'жёлтый'],
      correct: 0,
    },
    {
      type: 'match',
      pairs: [
        { tr: 'büyük', ru: 'большой' },
        { tr: 'küçük', ru: 'маленький' },
        { tr: 'iyi', ru: 'хороший' },
        { tr: 'kötü', ru: 'плохой' },
      ],
    },
    {
      type: 'choice',
      prompt: 'Где стоит прилагательное в турецком?',
      promptIsTurkish: false,
      options: [
        'перед существительным',
        'после существительного',
        'в конце фразы',
        'не важно',
      ],
      correct: 0,
      explain: 'Как в русском — перед существительным: büyük ev.',
    },
  ],
};

export default unit;
