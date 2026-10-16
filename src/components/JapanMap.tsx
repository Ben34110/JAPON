"use client";

import { useId } from "react";
import { HOME_MAP } from "@/data/geo.generated";
import { REGION_BY_ID, pagesLabel } from "@/data/regions";
import { project } from "@/lib/projection";
import type { RegionId } from "@/lib/types";
import { Compass } from "./Icons";

interface Props {
  selectedId: RegionId | null;
  hoverId: RegionId | null;
  onSelect: (id: RegionId) => void;
  onHover: (id: RegionId | null) => void;
  className?: string;
  /** téléphone : libellés plus grands, pas de noms de villes, zones tactiles élargies */
  compact?: boolean;
}

const [W, H] = HOME_MAP.viewBox;

/** Ordre de dessin : les petites régions (Kyoto, Tokyo) passent au-dessus de leurs voisines. */
const DRAW_ORDER: RegionId[] = ["hokkaido", "nord-honshu", "ouest-honshu", "centre-honshu", "shikoku", "kyushu", "kyoto", "tokyo"];

const LABELS: Partial<Record<RegionId, { lines: string[]; lonLat: [number, number]; size?: number }>> = {
  hokkaido: { lines: ["HOKKAIDO"], lonLat: [143.3, 43.5], size: 19 },
  "nord-honshu": { lines: ["NORD DE", "HONSHU"], lonLat: [140.0, 39.0], size: 16 },
  "centre-honshu": { lines: ["CENTRE DE", "HONSHU"], lonLat: [137.9, 36.55], size: 12 },
  "ouest-honshu": { lines: ["OUEST DE", "HONSHU"], lonLat: [132.5, 35.0], size: 12.5 },
  shikoku: { lines: ["SHIKOKU"], lonLat: [133.3, 33.75], size: 13.5 },
  kyushu: { lines: ["KYUSHU"], lonLat: [131.15, 32.55], size: 13.5 },
};

const CITIES: { name: string; lonLat: [number, number]; dx?: number; dy?: number; anchor?: "start" | "end" }[] = [
  { name: "Sapporo", lonLat: [141.35, 43.06] },
  { name: "Hakodate", lonLat: [140.73, 41.77], dx: -6, anchor: "end" },
  { name: "Aomori", lonLat: [140.74, 40.82], dx: -6, anchor: "end" },
  { name: "Morioka", lonLat: [141.15, 39.7] },
  { name: "Sendai", lonLat: [140.87, 38.27] },
  { name: "Niigata", lonLat: [139.05, 37.92], dx: -6, anchor: "end" },
  { name: "Nagano", lonLat: [138.19, 36.65], dx: -6, anchor: "end" },
  { name: "Kanazawa", lonLat: [136.66, 36.56], dx: -6, anchor: "end" },
  { name: "Nagoya", lonLat: [136.91, 35.18], dy: 12 },
  { name: "Osaka", lonLat: [135.5, 34.69], dy: 12, dx: -4, anchor: "end" },
  { name: "Hiroshima", lonLat: [132.46, 34.39], dy: -6, dx: -4, anchor: "end" },
  { name: "Fukuoka", lonLat: [130.4, 33.59], dx: -6, anchor: "end" },
  { name: "Nagasaki", lonLat: [129.87, 32.75], dx: -6, anchor: "end" },
  { name: "Kagoshima", lonLat: [130.56, 31.6], dx: 7 },
];

const SEAS: { text: string; lonLat: [number, number]; rotate?: number }[] = [
  { text: "Mer du Japon", lonLat: [134.8, 40.4], rotate: -38 },
  { text: "Océan Pacifique", lonLat: [143.9, 36.6], rotate: 72 },
  { text: "Mer de Chine orientale", lonLat: [128.0, 32.2], rotate: -62 },
];

