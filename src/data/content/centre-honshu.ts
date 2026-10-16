import type { RegionContent } from "@/lib/types";

export const centreHonshu: RegionContent = {
  regionId: "centre-honshu",
  startFolio: 141,
  runningTitle: "Le Japon région par région",
  sectionTitle: "Le Centre de Honshu",
  mapTitle: "À la découverte du Centre de Honshu",
  intro: {
    title: "Le Centre de Honshu",
    paragraphs: [
      "Entre la mer du Japon et l'océan Pacifique, le centre de Honshu est hérissé de montagnes : les Alpes japonaises culminent à plus de trois mille mètres et donnent naissance aux grands fleuves qui irriguent les plaines. Les hivers y sont rudes — la côte nord reçoit parmi les plus fortes chutes de neige du monde habité — et les étés, courts et lumineux.",
      "Ce relief a préservé des villes de caractère, longtemps à l'écart des grands axes : Kanazawa, riche de ses jardins et de ses artisans, Takayama, avec ses maisons de marchands brunies par le temps. Au sud, le mont Fuji, cône parfait de 3 776 m, règne sur l'horizon.",
    ],
    figure: { motif: "gate", aspect: 0.8, cutout: true, caption: "Porte originale du sanctuaire Oyama" },
  },
  mapLabels: [
    { text: "Mer du Japon", geo: [136.9, 37.5], kind: "sea" },
    { text: "Océan Pacifique", geo: [138.4, 34.75], kind: "sea" },
    { text: "Tokyo", geo: [139.69, 35.69], kind: "place" },
    { text: "Nagoya", geo: [136.9, 35.18], kind: "place" },
    { text: "Nagano", geo: [138.19, 36.65], kind: "place" },
    { text: "Alpes japonaises", geo: [137.6, 36.5], kind: "relief" },
    { text: "Péninsule de Noto", geo: [136.9, 37.2], kind: "relief" },
  ],
  pois: [
    {
      id: "kanazawa",
      marker: 16,
      name: "Kanazawa",
      nameJa: "金沢",
      geo: [136.656, 36.561],
      meta: {
        prefecture: "Préfecture d'Ishikawa.",
        population: "450 000",
        transit: [{ mode: "train", text: "Gare JR de Kanazawa, Shinkansen Hokuriku." }],
        info: "Ticket de car à la journée ; location de bicyclettes à la gare.",
      },
      body: [
        "Kanazawa, préservée des influences extérieures par sa situation entre les Alpes japonaises et la mer, témoigne d'une forte identité culturelle. La ville put, en outre, vivre pratiquement en autarcie, grâce à son immense production de riz. En 1583, la région, baptisée Kaga, alors sous le gouvernement égalitaire de l'école bouddhique Ikko, fut transférée sous la sévère autorité des seigneurs Maeda.",
        "Tandis que la plus grande partie du Japon connaissait une grande instabilité, Kaga vécut trois siècles de paix et devint la région la plus riche du pays. Cette aisance favorisa son évolution culturelle : des artistes venus de Tokyo s'y sentirent libres d'élaborer des styles nouveaux, plus frémissants et moins retenus.",
        "**À la découverte du centre de Kanazawa.** La plupart des sites intéressants se trouvent au centre-ville ; on peut acheter un ticket de car pour la journée et louer une bicyclette à la gare. Afin d'éviter la foule, il est préférable de visiter le **Kenroku-en**, l'un des « trois grands jardins » du Japon, tôt le matin ou tard le soir. Créé au milieu du XVII^{e} siècle, il fut ouvert au public en 1871. Son nom signifie « jardin des six qualités » : espace, isolement, intemporalité, ingéniosité, présence d'eau et perspectives. Au bord du lac se dresse une lanterne de pierre à deux piliers (p. 27), baptisée Kotoji, car elle évoque un chevalet de *koto* (instrument à cordes).",
        "Jouxtant le Kenroku-en, l'exquise **villa Seisonkaku**, d'un étage, fut construite en 1863 par Maeda Nariyasu, treizième du nom, pour sa mère. Au rez-de-chaussée, des pièces de réception s'ornent de murs recouverts de poussière d'or, et les *shoji*, portes de papier, sont incrustées de verres colorés hollandais très rares. Le **Kanazawa Castle**, l'un des plus grands châteaux féodaux du Japon, fut presque entièrement détruit par un incendie en 1881 ; la reconstruction partielle du bâtiment et l'aménagement d'un parc se sont poursuivis depuis. Le **sanctuaire Oyama** voisin est dédié à Maeda Toshiie.",
        "Le quartier de samouraïs de **Nagamachi** a gardé des façades de terre. La **Nomura House**, ornée de boiseries magnifiques, de vitres luxueuses et d'un jardin paisible, fournit un aperçu de la vie des seigneurs guerriers. Au **Saihatsuan Kaga Yuzen Silk Center**, un processus de teinture résistante en dix-huit étapes est utilisé sur la soie *yuzen* de Kaga des kimonos de cérémonie. Un « passeport » de deux jours donne accès à quatre musées, dont l'**Ishikawa Prefecture Art Museum** (collection Maeda) et le **Honda Museum**.",
      ],
      practical: [
        { name: "Jardin Kenroku-en", icon: "garden", phone: "(076) 221-5850", hours: "t.l.j.", admission: "paid", note: "gratuit le 3^{e} samedi de chaque mois" },
        { name: "Villa Seisonkaku", icon: "house", phone: "(076) 221-0580", hours: "jeu.-mar.", admission: "paid" },
        { name: "Château Kanazawa", icon: "castle", phone: "(076) 232-3113", hours: "t.l.j.", admission: "paid" },
        { name: "Nomura House", icon: "house", phone: "(076) 221-3553", hours: "t.l.j.", admission: "paid" },
        { name: "Saihatsuan Kaga Yuzen Silk Center", icon: "shop", phone: "(076) 264-2811", hours: "ven.-mer.", admission: "paid" },
        { name: "Crafts Museum", icon: "shop", phone: "(076) 262-2020", hours: "t.l.j.", admission: "paid", note: "avr.-nov. : 3^{e} jeu. du mois ; déc.-mars : jeu." },
        { name: "Art Museum", icon: "museum", phone: "(076) 231-7580", hours: "t.l.j.", admission: "paid" },
        { name: "Honda Museum", icon: "museum", phone: "(076) 261-0500", hours: "t.l.j.", admission: "paid", note: "nov.-fév. : jeu." },
      ],
    },
    {
      id: "takayama",
      marker: 17,
      name: "Takayama",
      nameJa: "高山",
      geo: [137.26, 36.14],
      meta: {
        prefecture: "Préfecture de Gifu.",
        population: "65 000",
        transit: [{ mode: "train", text: "Gare JR de Takayama, ligne Takayama." }],
        festival: "Takayama Matsuri (14-15 avril, 9-10 oct.).",
      },
      body: [
        "Lovée dans une vallée des Alpes japonaises, Takayama est parfois surnommée la « petite Kyoto des Alpes ». Son quartier ancien, **Sanmachi-suji**, aligne des maisons de marchands aux façades de bois sombre, des brasseries de saké signalées par une boule de cèdre suspendue au-dessus de la porte, et des boutiques d'artisans.",
        "Tous les matins, un marché se tient le long de la rivière Miyagawa : légumes de montagne, pickles et fleurs. Le **Takayama Jinya**, ancienne résidence du gouverneur du shogunat, est le seul édifice de ce type à avoir survécu. Deux fois par an, le festival fait défiler d'immenses chars ornés de marionnettes mécaniques.",
      ],
      practical: [
        { name: "Takayama Jinya", icon: "house", hours: "t.l.j.", admission: "paid" },
        { name: "Marché du matin (Miyagawa)", icon: "market", hours: "t.l.j.", admission: "free" },
      ],
    },
    {
      id: "mont-fuji",
      marker: 18,
      name: "Mont Fuji",
      nameJa: "富士山",
      geo: [138.727, 35.361],
      meta: {
        prefecture: "Préfectures de Shizuoka et de Yamanashi.",
        transit: [
          { mode: "train", text: "Kawaguchiko (ligne Fujikyu), depuis Otsuki." },
          { mode: "bus", text: "Cars directs depuis Shinjuku, Tokyo." },
        ],
        info: "Saison d'ascension : début juillet – début septembre.",
      },
      body: [
        "Avec ses 3 776 m, le mont Fuji est le point culminant du pays et l'emblème qu'aucun Japonais ne songerait à contester. Volcan endormi depuis 1707, il est depuis toujours un lieu sacré : des confréries de pèlerins en gravissent les pentes depuis des siècles, vêtues de blanc, au rythme d'un chant. Hokusai en fit le héros de ses *Trente-six vues*.",
        "L'ascension se fait en été, de nuit de préférence, pour assister au lever du soleil depuis le sommet : on part de l'une des « stations » à mi-pente, vers 2 300 m. Les cinq lacs de Fuji, au nord, offrent les plus beaux points de vue sur le cône, surtout par temps clair d'hiver.",
      ],
      practical: [
        { name: "Cinq lacs de Fuji", icon: "mountain", hours: "t.l.j.", admission: "free" },
        { name: "Fuji Subaru Line (route de la 5^{e} station)", icon: "mountain", hours: "juil.-sept.", admission: "paid" },
      ],
    },
  ],
  sidebars: [],
  pages: [
    { bands: [{ stacks: [{ span: 3, blocks: [{ t: "intro" }] }] }] },
    {
      bands: [
        {
          stacks: [
            {
              span: 3,
              blocks: [{ t: "figure", photo: { motif: "street", aspect: 3.4, caption: "Rue bordée de façades de terre à Nagamachi", seed: 1 } }],
            },
          ],
        },
        { stacks: [{ span: 3, blocks: [{ t: "poi", id: "kanazawa" }] }] },
        {
          stacks: [
            {
              span: 2,
              blocks: [{ t: "figure", photo: { motif: "cherry", aspect: 1.5, caption: "Harmonie printanière au jardin Kenroku-en", seed: 0 } }],
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
              span: 2,
              blocks: [
                { t: "figure", photo: { motif: "street", aspect: 2.2, caption: "Maisons de marchands du quartier de Sanmachi-suji, Takayama", seed: 2 } },
                { t: "poi", id: "takayama" },
              ],
            },
            {
              span: 1,
              blocks: [
                { t: "figure", photo: { motif: "mountain", aspect: 0.8, caption: "Le mont Fuji, au-dessus d'un temple de Kawaguchiko", seed: 0 } },
                { t: "poi", id: "mont-fuji" },
              ],
            },
          ],
        },
      ],
    },
  ],
};
