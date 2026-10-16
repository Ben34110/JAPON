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

export const PLANS: Record<string, PlanData> = {
  "tokyo-nord": {
    title: "Le Nord de Tokyo",
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
  "tokyo-centre": {
    title: "Le Centre de Tokyo",
    background: "#f2eec8",
    layers: [
      { d: streets(11), stroke: "#ffffff", width: 5, opacity: 0.95 },
      { d: streets(52, 90), stroke: "#ffffff", width: 9, opacity: 0.95 },
      // baie de Tokyo (sud-est)
      { d: "M690 905 C 790 870 900 900 1010 860 L1010 1010 L690 1010Z", fill: "#a8d6e8", stroke: "#8fc6de", width: 2 },
      // Sumida
      { d: "M1015 120 C 960 260 985 380 950 520 S 930 700 960 840", stroke: "#a8d6e8", width: 44, cap: "butt" },
      // douves et jardins du Palais impérial
      { d: "M318 292 Q318 262 350 262 L520 262 Q552 262 552 294 L552 520 Q552 556 518 556 L352 556 Q318 556 318 522Z", fill: "#bfdc9c", stroke: "#8fb86a", width: 2 },
      { d: "M300 276 Q300 244 336 244 L536 244 Q570 244 570 280 L570 536 Q570 574 534 574 L336 574 Q300 574 300 536Z", stroke: "#a8d6e8", width: 14 },
      // parc de Hibiya
      { d: "M468 604 L580 598 L588 676 L474 684Z", fill: "#bfdc9c", stroke: "#8fb86a", width: 2 },
      // jardin Hamarikyu
      { d: "M810 770 L915 764 L920 858 L816 866Z", fill: "#bfdc9c", stroke: "#8fb86a", width: 2 },
      { d: "M810 770 L915 764 L920 858 L816 866Z", stroke: "#a8d6e8", width: 8 },
      // JR Yamanote / Chuo
      { d: "M596 -10 L632 240 L646 462 L630 640 L690 790 L712 1010", stroke: "#111111", width: 7, cap: "butt" },
      { d: "M596 -10 L632 240 L646 462 L630 640 L690 790 L712 1010", stroke: "#ffffff", width: 3, dash: "10 10", cap: "butt" },
      // Marunouchi (rouge), Ginza (orange), Hibiya (argent)
      { d: "M120 440 L 360 452 L 646 468 L 760 340 L 780 160", stroke: "#d2232a", width: 6, cap: "round" },
      { d: "M300 640 L 520 630 L 756 664 L 960 700", stroke: "#f39700", width: 6, cap: "round" },
      { d: "M650 250 L 700 560 L 756 664 L 870 800", stroke: "#9aa5ad", width: 6, cap: "round" },
    ],
    stations: [
      { x: 646, y: 466, name: "Tokyo", dx: 14, dy: -12 },
      { x: 756, y: 664, name: "Ginza", dx: 14, dy: 26 },
      { x: 700, y: 560, name: "Hibiya", dx: -62, dy: 4 },
      { x: 632, y: 238, name: "Kanda", dx: 14, dy: 4 },
      { x: 870, y: 800, name: "Tsukijishijo", dx: -92, dy: 34 },
    ],
    labels: [
      { text: "Palais impérial", x: 436, y: 330, kind: "park" },
      { text: "Hibiya-koen", x: 528, y: 646, kind: "park" },
      { text: "Hamarikyu", x: 866, y: 838, kind: "park" },
      { text: "Sumida-gawa", x: 960, y: 420, kind: "water", rotate: 84 },
      { text: "Baie de Tokyo", x: 860, y: 950, kind: "water" },
      { text: "Marunouchi", x: 540, y: 470, kind: "district" },
      { text: "Yaesu", x: 700, y: 430, kind: "district" },
      { text: "Ligne JR Yamanote", x: 606, y: 120, kind: "line", rotate: 83 },
      { text: "Ligne Ginza", x: 410, y: 618, kind: "line", rotate: 1 },
    ],
  },
  "tokyo-ouest": {
    title: "L’Ouest de Tokyo",
    background: "#f2eec8",
    layers: [
      { d: streets(71), stroke: "#ffffff", width: 5, opacity: 0.95 },
      { d: streets(93, 90), stroke: "#ffffff", width: 9, opacity: 0.95 },
      // forêt du Meiji-jingu et parc de Yoyogi
      { d: "M318 392 C 300 450 318 560 352 600 L 470 612 C 520 560 508 450 480 398 Z", fill: "#a8cd86", stroke: "#7da65a", width: 2 },
      { d: "M500 472 L 600 466 L 612 580 L 506 588Z", fill: "#bfdc9c", stroke: "#8fb86a", width: 2 },
      // Shinjuku-gyoen
      { d: "M586 196 L 716 188 L 726 300 L 594 310Z", fill: "#bfdc9c", stroke: "#8fb86a", width: 2 },
      // Aoyama / cimetière, Roppongi Hills
      { d: "M700 590 L 790 584 L 800 660 L 706 668Z", fill: "#cfe3b0", opacity: 0.85 },
      // rivière Shibuya (canalisée)
      { d: "M560 640 C 520 740 560 860 500 1010", stroke: "#a8d6e8", width: 14, cap: "butt" },
      // JR Yamanote
      { d: "M170 -10 L 300 130 L 350 252 L 420 420 L 440 574 L 470 774 L 560 1010", stroke: "#111111", width: 7, cap: "butt" },
      { d: "M170 -10 L 300 130 L 350 252 L 420 420 L 440 574 L 470 774 L 560 1010", stroke: "#ffffff", width: 3, dash: "10 10", cap: "butt" },
      // JR Chuo
      { d: "M-10 266 L 350 254", stroke: "#111111", width: 6, cap: "butt" },
      { d: "M-10 266 L 350 254", stroke: "#ffffff", width: 2.5, dash: "9 9", cap: "butt" },
      // Ginza (orange) vers Shibuya, Hanzomon (violet), Oedo (magenta)
      { d: "M470 774 L 640 700 L 790 630 L 960 560", stroke: "#f39700", width: 6, cap: "round" },
      { d: "M470 774 L 580 560 L 700 410 L 960 250", stroke: "#8f76d6", width: 6, cap: "round" },
      { d: "M350 254 L 560 420 L 700 560 L 800 730", stroke: "#b6007a", width: 6, cap: "round" },
    ],
    stations: [
      { x: 350, y: 254, name: "Shinjuku", dx: -66, dy: -14 },
      { x: 440, y: 574, name: "Harajuku", dx: 14, dy: 22 },
      { x: 470, y: 774, name: "Shibuya", dx: 14, dy: 24 },
      { x: 800, y: 730, name: "Roppongi", dx: 14, dy: 26 },
      { x: 420, y: 420, name: "Yoyogi", dx: -60, dy: 4 },
    ],
    labels: [
      { text: "Meiji-jingu", x: 402, y: 506, kind: "park" },
      { text: "Yoyogi-koen", x: 556, y: 532, kind: "park" },
      { text: "Shinjuku-gyoen", x: 656, y: 252, kind: "park" },
      { text: "Omotesando", x: 590, y: 640, kind: "district", rotate: -24 },
      { text: "Kabukicho", x: 420, y: 202, kind: "district" },
      { text: "Ligne JR Yamanote", x: 230, y: 160, kind: "line", rotate: 48 },
      { text: "Ligne Oedo", x: 700, y: 668, kind: "line", rotate: 54 },
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
