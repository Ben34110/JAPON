"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { CONTENT } from "@/data/content";
import { REGIONS, REGION_BY_ID, pagesLabel } from "@/data/regions";
import type { RegionId } from "@/lib/types";
import { fr } from "@/lib/typo";
import { useApp } from "@/state/app-state";
import { EyeLogo } from "./Icons";
import { GuidedTourControls } from "./GuidedTourControls";
import { RegionColumnsLayout } from "./RegionColumnsLayout";
import { RegionMapPanel } from "./RegionMapPanel";
import { SoundToggle } from "./SoundToggle";

/** Vue détaillée d'une région : tout tient dans l'écran — carte synchronisée à gauche, pages du guide à droite. */
export function RegionView({ regionId }: { regionId: RegionId }) {
  const { session, backToMap, openRegion, activatePoi, startTour, stopTour, step, goto } = useApp();
  const region = REGION_BY_ID[regionId];
  const content = CONTENT[regionId];
  const [mapExpanded, setMapExpanded] = useState(false);

  const activePoiId = session?.activePoiId ?? null;
  const tourMode = session?.mode === "tour";
  const tourIndex = session?.tourIndex ?? 0;

  const steps = useMemo(
    () => content.pois.map((p) => ({ id: p.id, name: p.name, nameJa: p.nameJa, marker: p.marker })),
    [content.pois],
  );

  // clavier : ← → pour la visite, Échap pour la quitter
  useEffect(() => {
    if (!tourMode) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
      if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "Escape") stopTour();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [tourMode, step, stopTour]);

  const vars = { "--region": region.color, "--on-region": region.onColor } as CSSProperties;

  return (
    <div style={vars} data-mode={tourMode ? "tour" : "free"} className="flex h-dvh flex-col overflow-hidden pb-[env(safe-area-inset-bottom)]">
      {/* Bandeau noir, comme le dos du guide */}
      <header className="shrink-0" style={{ background: "#0b0b0b", color: "#fff" }}>
        <div className="mx-auto flex max-w-[1500px] items-center gap-3 px-3 py-2 sm:px-5">
          <button type="button" onClick={backToMap} className="f-gothic group flex min-h-[44px] items-center gap-2 border border-white/40 px-3 py-1.5 text-[12px] font-bold uppercase tracking-[0.14em] transition-colors hover:bg-white hover:text-black" aria-label="Retour à la carte générale">
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              <path d="M9 2 4 7l5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="max-sm:hidden max-[1000px]:hidden min-[1001px]:inline">Retour à la carte générale</span>
            <span className="hidden min-[640px]:max-[1000px]:inline">Carte générale</span>
            <span className="sm:hidden">Carte</span>
          </button>

          <div className="mx-auto flex min-w-0 items-center gap-3">
            <span className="hidden items-center gap-2 md:flex" aria-hidden="true">
              <EyeLogo size={13} />
            </span>
            <span className="inline-block h-3 w-3 shrink-0" style={{ background: region.color }} aria-hidden="true" />
            <span className="gv-collection truncate text-[12px] tracking-[0.2em] sm:text-[13px]">{fr(region.name)}</span>
            <span className="f-garamond hidden text-[12px] italic text-white/70 xl:inline">{pagesLabel(region)}</span>
          </div>

          <SoundToggle className="shrink-0" />

          <div className="flex shrink-0 items-stretch" role="group" aria-label="Mode de navigation">
            <button
              type="button"
              onClick={stopTour}
              aria-pressed={!tourMode}
              className="f-gothic border px-3 py-1.5 text-[12px] font-bold uppercase tracking-[0.12em] transition-colors max-sm:hidden"
              style={!tourMode ? { background: "#fff", color: "#111", borderColor: "#fff" } : { borderColor: "#ffffff66" }}
            >
              Exploration libre
            </button>
            <button
              type="button"
              onClick={tourMode ? stopTour : startTour}
              aria-pressed={tourMode}
              className="f-gothic min-h-[44px] border px-3 py-1.5 text-[12px] font-bold uppercase tracking-[0.12em] transition-colors sm:-ml-px"
              style={tourMode ? { background: region.color, color: region.onColor, borderColor: region.color } : { borderColor: "#ffffffcc" }}
            >
              {tourMode ? "Quitter la visite" : "Lancer la visite"}
            </button>
          </div>
        </div>
        <div style={{ height: 4, background: region.color }} />
      </header>

      <div className="mx-auto grid min-h-0 w-full max-w-[1500px] flex-1 gap-4 px-3 py-3 max-md:grid-rows-[auto_minmax(0,1fr)] sm:px-5 md:grid-cols-[minmax(360px,0.78fr)_minmax(0,1.3fr)] md:grid-rows-[minmax(0,1fr)] md:gap-8 md:py-4">
        <aside className="min-h-0 md:self-start" style={{ "--map-h": mapExpanded ? "46dvh" : "24dvh" } as CSSProperties}>
          <RegionMapPanel
            region={region}
            content={content}
            activePoiId={activePoiId}
            tourMode={tourMode}
            onPinClick={(id) => activatePoi(id, "map")}
            mapExpanded={mapExpanded}
            onToggleMapSize={() => setMapExpanded((v) => !v)}
          />
        </aside>

        <main className="flex h-full min-h-0 min-w-0 flex-col max-md:px-3 md:pl-1 md:pr-9">
          <RegionColumnsLayout
            key={regionId}
            region={region}
            content={content}
            activePoiId={activePoiId}
            nonce={session?.nonce ?? 0}
            source={session?.source}
            tourMode={tourMode}
            onSelectPoi={(id) => activatePoi(id, "text")}
            onStartTour={startTour}
            tourBar={
              <GuidedTourControls steps={steps} index={tourIndex} onPrev={() => step(-1)} onNext={() => step(1)} onGoto={goto} onExit={stopTour} />
            }
          />
        </main>
      </div>

      {/* Onglets de chapitre au bord de l'écran : on change de région sans perdre son état */}
      <nav aria-label="Chapitres du guide" className="fixed right-0 top-1/3 z-30 hidden flex-col gap-[3px] md:flex">
        {REGIONS.map((r) => {
          const on = r.id === regionId;
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => (on ? undefined : openRegion(r.id))}
              aria-label={`${r.name}, ${pagesLabel(r)}`}
              aria-current={on ? "page" : undefined}
              title={`${fr(r.name)} — ${pagesLabel(r)}`}
              className="block rounded-l-full transition-[width] duration-200 hover:!w-9"
              style={{ background: r.color, width: on ? 30 : 14, height: 26, border: 0, boxShadow: "-1px 0 0 #1115 inset" }}
            />
          );
        })}
      </nav>
    </div>
  );
}
