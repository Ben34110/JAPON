"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { DETAIL_MAPS } from "@/data/geo.generated";
import { PLANS } from "@/data/plans";
import { project, makeProjection } from "@/lib/projection";
import type { Poi, Region, RegionContent } from "@/lib/types";
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
  /** téléphone : carte agrandie / repliée */
  mapExpanded?: boolean;
  onToggleMapSize?: () => void;
}

/** « wide » = carte régionale ; sinon clé d'un plan de quartier (tokyo-centre, kyoto…). */
type View = string;

/** Plans disponibles pour une région, dans l'ordre des onglets. */
function planKeysOf(regionId: string, content: RegionContent): { key: string; label: string }[] {
  if (regionId === "tokyo") return (content.sections ?? []).filter((s) => PLANS[`tokyo-${s.id}`]).map((s) => ({ key: `tokyo-${s.id}`, label: s.short }));
  if (regionId === "kyoto") return [{ key: "kyoto", label: "Plan de la ville" }];
  return [];
}

/** Plan auquel appartient un site (null si le site n'est que sur la carte large). */
function planOf(regionId: string, poi: Poi | undefined): string | null {
  if (!poi?.plan) return null;
  if (regionId === "tokyo") return poi.section ? `tokyo-${poi.section}` : null;
  if (regionId === "kyoto") return "kyoto";
  return null;
}

/**
 * Carte de la région : cadre rouge et blanc, rose des vents, échelle, repères numérotés
 * et liste « Les sites d'un coup d'œil ». Synchronisée avec la colonne de texte.
 * Tokyo : carte large + un plan par secteur (Centre, Nord, Ouest). Kyoto : carte large + plan de la ville.
 */
