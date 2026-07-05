import type { UnitContent } from '@/logic/course';

const unit: UnitContent = {
  id: 'u09',
  title: 'Местный падеж -da/-de: где?',
  theory: [
    {
      type: 'text',
      text:
        'Чтобы сказать «где» (в доме, на работе), к слову добавляется местный падеж ' +
        '-da/-de. Гармония на 2: -de после мягких гласных, -da после твёрдых. ' +
        'Evde — дома, okulda — в школе.',
    },
    {
      type: 'text',
      text:
        'Но есть важное правило: если слово кончается на «глухую» согласную ' +
        '(p, ç, t, k, s, ş, h, f), то d в суффиксе тоже глохнет и становится t: ' +
        '-ta/-te. Это отвердение согласных.',
    },
    {
      type: 'table',
      title: 'Мягкое -da/-de или твёрдое -ta/-te',
      headers: ['Слово кончается на', 'Суффикс', 'Пример'],
      rows: [
        ['гласную или звонкую', '-da / -de', 'ev → evde, okul → okulda'],
        ['глухую (p,ç,t,k,s,ş,h,f)', '-ta / -te', 'sokak → sokakta, iş → işte'],
      ],
    },
    {
      type: 'tip',
      text:
        'Имена собственные пишутся с апострофом: İstanbul’da, Ankara’da. ' +
        'Вопрос «где?» — Nerede?',
    },
    {
      type: 'examples',
      title: 'Где?',
      items: [
        { tr: 'Neredesin?', ru: 'Ты где?' },
        { tr: 'Evdeyim.', ru: 'Я дома.' },
        { tr: 'Ali okulda.', ru: 'Али в школе.' },
        { tr: 'İstanbul’dayım.', ru: 'Я в Стамбуле.' },
      ],
    },
  ],
  vocab: [
    { tr: 'nerede', ru: 'где' },
    { tr: 'ev', ru: 'дом' },
    { tr: 'okul', ru: 'школа' },
    { tr: 'iş', ru: 'работа' },
    { tr: 'sokak', ru: 'улица' },
    { tr: 'burada', ru: 'здесь' },
    { tr: 'orada', ru: 'там' },
    { tr: 'evde', ru: 'дома' },
    { tr: 'okulda', ru: 'в школе' },
    { tr: 'işte', ru: 'на работе' },
  ],
  exercises: [
    {
      type: 'blank',
      ru: 'дома',
      sentence: 'ev___',
      options: ['de', 'da', 'te', 'ta'],
      correct: 0,
      explain: 'ev кончается на звонкую v, гласная e → -de.',
    },
    {
      type: 'blank',
      ru: 'в школе',
      sentence: 'okul___',
      options: ['da', 'de', 'ta', 'te'],
      correct: 0,
      explain: 'okul — звонкая l, гласная o → -da.',
    },
    {
      type: 'blank',
      ru: 'на улице (глухая k!)',
      sentence: 'sokak___',
      options: ['ta', 'da', 'te', 'de'],
      correct: 0,
      explain: 'sokak кончается на глухую k → отвердение: -ta.',
    },
    {
      type: 'blank',
      ru: 'на работе (глухая ş!)',
      sentence: 'iş___',
      options: ['te', 'de', 'ta', 'da'],
      correct: 0,
      explain: 'iş кончается на глухую ş → отвердение: -te.',
    },
    {
      type: 'choice',
      prompt: 'Как спросить «Ты где?»',
      promptIsTurkish: false,
      options: ['Neredesin?', 'Nereye?', 'Nereden?', 'Ne zaman?'],
      correct: 0,
      explain: 'nerede (где) + sin (ты) = Neredesin?',
    },
    {
      type: 'flashcard',
      tr: 'burada',
      ru: 'здесь',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'evde', ru: 'дома' },
        { tr: 'okulda', ru: 'в школе' },
        { tr: 'işte', ru: 'на работе' },
        { tr: 'burada', ru: 'здесь' },
      ],
    },
    {
      type: 'assemble',
      ru: 'Али в школе.',
      words: ['Ali', 'okulda'],
      correct: 'Ali okulda',
      explain: 'Имя + место с падежом -da: Ali okulda.',
    },
    {
      type: 'choice',
      prompt: 'Как правильно «в Стамбуле»?',
      promptIsTurkish: false,
      options: ['İstanbul’da', 'İstanbulda', 'İstanbul’ta', 'İstanbul’de'],
      correct: 0,
      explain: 'Имя собственное — через апостроф, гласная u → -da: İstanbul’da.',
    },
    {
      type: 'blank',
      ru: 'в книге (глухая p!)',
      sentence: 'kitap___',
      options: ['ta', 'da', 'te', 'de'],
      correct: 0,
      explain: 'kitap кончается на глухую p → отвердение: -ta.',
    },
  ],
  test: [
    {
      type: 'blank',
      ru: 'в комнате',
      sentence: 'oda___',
      options: ['da', 'de', 'ta', 'te'],
      correct: 0,
      explain: 'oda кончается на гласную a → -da.',
    },
    {
      type: 'choice',
      prompt: '«на улице» — как правильно?',
      promptIsTurkish: false,
      options: ['sokakta', 'sokakda', 'sokakte', 'sokakde'],
      correct: 0,
      explain: 'sokak кончается на глухую k → d глохнет в t: sokakta.',
    },
    {
      type: 'blank',
      ru: 'на столе',
      sentence: 'masa___',
      options: ['da', 'de', 'ta', 'te'],
      correct: 0,
      explain: 'masa кончается на гласную a → -da.',
    },
    {
      type: 'blank',
      ru: 'в Анкаре (имя собственное)',
      sentence: "Ankara'___",
      options: ['da', 'de', 'ta', 'te'],
      correct: 0,
      explain: 'Имя собственное — через апостроф, гласная a → -da: Ankara’da.',
    },
    {
      type: 'choice',
      prompt: 'Как спросить «Где Али?»',
      promptIsTurkish: false,
      options: ['Ali nerede?', 'Ali nereye?', 'Ali kim?', 'Ali ne?'],
      correct: 0,
      explain: 'nerede — «где».',
    },
    {
      type: 'choice',
      prompt: 'burada',
      promptIsTurkish: true,
      options: ['здесь', 'там', 'где', 'дома'],
      correct: 0,
    },
    {
      type: 'choice',
      prompt: '«на работе» — как правильно?',
      promptIsTurkish: false,
      options: ['işte', 'işde', 'işta', 'isde'],
      correct: 0,
      explain: 'iş кончается на глухую ş → отвердение: işte.',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'evde', ru: 'дома' },
        { tr: 'odada', ru: 'в комнате' },
        { tr: 'masada', ru: 'на столе' },
        { tr: 'işte', ru: 'на работе' },
      ],
    },
  ],
};

export default unit;
