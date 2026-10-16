import type { RegionContent } from "@/lib/types";

export const okinawa: RegionContent = {
  regionId: "okinawa",
  startFolio: 246,
  runningTitle: "Le Japon région par région",
  sectionTitle: "Okinawa",
  mapTitle: "À la découverte d'Okinawa",
  intro: {
    title: "Okinawa",
    paragraphs: [
      "À mi-chemin entre Kyushu et Taïwan, l'archipel des Ryukyu forme un chapelet d'îles aux eaux turquoise, bordées de récifs coralliens. Royaume indépendant jusqu'en 1879, Okinawa a développé une culture singulière, mélange d'influences chinoises, japonaises et d'Asie du Sud-Est.",
      "Le climat y est subtropical : on y mange du porc braisé, des algues et du fruit amer, on y danse au son du *sanshin*, petit luth à trois cordes, et l'on y vit centenaire plus souvent qu'ailleurs.",
    ],
    figure: { motif: "reef", aspect: 0.55, caption: "Archipel de Kerama, vu des hauteurs de Zamami", wiki: "zamami", seed: 0 },
  },
  mapLabels: [
    { text: "Mer de Chine orientale", geo: [127.1, 26.95], kind: "sea", rotate: -14 },
    { text: "Océan Pacifique", geo: [128.5, 26.0], kind: "sea" },
    { text: "Îles Kerama", geo: [127.3, 26.2], kind: "relief" },
  ],
  pois: [
    {
      id: "naha",
      marker: 1,
      name: "Naha",
      nameJa: "那覇",
      geo: [127.681, 26.212],
      meta: {
        prefecture: "Préfecture d'Okinawa.",
        population: "320 000",
        transit: [
          { mode: "plane", text: "Aéroport de Naha, vols directs depuis Tokyo (2 h 40)." },
          { mode: "train", text: "Monorail Yui Rail." },
        ],
      },
      body: [
        "Capitale de l'archipel, Naha a été presque entièrement détruite en 1945 ; elle s'est reconstruite autour de la **Kokusai-dori**, la « rue internationale », qui aligne boutiques de souvenirs, restaurants d'*awamori* (alcool de riz local) et salles de *karaoke*.",
        "Au **Makishi Public Market**, on achète du poisson aux couleurs invraisemblables et l'on monte à l'étage le faire cuire dans un petit restaurant. Plus loin, le jardin **Fukushuen** rappelle les relations de l'ancien royaume avec la Chine.",
      ],
      practical: [
        { name: "Kokusai-dori", icon: "market", hours: "t.l.j.", admission: "free" },
        { name: "Makishi Public Market", icon: "market", hours: "t.l.j.", admission: "free" },
      ],
    },
    {
      id: "shuri-jo",
      marker: 2,
      name: "Château de Shuri",
      nameJa: "首里城",
      geo: [127.719, 26.217],
      meta: {
        prefecture: "Naha.",
        transit: [{ mode: "train", text: "Monorail : Shuri." }],
      },
      body: [
        "Siège des rois de Ryukyu du XV^{e} au XIX^{e} siècle, le château de Shuri domine Naha depuis sa colline. Ses murs de calcaire à la ligne courbe, ses toits de tuiles rouges et ses boiseries vermillon trahissent l'influence chinoise ; ses pavillons ont été reconstruits après la guerre, puis à nouveau après l'incendie de 2019.",
        "Le site fait partie des « Gusuku et biens culturels du royaume de Ryukyu » inscrits au patrimoine mondial en 2000.",
      ],
      practical: [{ name: "Château de Shuri", icon: "castle", hours: "t.l.j.", admission: "paid" }],
    },
    {
      id: "churaumi",
      marker: 3,
      name: "Churaumi Aquarium",
      nameJa: "美ら海水族館",
      geo: [127.878, 26.694],
      meta: {
        prefecture: "Motobu, nord de l'île principale.",
        transit: [{ mode: "bus", text: "Bus express depuis Naha (2 h) ou voiture de location." }],
      },
      body: [
        "Au nord de l'île principale, le Churaumi (« la belle mer ») est l'un des plus grands aquariums du monde. Son bassin géant, qui abrite requins-baleines et raies manta, offre une paroi de verre de huit mètres de haut.",
        "Tout autour, le parc commémoratif de l'Exposition océanique de 1975 permet de prolonger la visite sur la plage d'Emerald, de sable blanc et d'eau limpide.",
      ],
      practical: [{ name: "Churaumi Aquarium", icon: "museum", hours: "t.l.j.", admission: "paid" }],
    },
  ],
  sidebars: [
    {
      id: "ryukyu",
      title: "Le royaume de Ryukyu",
      italic: true,
      paragraphs: [
        "Pendant près de cinq siècles, les rois de Ryukyu entretinrent des relations tributaires avec la Chine tout en commerçant avec le Japon, la Corée et l'Asie du Sud-Est. En 1609, le clan Satsuma de Kyushu envahit l'archipel ; en 1879, le Japon l'annexa, y créant la préfecture d'Okinawa.",
      ],
    },
  ],
  pages: [
    {
      bands: [
        { stacks: [{ span: 3, blocks: [{ t: "intro" }] }] },
        {
          stacks: [
            { span: 1, blocks: [{ t: "poi", id: "naha" }] },
            { span: 1, blocks: [{ t: "figure", photo: { motif: "gate", aspect: 1, caption: "La porte Shureimon, château de Shuri", wiki: "shureimon", seed: 0 } }, { t: "poi", id: "shuri-jo" }] },
            { span: 1, blocks: [{ t: "sidebar", id: "ryukyu" }] },
          ],
        },
        {
          stacks: [
            { span: 2, blocks: [{ t: "figure", photo: { motif: "reef", aspect: 2, caption: "Le château de Shuri, reconstruit après la guerre", wiki: "shuri-castle", seed: 0 } }] },
            { span: 1, blocks: [{ t: "poi", id: "churaumi" }] },
          ],
        },
      ],
    },
  ],
};
