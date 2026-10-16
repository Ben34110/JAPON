"use client";

import { useId, type ReactNode } from "react";
import type { PhotoMotif, PhotoSpec } from "@/lib/types";

/**
 * Visuels de substitution pour les photographies du guide.
 * Chaque motif est une petite scène vectorielle au bon format ; passer `spec.src`
 * (par ex. une URL Unsplash) remplace la scène par une vraie photographie.
 */

interface Pal {
  sky: [string, string];
  far: string;
  mid: string;
  near: string;
  water: string;
  accent: string;
}

const PALETTES: Pal[] = [
  { sky: ["#8fc5e8", "#eaf4f4"], far: "#8aa7b8", mid: "#5f8660", near: "#2f4e36", water: "#4f86a6", accent: "#d7455f" },
  { sky: ["#f0b27c", "#f9e7c7"], far: "#a58a8c", mid: "#6f7f58", near: "#394a33", water: "#5f8fa3", accent: "#c2362b" },
  { sky: ["#6f9fc6", "#d7e6ee"], far: "#6e8a9b", mid: "#547a5c", near: "#27402f", water: "#3f7490", accent: "#e0912c" },
];

type SceneProps = { W: number; H: number; P: Pal; id: string };

const f = (n: number) => +n.toFixed(1);

function Sky({ W, H, P, id, h = 1 }: SceneProps & { h?: number }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={P.sky[0]} />
          <stop offset="1" stopColor={P.sky[1]} />
        </linearGradient>
      </defs>
      <rect width={W} height={f(H * h)} fill={`url(#${id}-sky)`} />
    </>
  );
}

function Hills({ W, H, P, base = 0.6, color, amp = 0.12, k = 1 }: SceneProps & { base?: number; color?: string; amp?: number; k?: number }) {
  const y0 = H * base;
  const a = H * amp;
  const d = `M0 ${f(y0)} C ${W * 0.2} ${f(y0 - a * k)}, ${W * 0.35} ${f(y0 + a * 0.2)}, ${W * 0.55} ${f(y0 - a * 0.8 * k)} S ${W * 0.85} ${f(y0 - a * 0.1)}, ${W} ${f(y0 - a * 0.5 * k)} V ${H} H0 Z`;
  return <path d={d} fill={color ?? P.mid} />;
}

