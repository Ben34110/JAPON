import type { Region, RegionId } from "@/lib/types";

/**
 * Code couleur des chapitres (rabat « Visite mode d'emploi ») et pagination du guide.
 * Les textes de présentation sont rédigés pour le prototype, dans le ton du guide.
 */
export const REGIONS: Region[] = [
  {
    id: "tokyo",
    name: "Tokyo",
    nameJa: "東京",
    color: "#E60012",
    onColor: "#ffffff",
    pages: [58, 117],
    summary:
      "Capitale tentaculaire où les gratte-ciel côtoient les sanctuaires. Le guide la découpe en trois secteurs — centre, nord et ouest — puis la détaille quartier par quartier, plans à l'appui.",
    highlights: ["Ueno et Yanaka", "Le marché d'Ameyoko", "Asakusa"],
    photo: { motif: "skyline", aspect: 0.62, seed: 1 },
    mapKind: "plan",
  },
  {
    id: "centre-honshu",
    name: "Le Centre de Honshu",
    nameJa: "本州中部",
    color: "#1E88E5",
    onColor: "#ffffff",
    pages: [122, 147],
    summary:
      "Entre les Alpes japonaises et la mer du Japon, des villes de caractère — Kanazawa, Takayama — et le mont Fuji, dont le cône parfait domine l'horizon.",
    highlights: ["Kanazawa et le Kenroku-en", "Takayama", "Le mont Fuji"],
    photo: { motif: "garden", aspect: 0.62, seed: 2 },
    mapKind: "geo",
  },
  {
    id: "kyoto",
    name: "Kyoto",
    nameJa: "京都",
    color: "#FBC02D",
    onColor: "#111111",
    pages: [148, 179],
    summary:
      "Capitale impériale pendant plus de mille ans, Kyoto concentre temples, jardins et quartiers de geishas. Les portiques rouges du Fushimi Inari en sont l'image la plus célèbre.",
    highlights: ["Fushimi Inari", "Kinkaku-ji", "Gion"],
    photo: { motif: "torii", aspect: 0.62, seed: 3 },
    mapKind: "plan",
  },
  {
    id: "ouest-honshu",
    name: "L'Ouest de Honshu",
    nameJa: "本州西部",
    color: "#2E7D32",
    onColor: "#ffffff",
    pages: [180, 213],
    summary:
      "D'Osaka la marchande à Nara la sacrée, du château d'Himeji au parc de la Paix d'Hiroshima : la région la plus riche en patrimoine, où se joue une grande part de l'histoire du pays.",
    highlights: ["Nara et le Todai-ji", "Le château d'Himeji", "Hiroshima et Miyajima"],
    photo: { motif: "pagoda", aspect: 0.62, seed: 4 },
    mapKind: "geo",
  },
  {
    id: "shikoku",
    name: "Shikoku",
    nameJa: "四国",
    color: "#FB8C00",
    onColor: "#111111",
    pages: [214, 223],
    summary:
      "La plus petite des quatre grandes îles, longtemps isolée par la mer Intérieure. Villages de pêcheurs, jardins, tourbillons de Naruto et pèlerinage des quatre-vingt-huit temples.",
    highlights: ["La mer Intérieure", "Takamatsu et Kotohira", "Les tourbillons de Naruto"],
    photo: { motif: "garden", aspect: 0.62, seed: 5 },
    mapKind: "geo",
  },
  {
    id: "kyushu",
    name: "Kyushu",
    nameJa: "九州",
    color: "#E91E63",
    onColor: "#ffffff",
    pages: [224, 243],
    summary:
      "Île volcanique et fenêtre historique sur l'étranger : Nagasaki, port ouvert aux Portugais et aux Hollandais, le château de Kumamoto et la plus vaste caldeira du monde, au mont Aso.",
    highlights: ["Nagasaki", "Le château de Kumamoto", "Le mont Aso"],
    photo: { motif: "harbor", aspect: 0.62, seed: 6 },
    mapKind: "geo",
  },
  {
    id: "okinawa",
    name: "Okinawa",
    nameJa: "沖縄",
    color: "#FF7043",
    onColor: "#111111",
    pages: [244, 253],
    summary:
      "Archipel subtropical aux eaux turquoise, ancien royaume de Ryukyu à la culture singulière : château de Shuri, récifs coralliens et cuisine insulaire.",
    highlights: ["Naha et le château de Shuri", "Les récifs coralliens", "Le royaume de Ryukyu"],
    photo: { motif: "reef", aspect: 0.62, seed: 7 },
    mapKind: "geo",
  },
  {
    id: "nord-honshu",
    name: "Le Nord de Honshu",
    nameJa: "本州北部",
    color: "#8E24AA",
    onColor: "#ffffff",
    pages: [254, 273],
    summary:
      "Le Tohoku, pays de forêts, de baies et de neige. Temples enfouis dans les cèdres, îlots couverts de pins de Matsushima, châteaux de bois du Nord.",
    highlights: ["Matsushima", "Hiraizumi", "Hirosaki"],
    photo: { motif: "pagoda", aspect: 0.62, seed: 8 },
    mapKind: "geo",
  },
  {
    id: "hokkaido",
    name: "Hokkaido",
    nameJa: "北海道",
    color: "#3949AB",
    onColor: "#ffffff",
    pages: [274, 285],
    summary:
      "La grande île du Nord, colonisée tardivement : espaces sauvages, volcans, festival de la neige de Sapporo et péninsule de Shiretoko, inscrite au patrimoine mondial.",
    highlights: ["Sapporo", "Hakodate", "La péninsule de Shiretoko"],
    photo: { motif: "mountain", aspect: 0.62, seed: 9 },
    mapKind: "geo",
  },
];

export const REGION_BY_ID = Object.fromEntries(REGIONS.map((r) => [r.id, r])) as Record<RegionId, Region>;

/** Autres rubriques du rabat (non cliquables dans le prototype). */
export const FLAP_EXTRAS = [
  {
    group: "Les bonnes adresses",
    items: [
      { name: "Hébergement", pages: [288, 307], color: "#B79A72" },
      { name: "Restaurants", pages: [308, 339], color: "#9FB5D1" },
    ],
  },
  {
    group: "Renseignements pratiques",
    items: [
      { name: "Le Japon mode d'emploi", pages: [360, 377], color: "#111111" },
      { name: "Aller au Japon et y circuler", pages: [378, 385], color: "#111111" },
      { name: "Index et lexique", pages: [386, 408], color: "#F2A33A" },
    ],
  },
] as const;

/** Sous-chapitres de Tokyo (carte d'ensemble du guide). */
export const TOKYO_PARTS = [
  { name: "Le Centre de Tokyo", pages: [60, 71] },
  { name: "Le Nord de Tokyo", pages: [72, 83] },
  { name: "L'Ouest de Tokyo", pages: [84, 95] },
] as const;

export const pagesLabel = (r: { pages: readonly [number, number] }) =>
  `Pages ${r.pages[0]}-${r.pages[1]}`;
