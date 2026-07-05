import type { UnitContent } from '@/logic/course';

const unit: UnitContent = {
  id: 'u18',
  title: 'Отрицание и вопросы',
  theory: [
    {
      type: 'text',
      text:
        'Чтобы сказать «не делаю», в настоящем времени между основой и -yor ' +
        'вставляется -mı/-mi/-mu/-mü: geliyorum (прихожу) → gelmiyorum (не прихожу).',
    },
    {
      type: 'table',
      title: 'Отрицание gelmek',
      headers: ['Кто', 'Не прихожу'],
      rows: [
        ['ben', 'gelmiyorum'],
        ['sen', 'gelmiyorsun'],
        ['o', 'gelmiyor'],
      ],
    },
    {
      type: 'tip',
      text:
        'Три сверхполезных отрицания выучи целиком: anlamıyorum (не понимаю), ' +
        'bilmiyorum (не знаю), istemiyorum (не хочу).',
    },
    {
      type: 'text',
      text:
        'Вопрос в настоящем времени — частица mu после -yor, отдельным словом: ' +
        'Geliyor musun? — «Ты идёшь?». Geliyor mu? — «Он идёт?».',
    },
    {
      type: 'examples',
      title: 'Да, нет, вопрос',
      items: [
        { tr: 'Anlamıyorum.', ru: 'Я не понимаю.' },
        { tr: 'Türkçe biliyor musun?', ru: 'Ты знаешь турецкий?' },
        { tr: 'Çay istemiyorum.', ru: 'Я не хочу чаю.' },
      ],
    },
  ],
  vocab: [
    { tr: 'anlamıyorum', ru: 'я не понимаю' },
    { tr: 'bilmiyorum', ru: 'я не знаю' },
    { tr: 'istemiyorum', ru: 'я не хочу' },
    { tr: 'gelmiyorum', ru: 'я не прихожу' },
    { tr: 'biliyorum', ru: 'я знаю' },
    { tr: 'anlıyorum', ru: 'я понимаю' },
    { tr: 'Türkçe', ru: 'турецкий язык' },
    { tr: 'evet', ru: 'да' },
  ],
  exercises: [
    {
      type: 'choice',
      prompt: 'Как сказать «Я не понимаю»?',
      promptIsTurkish: false,
      options: ['Anlamıyorum', 'Anlıyorum', 'Anlamıyor', 'Anlıyor musun'],
      correct: 0,
      explain: 'anla + -mı- + yor + um = anlamıyorum.',
    },
    {
      type: 'blank',
      ru: 'я не прихожу (gel + отрицание + …)',
      sentence: 'gelmi___',
      options: ['yorum', 'yorsun', 'yor', 'yoruz'],
      correct: 0,
      explain: 'gelmi + yorum: gelmiyorum (я не прихожу).',
    },
    {
      type: 'choice',
      prompt: 'Что означает «bilmiyorum»?',
      promptIsTurkish: false,
      options: ['я не знаю', 'я знаю', 'ты знаешь?', 'он знает'],
      correct: 0,
    },
    {
      type: 'choice',
      prompt: 'Как спросить «Ты знаешь турецкий?»',
      promptIsTurkish: false,
      options: ['Türkçe biliyor musun?', 'Türkçe biliyorsun?', 'Türkçe bilmiyorum?', 'Türkçe biliyor?'],
      correct: 0,
      explain: 'biliyor + mu + sun = biliyor musun? (частица отдельным словом).',
    },
    {
      type: 'flashcard',
      tr: 'anlamıyorum',
      ru: 'я не понимаю',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'biliyorum', ru: 'я знаю' },
        { tr: 'bilmiyorum', ru: 'я не знаю' },
        { tr: 'anlıyorum', ru: 'я понимаю' },
        { tr: 'anlamıyorum', ru: 'я не понимаю' },
      ],
    },
    {
      type: 'assemble',
      ru: 'Я не хочу чаю.',
      words: ['Çay', 'istemiyorum'],
      correct: 'Çay istemiyorum',
      explain: 'iste + -mi- + yorum = istemiyorum (не хочу).',
    },
    {
      type: 'choice',
      prompt: 'Geliyor musun?',
      promptIsTurkish: true,
      options: ['Ты идёшь?', 'Я иду.', 'Он идёт.', 'Ты не идёшь.'],
      correct: 0,
    },
    {
      type: 'blank',
      ru: 'ты не приходишь',
      sentence: 'gelmi___',
      options: ['yorsun', 'yorum', 'yor', 'yorlar'],
      correct: 0,
      explain: 'gelmi + yorsun: gelmiyorsun (ты не приходишь).',
    },
    {
      type: 'flashcard',
      tr: 'istemiyorum',
      ru: 'я не хочу',
    },
  ],
  test: [
    {
      type: 'choice',
      prompt: 'Как сказать «я не делаю» (yapmak)?',
      promptIsTurkish: false,
      options: ['yapmıyorum', 'yapıyorum', 'yapmuyorum', 'yapmıyor'],
      correct: 0,
      explain: 'yap + -mı- + yor + um = yapmıyorum.',
    },
    {
      type: 'blank',
      ru: 'я не хочу (iste + отрицание + …)',
      sentence: 'istemi___',
      options: ['yorum', 'yorsun', 'yor', 'yoruz'],
      correct: 0,
      explain: 'iste + mi + yorum = istemiyorum.',
    },
    {
      type: 'choice',
      prompt: 'Что означает «istemiyorum»?',
      promptIsTurkish: false,
      options: ['я не хочу', 'я хочу', 'ты хочешь?', 'он хочет'],
      correct: 0,
    },
    {
      type: 'choice',
      prompt: 'Как спросить «Ты идёшь?» (gelmek)?',
      promptIsTurkish: false,
      options: ['Geliyor musun?', 'Geliyorsun mu?', 'Gelmiyorum?', 'Geliyor mu sen?'],
      correct: 0,
      explain: 'geliyor + mu + sun — частица отдельным словом: Geliyor musun?',
    },
    {
      type: 'blank',
      ru: 'он не приходит',
      sentence: 'gelmi___',
      options: ['yor', 'yorum', 'yorsun', 'yoruz'],
      correct: 0,
      explain: '«Он» — без личного окончания: gelmiyor.',
    },
    {
      type: 'choice',
      prompt: 'Как спросить «Он знает?» (bilmek)?',
      promptIsTurkish: false,
      options: ['Biliyor mu?', 'Biliyor musun?', 'Bilmiyor?', 'Biliyorsun mu?'],
      correct: 0,
      explain: 'Для «он» — biliyor + mu: Biliyor mu?',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'biliyorum', ru: 'я знаю' },
        { tr: 'bilmiyorum', ru: 'я не знаю' },
        { tr: 'anlıyorum', ru: 'я понимаю' },
        { tr: 'gelmiyorum', ru: 'я не прихожу' },
      ],
    },
    {
      type: 'assemble',
      ru: 'Ты знаешь турецкий?',
      words: ['Türkçe', 'biliyor', 'musun'],
      correct: 'Türkçe biliyor musun',
      explain: 'Вопросительная частица mu — отдельным словом после biliyor.',
    },
  ],
};

export default unit;
