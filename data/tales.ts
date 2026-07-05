export interface TaleSentence {
  tr: string;
  ru: string;
}

export interface TaleWord {
  tr: string;
  ru: string;
}

export interface Tale {
  id: string;
  title: string;
  emoji: string;
  difficulty: 1 | 2 | 3;
  sentences: TaleSentence[];
  vocab: TaleWord[];
}

// Анекдоты про Насреддина Ходжу — короткие, смешные, культурно знаковые.
// Турецкий адаптирован под начинающих; перевод идёт пофразно.
export const TALES: Tale[] = [
  {
    id: 't_esek',
    title: 'Ходжа и осёл',
    emoji: '🫏',
    difficulty: 1,
    sentences: [
      { tr: 'Hoca eşeğinden düşer.', ru: 'Ходжа падает с осла.' },
      { tr: 'Çocuklar güler.', ru: 'Дети смеются.' },
      { tr: 'Hoca kalkar.', ru: 'Ходжа встаёт.' },
      { tr: '"Zaten inecektim," der.', ru: '«Я и так собирался слезть», — говорит он.' },
    ],
    vocab: [
      { tr: 'eşek', ru: 'осёл' },
      { tr: 'düşmek', ru: 'падать' },
      { tr: 'gülmek', ru: 'смеяться' },
      { tr: 'kalkmak', ru: 'вставать' },
    ],
  },
  {
    id: 't_ip',
    title: 'Мука на верёвке',
    emoji: '🧵',
    difficulty: 2,
    sentences: [
      { tr: 'Komşu, Hoca’ya gelir.', ru: 'Сосед приходит к Ходже.' },
      { tr: '"Çamaşır ipini alabilir miyim?" der.', ru: '«Можно взять бельевую верёвку?» — говорит он.' },
      { tr: 'Hoca içeri girer, biraz sonra çıkar.', ru: 'Ходжа заходит внутрь, вскоре выходит.' },
      { tr: '"Olmaz, ipe un serdim," der.', ru: '«Нельзя, я развесил на верёвке муку», — говорит он.' },
      { tr: '"İpe un serilir mi?" diye sorar komşu.', ru: '«Разве на верёвке развешивают муку?» — спрашивает сосед.' },
      { tr: 'Hoca güler: "Vermek istemeyince her şey serilir."', ru: 'Ходжа смеётся: «Когда не хочешь давать — развесить можно что угодно».' },
    ],
    vocab: [
      { tr: 'komşu', ru: 'сосед' },
      { tr: 'ip', ru: 'верёвка' },
      { tr: 'un', ru: 'мука' },
      { tr: 'vermek', ru: 'давать' },
    ],
  },
  {
    id: 't_gol',
    title: 'А вдруг получится?',
    emoji: '🥣',
    difficulty: 2,
    sentences: [
      { tr: 'Hoca bir gün göle gider.', ru: 'Однажды Ходжа идёт к озеру.' },
      { tr: 'Yanında bir kâse yoğurt vardır.', ru: 'У него с собой чашка йогурта.' },
      { tr: 'Yoğurdu göle atar ve karıştırır.', ru: 'Он бросает йогурт в озеро и размешивает.' },
      { tr: 'Biri sorar: "Hoca, ne yapıyorsun?"', ru: 'Кто-то спрашивает: «Ходжа, что ты делаешь?»' },
      { tr: '"Göle maya çalıyorum," der.', ru: '«Заквашиваю озеро в йогурт», — говорит он.' },
      { tr: '"Göl yoğurt olur mu hiç?"', ru: '«Разве озеро станет йогуртом?»' },
      { tr: 'Hoca gülümser: "Ya tutarsa?"', ru: 'Ходжа улыбается: «А вдруг получится?»' },
    ],
    vocab: [
      { tr: 'göl', ru: 'озеро' },
      { tr: 'yoğurt', ru: 'йогурт' },
      { tr: 'yapmak', ru: 'делать' },
      { tr: 'tutmak', ru: 'получиться / схватиться' },
    ],
  },
  {
    id: 't_duduk',
    title: 'Кто платит — тот и дудит',
    emoji: '🎵',
    difficulty: 2,
    sentences: [
      { tr: 'Hoca şehre gider.', ru: 'Ходжа идёт в город.' },
      { tr: 'Çocuklar: "Bize düdük al!" der.', ru: 'Дети говорят: «Купи нам свисток!»' },
      { tr: 'Ama sadece biri para verir.', ru: 'Но только один даёт деньги.' },
      { tr: 'Hoca bir düdük alır ve o çocuğa verir.', ru: 'Ходжа покупает один свисток и отдаёт тому ребёнку.' },
      { tr: 'Diğerleri kızar.', ru: 'Остальные сердятся.' },
      { tr: 'Hoca: "Parayı veren düdüğü çalar," der.', ru: 'Ходжа говорит: «Кто платит, тот и дудит».' },
    ],
    vocab: [
      { tr: 'şehir', ru: 'город' },
      { tr: 'çocuk', ru: 'ребёнок' },
      { tr: 'para', ru: 'деньги' },
      { tr: 'düdük', ru: 'свисток' },
    ],
  },
  {
    id: 't_kazan',
    title: 'Котёл родил',
    emoji: '🍲',
    difficulty: 3,
    sentences: [
      { tr: 'Hoca komşusundan bir kazan alır.', ru: 'Ходжа берёт у соседа котёл.' },
      { tr: 'Geri verirken içine küçük bir tencere koyar.', ru: 'Возвращая, кладёт внутрь маленькую кастрюлю.' },
      { tr: '"Bu ne?" diye sorar komşu.', ru: '«Что это?» — спрашивает сосед.' },
      { tr: '"Kazanın doğurdu," der Hoca.', ru: '«Твой котёл родил», — говорит Ходжа.' },
      { tr: 'Komşu sevinir ve tencereyi alır.', ru: 'Сосед радуется и берёт кастрюлю.' },
      { tr: 'Bir gün Hoca yine kazanı alır ama geri vermez.', ru: 'Однажды Ходжа снова берёт котёл, но не возвращает.' },
      { tr: '"Kazanım nerede?" diye sorar komşu.', ru: '«Где мой котёл?» — спрашивает сосед.' },
      { tr: '"Öldü," der Hoca.', ru: '«Умер», — говорит Ходжа.' },
      { tr: '"Kazan ölür mü?"', ru: '«Разве котёл умирает?»' },
      { tr: '"Doğurduğuna inandın, öldüğüne de inan."', ru: '«Поверил, что родил — поверь и что умер».' },
    ],
    vocab: [
      { tr: 'kazan', ru: 'котёл' },
      { tr: 'tencere', ru: 'кастрюля' },
      { tr: 'ölmek', ru: 'умирать' },
      { tr: 'inanmak', ru: 'верить' },
    ],
  },
  {
    id: 't_ay',
    title: 'Луна в колодце',
    emoji: '🌙',
    difficulty: 2,
    sentences: [
      { tr: 'Hoca bir gece kuyuya bakar.', ru: 'Однажды ночью Ходжа смотрит в колодец.' },
      { tr: 'Kuyuda ayı görür.', ru: 'В колодце он видит луну.' },
      { tr: '"Ay kuyuya düştü!" der.', ru: '«Луна упала в колодец!» — говорит он.' },
      { tr: 'Bir ip ve kanca getirir.', ru: 'Он приносит верёвку и крюк.' },
      { tr: 'Kancayı atar ve kuvvetle çeker.', ru: 'Бросает крюк и сильно тянет.' },
      { tr: 'Kanca bir taşa takılır, Hoca düşer.', ru: 'Крюк цепляется за камень, Ходжа падает.' },
      { tr: 'Gökyüzünde ayı görür.', ru: 'На небе он видит луну.' },
      { tr: '"Çok yoruldum ama ayı kurtardım!" der.', ru: '«Очень устал, зато луну спас!» — говорит он.' },
    ],
    vocab: [
      { tr: 'ay', ru: 'луна' },
      { tr: 'kuyu', ru: 'колодец' },
      { tr: 'taş', ru: 'камень' },
      { tr: 'kurtarmak', ru: 'спасать' },
    ],
  },
  {
    id: 't_yorgan',
    title: 'Ушло одеяло — кончилась ссора',
    emoji: '🛏️',
    difficulty: 2,
    sentences: [
      { tr: 'Bir gece dışarıda gürültü olur.', ru: 'Однажды ночью снаружи шум.' },
      { tr: 'Hoca yorganı alır ve dışarı çıkar.', ru: 'Ходжа берёт одеяло и выходит наружу.' },
      { tr: 'Hırsızlar yorganı kapar ve kaçar.', ru: 'Воры хватают одеяло и убегают.' },
      { tr: 'Hoca eve döner.', ru: 'Ходжа возвращается домой.' },
      { tr: 'Karısı sorar: "Dışarıda ne oldu?"', ru: 'Жена спрашивает: «Что случилось снаружи?»' },
      { tr: '"Kavga bizim yorgan içinmiş," der.', ru: '«Ссора, оказывается, была из-за нашего одеяла», — говорит он.' },
      { tr: '"Yorgan gitti, kavga bitti."', ru: '«Ушло одеяло — кончилась ссора».' },
    ],
    vocab: [
      { tr: 'yorgan', ru: 'одеяло' },
      { tr: 'gürültü', ru: 'шум' },
      { tr: 'hırsız', ru: 'вор' },
      { tr: 'kavga', ru: 'ссора' },
    ],
  },
  {
    id: 't_vaaz',
    title: 'Знающие расскажут незнающим',
    emoji: '🕌',
    difficulty: 3,
    sentences: [
      { tr: 'Hoca bir gün camide vaaz verir.', ru: 'Однажды Ходжа читает проповедь в мечети.' },
      { tr: '"Ne söyleyeceğimi biliyor musunuz?" diye sorar.', ru: '«Знаете ли вы, что я скажу?» — спрашивает он.' },
      { tr: 'Cemaat: "Hayır, bilmiyoruz," der.', ru: 'Прихожане: «Нет, не знаем», — говорят.' },
      { tr: '"O zaman size ne anlatayım?" der ve iner.', ru: '«Тогда что мне вам рассказывать?» — говорит он и спускается.' },
      { tr: 'Ertesi gün cemaat: "Evet, biliyoruz," der.', ru: 'На следующий день прихожане: «Да, знаем», — говорят.' },
      { tr: '"Madem biliyorsunuz, anlatmama gerek yok."', ru: '«Раз знаете, мне и рассказывать незачем».' },
      { tr: 'Üçüncü gün cemaat ikiye ayrılır.', ru: 'На третий день прихожане делятся надвое.' },
      { tr: 'Hoca: "Bilenler bilmeyenlere anlatsın," der.', ru: 'Ходжа: «Пусть знающие расскажут незнающим», — говорит он.' },
    ],
    vocab: [
      { tr: 'cami', ru: 'мечеть' },
      { tr: 'bilmek', ru: 'знать' },
      { tr: 'anlatmak', ru: 'рассказывать' },
      { tr: 'gün', ru: 'день' },
    ],
  },
  {
    id: 't_kurk',
    title: 'Ешь, шуба моя, ешь!',
    emoji: '🧥',
    difficulty: 3,
    sentences: [
      { tr: 'Hoca bir davete gider.', ru: 'Ходжа идёт на пир.' },
      { tr: 'Üzerinde eski elbiseleri vardır.', ru: 'На нём старая одежда.' },
      { tr: 'Kimse ona ilgi göstermez.', ru: 'Никто не обращает на него внимания.' },
      { tr: 'Hoca eve döner ve kürkünü giyer.', ru: 'Ходжа возвращается домой и надевает шубу.' },
      { tr: 'Tekrar davete gelir.', ru: 'Снова приходит на пир.' },
      { tr: 'Şimdi herkes ona saygı gösterir.', ru: 'Теперь все проявляют к нему уважение.' },
      { tr: 'Hoca kürkünü yemeğe sokar: "Ye kürküm ye!"', ru: 'Ходжа тычет шубу в еду: «Ешь, шуба моя, ешь!»' },
      { tr: '"Demek saygı bana değil, kürke," der.', ru: '«Значит, уважение не мне, а шубе», — говорит он.' },
    ],
    vocab: [
      { tr: 'davet', ru: 'приглашение / пир' },
      { tr: 'kürk', ru: 'шуба' },
      { tr: 'saygı', ru: 'уважение' },
      { tr: 'giymek', ru: 'надевать' },
    ],
  },
];

export function findTale(id: string): Tale | undefined {
  return TALES.find((t) => t.id === id);
}
