/**
 * Ambiances sonores par région. Tout est synthétisé dans le navigateur (Web Audio) :
 * gammes pentatoniques japonaises, timbres de cordes pincées / flûte / cloche, bruits de fond.
 */
export type VoiceKind = "koto" | "shamisen" | "sanshin" | "bell" | "flute" | "glass";
export type NoiseKind = "wind" | "sea" | "rain" | "brook" | "city" | "snow";

export interface Preset {
  id: string;
  /** libellé affiché (info-bulle) */
  label: string;
  /** note fondamentale (MIDI) */
  root: number;
  /** degrés de la gamme, en demi-tons */
  scale: number[];
  /** nombre d'octaves parcourues au-dessus de la fondamentale */
  octaves: number;
  /** décalage d'octave de la mélodie (en demi-tons, multiple de 12) */
  lift: number;
  voices: [VoiceKind, number][];
  /** secondes entre deux notes d'une phrase */
  tempo: [number, number];
  phraseLen: [number, number];
  /** silence entre deux phrases (s) */
  rest: [number, number];
  droneGain: number;
  noise?: { kind: NoiseKind; gain: number };
  /** cloche grave ou tambour, à intervalles espacés (s) */
  strike?: { kind: "bell" | "drum"; every: [number, number]; gain: number };
  reverb: number;
}

// gammes (demi-tons depuis la fondamentale)
const HIRAJOSHI = [0, 2, 3, 7, 8];
const IN = [0, 1, 5, 7, 8]; // miyako-bushi
const YO = [0, 2, 5, 7, 9];
const RYUKYU = [0, 4, 5, 7, 11];
const IWATO = [0, 1, 5, 6, 10];

export const PRESETS: Record<string, Preset> = {
  home: {
    id: "home",
    label: "Le Japon — koto et vent léger",
    root: 62,
    scale: HIRAJOSHI,
    octaves: 2,
    lift: 0,
    voices: [["koto", 1]],
    tempo: [0.9, 1.8],
    phraseLen: [3, 6],
    rest: [3, 6],
    droneGain: 0.05,
    noise: { kind: "wind", gain: 0.045 },
    reverb: 0.5,
  },
  tokyo: {
    id: "tokyo",
    label: "Tokyo — shamisen, verre et rumeur de la ville",
    root: 64,
    scale: YO,
    octaves: 2,
    lift: 0,
    voices: [
      ["shamisen", 0.55],
      ["glass", 0.45],
    ],
    tempo: [0.45, 1.1],
    phraseLen: [4, 8],
    rest: [2.5, 5],
    droneGain: 0.04,
    noise: { kind: "city", gain: 0.06 },
    reverb: 0.4,
  },
  "centre-honshu": {
    id: "centre-honshu",
    label: "Centre de Honshu — shakuhachi, torrent de montagne",
    root: 57,
    scale: YO,
    octaves: 2,
    lift: 12,
    voices: [
      ["flute", 0.7],
      ["koto", 0.3],
    ],
    tempo: [1.6, 3],
    phraseLen: [2, 4],
    rest: [4, 8],
    droneGain: 0.045,
    noise: { kind: "brook", gain: 0.05 },
    reverb: 0.55,
  },
  kyoto: {
    id: "kyoto",
    label: "Kyoto — cloche de temple, koto et pluie fine",
    root: 62,
    scale: IN,
    octaves: 2,
    lift: 0,
    voices: [
      ["koto", 0.85],
      ["bell", 0.15],
    ],
    tempo: [0.8, 1.7],
    phraseLen: [3, 5],
    rest: [4, 8],
    droneGain: 0.04,
    noise: { kind: "rain", gain: 0.035 },
    strike: { kind: "bell", every: [16, 26], gain: 0.3 },
    reverb: 0.7,
  },
  "ouest-honshu": {
    id: "ouest-honshu",
    label: "Ouest de Honshu — koto, shamisen et mer Intérieure",
    root: 59,
    scale: HIRAJOSHI,
    octaves: 2,
    lift: 12,
    voices: [
      ["koto", 0.6],
      ["shamisen", 0.4],
    ],
    tempo: [0.7, 1.5],
    phraseLen: [3, 7],
    rest: [3, 6],
    droneGain: 0.045,
    noise: { kind: "sea", gain: 0.05 },
    reverb: 0.5,
  },
  shikoku: {
    id: "shikoku",
    label: "Shikoku — pèlerinage : flûte, clochette et vagues",
    root: 60,
    scale: YO,
    octaves: 2,
    lift: 0,
    voices: [
      ["flute", 0.55],
      ["bell", 0.45],
    ],
    tempo: [1.4, 2.6],
    phraseLen: [2, 4],
    rest: [4, 9],
    droneGain: 0.045,
    noise: { kind: "sea", gain: 0.06 },
    reverb: 0.6,
  },
  kyushu: {
    id: "kyushu",
    label: "Kyushu — pays du feu : taiko lointain, koto, vent chaud",
    root: 57,
    scale: IWATO,
    octaves: 2,
    lift: 12,
    voices: [
      ["koto", 0.8],
      ["flute", 0.2],
    ],
    tempo: [0.8, 1.6],
    phraseLen: [3, 6],
    rest: [3, 7],
    droneGain: 0.07,
    noise: { kind: "wind", gain: 0.05 },
    strike: { kind: "drum", every: [9, 16], gain: 0.42 },
    reverb: 0.55,
  },
  okinawa: {
    id: "okinawa",
    label: "Okinawa — sanshin et ressac",
    root: 60,
    scale: RYUKYU,
    octaves: 2,
    lift: 0,
    voices: [["sanshin", 1]],
    tempo: [0.38, 0.8],
    phraseLen: [4, 9],
    rest: [2, 4],
    droneGain: 0.03,
    noise: { kind: "sea", gain: 0.085 },
    reverb: 0.35,
  },
  "nord-honshu": {
    id: "nord-honshu",
    label: "Nord de Honshu — flûte solitaire et vent de neige",
    root: 55,
    scale: IN,
    octaves: 2,
    lift: 12,
    voices: [
      ["flute", 0.8],
      ["koto", 0.2],
    ],
    tempo: [1.8, 3.4],
    phraseLen: [2, 4],
    rest: [5, 10],
    droneGain: 0.05,
    noise: { kind: "snow", gain: 0.06 },
    reverb: 0.7,
  },
  hokkaido: {
    id: "hokkaido",
    label: "Hokkaido — grands espaces, bourdon et vent",
    root: 52,
    scale: YO,
    octaves: 2,
    lift: 12,
    voices: [
      ["flute", 0.75],
      ["glass", 0.25],
    ],
    tempo: [2, 3.8],
    phraseLen: [2, 3],
    rest: [6, 12],
    droneGain: 0.09,
    noise: { kind: "wind", gain: 0.07 },
    reverb: 0.8,
  },
};

export const trackFor = (id: string | null | undefined): Preset => PRESETS[id ?? "home"] ?? PRESETS.home;
