export interface Proverb {
  id: string;
  tr: string;
  literal: string; // дословный перевод
  meaning: string; // смысл
  ru_equivalent?: string; // русский аналог, если есть
}

/**
 * Пословица дня: детерминированный выбор по дате (YYYY-MM-DD),
 * чтобы в течение дня она не менялась, а каждый день была новой.
 */
export function getProverbOfTheDay(dateStr: string): Proverb {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash * 31 + dateStr.charCodeAt(i)) | 0;
  }
  return PROVERBS[Math.abs(hash) % PROVERBS.length];
}

export const PROVERBS: Proverb[] = [
  {
    id: 'p1',
    tr: 'Damlaya damlaya göl olur.',
    literal: 'Капля за каплей — озеро получается.',
    meaning: 'Малые усилия накапливаются в большой результат.',
    ru_equivalent: 'Капля камень точит.',
  },
  {
    id: 'p2',
    tr: 'Sakla samanı, gelir zamanı.',
    literal: 'Прячь солому — придёт её время.',
    meaning: 'Бережливость окупается: что сберёг — однажды пригодится.',
    ru_equivalent: 'Запас беды не чинит.',
  },
  {
    id: 'p3',
    tr: 'Bir elin nesi var, iki elin sesi var.',
    literal: 'Что есть у одной руки, а у двух рук — звук есть.',
    meaning: 'Вместе можно сделать больше, чем в одиночку.',
    ru_equivalent: 'Одна голова хорошо, а две лучше.',
  },
  {
    id: 'p4',
    tr: 'Ağaç yaşken eğilir.',
    literal: 'Дерево гнётся, пока молодое.',
    meaning: 'Воспитывать и учить нужно смолоду.',
    ru_equivalent: 'Гни дерево, пока молодо.',
  },
  {
    id: 'p5',
    tr: 'Acele işe şeytan karışır.',
    literal: 'В спешное дело вмешивается чёрт.',
    meaning: 'Поспешность приводит к ошибкам.',
    ru_equivalent: 'Поспешишь — людей насмешишь.',
  },
  {
    id: 'p6',
    tr: 'Damdan düşen, damdan düşenin halinden anlar.',
    literal: 'Упавший с крыши понимает того, кто упал с крыши.',
    meaning: 'По-настоящему понять беду может лишь тот, кто сам её пережил.',
    ru_equivalent: 'Сытый голодного не разумеет.',
  },
  {
    id: 'p7',
    tr: 'Görünen köy kılavuz istemez.',
    literal: 'Видимая деревня проводника не требует.',
    meaning: 'Очевидное не нуждается в объяснениях.',
    ru_equivalent: 'Ясно как день.',
  },
  {
    id: 'p8',
    tr: 'İşleyen demir pas tutmaz.',
    literal: 'Работающее железо ржавчину не держит.',
    meaning: 'Кто в деле — тот в форме; безделье губит.',
    ru_equivalent: 'Под лежачий камень вода не течёт.',
  },
  {
    id: 'p9',
    tr: 'Son gülen iyi güler.',
    literal: 'Смеющийся последним смеётся хорошо.',
    meaning: 'Итог важнее промежуточного успеха.',
    ru_equivalent: 'Хорошо смеётся тот, кто смеётся последним.',
  },
  {
    id: 'p10',
    tr: 'Ne ekersen onu biçersin.',
    literal: 'Что посеешь, то и пожнёшь.',
    meaning: 'Результат зависит от твоих действий.',
    ru_equivalent: 'Что посеешь, то и пожнёшь.',
  },
  {
    id: 'p11',
    tr: 'Balık baştan kokar.',
    literal: 'Рыба с головы пахнет.',
    meaning: 'Беспорядок идёт сверху, от руководителей.',
    ru_equivalent: 'Рыба гниёт с головы.',
  },
  {
    id: 'p12',
    tr: 'Ateş olmayan yerden duman çıkmaz.',
    literal: 'Из места без огня дым не выходит.',
    meaning: 'У всякого слуха есть основание.',
    ru_equivalent: 'Нет дыма без огня.',
  },
  {
    id: 'p13',
    tr: 'Bugünün işini yarına bırakma.',
    literal: 'Не оставляй сегодняшнее дело на завтра.',
    meaning: 'Не откладывай то, что можно сделать сейчас.',
    ru_equivalent: 'Не откладывай на завтра то, что можно сделать сегодня.',
  },
  {
    id: 'p14',
    tr: 'Tatlı dil yılanı deliğinden çıkarır.',
    literal: 'Сладкая речь выманивает змею из норы.',
    meaning: 'Добрым словом можно добиться многого.',
    ru_equivalent: 'Ласковое слово и кошке приятно.',
  },
  {
    id: 'p15',
    tr: 'Sabır acıdır, meyvesi tatlıdır.',
    literal: 'Терпение горько, а плод его сладок.',
    meaning: 'Терпеливого ждёт награда.',
    ru_equivalent: 'Терпение и труд всё перетрут.',
  },
  {
    id: 'p16',
    tr: 'Komşu komşunun külüne muhtaçtır.',
    literal: 'Сосед нуждается даже в золе соседа.',
    meaning: 'Люди зависят друг от друга, соседи важны.',
    ru_equivalent: 'Не имей сто рублей, а имей сто друзей.',
  },
  {
    id: 'p17',
    tr: 'Aç tavuk kendini buğday ambarında sanır.',
    literal: 'Голодная курица воображает себя в амбаре с пшеницей.',
    meaning: 'Мечты часто рисуют желаемое вместо реального.',
    ru_equivalent: 'Голодной куме хлеб на уме.',
  },
  {
    id: 'p18',
    tr: 'İki gönül bir olunca samanlık seyran olur.',
    literal: 'Когда два сердца заодно, и сеновал станет дворцом.',
    meaning: 'С любимым и в шалаше хорошо.',
    ru_equivalent: 'С милым рай и в шалаше.',
  },
  {
    id: 'p19',
    tr: 'Dost kara günde belli olur.',
    literal: 'Друг познаётся в чёрный день.',
    meaning: 'Настоящий друг проявляется в беде.',
    ru_equivalent: 'Друг познаётся в беде.',
  },
  {
    id: 'p20',
    tr: 'Gülü seven dikenine katlanır.',
    literal: 'Любящий розу терпит её шипы.',
    meaning: 'Ради хорошего приходится мириться с неудобствами.',
    ru_equivalent: 'Любишь кататься — люби и саночки возить.',
  },
  {
    id: 'p21',
    tr: 'El eli yıkar, el de yüzü yıkar.',
    literal: 'Рука руку моет, а рука — лицо.',
    meaning: 'Взаимопомощь выгодна всем.',
    ru_equivalent: 'Рука руку моет.',
  },
  {
    id: 'p22',
    tr: 'Bakarsan bağ, bakmazsan dağ olur.',
    literal: 'Ухаживаешь — сад, не ухаживаешь — гора (бурьян).',
    meaning: 'За чем следишь — процветает, что забросил — приходит в упадок.',
    ru_equivalent: 'Без труда не выловишь и рыбку из пруда.',
  },
  {
    id: 'p23',
    tr: 'Ayağını yorganına göre uzat.',
    literal: 'Протягивай ноги по своему одеялу.',
    meaning: 'Живи по средствам.',
    ru_equivalent: 'По одёжке протягивай ножки.',
  },
  {
    id: 'p24',
    tr: 'Denize düşen yılana sarılır.',
    literal: 'Упавший в море и за змею хватается.',
    meaning: 'В отчаянии хватаешься за любую помощь.',
    ru_equivalent: 'Утопающий за соломинку хватается.',
  },
  {
    id: 'p25',
    tr: 'Öfkeyle kalkan zararla oturur.',
    literal: 'Кто встаёт в гневе, садится с убытком.',
    meaning: 'Решения на злости приводят к потерям.',
    ru_equivalent: 'Гнев — плохой советчик.',
  },
  {
    id: 'p26',
    tr: 'Sürüden ayrılanı kurt kapar.',
    literal: 'Отбившегося от стада хватает волк.',
    meaning: 'Одиночку легче одолеть; держись своих.',
    ru_equivalent: 'Один в поле не воин.',
  },
  {
    id: 'p27',
    tr: 'Taşıma su ile değirmen dönmez.',
    literal: 'Носимой водой мельница не крутится.',
    meaning: 'На временных подпорках дело долго не продержится.',
    ru_equivalent: 'На чужом горбу в рай не въедешь.',
  },
  {
    id: 'p28',
    tr: 'Ucuz etin yahnisi tatsız olur.',
    literal: 'Из дешёвого мяса и жаркое невкусное.',
    meaning: 'Дешёвое часто оборачивается плохим качеством.',
    ru_equivalent: 'Скупой платит дважды.',
  },
  {
    id: 'p29',
    tr: 'Bir fincan kahvenin kırk yıl hatırı vardır.',
    literal: 'У чашки кофе — сорок лет памяти.',
    meaning: 'Даже малое добро помнят долго.',
    ru_equivalent: 'Доброе дело не забывается.',
  },
  {
    id: 'p30',
    tr: 'Çalma elin kapısını, çalarlar kapını.',
    literal: 'Не стучи в чужую дверь — постучат в твою.',
    meaning: 'Как поступаешь с другими, так поступят с тобой.',
    ru_equivalent: 'Как аукнется, так и откликнется.',
  },
  {
    id: 'p31',
    tr: 'Doğru söyleyeni dokuz köyden kovarlar.',
    literal: 'Говорящего правду гонят из девяти деревень.',
    meaning: 'Правда часто неудобна и непопулярна.',
    ru_equivalent: 'Правда глаза колет.',
  },
  {
    id: 'p32',
    tr: 'Görünüşe aldanma.',
    literal: 'Не обманывайся внешностью.',
    meaning: 'Внешность обманчива.',
    ru_equivalent: 'Не всё то золото, что блестит.',
  },
  {
    id: 'p33',
    tr: 'Her koyun kendi bacağından asılır.',
    literal: 'Каждая овца висит за свою ногу.',
    meaning: 'Каждый отвечает за себя сам.',
    ru_equivalent: 'Всяк за себя отвечает.',
  },
  {
    id: 'p34',
    tr: 'Ağzı yanan yoğurdu üfleyerek yer.',
    literal: 'Обжёгший рот и на йогурт дует.',
    meaning: 'Обжёгшись однажды, становишься осторожным во всём.',
    ru_equivalent: 'Обжёгшись на молоке, дуешь на воду.',
  },
  {
    id: 'p35',
    tr: 'Rüzgar eken fırtına biçer.',
    literal: 'Сеющий ветер пожинает бурю.',
    meaning: 'Дурные поступки возвращаются сторицей.',
    ru_equivalent: 'Посеешь ветер — пожнёшь бурю.',
  },
  {
    id: 'p36',
    tr: 'Zararın neresinden dönülse kârdır.',
    literal: 'С какого места убытка ни вернёшься — уже прибыль.',
    meaning: 'Прекратить убыточное дело — уже выгода.',
    ru_equivalent: 'Лучше поздно, чем никогда.',
  },
  {
    id: 'p37',
    tr: 'Emek olmadan yemek olmaz.',
    literal: 'Без труда еды не бывает.',
    meaning: 'Без усилий не будет результата.',
    ru_equivalent: 'Без труда не вынешь рыбку из пруда.',
  },
  {
    id: 'p38',
    tr: 'Vakit nakittir.',
    literal: 'Время — деньги.',
    meaning: 'Время дорого, его нельзя тратить впустую.',
    ru_equivalent: 'Время — деньги.',
  },
  {
    id: 'p39',
    tr: 'Az veren candan, çok veren maldan.',
    literal: 'Кто даёт мало — от души, кто много — от избытка.',
    meaning: 'Ценна не величина дара, а искренность.',
    ru_equivalent: 'Не дорог подарок, дорога любовь.',
  },
  {
    id: 'p40',
    tr: 'Sora sora Bağdat bulunur.',
    literal: 'Спрашивая-спрашивая, и Багдад найдёшь.',
    meaning: 'Не стесняйся спрашивать — так дойдёшь до цели.',
    ru_equivalent: 'Язык до Киева доведёт.',
  },
];
