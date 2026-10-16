/**
 * Plans de quartier stylisés (Tokyo-nord, Kyoto), dans l'esprit des « plans précis »
 * du guide : fond jaune pâle, parcs verts, rivières bleues, lignes de métro colorées.
 * Repère 1000 × 1000.
 */
export interface PlanLayer {
  d: string;
  fill?: string;
  stroke?: string;
  width?: number;
  dash?: string;
  cap?: "round" | "butt";
  opacity?: number;
}

export interface PlanLabel {
  text: string;
  x: number;
  y: number;
  kind: "park" | "water" | "place" | "line" | "district";
  rotate?: number;
  anchor?: "start" | "middle" | "end";
}

export interface PlanStation {
  x: number;
  y: number;
  name?: string;
  dx?: number;
  dy?: number;
}

export interface PlanData {
  title: string;
  background: string;
  layers: PlanLayer[];
  labels: PlanLabel[];
  stations: PlanStation[];
}

/** Réseau de rues : traits blancs légèrement irréguliers (déterministe). */
function streets(seed: number, step = 46): string {
  const parts: string[] = [];
  let s = seed;
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  for (let y = 20; y < 1000; y += step + Math.round(rnd() * 26)) {
    const tilt = (rnd() - 0.5) * 36;
    parts.push(`M-10 ${y} L1010 ${Math.round(y + tilt)}`);
  }
  for (let x = 20; x < 1000; x += step + Math.round(rnd() * 26)) {
    const tilt = (rnd() - 0.5) * 36;
    parts.push(`M${x} -10 L${Math.round(x + tilt)} 1010`);
  }
  return parts.join(" ");
}

