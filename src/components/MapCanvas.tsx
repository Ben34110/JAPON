"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { fr } from "@/lib/typo";

export interface MapPin {
  id: string;
  marker: number;
  name: string;
  x: number;
  y: number;
  /** repère de groupe (carte large) : regroupe plusieurs sites voisins */
  memberIds?: string[];
  /** côté du libellé d'un groupe de repères */
  labelDir?: "top" | "bottom" | "left" | "right";
}

export interface ViewBox {
  x: number;
  y: number;
  w: number;
  h: number;
}

const MapScaleCtx = createContext(1);
/** Facteur d'échelle courant : les éléments d'interface de la carte gardent la même taille à l'écran. */
export const useMapScale = () => useContext(MapScaleCtx);

const ease = (t: number) => 1 - Math.pow(1 - t, 3);

function useAnimatedViewBox(target: ViewBox, duration = 700): ViewBox {
  const [vb, setVb] = useState<ViewBox>(target);
  const cur = useRef<ViewBox>(target);
  useEffect(() => {
    const from = { ...cur.current };
    const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce || (from.x === target.x && from.y === target.y && from.w === target.w)) {
      cur.current = target;
      setVb(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const k = ease(Math.min(1, (t - t0) / duration));
      const next = {
        x: from.x + (target.x - from.x) * k,
        y: from.y + (target.y - from.y) * k,
        w: from.w + (target.w - from.w) * k,
        h: from.h + (target.h - from.h) * k,
      };
      cur.current = next;
      setVb(next);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return vb;
}

interface Props {
  size: [number, number];
  pins: MapPin[];
  activeId: string | null;
  zoom: boolean;
  zoomFactor?: number;
  color: string;
  onColor: string;
  onPinClick: (id: string) => void;
  ariaLabel: string;
  children: ReactNode;
  overlay?: (vb: ViewBox) => ReactNode;
  className?: string;
  /** carré qui occupe au mieux le conteneur (largeur et hauteur) */
  fit?: boolean;
}

/**
 * Canevas SVG commun aux cartes géographiques et aux plans : le `viewBox` s'anime
 * vers le site actif (zoom en mode visite), et les repères restent de taille constante.
 */
export function MapCanvas({
  size,
  pins,
  activeId,
  zoom,
  zoomFactor = 2.3,
  color,
  onColor,
  onPinClick,
  ariaLabel,
  children,
  overlay,
  className = "",
  fit = false,
}: Props) {
  const [W, H] = size;
  const isPinActive = (p: MapPin) => (p.memberIds ? !!activeId && p.memberIds.includes(activeId) : p.id === activeId);
  const active = pins.find(isPinActive) ?? null;

  const target = useMemo<ViewBox>(() => {
    if (!zoom || !active) return { x: 0, y: 0, w: W, h: H };
    const w = W / zoomFactor;
    const h = H / zoomFactor;
    return {
      x: Math.min(W - w, Math.max(0, active.x - w / 2)),
      y: Math.min(H - h, Math.max(0, active.y - h / 2)),
      w,
      h,
    };
  }, [zoom, active, W, H, zoomFactor]);

  const vb = useAnimatedViewBox(target);
  const k = vb.w / W;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const ordered = useMemo(() => [...pins].sort((a, b) => Number(isPinActive(a)) - Number(isPinActive(b))), [pins, activeId]);

  return (
    <div className={`relative overflow-hidden ${fit ? "" : "w-full"} ${className}`} style={{ aspectRatio: `${W} / ${H}`, background: "#cfe9f1", ...(fit ? { width: "min(100cqw, 100cqh)" } : {}) }}>
      <svg viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`} className="absolute inset-0 h-full w-full" role="group" aria-label={ariaLabel} preserveAspectRatio="xMidYMid meet">
        <MapScaleCtx.Provider value={k}>
          {children}
          {ordered.map((p) => {
            const isActive = isPinActive(p);
            const cluster = !!p.memberIds;
            const left = p.x > vb.x + vb.w * 0.66;
            return (
              <g
                key={p.id}
                className="gv-pin"
                transform={`translate(${p.x} ${p.y}) scale(${k})`}
                role="button"
                tabIndex={0}
                aria-label={cluster ? `${p.name}, ${p.memberIds!.length} sites : afficher le plan` : `${p.name}, repère ${p.marker}`}
                aria-pressed={isActive}
                onClick={() => onPinClick(p.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onPinClick(p.id);
                  }
                }}
                style={{ cursor: "pointer", outline: "none" }}
              >
                <title>{fr(p.name)}</title>
                {isActive && <circle r="24" fill={color} className="gv-pulse" style={{ transformBox: "fill-box", transformOrigin: "center", animation: "gv-pulse 1.9s ease-out infinite" }} />}
                <circle r={cluster ? 25 : isActive ? 24 : 18} fill={isActive ? color : cluster ? "#fff" : "#111"} stroke={isActive || cluster ? "#111" : "#fff"} strokeWidth={cluster ? 3.4 : isActive ? 3.2 : 2.6} style={{ transition: "fill 0.3s" }} />
                <text
                  textAnchor="middle"
                  dy="0.36em"
                  fontSize={isActive ? 25 : 20}
                  fontWeight="700"
                  fill={isActive ? onColor : cluster ? "#111" : "#fff"}
                  style={{ fontFamily: "var(--font-gothic)", fontStretch: "75%", fontVariationSettings: '"wdth" 75', pointerEvents: "none" }}
                >
                  {p.marker}
                </text>
                {(isActive || cluster) &&
                  (() => {
                    const dir = p.labelDir ?? (left ? "left" : "right");
                    const lt = { right: [32, 0, "start"], left: [-32, 0, "end"], top: [0, -44, "middle"], bottom: [0, 48, "middle"] }[dir] as [number, number, "start" | "end" | "middle"];
                    return (
                      <g transform={`translate(${lt[0]} ${lt[1]})`} style={{ pointerEvents: "none" }}>
                        <text
                          textAnchor={lt[2]}
                          dy="0.34em"
                          fontSize="30"
                          style={{ fontFamily: "var(--font-garamond)", fontWeight: 600, paintOrder: "stroke", stroke: "#fffdf6", strokeWidth: 8, strokeLinejoin: "round" }}
                          fill="#111"
                        >
                          {fr(p.name)}
                        </text>
                      </g>
                    );
                  })()}
              </g>
            );
          })}
        </MapScaleCtx.Provider>
      </svg>
      {overlay?.(vb)}
    </div>
  );
}
