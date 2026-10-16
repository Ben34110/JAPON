import type { RegionContent } from "@/lib/types";

export const kyoto: RegionContent = {
  regionId: "kyoto",
  startFolio: 150,
  runningTitle: "Le Japon région par région",
  sectionTitle: "Kyoto",
  mapTitle: "Kyoto, plan d'ensemble",
  intro: {
    title: "Kyoto",
    paragraphs: [
      "Capitale impériale de 794 à 1868, Kyoto fut épargnée par les bombardements de la dernière guerre et conserve dix-sept sites inscrits au patrimoine mondial. Sur un damier de rues tracé à la chinoise, entre les collines de Higashiyama à l'est et de Nishiyama à l'ouest, des centaines de temples, de sanctuaires et de jardins se cachent derrière des murs de terre.",
      "La ville se visite à pied, à vélo ou en bus, en suivant les saisons : cerisiers en avril, érables rouges en novembre, festival de Gion en juillet. Ce chapitre propose cinq étapes, du nord-ouest au sud.",
    ],
    figure: { motif: "torii", aspect: 0.55, cutout: false, caption: "Allée de portiques du Fushimi Inari" },
  },
  mapLabels: [],
  pois: [
    {
      id: "kinkaku-ji",
      marker: 1,
      name: "Kinkaku-ji",
      nameJa: "金閣寺",
      plan: [276, 168],
      meta: {
        prefecture: "Kita-ku.",
        transit: [{ mode: "bus", text: "Bus nº 101 ou 205 depuis la gare de Kyoto." }],
      },
      body: [
        "Le « Pavillon d'or » fut bâti en 1397 comme villa de retraite du shogun Ashikaga Yoshimitsu. Ses deux étages supérieurs sont entièrement recouverts de feuilles d'or et se reflètent dans l'étang du Kyoko-chi, entouré de pins taillés avec soin.",
        "Incendié en 1950 par un jeune moine, épisode qui inspira un roman à Mishima Yukio, il fut reconstruit à l'identique en 1955. L'or a été refait à neuf dans les années 1980.",
      ],
      practical: [{ name: "Kinkaku-ji", icon: "temple", hours: "t.l.j. 9 h-17 h", admission: "paid" }],
    },
    {
      id: "nijo-jo",
      marker: 2,
      name: "Nijo-jo",
      nameJa: "二条城",
      plan: [390, 468],
      meta: {
        plan: "Plan 2 B3.",
        transit: [{ mode: "train", text: "Nijojo-mae (métro Tozai)." }],
      },
      body: [
        "Construit en 1603 par Tokugawa Ieyasu, premier shogun de l'ère Edo, le château de Nijo servait de résidence au shogun lors de ses séjours à Kyoto. Le palais **Ninomaru** est célèbre pour ses « parquets rossignols », qui chantent sous les pas pour déjouer les intrus, et pour ses cloisons peintes d'or par l'école Kano.",
        "C'est dans la grande salle de ce palais que le dernier shogun, Tokugawa Yoshinobu, annonça en 1867 la restitution du pouvoir à l'empereur.",
      ],
      practical: [
        { name: "Nijo-jo", icon: "castle", hours: "t.l.j.", admission: "paid", note: "fermé le mar. en janv., juil., août et déc." },
      ],
    },
    {
      id: "gion",
      marker: 3,
      name: "Gion",
      nameJa: "祇園",
      plan: [620, 524],
      meta: {
        plan: "Plan 3 D2.",
        transit: [{ mode: "train", text: "Gion-shijo (ligne Keihan)." }],
        festival: "Gion Matsuri (tout le mois de juillet).",
      },
      body: [
        "Le quartier des plaisirs de Kyoto est le dernier endroit du Japon où l'on croise des *maiko*, apprenties geishas, au crépuscule, sur les dalles de **Hanamikoji**. Maisons de thé (*ochaya*) à façades de bois ajouré, lanternes rouges et ruelles étroites composent un décor de théâtre, que l'on admire sans jamais pouvoir le franchir sans invitation.",
        "Le **sanctuaire Yasaka**, tout proche, est le foyer du Gion Matsuri : tout le mois de juillet, des chars monumentaux sont tirés dans les rues par des centaines d'hommes.",
      ],
      practical: [{ name: "Sanctuaire Yasaka", icon: "temple", hours: "t.l.j.", admission: "free" }],
    },
    {
      id: "kiyomizu-dera",
      marker: 4,
      name: "Kiyomizu-dera",
      nameJa: "清水寺",
      plan: [690, 628],
      meta: {
        plan: "Plan 3 E3.",
        transit: [{ mode: "bus", text: "Bus nº 206 ou 207, arrêt Kiyomizu-michi." }],
      },
      body: [
        "Fondé en 778, le « temple de l'eau pure » est suspendu à la colline de Higashiyama par une immense terrasse de bois dont les piliers de zelkova sont assemblés sans un clou. Du haut de cette scène, la vue sur la ville est somptueuse, surtout au moment des érables.",
        "Sauter « de la terrasse de Kiyomizu » est, en japonais, une expression pour dire qu'on prend une décision audacieuse. Plus bas, trois filets d'eau de la cascade d'Otowa promettent à qui y boit la santé, la réussite ou l'amour.",
      ],
      practical: [{ name: "Kiyomizu-dera", icon: "temple", hours: "t.l.j. 6 h-18 h", admission: "paid" }],
    },
    {
      id: "fushimi-inari",
      marker: 5,
      name: "Fushimi Inari-taisha",
      nameJa: "伏見稲荷大社",
      plan: [712, 902],
      meta: {
        plan: "Plan 5 E4.",
        transit: [{ mode: "train", text: "Inari (JR ligne Nara) ; Fushimi-Inari (Keihan)." }],
      },
      body: [
        "Dédié à Inari, divinité du riz et de la prospérité, ce sanctuaire est signalé par des milliers de portiques *torii* vermillon, offerts par des entreprises et des particuliers, qui forment des tunnels sur plusieurs kilomètres le long du sentier montant au sommet du mont Inari (233 m).",
        "Partout, des renards de pierre, messagers de la divinité, gardent une clé ou une gerbe de riz dans la gueule. On compte deux heures pour la boucle complète, que l'on parcourt de préférence tôt le matin, quand le sentier est désert.",
      ],
      practical: [{ name: "Fushimi Inari-taisha", icon: "temple", hours: "24 h sur 24", admission: "free" }],
    },
  ],
  sidebars: [
    {
      id: "gion-jeux",
      title: "Les quatre saisons de Kyoto",
      italic: true,
      paragraphs: [
        "À Kyoto, le calendrier règle tout : on réserve ses places sous les cerisiers de Maruyama en avril, on vient écouter les cigales dans les jardins d'été, on guette les érables en novembre et l'on se réchauffe, l'hiver, devant un bol de tofu bouilli à Nanzen-ji.",
        "Chaque saison a ses plats, ses sucreries (*wagashi*) et ses kimonos, et les habitants jugent d'un coup d'œil si l'on est en retard ou en avance.",
      ],
    },
  ],
  pages: [
    {
      bands: [
        { stacks: [{ span: 3, blocks: [{ t: "intro" }] }] },
        {
          stacks: [
            { span: 1, blocks: [{ t: "poi", id: "kinkaku-ji" }] },
            { span: 1, blocks: [{ t: "poi", id: "nijo-jo" }] },
            { span: 1, blocks: [{ t: "figure", photo: { motif: "gate", aspect: 1, caption: "Le Pavillon d'or se reflète dans l'étang", seed: 1 } }] },
          ],
        },
      ],
    },
    {
      bands: [
        {
          stacks: [
            { span: 1, blocks: [{ t: "poi", id: "gion" }] },
            { span: 1, blocks: [{ t: "figure", photo: { motif: "street", aspect: 0.85, caption: "Maisons de thé du quartier de Gion", seed: 0 } }, { t: "poi", id: "kiyomizu-dera" }] },
            { span: 1, blocks: [{ t: "poi", id: "fushimi-inari" }] },
          ],
        },
        {
          stacks: [
            { span: 2, blocks: [{ t: "figure", photo: { motif: "torii", aspect: 2, caption: "Les portiques vermillon du Fushimi Inari-taisha", seed: 0 } }] },
            { span: 1, blocks: [{ t: "sidebar", id: "gion-jeux" }] },
          ],
        },
      ],
    },
  ],
};