export const PLANS: Record<"tokyo" | "kyoto", PlanData> = {
  tokyo: {
    title: "Le nord de Tokyo",
    background: "#f2eec8",
    layers: [
      { d: streets(7), stroke: "#ffffff", width: 5, opacity: 0.95 },
      { d: streets(21, 90), stroke: "#ffffff", width: 9, opacity: 0.95 },
      // Parc d'Ueno
      {
        d: "M305 262 Q305 232 338 232 L492 232 Q526 232 526 266 L526 524 Q526 562 490 562 L340 562 Q305 562 305 526Z",
        fill: "#bfdc9c",
        stroke: "#8fb86a",
        width: 2,
      },
      // étang de Shinobazu
      { d: "M330 492 C 330 440 450 430 462 486 C 470 540 340 556 330 492Z", fill: "#a8d6e8", stroke: "#6fb0cb", width: 2 },
      // cimetière de Yanaka
      { d: "M105 215 L255 205 L268 395 L110 405Z", fill: "#cfe3b0", stroke: "#a3c37e", width: 2 },
      // temples / jardins secondaires
      { d: "M700 120 L820 112 L830 210 L712 220Z", fill: "#cfe3b0", opacity: 0.8 },
      { d: "M620 790 L760 780 L770 900 L630 910Z", fill: "#cfe3b0", opacity: 0.8 },
      // Sumida
      { d: "M1015 -10 C 962 120 990 240 955 360 S 930 630 992 780 S 962 925 1015 1015", stroke: "#a8d6e8", width: 54, cap: "butt" },
      { d: "M1015 -10 C 962 120 990 240 955 360 S 930 630 992 780 S 962 925 1015 1015", stroke: "#8fc6de", width: 3, cap: "butt" },
      // JR Yamanote
      { d: "M566 -10 L556 190 L540 330 L522 452 L548 612 L604 760 L646 1010", stroke: "#111111", width: 7, cap: "butt" },
      { d: "M566 -10 L556 190 L540 330 L522 452 L548 612 L604 760 L646 1010", stroke: "#ffffff", width: 3, dash: "10 10", cap: "butt" },
      // ligne Ginza (orange)
      { d: "M430 446 L520 446 L690 452 L772 436 L884 352", stroke: "#f39700", width: 6, cap: "round" },
      // ligne Hibiya (argent)
      { d: "M500 452 L540 566 L588 660 L640 720", stroke: "#9aa5ad", width: 6, cap: "round" },
    ],
    stations: [
      { x: 520, y: 448, name: "Ueno", dx: -64, dy: 28 },
      { x: 560, y: 572, name: "Okachimachi", dx: 14, dy: 22 },
      { x: 691, y: 452, name: "Inaricho", dx: -24, dy: -16 },
      { x: 772, y: 437, name: "Tawaramachi", dx: -22, dy: 26 },
      { x: 884, y: 352, name: "Asakusa", dx: 14, dy: 24 },
      { x: 224, y: 96, name: "Nippori", dx: 14, dy: 4 },
    ],
    labels: [
      { text: "Parc d'Ueno", x: 415, y: 332, kind: "park" },
      { text: "Shinobazu-ike", x: 395, y: 518, kind: "water" },
      { text: "Cimetière de Yanaka", x: 188, y: 305, kind: "park", rotate: -4 },
      { text: "Sumida-gawa", x: 966, y: 560, kind: "water", rotate: 84 },
      { text: "Ameyoko", x: 603, y: 603, kind: "district" },
      { text: "Kappabashi-dori", x: 748, y: 505, kind: "district", rotate: 6 },
      { text: "Sensō-ji", x: 868, y: 292, kind: "place", anchor: "end" },
      { text: "Ligne JR Yamanote", x: 590, y: 96, kind: "line", rotate: 87 },
      { text: "Ligne Ginza", x: 692, y: 424, kind: "line", rotate: 1 },
    ],
  },
  kyoto: {
    title: "Kyoto",
    background: "#f2eec8",
    layers: [
      { d: streets(33, 38), stroke: "#ffffff", width: 4, opacity: 0.95 },
      // collines de Higashiyama et Kitayama
      { d: "M690 -10 L1010 -10 L1010 1010 L760 1010 C 720 880 740 780 700 640 C 670 520 720 420 690 300 C 670 180 700 90 690 -10Z", fill: "#cfe1a8", stroke: "#a8c47d", width: 2 },
      { d: "M-10 -10 L690 -10 C 600 60 400 80 260 70 C 120 60 40 100 -10 140Z", fill: "#cfe1a8", opacity: 0.85 },
      { d: "M-10 380 C 40 420 70 520 40 620 L-10 700Z", fill: "#cfe1a8", opacity: 0.85 },
      // parc du Palais impérial
      { d: "M455 300 L585 296 L590 470 L460 474Z", fill: "#bfdc9c", stroke: "#8fb86a", width: 2 },
      // château de Nijo
      { d: "M345 430 L435 428 L438 506 L348 508Z", fill: "#cfe3b0", stroke: "#8fb86a", width: 2 },
      { d: "M360 442 L424 441 L426 494 L362 495Z", stroke: "#8f8f6a", width: 1.5 },
      // rivière Kamo (est), Katsura (ouest)
      { d: "M606 -10 C 590 160 640 320 612 470 S 590 700 640 1010", stroke: "#a8d6e8", width: 30, cap: "butt" },
      { d: "M-10 410 C 90 410 140 540 250 590 S 330 820 400 1010", stroke: "#a8d6e8", width: 22, cap: "butt" },
      // JR Tokaido / Shinkansen (sud)
      { d: "M-10 770 L 380 756 L 470 746 L 1010 700", stroke: "#111111", width: 7, cap: "butt" },
      { d: "M-10 770 L 380 756 L 470 746 L 1010 700", stroke: "#ffffff", width: 3, dash: "10 10", cap: "butt" },
      // Karasuma (métro vert) / Tozai (rouge)
      { d: "M488 -10 L 488 746 L 492 1010", stroke: "#3a9f5a", width: 6, cap: "round" },
      { d: "M120 470 L 360 478 L 470 478 L 612 492 L 770 540", stroke: "#d2232a", width: 6, cap: "round" },
    ],
    stations: [
      { x: 470, y: 748, name: "Kyoto", dx: -14, dy: 30 },
      { x: 488, y: 478, name: "Karasuma-Oike", dx: -108, dy: -14 },
      { x: 612, y: 492, name: "Sanjo", dx: 12, dy: -10 },
    ],
    labels: [
      { text: "Gosho", x: 522, y: 392, kind: "park" },
      { text: "Nijo-jo", x: 392, y: 470, kind: "place" },
      { text: "Kamo-gawa", x: 598, y: 700, kind: "water", rotate: 85 },
      { text: "Katsura-gawa", x: 142, y: 560, kind: "water", rotate: 48 },
      { text: "Higashiyama", x: 850, y: 400, kind: "district", rotate: 82 },
      { text: "Kitayama", x: 320, y: 62, kind: "district" },
      { text: "Gare de Kyoto", x: 380, y: 806, kind: "place" },
      { text: "Ligne JR Tokaido", x: 760, y: 732, kind: "line", rotate: -3 },
    ],
  },
};
