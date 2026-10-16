"use client";

import { useId } from "react";
import type { DetailMapData } from "@/data/geo.generated";
import type { PlanData } from "@/data/plans";
import type { MapLabel } from "@/lib/types";
import { fr } from "@/lib/typo";
import { project } from "@/lib/projection";
import { useMapScale } from "./MapCanvas";

const HALO = { paintOrder: "stroke", stroke: "#ffffffd9", strokeLinejoin: "round" } as const;

/** Carte géographique d'une région : terre jaune-vert pâle, mer turquoise, frontières pointillées. */
export function GeoBase({ detail, labels }: { detail: DetailMapData; labels: MapLabel[] }) {
  const id = useId().replace(/:/g, "");
  const k = useMapScale();
  const [W, H] = detail.viewBox;
  return (
    <g>
      <defs>
        <radialGradient id={`${id}-sea`} cx="50%" cy="50%" r="75%">
          <stop offset="0" stopColor="#d9eff5" />
          <stop offset="1" stopColor="#b9dfec" />
        </radialGradient>
        <linearGradient id={`${id}-land`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e9efbd" />
          <stop offset="1" stopColor="#d2e1a0" />
        </linearGradient>
        <pattern id={`${id}-hach`} width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(38)">
          <path d="M0 0V9" stroke="#8fa95b" strokeWidth="0.9" opacity="0.28" />
        </pattern>
        <filter id={`${id}-blur`} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>
      <rect x={-W} y={-H} width={W * 3} height={H * 3} fill={`url(#${id}-sea)`} />
      {detail.neighbors && (
        <>
          <path d={detail.neighbors} fill="none" stroke="#ffffff" strokeWidth="18" strokeLinejoin="round" opacity="0.7" filter={`url(#${id}-blur)`} />
          <path d={detail.neighbors} fill="#eceed4" stroke="#c9cfa4" strokeWidth="1.4" />
        </>
      )}
      <path d={detail.land} fill="none" stroke="#ffffff" strokeWidth="20" strokeLinejoin="round" opacity="0.85" filter={`url(#${id}-blur)`} />
      <path d={detail.land} fill={`url(#${id}-land)`} stroke="#8ea45a" strokeWidth="1.8" strokeLinejoin="round" />
      <path d={detail.land} fill={`url(#${id}-hach)`} />
      <path d={detail.borders} fill="none" stroke="#7f9650" strokeWidth="1.3" strokeDasharray="2 5" strokeLinecap="round" opacity="0.8" />
      {labels.map((l, i) => {
        if (!l.geo) return null;
        const [x, y] = project(detail.proj, l.geo);
        if (x < -50 || x > W + 50 || y < -50 || y > H + 50) return null;
        if (l.kind === "sea")
          return (
            <text key={i} x={x} y={y} textAnchor="middle" transform={`rotate(${l.rotate ?? 0} ${x} ${y})`} fontSize={22 * k} letterSpacing={`${0.32 * 22 * k}`} style={{ fontFamily: "var(--font-garamond)", fontStyle: "italic", textTransform: "uppercase", ...HALO, strokeWidth: 5 * k }} fill="#4d8fae">
              {fr(l.text)}
            </text>
          );
        if (l.kind === "relief")
          return (
            <text key={i} x={x} y={y} textAnchor="middle" transform={`rotate(${l.rotate ?? 0} ${x} ${y})`} fontSize={19 * k} letterSpacing={`${0.14 * 19 * k}`} style={{ fontFamily: "var(--font-garamond)", fontStyle: "italic", fontWeight: 600, textTransform: "uppercase", ...HALO, stroke: "#eef2c8", strokeWidth: 4 * k }} fill="#556a2f">
              {fr(l.text)}
            </text>
          );
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={4.2 * k} fill="#111" stroke="#fff" strokeWidth={1.2 * k} />
            <text x={x + 9 * k} y={y} dy="0.34em" fontSize={19 * k} style={{ fontFamily: "var(--font-gothic)", fontStretch: "75%", fontVariationSettings: '"wdth" 75', fontStyle: "italic", fontWeight: 600, ...HALO, strokeWidth: 4 * k }} fill="#26241f">
              {fr(l.text)}
            </text>
          </g>
        );
      })}
    </g>
  );
}

/** Plan de quartier stylisé (Tokyo-nord, Kyoto). */
export function PlanBase({ plan }: { plan: PlanData }) {
  const k = useMapScale();
  return (
    <g>
      <rect x={-1000} y={-1000} width={3000} height={3000} fill={plan.background} />
      {plan.layers.map((l, i) => (
        <path
          key={i}
          d={l.d}
          fill={l.fill ?? "none"}
          stroke={l.stroke ?? "none"}
          strokeWidth={l.width}
          strokeDasharray={l.dash}
          strokeLinecap={l.cap ?? "round"}
          strokeLinejoin="round"
          opacity={l.opacity}
        />
      ))}
      {plan.stations.map((s, i) => (
        <g key={i} transform={`translate(${s.x} ${s.y}) scale(${k})`}>
          <rect x="-9" y="-9" width="18" height="18" rx="3" fill="#d2232a" stroke="#fff" strokeWidth="2" />
          <text textAnchor="middle" dy="0.36em" fontSize="13" fontWeight="700" fill="#fff" style={{ fontFamily: "var(--font-gothic)" }}>
            S
          </text>
          {s.name && (
            <text x={(s.dx ?? 14) / 1} y={(s.dy ?? 4) / 1} fontSize="17" style={{ fontFamily: "var(--font-gothic)", fontStretch: "75%", fontVariationSettings: '"wdth" 75', fontStyle: "italic", fontWeight: 600, ...HALO, strokeWidth: 4 }} fill="#26241f">
              {fr(s.name)}
            </text>
          )}
        </g>
      ))}
      {plan.labels.map((l, i) => {
        const common = { x: l.x, y: l.y, textAnchor: l.anchor ?? "middle", transform: l.rotate ? `rotate(${l.rotate} ${l.x} ${l.y})` : undefined } as const;
        if (l.kind === "park")
          return (
            <text key={i} {...common} fontSize={24 * k} letterSpacing={`${0.14 * 24 * k}`} style={{ fontFamily: "var(--font-didone)", textTransform: "uppercase", ...HALO, stroke: "#dff0c8", strokeWidth: 5 * k }} fill="#3d6b2b">
              {fr(l.text)}
            </text>
          );
        if (l.kind === "water")
          return (
            <text key={i} {...common} fontSize={20 * k} letterSpacing={`${0.2 * 20 * k}`} style={{ fontFamily: "var(--font-garamond)", fontStyle: "italic", textTransform: "uppercase", ...HALO, stroke: "#cfe9f2", strokeWidth: 5 * k }} fill="#3f87a6">
              {fr(l.text)}
            </text>
          );
        if (l.kind === "line")
          return (
            <text key={i} {...common} fontSize={17 * k} style={{ fontFamily: "var(--font-gothic)", fontStretch: "75%", fontVariationSettings: '"wdth" 75', fontStyle: "italic", fontWeight: 600, ...HALO, strokeWidth: 4 * k }} fill="#555">
              {fr(l.text)}
            </text>
          );
        return (
          <text key={i} {...common} fontSize={(l.kind === "district" ? 21 : 19) * k} style={{ fontFamily: "var(--font-garamond)", fontStyle: l.kind === "district" ? "italic" : "normal", fontWeight: 600, ...HALO, strokeWidth: 5 * k }} fill="#111">
            {fr(l.text)}
          </text>
        );
      })}
    </g>
  );
}
