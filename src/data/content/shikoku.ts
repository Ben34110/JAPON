import type { RegionContent } from "@/lib/types";

export const shikoku: RegionContent = {
  regionId: "shikoku",
  startFolio: 217,
  runningTitle: "Le Japon région par région",
  sectionTitle: "Shikoku",
  mapTitle: "À la découverte de Shikoku",
  intro: {
    title: "Shikoku",
    paragraphs: [
      "La mer Intérieure a longtemps isolé la quatrième grande île du Japon de l'écart du circuit touristique, de la croissance démographique et de l'occidentalisation. Toujours reliée à Honshu — trois ponts monumentaux en sont désormais la preuve —, Shikoku offre un aperçu nostalgique de villages de pêcheurs, de fermiers et de rizières.",
      "Les vestiges de la fin du paléolithique et les *kofun* (tumuli) du III^{e} siècle témoignent d'une présence humaine très ancienne ; le site de Dogo Onsen est mentionné dans le *Kojiki*, la plus ancienne chronique du pays, écrite en 712. Pourtant l'île est restée en marge de l'histoire.",
      "Son personnage le plus célèbre, Kukai, naquit dans une famille d'aristocrates démunis, en 774. Ce prêtre bouddhiste, considéré comme le père de la culture japonaise, visita en un unique pèlerinage quatre-vingt-huit temples de la région ; des milliers de fidèles reproduisent encore aujourd'hui son parcours, vêtus de blanc, un bâton à la main.",
      "L'île vit aujourd'hui de l'agriculture, des industries mécaniques et chimiques et de la pêche. Si les constructions ont altéré une grande partie des côtes nippones, le littoral de Shikoku reste pratiquement intact.",
    ],
    figure: { motif: "pilgrim", aspect: 0.5, cutout: true, caption: "Statue de Jizo, pèlerinage des 88 temples" },
    wide: { motif: "castle", aspect: 1.9, caption: "Matsuyama Castle, bâti en 1603, détruit par la foudre, puis reconstruit en 1835", seed: 2 },
  },
  mapLabels: [
    { text: "Mer Intérieure", geo: [133.6, 34.25], kind: "sea" },
    { text: "Océan Pacifique", geo: [133.5, 32.55], kind: "sea" },
    { text: "Hiroshima", geo: [132.45, 34.39], kind: "place" },
    { text: "Okayama", geo: [133.92, 34.66], kind: "place" },
    { text: "Matsuyama", geo: [132.77, 33.84], kind: "place" },
    { text: "Kochi", geo: [133.53, 33.56], kind: "place" },
    { text: "Cap Muroto", geo: [134.18, 33.25], kind: "place" },
    { text: "Montagnes Ishizuchi", geo: [133.1, 33.75], kind: "relief" },
    { text: "Montagnes Tsurugi", geo: [134.0, 33.85], kind: "relief" },
  ],
  pois: [
    {
      id: "mer-interieure",
      marker: 1,
      name: "La mer Intérieure",
      nameJa: "瀬戸内海",
      geo: [133.55, 34.2],
      meta: {
        transit: [{ mode: "boat", text: "Croisières depuis Hiroshima (082) 263-6822." }],
        info: "Setonaikai-kisen (croisières en mer Intérieure) (082) 253-1212.",
      },
      body: [
        "La mer Intérieure, magnifique étendue d'eau, n'est pas fermée, mais sa surface calme, constellée de plus de trois mille îlots couverts de pins, donne l'impression d'un lac. Donald Richie, auteur d'un récit de voyage classique, *The Inland Sea* (1971), décrit un parcours en bateau vers l'ouest, le long d'un défilé étroit : « À gauche, se dressent les montagnes de Shikoku, si surprenantes qu'elles semblent appartenir à un autre pays. »",
        "Des ponts, des ferries locaux et des bateaux de croisière permettent d'accéder à quelque 750 îles habitées, abritant des villages de pêcheurs. On visite surtout **Awaji**, l'île la plus vaste, **Setoda**, **Omi** et **Shodo**, merveilleuse terre verte ornée de bois d'orangers et d'oliveraies, entourée d'une eau scintillante qui évoque la Méditerranée.",
      ],
    },
    {
      id: "takamatsu",
      marker: 2,
      name: "Takamatsu",
      nameJa: "高松",
      geo: [134.046, 34.34],
      meta: {
        prefecture: "Préfecture de Kagawa.",
        population: "330 000",
        transit: [{ mode: "train", text: "À la gare JR (087) 851-2009." }],
        festival: "Takamatsu Matsuri (12-14 août).",
        web: "www.takamatsu-nct.ac.jp",
      },
      body: [
        "Capitale de la préfecture de Kagawa, située sur la mer Intérieure, Takamatsu est la ville qui relie Shikoku au monde extérieur ; cet ensemble de petites boutiques et de sites historiques a conservé un charme local. L'expansion de la cité débuta avec l'érection du **Takamatsu Castle** par Ikoma Chikamasa, en 1588, dont il reste quelques vestiges.",
        "Lorsque les shoguns Tokugawa prirent le pouvoir, en 1600, ils attribuèrent la ville et les fiefs environnants à des membres de leur famille, le clan Matsudaira. Ces derniers consacrèrent un siècle à élaborer un jardin paysager orné de six étangs et de treize collines artificielles : le **Ritsurin Park**, l'un des plus célèbres du pays.",
        "La situation de Takamatsu, port d'accès à Shikoku, en fit le théâtre de batailles historiques telles que celle qui opposa, en 1185, les clans Taira et Minamoto. Le **Wax Museum of the Tale of the Heike** propose une reconstitution de l'événement.",
      ],
      practical: [
        { name: "Wax Museum", icon: "museum", phone: "(087) 823-8400", hours: "t.l.j.", admission: "paid" },
        {
          name: "Shikoku Mura",
          icon: "house",
          phone: "(087) 843-3111",
          transit: "Kotoden Yashima",
          hours: "t.l.j.",
          admission: "paid",
          note: "aux environs : sur le plateau volcanique de Yashima, village où des maisons exposent l'artisanat de Shikoku",
        },
      ],
    },
    {
      id: "kotohira",
      marker: 3,
      name: "Kotohira",
      nameJa: "琴平",
      geo: [133.82, 34.19],
      meta: {
        prefecture: "Préfecture de Kagawa.",
        population: "12 000",
        transit: [{ mode: "train", text: "À 2 mn de la gare (0877) 75-3500." }],
        festival: "Kotohira-gu Reitaisai (Grand Festival, 9-11 oct.).",
      },
      body: [
        "Kotohira, à laquelle on accède soit par la Kotoden, au charme désuet, soit par la ligne JR au départ de Takamatsu, abrite le **Kotohira-gu**, célèbre sanctuaire affectueusement surnommé **Kompira-san**, gardien spirituel des marins. Lieu de pèlerinage depuis des siècles, il protège les pêcheurs et les navigateurs ; il reçoit quatre millions de personnes par an.",
        "L'ascension, à pied ou en palanquin, compte 785 marches jusqu'au sanctuaire principal, 1 368 jusqu'au sanctuaire intérieur. Chemin faisant, on croise des boutiques de souvenirs, des lanternes de pierre et des offrandes de marins.",
        "L'**Omote Shoin** et l'**Oku Shoin** voisines s'ornent de célèbres peintures exécutées par Maruyama Okyo : la première représente des tigres, la seconde l'énergie du zen. La ville abrite également le **Kanamaru-za**, théâtre de kabuki en bois.",
      ],
      practical: [
        { name: "Kotohira-gu", icon: "temple", hours: "t.l.j.", admission: "free", note: "785 marches jusqu'au sanctuaire principal" },
        { name: "Kanamaru-za", icon: "museum", hours: "t.l.j.", admission: "paid" },
      ],
    },
    {
      id: "naruto",
      marker: 4,
      name: "Tourbillons de Naruto",
      nameJa: "鳴門の渦潮",
      geo: [134.61, 34.23],
      meta: {
        prefecture: "Préfecture de Tokushima.",
        transit: [
          { mode: "train", text: "Naruto, puis car jusqu'au parc." },
          { mode: "boat", text: "Gare de ferry d'Uzushio (088) 687-0613 ; tour en bateau (088) 687-0101." },
        ],
      },
      body: [
        "À l'endroit où la pointe d'Awaji touche presque Shikoku — endroit cerné par la baie d'Osaka, la mer Intérieure, Honshu, Shikoku et l'océan Pacifique —, les disparités des marées de ces eaux induisent des courants et des tourbillons puissants de 20 km/h. La navigation sur les vagues de ce détroit long de plus d'un kilomètre fait partie des traditions de Shikoku depuis un millénaire.",
        "Les bateaux de tourisme s'approchent des tourbillons, qui sont à leur plus spectaculaire autour des grandes marées, au printemps et en automne. Depuis le pont suspendu d'Onaruto (1985), une passerelle vitrée, l'*Uzu-no-michi*, permet de les contempler d'en haut. À l'extrémité du pont côté Awaji, l'**Onarutokyo Memorial Hall** abrite une exposition consacrée à l'*Awaji ningyo joruri*, variante locale du *bunraku*.",
      ],
      practical: [
        { name: "Onarutokyo Memorial Hall", icon: "museum", phone: "(0799) 52-2888", hours: "t.l.j.", admission: "paid" },
      ],
    },
    {
      id: "tokushima",
      marker: 5,
      name: "Tokushima",
      nameJa: "徳島",
      geo: [134.56, 34.07],
      meta: {
        prefecture: "Préfecture de Tokushima.",
        population: "260 000",
        transit: [{ mode: "train", text: "À la gare JR (088) 621-5232." }],
        festival: "Awa-Odori (danses Awa, 12-15 août).",
      },
      body: [
        "Tokushima, ville par laquelle on accède à Shikoku lorsqu'on arrive du Kansai, région de Honshu, est également le point d'arrivée traditionnel des pèlerins qui suivent la trace de Kukai (p. 222-223). Awa, ancienne province, prête son nom au festival **Awa-Odori**, qui se déroule en août et fait l'objet d'une retransmission nationale.",
        "Aux environs de Tokushima, la superbe côte d'**Anan**, au sud, est réputée pour ses villages de pêcheurs, ses plages, ses tortues de mer qui reviennent pondre et faire éclore leurs œufs entre les mois de juin et d'août.",
      ],
    },
    {
      id: "matsuyama",
      marker: 7,
      name: "Matsuyama",
      nameJa: "松山",
      geo: [132.77, 33.84],
      meta: {
        prefecture: "Préfecture d'Ehime.",
        population: "460 000",
        transit: [
          { mode: "plane", text: "Aéroport de Matsuyama." },
          { mode: "train", text: "Gare JR de Matsuyama." },
        ],
      },
      body: [
        "Plus grande ville de l'île, Matsuyama est dominée par son **château**, bâti en 1603, détruit par la foudre, puis reconstruit en 1835 : l'un des rares donjons authentiques du pays, que l'on atteint à pied ou en télésiège.",
        "À l'est de la ville, le **Dogo Onsen**, dont l'établissement de bains en bois est un monument, passe pour la plus ancienne source chaude du Japon. On s'y baigne en yukata, avant de boire un thé dans la salle de repos du premier étage.",
      ],
      practical: [
        { name: "Matsuyama Castle", icon: "castle", hours: "t.l.j.", admission: "paid" },
        { name: "Dogo Onsen Honkan", icon: "onsen", hours: "t.l.j.", admission: "paid" },
      ],
    },
  ],
  sidebars: [
    {
      id: "awa-odori",
      title: "Les Awa-Odori",
      italic: true,
      paragraphs: [
        "O-Bon, festival des Morts, célébré à Tokushima du 12 au 15 août, est la célébration la plus animée du Japon. Les danses particulières, appelées Awa-Odori, accueillent l'arrivée annuelle des esprits des ancêtres sur la terre des vivants. Surnommée « danse des fous », en raison du refrain qui dit : « Que ne danse ou ne danse-t-on, c'est idiot de ne pas danser ! », cette danse était à l'origine un hommage à l'alcool de riz (le saké) distribué aux citadins de Tokushima lors de l'achèvement d'un château.",
      ],
      figure: { motif: "festival", aspect: 0.78, caption: "Danseuses d'Awa-Odori, Tokushima", seed: 0 },
    },
  ],
  pages: [
    {
      bands: [{ stacks: [{ span: 3, blocks: [{ t: "intro" }] }] }],
    },
    {
      bands: [
        {
          stacks: [
            {
              span: 3,
              blocks: [{ t: "figure", photo: { motif: "sea", aspect: 2.6, caption: "Îles de la mer Intérieure, qui sépare Shikoku de Honshu et de Kyushu", seed: 2 } }],
            },
          ],
        },
        {
          stacks: [
            { span: 1, blocks: [{ t: "poi", id: "mer-interieure" }] },
            { span: 1, blocks: [{ t: "poi", id: "takamatsu" }] },
            { span: 1, blocks: [{ t: "poi", id: "kotohira" }] },
          ],
        },
        {
          stacks: [
            {
              span: 2,
              blocks: [{ t: "figure", photo: { motif: "garden", aspect: 2.1, caption: "Le pont du Ritsurin Park s'intègre dans la composition du paysage", seed: 0 } }],
            },
          ],
        },
      ],
    },
    {
      bands: [
        {
          stacks: [
            {
              span: 1,
              blocks: [
                { t: "figure", photo: { motif: "market", aspect: 1.2, caption: "Ascension en palanquin des marches menant au Kompira-san", seed: 1 } },
              ],
            },
            { span: 2, blocks: [{ t: "sidebar", id: "awa-odori" }] },
          ],
        },
        {
          stacks: [
            {
              span: 1,
              blocks: [
                { t: "poi", id: "naruto" },
                { t: "figure", photo: { motif: "bridge", aspect: 0.8, caption: "Pont suspendu achevé en 1985, Naruto", seed: 0 } },
              ],
            },
            { span: 1, blocks: [{ t: "poi", id: "tokushima" }] },
            {
              span: 1,
              blocks: [{ t: "figure", photo: { motif: "market", aspect: 0.85, caption: "Salle d'offrandes votives du Kompira-san", seed: 2 } }],
            },
          ],
        },
      ],
    },
    {
      bands: [
        {
          stacks: [
            { span: 2, blocks: [{ t: "poi", id: "matsuyama" }] },
            { span: 1, blocks: [{ t: "figure", photo: { motif: "castle", aspect: 0.9, caption: "Matsuyama Castle, bâti en 1603, reconstruit en 1835", seed: 2 } }] },
          ],
        },
      ],
    },
  ],
};
