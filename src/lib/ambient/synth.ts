import type { NoiseKind, Preset, VoiceKind } from "./presets";

export type Rng = () => number;
export const mtof = (m: number) => 440 * Math.pow(2, (m - 69) / 12);
const between = (rng: Rng, [a, b]: [number, number]) => a + rng() * (b - a);

/** Contexte de sortie : un bus sec + un envoi de réverbération (partagés par toutes les voix). */
export interface Out {
  ctx: BaseAudioContext;
  dry: AudioNode;
  send: AudioNode;
}

function env(ctx: BaseAudioContext, t: number, peak: number, attack: number, decay: number): GainNode {
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(peak, t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay);
  return g;
}

function route(o: Out, n: AudioNode, reverb: number) {
  n.connect(o.dry);
  const s = o.ctx.createGain();
  s.gain.value = reverb;
  n.connect(s);
  s.connect(o.send);
}

function noiseBuffer(ctx: BaseAudioContext, seconds = 4): AudioBuffer {
  const b = ctx.createBuffer(1, Math.floor(ctx.sampleRate * seconds), ctx.sampleRate);
  const d = b.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  return b;
}

/** Corde pincée : partiels harmoniques à extinction rapide, léger glissando d'attaque. */
function pluck(o: Out, f: number, t: number, vel: number, opt: { decay: number; bright: number; bend: number; partials?: number[] }, reverb: number) {
  const { ctx } = o;
  const partials = opt.partials ?? [1, 2, 3.01, 4.02, 5.5];
  const amps = [1, 0.5 * opt.bright, 0.28 * opt.bright, 0.14 * opt.bright, 0.07 * opt.bright];
  const out = ctx.createGain();
  out.gain.value = 1;
  partials.forEach((p, i) => {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(f * p * (1 + opt.bend), t);
    osc.frequency.exponentialRampToValueAtTime(f * p, t + 0.07);
    const g = env(ctx, t, vel * amps[i], 0.004, opt.decay / (1 + i * 0.7));
    osc.connect(g).connect(out);
    osc.start(t);
    osc.stop(t + opt.decay + 0.2);
  });
  // claquement du plectre
  const n = ctx.createBufferSource();
  n.buffer = noiseBuffer(ctx, 0.2);
  const hp = ctx.createBiquadFilter();
  hp.type = "bandpass";
  hp.frequency.value = Math.min(6000, f * 5);
  hp.Q.value = 1.2;
  const ng = env(ctx, t, vel * 0.35, 0.001, 0.035);
  n.connect(hp).connect(ng).connect(out);
  n.start(t);
  n.stop(t + 0.1);
  route(o, out, reverb);
}

/** Cloche : partiels inharmoniques à longue résonance. */
function bell(o: Out, f: number, t: number, vel: number, reverb: number, long = false) {
  const { ctx } = o;
  const out = ctx.createGain();
  const ratios = [1, 2.76, 5.4, 8.93];
  const amps = [1, 0.55, 0.3, 0.14];
  ratios.forEach((r, i) => {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = f * r;
    const g = env(ctx, t, vel * amps[i], 0.003, (long ? 9 : 4.5) / (1 + i * 0.55));
    osc.connect(g).connect(out);
    osc.start(t);
    osc.stop(t + (long ? 10 : 5.5));
  });
  route(o, out, reverb);
}