export function RegionMapPanel({ region, content, activePoiId, tourMode, onPinClick, mapExpanded = false, onToggleMapSize }: Props) {
  const [manualZoom, setManualZoom] = useState(false);
  const [viewPref, setViewPref] = useState<View>("wide");

  const planKeys = useMemo(() => planKeysOf(region.id, content), [region.id, content]);
  const detail = region.mapKind !== "plan" ? DETAIL_MAPS[region.id] : null;
  const hasPlans = planKeys.length > 0;

  const activePoi = content.pois.find((p) => p.id === activePoiId);

  // quand le site actif change (clic carte / texte / visite), la vue suit : secteur → son plan,
  // excursion → carte large. Ensuite, le choix d'un onglet par l'utilisateur reste prioritaire.
  const [prevActive, setPrevActive] = useState<string | null>(activePoiId);
  if (activePoiId !== prevActive) {
    setPrevActive(activePoiId);
    if (hasPlans && activePoi) setViewPref(planOf(region.id, activePoi) ?? "wide");
  }

  let view: View = hasPlans ? viewPref : "wide";
  // visite guidée : la vue est pilotée par l'étape (les onglets sont désactivés)
  if (hasPlans && tourMode && activePoi) view = planOf(region.id, activePoi) ?? "wide";
  const plan = view !== "wide" ? PLANS[view] : null;
  const isPlan = !!plan;

  const pins = useMemo<MapPin[]>(() => {
    const raw: { pin: MapPin; poi: Poi }[] = content.pois.flatMap((p) => {
      let xy: [number, number] | null = null;
      if (isPlan && planOf(region.id, p) === view && p.plan) xy = p.plan;
      else if (!isPlan && detail && p.geo) xy = project(detail.proj, p.geo);
      return xy ? [{ pin: { id: p.id, marker: p.marker, name: p.name, x: xy[0], y: xy[1] }, poi: p }] : [];
    });
    if (isPlan || !hasPlans) return raw.map((r) => r.pin);

    // carte large : un repère de groupe par secteur / par ville, les excursions restent seules
    const groups = new Map<string, { pins: MapPin[]; pois: Poi[] }>();
    for (const { pin, poi } of raw) {
      const key = planOf(region.id, poi) ?? `solo:${poi.id}`;
      const g = groups.get(key) ?? { pins: [], pois: [] };
      g.pins.push(pin);
      g.pois.push(poi);
      groups.set(key, g);
    }
    return [...groups.entries()].flatMap(([key, g]): MapPin[] => {
      if (g.pins.length === 1) return [g.pins[0]];
      const sec = content.sections?.find((s) => s.id === g.pois[0].section);
      return [
        {
          id: `cluster:${key}`,
          marker: g.pins.length,
          name: sec?.name ?? content.clusterLabel ?? region.name,
          x: Math.round((g.pins.reduce((s, p) => s + p.x, 0) / g.pins.length) * 10) / 10,
          y: Math.round((g.pins.reduce((s, p) => s + p.y, 0) / g.pins.length) * 10) / 10,
          memberIds: g.pins.map((p) => p.id),
          labelDir: sec?.labelDir ?? "right",
        },
      ];
    });
  }, [content, region.id, region.name, isPlan, view, detail, hasPlans]);

  // échelle : 10 km / 50 km (carte géographique) ou 100 m (plan)
  const scaleInfo = useMemo(() => {
    if (isPlan || !detail) return { units: 150, label: "100 m" };
    const proj = makeProjection(detail.proj);
    const inv = proj.invert?.([detail.viewBox[0] / 2, detail.viewBox[1] / 2]);
    const lat = inv ? inv[1] : 35;
    const km = hasPlans ? 10 : 50;
    const dLon = km / (111.32 * Math.cos((lat * Math.PI) / 180));
    const a = proj([inv?.[0] ?? 135, lat]) ?? [0, 0];
    const b = proj([(inv?.[0] ?? 135) + dLon, lat]) ?? [0, 0];
    return { units: Math.abs(b[0] - a[0]), label: `${km} km` };
  }, [detail, isPlan, hasPlans]);

  const zoom = tourMode || manualZoom;

  const handlePin = (id: string) => {
    if (id.startsWith("cluster:")) {
      // un groupe de sites voisins : on ouvre le plan de ce secteur
      setViewPref(id.slice("cluster:".length));
      return;
    }
    onPinClick(id);
  };

  const overlay = (vb: ViewBox) => (
    <>
      <div className="pointer-events-none absolute left-2 top-2 opacity-95 max-md:hidden" aria-hidden="true">
        <Compass size={58} />
      </div>
      <div className="pointer-events-none absolute bottom-2 left-3 right-3 flex items-end justify-between">
        <div style={{ width: `${(scaleInfo.units / vb.w) * 100}%`, minWidth: 28, maxWidth: "60%" }} aria-hidden="true">
          <div className="f-gothic text-[10px] italic leading-none text-[#26241f] [text-shadow:0_0_3px_#fff,0_0_3px_#fff]">{scaleInfo.label}</div>
          <div className="mt-[2px] h-[6px] border-x border-b border-[#111]" style={{ background: "linear-gradient(90deg,#111 50%,#fff 50%)", backgroundSize: "50% 100%" }} />
        </div>
      </div>
      <button
        type="button"
        className="gv-btn ghost absolute right-2 top-2 !px-2.5 !py-1.5 !text-[11px] !tracking-[0.12em] bg-[var(--paper)] max-md:!min-h-[44px]"
        onClick={() => setManualZoom((z) => !z)}
        aria-pressed={zoom}
        disabled={tourMode}
        title={tourMode ? "Le zoom suit la visite guidée" : zoom ? "Revenir à la vue d'ensemble" : "Zoomer sur le site sélectionné"}
      >
        {zoom ? "Vue d'ensemble" : "Zoom sur le site"}
      </button>
      {onToggleMapSize && (
        <button
          type="button"
          onClick={onToggleMapSize}
          aria-pressed={mapExpanded}
          className="gv-btn gv-mobile-only absolute bottom-2 right-2 !min-h-[44px] !px-3 !py-1.5 !text-[11px]"
        >
          {mapExpanded ? "Réduire la carte" : "Agrandir la carte"}
        </button>
      )}
    </>
  );

  const title = isPlan ? (plan?.title ?? content.mapTitle) : hasPlans ? `${region.name} et ses environs` : content.mapTitle;
  // beaucoup de sites (Tokyo) : la liste ne montre que ceux du plan affiché
  const glancePois = hasPlans && content.pois.length > 10 ? (isPlan ? content.pois.filter((p) => planOf(region.id, p) === view) : []) : content.pois;
  const tabs = hasPlans ? [{ key: "wide", label: "Carte" }, ...planKeys] : [];

  return (
    <div className="gv-frame gv-frame-lite flex min-h-0 flex-col max-md:h-full" style={{ "--region": region.color, "--on-region": region.onColor } as CSSProperties}>
      <div className="mb-2 flex shrink-0 items-baseline justify-between gap-3 max-md:hidden">
        <h2 className="f-garamond m-0 text-[19px] font-semibold leading-none">{fr(title)}</h2>
        <span className="f-didone text-[9px] uppercase tracking-[0.3em] text-[#4a4742]">{isPlan ? "Plan" : "Carte"}</span>
      </div>

      {hasPlans && (
        <div className="mb-2 flex shrink-0 max-md:mb-1.5 max-md:overflow-x-auto max-md:[scrollbar-width:none]" role="group" aria-label="Échelle de la carte">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              aria-pressed={view === t.key}
              disabled={tourMode}
              onClick={() => setViewPref(t.key)}
              className="f-gothic -ml-px flex-1 border border-[#111] px-2 py-1 text-[11px] max-md:min-h-[38px] max-md:shrink-0 max-md:px-4 font-bold uppercase tracking-[0.1em] transition-colors first:ml-0 disabled:cursor-default"
              style={view === t.key ? { background: "#111", color: "#fff" } : { background: "transparent" }}
              title={tourMode ? "La vue suit la visite guidée" : undefined}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}

      <div className="mx-auto min-h-0 w-full max-md:h-[var(--map-h,25dvh)] max-md:flex-none md:aspect-square md:w-[min(100%,calc(100dvh-var(--map-reserve)))]">
        <MapCanvas
          key={view}
          size={[1000, 1000]}
          pins={pins}
          activeId={activePoiId}
          zoom={zoom}
          zoomFactor={isPlan ? 2.3 : hasPlans ? 3 : 2.3}
          color={region.color}
          onColor={region.onColor}
          onPinClick={handlePin}
          ariaLabel={`${isPlan ? "Plan" : "Carte"} : ${region.name}`}
          overlay={overlay}
          className="gv-rise border border-[#111] max-md:aspect-auto! max-md:h-full"
        >
          {plan ? <PlanBase plan={plan} /> : detail ? <GeoBase detail={detail} labels={content.mapLabels} /> : null}
        </MapCanvas>
      </div>

      {glancePois.length > 0 && (
      <div className="gv-glance mt-3 shrink-0 max-md:hidden">
        <h3>{isPlan && content.pois.length > 10 ? `Les sites : ${plan?.title}` : "Les sites d’un coup d’œil"}</h3>
        <div className="grid grid-cols-1 gap-x-5 sm:grid-cols-2" role="list">
          {glancePois.map((p) => (
            <button key={p.id} type="button" role="listitem" data-active={p.id === activePoiId ? "true" : undefined} onClick={() => onPinClick(p.id)}>
              <span>{fr(p.name)}</span>
              <Badge n={p.marker} active={p.id === activePoiId} />
            </button>
          ))}
        </div>
      </div>
      )}
    </div>
  );
}
