export interface Twister {
  id: string;
  tr: string;
  ru: string; // о чём это (приблизительный смысл)
  transcription: string; // русская транскрипция для чтения
  difficulty: 1 | 2 | 3;
}

export const TWISTERS: Twister[] = [
  {
    id: 't1',
    tr: 'Bir berber bir berbere “Bir berber gel beraber bir berber dükkanı açalım” demiş.',
    ru: 'Один брадобрей сказал другому: «Давай вместе откроем парикмахерскую».',
    transcription:
      'Бир бербер бир бербере «бир бербер гель берабер бир бербер дюккяны ачалым» демиш.',
    difficulty: 3,
  },
  {
    id: 't2',
    tr: 'Şu köşe yaz köşesi, şu köşe kış köşesi, ortada su şişesi.',
    ru: 'Этот угол — летний, тот угол — зимний, посередине бутылка воды.',
    transcription: 'Шу кёше яз кёшеси, шу кёше кыш кёшеси, ортада су шишеси.',
    difficulty: 2,
  },
  {
    id: 't3',
    tr: 'Kartal kalkar dal sarkar, dal sarkar kartal kalkar.',
    ru: 'Орёл взлетает — ветка провисает, ветка провисает — орёл взлетает.',
    transcription: 'Картал калкар дал саркар, дал саркар картал калкар.',
    difficulty: 2,
  },
  {
    id: 't4',
    tr: 'Dört deryanın deresini dört dördüncü derede gördüler.',
    ru: 'Ручьи четырёх морей увидели в четвёртом-четвёртом ручье.',
    transcription: 'Дёрт дерьянын дересини дёрт дёрдюнджю дереде гёрдюлер.',
    difficulty: 3,
  },
  {
    id: 't5',
    tr: 'Al şu takatukaları, takatukacıya götür.',
    ru: 'Возьми эти стучалки и отнеси мастеру-стучальщику.',
    transcription: 'Ал шу такатукалары, такатукаджыя гётюр.',
    difficulty: 2,
  },
  {
    id: 't6',
    tr: 'Bu yoğurdu sarımsaklasak da mı saklasak, sarımsaklamasak da mı saklasak?',
    ru: 'Этот йогурт с чесноком хранить или без чеснока хранить?',
    transcription: 'Бу йоурду сарымсакласак да мы сакласак, сарымсакламасак да мы сакласак?',
    difficulty: 3,
  },
  {
    id: 't7',
    tr: 'Keskin sirke küpüne zarar.',
    ru: 'Острый уксус вредит своей же бочке. (о вспыльчивости)',
    transcription: 'Кескин сирке кюпюне зарар.',
    difficulty: 1,
  },
  {
    id: 't8',
    tr: 'Kırk küp, kırkının da kulpu kırık küp.',
    ru: 'Сорок кувшинов, и у всех сорока ручки отбиты.',
    transcription: 'Кырк кюп, кыркынын да кулпу кырык кюп.',
    difficulty: 3,
  },
  {
    id: 't9',
    tr: 'Bir pirinci birinci buhara birinci pirinç diye sattı.',
    ru: 'Одну рисинку первому купцу продал как рис первого сорта.',
    transcription: 'Бир пиринджи биринджи бухара биринджи пиринч дийе сатты.',
    difficulty: 3,
  },
  {
    id: 't10',
    tr: 'Ürünü üründür, üründür ürünü.',
    ru: 'Продукт есть продукт. (скороговорка на звук ü)',
    transcription: 'Юрюню юрюндюр, юрюндюр юрюню.',
    difficulty: 2,
  },
  {
    id: 't11',
    tr: 'Şemsipaşa Pasajı’nda sesi büzüşesiceler.',
    ru: 'В пассаже Шемси-паши те, у кого сядет голос.',
    transcription: 'Шемсипаша пасажында сеси бюзюшесиджелер.',
    difficulty: 3,
  },
  {
    id: 't12',
    tr: 'İt iti itti, bit iti itti; it biti itti, bit iti itti.',
    ru: 'Пёс толкнул пса, блоха толкнула пса; пёс толкнул блоху…',
    transcription: 'Ит ити итти, бит ити итти; ит бити итти, бит ити итти.',
    difficulty: 2,
  },
];
