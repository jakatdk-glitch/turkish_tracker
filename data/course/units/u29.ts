import type { UnitContent } from '@/logic/course';

const unit: UnitContent = {
  id: 'u29',
  title: '-ince: когда, как только',
  theory: [
    {
      type: 'text',
      text:
        '-ince/-ınca/-unca/-ünce = «когда / как только» (точечное событие). ' +
        'gelince (когда придёт / придя), görünce (увидев), bitince (когда закончится).',
    },
    {
      type: 'table',
      title: 'Формы',
      headers: ['Форма', 'Смысл'],
      rows: [
        ['gelince', 'когда придёт / придя'],
        ['görünce', 'когда увидит / увидев'],
        ['bitince', 'когда закончится'],
        ['duyunca', 'услышав'],
      ],
    },
    {
      type: 'tip',
      text:
        '-ince — момент («как только»), -ken — процесс («пока»). ' +
        'Eve gelince ye (поешь, когда придёшь) ↔ eve giderken (по пути домой).',
    },
    {
      type: 'examples',
      title: 'Момент',
      items: [
        { tr: 'Eve gelince yemek yerim.', ru: 'Когда прихожу домой, ем.' },
        { tr: 'Onu görünce sevindim.', ru: 'Увидев его, я обрадовался.' },
        { tr: 'İş bitince ararım.', ru: 'Как закончу работу — позвоню.' },
      ],
    },
  ],
  vocab: [
    { tr: 'gelince', ru: 'когда придёт / придя' },
    { tr: 'görünce', ru: 'увидев' },
    { tr: 'bitince', ru: 'когда закончится' },
    { tr: 'duyunca', ru: 'услышав' },
    { tr: 'gidince', ru: 'когда уйдёт / уйдя' },
    { tr: 'bitmek', ru: 'заканчиваться' },
    { tr: 'duymak', ru: 'слышать' },
    { tr: 'sevinmek', ru: 'радоваться' },
    { tr: 'iş', ru: 'работа' },
    { tr: 'aramak', ru: 'звонить / искать' },
  ],
  exercises: [
    {
      type: 'choice',
      prompt: 'Как «когда придёшь домой» (eve gelmek)?',
      promptIsTurkish: false,
      options: ['eve gelince', 'eve gelirken', 'eve geldim', 'eve gelir'],
      correct: 0,
      explain: '-ince = «когда / как только»: gelince.',
    },
    {
      type: 'choice',
      prompt: 'İş bitince ararım.',
      promptIsTurkish: true,
      options: ['Как закончу работу — позвоню.', 'Работа закончилась, звоню.', 'Пока работаю, звоню.', 'Закончу и работаю.'],
      correct: 0,
    },
    {
      type: 'blank',
      ru: 'увидев (gör + -ünce)',
      sentence: 'gör___',
      options: ['ünce', 'erken', 'düm', 'üyor'],
      correct: 0,
      explain: 'görünce — «увидев / когда увидит».',
    },
    {
      type: 'choice',
      prompt: '-ince означает…',
      promptIsTurkish: false,
      options: ['момент «когда / как только»', 'процесс «пока»', 'причину', 'цель'],
      correct: 0,
    },
    {
      type: 'flashcard',
      tr: 'bitmek',
      ru: 'заканчиваться',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'gelince', ru: 'когда придёт' },
        { tr: 'görünce', ru: 'увидев' },
        { tr: 'bitince', ru: 'когда закончится' },
        { tr: 'duyunca', ru: 'услышав' },
      ],
    },
    {
      type: 'assemble',
      ru: 'Когда прихожу домой, ем.',
      words: ['Eve', 'gelince', 'yemek', 'yerim'],
      correct: 'Eve gelince yemek yerim',
      explain: 'eve gelince + yerim.',
    },
    {
      type: 'choice',
      prompt: 'Разница -ince и -ken?',
      promptIsTurkish: false,
      options: ['-ince — момент, -ken — процесс', 'это одно и то же', '-ince — процесс', '-ken — момент'],
      correct: 0,
    },
    {
      type: 'flashcard',
      tr: 'duymak',
      ru: 'слышать',
    },
    {
      type: 'choice',
      prompt: 'Onu görünce sevindim.',
      promptIsTurkish: true,
      options: ['Увидев его, я обрадовался.', 'Я вижу его и радуюсь.', 'Я обрадовался и увидел.', 'Он увидел меня.'],
      correct: 0,
    },
  ],
  test: [
    {
      type: 'choice',
      prompt: 'Как «когда закончится работа» (iş bitmek)?',
      promptIsTurkish: false,
      options: ['iş bitince', 'iş biterken', 'iş bitti', 'iş biter'],
      correct: 0,
      explain: '-ince = «когда»: bitince.',
    },
    {
      type: 'blank',
      ru: 'услышав (duy + -unca)',
      sentence: 'duy___',
      options: ['unca', 'arken', 'dum', 'uyor'],
      correct: 0,
      explain: 'duyunca — «услышав».',
    },
    {
      type: 'choice',
      prompt: 'Eve gelince ararım.',
      promptIsTurkish: true,
      options: ['Позвоню, когда приду домой.', 'Звоню по пути домой.', 'Я дома, звоню.', 'Пришёл домой и позвонил.'],
      correct: 0,
    },
    {
      type: 'choice',
      prompt: '«gidince» значит…',
      promptIsTurkish: false,
      options: ['когда уйдёт / уйдя', 'по пути туда', 'он ушёл', 'он уходит'],
      correct: 0,
    },
    {
      type: 'choice',
      prompt: '-ince — это момент, а процесс «пока» — это…',
      promptIsTurkish: false,
      options: ['-ken', '-ince', '-meli', '-ecek'],
      correct: 0,
    },
    {
      type: 'assemble',
      ru: 'Как закончу работу — позвоню.',
      words: ['İş', 'bitince', 'ararım'],
      correct: 'İş bitince ararım',
      explain: 'iş bitince (когда закончится работа) + ararım.',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'gelince', ru: 'когда придёт' },
        { tr: 'görünce', ru: 'увидев' },
        { tr: 'bitince', ru: 'когда закончится' },
        { tr: 'gidince', ru: 'уйдя' },
      ],
    },
    {
      type: 'choice',
      prompt: 'Что описывает -ince?',
      promptIsTurkish: false,
      options: ['точку во времени «как только»', 'длительный фон', 'условие «если»', 'цель «чтобы»'],
      correct: 0,
    },
  ],
};

export default unit;
