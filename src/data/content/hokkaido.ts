import type { RegionContent } from "@/lib/types";

export const hokkaido: RegionContent = {
  regionId: "hokkaido",
  startFolio: 276,
  runningTitle: "Le Japon région par région",
  sectionTitle: "Hokkaido",
  mapTitle: "À la découverte de Hokkaido",
  intro: {
    title: "Hokkaido",
    paragraphs: [
      "Colonisée tardivement, à partir de 1869, la grande île du Nord garde un esprit de frontière : espaces immenses, villes tracées au cordeau, élevages laitiers et champs de lavande. Les Aïnous, premiers habitants de l'île, y ont laissé leur nom — Hokkaido signifie « route de la mer du Nord » — et une culture que l'on redécouvre.",
      "L'hiver, long et neigeux, attire skieurs et amateurs de sources chaudes ; l'été, doux et sec, est la meilleure saison pour randonner dans les parcs nationaux.",
    ],
    figure: { motif: "snow", aspect: 0.55, caption: "Furano, station de ski au cœur de l'île", wiki: "furano", seed: 0 },
  },
  mapLabels: [
    { text: "Mer du Japon", geo: [140.1, 43.7], kind: "sea" },
    { text: "Mer d'Okhotsk", geo: [143.9, 44.35], kind: "sea" },
    { text: "Océan Pacifique", geo: [143.0, 42.0], kind: "sea" },
    { text: "Asahikawa", geo: [142.37, 43.77], kind: "place" },
    { text: "Kushiro", geo: [144.38, 42.98], kind: "place" },
  ],
  pois: [
    {
      id: "sapporo",
      marker: 1,
      name: "Sapporo",
      nameJa: "札幌",
      geo: [141.354, 43.062],
      meta: {
        prefecture: "Sous-préfecture d'Ishikari.",
        population: "1 950 000",
        transit: [
          { mode: "plane", text: "Aéroport de New Chitose, à 40 mn." },
          { mode: "train", text: "Gare de Sapporo, JR." },
        ],
        festival: "Yuki Matsuri (festival de la neige, début février).",
      },
      body: [
        "Capitale de l'île, Sapporo a été bâtie en damier sur le modèle des villes américaines, autour du parc **Odori**. Chaque février, le festival de la neige y dresse des sculptures de glace monumentales ; en été, les terrasses de bière de la brasserie Sapporo s'installent sous les arbres.",
        "On y mange du *ramen* au miso, de l'agneau grillé en *jingisukan* et des crabes énormes, dans les ruelles de **Susukino**.",
      ],
      practical: [
        { name: "Parc Odori", icon: "park", hours: "t.l.j.", admission: "free" },
        { name: "Musée de la bière de Sapporo", icon: "museum", hours: "mar.-dim.", admission: "free" },
      ],
    },
    {
      id: "hakodate",
      marker: 2,
      name: "Hakodate",
      nameJa: "函館",
      geo: [140.729, 41.769],
      meta: {
        prefecture: "Sous-préfecture de Oshima.",
        transit: [{ mode: "train", text: "Hakodate, JR (Shinkansen Hokkaido)." }],
      },
      body: [
        "L'un des premiers ports japonais ouverts aux étrangers, en 1854, Hakodate a conservé églises, consulats et maisons de style occidental sur les pentes du mont Hakodate. Du sommet, que l'on atteint en téléphérique, la vue de nuit sur l'isthme, entre deux baies, passe pour l'une des plus belles du pays.",
        "Au marché du matin, on choisit son calmar vivant dans un bassin pour le manger en sashimi.",
      ],
      practical: [
        { name: "Téléphérique du mont Hakodate", icon: "cable", hours: "t.l.j.", admission: "paid" },
        { name: "Marché du matin", icon: "market", hours: "t.l.j.", admission: "free" },
      ],
    },
    {
      id: "shiretoko",
      marker: 3,
      name: "Péninsule de Shiretoko",
      nameJa: "知床半島",
      geo: [145.1, 44.07],
      meta: {
        prefecture: "Sous-préfecture d'Okhotsk.",
        transit: [{ mode: "bus", text: "Bus depuis Shari, puis croisières depuis Utoro." }],
        info: "Patrimoine mondial depuis 2005.",
      },
      body: [
        "Shiretoko signifie, en langue aïnoue, « le bout de la terre ». Cette étroite péninsule de montagnes volcaniques, où ne mènent ni route ni voie ferrée jusqu'à l'extrémité, abrite l'une des plus fortes densités d'ours bruns du monde.",
        "Les **cinq lacs de Shiretoko** se parcourent sur des passerelles surélevées ; en hiver, la banquise dérivante venue de Sibérie apporte son lot de phoques, de pygargues et de visiteurs en chaussures de neige.",
      ],
      practical: [
        { name: "Cinq lacs de Shiretoko", icon: "mountain", hours: "mai-oct.", admission: "paid" },
        { name: "Croisières d'Utoro", icon: "boat", hours: "avr.-oct.", admission: "paid" },
      ],
    },
  ],
  sidebars: [],
  pages: [
    {
      bands: [
        { stacks: [{ span: 3, blocks: [{ t: "intro" }] }] },
        {
          stacks: [
            { span: 1, blocks: [{ t: "poi", id: "sapporo" }] },
            { span: 1, blocks: [{ t: "figure", photo: { motif: "harbor", aspect: 1.1, caption: "Le port de Hakodate, avec ses entrepôts de briques", wiki: "hakodate-mountain", seed: 2 } }, { t: "poi", id: "hakodate" }] },
            { span: 1, blocks: [{ t: "poi", id: "shiretoko" }] },
          ],
        },
        {
          stacks: [{ span: 3, blocks: [{ t: "figure", photo: { motif: "mountain", aspect: 3.2, caption: "Sentier dans la péninsule de Shiretoko", wiki: "shiretoko", seed: 1 } }] }],
        },
      ],
    },
  ],
};
