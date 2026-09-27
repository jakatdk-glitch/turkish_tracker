import { LIFE_PHRASEBOOK } from './reallife';

export interface Phrase {
  id: string;
  tr: string;
  ru: string;
  hint?: string;
}

export interface PhraseCategory {
  id: string;
  title: string;
  emoji: string;
  phrases: Phrase[];
}

export const PHRASEBOOK: PhraseCategory[] = [
  {
    id: 'greetings',
    title: 'Знакомство и вежливость',
    emoji: '🤝',
    phrases: [
      { id: 'gr1', tr: 'Merhaba', ru: 'Здравствуйте / привет' },
      { id: 'gr2', tr: 'Günaydın', ru: 'Доброе утро' },
      { id: 'gr3', tr: 'İyi günler', ru: 'Добрый день / всего доброго' },
      { id: 'gr4', tr: 'İyi akşamlar', ru: 'Добрый вечер' },
      { id: 'gr5', tr: 'Nasılsınız?', ru: 'Как дела?', hint: 'вежливо, на «вы»' },
      { id: 'gr6', tr: 'İyiyim, teşekkürler', ru: 'Хорошо, спасибо' },
      { id: 'gr7', tr: 'Adınız ne?', ru: 'Как вас зовут?' },
      { id: 'gr8', tr: 'Benim adım…', ru: 'Меня зовут…' },
      { id: 'gr9', tr: 'Memnun oldum', ru: 'Приятно познакомиться' },
      { id: 'gr10', tr: 'Lütfen', ru: 'Пожалуйста', hint: 'при просьбе' },
      { id: 'gr11', tr: 'Teşekkür ederim', ru: 'Спасибо' },
      { id: 'gr12', tr: 'Rica ederim', ru: 'Пожалуйста', hint: 'в ответ на спасибо' },
      { id: 'gr13', tr: 'Affedersiniz', ru: 'Извините', hint: 'чтобы привлечь внимание' },
      { id: 'gr14', tr: 'Özür dilerim', ru: 'Прошу прощения', hint: 'извинение за проступок' },
      { id: 'gr15', tr: 'Görüşürüz', ru: 'Увидимся' },
      { id: 'gr16', tr: 'Hoşça kalın', ru: 'До свидания', hint: 'говорит уходящий' },
    ],
  },
  {
    id: 'cafe',
    title: 'В кафе и ресторане',
    emoji: '🍽️',
    phrases: [
      { id: 'cf1', tr: 'Bir masa lütfen', ru: 'Столик, пожалуйста' },
      { id: 'cf2', tr: 'Menü alabilir miyim?', ru: 'Можно меню?' },
      { id: 'cf3', tr: 'Ne önerirsiniz?', ru: 'Что посоветуете?' },
      { id: 'cf4', tr: 'Bir çay lütfen', ru: 'Один чай, пожалуйста' },
      { id: 'cf5', tr: 'Bir kahve, lütfen', ru: 'Один кофе, пожалуйста' },
      { id: 'cf6', tr: 'Su, lütfen', ru: 'Воду, пожалуйста' },
      { id: 'cf7', tr: 'Bunu istiyorum', ru: 'Я хочу вот это', hint: 'показывая в меню' },
      { id: 'cf8', tr: 'Et yemiyorum', ru: 'Я не ем мясо' },
      { id: 'cf9', tr: 'Acı olmasın', ru: 'Не острое, пожалуйста' },
      { id: 'cf10', tr: 'Afiyet olsun', ru: 'Приятного аппетита' },
      { id: 'cf11', tr: 'Çok lezzetli', ru: 'Очень вкусно' },
      { id: 'cf12', tr: 'Hesap, lütfen', ru: 'Счёт, пожалуйста' },
      { id: 'cf13', tr: 'Kartla ödeyebilir miyim?', ru: 'Можно оплатить картой?' },
      { id: 'cf14', tr: 'Üstü kalsın', ru: 'Сдачи не надо' },
      { id: 'cf15', tr: 'Tuvalet nerede?', ru: 'Где туалет?' },
    ],
  },
  {
    id: 'shopping',
    title: 'Магазин и торг',
    emoji: '🛍️',
    phrases: [
      { id: 'sh1', tr: 'Bu ne kadar?', ru: 'Сколько это стоит?' },
      { id: 'sh2', tr: 'Çok pahalı', ru: 'Очень дорого' },
      { id: 'sh3', tr: 'İndirim var mı?', ru: 'Есть скидка?' },
      { id: 'sh4', tr: 'Daha ucuz olur mu?', ru: 'Можно дешевле?', hint: 'торг на базаре' },
      { id: 'sh5', tr: 'Sadece bakıyorum', ru: 'Я просто смотрю' },
      { id: 'sh6', tr: 'Bunu alıyorum', ru: 'Я беру это' },
      { id: 'sh7', tr: 'Başka rengi var mı?', ru: 'Есть другой цвет?' },
      { id: 'sh8', tr: 'Deneyebilir miyim?', ru: 'Можно примерить?' },
      { id: 'sh9', tr: 'Çok büyük', ru: 'Слишком большое' },
      { id: 'sh10', tr: 'Çok küçük', ru: 'Слишком маленькое' },
      { id: 'sh11', tr: 'Nakit', ru: 'Наличными' },
      { id: 'sh12', tr: 'Poşet lütfen', ru: 'Пакет, пожалуйста' },
      { id: 'sh13', tr: 'Fiş alabilir miyim?', ru: 'Можно чек?' },
    ],
  },
  {
    id: 'transport',
    title: 'Транспорт и такси',
    emoji: '🚕',
    phrases: [
      { id: 'tr1', tr: 'Taksi!', ru: 'Такси!' },
      { id: 'tr2', tr: 'Havalimanına, lütfen', ru: 'В аэропорт, пожалуйста' },
      { id: 'tr3', tr: 'Bu adrese gidebilir miyiz?', ru: 'Можем поехать по этому адресу?' },
      { id: 'tr4', tr: 'Taksimetre açık mı?', ru: 'Счётчик включён?', hint: 'важно спросить в такси' },
      { id: 'tr5', tr: 'Ne kadar sürer?', ru: 'Сколько времени займёт?' },
      { id: 'tr6', tr: 'Burada durabilir misiniz?', ru: 'Можете остановить здесь?' },
      { id: 'tr7', tr: 'Otobüs durağı nerede?', ru: 'Где автобусная остановка?' },
      { id: 'tr8', tr: 'Metro istasyonu nerede?', ru: 'Где станция метро?' },
      { id: 'tr9', tr: 'Bilet nereden alabilirim?', ru: 'Где купить билет?' },
      { id: 'tr10', tr: 'Bu otobüs … gidiyor mu?', ru: 'Этот автобус едет в…?' },
      { id: 'tr11', tr: 'İnmek istiyorum', ru: 'Я хочу выйти' },
      { id: 'tr12', tr: 'Sağa / sola dönün', ru: 'Поверните направо / налево' },
      { id: 'tr13', tr: 'Düz gidin', ru: 'Езжайте прямо' },
    ],
  },
  {
    id: 'hotel',
    title: 'В отеле',
    emoji: '🏨',
    phrases: [
      { id: 'ht1', tr: 'Rezervasyonum var', ru: 'У меня есть бронь' },
      { id: 'ht2', tr: 'Boş odanız var mı?', ru: 'Есть свободные номера?' },
      { id: 'ht3', tr: 'Bir gece ne kadar?', ru: 'Сколько за ночь?' },
      { id: 'ht4', tr: 'Kahvaltı dahil mi?', ru: 'Завтрак включён?' },
      { id: 'ht5', tr: 'Wi-Fi şifresi nedir?', ru: 'Какой пароль от Wi-Fi?' },
      { id: 'ht6', tr: 'Oda anahtarı, lütfen', ru: 'Ключ от номера, пожалуйста' },
      { id: 'ht7', tr: 'Klima çalışmıyor', ru: 'Кондиционер не работает' },
      { id: 'ht8', tr: 'Sıcak su yok', ru: 'Нет горячей воды' },
      { id: 'ht9', tr: 'Havlu alabilir miyim?', ru: 'Можно полотенце?' },
      { id: 'ht10', tr: 'Kaçta çıkış yapmalıyım?', ru: 'Во сколько выезд?' },
      { id: 'ht11', tr: 'Bavulumu bırakabilir miyim?', ru: 'Можно оставить чемодан?' },
    ],
  },
  {
    id: 'emergency',
    title: 'Экстренные ситуации',
    emoji: '🆘',
    phrases: [
      { id: 'em1', tr: 'Yardım edin!', ru: 'Помогите!' },
      { id: 'em2', tr: 'İmdat!', ru: 'На помощь!', hint: 'крик о помощи' },
      { id: 'em3', tr: 'Bir doktora ihtiyacım var', ru: 'Мне нужен врач' },
      { id: 'em4', tr: 'Ambulans çağırın', ru: 'Вызовите скорую' },
      { id: 'em5', tr: 'Polis çağırın', ru: 'Вызовите полицию' },
      { id: 'em6', tr: 'Hastane nerede?', ru: 'Где больница?' },
      { id: 'em7', tr: 'Eczane nerede?', ru: 'Где аптека?' },
      { id: 'em8', tr: 'Kayboldum', ru: 'Я заблудился' },
      { id: 'em9', tr: 'Pasaportumu kaybettim', ru: 'Я потерял паспорт' },
      { id: 'em10', tr: 'Hastayım', ru: 'Я болен' },
      { id: 'em11', tr: 'Burası ağrıyor', ru: 'Здесь болит', hint: 'показывая место' },
      { id: 'em12', tr: 'Alerjim var', ru: 'У меня аллергия' },
    ],
  },
  {
    id: 'numbers-time',
    title: 'Числа, время, даты',
    emoji: '🕐',
    phrases: [
      { id: 'nt1', tr: 'Saat kaç?', ru: 'Который час?' },
      { id: 'nt2', tr: 'Saat üç', ru: 'Три часа' },
      { id: 'nt3', tr: 'Bugün', ru: 'Сегодня' },
      { id: 'nt4', tr: 'Yarın', ru: 'Завтра' },
      { id: 'nt5', tr: 'Dün', ru: 'Вчера' },
      { id: 'nt6', tr: 'Şimdi', ru: 'Сейчас' },
      { id: 'nt7', tr: 'Sabah', ru: 'Утро' },
      { id: 'nt8', tr: 'Öğle', ru: 'Полдень' },
      { id: 'nt9', tr: 'Akşam', ru: 'Вечер' },
      { id: 'nt10', tr: 'Gece', ru: 'Ночь' },
      { id: 'nt11', tr: 'Ne zaman?', ru: 'Когда?' },
      { id: 'nt12', tr: 'Kaçta?', ru: 'Во сколько?' },
      { id: 'nt13', tr: 'Bir dakika', ru: 'Одну минуту' },
      { id: 'nt14', tr: 'Geç kaldım', ru: 'Я опоздал' },
    ],
  },
];

export function findPhrase(id: string): Phrase | undefined {
  for (const category of [...PHRASEBOOK, ...LIFE_PHRASEBOOK]) {
    const phrase = category.phrases.find((p) => p.id === id);
    if (phrase) return phrase;
  }
  return undefined;
}
