import type { UnitContent } from '@/logic/course';

const unit: UnitContent = {
  id: 'u14',
  title: 'Винительный падеж и смягчение',
  theory: [
    {
      type: 'text',
      text:
        'В русском есть «воду» и «эту воду», но артиклей нет. В турецком разница ' +
        'между «какой-то» и «именно этот» объектом показывается суффиксом. ' +
        'Su istiyorum — «хочу воды» (вообще). Suyu istiyorum — «хочу [эту] воду» ' +
        '(конкретную). Это винительный падеж — суффикс -ı/-i/-u/-ü.',
    },
    {
      type: 'table',
      title: 'Гармония винительного (на 4)',
      headers: ['Последняя гласная', 'Суффикс', 'Пример'],
      rows: [
        ['e, i', 'i', 'ev → evi (дом)'],
        ['a, ı', 'ı', 'kız → kızı (девочку)'],
        ['o, u', 'u', 'okul → okulu (школу)'],
        ['ö, ü', 'ü', 'göz → gözü (глаз)'],
      ],
    },
    {
      type: 'tip',
      text:
        'После гласной вставляется буфер -y-, чтобы две гласные не сталкивались: ' +
        'araba → arabayı, su → suyu, kedi → kediyi.',
    },
    {
      type: 'text',
      text:
        'Второй секрет: если слово кончается на p, ç, t, k, то перед гласным ' +
        'суффиксом эта буква смягчается. Это ünsüz yumuşaması — «смягчение согласных».',
    },
    {
      type: 'table',
      title: 'Смягчение согласных',
      headers: ['Конечная', '→', 'Пример'],
      rows: [
        ['p', 'b', 'kitap → kitabı (книгу)'],
        ['ç', 'c', 'ağaç → ağacı (дерево)'],
        ['t', 'd', 'kanat → kanadı (крыло)'],
        ['k', 'ğ', 'ekmek → ekmeği (хлеб)'],
        ['nk', 'ng', 'renk → rengi (цвет)'],
      ],
    },
    {
      type: 'tip',
      text:
        'Смягчаются в основном длинные слова. Короткие (односложные) обычно не меняются: ' +
        'at → atı (лошадь), top → topu (мяч), süt → sütü (молоко).',
    },
  ],
  vocab: [
    { tr: 'kitap', ru: 'книга' },
    { tr: 'ekmek', ru: 'хлеб' },
    { tr: 'renk', ru: 'цвет' },
    { tr: 'ağaç', ru: 'дерево' },
    { tr: 'okul', ru: 'школа' },
    { tr: 'su', ru: 'вода' },
    { tr: 'kapı', ru: 'дверь' },
    { tr: 'istiyorum', ru: 'я хочу' },
    { tr: 'görüyorum', ru: 'я вижу' },
    { tr: 'içiyorum', ru: 'я пью' },
  ],
  exercises: [
    {
      type: 'choice',
      prompt: 'Что значит «Suyu istiyorum»?',
      promptIsTurkish: false,
      options: [
        'Хочу [именно эту] воду',
        'Хочу воды (вообще)',
        'Пью воду',
        'Где вода?',
      ],
      correct: 0,
      explain: 'Suyu — вода с винительным суффиксом, значит объект определённый. Su istiyorum было бы «воды вообще».',
    },
    {
      type: 'blank',
      ru: 'дом → «(этот) дом» (вин. падеж)',
      sentence: 'ev___',
      options: ['i', 'ı', 'u', 'ü'],
      correct: 0,
      explain: 'Последняя гласная e → суффикс -i: evi.',
    },
    {
      type: 'blank',
      ru: 'школа → «(эту) школу»',
      sentence: 'okul___',
      options: ['u', 'ı', 'i', 'ü'],
      correct: 0,
      explain: 'Последняя гласная o → суффикс -u: okulu.',
    },
    {
      type: 'blank',
      ru: 'глаз → «(этот) глаз»',
      sentence: 'göz___',
      options: ['ü', 'u', 'i', 'ı'],
      correct: 0,
      explain: 'Последняя гласная ö → суффикс -ü: gözü.',
    },
    {
      type: 'blank',
      ru: 'машина → «(эту) машину» (кончается на гласную!)',
      sentence: 'araba___',
      options: ['yı', 'ı', 'yi', 'i'],
      correct: 0,
      explain: 'После гласной a — буфер y + гармония ı = -yı: arabayı.',
    },
    {
      type: 'blank',
      ru: 'вода → «(эту) воду»',
      sentence: 'su___',
      options: ['yu', 'u', 'yı', 'ı'],
      correct: 0,
      explain: 'После гласной u — буфер y + гармония u = -yu: suyu.',
    },
    {
      type: 'choice',
      prompt: 'Как правильно «(эту) книгу»?',
      promptIsTurkish: false,
      options: ['kitabı', 'kitapı', 'kitabi', 'kitapu'],
      correct: 0,
      explain: 'p смягчается в b перед гласным суффиксом: kitap → kitabı.',
    },
    {
      type: 'choice',
      prompt: 'Как правильно «(этот) хлеб»?',
      promptIsTurkish: false,
      options: ['ekmeği', 'ekmeki', 'ekmegi', 'ekmekı'],
      correct: 0,
      explain: 'k смягчается в ğ: ekmek → ekmeği.',
    },
    {
      type: 'choice',
      prompt: 'Как правильно «(этот) цвет»?',
      promptIsTurkish: false,
      options: ['rengi', 'renki', 'rengı', 'renki'],
      correct: 0,
      explain: 'Сочетание nk смягчается в ng: renk → rengi.',
    },
    {
      type: 'assemble',
      ru: 'Я хочу [эту] воду.',
      words: ['Suyu', 'istiyorum'],
      correct: 'Suyu istiyorum',
      explain: 'Объект (suyu) идёт перед глаголом — это турецкий порядок слов.',
    },
    {
      type: 'assemble',
      ru: 'Я вижу [этот] дом.',
      words: ['Evi', 'görüyorum'],
      correct: 'Evi görüyorum',
      explain: 'ev → evi (винительный), и объект стоит перед глаголом.',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'kitabı', ru: 'книгу' },
        { tr: 'suyu', ru: 'воду' },
        { tr: 'evi', ru: 'дом' },
        { tr: 'gözü', ru: 'глаз' },
      ],
    },
    {
      type: 'flashcard',
      tr: 'ekmeği',
      ru: '(этот) хлеб — вин. падеж',
    },
  ],
  test: [
    {
      type: 'choice',
      prompt: 'Что значит «Kitabı okuyorum»?',
      promptIsTurkish: false,
      options: [
        'Читаю [именно эту] книгу',
        'Читаю книгу (вообще)',
        'Хочу книгу',
        'Где книга?',
      ],
      correct: 0,
      explain: 'kitabı — с винительным суффиксом, значит объект определённый.',
    },
    {
      type: 'blank',
      ru: 'дверь → «(эту) дверь» (кончается на гласную!)',
      sentence: 'kapı___',
      options: ['yı', 'ı', 'yi', 'i'],
      correct: 0,
      explain: 'После гласной ı — буфер y + гармония ı = -yı: kapıyı.',
    },
    {
      type: 'blank',
      ru: 'девочка → «(эту) девочку»',
      sentence: 'kız___',
      options: ['ı', 'i', 'u', 'ü'],
      correct: 0,
      explain: 'Последняя гласная ı → суффикс -ı: kızı.',
    },
    {
      type: 'choice',
      prompt: 'Как правильно «(это) дерево» (ağaç)?',
      promptIsTurkish: false,
      options: ['ağacı', 'ağaçı', 'ağaçi', 'ağacu'],
      correct: 0,
      explain: 'ç смягчается в c перед гласным суффиксом: ağaç → ağacı.',
    },
    {
      type: 'choice',
      prompt: 'Почему «kitabı», а не «kitapı»?',
      promptIsTurkish: false,
      options: [
        'p смягчается в b перед гласным суффиксом',
        'это ошибка',
        'из-за гармонии гласных',
        'нужен буфер y',
      ],
      correct: 0,
      explain: 'ünsüz yumuşaması: p → b: kitap → kitabı.',
    },
    {
      type: 'assemble',
      ru: 'Я вижу [эту] дверь.',
      words: ['Kapıyı', 'görüyorum'],
      correct: 'Kapıyı görüyorum',
      explain: 'kapı → kapıyı (винительный), объект перед глаголом.',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'kitabı', ru: 'книгу' },
        { tr: 'ağacı', ru: 'дерево' },
        { tr: 'kızı', ru: 'девочку' },
        { tr: 'kapıyı', ru: 'дверь' },
      ],
    },
    {
      type: 'choice',
      prompt: 'Зачем в «arabayı» буква y?',
      promptIsTurkish: false,
      options: [
        'araba кончается на гласную — нужен буфер y',
        'это ошибка',
        'из-за смягчения',
        'это показатель множественного',
      ],
      correct: 0,
      explain: 'Буфер -y- разделяет две гласные: araba → arabayı.',
    },
  ],
};

export default unit;