function Pine({ x, y, s = 1, color = "#25402c" }: { x: number; y: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${f(x)} ${f(y)}) scale(${s})`}>
      <rect x="-1" y="-2" width="2" height="9" fill="#3b2d22" />
      <path d="M0-26 8-10H4l7 9H2l8 9H-10l8-9h-9l7-9H-8Z" fill={color} />
    </g>
  );
}

function Roof({ x, y, w, h, color = "#2f3a44", flare = 0.12 }: { x: number; y: number; w: number; h: number; color?: string; flare?: number }) {
  const fl = w * flare;
  return <path d={`M${f(x - fl)} ${f(y + h)} Q ${f(x + w * 0.2)} ${f(y + h * 0.9)} ${f(x + w * 0.38)} ${f(y)} L${f(x + w * 0.62)} ${f(y)} Q ${f(x + w * 0.8)} ${f(y + h * 0.9)} ${f(x + w + fl)} ${f(y + h)} Z`} fill={color} />;
}

function Blossoms({ cx, cy, r, n = 14, seed = 1 }: { cx: number; cy: number; r: number; n?: number; seed?: number }) {
  const items: ReactNode[] = [];
  for (let i = 0; i < n; i++) {
    const a = ((i * 137.5 + seed * 40) * Math.PI) / 180;
    const d = (((i * 53 + seed * 17) % 100) / 100) * r;
    items.push(<circle key={i} cx={f(cx + Math.cos(a) * d)} cy={f(cy + Math.sin(a) * d * 0.8)} r={f(r * (0.28 + ((i * 7) % 5) * 0.05))} fill={i % 3 === 0 ? "#f6c7d6" : i % 3 === 1 ? "#f0a6bd" : "#fbe0e8"} opacity="0.92" />);
  }
  return <g>{items}</g>;
}

const SCENES: Record<PhotoMotif, (p: SceneProps) => ReactNode> = {
  castle: (p) => {
    const { W, H, P } = p;
    const gx = W * 0.5, base = H * 0.78;
    return (
      <>
        <Sky {...p} />
        <Hills {...p} base={0.55} color={P.far} />
        <rect y={f(base)} width={W} height={f(H - base)} fill={P.near} />
        <path d={`M${f(gx - W * 0.3)} ${f(H)} L${f(gx - W * 0.22)} ${f(base - H * 0.06)} H${f(gx + W * 0.22)} L${f(gx + W * 0.3)} ${f(H)}Z`} fill="#5c5a58" />
        {[0, 1, 2].map((i) => {
          const w = W * (0.34 - i * 0.08);
          const y = base - H * (0.12 + i * 0.13) - H * 0.04;
          return (
            <g key={i}>
              <rect x={f(gx - w / 2)} y={f(y)} width={f(w)} height={f(H * 0.09)} fill="#f2efe6" />
              <rect x={f(gx - w / 2 + w * 0.08)} y={f(y + H * 0.03)} width={f(w * 0.84)} height={f(H * 0.03)} fill="#37332f" opacity="0.7" />
              <Roof x={gx - w / 2 - W * 0.02} y={y - H * 0.06} w={w + W * 0.04} h={H * 0.07} />
            </g>
          );
        })}
        <Blossoms cx={W * 0.22} cy={H * 0.34} r={W * 0.2} seed={2} n={20} />
        <Blossoms cx={W * 0.82} cy={H * 0.3} r={W * 0.16} seed={5} n={16} />
        <path d={`M0 ${f(H * 0.42)} Q ${W * 0.1} ${f(H * 0.3)} ${W * 0.3} ${f(H * 0.22)}`} stroke="#4a3426" strokeWidth="2.4" fill="none" />
      </>
    );
  },
  harbor: (p) => {
    const { W, H, P } = p;
    const wl = H * 0.58;
    return (
      <>
        <Sky {...p} />
        <Hills {...p} base={0.5} color={P.far} amp={0.14} />
        <rect y={f(wl)} width={W} height={f(H - wl)} fill={P.water} />
        {Array.from({ length: 9 }).map((_, i) => (
          <rect key={i} x={f(8 + i * 21)} y={f(wl - H * (0.05 + ((i * 7) % 5) * 0.015))} width="14" height={f(H * (0.06 + ((i * 7) % 5) * 0.015))} fill={["#e9dccd", "#c1493c", "#d9b56a", "#8e9aa6", "#f1ece1"][i % 5]} />
        ))}
        <path d={`M${W * 0.18} ${f(H * 0.74)} h${W * 0.5} l-6 8 h-${W * 0.4}Z`} fill="#2c2c33" />
        <rect x={W * 0.28} y={f(H * 0.66)} width={W * 0.3} height={f(H * 0.08)} fill="#e8e2d6" />
        <path d={`M0 ${f(H * 0.82)} q ${W * 0.1} -6 ${W * 0.2} 0 t ${W * 0.2} 0 t ${W * 0.2} 0 t ${W * 0.2} 0 t ${W * 0.2} 0`} stroke="#ffffff55" strokeWidth="1.2" fill="none" />
      </>
    );
  },
  garden: (p) => {
    const { W, H, P } = p;
    const blobs: ReactNode[] = [];
    for (let i = 0; i < 16; i++) {
      const x = ((i * 67) % 100) / 100 * W;
      const y = H * (0.45 + ((i * 29) % 50) / 100);
      blobs.push(<circle key={i} cx={f(x)} cy={f(y)} r={f(W * (0.09 + ((i * 11) % 7) * 0.01))} fill={i % 4 === 0 ? "#3d6b3c" : i % 3 === 0 ? P.mid : "#2f5a35"} />);
    }
    return (
      <>
        <Sky {...p} h={0.5} />
        <Hills {...p} base={0.32} color={P.far} />
        <rect y={f(H * 0.4)} width={W} height={f(H * 0.6)} fill="#2d4f33" />
        {blobs}
        <path d={`M${W * 0.28} ${f(H * 0.4)} L${W * 0.62} ${f(H * 0.4)} L${W * 0.9} ${f(H)} L${W * 0.35} ${f(H)}Z`} fill="#b8b2a4" opacity="0.9" />
        {Array.from({ length: 9 }).map((_, i) => (
          <path key={i} d={`M${f(W * 0.3 + i * 4)} ${f(H * (0.45 + i * 0.06))} H${f(W * 0.62 + i * 12)}`} stroke="#8e897b" strokeWidth="1" />
        ))}
        <g transform={`translate(${W * 0.22} ${H * 0.62})`}>
          <rect x="-9" y="14" width="18" height="6" fill="#8d8a84" />
          <rect x="-4" y="4" width="8" height="10" fill="#9c9992" />
          <rect x="-12" y="-4" width="24" height="8" rx="3" fill="#a6a39c" />
          <path d="M-8-4 0-12 8-4Z" fill="#8a877f" />
        </g>
        <circle cx={W * 0.8} cy={H * 0.5} r="6" fill="#d9577f" opacity="0.85" />
      </>
    );
  },
  market: (p) => {
    const { W, H } = p;
    return (
      <>
        <rect width={W} height={H} fill="#2b2420" />
        <rect width={W} height={f(H * 0.3)} fill="#4a3d36" />
        {[["#c8222e", "#fff"], ["#f2c230", "#111"], ["#1f5fa8", "#fff"], ["#c8222e", "#fff"]].map((c, i) => (
          <g key={i}>
            <rect x={f(10 + i * 46)} y={f(H * 0.06)} width="40" height={f(H * 0.2)} fill={c[0]} />
            <path d={`M${f(18 + i * 46)} ${f(H * 0.12)} h24 M${f(18 + i * 46)} ${f(H * 0.17)} h18`} stroke={c[1]} strokeWidth="3" />
          </g>
        ))}
        <rect y={f(H * 0.3)} width={W} height={f(H * 0.7)} fill="#6b5a49" />
        {Array.from({ length: 18 }).map((_, i) => {
          const x = ((i * 47) % 100) / 100 * W;
          const y = H * (0.55 + ((i * 31) % 40) / 100);
          return (
            <g key={i} transform={`translate(${f(x)} ${f(y)})`}>
              <circle r="4.600" cy="-10" fill={["#e8c9a6", "#d1a982", "#f0d8bd"][i % 3]} />
              <path d="M-7 8 -5-6h10l2 14Z" fill={["#2c3e57", "#7a2c2c", "#d8d3c9", "#3b5a3a"][i % 4]} />
            </g>
          );
        })}
      </>
    );
  },
  volcano: (p) => {
    const { W, H, P } = p;
    return (
      <>
        <Sky {...p} />
        <path d={`M-10 ${f(H * 0.75)} L${W * 0.35} ${f(H * 0.4)} L${W * 0.5} ${f(H * 0.48)} L${W * 0.65} ${f(H * 0.36)} L${W + 10} ${f(H * 0.75)}Z`} fill="#7b6a63" />
        <path d={`M${W * 0.58} ${f(H * 0.39)} C ${W * 0.55} ${f(H * 0.25)} ${W * 0.7} ${f(H * 0.2)} ${W * 0.66} ${f(H * 0.08)} C ${W * 0.8} ${f(H * 0.18)} ${W * 0.75} ${f(H * 0.3)} ${W * 0.72} ${f(H * 0.4)}Z`} fill="#f4f1ec" opacity="0.88" />
        <Hills {...p} base={0.7} color={P.mid} amp={0.07} />
        <rect y={f(H * 0.84)} width={W} height={f(H * 0.16)} fill="#4f7a43" />
        {[0.15, 0.3, 0.75, 0.9].map((x, i) => <Pine key={i} x={W * x} y={H * 0.8} s={0.5} />)}
      </>
    );
  },
  street: (p) => {
    const { W, H } = p;
    return (
      <>
        <Sky {...p} h={0.4} />
        <rect y={f(H * 0.55)} width={W} height={f(H * 0.45)} fill="#a79d8a" />
        {[0, 1, 2].map((i) => {
          const x = i * 70 - 6;
          const y = H * (0.28 + (i % 2) * 0.03);
          return (
            <g key={i}>
              <rect x={x} y={f(y)} width="66" height={f(H * 0.5)} fill={["#7a5a41", "#6a4b36", "#8a6a4d"][i]} />
              <path d={`M${x - 4} ${f(y)} L${x + 33} ${f(y - H * 0.1)} L${x + 70} ${f(y)}Z`} fill="#3d3a3b" />
              {[0, 1].map((j) => <rect key={j} x={x + 8 + j * 30} y={f(y + H * 0.1)} width="20" height={f(H * 0.22)} fill="#d9cdb4" opacity="0.8" />)}
              {[0, 1].map((j) => <path key={j} d={`M${x + 8 + j * 30} ${f(y + H * 0.1)}v${H * 0.22}M${x + 18 + j * 30} ${f(y + H * 0.1)}v${H * 0.22}`} stroke="#4b3a2a" strokeWidth="1" />)}
            </g>
          );
        })}
        <Pine x={W * 0.06} y={H * 0.72} s={0.8} color="#3a5b35" />
        <rect x={W * 0.7} y={f(H * 0.7)} width="4" height={f(H * 0.12)} fill="#c1352c" />
      </>
    );
  },
  torii: (p) => {
    const { W, H } = p;
    const gates: ReactNode[] = [];
    for (let i = 0; i < 7; i++) {
      const s = 1 - i * 0.13;
      const w = W * 0.78 * s;
      const top = H * (0.14 + i * 0.045);
      const bot = H * (0.98 - i * 0.075);
      const cx = W * 0.5;
      gates.push(
        <g key={i} opacity={1 - i * 0.04}>
          <rect x={f(cx - w / 2)} y={f(top)} width={f(w * 0.09)} height={f(bot - top)} fill="#d4421f" />
          <rect x={f(cx + w / 2 - w * 0.09)} y={f(top)} width={f(w * 0.09)} height={f(bot - top)} fill="#d4421f" />
          <rect x={f(cx - w / 2 - w * 0.05)} y={f(top - H * 0.03)} width={f(w * 1.1)} height={f(H * 0.035)} fill="#b62f17" />
          <rect x={f(cx - w / 2)} y={f(top + H * 0.045)} width={f(w)} height={f(H * 0.022)} fill="#e9542b" />
        </g>,
      );
    }
    return (
      <>
        <rect width={W} height={H} fill="#1d2a1d" />
        <path d={`M0 0H${W}V${H}H0Z`} fill="#26361f" opacity="0.7" />
        <path d={`M${W * 0.4} ${f(H * 0.3)} L${W * 0.6} ${f(H * 0.3)} L${W * 0.96} ${f(H)} L${W * 0.04} ${f(H)}Z`} fill="#6b4a38" />
        {gates.reverse()}
        <path d={`M${W * 0.4} ${f(H * 0.3)} L${W * 0.6} ${f(H * 0.3)} L${W * 0.55} ${f(H * 0.35)} L${W * 0.45} ${f(H * 0.35)}Z`} fill="#f0c58a" opacity="0.7" />
      </>
    );
  },
  bridge: (p) => {
    const { W, H, P } = p;
    const dy = H * 0.58;
    return (
      <>
        <Sky {...p} />
        <rect y={f(H * 0.55)} width={W} height={f(H * 0.45)} fill={P.water} />
        <Hills {...p} base={0.55} color={P.far} amp={0.05} />
        <rect x="0" y={f(dy)} width={W} height="3.500" fill="#e9eef0" />
        {[W * 0.3, W * 0.7].map((x, i) => (
          <g key={i}>
            <rect x={f(x - 3)} y={f(H * 0.18)} width="6" height={f(H * 0.5)} fill="#e9eef0" />
            <rect x={f(x - 6)} y={f(H * 0.4)} width="12" height="3" fill="#e9eef0" />
          </g>
        ))}
        <path d={`M0 ${f(dy - 2)} Q ${W * 0.15} ${f(dy - 2)} ${W * 0.3} ${f(H * 0.19)} Q ${W * 0.5} ${f(dy - 10)} ${W * 0.7} ${f(H * 0.19)} Q ${W * 0.85} ${f(dy - 2)} ${W} ${f(dy - 2)}`} stroke="#f5f8f9" strokeWidth="1.600" fill="none" />
        {Array.from({ length: 13 }).map((_, i) => <path key={i} d={`M${f(W * 0.3 + i * (W * 0.4) / 12)} ${f(dy)} v-${f(H * 0.1 + Math.abs(i - 6) * -1 + 8)}`} stroke="#f5f8f9" strokeWidth=".6" />)}
        <path d={`M0 ${f(H * 0.8)} q ${W * 0.1} -4 ${W * 0.2} 0 t ${W * 0.2} 0 t ${W * 0.2} 0 t ${W * 0.2} 0 t ${W * 0.2} 0`} stroke="#ffffff66" strokeWidth="1" fill="none" />
      </>
    );
  },
  sea: (p) => {
    const { W, H, P } = p;
    return (
      <>
        <Sky {...p} />
        <rect y={f(H * 0.45)} width={W} height={f(H * 0.55)} fill={P.water} />
        <path d={`M-5 ${f(H * 0.55)} C ${W * 0.1} ${f(H * 0.3)} ${W * 0.35} ${f(H * 0.3)} ${W * 0.5} ${f(H * 0.5)} C ${W * 0.6} ${f(H * 0.56)} ${W * 0.2} ${f(H * 0.62)} -5 ${f(H * 0.6)}Z`} fill={P.near} />
        <path d={`M${W * 0.5} ${f(H * 0.52)} C ${W * 0.65} ${f(H * 0.38)} ${W * 0.85} ${f(H * 0.38)} ${W + 5} ${f(H * 0.5)} V ${f(H * 0.58)} C ${W * 0.8} ${f(H * 0.62)} ${W * 0.6} ${f(H * 0.6)} ${W * 0.5} ${f(H * 0.52)}Z`} fill={P.mid} />
        <g transform={`translate(${W * 0.22} ${H * 0.4})`}><rect x="-3" y="0" width="6" height="8" fill="#e6e0d0" /><path d="M-6 0 0-6 6 0Z" fill="#a33c2c" /></g>
        {[0.7, 0.78, 0.86].map((y, i) => <path key={i} d={`M${W * 0.1 * i} ${f(H * y)} q ${W * 0.1} -4 ${W * 0.2} 0 t ${W * 0.2} 0 t ${W * 0.2} 0 t ${W * 0.2} 0 t ${W * 0.2} 0`} stroke="#ffffff55" strokeWidth="1" fill="none" />)}
      </>
    );
  },
  pagoda: (p) => {
    const { W, H, P } = p;
    const cx = W * 0.5;
    return (
      <>
        <Sky {...p} />
        <Hills {...p} base={0.5} color={P.far} amp={0.16} />
        {[0.15, 0.3, 0.72, 0.88].map((x, i) => <Pine key={i} x={W * x} y={H * (0.78 + (i % 2) * 0.05)} s={1.1 + (i % 2) * 0.3} />)}
        {[0, 1, 2, 3, 4].map((i) => {
          const w = W * (0.3 - i * 0.04);
          const y = H * (0.76 - i * 0.12);
          return (
            <g key={i}>
              <rect x={f(cx - w * 0.38)} y={f(y)} width={f(w * 0.76)} height={f(H * 0.07)} fill="#9c3a2a" />
              <Roof x={cx - w / 2} y={y - H * 0.04} w={w} h={H * 0.06} color="#34383d" flare={0.18} />
            </g>
          );
        })}
        <rect x={f(cx - 1)} y={f(H * 0.06)} width="2" height={f(H * 0.12)} fill="#c9a54a" />
        <rect y={f(H * 0.92)} width={W} height={f(H * 0.08)} fill={P.near} />
      </>
    );
  },
  tulips: (p) => {
    const { W, H } = p;
    return (
      <>
        <Sky {...p} h={0.5} />
        <rect x={W * 0.06} y={f(H * 0.18)} width={W * 0.22} height={f(H * 0.3)} fill="#9c3d2a" />
        <path d={`M${W * 0.06} ${f(H * 0.18)} L${W * 0.17} ${f(H * 0.06)} L${W * 0.28} ${f(H * 0.18)}Z`} fill="#4a4f57" />
        <rect x={W * 0.4} y={f(H * 0.3)} width={W * 0.5} height={f(H * 0.18)} fill="#efe9dd" />
        <Roof x={W * 0.38} y={H * 0.24} w={W * 0.54} h={H * 0.08} color="#b4472f" />
        <rect y={f(H * 0.46)} width={W} height={f(H * 0.54)} fill="#5a8a4a" />
        {Array.from({ length: 7 }).map((_, i) => (
          <path key={i} d={`M0 ${f(H * (0.52 + i * 0.07))} Q ${W / 2} ${f(H * (0.5 + i * 0.07))} ${W} ${f(H * (0.52 + i * 0.07))}`} stroke={["#d8322b", "#f2b82b", "#e4562d", "#f6d04a", "#c82a52"][i % 5]} strokeWidth={f(4 + i * 0.9)} strokeDasharray={`${3 + i} 1.5`} fill="none" />
        ))}
        <rect y={f(H * 0.46)} width={W} height="5" fill="#6aa7c4" opacity="0.8" />
      </>
    );
  },
  ship: (p) => {
    const { W, H, P } = p;
    const dk = H * 0.74;
    return (
      <>
        <Sky {...p} />
        <rect x={W * 0.74} y={f(H * 0.2)} width="12" height={f(H * 0.55)} fill="#8c7a63" />
        <rect x={W * 0.72} y={f(H * 0.14)} width="16" height="8" fill="#6b5a46" />
        <rect y={f(H * 0.72)} width={W} height={f(H * 0.28)} fill={P.water} />
        <path d={`M${W * 0.12} ${f(dk - 2)} H${W * 0.78} L${W * 0.7} ${f(dk + H * 0.1)} H${W * 0.2}Z`} fill="#2a2420" />
        <rect x={W * 0.14} y={f(dk - H * 0.09)} width={W * 0.18} height={f(H * 0.09)} fill="#4b3a2b" />
        {[0.3, 0.5, 0.68].map((x, i) => (
          <g key={i}>
            <rect x={f(W * x - 1)} y={f(H * (0.14 + i * 0.02))} width="2" height={f(dk - H * (0.14 + i * 0.02))} fill="#2a2420" />
            <path d={`M${f(W * x - 24)} ${f(H * (0.22 + i * 0.03))} h46 v${f(H * 0.17)} h-46Z`} fill="#efe7d3" opacity="0.92" />
            <path d={`M${f(W * x - 24)} ${f(H * (0.42 + i * 0.03))} h46 v${f(H * 0.13)} h-46Z`} fill="#e6dcc3" opacity="0.92" />
          </g>
        ))}
      </>
    );
  },
  doll: ({ W, H }) => (
    <g transform={`translate(${W / 2} 0)`}>
      <path d={`M-20 ${f(H * 0.4)} L-34 ${f(H * 0.98)} H34 L20 ${f(H * 0.4)}Z`} fill="#d9622b" />
      <path d={`M-20 ${f(H * 0.4)} L-34 ${f(H * 0.98)} H-12Z`} fill="#b5481c" />
      <path d={`M-17 ${f(H * 0.5)} q 6 -8 14 0 t 14 0 t 14 0 M-22 ${f(H * 0.66)} q 8 -8 16 0 t 16 0 t 16 0 M-26 ${f(H * 0.82)} q 8 -8 17 0 t 17 0 t 17 0`} stroke="#f2d27a" strokeWidth="3" fill="none" />
      <rect x="-26" y={f(H * 0.46)} width="52" height="6" fill="#f2d27a" />
      <circle cy={f(H * 0.26)} r="17" fill="#f0dcc3" />
      <path d={`M-18 ${f(H * 0.26)} a18 18 0 0 1 36 0 q-6 -6 -18 -6 t-18 6Z`} fill="#17120f" />
      <circle cx="-8" cy={f(H * 0.285)} r="1.500" fill="#2b1d14" /><circle cx="8" cy={f(H * 0.285)} r="1.500" fill="#2b1d14" />
      <circle cy={f(H * 0.32)} r="1.600" fill="#c9503a" />
    </g>
  ),
  samurai: ({ W, H }) => (
    <g transform={`translate(${W / 2} 0)`}>
      <rect x="22" y="0" width="2.400" height={f(H)} fill="#7a5a3a" />
      <path d="M23 0 21 12h6Z" fill="#bfc5c9" />
      <path d={`M-26 ${f(H * 0.3)} h40 l6 ${f(H * 0.4)} h-52Z`} fill="#b02a22" />
      <path d={`M-26 ${f(H * 0.3)} h40 M-28 ${f(H * 0.42)} h46 M-30 ${f(H * 0.54)} h50`} stroke="#e8d28a" strokeWidth="2.500" />
      <rect x="-22" y={f(H * 0.7)} width="36" height={f(H * 0.28)} fill="#e8e4da" />
      <path d={`M-18 ${f(H * 0.7)} v${f(H * 0.28)} M-6 ${f(H * 0.7)} v${f(H * 0.28)} M6 ${f(H * 0.7)} v${f(H * 0.28)}`} stroke="#9a948a" strokeWidth="1" />
      <circle cx="-6" cy={f(H * 0.2)} r="11" fill="#e0bf9a" />
      <path d={`M-20 ${f(H * 0.2)} a14 14 0 0 1 28 0 l8 6 h-44Z`} fill="#8e231c" />
      <path d={`M-14 ${f(H * 0.1)} l8 -12 l8 12Z`} fill="#d9b44a" />
    </g>
  ),
  sulfur: (p) => {
    const { W, H } = p;
    const blocks: ReactNode[] = [];
    for (let r = 0; r < 3; r++)
      for (let c = 0; c < 5; c++)
        blocks.push(<rect key={`${r}${c}`} x={f(12 + c * 36 + (r % 2) * 10)} y={f(H * (0.38 + r * 0.19))} width="28" height={f(H * 0.15)} rx="4" fill={["#f2d21f", "#f6df4e", "#e9c211"][(r + c) % 3]} />);
    return (
      <>
        <rect width={W} height={H} fill="#5b452f" />
        <rect y={f(H * 0.3)} width={W} height={f(H * 0.7)} fill="#7a5c3d" />
        {[0.3, 0.49, 0.68, 0.87].map((y, i) => <rect key={i} y={f(H * y)} width={W} height="3" fill="#3f2f20" />)}
        {blocks}
        <rect x={W * 0.1} y={f(H * 0.06)} width={W * 0.3} height={f(H * 0.18)} fill="#f4efe0" />
        <rect x={W * 0.5} y={f(H * 0.08)} width={W * 0.32} height={f(H * 0.16)} fill="#f4efe0" />
      </>
    );
  },
  pilgrim: (p) => {
    const { W, H, P } = p;
    return (
      <>
        <Sky {...p} h={0.4} />
        <rect y={f(H * 0.2)} width={W} height={f(H * 0.8)} fill="#2f5334" />
        {Array.from({ length: 12 }).map((_, i) => <circle key={i} cx={f(((i * 61) % 100) / 100 * W)} cy={f(H * (0.35 + ((i * 17) % 60) / 100))} r={f(W * 0.08)} fill={i % 3 ? P.mid : "#3d6b3c"} />)}
        <path d={`M${W * 0.5} ${f(H * 0.3)} L${W * 0.72} ${f(H * 0.3)} L${W * 0.55} ${f(H)} L${W * 0.1} ${f(H)}Z`} fill="#b3ad9d" />
        {[[0.52, 0.45], [0.62, 0.6], [0.4, 0.72]].map(([x, y], i) => (
          <g key={i} transform={`translate(${f(W * x)} ${f(H * y)})`}>
            <path d="M-8 -8 0 -15 8 -8Z" fill="#d9c18a" />
            <circle cy="-6" r="4" fill="#d7b48f" />
            <rect x="-6" y="-2" width="12" height="18" rx="3" fill="#f3f1ec" />
          </g>
        ))}
        <g transform={`translate(${W * 0.2} ${H * 0.62})`}><rect x="-8" y="10" width="16" height="6" fill="#8d8a84" /><rect x="-4" y="2" width="8" height="8" fill="#9c9992" /><rect x="-11" y="-5" width="22" height="7" rx="3" fill="#a6a39c" /></g>
      </>
    );
  },
  festival: (p) => {
    const { W, H } = p;
    return (
      <>
        <rect width={W} height={H} fill="#1d1830" />
        {Array.from({ length: 6 }).map((_, i) => <circle key={i} cx={f(16 + i * 34)} cy={f(H * 0.1)} r="6" fill={["#f2b32d", "#e5405e", "#f2b32d"][i % 3]} opacity="0.9" />)}
        {Array.from({ length: 5 }).map((_, i) => {
          const x = 22 + i * 38;
          return (
            <g key={i} transform={`translate(${x} ${f(H * (0.55 + (i % 2) * 0.05))})`}>
              <path d="M-12 -24 0 -34 12 -24 8 -20H-8Z" fill="#f2e7c6" />
              <circle cy="-16" r="6" fill="#e4c7a8" />
              <path d="M-12 -8 -9 22h18l3-30Z" fill="#f7f4ee" />
              <path d="M-12 -2h24" stroke="#d6264a" strokeWidth="5" />
              <path d="M-9 22v14M9 22v14" stroke="#e4c7a8" strokeWidth="3.500" />
            </g>
          );
        })}
      </>
    );
  },
  gate: (p) => {
    const { W, H, P } = p;
    return (
      <>
        <Sky {...p} />
        <Hills {...p} base={0.62} color={P.far} />
        <rect x={W * 0.16} y={f(H * 0.5)} width={W * 0.68} height={f(H * 0.4)} fill="#b63a28" />
        <Roof x={W * 0.12} y={H * 0.36} w={W * 0.76} h={H * 0.16} color="#2e3338" flare={0.1} />
        <Roof x={W * 0.28} y={H * 0.2} w={W * 0.44} h={H * 0.14} color="#2e3338" flare={0.12} />
        {[0.26, 0.42, 0.58, 0.74].map((x, i) => <rect key={i} x={f(W * x - 2)} y={f(H * 0.52)} width="5" height={f(H * 0.38)} fill="#8f2a1b" />)}
        <rect x={W * 0.44} y={f(H * 0.62)} width={W * 0.12} height={f(H * 0.28)} fill="#2a1a14" />
        <rect y={f(H * 0.9)} width={W} height={f(H * 0.1)} fill={P.near} />
      </>
    );
  },
  skyline: (p) => {
    const { W, H } = p;
    const towers: ReactNode[] = [];
    for (let i = 0; i < 9; i++) {
      const w = 18 + ((i * 13) % 14);
      const h = H * (0.28 + ((i * 37) % 55) / 100);
      const x = i * (W / 8.2) - 4;
      towers.push(
        <g key={i}>
          <rect x={f(x)} y={f(H - h)} width={w} height={f(h)} fill={["#1a2238", "#232c47", "#151a2c"][i % 3]} />
          {Array.from({ length: 12 }).map((_, j) => <rect key={j} x={f(x + 3 + (j % 3) * 5)} y={f(H - h + 6 + Math.floor(j / 3) * 9)} width="3" height="4" fill={j % 4 === 1 ? "#ffd477" : "#7b88b5"} opacity="0.85" />)}
        </g>,
      );
    }
    return (
      <>
        <defs>
          <linearGradient id={`${p.id}-n`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0c1330" /><stop offset="1" stopColor="#6a2d5c" /></linearGradient>
        </defs>
        <rect width={W} height={H} fill={`url(#${p.id}-n)`} />
        {towers}
        <rect x={W * 0.6} y={f(H * 0.12)} width="22" height="9" fill="#f6a0c0" />
        <rect x={W * 0.1} y={f(H * 0.28)} width="26" height="9" fill="#ff5b3a" />
        <rect x={W * 0.46} y={f(H * 0.4)} width="22" height="9" fill="#3fd0ff" />
      </>
    );
  },
  cherry: (p) => {
    const { W, H } = p;
    return (
      <>
        <Sky {...p} />
        <Blossoms cx={W * 0.3} cy={H * 0.3} r={W * 0.3} n={26} seed={3} />
        <Blossoms cx={W * 0.75} cy={H * 0.25} r={W * 0.25} n={22} seed={7} />
        <path d={`M${W * 0.28} ${f(H * 0.8)} Q ${W * 0.3} ${f(H * 0.4)} ${W * 0.5} ${f(H * 0.3)}`} stroke="#4a3426" strokeWidth="5" fill="none" />
        <rect y={f(H * 0.82)} width={W} height={f(H * 0.18)} fill="#4f7a43" />
      </>
    );
  },
  reef: (p) => {
    const { W, H } = p;
    return (
      <>
        <defs>
          <linearGradient id={`${p.id}-r`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#1fb3c9" /><stop offset="1" stopColor="#0a6aa3" /></linearGradient>
        </defs>
        <rect width={W} height={H} fill={`url(#${p.id}-r)`} />
        {Array.from({ length: 10 }).map((_, i) => <ellipse key={i} cx={f(((i * 71) % 100) / 100 * W)} cy={f(H * (0.3 + ((i * 23) % 60) / 100))} rx={f(14 + (i % 3) * 8)} ry={f(7 + (i % 4) * 3)} fill={i % 2 ? "#7fe3d5" : "#b9f2e0"} opacity="0.55" />)}
        <path d={`M${W * 0.1} ${f(H * 0.9)} q ${W * 0.3} -${H * 0.3} ${W * 0.5} -${H * 0.1} q ${W * 0.2} ${H * 0.1} ${W * 0.4} -${H * 0.05} V ${H} H${W * 0.1}Z`} fill="#3a6a3a" opacity="0.85" />
        <g transform={`translate(${W * 0.78} ${H * 0.2})`}><rect x="-1" y="0" width="2" height="16" fill="#5b4430" /><path d="M0 0c-9-2-14 4-16 9M0 0c9-2 14 4 16 9M0 0c-4-8-12-9-15-6M0 0c4-8 12-9 15-6" stroke="#2f7d3a" strokeWidth="2.200" fill="none" /></g>
      </>
    );
  },
  snow: (p) => {
    const { W, H } = p;
    return (
      <>
        <Sky {...p} />
        <path d={`M0 ${f(H * 0.55)} Q ${W * 0.3} ${f(H * 0.35)} ${W * 0.6} ${f(H * 0.5)} T ${W} ${f(H * 0.45)} V ${H} H0Z`} fill="#f6f8fb" />
        {[0.1, 0.22, 0.45, 0.7, 0.88].map((x, i) => <Pine key={i} x={W * x} y={H * (0.62 + (i % 3) * 0.08)} s={0.8 + (i % 2) * 0.4} color="#2c4a3a" />)}
        <path d={`M${W * 0.6} ${f(H * 0.5)} L${W * 0.78} ${f(H * 0.2)} L${W * 0.95} ${f(H * 0.5)}Z`} fill="#dde7f0" />
      </>
    );
  },
  hotspring: (p) => {
    const { W, H, P } = p;
    return (
      <>
        <Sky {...p} h={0.45} />
        <Hills {...p} base={0.4} color={P.mid} />
        <rect y={f(H * 0.5)} width={W} height={f(H * 0.5)} fill="#6f6a60" />
        <ellipse cx={W * 0.5} cy={f(H * 0.72)} rx={W * 0.36} ry={f(H * 0.14)} fill="#8fd3d1" stroke="#4e4a43" strokeWidth="5" />
        {[0.38, 0.5, 0.6].map((x, i) => <path key={i} d={`M${f(W * x)} ${f(H * 0.62)} c-8 -10 8 -16 0 -28 c-6 -8 6 -14 2 -22`} stroke="#ffffffaa" strokeWidth="4" strokeLinecap="round" fill="none" />)}
      </>
    );
  },
  mountain: (p) => {
    const { W, H, P } = p;
    return (
      <>
        <Sky {...p} />
        <path d={`M-10 ${H} L${W * 0.28} ${f(H * 0.2)} L${W * 0.5} ${f(H * 0.5)} L${W * 0.7} ${f(H * 0.16)} L${W + 10} ${H}Z`} fill={P.far} />
        <path d={`M${W * 0.28} ${f(H * 0.2)} L${W * 0.36} ${f(H * 0.4)} L${W * 0.3} ${f(H * 0.36)} L${W * 0.25} ${f(H * 0.42)}Z M${W * 0.7} ${f(H * 0.16)} L${W * 0.78} ${f(H * 0.4)} L${W * 0.7} ${f(H * 0.34)} L${W * 0.64} ${f(H * 0.4)}Z`} fill="#f4f6f8" />
        <Hills {...p} base={0.66} color={P.mid} amp={0.08} />
        <rect y={f(H * 0.84)} width={W} height={f(H * 0.16)} fill={P.near} />
        {[0.1, 0.25, 0.4, 0.62, 0.8, 0.92].map((x, i) => <Pine key={i} x={W * x} y={H * (0.78 + (i % 2) * 0.06)} s={0.7 + (i % 3) * 0.2} />)}
      </>
    );
  },
};

export function PhotoPlaceholder({
  spec,
  className,
  label,
}: {
  spec: PhotoSpec;
  className?: string;
  label?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const W = 200;
  const H = +(W / spec.aspect).toFixed(1);
  const P = PALETTES[(spec.seed ?? 0) % PALETTES.length];

  if (spec.src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={spec.src} alt={label ?? spec.caption ?? ""} className={className} style={{ width: "100%", aspectRatio: String(spec.aspect), objectFit: "cover", display: "block" }} loading="lazy" />;
  }

  const scene = SCENES[spec.motif]({ W, H, P, id: uid });
  return (
    <svg
      className={className}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={label ?? spec.caption ?? "Illustration"}
      style={{ width: "100%", aspectRatio: String(spec.aspect), display: "block" }}
    >
      {scene}
      {!spec.cutout && (
        <>
          <defs>
            <linearGradient id={`${uid}-v`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0.7" stopColor="#000" stopOpacity="0" />
              <stop offset="1" stopColor="#000" stopOpacity="0.22" />
            </linearGradient>
          </defs>
          <rect width={W} height={H} fill={`url(#${uid}-v)`} />
        </>
      )}
    </svg>
  );
}
