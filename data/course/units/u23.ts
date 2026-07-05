import type { UnitContent } from '@/logic/course';

const unit: UnitContent = {
  id: 'u23',
  title: 'Долженствование -meli/-malı',
  theory: [
    {
      type: 'text',
      text:
        '«Должен / следует» — суффикс -meli/-malı + личное окончание: gitmeliyim ' +
        '(я должен идти), yapmalıyım. Гармония на 2: -meli после мягких, -malı после твёрдых.',
    },
    {
      type: 'table',
      title: 'gitmek (быть должным идти)',
      headers: ['Кто', 'Форма'],
      rows: [
        ['ben (я)', 'gitmeliyim'],
        ['sen (ты)', 'gitmelisin'],
        ['o (он/она)', 'gitmeli'],
        ['biz (мы)', 'gitmeliyiz'],
      ],
    },
    {
      type: 'tip',
      text:
        'Перед окончанием «я/мы» вставляется буфер -y-: gitmeli+y+im = gitmeliyim. ' +
        'Отрицание — -memeli/-mamalı: gitmemeliyim (я не должен идти).',
    },
    {
      type: 'text',
      text:
        'Разговорная замена: «Gitmem lazım» — «мне нужно идти» (lazım = «нужно»). ' +
        'Часто звучит естественнее долженствования.',
    },
    {
      type: 'examples',
      title: 'Что нужно сделать',
      items: [
        { tr: 'Gitmeliyim.', ru: 'Я должен идти.' },
        { tr: 'Dinlenmelisin.', ru: 'Тебе нужно отдохнуть.' },
        { tr: 'Doktora gitmeliyiz.', ru: 'Нам нужно к врачу.' },
        { tr: 'Gitmem lazım.', ru: 'Мне надо идти.' },
      ],
    },
  ],
  vocab: [
    { tr: 'gitmeliyim', ru: 'я должен идти' },
    { tr: 'yapmalıyım', ru: 'я должен сделать' },
    { tr: 'dinlenmeliyim', ru: 'мне нужно отдохнуть' },
    { tr: 'beklemeliyiz', ru: 'нам нужно подождать' },
    { tr: 'gitmeliyiz', ru: 'нам нужно идти' },
    { tr: 'lazım', ru: 'нужно' },
    { tr: 'dinlenmek', ru: 'отдыхать' },
    { tr: 'beklemek', ru: 'ждать' },
    { tr: 'doktor', ru: 'врач' },
    { tr: 'uyumak', ru: 'спать' },
  ],
  exercises: [
    {
      type: 'choice',
      prompt: 'Как «Я должен идти»?',
      promptIsTurkish: false,
      options: ['Gitmeliyim', 'Gidiyorum', 'Gittim', 'Giderim'],
      correct: 0,
      explain: '-meli + буфер y + im: gitmeliyim.',
    },
    {
      type: 'blank',
      ru: 'мне нужно сделать (yap + -malı + «я»)',
      sentence: 'yapmalı___',
      options: ['yım', 'sın', 'yız', 'm'],
      correct: 0,
      explain: 'Буфер y + «я» ım: yapmalıyım.',
    },
    {
      type: 'choice',
      prompt: 'Dinlenmelisin.',
      promptIsTurkish: true,
      options: ['Тебе нужно отдохнуть.', 'Ты отдыхаешь.', 'Ты отдохнул.', 'Я отдохну.'],
      correct: 0,
    },
    {
      type: 'choice',
      prompt: 'Как «Нам нужно подождать»?',
      promptIsTurkish: false,
      options: ['Beklemeliyiz', 'Bekliyoruz', 'Bekledik', 'Bekleriz'],
      correct: 0,
      explain: '-meli + буфер y + «мы» iz: beklemeliyiz.',
    },
    {
      type: 'flashcard',
      tr: 'lazım',
      ru: 'нужно',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'gitmeliyim', ru: 'я должен идти' },
        { tr: 'yapmalıyım', ru: 'я должен сделать' },
        { tr: 'dinlenmeliyim', ru: 'мне нужно отдохнуть' },
        { tr: 'beklemeliyiz', ru: 'нам нужно ждать' },
      ],
    },
    {
      type: 'assemble',
      ru: 'Мне нужно к врачу.',
      words: ['Doktora', 'gitmeliyim'],
      correct: 'Doktora gitmeliyim',
      explain: 'Направление (doktora) + gitmeliyim.',
    },
    {
      type: 'choice',
      prompt: 'Как ещё сказать «Мне надо идти» (разговорно)?',
      promptIsTurkish: false,
      options: ['Gitmem lazım', 'Gidiyorum', 'Giderim', 'Gittim'],
      correct: 0,
      explain: '«…-mem lazım» = «мне нужно…».',
    },
    {
      type: 'flashcard',
      tr: 'beklemek',
      ru: 'ждать',
    },
    {
      type: 'choice',
      prompt: 'Почему «gitmeliyim» с буквой y?',
      promptIsTurkish: false,
      options: ['буфер y между -meli и -im', 'это ошибка', 'смягчение', 'гармония'],
      correct: 0,
      explain: 'Буфер -y- перед гласным окончанием.',
    },
  ],
  test: [
    {
      type: 'choice',
      prompt: 'Как «Тебе нужно спать» (uyumak)?',
      promptIsTurkish: false,
      options: ['Uyumalısın', 'Uyuyorsun', 'Uyudun', 'Uyursun'],
      correct: 0,
      explain: 'uyu + -malı + sın: uyumalısın.',
    },
    {
      type: 'blank',
      ru: 'мне нужно идти (git + -meli + «я»)',
      sentence: 'gitmeli___',
      options: ['yim', 'sin', 'yiz', 'm'],
      correct: 0,
      explain: 'Буфер y + «я» im: gitmeliyim.',
    },
    {
      type: 'choice',
      prompt: 'Doktora gitmeliyiz.',
      promptIsTurkish: true,
      options: ['Нам нужно к врачу.', 'Мы идём к врачу.', 'Мы пошли к врачу.', 'Я иду к врачу.'],
      correct: 0,
    },
    {
      type: 'choice',
      prompt: 'Как сказать «Я не должен идти»?',
      promptIsTurkish: false,
      options: ['Gitmemeliyim', 'Gitmeliyim', 'Gitmiyorum', 'Gitmem'],
      correct: 0,
      explain: 'Отрицание -memeli: gitmemeliyim.',
    },
    {
      type: 'choice',
      prompt: 'Что значит «lazım»?',
      promptIsTurkish: false,
      options: ['нужно', 'можно', 'хочу', 'нельзя'],
      correct: 0,
    },
    {
      type: 'assemble',
      ru: 'Я должен идти домой.',
      words: ['Eve', 'gitmeliyim'],
      correct: 'Eve gitmeliyim',
      explain: 'eve (домой) + gitmeliyim.',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'gitmeliyim', ru: 'я должен идти' },
        { tr: 'dinlenmeliyim', ru: 'мне нужно отдохнуть' },
        { tr: 'lazım', ru: 'нужно' },
        { tr: 'beklemek', ru: 'ждать' },
      ],
    },
    {
      type: 'choice',
      prompt: '«…-mem lazım» означает…',
      promptIsTurkish: false,
      options: ['мне нужно …', 'мне нельзя …', 'я не хочу …', 'я не могу …'],
      correct: 0,
      explain: 'Gitmem lazım — «мне нужно идти».',
    },
  ],
};

export default unit;
