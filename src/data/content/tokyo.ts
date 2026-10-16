import type { RegionContent } from "@/lib/types";

export const tokyo: RegionContent = {
  regionId: "tokyo",
  startFolio: 85,
  runningTitle: "Tokyo quartier par quartier",
  sectionTitle: "Le nord de Tokyo",
  mapTitle: "Le nord de Tokyo",
  intro: {
    title: "Le nord de Tokyo",
    paragraphs: [
      "Au nord de la gare de Tokyo s'étend l'ancienne Shitamachi, la « ville basse » des artisans et des commerçants de l'ère Edo. Séismes, incendies et bombardements ont épargné quelques îlots où l'on retrouve un Tokyo à l'échelle humaine : ruelles de bois, temples de quartier, marchés bruyants.",
      "Ueno en est le cœur : un vaste parc, des musées parmi les plus riches du pays, et à ses portes, Yanaka, Ameyoko et Asakusa, où se mêlent boutiquiers, pèlerins et curieux. Les plans de ce chapitre accompagnent la promenade, de station en station.",
    ],
    figure: { motif: "doll", aspect: 0.5, cutout: true, caption: "Poupée traditionnelle, Shitamachi Museum" },
  },
  mapLabels: [],
  pois: [
    {
      id: "ueno",
      marker: 1,
      name: "Parc d'Ueno",
      nameJa: "上野公園",
      plan: [388, 322],
      meta: {
        prefecture: "Taito-ku.",
        plan: "Plan 3 C1-2.",
        transit: [{ mode: "train", text: "Ueno, nombreuses lignes ; Uguisudani (JR Yamanote)." }],
        festival: "Hanami des cerisiers (fin mars – début avril).",
      },
      body: [
        "Ouvert au public en 1873 sur les terres de l'ancien temple Kan'ei-ji, le parc d'Ueno est l'un des premiers parcs publics du Japon. Sous ses grands arbres se côtoient le plus vieux zoo du pays, une demi-douzaine de musées, un étang couvert de lotus et plusieurs sanctuaires.",
        "Au moment de la floraison des cerisiers, des centaines de milliers de Tokyoïtes y viennent pique-niquer sous les branches : on réserve sa place dès l'aube avec une bâche bleue. C'est ici aussi qu'eut lieu, en 1868, la dernière bataille des partisans du shogun contre les troupes impériales.",
      ],
      practical: [
        { name: "Zoo d'Ueno", icon: "park", hours: "mar.-dim.", admission: "paid", note: "ouvert en 1882" },
        { name: "Bentendo (étang de Shinobazu)", icon: "temple", hours: "t.l.j.", admission: "free" },
      ],
    },
    {
      id: "musee-national",
      marker: 2,
      name: "Musée national de Tokyo",
      nameJa: "東京国立博物館",
      plan: [440, 270],
      meta: {
        prefecture: "Ueno-koen, Taito-ku.",
        plan: "Plan 3 C1.",
        transit: [{ mode: "train", text: "Ueno ou Uguisudani (JR Yamanote)." }],
      },
      body: [
        "Fondé en 1872, le plus ancien et le plus vaste musée du Japon abrite plus d'une centaine de milliers d'objets, dont quatre-vingt-dix trésors nationaux. Le **Honkan**, bâtiment principal, déroule l'histoire de l'art japonais : sabres, laques, estampes, bouddhas et kimonos.",
        "Le **Toyokan** est consacré aux arts d'Asie, le **Heiseikan** à l'archéologie japonaise, et la galerie des **trésors du Horyu-ji** réunit, dans une architecture épurée, des bronzes bouddhiques du VII^{e} siècle.",
      ],
      practical: [
        { name: "Tokyo National Museum", icon: "museum", hours: "mar.-dim.", admission: "paid", note: "9 h 30-17 h" },
      ],
    },
    {
      id: "shitamachi-museum",
      marker: 3,
      name: "Shitamachi Museum",
      nameJa: "下町風俗資料館",
      plan: [446, 436],
      meta: {
        prefecture: "2-1 Ueno-koen, Taito-ku.",
        plan: "Plan 3 C3.",
        transit: [
          { mode: "train", text: "Ueno, lignes Hibiya et Ginza." },
          { mode: "train", text: "Keisei-Ueno, nombreuses lignes." },
        ],
      },
      body: [
        "Conçu pour préserver l'esprit de Shitamachi (p. 73), ce musée est très évocateur. Au rez-de-chaussée sont reconstituées des boutiques de l'ère Edo, comme un magasin de sucreries et une chaudronnerie. Le premier étage présente des jouets traditionnels, que l'on peut manipuler, des outils et des photographies.",
        "Les cinquante mille objets exposés ont été offerts par des habitants du quartier : chaque pièce a un donateur, et un visage.",
      ],
      practical: [
        {
          name: "Shitamachi Museum",
          icon: "museum",
          phone: "(03) 3823-7451",
          hours: "9 h 30-16 h mar.-dim.",
          admission: "paid",
        },
      ],
      aside: { motif: "doll", aspect: 0.46, cutout: true, caption: "Poupée, Shitamachi Museum" },
    },
    {
      id: "yanaka",
      marker: 4,
      name: "Yanaka",
      nameJa: "谷中地区",
      plan: [212, 332],
      meta: {
        plan: "Plan 3 C1.",
        transit: [{ mode: "train", text: "Nippori, nombreuses lignes." }],
      },
      body: [
        "Ce quartier paisible, qui a survécu au séisme de 1923 et aux bombardements américains, vaut une visite. On y respire le parfum de l'ancienne Shitamachi, avec ses maisons serrées le long d'étroites allées et ses éventaires traditionnels, qui vendent des biscuits salés au riz et des bonbons à l'ancienne.",
        "Le grand **cimetière de Yanaka** abrite le **Tenno-ji**, temple doté d'un grand Bouddha de bronze daté de 1690 ; l'endroit est superbe quand les cerisiers sont en fleurs. À l'ouest, la maison du sculpteur **Asakura Fumio** (1883-1964), transformée en musée, offre une salle exquise réservée à ses statuettes de chat, un jardin d'eau et de pierre, et une terrasse sur les toits. La rue principale, Sasaki-dori, possède quelques boutiques traditionnelles ; le **Daimyo Clock Museum** présente une centaine d'horloges de l'époque Edo.",
      ],
      practical: [
        {
          name: "Asakura Museum",
          icon: "museum",
          phone: "(03) 3821-4549",
          hours: "9 h 30-16 h 15 mar.-jeu., sam.-dim.",
          admission: "paid",
          note: "dern. adm. 30 mn av. ferm.",
        },
        {
          name: "Daimyo Clock Museum",
          icon: "museum",
          phone: "(03) 3821-6913",
          hours: "10 h-16 h mar.-dim.",
          admission: "paid",
          note: "15 janv.-30 juin, 1^{er} oct.-24 déc.",
        },
      ],
    },
    {
      id: "ameyoko",
      marker: 5,
      name: "Ameyoko Market",
      nameJa: "アメ横",
      plan: [566, 588],
      meta: {
        plan: "Plan 3 C3.",
        transit: [
          { mode: "train", text: "Ueno, lignes Hibiya et Ginza ; Okachimachi, Yamanote ; Ueno, nombreuses lignes." },
        ],
      },
      body: [
        "Le marché d'Ameyoko est l'un des grands bazars de l'Asie : on y trouve de tout, à prix réduit. Pendant l'ère Edo, on y achetait des *ame* (bonbons). Après la Seconde Guerre mondiale, les marchandises du marché noir — liqueurs, cigarettes, chocolat, bas nylon des magasins militaires américains — y firent leur apparition. *Ame* devint alors l'abréviation du mot « américain » (*yoko* signifie allée).",
        "Les petites boutiques serrées sous le pont ferroviaire vendent des marques étrangères — Chanel, Nike ou Rolex — à moindre coût. Vêtements et accessoires sont concentrés sous le pont, tandis que les produits comestibles, avec un large choix de poissons, bordent la rue qui longe la voie ferrée.",
      ],
    },
    {
      id: "inaricho",
      marker: 6,
      name: "Inaricho et Kappabashi-dori",
      nameJa: "稲荷町地区とかっぱ橋通り",
      plan: [738, 462],
      meta: {
        plan: "Plan 4 D3, 4 E2-3.",
        transit: [{ mode: "train", text: "Inaricho et Tawaramachi, ligne Ginza." }],
      },
      body: [
        "Quartier général de tous les articles religieux, Inaricho propose de petites boîtes de bois pour ranger les bouddhas et les photos de famille, des lanternes de papier, des bouquets de fleurs de cuivre (*jouka*), de petits sanctuaires shintoïstes et des chapelets. La plupart des boutiques se situent du côté sud de l'Asakusa-dori, entre les stations de métro Inaricho et Tawaramachi.",
        "Sur la Kappabashi-dori, artère baptisée du nom des lutins aquatiques (*kappa*) qui aidèrent, dit-on, à construire un pont (*bashi*) à cet endroit, ustensiles de cuisine et faux plats cuisinés en résine, qu'exposent presque tous les restaurants, abondent. Bien que ces « plats » soient à vendre, leur prix est beaucoup plus élevé que celui des plats comestibles.",
      ],
    },
    {
      id: "asakusa",
      marker: 7,
      name: "Asakusa et le Sensō-ji",
      nameJa: "浅草寺",
      plan: [868, 318],
      meta: {
        plan: "Plan 4 E2.",
        transit: [{ mode: "train", text: "Asakusa, lignes Ginza et Asakusa." }],
        festival: "Sanja Matsuri (troisième week-end de mai).",
      },
      body: [
        "Le plus ancien temple de Tokyo aurait été fondé en 628, quand deux pêcheurs retirèrent de la Sumida une statuette de Kannon. On y accède par la **Kaminarimon** (« porte du Tonnerre »), dont la gigantesque lanterne rouge est devenue l'emblème de la ville, puis par la **Nakamise-dori**, allée de boutiques où s'alignent, depuis des siècles, gâteaux de riz, éventails et souvenirs.",
        "Dans l'enceinte, fumée d'encens, oracles en papier et cinq étages de pagode composent un tableau que les Tokyoïtes viennent encore chercher le jour du Nouvel An. Le week-end de la Sanja Matsuri, des palanquins sacrés y sont portés à bout de bras dans une joyeuse cohue.",
      ],
      practical: [
        { name: "Sensō-ji", icon: "temple", hours: "t.l.j.", admission: "free", note: "6 h-17 h" },
        { name: "Nakamise-dori", icon: "market", hours: "t.l.j.", admission: "free" },
      ],
    },
  ],
  sidebars: [
    {
      id: "monde-flottant",
      title: "Le monde flottant",
      italic: true,
      paragraphs: [
        "Pendant l'ère Edo, les gravures sur bois, baptisées *ukiyo-e* ou images du « monde flottant », devinrent l'univers du plaisir et l'art pictural le plus populaire du Japon. Leur influence fut profonde sur des artistes tels que Matisse et Van Gogh.",
        "Si elles sont aujourd'hui attribuées à des artistes individuels, elles résultaient en fait d'un effort conjugué entre l'éditeur, responsable du financement et de la distribution, l'artiste, qui dessinait, le graveur, qui taillait les blocs, et l'imprimeur.",
      ],
      figure: { motif: "sea", aspect: 1.3, caption: "Estampe de paysage dans la manière d'Hiroshige", seed: 2 },
    },
  ],
  pages: [
    {
      bands: [
        { stacks: [{ span: 3, blocks: [{ t: "intro" }] }] },
        {
          stacks: [
            { span: 1, blocks: [{ t: "poi", id: "ueno" }] },
            {
              span: 1,
              blocks: [
                { t: "figure", photo: { motif: "cherry", aspect: 0.9, caption: "Cerisiers en fleurs dans le parc d'Ueno", seed: 0 } },
                { t: "poi", id: "musee-national" },
              ],
            },
          ],
        },
      ],
    },
    {
      bands: [
        {
          stacks: [
            { span: 1, blocks: [{ t: "poi", id: "shitamachi-museum" }, { t: "poi", id: "yanaka" }] },
            { span: 1, blocks: [{ t: "poi", id: "ameyoko" }] },
            {
              span: 1,
              blocks: [
                { t: "figure", photo: { motif: "market", aspect: 1.05, caption: "À la recherche d'une bonne affaire au marché d'Ameyoko", seed: 0 } },
                { t: "poi", id: "inaricho" },
              ],
            },
          ],
        },
        {
          stacks: [
            {
              span: 2,
              blocks: [{ t: "figure", photo: { motif: "street", aspect: 2.2, caption: "Maisons anciennes de Yanaka", seed: 1 } }],
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
                { t: "figure", photo: { motif: "gate", aspect: 1.1, caption: "La Kaminarimon et sa lanterne géante", seed: 0 } },
                { t: "poi", id: "asakusa" },
              ],
            },
            { span: 2, blocks: [{ t: "sidebar", id: "monde-flottant" }] },
          ],
        },
      ],
    },
  ],
};
