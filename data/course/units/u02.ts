import type { UnitContent } from '@/logic/course';

const unit: UnitContent = {
  id: 'u02',
  title: 'Приветствия и вежливость',
  theory: [
    {
      type: 'text',
      text:
        'В Турции приветствия — целый ритуал: здороваются с продавцами, соседями ' +
        'и попутчиками в лифте. Набор фраз ниже покроет 90% ситуаций.',
    },
    {
      type: 'table',
      title: 'Приветствия по времени суток',
      headers: ['Фраза', 'Перевод', 'Когда'],
      rows: [
        ['Günaydın', 'Доброе утро', 'до ~11:00'],
        ['İyi günler', 'Добрый день', 'днём (и «до свидания» днём)'],
        ['İyi akşamlar', 'Добрый вечер', 'вечером'],
        ['İyi geceler', 'Спокойной ночи', 'на ночь'],
      ],
    },
    {
      type: 'text',
      text:
        'Merhaba — универсальное «здравствуйте» в любое время суток. ' +
        'Selam — неформальное «привет» для друзей.',
    },
    {
      type: 'examples',
      title: 'Мини-диалог',
      items: [
        { tr: 'Merhaba! Nasılsın?', ru: 'Привет! Как дела?' },
        { tr: 'İyiyim, teşekkürler. Sen nasılsın?', ru: 'Хорошо, спасибо. А ты как?' },
        { tr: 'Ben de iyiyim.', ru: 'Я тоже хорошо.' },
      ],
    },
    {
      type: 'tip',
      text:
        'Teşekkür ederim выговорить сложно — турки часто говорят просто Teşekkürler ' +
        'или совсем коротко Sağ ol («спасибо», неформально).',
    },
    {
      type: 'text',
      text:
        'Прощание — парное: уходящий говорит Hoşça kal («счастливо оставаться»), ' +
        'а остающийся отвечает Güle güle. Универсальное «увидимся» — Görüşürüz.',
    },
  ],
  vocab: [
    { tr: 'Merhaba', ru: 'здравствуйте / привет' },
    { tr: 'Selam', ru: 'привет (неформально)' },
    { tr: 'Günaydın', ru: 'доброе утро' },
    { tr: 'İyi günler', ru: 'добрый день' },
    { tr: 'İyi akşamlar', ru: 'добрый вечер' },
    { tr: 'İyi geceler', ru: 'спокойной ночи' },
    { tr: 'Nasılsın?', ru: 'как дела?' },
    { tr: 'İyiyim', ru: 'у меня всё хорошо' },
    { tr: 'Teşekkürler', ru: 'спасибо' },
    { tr: 'Görüşürüz', ru: 'увидимся' },
    { tr: 'Hoşça kal', ru: 'пока (говорит уходящий)' },
    { tr: 'Güle güle', ru: 'пока (говорит остающийся)' },
  ],
  exercises: [
    {
      type: 'choice',
      prompt: 'Как поздороваться утром?',
      promptIsTurkish: false,
      options: ['Günaydın', 'İyi geceler', 'Görüşürüz', 'Güle güle'],
      correct: 0,
      explain: 'Günaydın — «доброе утро». İyi geceler говорят только на ночь.',
    },
    {
      type: 'choice',
      prompt: 'Nasılsın?',
      promptIsTurkish: true,
      options: ['Как дела?', 'Спокойной ночи', 'До встречи', 'Спасибо'],
      correct: 0,
    },
    {
      type: 'flashcard',
      tr: 'Merhaba',
      ru: 'здравствуйте / привет',
    },
    {
      type: 'match',
      pairs: [
        { tr: 'Günaydın', ru: 'доброе утро' },
        { tr: 'İyi akşamlar', ru: 'добрый вечер' },
        { tr: 'İyi geceler', ru: 'спокойной ночи' },
        { tr: 'İyi günler', ru: 'добрый день' },
      ],
    },
    {
      type: 'choice',
      prompt: 'Что ответить на «Nasılsın?»',
      promptIsTurkish: false,
      options: ['İyiyim, teşekkürler', 'Hoşça kal', 'Günaydın', 'Selam'],
      correct: 0,
      explain: 'İyiyim — «у меня всё хорошо». Дальше вежливо спросить в ответ: Sen nasılsın?',
    },
    {
      type: 'choice',
      prompt: 'Ты уходишь. Что скажешь на прощание?',
      promptIsTurkish: false,
      options: ['Hoşça kal', 'Güle güle', 'Günaydın', 'İyiyim'],
      correct: 0,
      explain: 'Уходящий говорит Hoşça kal, остающийся отвечает Güle güle.',
    },
    {
      type: 'flashcard',
      tr: 'Teşekkürler',
      ru: 'спасибо',
    },
    {
      type: 'choice',
      prompt: 'Неформальное «привет» для друзей',
      promptIsTurkish: false,
      options: ['Selam', 'Merhaba', 'İyi günler', 'Memnun oldum'],
      correct: 0,
    },
    {
      type: 'match',
      pairs: [
        { tr: 'Merhaba', ru: 'здравствуйте' },
        { tr: 'Nasılsın?', ru: 'как дела?' },
        { tr: 'Teşekkürler', ru: 'спасибо' },
        { tr: 'Görüşürüz', ru: 'увидимся' },
      ],
    },
    {
      type: 'choice',
      prompt: 'Güle güle',
      promptIsTurkish: true,
      options: [
        'пока (говорит остающийся)',
        'пока (говорит уходящий)',
        'доброе утро',
        'спасибо',
      ],
      correct: 0,
      explain: 'Güle güle отвечает тот, кто остаётся. Уходящий говорит Hoşça kal.',
    },
  ],
  test: [
    {
      type: 'choice',
      prompt: 'Как пожелать спокойной ночи?',
      promptIsTurkish: false,
      options: ['İyi geceler', 'Günaydın', 'İyi günler', 'Görüşürüz'],
      correct: 0,
      explain: 'İyi geceler — на ночь. Günaydın — утром.',
    },
    {
      type: 'choice',
      prompt: 'Когда говорят «İyi akşamlar»?',
      promptIsTurkish: false,
      options: ['вечером', 'утром', 'днём', 'только при прощании'],
      correct: 0,
      explain: 'İyi akşamlar — «добрый вечер».',
    },
    {
      type: 'choice',
      prompt: 'Görüşürüz',
      promptIsTurkish: true,
      options: ['увидимся', 'спасибо', 'доброе утро', 'приятно познакомиться'],
      correct: 0,
    },
    {
      type: 'choice',
      prompt: 'Собеседник уходит, ты остаёшься. Что ответишь?',
      promptIsTurkish: false,
      options: ['Güle güle', 'Hoşça kal', 'Günaydın', 'Nasılsın'],
      correct: 0,
      explain: 'Остающийся отвечает Güle güle. Уходящий говорит Hoşça kal.',
    },
    {
      type: 'choice',
      prompt: 'Короткое неформальное «спасибо»?',
      promptIsTurkish: false,
      options: ['Sağ ol', 'Günaydın', 'Selam', 'Görüşürüz'],
      correct: 0,
      explain: 'Sağ ol — неформальное «спасибо», ещё короче, чем Teşekkürler.',
    },
    {
      type: 'choice',
      prompt: 'Что значит «İyiyim»?',
      promptIsTurkish: false,
      options: ['у меня всё хорошо', 'как дела?', 'до свидания', 'приятно'],
      correct: 0,
    },
    {
      type: 'match',
      pairs: [
        { tr: 'Günaydın', ru: 'доброе утро' },
        { tr: 'İyi akşamlar', ru: 'добрый вечер' },
        { tr: 'İyi geceler', ru: 'спокойной ночи' },
        { tr: 'Hoşça kal', ru: 'пока (уходящий)' },
      ],
    },
    {
      type: 'assemble',
      ru: 'Привет! Как дела?',
      words: ['Merhaba', 'Nasılsın'],
      correct: 'Merhaba Nasılsın',
      explain: 'Сначала приветствие Merhaba, затем вопрос Nasılsın.',
    },
  ],
};

export default unit;
