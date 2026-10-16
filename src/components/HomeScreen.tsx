"use client";

import { useState } from "react";
import type { RegionId } from "@/lib/types";
import { useApp } from "@/state/app-state";
import { ColorCodeFlap } from "./ColorCodeFlap";
import { EyeLogo } from "./Icons";
import { JapanMap } from "./JapanMap";
import { RegionPreviewCard } from "./RegionPreviewCard";

/** Écran d'accueil : la carte d'ensemble « Le Japon région par région », entièrement visible dans l'écran. */
export function HomeScreen() {
  const { state, previewRegion, openRegion } = useApp();
  const [hoverId, setHoverId] = useState<RegionId | null>(null);
  const selectedId = state.previewId;

  return (
    <div className="flex min-h-dvh flex-col md:h-dvh md:overflow-hidden">
      {/* Bandeau noir de couverture */}
      <div className="gv-band shrink-0" role="banner">
        <span>Guides</span>
        <EyeLogo size={15} />
        <span>Voir</span>
      </div>

      <div className="mx-auto flex min-h-0 w-full max-w-[1400px] flex-1 flex-col px-3 sm:px-6">
        <header className="flex shrink-0 flex-wrap items-end justify-between gap-x-10 gap-y-1 border-b border-[#111] pb-2 pt-3">
          <h1 className="gv-cover-title m-0 text-[clamp(52px,10dvh,96px)]">JAPON</h1>
          <div className="max-w-[46ch] pb-1">
            <p className="gv-collection m-0 text-[clamp(11px,1.3vw,13px)] leading-[1.7]">Le Japon région par région</p>
            <p className="f-body m-0 text-[14.5px] italic leading-[1.25] text-[#3a3832]">
              Choisissez une région sur la carte : un aperçu s’ouvre, puis explorez-la page à page ou en visite guidée.
            </p>
          </div>
        </header>

        <main className="grid min-h-0 flex-1 items-stretch gap-5 py-3 md:grid-cols-[auto_minmax(0,1fr)] md:gap-8">
          <section aria-label="Carte d’ensemble" className="gv-frame flex min-h-0 justify-center md:justify-start md:self-start">
            <JapanMap selectedId={selectedId} hoverId={hoverId} onSelect={previewRegion} onHover={setHoverId} className="block h-auto w-full max-w-[560px] md:h-[max(360px,calc(100dvh-232px))] md:w-auto md:max-w-none md:aspect-[820/940]" />
          </section>

          <div className="flex min-h-0 flex-col gap-3 md:overflow-y-auto [&>*:first-child]:mt-auto [&>*:last-child]:mb-auto">
            {selectedId ? (
              <RegionPreviewCard regionId={selectedId} onExplore={(id) => openRegion(id)} />
            ) : (
              <div className="shrink-0 border border-dashed border-[#111] p-4 text-center">
                <p className="f-garamond m-0 text-[19px]">Aucune région sélectionnée</p>
                <p className="f-body m-0 mt-0.5 text-[14px] italic text-[#4a4742]">Touchez une couleur sur la carte, ou une ligne du code couleur ci-dessous.</p>
              </div>
            )}
            <ColorCodeFlap selectedId={selectedId} hoverId={hoverId} onSelect={previewRegion} onHover={setHoverId} />
          </div>
        </main>

        <footer className="f-gothic shrink-0 border-t border-[#111] py-1.5 text-[11px] italic text-[#4a4742]">
          Prototype de direction artistique — d’après <em>Guides Voir · Japon</em> (Hachette / Dorling Kindersley). Photographies : Wikimedia Commons —{" "}
          <a href="/credits" target="_blank" rel="noopener noreferrer" className="underline">
            crédits
          </a>
          .
        </footer>
      </div>
    </div>
  );
}