/** Flûte (shakuhachi) : sinus + souffle, attaque lente, vibrato. */
function flute(o: Out, f: number, t: number, dur: number, vel: number, reverb: number) {
  const { ctx } = o;
  const out = ctx.createGain();
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(f * 0.985, t);
  osc.frequency.linearRampToValueAtTime(f, t + 0.25);
  const lfo = ctx.createOscillator();
  lfo.frequency.value = 4.6 + Math.random();
  const lfoG = ctx.createGain();
  lfoG.gain.setValueAtTime(0, t);
  lfoG.gain.linearRampToValueAtTime(f * 0.006, t + dur * 0.6);
  lfo.connect(lfoG).connect(osc.frequency);
  const osc2 = ctx.createOscillator();
  osc2.type = "triangle";
  osc2.frequency.value = f * 2;
  const g2 = ctx.createGain();
  g2.gain.value = 0.12;
  osc2.connect(g2);
  const eg = ctx.createGain();
  eg.gain.setValueAtTime(0.0001, t);
  eg.gain.linearRampToValueAtTime(vel, t + 0.45);
  eg.gain.setValueAtTime(vel * 0.9, t + dur - 0.2);
  eg.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.9);
  osc.connect(eg);
  g2.connect(eg);
  // souffle
  const n = ctx.createBufferSource();
  n.buffer = noiseBuffer(ctx, 3);
  n.loop = true;
  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = f * 2.2;
  bp.Q.value = 2.5;
  const ng = ctx.createGain();
  ng.gain.setValueAtTime(0.0001, t);
  ng.gain.linearRampToValueAtTime(vel * 0.5, t + 0.15);
  ng.gain.exponentialRampToValueAtTime(vel * 0.08, t + 0.9);
  ng.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.8);
  n.connect(bp).connect(ng).connect(eg);
  eg.connect(out);
  for (const s of [osc, osc2, lfo]) {
    s.start(t);
    s.stop(t + dur + 1.2);
  }
  n.start(t);
  n.stop(t + dur + 1.2);
  route(o, out, reverb);
}

/** Tambour grave lointain (taiko) : sinus à chute de hauteur + queue de bruit. */
function drum(o: Out, t: number, vel: number, reverb: number) {
  const { ctx } = o;
  const out = ctx.createGain();
  const osc = ctx.createOscillator();
  osc.frequency.setValueAtTime(110, t);
  osc.frequency.exponentialRampToValueAtTime(48, t + 0.35);
  osc.connect(env(ctx, t, vel, 0.005, 0.9)).connect(out);
  osc.start(t);
  osc.stop(t + 1.2);
  const n = ctx.createBufferSource();
  n.buffer = noiseBuffer(ctx, 0.5);
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 400;
  n.connect(lp).connect(env(ctx, t, vel * 0.5, 0.002, 0.18)).connect(out);
  n.start(t);
  n.stop(t + 0.4);
  route(o, out, reverb);
}

function playVoice(o: Out, kind: VoiceKind, f: number, t: number, vel: number, p: Preset, rng: Rng) {
  const r = p.reverb;
  switch (kind) {
    case "koto":
      return pluck(o, f, t, vel, { decay: 3.2, bright: 0.9, bend: 0.012 }, r);
    case "shamisen":
      return pluck(o, f, t, vel * 1.05, { decay: 1.4, bright: 1.5, bend: 0.006, partials: [1, 2, 3, 4.01, 6.2] }, r * 0.7);
    case "sanshin":
      return pluck(o, f, t, vel * 1.1, { decay: 1.0, bright: 1.7, bend: 0.004, partials: [1, 2, 3.02, 4.1, 5.8] }, r * 0.6);
    case "bell":
      return bell(o, f * 2, t, vel * 0.8, r * 1.1);
    case "glass":
      return bell(o, f * 2, t, vel * 0.55, r);
    case "flute":
      return flute(o, f, t, 1.6 + rng() * 2.2, vel * 0.9, r);
  }
}

/** Dégrés → hauteur MIDI selon la gamme du preset. */
export function degreeToMidi(p: Preset, deg: number): number {
  const L = p.scale.length;
  const oct = Math.floor(deg / L);
  const idx = ((deg % L) + L) % L;
  return p.root + p.lift + oct * 12 + p.scale[idx];
}

/** Joue une phrase mélodique (marche aléatoire sur la gamme) ; renvoie sa durée en secondes. */
export function schedulePhrase(o: Out, p: Preset, t0: number, rng: Rng, st: { deg: number }): number {
  const n = Math.round(between(rng, p.phraseLen));
  const maxDeg = p.scale.length * p.octaves;
  let t = t0;
  for (let i = 0; i < n; i++) {
    const steps = [-2, -1, -1, 0, 1, 1, 2, 3, -3];
    st.deg = Math.min(maxDeg, Math.max(0, st.deg + steps[Math.floor(rng() * steps.length)]));
    const roll = rng();
    let acc = 0;
    let kind = p.voices[0][0];
    for (const [k, w] of p.voices) {
      acc += w;
      if (roll <= acc) {
        kind = k;
        break;
      }
    }
    const vel = 0.1 + rng() * 0.07;
    playVoice(o, kind, mtof(degreeToMidi(p, st.deg)), t, vel, p, rng);
    t += between(rng, p.tempo) * (i === n - 1 ? 1.5 : 1);
  }
  return t - t0;
}

