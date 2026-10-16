import type { RegionContent } from "@/lib/types";

export const ouestHonshu: RegionContent = {
  regionId: "ouest-honshu",
  startFolio: 182,
  runningTitle: "Le Japon région par région",
  sectionTitle: "L'Ouest de Honshu",
  mapTitle: "À la découverte de l'Ouest de Honshu",
  intro: {
    title: "L'Ouest de Honshu",
    paragraphs: [
      "De la baie d'Osaka aux rivages de la mer Intérieure, l'ouest de Honshu fut le berceau de l'État japonais. Nara, première capitale permanente, Himeji et son château blanc, Hiroshima et la mémoire de 1945 : peu de régions concentrent autant d'histoire sur si peu de distance.",
      "Osaka, la ville des marchands, y fait contrepoint avec son appétit légendaire — « manger jusqu'à la ruine », dit le proverbe — et son humour.",
    ],
    figure: { motif: "pagoda", aspect: 0.55, caption: "Pagode du Yakushi-ji, Nara", seed: 1 },
  },
  mapLabels: [
    { text: "Mer du Japon", geo: [133.3, 36.0], kind: "sea" },
    { text: "Mer Intérieure", geo: [133.2, 34.15], kind: "sea" },
    { text: "Kyoto", geo: [135.77, 35.0], kind: "place" },
    { text: "Kobe", geo: [135.2, 34.69], kind: "place" },
    { text: "Okayama", geo: [133.92, 34.66], kind: "place" },
    { text: "Péninsule de Kii", geo: [135.6, 33.9], kind: "relief" },
  ],
  pois: [
    {
      id: "osaka",
      marker: 1,
      name: "Osaka",
      nameJa: "大阪",
      geo: [135.502, 34.693],
      meta: {
        prefecture: "Préfecture d'Osaka.",
        population: "2 700 000",
        transit: [
          { mode: "train", text: "Shin-Osaka (Shinkansen) ; Osaka, JR." },
          { mode: "plane", text: "Aéroport international du Kansai." },
        ],
        festival: "Tenjin Matsuri (24-25 juillet).",
      },
      body: [
        "Troisième ville du pays, Osaka est la cité des marchands, qui sut se faire respecter des guerriers par sa richesse. Son quartier de **Dotonbori**, éclairé de mille néons, est le temple de la gourmandise : *takoyaki* (boulettes de poulpe), *okonomiyaki* (crêpes salées) et *kushikatsu* en brochettes.",
        "Le **château d'Osaka**, bâti par Toyotomi Hideyoshi en 1583, domine un grand parc. Le donjon actuel, reconstruit en 1931, abrite un musée consacré à la vie de son fondateur.",
      ],
      practical: [
        { name: "Château d'Osaka", icon: "castle", hours: "t.l.j.", admission: "paid" },
        { name: "Dotonbori", icon: "market", hours: "t.l.j.", admission: "free" },
      ],
    },
    {
      id: "nara",
      marker: 2,
      name: "Nara",
      nameJa: "奈良",
      geo: [135.805, 34.685],
      meta: {
        prefecture: "Préfecture de Nara.",
        population: "360 000",
        transit: [{ mode: "train", text: "Gare JR de Nara, ligne Nara ; Kintetsu-Nara." }],
      },
      body: [
        "Première capitale fixe du pays (710-784), Nara a gardé un parc où paissent plus d'un millier de cerfs sacrés, devenus les mascottes de la ville. Le **Todai-ji**, bâti au VIII^{e} siècle, abrite l'un des plus grands bouddhas de bronze du monde, assis dans le plus vaste bâtiment de bois du globe.",
        "Plus loin, le sanctuaire **Kasuga Taisha** est bordé de milliers de lanternes de pierre et de bronze, allumées deux fois par an. Le **Horyu-ji**, à quelques kilomètres, passe pour le plus ancien ensemble d'édifices de bois du monde.",
      ],
      practical: [
        { name: "Todai-ji", icon: "temple", hours: "t.l.j.", admission: "paid" },
        { name: "Kasuga Taisha", icon: "temple", hours: "t.l.j.", admission: "paid" },
      ],
    },
    {
      id: "himeji",
      marker: 3,
      name: "Himeji",
      nameJa: "姫路",
      geo: [134.694, 34.839],
      meta: {
        prefecture: "Préfecture de Hyogo.",
        transit: [{ mode: "train", text: "Himeji, Shinkansen Sanyo." }],
      },
      body: [
        "Surnommé le « héron blanc » pour son crépi éclatant et ses toits qui évoquent un oiseau prenant son envol, le **château d'Himeji** (1609) est le plus beau donjon d'origine du Japon. Sa construction, d'une complexité de labyrinthe, déroute les assaillants : portes dissimulées, chemins en spirale, meurtrières ouvertes pour les arquebuses.",
        "Il fut épargné par les guerres, les séismes et les bombardements, et inscrit au patrimoine mondial en 1993. À son pied, le jardin **Koko-en** en recrée neuf styles différents.",
      ],
      practical: [
        { name: "Château d'Himeji", icon: "castle", hours: "t.l.j.", admission: "paid", note: "dern. adm. 1 h avant la fermeture" },
      ],
    },
    {
      id: "hiroshima",
      marker: 4,
      name: "Hiroshima",
      nameJa: "広島",
      geo: [132.455, 34.385],
      meta: {
        prefecture: "Préfecture de Hiroshima.",
        population: "1 190 000",
        transit: [{ mode: "train", text: "Hiroshima, Shinkansen Sanyo." }],
        festival: "6 août : cérémonie du souvenir.",
      },
      body: [
        "Le 6 août 1945, la ville fut détruite par la première bombe atomique de l'histoire. Le **Peace Memorial Park**, aménagé sur l'hypocentre, rassemble le musée de la Paix, la flamme éternelle et le **Dôme de la bombe A**, ruine volontairement conservée, inscrite au patrimoine mondial en 1996.",
        "Reconstruite, Hiroshima est aujourd'hui une cité animée et accueillante, connue pour ses *okonomiyaki* empilés avec des nouilles et pour son équipe de base-ball, les Carp.",
      ],
      practical: [
        { name: "Peace Memorial Park", icon: "peace", hours: "t.l.j.", admission: "free" },
        { name: "Musée de la Paix", icon: "museum", hours: "t.l.j.", admission: "paid" },
      ],
    },
    {
      id: "miyajima",
      marker: 5,
      name: "Miyajima",
      nameJa: "宮島",
      geo: [132.319, 34.296],
      meta: {
        prefecture: "Préfecture de Hiroshima.",
        transit: [
          { mode: "train", text: "Miyajimaguchi (JR)." },
          { mode: "boat", text: "Ferry de dix minutes jusqu'à l'île." },
        ],
      },
      body: [
        "Considérée depuis toujours comme l'une des « trois plus belles vues du Japon », l'île de Miyajima abrite le sanctuaire d'**Itsukushima**, dont le grand *torii* vermillon semble flotter sur l'eau à marée haute. Bâti sur pilotis dès le XII^{e} siècle, il est inscrit au patrimoine mondial.",
        "Sur l'île, aucun mort ni aucune naissance ne sont tolérés, dit-on, pour ne pas souiller le sol sacré. Des cerfs apprivoisés se promènent dans les ruelles, où l'on vend des gâteaux à la feuille d'érable, les *momiji manju*.",
      ],
      practical: [
        { name: "Itsukushima-jinja", icon: "temple", hours: "t.l.j.", admission: "paid" },
        { name: "Téléphérique du mont Misen", icon: "cable", hours: "t.l.j.", admission: "paid" },
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
            { span: 1, blocks: [{ t: "poi", id: "osaka" }] },
            { span: 1, blocks: [{ t: "figure", photo: { motif: "skyline", aspect: 1.1, caption: "Dotonbori, la nuit", seed: 1 } }, { t: "poi", id: "nara" }] },
            { span: 1, blocks: [{ t: "poi", id: "himeji" }, { t: "figure", photo: { motif: "castle", aspect: 0.85, caption: "Le château d'Himeji, ou « héron blanc »", seed: 0 } }] },
          ],
        },
      ],
    },
    {
      bands: [
        {
          stacks: [
            { span: 1, blocks: [{ t: "poi", id: "hiroshima" }] },
            { span: 2, blocks: [{ t: "figure", photo: { motif: "sea", aspect: 2.1, caption: "Le grand torii d'Itsukushima, à marée haute", seed: 2 } }, { t: "poi", id: "miyajima" }] },
          ],
        },
      ],
    },
  ],
};
