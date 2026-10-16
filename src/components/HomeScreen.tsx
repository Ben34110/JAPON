"use client";

import { useState } from "react";
import { REGION_BY_ID } from "@/data/regions";
import type { RegionId } from "@/lib/types";
import { useApp } from "@/state/app-state";
import { ColorCodeFlap } from "./ColorCodeFlap";
import { EyeLogo } from "./Icons";
import { JapanMap } from "./JapanMap";
import { RegionPreviewCard } from "./RegionPreviewCard";

/** Écran d'accueil : la carte d'ensemble « Le Japon région par région ». */
export function HomeScreen() {
  const { state, previewRegion, openRegion } = useApp();
  const [hoverId, setHoverId] = useState<RegionId | null>(null);
  const selectedId = state.previewId;

  return (
    <div>
      {/* Bandeau noir de couverture */}
      <div className="gv-band" role="banner">
        <span>Guides</span>
        <EyeLogo size={15} />
        <span>Voir</span>
      </div>

      <div className="mx-auto max-w-[1360px] px-3 pb-12 sm:px-6">
        <header className="flex flex-wrap items-end justify-between gap-x-10 gap-y-3 border-b border-[#111] pb-3 pt-5">
          <div className="flex items-end gap-5">
            <h1 className="gv-cover-title m-0 text-[clamp(64px,11vw,124px)]">JAPON</h1>
          </div>
          <div className="max-w-[46ch] pb-2">
            <p className="gv-collection m-0 text-[clamp(11px,1.4vw,14px)] leading-[1.7]">Le Japon région par région</p>
            <p className="f-body m-0 mt-1.5 text-[15.5px] italic leading-[1.3] text-[#3a3832]">
              Choisissez une région sur la carte : un aperçu s’ouvre, puis explorez-la page à page ou en visite guidée.
            </p>
          </div>
        </header>

        <main className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(340px,0.8fr)] lg:gap-9">
          <section aria-label="Carte d’ensemble" className="gv-frame">
            <JapanMap selectedId={selectedId} hoverId={hoverId} onSelect={previewRegion} onHover={setHoverId} />
          </section>

          <div className="flex flex-col gap-5 lg:sticky lg:top-5">
            {selectedId ? (
              <RegionPreviewCard regionId={selectedId} onExplore={(id) => openRegion(id)} />
            ) : (
              <div className="border border-dashed border-[#111] p-5 text-center">
                <p className="f-garamond m-0 text-[20px]">Aucune région sélectionnée</p>
                <p className="f-body m-0 mt-1 text-[14.5px] italic text-[#4a4742]">Touchez une couleur sur la carte, ou une ligne du code couleur ci-dessous.</p>
              </div>
            )}
            <ColorCodeFlap selectedId={selectedId} hoverId={hoverId} onSelect={previewRegion} onHover={setHoverId} />
          </div>
        </main>

        <footer className="f-gothic mt-10 border-t border-[#111] pt-3 text-[11px] italic text-[#4a4742]">
          Prototype de direction artistique — d’après <em>Guides Voir · Japon</em> (Hachette / Dorling Kindersley). Textes et visuels de substitution rédigés pour la maquette.
          {selectedId && <span className="sr-only"> Région sélectionnée : {REGION_BY_ID[selectedId].name}.</span>}
        </footer>
      </div>
    </div>
  );
}
