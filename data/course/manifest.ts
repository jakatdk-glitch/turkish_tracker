import type { CourseModule } from '@/logic/course';

export const COURSE: CourseModule[] = [
  {
    id: 'm1',
    title: 'Модуль 1 · Первые слова',
    units: [
      { id: 'u01', title: 'Алфавит и произношение', emoji: '🔤' },
      { id: 'u02', title: 'Приветствия и вежливость', emoji: '👋' },
      // Гармония идёт до личных суффиксов — она их фундамент.
      { id: 'u04', title: 'Гармония гласных', emoji: '🎵' },
      { id: 'u03', title: 'Знакомство: Ben… / Sen…', emoji: '🤝' },
      { id: 'u05', title: 'Числа 0–100', emoji: '🔢' },
      { id: 'u06', title: 'Вопрос mı/mi и Evet/Hayır', emoji: '❓' },
    ],
  },
  {
    id: 'm2',
    title: 'Модуль 2 · Вокруг меня',
    units: [
      { id: 'u07', title: 'Множественное число -lar/-ler', emoji: '👥' },
      { id: 'u08', title: 'Var / Yok — есть / нет', emoji: '✅' },
      { id: 'u09', title: 'Местный падеж -da/-de: где?', emoji: '📍' },
      { id: 'u10', title: 'Семья и притяжательность', emoji: '👨‍👩‍👧' },
      { id: 'u11', title: 'Цвета и прилагательные', emoji: '🎨' },
      { id: 'u12', title: 'Дни недели и время', emoji: '🕐' },
    ],
  },
  {
    id: 'm3',
    title: 'Модуль 3 · Действия',
    units: [
      { id: 'u13', title: 'Настоящее время -iyor', emoji: '🏃' },
      // Отрицание и вопрос сразу после настоящего времени — «фразы выживания».
      { id: 'u18', title: 'Отрицание и вопросы', emoji: '🚫' },
      { id: 'u14', title: 'Винительный падеж и смягчение', emoji: '🎯' },
      { id: 'u15', title: 'Куда? Откуда? -a/-e, -dan/-den', emoji: '🧭' },
      { id: 'u16', title: 'Хочу и могу', emoji: '💪' },
      { id: 'u17', title: 'В кафе: заказываем еду', emoji: '🍽️' },
      { id: 'u19', title: 'Прошедшее время -di', emoji: '⏪' },
    ],
  },
  {
    id: 'm4',
    title: 'Модуль 4 · Планы и мнения',
    units: [
      { id: 'u20', title: 'Аорист: привычки -er/-ir', emoji: '☕' },
      { id: 'u21', title: '«У меня есть»: … var', emoji: '🎒' },
      { id: 'u22', title: 'Будущее время -acak', emoji: '🔮' },
      { id: 'u23', title: 'Долженствование -meli', emoji: '❗' },
      { id: 'u24', title: 'Сравнение: daha, en', emoji: '⚖️' },
      { id: 'u25', title: 'Послелоги ile и için', emoji: '🔗' },
    ],
  },
  {
    id: 'm5',
    title: 'Модуль 5 · Связная речь',
    units: [
      { id: 'u26', title: 'Условие -se/-sa', emoji: '🔀' },
      { id: 'u27', title: 'önce, sonra, kadar', emoji: '⏳' },
      { id: 'u28', title: '-ken: пока, во время', emoji: '🎬' },
      { id: 'u29', title: '-ince: когда, как только', emoji: '📎' },
      { id: 'u30', title: 'Порядковые числа и даты', emoji: '📅' },
      { id: 'u31', title: 'Итоговый юнит: всё вместе', emoji: '💬' },
    ],
  },
];
