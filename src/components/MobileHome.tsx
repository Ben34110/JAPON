"use client";

import { useState } from "react";
import { REGIONS, pagesLabel } from "@/data/regions";
import type { RegionId } from "@/lib/types";
import { fr } from "@/lib/typo";
import { useApp } from "@/state/app-state";
import { EyeLogo } from "./Icons";
import { JapanMap } from "./JapanMap";
import { RegionPreviewCard } from "./RegionPreviewCard";
import { SoundToggle } from "./SoundToggle";

/**
 * Accueil sur téléphone : tout tient dans l'écran. La carte occupe la place disponible,
 * la fiche de la région sélectionnée s'ouvre sous la carte (sans la masquer), et le bandeau
 * de chapitres colorés — comme les onglets du guide — se fait défiler du doigt.
 */
export function MobileHome() {
  const { state, previewRegion, openRegion } = useApp();
  const [hoverId, setHoverId] = useState<RegionId | null>(null);
  const selectedId = state.previewId;

  return (
    <div className="flex h-dvh flex-col pb-[env(safe-area-inset-bottom)] md:hidden">
      <div className="gv-band relative shrink-0 !py-2.5 !text-[13px]" role="banner">
        <span>Guides</span>
        <EyeLogo size={13} />
        <span>Voir</span>
        <SoundToggle className="absolute right-1 top-1/2 -translate-y-1/2 !px-2 !py-1.5" />
      </div>

      <header className="flex shrink-0 items-end justify-between gap-3 border-b border-[#111] px-3 pb-1.5 pt-2">
        <h1 className="gv-cover-title m-0 text-[44px]">JAPON</h1>
        <p className="f-body m-0 max-w-[17ch] pb-1 text-right text-[13.5px] italic leading-[1.2] text-[#3a3832]">
          {selectedId ? "Touchez une autre couleur pour changer de région" : "Touchez une région pour la découvrir"}
        </p>
      </header>

      <main className="min-h-0 flex-1 px-2 py-2">
        <section aria-label="Carte d’ensemble" className="gv-frame gv-frame-lite flex h-full min-h-0 items-center justify-center">
          <JapanMap compact selectedId={selectedId} hoverId={hoverId} onSelect={previewRegion} onHover={setHoverId} className="block h-full w-full" />
        </section>
      </main>

      {/* fiche de la région : s'ouvre sous la carte, la carte se resserre */}
      {selectedId && (
        <div className="shrink-0 px-2 pb-2">
          <div className="relative">
            <button
              type="button"
              onClick={() => previewRegion(null)}
              aria-label="Fermer l’aperçu"
              className="absolute -top-3 right-0 z-10 grid h-11 w-11 place-items-center rounded-full border border-[#111] bg-[var(--paper)] text-[18px] leading-none"
            >
              ×
            </button>
            <RegionPreviewCard regionId={selectedId} onExplore={(id) => openRegion(id)} />
          </div>
        </div>
      )}

      {/* chapitres : onglets colorés défilants */}
      <nav aria-label="Chapitres du guide" className="shrink-0 border-t border-[#111] bg-[var(--paper)]">
        <ul className="m-0 flex list-none snap-x gap-1.5 overflow-x-auto px-2 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {REGIONS.map((r) => {
            const on = selectedId === r.id;
            return (
              <li key={r.id} className="shrink-0 snap-start">
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => previewRegion(r.id)}
                  className="flex min-h-[48px] items-stretch border border-[#111] text-left transition-colors"
                  style={{ background: on ? `color-mix(in srgb, ${r.color} 18%, var(--paper))` : "transparent" }}
                >
                  <span className="block w-[7px] shrink-0" style={{ background: r.color }} aria-hidden="true" />
                  <span className="flex flex-col justify-center px-2 py-1">
                    <span className={`f-garamond text-[13px] uppercase leading-[1.1] tracking-[0.03em] ${on ? "font-bold" : "font-medium"}`}>{fr(r.name).replace(/^Le /, "").replace(/^L’/, "")}</span>
                    <span className="f-body text-[11.5px] italic leading-[1.1] text-[#3a3832]">{pagesLabel(r)}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
