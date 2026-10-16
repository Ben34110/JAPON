import type { RegionContent } from "@/lib/types";

export const tokyo: RegionContent = {
  regionId: "tokyo",
  startFolio: 60,
  runningTitle: "Tokyo quartier par quartier",
  sectionTitle: "Tokyo",
  mapTitle: "Tokyo",
  intro: {
    title: "Tokyo",
    paragraphs: [
      "Le guide découpe la capitale en trois secteurs, chacun avec son plan : le **Centre**, autour du Palais impérial, de la gare de Tokyo et de Ginza ; le **Nord**, l'ancienne Shitamachi des artisans, d'Ueno à Asakusa ; l'**Ouest**, celui des gratte-ciel de Shinjuku et de la mode de Shibuya et de Harajuku.",
      "Séismes, incendies et bombardements ont fait disparaître une grande partie du vieux Tokyo ; il reste des îlots où l'on retrouve ruelles de bois, temples de quartier et marchés bruyants, au pied des tours de verre. Un dernier site, Kamakura, ancienne capitale des shoguns, s'atteint en une heure de train.",
    ],
    figure: { motif: "skyline", aspect: 0.5, caption: "La Tokyo Skytree, dans le quartier de Sumida", seed: 1, wiki: "tokyo" },
  },
  sections: [
    { id: "centre", name: "Le Centre de Tokyo", short: "Centre", pages: [60, 71], labelDir: "bottom" },
    { id: "nord", name: "Le Nord de Tokyo", short: "Nord", pages: [72, 83], labelDir: "top" },
    { id: "ouest", name: "L’Ouest de Tokyo", short: "Ouest", pages: [84, 95], labelDir: "left" },
    { id: "excursion", name: "Excursion : Kamakura", short: "Kamakura" },
  ],
    mapLabels: [
    { text: "Baie de Tokyo", geo: [139.95, 35.45], kind: "sea", rotate: -30 },
    { text: "Océan Pacifique", geo: [139.62, 35.14], kind: "sea" },
    { text: "Yokohama", geo: [139.638, 35.444], kind: "place" },
    { text: "Chiba", geo: [140.123, 35.607], kind: "place" },
    { text: "Saitama", geo: [139.656, 35.861], kind: "place" },
    { text: "Presqu'île de Miura", geo: [139.68, 35.2], kind: "relief" },
  ],
  pois: [
    {
      id: "palais-imperial",
      marker: 1,
      name: "Palais impérial",
      nameJa: "皇居",
      section: "centre",
      geo: [139.7528, 35.6852],
      plan: [436, 410],
      meta: {
        prefecture: "Chiyoda-ku.",
        plan: "Plan 1 C2.",
        transit: [{ mode: "train", text: "Tokyo, Otemachi ou Nijubashi-mae (métro)." }],
        festival: "Cerisiers de Chidorigafuchi (fin mars).",
      },
      body: [
        "Au cœur de la capitale, un vaste îlot de verdure ceint de douves occupe l'emplacement du château d'Edo, d'où les shoguns Tokugawa gouvernèrent le Japon pendant deux siècles et demi. Depuis 1868, l'empereur y réside. Les palais eux-mêmes ne se visitent presque jamais ; on les devine derrière le pont à deux arches du **Nijubashi**, image la plus célèbre du lieu.",
        "Les **jardins de l'Est** (Higashi-gyoen), ouverts au public, gardent les soubassements de l'ancien donjon et de larges murailles de pierre taillée. Au printemps, les cerisiers qui bordent les douves de Chidorigafuchi, à l'ouest, attirent des foules venues en barque ou à pied.",
      ],
      practical: [
        { name: "Jardins de l'Est (Higashi-gyoen)", icon: "garden", hours: "mar.-jeu., sam.-dim.", admission: "free", note: "fermé lun. et ven." },
      ],
    },
    {
      id: "marunouchi",
      marker: 2,
      name: "Gare de Tokyo et Marunouchi",
      nameJa: "東京駅・丸の内",
      section: "centre",
      geo: [139.7671, 35.6812],
      plan: [646, 468],
      meta: {
        plan: "Plan 1 D3.",
        transit: [{ mode: "train", text: "Tokyo, nombreuses lignes, terminus des Shinkansen." }],
      },
      body: [
        "Inaugurée en 1914, la gare de Tokyo déploie sa façade de briques rouges, œuvre de Tatsuno Kingo, face au Palais impérial ; restaurée à l'identique en 2012, elle a retrouvé ses dômes d'origine. Derrière, le quartier d'affaires de **Marunouchi** aligne gratte-ciel, galeries de luxe et restaurants le long d'avenues plantées de ginkgos.",
        "C'est d'ici que partent les trains à grande vitesse vers Kyoto, Osaka, Sendai ou Nagano. Côté est, le quartier de **Yaesu** rassemble les grands magasins et les « rues de la gare », commodes pour dîner entre deux correspondances.",
      ],
      practical: [
        { name: "Gare de Tokyo (côté Marunouchi)", icon: "house", hours: "t.l.j.", admission: "free" },
      ],
    },
    {
      id: "ginza",
      marker: 3,
      name: "Ginza",
      nameJa: "銀座",
      section: "centre",
      geo: [139.765, 35.6717],
      plan: [756, 664],
      meta: {
        plan: "Plan 2 D4.",
        transit: [{ mode: "train", text: "Ginza, lignes Ginza, Marunouchi et Hibiya." }],
      },
      body: [
        "Le quartier doit son nom à l'hôtel des monnaies d'argent (*gin-za*) installé ici en 1612. Reconstruit à l'occidentale après l'incendie de 1872, Ginza est devenu l'adresse du luxe : grands magasins, joailliers et galeries d'art s'alignent le long de la **Chuo-dori**, réservée aux piétons le dimanche après-midi.",
        "Le **Kabuki-za**, reconstruit en 2013, présente le théâtre kabuki dans une salle de bois et de laque ; on peut n'assister qu'à un acte, à prix modique. Au carrefour central, la tour d'horloge du grand magasin **Wako** (1932) sert de point de rendez-vous.",
      ],
      practical: [
        { name: "Kabuki-za", icon: "museum", hours: "t.l.j.", admission: "paid", note: "places à l'acte" },
        { name: "Chuo-dori", icon: "market", hours: "t.l.j.", admission: "free", note: "piétonne le dimanche" },
      ],
    },
    {
      id: "tsukiji",
      marker: 4,
      name: "Tsukiji et Hamarikyu",
      nameJa: "築地・浜離宮",
      section: "centre",
      geo: [139.766, 35.663],
      plan: [866, 800],
      meta: {
        plan: "Plan 2 E5.",
        transit: [{ mode: "train", text: "Tsukijishijo (métro Oedo) ; Shimbashi, puis marche." }],
      },
      body: [
        "Le célèbre marché de gros de poissons a déménagé à Toyosu en 2018, mais le **marché extérieur de Tsukiji** n'a pas bougé : petites échoppes de *sushi*, d'omelettes sucrées et de couteaux de cuisine, qu'il vaut mieux visiter tôt le matin.",
        "À dix minutes à pied, le jardin **Hamarikyu**, ancienne résidence des shoguns au bord de la baie, est un jardin de promenade de l'ère Edo dont l'étang d'eau de mer monte et descend avec la marée. Un salon de thé posé sur l'eau permet de boire un *matcha* en regardant les tours de Shiodome.",
      ],
      practical: [
        { name: "Jardin Hamarikyu", icon: "garden", hours: "t.l.j. 9 h-17 h", admission: "paid" },
        { name: "Marché extérieur de Tsukiji", icon: "market", hours: "t.l.j.", admission: "free", note: "le matin de préférence" },
      ],
    },
    {
      id: "ueno",
      marker: 5,
      name: "Parc d'Ueno",
      nameJa: "上野公園",
      section: "nord",
      geo: [139.7745, 35.7141],
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
      marker: 6,
      name: "Musée national de Tokyo",
      nameJa: "東京国立博物館",
      section: "nord",
      geo: [139.7765, 35.7189],
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
      marker: 7,
      name: "Shitamachi Museum",
      nameJa: "下町風俗資料館",
      section: "nord",
      geo: [139.7712, 35.7118],
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
    },
    {
      id: "yanaka",
      marker: 8,
      name: "Yanaka",
      nameJa: "谷中地区",
      section: "nord",
      geo: [139.7686, 35.727],
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
      marker: 9,
      name: "Ameyoko Market",
      nameJa: "アメ横",
      section: "nord",
      geo: [139.7746, 35.7102],
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
      marker: 10,
      name: "Inaricho et Kappabashi-dori",
      nameJa: "稲荷町地区とかっぱ橋通り",
      section: "nord",
      geo: [139.7826, 35.7107],
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
      marker: 11,
      name: "Asakusa et le Sensō-ji",
      nameJa: "浅草寺",
      section: "nord",
      geo: [139.7966, 35.7148],
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
    {
      id: "shinjuku",
      marker: 12,
      name: "Shinjuku",
      nameJa: "新宿",
      section: "ouest",
      geo: [139.7, 35.69],
      plan: [352, 252],
      meta: {
        plan: "Plan 3 B2.",
        transit: [{ mode: "train", text: "Shinjuku, JR Yamanote et Chuo ; métro Marunouchi, Oedo." }],
      },
      body: [
        "Sa gare passe pour la plus fréquentée du monde, avec plus de trois millions de voyageurs par jour. À l'ouest, les gratte-ciel de bureaux, dont l'**hôtel de ville métropolitain** de Tange Kenzo (1990), dominent la ville ; ses deux tours jumelles offrent, gratuitement, un panorama jusqu'au mont Fuji par temps clair.",
        "À l'est, **Kabukicho** étale ses néons, ses cabarets et ses salles de jeux, tandis que les ruelles minuscules de **Golden Gai** abritent près de deux cents bars de six places. Pour reprendre son souffle, le jardin de **Shinjuku-gyoen** mêle pelouses à l'anglaise, jardin français et jardin japonais.",
      ],
      practical: [
        { name: "Hôtel de ville métropolitain (observatoire)", icon: "house", hours: "t.l.j.", admission: "free" },
        { name: "Shinjuku-gyoen", icon: "garden", hours: "mar.-dim.", admission: "paid" },
      ],
    },
    {
      id: "meiji-jingu",
      marker: 13,
      name: "Meiji-jingu et Harajuku",
      nameJa: "明治神宮・原宿",
      section: "ouest",
      geo: [139.6993, 35.6764],
      plan: [410, 500],
      meta: {
        plan: "Plan 3 B3.",
        transit: [{ mode: "train", text: "Harajuku (JR Yamanote) ; Meiji-jingu-mae (métro)." }],
        festival: "Hatsumode (1^{er}-3 janv.).",
      },
      body: [
        "Dédié à l'empereur Meiji et à son épouse, le sanctuaire, achevé en 1920, est noyé dans une forêt de cent mille arbres offerts de tout le pays. On y accède par un immense *torii* de cyprès, puis par de larges allées de gravier où, le week-end, défilent des cortèges de mariage en kimono.",
        "À deux pas, **Harajuku** est le fief de la mode adolescente : sur la **Takeshita-dori**, boutiques de vêtements excentriques et crêperies attirent tous les dimanches une jeunesse déguisée, tandis que l'avenue d'**Omotesando**, plantée de zelkovas, aligne les boutiques de créateurs signées par de grands architectes.",
      ],
      practical: [
        { name: "Meiji-jingu", icon: "temple", hours: "t.l.j.", admission: "free", note: "du lever au coucher du soleil" },
        { name: "Takeshita-dori", icon: "market", hours: "t.l.j.", admission: "free" },
      ],
    },
    {
      id: "shibuya",
      marker: 14,
      name: "Shibuya",
      nameJa: "渋谷",
      section: "ouest",
      geo: [139.7016, 35.658],
      plan: [470, 780],
      meta: {
        plan: "Plan 3 B4.",
        transit: [{ mode: "train", text: "Shibuya, JR Yamanote ; lignes Ginza, Hanzomon, Fukutoshin." }],
      },
      body: [
        "Devant la gare, le plus célèbre passage piéton du monde laisse déferler, à chaque feu vert, plusieurs milliers de personnes dans toutes les directions. La statue en bronze du chien **Hachiko**, qui attendit pendant dix ans son maître défunt devant la gare, sert de point de rendez-vous.",
        "Autour, **Shibuya 109** et les rues de **Center-gai** font figure de capitale de la mode jeune et de la musique. Du toit d'une tour voisine, la terrasse de **Shibuya Sky** offre une vue à 360° sur la ville au crépuscule.",
      ],
      practical: [
        { name: "Statue de Hachiko", icon: "park", hours: "t.l.j.", admission: "free" },
        { name: "Shibuya Sky", icon: "mountain", hours: "t.l.j.", admission: "paid" },
      ],
    },
    {
      id: "roppongi",
      marker: 15,
      name: "Roppongi",
      nameJa: "六本木",
      section: "ouest",
      geo: [139.7315, 35.6628],
      plan: [800, 730],
      meta: {
        plan: "Plan 3 D4.",
        transit: [{ mode: "train", text: "Roppongi, lignes Hibiya et Oedo." }],
      },
      body: [
        "Quartier de la vie nocturne, Roppongi est aussi devenu, depuis 2003, celui des arts : le **Mori Art Museum**, au cinquante-troisième étage de la tour de Roppongi Hills, présente de l'art contemporain avec la ville à ses pieds ; le **National Art Center**, immense vague de verre inaugurée en 2007, accueille de grandes expositions temporaires.",
        "Au loin, la **tour de Tokyo**, copie rouge et blanche de la tour Eiffel, rappelle les années 1950 et domine les toits de Shiba.",
      ],
      practical: [
        { name: "Mori Art Museum", icon: "museum", hours: "t.l.j.", admission: "paid" },
        { name: "National Art Center", icon: "museum", hours: "mer.-lun.", admission: "paid" },
      ],
    },
    {
      id: "kamakura",
      marker: 16,
      name: "Kamakura",
      nameJa: "鎌倉",
      section: "excursion",
      geo: [139.5467, 35.319],
      meta: {
        prefecture: "Préfecture de Kanagawa.",
        population: "170 000",
        transit: [{ mode: "train", text: "Kamakura, JR ligne Yokosuka, 55 mn de Tokyo." }],
        festival: "Hortensias (juin).",
      },
      body: [
        "Siège du premier shogunat, de 1185 à 1333, Kamakura fut la capitale politique du Japon des guerriers. Nichée entre la mer et des collines boisées, que l'on franchit par d'anciens passages creusés dans la roche, la petite ville conserve des dizaines de temples zen et de sanctuaires, à une heure de train de Tokyo.",
        "Le **Daibutsu**, grand Bouddha de bronze de plus de onze mètres coulé au milieu du XIII^{e} siècle, trône à ciel ouvert, son temple ayant été emporté par un raz de marée. Le **Tsurugaoka Hachiman-gu** se dresse au bout d'une longue allée bordée de cerisiers ; le **Hase-dera** abrite une Kannon de bois dorée à onze visages et, en juin, une pente couverte d'hortensias.",
        "On rejoint Enoshima, île à sanctuaire, par le petit train Enoden, qui frôle les maisons et la plage de Shichirigahama.",
      ],
      practical: [
        { name: "Daibutsu (Kotoku-in)", icon: "temple", hours: "t.l.j. 8 h-17 h 30", admission: "paid" },
        { name: "Tsurugaoka Hachiman-gu", icon: "temple", hours: "t.l.j.", admission: "free" },
        { name: "Hase-dera", icon: "temple", hours: "t.l.j.", admission: "paid" },
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
      figure: { motif: "sea", aspect: 1.3, caption: "La Grande Vague de Kanagawa, estampe d'Hokusai (vers 1831)", wiki: "ukiyoe", seed: 2 },
    },
  ],
  pages: [
    {
      bands: [
        { stacks: [{ span: 3, blocks: [{ t: "intro" }] }] },
        {
          stacks: [
            { span: 1, blocks: [
              { t: "figure", photo: { motif: "castle", aspect: 1.1, caption: "Le Nijubashi et le Palais impérial", seed: 0, wiki: "imperial-palace" } },
              { t: "poi", id: "palais-imperial" },
            ] },
            { span: 1, blocks: [
              { t: "figure", photo: { motif: "gate", aspect: 1.2, caption: "La gare de Tokyo, côté Marunouchi", seed: 1, wiki: "tokyo-station" } },
              { t: "poi", id: "marunouchi" },
            ] },
            { span: 1, blocks: [
              { t: "figure", photo: { motif: "skyline", aspect: 1.1, caption: "Le carrefour de Ginza, la nuit", seed: 1, wiki: "ginza" } },
              { t: "poi", id: "ginza" },
            ] },
            { span: 1, blocks: [
              { t: "figure", photo: { motif: "garden", aspect: 1.3, caption: "L'étang de marée du jardin Hamarikyu", seed: 0, wiki: "hamarikyu" } },
              { t: "poi", id: "tsukiji" },
            ] },
          ],
        },
        {
          stacks: [
            { span: 1, blocks: [
              { t: "figure", photo: { motif: "cherry", aspect: 0.9, caption: "Cerisiers en fleurs dans le parc d'Ueno", seed: 0, wiki: "ueno-park" } },
              { t: "poi", id: "ueno" },
            ] },
            { span: 1, blocks: [
              { t: "figure", photo: { motif: "pagoda", aspect: 1.2, caption: "Le Musée national de Tokyo, bâtiment Honkan", seed: 0, wiki: "tokyo-national-museum" } },
              { t: "poi", id: "musee-national" },
            ] },
            { span: 1, blocks: [{ t: "poi", id: "shitamachi-museum" }, { t: "poi", id: "yanaka" }, { t: "figure", photo: { motif: "street", aspect: 1.2, caption: "Boutique de quartier à Yanaka", seed: 1, wiki: "yanaka" } }] },
            { span: 1, blocks: [
              { t: "figure", photo: { motif: "market", aspect: 1.05, caption: "À la recherche d'une bonne affaire au marché d'Ameyoko", seed: 0, wiki: "ameyoko" } },
              { t: "poi", id: "ameyoko" },
            ] },
            { span: 1, blocks: [{ t: "poi", id: "inaricho" }] },
            { span: 1, blocks: [
              { t: "figure", photo: { motif: "gate", aspect: 1.1, caption: "La Kaminarimon et sa lanterne géante", seed: 0, wiki: "kaminarimon" } },
              { t: "poi", id: "asakusa" },
            ] },
            { span: 2, blocks: [{ t: "sidebar", id: "monde-flottant" }] },
          ],
        },
        {
          stacks: [
            { span: 1, blocks: [
              { t: "figure", photo: { motif: "skyline", aspect: 1.1, caption: "Les tours de l'hôtel de ville métropolitain, à Shinjuku", seed: 1, wiki: "shinjuku" } },
              { t: "poi", id: "shinjuku" },
            ] },
            { span: 1, blocks: [
              { t: "figure", photo: { motif: "gate", aspect: 1.2, caption: "Le grand torii du sanctuaire Meiji-jingu", seed: 0, wiki: "meiji-jingu" } },
              { t: "poi", id: "meiji-jingu" },
            ] },
            { span: 1, blocks: [
              { t: "figure", photo: { motif: "skyline", aspect: 1.2, caption: "Le passage piéton de Shibuya", seed: 1, wiki: "shibuya" } },
              { t: "poi", id: "shibuya" },
            ] },
            { span: 1, blocks: [
              { t: "figure", photo: { motif: "skyline", aspect: 1.1, caption: "Roppongi Hills et la tour de Tokyo", seed: 1, wiki: "roppongi" } },
              { t: "poi", id: "roppongi" },
            ] },
          ],
        },
        {
          stacks: [
            { span: 1, blocks: [
              { t: "figure", photo: { motif: "pagoda", aspect: 0.85, caption: "Le Grand Bouddha de Kamakura, coulé en 1252", seed: 1, wiki: "kamakura-daibutsu" } },
              { t: "poi", id: "kamakura" },
            ] },
          ],
        },
      ],
    },
  ],
};