export function JapanMap({ selectedId, hoverId, onSelect, onHover, className = "block h-auto w-full", compact = false }: Props) {
  const m = compact ? 1.4 : 1;
  const uid = useId().replace(/:/g, "");
  const order = selectedId ? [...DRAW_ORDER.filter((r) => r !== selectedId), selectedId] : DRAW_ORDER;
  const oki = HOME_MAP.okinawa;
  const okiRegion = REGION_BY_ID.okinawa;

  // 100 km à la latitude moyenne (≈ 38°N) : px par km via la projection
  const a = project(HOME_MAP.proj, [137, 38]);
  const b = project(HOME_MAP.proj, [137 + 100 / (111.32 * Math.cos((38 * Math.PI) / 180)), 38]);
  const km100 = Math.abs(b[0] - a[0]);

  const activate = (id: RegionId) => (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(id);
    }
  };

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} role="group" aria-label="Carte du Japon par région">
      <defs>
        <filter id={`${uid}-glow`} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <filter id={`${uid}-lift`} x="-10%" y="-10%" width="125%" height="125%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.35" />
        </filter>
        <radialGradient id={`${uid}-sea`} cx="45%" cy="45%" r="80%">
          <stop offset="0" stopColor="#f4fafc" />
          <stop offset="1" stopColor="#e4f1f6" />
        </radialGradient>
      </defs>

      <rect width={W} height={H} fill={`url(#${uid}-sea)`} />

      {/* halo bleuté autour de l'archipel, comme sur la carte imprimée */}
      <g filter={`url(#${uid}-glow)`} opacity="0.95">
        {Object.values(HOME_MAP.regions).map((r, i) => (
          <path key={i} d={r.d} fill="#a9d8ea" stroke="#a9d8ea" strokeWidth="26" strokeLinejoin="round" />
        ))}
        <rect x={oki.box.x} y={oki.box.y} width={oki.box.w} height={oki.box.h} fill="#c4e3ef" />
      </g>

      {/* noms des mers */}
      {SEAS.map((s) => {
        const [x, y] = project(HOME_MAP.proj, s.lonLat);
        return (
          <text key={s.text} x={x} y={y} textAnchor="middle" transform={`rotate(${s.rotate ?? 0} ${x} ${y})`} fontSize="14" letterSpacing="4" fill="#6aa4bf" style={{ fontFamily: "var(--font-garamond)", fontStyle: "italic", textTransform: "uppercase" }}>
            {s.text}
          </text>
        );
      })}

      {/* régions cliquables */}
      {order.map((id) => {
        const r = HOME_MAP.regions[id];
        if (!r) return null;
        const meta = REGION_BY_ID[id];
        const selected = selectedId === id;
        const hover = hoverId === id;
        return (
          <g
            key={id}
            className="gv-region-shape"
            role="button"
            tabIndex={0}
            aria-label={`${meta.name}, ${pagesLabel(meta)}`}
            aria-pressed={selected}
            onClick={() => onSelect(id)}
            onKeyDown={activate(id)}
            onMouseEnter={() => onHover(id)}
            onMouseLeave={() => onHover(null)}
            onFocus={() => onHover(id)}
            onBlur={() => onHover(null)}
            filter={selected ? `url(#${uid}-lift)` : undefined}
          >
            <title>{`${meta.name} — ${pagesLabel(meta)}`}</title>
            <path
              d={r.d}
              fill={meta.color}
              stroke={selected ? "#111" : hover ? "#111" : meta.color}
              strokeWidth={selected ? 2.6 : hover ? 1.8 : 0.8}
              strokeLinejoin="round"
              opacity={selectedId && !selected && !hover ? 0.86 : 1}
            />
          </g>
        );
      })}

      {/* frontières entre régions */}
      <path d={HOME_MAP.borders} fill="none" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" opacity="0.9" style={{ pointerEvents: "none" }} />

      {/* Tokyo et Kyoto : repères ronds */}
      {(["tokyo", "kyoto"] as const).map((id) => {
        const r = HOME_MAP.regions[id];
        if (!r) return null;
        const meta = REGION_BY_ID[id];
        const [cx, cy] = r.label;
        const left = false;
        return (
          <g key={id} style={{ pointerEvents: "none" }}>
            {compact && <circle cx={cx} cy={cy} r={42} fill="transparent" style={{ pointerEvents: "all", cursor: "pointer" }} onClick={() => onSelect(id)} />}
            <circle cx={cx} cy={cy} r={selectedId === id ? 9 : 7} fill={meta.color} stroke="#111" strokeWidth="1.6" />
            <text x={cx + (id === "kyoto" ? 4 : 13)} y={cy + (id === "kyoto" ? -14 : 5)} textAnchor={left ? "end" : "start"} fontSize={16 * (compact ? 1.25 : 1)} letterSpacing="2" style={{ fontFamily: "var(--font-garamond)", fontWeight: 600, textTransform: "uppercase", paintOrder: "stroke", stroke: "#fff", strokeWidth: 4, strokeLinejoin: "round" }} fill="#111">
              {meta.name}
            </text>
          </g>
        );
      })}

      {/* noms de régions */}
      {(Object.keys(LABELS) as RegionId[]).map((id) => {
        const r = HOME_MAP.regions[id];
        const l = LABELS[id];
        if (!r || !l) return null;
        const meta = REGION_BY_ID[id];
        const [cx, cy] = project(HOME_MAP.proj, l.lonLat);
        return (
          <text key={id} textAnchor="middle" fontSize={(l.size ?? 16) * m} letterSpacing="1.6" fill={meta.onColor} style={{ fontFamily: "var(--font-garamond)", fontWeight: 600, pointerEvents: "none" }}>
            {l.lines.map((line, i) => (
              <tspan key={i} x={cx} y={cy + (i - (l.lines.length - 1) / 2) * ((l.size ?? 16) * m * 1.18)} dy="0.35em">
                {line}
              </tspan>
            ))}
          </text>
        );
      })}

      {/* villes */}
      {!compact && CITIES.map((c) => {
        const [x, y] = project(HOME_MAP.proj, c.lonLat);
        return (
          <g key={c.name} style={{ pointerEvents: "none" }}>
            <circle cx={x} cy={y} r="2.4" fill="#111" stroke="#fff" strokeWidth="1" />
            <text x={x + (c.dx ?? 6)} y={y + (c.dy ?? 0)} dy="0.34em" textAnchor={c.anchor ?? "start"} fontSize="11.5" style={{ fontFamily: "var(--font-gothic)", fontStretch: "75%", fontVariationSettings: '"wdth" 75', fontStyle: "italic", fontWeight: 500, paintOrder: "stroke", stroke: "#fffffff0", strokeWidth: 3, strokeLinejoin: "round" }} fill="#1a1814">
              {c.name}
            </text>
          </g>
        );
      })}

      {/* encart : l'archipel d'Okinawa */}
      <g
        className="gv-region-shape"
        role="button"
        tabIndex={0}
        aria-label={`${okiRegion.name}, ${pagesLabel(okiRegion)}`}
        aria-pressed={selectedId === "okinawa"}
        onClick={() => onSelect("okinawa")}
        onKeyDown={activate("okinawa")}
        onMouseEnter={() => onHover("okinawa")}
        onMouseLeave={() => onHover(null)}
        onFocus={() => onHover("okinawa")}
        onBlur={() => onHover(null)}
      >
        <title>{`${okiRegion.name} — ${pagesLabel(okiRegion)}`}</title>
        <rect x={oki.box.x} y={oki.box.y} width={oki.box.w} height={oki.box.h} fill="#f6fbfd" stroke="#111" strokeWidth={selectedId === "okinawa" ? 2.4 : 1} />
        <rect x={oki.box.x + 3} y={oki.box.y + 3} width={oki.box.w - 6} height={oki.box.h - 6} fill="none" stroke="#111" strokeWidth="0.5" />
        <text x={oki.box.x + oki.box.w / 2} y={oki.box.y + 24} textAnchor="middle" fontSize="12.5" letterSpacing="1.6" style={{ fontFamily: "var(--font-garamond)", fontVariantCaps: "small-caps", fontWeight: 600 }} fill="#111">
          L’ARCHIPEL D’OKINAWA
        </text>
        <path d={oki.d} fill={okiRegion.color} stroke={selectedId === "okinawa" || hoverId === "okinawa" ? "#111" : okiRegion.color} strokeWidth={selectedId === "okinawa" ? 1.6 : 1} strokeLinejoin="round" />
        <text x={oki.box.x + oki.box.w - 14} y={oki.box.y + oki.box.h - 12} textAnchor="end" fontSize="13" letterSpacing="2" fill="#111" style={{ fontFamily: "var(--font-garamond)", fontWeight: 600 }}>
          OKINAWA
        </text>
      </g>

      {/* rose des vents, échelle */}
      <g transform="translate(26 84)" style={{ pointerEvents: "none" }}>
        <Compass size={68} />
      </g>
      <g transform={`translate(36 ${H - 70})`} style={{ pointerEvents: "none" }}>
        <rect x="0" y="0" width={km100} height="5" fill="#fff" stroke="#111" strokeWidth="1" />
        <rect x="0" y="0" width={km100 / 2} height="5" fill="#111" />
        <text x="0" y="-5" fontSize="11" style={{ fontFamily: "var(--font-gothic)", fontStretch: "75%", fontStyle: "italic" }} fill="#26241f">
          0
        </text>
        <text x={km100} y="-5" textAnchor="end" fontSize="11" style={{ fontFamily: "var(--font-gothic)", fontStretch: "75%", fontStyle: "italic" }} fill="#26241f">
          100 km
        </text>
      </g>
    </svg>
  );
}
