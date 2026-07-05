import type { UnitContent } from '@/logic/course';

const unit: UnitContent = {
  id: 'u30',
  title: 'Порядковые числа и даты',
  theory: [
    {
      type: 'text',
      text:
        'Порядковые числа — суффикс -inci/-ıncı/-uncu/-üncü: bir → birinci (первый), ' +
        'iki → ikinci, üç → üçüncü, dört → dördüncü, beş → beşinci, on → onuncu.',
    },
    {
      type: 'table',
      title: 'Порядковые',
      headers: ['Число', 'Порядковое'],
      rows: [
        ['1', 'birinci'],
        ['2', 'ikinci'],
        ['3', 'üçüncü'],
        ['4', 'dördüncü'],
        ['5', 'beşinci'],
        ['10', 'onuncu'],
      ],
    },
    {
      type: 'text',
      text:
        'Даты: число + месяц: 5 Mart (5 марта), 21 Nisan. «Какое сегодня число?» — ' +
        'Bugün ayın kaçı? Месяцы: Ocak, Şubat, Mart, Nisan…',
    },
    {
      type: 'tip',
      text:
        'birinci kat — «первый этаж», ikinci sıra — «второй ряд». В самих датах число ' +
        'обычно количественное: beş Mart.',
    },
    {
      type: 'examples',
      title: 'По порядку',
      items: [
        { tr: 'birinci kat', ru: 'первый этаж' },
        { tr: 'ikinci sıra', ru: 'второй ряд' },
        { tr: 'Bugün 5 Mart.', ru: 'Сегодня 5 марта.' },
        { tr: 'Bugün ayın kaçı?', ru: 'Какое сегодня число?' },
      ],
    },
  ],
  vocab: [
    { tr: 'birinci', ru: 'первый' },
    { tr: 'ikinci', ru: 'второй' },
    { tr: 'üçüncü', ru: 'третий' },
    { tr: 'dördüncü', ru: 'четвёртый' },
    { tr: 'beşinci', ru: 'пятый' },
    { tr: 'onuncu', ru: 'десятый' },
    { tr: 'ay', ru: 'месяц' },
    { tr: 'tarih', ru: 'дата' },
    { tr: 'kat', ru: 'этаж' },
    { tr: 'Mart', ru: 'март' },
  ],
  exercises: [
    {
      type: 'choice',
      prompt: 'Как «первый»?',
      promptIsTurkish: false,
      options: ['birinci', 'bir', 'birden', 'biri'],
      correct: 0,
      explain: 'bir + -inci: birinci.',
    },
    {
      type: 'choice',
      prompt: 'Как «третий»?',
      promptIsTurkish: false,
      options: ['üçüncü', 'üçinci', 'üçüncu', 'üçincu'],
      correct: 0,
      explain: 'üç + -üncü (гармония ü): üçüncü.',
    },
    {
      type: 'choice',
      prompt: 'birinci kat',
      promptIsTurkish: true,
      options: ['первый этаж', 'один этаж', 'этаж номер', 'первый ряд'],
      correct: 0,
    },
    {
      type: 'choice',
      prompt: 'Как спросить «Какое сегодня число?»',
      promptIsTurkish: false,
      options: ['Bugün ayın kaçı?', 'Bugün ne?', 'Saat kaç?', 'Bugün hangi?'],
      correct: 0,
    },
    {
      type: 'flashcard',
      tr: 'ay',
      ru: 'месяц',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'birinci', ru: 'первый' },
        { tr: 'ikinci', ru: 'второй' },
        { tr: 'üçüncü', ru: 'третий' },
        { tr: 'dördüncü', ru: 'четвёртый' },
      ],
    },
    {
      type: 'choice',
      prompt: 'Как «пятый»?',
      promptIsTurkish: false,
      options: ['beşinci', 'beş', 'beşten', 'beşli'],
      correct: 0,
      explain: 'beş + -inci: beşinci.',
    },
    {
      type: 'assemble',
      ru: 'Сегодня пятое марта.',
      words: ['Bugün', 'beş', 'Mart'],
      correct: 'Bugün beş Mart',
      explain: 'Число + месяц: beş Mart.',
    },
    {
      type: 'flashcard',
      tr: 'tarih',
      ru: 'дата',
    },
    {
      type: 'choice',
      prompt: 'Как «десятый»?',
      promptIsTurkish: false,
      options: ['onuncu', 'oninci', 'onuncı', 'oncu'],
      correct: 0,
      explain: 'on + -uncu: onuncu.',
    },
  ],
  test: [
    {
      type: 'choice',
      prompt: 'Как «второй»?',
      promptIsTurkish: false,
      options: ['ikinci', 'iki', 'ikici', 'ikinca'],
      correct: 0,
      explain: 'iki + -nci: ikinci.',
    },
    {
      type: 'choice',
      prompt: 'Как «четвёртый»?',
      promptIsTurkish: false,
      options: ['dördüncü', 'dörtüncü', 'dördünci', 'dörtinci'],
      correct: 0,
      explain: 'dört → dördüncü (t→d, гармония ü).',
    },
    {
      type: 'choice',
      prompt: 'ikinci sıra',
      promptIsTurkish: true,
      options: ['второй ряд', 'два ряда', 'ряд номер', 'второй этаж'],
      correct: 0,
    },
    {
      type: 'choice',
      prompt: 'Суффикс порядковых чисел — это…',
      promptIsTurkish: false,
      options: ['-inci/-ıncı/-uncu/-üncü', '-ler/-lar', '-de/-da', '-den'],
      correct: 0,
    },
    {
      type: 'choice',
      prompt: '«Bugün ayın kaçı?» спрашивает…',
      promptIsTurkish: false,
      options: ['какое сегодня число', 'который час', 'какой день недели', 'какой месяц'],
      correct: 0,
    },
    {
      type: 'assemble',
      ru: 'первый этаж',
      words: ['birinci', 'kat'],
      correct: 'birinci kat',
      explain: 'birinci (первый) + kat (этаж).',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'birinci', ru: 'первый' },
        { tr: 'beşinci', ru: 'пятый' },
        { tr: 'onuncu', ru: 'десятый' },
        { tr: 'üçüncü', ru: 'третий' },
      ],
    },
    {
      type: 'choice',
      prompt: 'Как «десятый»?',
      promptIsTurkish: false,
      options: ['onuncu', 'onuncı', 'oninci', 'oncu'],
      correct: 0,
    },
  ],
};

export default unit;
