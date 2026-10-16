export type RegionId =
  | "tokyo"
  | "centre-honshu"
  | "kyoto"
  | "ouest-honshu"
  | "shikoku"
  | "kyushu"
  | "okinawa"
  | "nord-honshu"
  | "hokkaido";

/** Motifs des visuels de substitution (SVG) — à remplacer par de vraies photos via `src`. */
export type PhotoMotif =
  | "castle"
  | "harbor"
  | "garden"
  | "market"
  | "volcano"
  | "street"
  | "torii"
  | "bridge"
  | "sea"
  | "pagoda"
  | "tulips"
  | "ship"
  | "doll"
  | "samurai"
  | "sulfur"
  | "pilgrim"
  | "festival"
  | "gate"
  | "skyline"
  | "cherry"
  | "reef"
  | "snow"
  | "hotspring"
  | "mountain";

export interface PhotoSpec {
  motif: PhotoMotif;
  /** largeur / hauteur */
  aspect: number;
  caption?: string;
  /** détourage (figurine posée sur le papier, sans cadre) */
  cutout?: boolean;
  /** URL d'une vraie photo (ex. Unsplash) ; sinon visuel SVG */
  src?: string;
  /** graine pour varier les teintes */
  seed?: number;
  /** clé d'une photographie Wikimedia Commons (voir src/data/photos.generated.ts) */
  wiki?: string;
  /** lieu auquel la photo est rattachée (sinon : le lieu de sa pile) */
  poi?: string;
}

export type AddressIcon =
  | "castle"
  | "temple"
  | "garden"
  | "museum"
  | "house"
  | "shop"
  | "park"
  | "church"
  | "market"
  | "peace"
  | "theme"
  | "onsen"
  | "mountain"
  | "boat"
  | "cable";

export interface PracticalEntry {
  id?: string;
  name: string;
  icon: AddressIcon;
  address?: string;
  phone?: string;
  /** « t.l.j. », « mar.-dim. »… */
  hours?: string;
  /** accès / transport */
  transit?: string;
  /** tarification : payant, gratuit… */
  admission?: "paid" | "free";
  /** précision en italique (« 2e étage », « gratuit le 3e samedi »…) */
  note?: string;
  /** description courte, sous la fiche (comme « Peace Park » dans le guide) */
  text?: string;
}

export interface PoiMeta {
  /** « Préfecture de Kumamoto. » */
  prefecture?: string;
  population?: string;
  /** gare, car, bateau… plusieurs allers-retours possibles */
  transit?: { mode: "train" | "bus" | "boat" | "car" | "plane" | "cable"; text: string }[];
  info?: string;
  festival?: string;
  plan?: string;
  web?: string;
}

export interface Poi {
  id: string;
  /** numéro de la pastille, comme sur la carte du guide */
  marker: number;
  name: string;
  nameJa: string;
  /** longitude, latitude (cartes géographiques) */
  geo?: [number, number];
  /** coordonnées dans le plan stylisé (0-1000) */
  plan?: [number, number];
  meta: PoiMeta;
  /** paragraphes — `**gras**`, `*italique*`, `^{e}` */
  body: string[];
  practical?: PracticalEntry[];
  /** secteur du chapitre (ex. Tokyo : centre / nord / ouest) */
  section?: string;
  /** figurine détourée ou photo flottant à côté des fiches (ex. garde de château) */
  aside?: PhotoSpec;
}

export interface Sidebar {
  id: string;
  title: string;
  paragraphs: string[];
  italic?: boolean;
  figure?: PhotoSpec;
}

export type Block =
  | { t: "intro" }
  | { t: "poi"; id: string }
  | { t: "figure"; photo: PhotoSpec }
  | { t: "sidebar"; id: string; poi?: string }
  | { t: "howto"; title: string; paragraphs: string[] };

export interface Stack {
  /** nombre de colonnes occupées (1, 2 ou 3) */
  span: 1 | 2 | 3;
  blocks: Block[];
}

export interface Band {
  stacks: Stack[];
}

export interface BookPage {
  bands: Band[];
}

export interface MapLabel {
  text: string;
  geo?: [number, number];
  xy?: [number, number];
  kind: "sea" | "place" | "relief";
  rotate?: number;
}

export interface RegionContent {
  regionId: RegionId;
  /** premier folio du chapitre */
  startFolio: number;
  /** « LE JAPON RÉGION PAR RÉGION » */
  runningTitle: string;
  /** titre courant de la page de droite */
  sectionTitle: string;
  intro: { title: string; paragraphs: string[]; figure?: PhotoSpec; wide?: PhotoSpec };
  pois: Poi[];
  sidebars: Sidebar[];
  pages: BookPage[];
  mapLabels: MapLabel[];
  mapTitle: string;
  /** nom du groupe de repères voisins, sur la carte large (ex. « Nord de Tokyo ») */
  clusterLabel?: string;
  /** sous-chapitres (Tokyo : Le Centre, Le Nord, L'Ouest) — un plan par secteur */
  sections?: { id: string; name: string; short: string; pages?: [number, number]; labelDir?: "top" | "bottom" | "left" | "right" }[];
}

export interface Region {
  id: RegionId;
  name: string;
  nameJa: string;
  /** « Le Centre de Honshu » → article inclus */
  color: string;
  onColor: string;
  pages: [number, number];
  summary: string;
  highlights: string[];
  photo: PhotoSpec;
  /** « both » : carte régionale large + plan de quartier */
  mapKind: "geo" | "plan" | "both";
}
