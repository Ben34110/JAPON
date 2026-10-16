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
      className="gv-card gv-rise relative shrink-0 border border-[#111] bg-[var(--paper)] p-3"
      style={{ "--region": region.color, "--on-region": region.onColor } as CSSProperties}
      aria-live="polite"
    >
      <span className="pointer-events-none absolute inset-[3px] border-[0.5px] border-[#1119]" aria-hidden="true" />
      <div className="relative flex gap-3.5">
        <div className="w-[31%] shrink-0 max-[420px]:w-[38%]">
          {/* cadre de couleur + liseré blanc + filet noir, comme les vignettes du guide */}
          <div className="border border-[#111] bg-white p-[3px]">
            <div className="p-[6px]" style={{ background: region.color }}>
              <div className="border border-white/80 leading-[0]">
                <PhotoPlaceholder spec={{ ...region.photo, aspect: 0.78 }} label={`Photographie : ${region.name}`} />
              </div>
            </div>
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="f-garamond m-0 text-[24px] font-semibold leading-[1.02] [font-variant-caps:small-caps] [font-feature-settings:'smcp','c2sc'] tracking-[0.04em]">{fr(region.name)}</h3>
          <div className="mt-0.5 flex items-center gap-2">
            <span className="f-kanji text-[13px] tracking-[0.06em] text-[#2b2925]" lang="ja">
              {region.nameJa}
            </span>
            <span className="inline-block h-[3px] w-5" style={{ background: region.color }} aria-hidden="true" />
            <span className="f-body text-[14px] italic text-[#3a3832]">{pagesLabel(region)}</span>
          </div>
          <p className="gv-prose mt-2 !text-[13.8px] !leading-[1.28]" style={{ textIndent: 0 }}>
            {fr(region.summary)}
          </p>
          {regionId === "tokyo" && (
            <ul className="f-body m-0 mt-1 list-none p-0 text-[12px] italic text-[#4a4742]">
              {TOKYO_PARTS.map((t) => (
                <li key={t.name} className="inline after:content-['_·_'] last:after:content-['']">
                  {t.name}, p. {t.pages[0]}-{t.pages[1]}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="relative mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[#111] pt-2">
        <ul className="m-0 flex min-w-0 flex-1 list-none flex-wrap gap-x-3 gap-y-0 p-0">
          {content.pois.slice(0, 4).map((p) => (
            <li key={p.id} className="f-garamond flex items-center gap-1 text-[14.5px] leading-[1.45]">
              {fr(p.name)} <Badge n={p.marker} />
            </li>
          ))}
        </ul>
        <button type="button" className="gv-btn shrink-0" onClick={() => onExplore(regionId)}>
          Explorer la région
          <svg width="16" height="10" viewBox="0 0 16 10" aria-hidden="true">
            <path d="M0 5h14M10 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </article>
  );
}
