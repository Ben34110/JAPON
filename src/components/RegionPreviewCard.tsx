"use client";

import type { CSSProperties } from "react";
import { CONTENT } from "@/data/content";
import { REGION_BY_ID, TOKYO_PARTS, pagesLabel } from "@/data/regions";
import type { RegionId } from "@/lib/types";
import { fr } from "@/lib/typo";
import { Badge } from "./Badge";
import { PhotoPlaceholder } from "./PhotoPlaceholder";

/**
 * Fiche d'aperçu d'un chapitre — calquée sur les vignettes de la carte d'ensemble :
 * photo à cadre de la couleur du chapitre, nom en petites capitales, « Pages x-y » en italique.
 */
export function RegionPreviewCard({ regionId, onExplore }: { regionId: RegionId; onExplore: (id: RegionId) => void }) {
  const region = REGION_BY_ID[regionId];
  const content = CONTENT[regionId];
  return (
    <article
      key={regionId}
      className="gv-rise relative border border-[#111] bg-[var(--paper)] p-3.5"
      style={{ "--region": region.color, "--on-region": region.onColor } as CSSProperties}
      aria-live="polite"
    >
      <span className="pointer-events-none absolute inset-[3px] border-[0.5px] border-[#1119]" aria-hidden="true" />
      <div className="relative flex gap-4 max-[420px]:flex-col">
        <div className="w-[42%] shrink-0 max-[420px]:w-full">
          {/* cadre de couleur + liseré blanc + filet noir, comme les vignettes du guide */}
          <div className="border border-[#111] bg-white p-[3px]">
            <div className="p-[7px]" style={{ background: region.color }}>
              <div className="border border-white/80 leading-[0]">
                <PhotoPlaceholder spec={region.photo} label={`Photographie : ${region.name}`} />
              </div>
            </div>
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="f-garamond m-0 text-[24px] font-semibold leading-[1.02] [font-variant-caps:small-caps] [font-feature-settings:'smcp','c2sc'] tracking-[0.04em]">{fr(region.name)}</h3>
          <div className="f-kanji mt-1 text-[13px] tracking-[0.06em] text-[#2b2925]" lang="ja">
            {region.nameJa}
          </div>
          <div className="mt-1 flex items-center gap-2">
            <span className="inline-block h-[3px] w-6" style={{ background: region.color }} aria-hidden="true" />
            <span className="f-body text-[14px] italic text-[#3a3832]">{pagesLabel(region)}</span>
          </div>
          <p className="gv-prose mt-2.5 !text-[14.2px] !leading-[1.3]" style={{ textIndent: 0 }}>
            {fr(region.summary)}
          </p>
        </div>
      </div>

      <div className="relative mt-3.5 border-t border-[#111] pt-2.5">
        <div className="f-didone mb-1.5 text-[9.5px] uppercase tracking-[0.28em] text-[#3b3935]">À ne pas manquer</div>
        <ul className="m-0 flex list-none flex-wrap gap-x-4 gap-y-0.5 p-0">
          {content.pois.slice(0, 5).map((p) => (
            <li key={p.id} className="f-garamond flex items-center gap-1 text-[15px] leading-[1.45]">
              {fr(p.name)} <Badge n={p.marker} />
            </li>
          ))}
        </ul>
        {regionId === "tokyo" && (
          <ul className="f-body mt-2 list-none p-0 text-[12.5px] italic text-[#4a4742]">
            {TOKYO_PARTS.map((t) => (
              <li key={t.name}>
                {t.name}, pages {t.pages[0]}-{t.pages[1]}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="relative mt-3.5 flex flex-wrap items-center gap-3">
        <button type="button" className="gv-btn" onClick={() => onExplore(regionId)}>
          Explorer la région
          <svg width="16" height="10" viewBox="0 0 16 10" aria-hidden="true">
            <path d="M0 5h14M10 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span className="f-body text-[13px] italic text-[#4a4742]">
          {content.pois.length} sites · pages {content.startFolio}-{content.startFolio + content.pages.length - 1}
        </span>
      </div>
    </article>
  );
}
