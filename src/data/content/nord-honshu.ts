import type { RegionContent } from "@/lib/types";

export const nordHonshu: RegionContent = {
  regionId: "nord-honshu",
  startFolio: 256,
  runningTitle: "Le Japon région par région",
  sectionTitle: "Le Nord de Honshu",
  mapTitle: "À la découverte du Nord de Honshu",
  intro: {
    title: "Le Nord de Honshu",
    paragraphs: [
      "Le Tohoku — « l'Est du Nord » — a longtemps été considéré comme les confins du pays : des hivers de neige, des récoltes de riz parfois ruinées par le froid, un dialecte que le reste du Japon comprenait mal. C'est pourtant ici que le poète Basho écrivit, en 1689, *La Sente étroite du Bout-du-Monde*.",
      "Aujourd'hui, les forêts de cèdres, les baies semées de pins et les châteaux de bois offrent un Japon plus lent, loin de la foule, que les trains à grande vitesse mettent à trois heures de Tokyo.",
    ],
    figure: { motif: "pagoda", aspect: 0.55, caption: "Pagode du temple Chuson-ji, Hiraizumi", seed: 0 },
  },
  mapLabels: [
    { text: "Mer du Japon", geo: [139.6, 39.9], kind: "sea" },
    { text: "Océan Pacifique", geo: [141.6, 38.3], kind: "sea" },
    { text: "Morioka", geo: [141.15, 39.7], kind: "place" },
    { text: "Niigata", geo: [139.05, 37.92], kind: "place" },
    { text: "Aomori", geo: [140.74, 40.82], kind: "place" },
  ],
  pois: [
    {
      id: "sendai",
      marker: 1,
      name: "Sendai",
      nameJa: "仙台",
      geo: [140.872, 38.268],
      meta: {
        prefecture: "Préfecture de Miyagi.",
        population: "1 090 000",
        transit: [{ mode: "train", text: "Sendai, Shinkansen Tohoku (1 h 40 depuis Tokyo)." }],
        festival: "Tanabata (6-8 août).",
      },
      body: [
        "Fondée par le seigneur Date Masamune au début du XVII^{e} siècle, Sendai est la « ville des arbres », bordée d'avenues de zelkovas. Son festival de Tanabata, en août, couvre les rues de banderoles de papier multicolores.",
        "On y goûte la langue de bœuf grillée (*gyutan*), spécialité locale, et l'on y visite le mausolée de Date Masamune, le **Zuihoden**, dont les ors et les laques tranchent avec la sobriété habituelle du Nord.",
      ],
      practical: [{ name: "Zuihoden", icon: "temple", hours: "t.l.j.", admission: "paid" }],
    },
    {
      id: "matsushima",
      marker: 2,
      name: "Matsushima",
      nameJa: "松島",
      geo: [141.06, 38.378],
      meta: {
        prefecture: "Préfecture de Miyagi.",
        transit: [{ mode: "train", text: "Matsushima-Kaigan (JR Senseki), 40 mn de Sendai." }],
      },
      body: [
        "Matsushima, avec ses deux cent soixante îlots couverts de pins, compte parmi les « trois plus belles vues du Japon ». Le poète Basho, dit-on, en fut si ému qu'il ne put écrire un seul vers. Des bateaux sillonnent la baie, et l'on se promène au **Zuigan-ji**, temple zen entouré de cèdres.",
      ],
      practical: [
        { name: "Croisières de la baie", icon: "boat", hours: "t.l.j.", admission: "paid" },
        { name: "Zuigan-ji", icon: "temple", hours: "t.l.j.", admission: "paid" },
      ],
    },
    {
      id: "hiraizumi",
      marker: 3,
      name: "Hiraizumi",
      nameJa: "平泉",
      geo: [141.11, 38.99],
      meta: {
        prefecture: "Préfecture d'Iwate.",
        transit: [{ mode: "train", text: "Hiraizumi (JR Tohoku)." }],
      },
      body: [
        "Au XII^{e} siècle, les seigneurs Fujiwara du Nord firent de Hiraizumi une capitale rivale de Kyoto, riche de l'or de leurs mines. Il reste le **Chuson-ji**, dont la **Konjikido**, chapelle recouverte de feuilles d'or, abrite les dépouilles de trois générations de seigneurs.",
        "Basho y composa un haïku célèbre : « Les herbes de l'été — de la gloire des guerriers, les vestiges d'un rêve. »",
      ],
      practical: [{ name: "Chuson-ji", icon: "temple", hours: "t.l.j.", admission: "paid" }],
    },
    {
      id: "hirosaki",
      marker: 4,
      name: "Hirosaki",
      nameJa: "弘前",
      geo: [140.464, 40.603],
      meta: {
        prefecture: "Préfecture d'Aomori.",
        transit: [{ mode: "train", text: "Hirosaki (JR Ou)." }],
        festival: "Sakura Matsuri (fin avr.-début mai), Neputa (1^{er}-7 août).",
      },
      body: [
        "Au pied du mont Iwaki, le château de Hirosaki (1611) est l'un des douze donjons d'origine du pays. Ses fossés sont bordés de cinq mille cerisiers ; au printemps, les pétales couvrent l'eau d'un tapis rose.",
        "En août, le festival Neputa promène dans les rues des lanternes monumentales peintes de guerriers. La ville est aussi la capitale japonaise de la pomme.",
      ],
      practical: [{ name: "Château de Hirosaki", icon: "castle", hours: "t.l.j.", admission: "paid" }],
    },
  ],
  sidebars: [],
  pages: [
    {
      bands: [
        { stacks: [{ span: 3, blocks: [{ t: "intro" }] }] },
        {
          stacks: [
            { span: 1, blocks: [{ t: "poi", id: "sendai" }] },
            { span: 1, blocks: [{ t: "figure", photo: { motif: "sea", aspect: 1.1, caption: "Îlots couverts de pins dans la baie de Matsushima", seed: 2 } }, { t: "poi", id: "matsushima" }] },
            { span: 1, blocks: [{ t: "poi", id: "hiraizumi" }] },
          ],
        },
        {
          stacks: [
            { span: 2, blocks: [{ t: "figure", photo: { motif: "cherry", aspect: 2, caption: "Les douves du château de Hirosaki au printemps", seed: 0 } }] },
            { span: 1, blocks: [{ t: "poi", id: "hirosaki" }] },
          ],
        },
      ],
    },
  ],
};