export function strikeOnce(o: Out, p: Preset, t: number) {
  if (!p.strike) return;
  if (p.strike.kind === "bell") bell(o, mtof(p.root - 12), t, p.strike.gain * 0.3, p.reverb * 1.3, true);
  else drum(o, t, p.strike.gain * 0.5, p.reverb);
}

/** Bourdon : fondamentale et quinte, très doux, avec lente respiration. */
export function startDrone(o: Out, p: Preset, t: number): AudioNode[] {
  const { ctx } = o;
  const master = ctx.createGain();
  master.gain.value = p.droneGain;
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 520;
  const breath = ctx.createGain();
  breath.gain.value = 0.7;
  const lfo = ctx.createOscillator();
  lfo.frequency.value = 0.06;
  const lfoG = ctx.createGain();
  lfoG.gain.value = 0.3;
  lfo.connect(lfoG).connect(breath.gain);
  const nodes: AudioNode[] = [lfo];
  [p.root - 24, p.root - 24 + 7, p.root - 12].forEach((m, i) => {
    for (const det of [-4, 4]) {
      const osc = ctx.createOscillator();
      osc.type = "triangle";
      osc.frequency.value = mtof(m);
      osc.detune.value = det;
      const g = ctx.createGain();
      g.gain.value = i === 1 ? 0.5 : 0.8;
      osc.connect(g).connect(lp);
      osc.start(t);
      nodes.push(osc);
    }
  });
  lp.connect(breath).connect(master);
  route(o, master, 0.8);
  lfo.start(t);
  return nodes;
}

/** Bruit d'ambiance (vent, mer, pluie…) avec modulation lente. */
export function startNoise(o: Out, kind: NoiseKind, gain: number, t: number): AudioNode[] {
  const { ctx } = o;
  const src = ctx.createBufferSource();
  src.buffer = noiseBuffer(ctx, 5);
  src.loop = true;
  const out = ctx.createGain();
  out.gain.value = gain;
  const nodes: AudioNode[] = [src];
  const f1 = ctx.createBiquadFilter();
  let last: AudioNode = src;
  const modulate = (param: AudioParam, hz: number, depth: number) => {
    const lfo = ctx.createOscillator();
    lfo.frequency.value = hz;
    const g = ctx.createGain();
    g.gain.value = depth;
    lfo.connect(g).connect(param);
    lfo.start(t);
    nodes.push(lfo);
  };
  switch (kind) {
    case "wind":
      f1.type = "bandpass";
      f1.frequency.value = 480;
      f1.Q.value = 0.8;
      modulate(f1.frequency, 0.07, 220);
      modulate(out.gain, 0.11, gain * 0.5);
      break;
    case "snow":
      f1.type = "bandpass";
      f1.frequency.value = 330;
      f1.Q.value = 0.6;
      modulate(f1.frequency, 0.05, 140);
      modulate(out.gain, 0.08, gain * 0.55);
      break;
    case "sea":
      f1.type = "lowpass";
      f1.frequency.value = 650;
      modulate(out.gain, 0.105, gain * 0.8);
      break;
    case "rain":
      f1.type = "highpass";
      f1.frequency.value = 1700;
      break;
    case "brook":
      f1.type = "bandpass";
      f1.frequency.value = 2300;
      f1.Q.value = 0.9;
      modulate(out.gain, 0.7, gain * 0.35);
      break;
    case "city":
      f1.type = "lowpass";
      f1.frequency.value = 190;
      modulate(out.gain, 0.03, gain * 0.2);
      break;
  }
  last.connect(f1);
  last = f1;
  last.connect(out);
  out.connect(o.dry);
  src.start(t);
  return nodes;
}

/** Réponse impulsionnelle de réverbération (bruit à décroissance exponentielle). */
export function makeImpulse(ctx: BaseAudioContext, seconds = 3.2): AudioBuffer {
  const len = Math.floor(ctx.sampleRate * seconds);
  const b = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let c = 0; c < 2; c++) {
    const d = b.getChannelData(c);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6);
  }
  return b;
}

export const randBetween = between;
