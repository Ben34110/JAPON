import { trackFor, type Preset } from "./presets";
import { makeImpulse, randBetween, schedulePhrase, startDrone, startNoise, strikeOnce, type Out } from "./synth";

interface Instance {
  id: string;
  bus: GainNode;
  nodes: AudioNode[];
  timers: number[];
  stopped: boolean;
}

type ACtor = typeof AudioContext;
const AudioCtor = (): ACtor | null =>
  typeof window === "undefined" ? null : (window.AudioContext ?? (window as unknown as { webkitAudioContext?: ACtor }).webkitAudioContext ?? null);

/**
 * Moteur d'ambiance : une instance par ambiance (région), fondu enchaîné d'environ 1,5 s entre deux ambiances.
 * Le contexte audio n'est créé que depuis un geste de l'utilisateur (politique d'autoplay des navigateurs).
 */
class AmbientEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private reverbIn: ConvolverNode | null = null;
  private current: Instance | null = null;
  private volume = 0.7;
  private wanted: string | null = null;

  /** À appeler dans un gestionnaire de clic / touche. */
  unlock(): boolean {
    const AC = AudioCtor();
    if (!AC) return false;
    if (!this.ctx) {
      const ctx = new AC();
      const comp = ctx.createDynamicsCompressor();
      comp.threshold.value = -20;
      comp.ratio.value = 3;
      const master = ctx.createGain();
      master.gain.value = this.volume * 0.8;
      const rev = ctx.createConvolver();
      rev.buffer = makeImpulse(ctx);
      const wet = ctx.createGain();
      wet.gain.value = 0.75;
      rev.connect(wet).connect(comp);
      master.connect(comp);
      comp.connect(ctx.destination);
      this.ctx = ctx;
      this.master = master;
      this.reverbIn = rev;
      document.addEventListener("visibilitychange", () => {
        if (!this.ctx) return;
        if (document.hidden) void this.ctx.suspend();
        else if (this.wanted) void this.ctx.resume();
      });
    }
    if (this.ctx.state === "suspended") void this.ctx.resume();
    return true;
  }

  get ready() {
    return !!this.ctx;
  }

  /** état courant (diagnostic) */
  debug() {
    return { ready: !!this.ctx, state: this.ctx?.state ?? null, track: this.current?.id ?? null, wanted: this.wanted };
  }

  setVolume(v: number) {
    this.volume = v;
    if (this.master && this.ctx) this.master.gain.setTargetAtTime(v * 0.8, this.ctx.currentTime, 0.1);
  }

  /** Lance (ou change) l'ambiance ; `null` pour couper. */
  play(id: string | null) {
    this.wanted = id;
    if (!id) return this.fadeOut();
    if (!this.ctx || !this.master || !this.reverbIn) return;
    if (this.ctx.state === "suspended") void this.ctx.resume();
    if (this.current?.id === id && !this.current.stopped) return;
    this.fadeOut();
    this.current = this.start(id);
  }

  private fadeOut(seconds = 1.4) {
    const inst = this.current;
    const ctx = this.ctx;
    this.current = null;
    if (!inst || !ctx) return;
    inst.stopped = true;
    inst.timers.forEach((t) => window.clearTimeout(t));
    inst.bus.gain.cancelScheduledValues(ctx.currentTime);
    inst.bus.gain.setValueAtTime(inst.bus.gain.value, ctx.currentTime);
    inst.bus.gain.linearRampToValueAtTime(0, ctx.currentTime + seconds);
    window.setTimeout(() => {
      inst.nodes.forEach((n) => {
        try {
          (n as OscillatorNode).stop?.();
        } catch {
          /* déjà arrêté */
        }
        n.disconnect();
      });
      inst.bus.disconnect();
    }, seconds * 1000 + 400);
  }

  private start(id: string): Instance {
    const ctx = this.ctx!;
    const preset = trackFor(id);
    const bus = ctx.createGain();
    bus.gain.setValueAtTime(0, ctx.currentTime);
    bus.gain.linearRampToValueAtTime(1, ctx.currentTime + 1.6);
    bus.connect(this.master!);
    const out: Out = { ctx, dry: bus, send: this.reverbIn! };
    const inst: Instance = { id: preset.id, bus, nodes: [], timers: [], stopped: false };
    const t0 = ctx.currentTime + 0.05;
    if (preset.droneGain > 0) inst.nodes.push(...startDrone(out, preset, t0));
    if (preset.noise) inst.nodes.push(...startNoise(out, preset.noise.kind, preset.noise.gain, t0));

    const st = { deg: Math.floor(preset.scale.length * 0.8) };
    const loop = () => {
      if (inst.stopped) return;
      const dur = schedulePhrase(out, preset, ctx.currentTime + 0.15, Math.random, st);
      inst.timers.push(window.setTimeout(loop, (dur + randBetween(Math.random, preset.rest)) * 1000));
    };
    inst.timers.push(window.setTimeout(loop, 1200));
    if (preset.strike) {
      const every = preset.strike.every;
      const strike = () => {
        if (inst.stopped) return;
        strikeOnce(out, preset, ctx.currentTime + 0.1);
        inst.timers.push(window.setTimeout(strike, randBetween(Math.random, every) * 1000));
      };
      inst.timers.push(window.setTimeout(strike, randBetween(Math.random, every) * 500 + 2500));
    }
    return inst;
  }
}

export const ambient = new AmbientEngine();

/**
 * Rend une ambiance hors ligne (tests) : renvoie le pic et le niveau RMS pour vérifier
 * qu'elle n'est ni muette ni saturée.
 */
export async function renderStats(id: string, seconds = 30): Promise<{ peak: number; rms: number }> {
  const sr = 22050;
  const ctx = new OfflineAudioContext(2, sr * seconds, sr);
  const preset: Preset = trackFor(id);
  const comp = ctx.createDynamicsCompressor();
  comp.threshold.value = -20;
  comp.ratio.value = 3;
  const master = ctx.createGain();
  master.gain.value = 0.56;
  const rev = ctx.createConvolver();
  rev.buffer = makeImpulse(ctx, 2);
  const wet = ctx.createGain();
  wet.gain.value = 0.75;
  rev.connect(wet).connect(comp);
  master.connect(comp);
  comp.connect(ctx.destination);
  const out: Out = { ctx, dry: master, send: rev };
  if (preset.droneGain > 0) startDrone(out, preset, 0);
  if (preset.noise) startNoise(out, preset.noise.kind, preset.noise.gain, 0);
  const st = { deg: Math.floor(preset.scale.length * 0.8) };
  let t = 1;
  while (t < seconds - 4) t += schedulePhrase(out, preset, t, Math.random, st) + randBetween(Math.random, preset.rest);
  if (preset.strike) for (let k = 3; k < seconds - 4; k += randBetween(Math.random, preset.strike.every)) strikeOnce(out, preset, k);
  const buf = await ctx.startRendering();
  let peak = 0;
  let sum = 0;
  let n = 0;
  for (let c = 0; c < buf.numberOfChannels; c++) {
    const d = buf.getChannelData(c);
    for (let i = 0; i < d.length; i++) {
      const a = Math.abs(d[i]);
      if (a > peak) peak = a;
      sum += d[i] * d[i];
      n++;
    }
  }
  return { peak, rms: Math.sqrt(sum / n) };
}

// accès de test (développement uniquement)
if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
  (window as unknown as { __gvAmbient?: unknown }).__gvAmbient = { ambient, renderStats };
}
