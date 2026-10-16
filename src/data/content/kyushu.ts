import type { RegionContent } from "@/lib/types";

export const kyushu: RegionContent = {
  regionId: "kyushu",
  startFolio: 236,
  runningTitle: "Le Japon région par région",
  sectionTitle: "Nagasaki",
  mapTitle: "À la découverte de Kyushu",
  intro: {
    title: "Kyushu",
    paragraphs: [
      "Troisième île du Japon par la taille, Kyushu est la plus méridionale des quatre grandes îles. Ses volcans en activité, ses sources chaudes et son climat presque subtropical lui donnent un caractère à part, que ses habitants revendiquent volontiers.",
      "Porte du Japon vers le continent et vers l'Occident, l'île vit débarquer les premiers marchands portugais en 1543, puis abrita pendant plus de deux siècles le seul comptoir européen toléré par les shoguns. Cette longue histoire d'échanges a laissé des églises, des quartiers étrangers et une cuisine métissée.",
      "Plus au sud, la nature reprend ses droits : du mont Aso à Sakurajima, les fumerolles rappellent à chaque instant que Kyushu est un pays de feu.",
    ],
    figure: { motif: "doll", aspect: 0.5, cutout: true, caption: "Poupée de Hakata, Fukuoka" },
  },
  mapLabels: [
    { text: "Mer de Chine orientale", geo: [129.62, 31.5], kind: "sea", rotate: -8 },
    { text: "Océan Pacifique", geo: [131.75, 31.45], kind: "sea", rotate: -8 },
    { text: "Mer Intérieure", geo: [131.7, 33.95], kind: "sea" },
    { text: "Fukuoka", geo: [130.4, 33.59], kind: "place" },
    { text: "Beppu", geo: [131.5, 33.28], kind: "place" },
    { text: "Miyazaki", geo: [131.42, 31.91], kind: "place" },
    { text: "Monts Kirishima", geo: [130.86, 31.93], kind: "relief" },
  ],
  pois: [
    {
      id: "nagasaki",
      marker: 13,
      name: "Nagasaki",
      nameJa: "長崎",
      geo: [129.874, 32.75],
      meta: {
        prefecture: "Préfecture de Nagasaki.",
        population: "410 000",
        transit: [
          { mode: "train", text: "Gare JR de Nagasaki, ligne Nagasaki." },
          { mode: "plane", text: "Aéroport de Nagasaki, à 40 mn en car." },
        ],
        info: "Office de tourisme à la gare.",
        festival: "Nagasaki Kunchi (7-9 oct.).",
      },
      body: [
        "Nagasaki doit son caractère à plus de quatre siècles de contacts avec l'étranger. Blottie au fond d'une baie étroite et dominée par des collines, la ville s'étage en amphithéâtre ; pour en saisir l'ensemble, prenez le téléphérique du mont Inasa, d'où le panorama sur le port est spectaculaire, surtout au crépuscule.",
        "Les quartiers de **Dejima** et d'**Oura** gardent la trace des marchands hollandais et des résidents occidentaux. La **Hollander Slope**, pente pavée de pierre, est bordée de demeures de style européen du XIX^{e} siècle ; le **Glover Garden** réunit sur la colline celle de Thomas Glover, négociant écossais qui contribua à moderniser le pays (charbon, chantier naval, première locomotive à vapeur, bière Kirin). Le décor serait celui de *Madame Butterfly*, l'opéra de Puccini.",
        "Classée trésor national, l'**église Oura**, plus ancienne église de bois de style gothique du Japon, fut dédiée en 1865 aux martyrs chrétiens de 1597. Des persécutions, il reste aussi, au nord de la ville, un site que l'on visite en silence.",
      ],
      practical: [
        {
          name: "Hollander Slope",
          icon: "house",
          transit: "Oura Tenshudo-shita (tramway)",
          admission: "free",
          text: "Agréable rue pavée construite par les Hollandais ; elle fut autrefois le centre de la communauté des expatriés. Certaines maisons sont ouvertes au public : la **Junibankan**, l'une des plus imposantes, abrita autrefois la Légation de Prusse.",
        },
        {
          name: "Peace Park",
          icon: "peace",
          transit: "Matsuyama-machi (tramway)",
          hours: "t.l.j.",
          text: "Une stèle noire indique le point zéro de la seconde bombe atomique américaine, lancée le 9 août 1945, à 11 h 02, trois jours après celle d'Hiroshima. Le parc réunit plusieurs monuments dédiés à la paix, dont une statue de 9 m de haut. Tout près, l'**Urakami Catholic Church** fut détruite au moment du cataclysme.",
        },
        {
          name: "Atomic Bomb Museum",
          icon: "museum",
          phone: "(095) 844-1231",
          hours: "t.l.j.",
          admission: "paid",
          text: "Objets, documents et photographies retracent la ville avant la guerre, l'explosion, la reconstruction, puis l'histoire des armes nucléaires et du mouvement pacifiste, avec une grande objectivité.",
        },
        {
          name: "Huis ten Bosch",
          icon: "theme",
          transit: "Huis ten Bosch (JR), près de Sasebo",
          phone: "(0956) 27-0001",
          hours: "t.l.j.",
          admission: "paid",
          text: "Ouvert en 1992, ce parc est la reconstitution d'un village hollandais traditionnel — maisons, églises, moulins, ferme et canaux. C'est le plus grand parc à thème du pays.",
        },
        {
          name: "Holland Village",
          icon: "theme",
          transit: "Bus depuis l'aéroport",
          phone: "(0959) 27-0080",
          hours: "t.l.j.",
          admission: "paid",
          text: "Ce parc à thème possède la réplique d'un navire du XVII^{e} siècle, le *Prince Willem*, et une simulation des voyages entre la Hollande et Nagasaki.",
        },
      ],
    },
    {
      id: "shimabara",
      marker: 14,
      name: "Péninsule de Shimabara",
      nameJa: "島原半島",
      geo: [130.3, 32.75],
      meta: {
        prefecture: "Préfecture de Nagasaki.",
        transit: [
          { mode: "train", text: "Shimabara city." },
          { mode: "boat", text: "Ferry de Kumamoto." },
        ],
        info: "Unzen Spa (0957) 73-3434 ; Shimabara (0957) 63-1111.",
      },
      body: [
        "Gouvernée jusqu'en 1616 par le seigneur Arima, de foi chrétienne, cette péninsule fut le théâtre de massacres ordonnés par le shogunat Tokugawa. En 1880, pourtant, l'**Unzen Spa** y fut aménagé pour les Occidentaux : à 700 m d'altitude, entouré de forêts de pins, c'était un lieu idéal pour fuir la chaleur étouffante de l'été.",
        "Au printemps fleurissent des milliers d'azalées ; en automne, les érables s'habillent d'incarnat. En 1934, l'**Unzen-Amakusa National Park** fut l'un des premiers parcs nationaux du pays. La plupart des hôtels d'Unzen ont leur propre établissement de bains alimenté par des sources chaudes.",
        "Les célèbres « enfers » (*jigoku*) sont des chaudrons sulfureux bouillants où des chrétiens furent suppliciés lors de la répression. Le **mont Unzen**, volcan que l'on croyait endormi, est entré en éruption en 1991 ; on peut l'escalader depuis le col de Nita, accessible en car depuis Unzen.",
      ],
    },
    {
      id: "kumamoto",
      marker: 15,
      name: "Kumamoto",
      nameJa: "熊本",
      geo: [130.742, 32.804],
      meta: {
        prefecture: "Préfecture de Kumamoto.",
        population: "660 000",
        transit: [
          { mode: "plane", text: "Aéroport." },
          { mode: "train", text: "Gare JR de Kumamoto." },
        ],
        info: "Prefectural Information Office (096) 325-6360.",
        festival:
          "Hinokuni matsuri (festival du Feu, 11-13 août) ; Fujisake Hachiman-gu Shuki Reitaisai (11-15 sept.) ; Kumamoto Oshiro matsuri (festival du château, mi-oct. – 3 nov.).",
      },
      body: [
        "Ville dotée d'une atmosphère de village, d'un climat doux et d'une flore semi-tropicale, Kumamoto fut un siège de gouvernement important sous le shogunat Tokugawa (1603-1868). Son principal point d'intérêt est son vaste château, qui date de cette période ; le quartier commerçant et les lieux à visiter se trouvent au sud de l'édifice, sur le site des anciens quartiers de marchands et d'artisans.",
        "La longévité des habitants — la ville compte de nombreux centenaires — est attribuée à une passion pour la vie et à un régime sain. Celui-ci comprend du *karashi renkon* (racines de lotus frites, fourrées de moutarde et de *miso*) et plusieurs marques de saké élaborées avec l'eau purifiée par les riches sols volcaniques de la région.",
        "Dominant le centre de la ville du haut d'une colline, le **Kumamoto Castle** fut érigé par Kato Kiyomasa, guerrier qui combattit auprès de Tokugawa Ieyasu à la bataille de Sekigahara, en 1600. Récompensé de sa loyauté par un vaste fief, il acheva le château en 1607. La citadelle, contrairement aux édifices plus décoratifs comme le château d'Himeji (p. 200-203), est constituée de murs presque imprenables : 49 tours et 29 portes. Presque entièrement détruit lors de la guerre de Seinan, en 1877, le donjon fut reconstruit en 1960 en béton armé, reproduction saisissante qui fait resurgir la sombre magnificence de l'original.",
        "**Gyobu-tei**, résidence vieille de trois cents ans du seigneur Gyobu, se situe au nord-ouest, sur le domaine du château. Les possessions des clans Kato et Hosokawa sont présentées au **Kumamoto Prefectural Art Museum**, bâtiment moderne doté d'un agréable salon de thé.",
        "Le **Suizen-ji Garden** (p. 26-27) est un jardin de promenade classique, élaboré en 1632 pour la famille Hosokawa. Sa composition, qui ne comporte pas d'indications, n'est pas toujours apparente : il inclut des paysages miniatures des 53 étapes de l'ancienne route du Tokaido, ainsi que des esquisses du lac Biwa et du mont Fuji. Kumamoto est réputée pour son artisanat, en particulier le damasquinage, les perles d'Amakusa et les lanternes de papier doré de Yamaga, fabriquées pour le festival d'août ; le **Kumamoto Traditional Crafts Center** en présente une belle sélection.",
      ],
      practical: [
        { name: "Kumamoto Castle", icon: "castle", phone: "(096) 352-5900", hours: "t.l.j.", admission: "paid" },
        { name: "Gyobu-tei", icon: "castle", phone: "(096) 352-6522", hours: "mar.-dim.", admission: "paid" },
        { name: "Kumamoto Prefectural Art Museum", icon: "museum", phone: "(096) 352-2111", hours: "mar.-dim.", admission: "paid" },
        { name: "Suizen-ji Garden", icon: "garden", phone: "(096) 383-0074", hours: "t.l.j.", admission: "paid" },
        {
          name: "Kumamoto Traditional Crafts Center",
          icon: "museum",
          phone: "(096) 324-4930",
          hours: "mar.-dim.",
          admission: "paid",
          note: "2^{e} étage",
        },
      ],
      aside: { motif: "samurai", aspect: 0.3, cutout: true, caption: "Garde à son poste devant le château" },
    },
    {
      id: "mont-aso",
      marker: 16,
      name: "Mont Aso",
      nameJa: "阿蘇山",
      geo: [131.085, 32.884],
      meta: {
        prefecture: "Préfecture de Kumamoto.",
        transit: [
          { mode: "train", text: "Aso, puis car." },
          { mode: "bus", text: "Visite guidée en car de Kyushu Kokusai Kanko, au départ de Beppu ou de Kumamoto." },
        ],
        festival: "Aso-no-hi Matsuri (festival du Feu d'Aso, Kuginomura, mi-mars).",
      },
      body: [
        "Ensemble de cinq cônes volcaniques, le mont Aso forme l'une des plus vastes caldeiras du monde : plus de cent kilomètres de périmètre. Le **mont Takadake** (1 592 m) est le plus haut des cinq sommets ; le **mont Nakadake**, toujours actif, émet des fumerolles sulfureuses et des gaz chauds qui valent à Kumamoto le qualificatif de *hi-no-kuni* (« pays du feu »).",
        "Des petites villes, des forêts, des prairies de bambous et de sources chaudes occupent le fond de la caldeira. Les cars passent devant des pâturages où paissent des chevaux ; depuis le **Daikanbo** (936 m), la vue embrasse tout le cirque. Un téléphérique conduit au sommet du Nakadake, d'où l'on peut, par temps clair, se pencher sur le cratère fumant — sauf lorsque les gaz imposent la fermeture de l'accès.",
        "Au pied du volcan, le **Mount Aso Museum** explique l'activité du massif, et des caméras installées sur les pentes retransmettent en direct l'état du cratère.",
      ],
      practical: [
        { name: "Mount Aso Museum", icon: "mountain", hours: "t.l.j.", admission: "paid" },
        { name: "Téléphérique de Nakadake", icon: "cable", hours: "t.l.j.", admission: "paid", note: "fermé en cas de gaz toxiques" },
      ],
    },
    {
      id: "kagoshima",
      marker: 17,
      name: "Kagoshima et Sakurajima",
      nameJa: "鹿児島・桜島",
      geo: [130.557, 31.596],
      meta: {
        prefecture: "Préfecture de Kagoshima.",
        population: "600 000",
        transit: [
          { mode: "train", text: "Gare de Kagoshima-Chuo (Shinkansen)." },
          { mode: "boat", text: "Ferry pour Sakurajima, toutes les quinze minutes." },
        ],
      },
      body: [
        "Surnommée le « Naples de l'Orient » pour sa baie ensoleillée et son volcan, Kagoshima fut la capitale du puissant clan Satsuma, dont les samouraïs jouèrent un rôle décisif dans la Restauration de Meiji. Palmiers et climat doux y contrastent avec le reste du pays.",
        "En face de la ville, **Sakurajima** crache régulièrement des panaches de cendres ; un ferry court de quinze minutes permet d'atteindre l'île-volcan, où des sentiers dominent la baie. Le jardin de **Sengan-en**, créé en 1658 par les Shimazu, a pour fond de scène le cône fumant, intégré au paysage selon le principe de l'« emprunt de décor ».",
        "Plus au sud, à Ibusuki, on se fait ensevelir jusqu'au cou dans le sable noir chauffé par la terre : un bain à nul autre pareil.",
      ],
      practical: [
        { name: "Sengan-en", icon: "garden", hours: "t.l.j.", admission: "paid" },
        { name: "Ferry de Sakurajima", icon: "boat", hours: "24 h sur 24", admission: "paid" },
      ],
    },
  ],
  sidebars: [
    {
      id: "nagasaki-etrangers",
      title: "Nagasaki et les étrangers",
      paragraphs: [
        "Lorsque le port de Nagasaki s'ouvrit au commerce international, en 1571, les Portugais et les Hollandais s'y manifestèrent, suivis de marchands chinois qui fondèrent leur propre communauté. Véhiculant des fusils et des missionnaires, les cargos portugais furent à l'origine de périodes de rébellion et de persécution. Seuls les Hollandais participèrent à des échanges commerciaux jusqu'en 1854, depuis leur comptoir de Dejima.",
        "À la réouverture du port, des délégations commerciales britanniques, américaines, françaises, allemandes et prussiennes s'y présentèrent. L'héritage de ces nombreux contacts est illustré par quelques festivals locaux et par quelques plats cuisinés : le *champon*, soupe de nouilles aux fruits de mer, et le *kasutera*, gâteau hérité des Portugais.",
      ],
      figure: { motif: "ship", aspect: 0.82, caption: "Réplique du *Prince Willem*, dans le village hollandais", seed: 1 },
    },
    {
      id: "pays-du-feu",
      title: "Le pays du feu",
      italic: true,
      paragraphs: [
        "Kyushu compte plusieurs des volcans les plus actifs de l'archipel : Aso, Unzen, Sakurajima, Kirishima. La terre y bouillonne aussi sous forme de sources chaudes (*onsen*) : à Beppu, des mares colorées appelées « enfers » fument en plein air, tandis qu'à Kurokawa on se baigne dans des bassins de bois, au fond d'une vallée.",
        "Cette énergie souterraine est aussi un art de vivre : cuisson à la vapeur, œufs durcis dans l'eau soufrée, sables chauds. Les habitants de l'île y voient la source de leur tempérament.",
      ],
    },
  ],
  pages: [
    {
      bands: [
        { stacks: [{ span: 3, blocks: [{ t: "intro" }] }] },
        {
          stacks: [
            {
              span: 1,
              blocks: [
                {
                  t: "howto",
                  title: "Comment y aller ?",
                  paragraphs: [
                    "Fukuoka, porte d'entrée de l'île, est reliée à Osaka et à Tokyo par le Shinkansen et par avion. Des ferries relient aussi Kyushu à Honshu et à Shikoku.",
                    "Sur place, les lignes JR desservent la plupart des villes ; les volcans et les péninsules s'explorent en car. Le Japan Rail Pass est valable sur le réseau JR Kyushu.",
                  ],
                },
              ],
            },
            {
              span: 2,
              blocks: [{ t: "figure", photo: { motif: "harbor", aspect: 1.9, caption: "Le port de Nagasaki, vu depuis les hauteurs de la ville", seed: 0 } }],
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
                { t: "figure", photo: { motif: "tulips", aspect: 1.75, caption: "Tulipes le long du canal d'Huis ten Bosch", seed: 0 } },
                { t: "poi", id: "nagasaki" },
              ],
            },
            {
              span: 1,
              blocks: [
                { t: "figure", photo: { motif: "mountain", aspect: 0.8, caption: "Le magnifique col de Nita, péninsule de Shimabara", seed: 2 } },
                { t: "poi", id: "shimabara" },
              ],
            },
          ],
        },
        { stacks: [{ span: 3, blocks: [{ t: "sidebar", id: "nagasaki-etrangers" }] }] },
      ],
    },
    {
      bands: [
        {
          stacks: [
            {
              span: 2,
              blocks: [
                { t: "figure", photo: { motif: "castle", aspect: 1.5, caption: "Toits et avant-toits du Kumamoto Castle, l'une des grandes forteresses du Japon", seed: 0 } },
                { t: "poi", id: "kumamoto" },
              ],
            },
            {
              span: 1,
              blocks: [
                { t: "figure", photo: { motif: "volcano", aspect: 0.8, caption: "Cratère fumant du mont Nakadake", seed: 1 } },
                { t: "poi", id: "mont-aso" },
                { t: "figure", photo: { motif: "sulfur", aspect: 1.25, caption: "Roches sulfureuses en vente à la station de téléphérique de Nakadake", seed: 0 } },
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
            { span: 2, blocks: [{ t: "poi", id: "kagoshima" }] },
            {
              span: 1,
              blocks: [
                { t: "figure", photo: { motif: "volcano", aspect: 1, caption: "Sakurajima, face à la baie de Kagoshima", seed: 2 } },
                { t: "sidebar", id: "pays-du-feu" },
              ],
            },
          ],
        },
      ],
    },
  ],
};
