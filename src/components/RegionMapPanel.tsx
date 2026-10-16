"use client";

import { useMemo, useState } from "react";
import { DETAIL_MAPS } from "@/data/geo.generated";
import { PLANS } from "@/data/plans";
import { project, makeProjection } from "@/lib/projection";
import type { Region, RegionContent } from "@/lib/types";
import { fr } from "@/lib/typo";
import { Badge } from "./Badge";
import { Compass } from "./Icons";
import { MapCanvas, type MapPin, type ViewBox } from "./MapCanvas";
import { GeoBase, PlanBase } from "./MapBases";

interface Props {
  region: Region;
  content: RegionContent;
  activePoiId: string | null;
  tourMode: boolean;
  onPinClick: (poiId: string) => void;
}

/**
 * Carte de la région : cadre rouge et blanc, rose des vents, échelle, repères numérotés
 * et liste « Les sites d'un coup d'œil ». Synchronisée avec la colonne de texte.
 */
export function RegionMapPanel({ region, content, activePoiId, tourMode, onPinClick }: Props) {
  const [manualZoom, setManualZoom] = useState(false);
  const isPlan = region.mapKind === "plan";
  const plan = isPlan ? PLANS[region.id as "tokyo" | "kyoto"] : null;
  const detail = !isPlan ? DETAIL_MAPS[region.id] : null;

  const pins = useMemo<MapPin[]>(() => {
    return content.pois.flatMap((p) => {
      let xy: [number, number] | null = null;
      if (isPlan && p.plan) xy = p.plan;
      else if (detail && p.geo) xy = project(detail.proj, p.geo);
      return xy ? [{ id: p.id, marker: p.marker, name: p.name, x: xy[0], y: xy[1] }] : [];
    });
  }, [content.pois, isPlan, detail]);

  // échelle : 50 km (carte géographique) ou 100 m (plan)
  const scaleUnits = useMemo(() => {
    if (!detail) return { units: 150, label: "100 m" };
    const proj = makeProjection(detail.proj);
    const inv = proj.invert?.([detail.viewBox[0] / 2, detail.viewBox[1] / 2]);
    const lat = inv ? inv[1] : 35;
    const dLon = 50 / (111.32 * Math.cos((lat * Math.PI) / 180));
    const a = proj([inv?.[0] ?? 135, lat]) ?? [0, 0];
    const b = proj([(inv?.[0] ?? 135) + dLon, lat]) ?? [0, 0];
    return { units: Math.abs(b[0] - a[0]), label: "50 km" };
  }, [detail]);

  const zoom = tourMode || manualZoom;
  const size: [number, number] = [1000, 1000];

  const overlay = (vb: ViewBox) => (
    <>
      <div className="pointer-events-none absolute left-2 top-2 opacity-95" aria-hidden="true">
        <Compass size={58} />
      </div>
      <div className="pointer-events-none absolute bottom-2 left-3 right-3 flex items-end justify-between">
        <div style={{ width: `${(scaleUnits.units / vb.w) * 100}%`, minWidth: 28, maxWidth: "60%" }} aria-hidden="true">
          <div className="f-gothic text-[10px] italic leading-none text-[#26241f] [text-shadow:0_0_3px_#fff,0_0_3px_#fff]">{scaleUnits.label}</div>
          <div className="mt-[2px] h-[6px] border-x border-b border-[#111]" style={{ background: "linear-gradient(90deg,#111 50%,#fff 50%)", backgroundSize: "50% 100%" }} />
        </div>
      </div>
      <button
        type="button"
        className="gv-btn ghost absolute right-2 top-2 !px-2.5 !py-1.5 !text-[11px] !tracking-[0.12em] bg-[var(--paper)]"
        onClick={() => setManualZoom((z) => !z)}
        aria-pressed={zoom}
        disabled={tourMode}
        title={tourMode ? "Le zoom suit la visite guidée" : zoom ? "Revenir à la vue d'ensemble" : "Zoomer sur le site sélectionné"}
      >
        {zoom ? "Vue d'ensemble" : "Zoom sur le site"}
      </button>
    </>
  );

  return (
    <div className="gv-frame" style={{ "--region": region.color, "--on-region": region.onColor } as React.CSSProperties}>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <h2 className="f-garamond m-0 text-[19px] font-semibold leading-none">{fr(content.mapTitle)}</h2>
        <span className="f-didone text-[9px] uppercase tracking-[0.3em] text-[#4a4742]">{isPlan ? "Plan" : "Carte"}</span>
      </div>
      <div className="border border-[#111]">
        <MapCanvas
          size={size}
          pins={pins}
          activeId={activePoiId}
          zoom={zoom}
          color={region.color}
          onColor={region.onColor}
          onPinClick={onPinClick}
          ariaLabel={`${isPlan ? "Plan" : "Carte"} : ${region.name}`}
          overlay={overlay}
          className="max-lg:aspect-auto! max-lg:h-[34dvh]"
        >
          {plan ? <PlanBase plan={plan} /> : detail ? <GeoBase detail={detail} labels={content.mapLabels} /> : null}
        </MapCanvas>
      </div>

      <div className="gv-glance mt-3 max-lg:hidden">
        <h3>Les sites d’un coup d’œil</h3>
        <div className="grid grid-cols-1 gap-x-5 sm:grid-cols-2" role="list">
          {content.pois.map((p) => (
            <button key={p.id} type="button" role="listitem" data-active={p.id === activePoiId ? "true" : undefined} onClick={() => onPinClick(p.id)}>
              <span>{fr(p.name)}</span>
              <Badge n={p.marker} active={p.id === activePoiId} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
