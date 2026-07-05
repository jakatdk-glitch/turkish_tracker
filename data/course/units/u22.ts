import type { UnitContent } from '@/logic/course';

const unit: UnitContent = {
  id: 'u22',
  title: 'Будущее время -acak/-ecek',
  theory: [
    {
      type: 'text',
      text:
        'Будущее — суффикс -acak/-ecek + личное окончание. gel → geleceğim (я приду), ' +
        'yap → yapacağım. Гармония на 2: -ecek после мягких гласных, -acak после твёрдых.',
    },
    {
      type: 'table',
      title: 'Спряжение gelmek (приходить)',
      headers: ['Кто', 'Форма'],
      rows: [
        ['ben (я)', 'geleceğim'],
        ['sen (ты)', 'geleceksin'],
        ['o (он/она)', 'gelecek'],
        ['biz (мы)', 'geleceğiz'],
        ['onlar (они)', 'gelecekler'],
      ],
    },
    {
      type: 'tip',
      text:
        'Перед окончанием «я/мы» конечная k смягчается в ğ: gelecek → geleceğim, geleceğiz. ' +
        'Основа на гласную берёт буфер -y-: bekle → bekleyeceğim.',
    },
    {
      type: 'text',
      text:
        'Отрицание — -mayacak/-meyecek: gelmeyeceğim (я не приду). ' +
        'Вопрос: Gelecek misin? — «Ты придёшь?».',
    },
    {
      type: 'examples',
      title: 'Планы',
      items: [
        { tr: 'Yarın geleceğim.', ru: 'Завтра я приду.' },
        { tr: 'Ne yapacaksın?', ru: 'Что ты будешь делать?' },
        { tr: 'Görüşeceğiz.', ru: 'Мы увидимся.' },
        { tr: 'Gelmeyeceğim.', ru: 'Я не приду.' },
      ],
    },
  ],
  vocab: [
    { tr: 'geleceğim', ru: 'я приду' },
    { tr: 'gideceğim', ru: 'я пойду' },
    { tr: 'yapacağım', ru: 'я сделаю' },
    { tr: 'göreceğiz', ru: 'мы увидим' },
    { tr: 'görüşeceğiz', ru: 'увидимся' },
    { tr: 'gelmeyeceğim', ru: 'я не приду' },
    { tr: 'gelecek hafta', ru: 'на следующей неделе' },
    { tr: 'yarın', ru: 'завтра' },
    { tr: 'sonra', ru: 'потом / после' },
    { tr: 'ne yapacaksın', ru: 'что ты будешь делать' },
  ],
  exercises: [
    {
      type: 'blank',
      ru: 'я приду (gel → будущее + «я»)',
      sentence: 'gele___',
      options: ['ceğim', 'ceksin', 'cek', 'cağım'],
      correct: 0,
      explain: 'gel мягкая → -ecek; «я» со смягчением k→ğ: geleceğim.',
    },
    {
      type: 'choice',
      prompt: 'Как «Я сделаю» (yapmak)?',
      promptIsTurkish: false,
      options: ['yapacağım', 'yapacaksın', 'yapıyorum', 'yaptım'],
      correct: 0,
      explain: 'yap твёрдая → -acak + «я» (k→ğ): yapacağım.',
    },
    {
      type: 'choice',
      prompt: 'Yarın geleceğim.',
      promptIsTurkish: true,
      options: ['Завтра я приду.', 'Вчера я пришёл.', 'Я сейчас иду.', 'Я всегда прихожу.'],
      correct: 0,
    },
    {
      type: 'blank',
      ru: 'ты придёшь',
      sentence: 'gelecek___',
      options: ['sin', 'im', 'ler', 'iz'],
      correct: 0,
      explain: '«Ты» — -sin: geleceksin (перед согласной k не смягчается).',
    },
    {
      type: 'flashcard',
      tr: 'görüşeceğiz',
      ru: 'увидимся',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'geleceğim', ru: 'я приду' },
        { tr: 'gideceğim', ru: 'я пойду' },
        { tr: 'yapacağım', ru: 'я сделаю' },
        { tr: 'göreceğiz', ru: 'мы увидим' },
      ],
    },
    {
      type: 'choice',
      prompt: 'Как сказать «Я не приду»?',
      promptIsTurkish: false,
      options: ['Gelmeyeceğim', 'Gelmiyorum', 'Gelmedim', 'Gelmem'],
      correct: 0,
      explain: 'Отрицание будущего -meyecek: gelmeyeceğim.',
    },
    {
      type: 'assemble',
      ru: 'Завтра я пойду в школу.',
      words: ['Yarın', 'okula', 'gideceğim'],
      correct: 'Yarın okula gideceğim',
      explain: 'Время (yarın) → место (okula) → глагол будущего.',
    },
    {
      type: 'choice',
      prompt: 'Ne yapacaksın?',
      promptIsTurkish: true,
      options: ['Что ты будешь делать?', 'Что ты делаешь?', 'Что ты сделал?', 'Что делать?'],
      correct: 0,
    },
    {
      type: 'flashcard',
      tr: 'gelecek hafta',
      ru: 'на следующей неделе',
    },
  ],
  test: [
    {
      type: 'choice',
      prompt: 'Как «Я пойду» (gitmek)?',
      promptIsTurkish: false,
      options: ['gideceğim', 'gidiyorum', 'gittim', 'giderim'],
      correct: 0,
      explain: 'git → gidecek + «я» (k→ğ): gideceğim.',
    },
    {
      type: 'blank',
      ru: 'мы придём (gel → будущее + «мы»)',
      sentence: 'gele___',
      options: ['ceğiz', 'ceğim', 'cekler', 'ceksin'],
      correct: 0,
      explain: '«Мы» -iz со смягчением: geleceğiz.',
    },
    {
      type: 'choice',
      prompt: 'Как «Я не сделаю»?',
      promptIsTurkish: false,
      options: ['Yapmayacağım', 'Yapmıyorum', 'Yapmadım', 'Yapmam'],
      correct: 0,
      explain: 'Отрицание будущего -mayacak: yapmayacağım.',
    },
    {
      type: 'choice',
      prompt: 'Görüşeceğiz.',
      promptIsTurkish: true,
      options: ['Мы увидимся.', 'Мы увиделись.', 'Мы видимся.', 'Увидь нас.'],
      correct: 0,
    },
    {
      type: 'choice',
      prompt: 'Почему «geleceğim», а не «gelecekim»?',
      promptIsTurkish: false,
      options: ['k смягчается в ğ перед -im', 'это ошибка', 'из-за гармонии', 'нужен буфер y'],
      correct: 0,
    },
    {
      type: 'assemble',
      ru: 'На следующей неделе я приду.',
      words: ['Gelecek', 'hafta', 'geleceğim'],
      correct: 'Gelecek hafta geleceğim',
      explain: 'gelecek hafta (на след. неделе) + geleceğim.',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'geleceğim', ru: 'я приду' },
        { tr: 'gideceğim', ru: 'я пойду' },
        { tr: 'yapacağım', ru: 'я сделаю' },
        { tr: 'gelmeyeceğim', ru: 'я не приду' },
      ],
    },
    {
      type: 'choice',
      prompt: 'Как спросить «Ты придёшь?»',
      promptIsTurkish: false,
      options: ['Gelecek misin?', 'Geliyor musun?', 'Geldin mi?', 'Gelir misin?'],
      correct: 0,
      explain: 'Будущее-вопрос: Gelecek misin?',
    },
  ],
};

export default unit;
