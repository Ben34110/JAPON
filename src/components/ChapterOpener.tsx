"use client";

import type { CSSProperties } from "react";
import { REGION_BY_ID, pagesLabel } from "@/data/regions";
import type { RegionContent, Region } from "@/lib/types";
import { fr } from "@/lib/typo";
import { Badge } from "./Badge";
import { PhotoPlaceholder } from "./PhotoPlaceholder";
import { RichText } from "./RichText";

interface Props {
  region: Region;
  content: RegionContent;
  /** folio (numéro de page du guide) de chaque site, une fois la pagination mesurée */
  folioOf: Record<string, number>;
  howto?: { title: string; paragraphs: string[] };
  onJump: (poiId: string) => void;
  onStart: () => void;
  onTour: () => void;
}

/**
 * Page explicative de la région : titre encadré, texte à lettrine, photo cernée de la couleur
 * du chapitre, « Comment y aller ? » et sommaire des sites (avec leurs folios).
 */
export function ChapterOpener({ region, content, folioOf, howto, onJump, onStart, onTour }: Props) {
  const { intro } = content;
  const groups = content.sections
    ? content.sections
        .map((sec) => ({ id: sec.id, name: sec.name, short: sec.short, pages: sec.pages, pois: content.pois.filter((p) => p.section === sec.id) }))
        .filter((g) => g.pois.length)
    : [{ id: "all", name: "", short: "", pages: undefined as [number, number] | undefined, pois: content.pois }];
  return (
    <div className="gv-opener flex h-full min-h-0 flex-col gap-3 max-md:overflow-y-auto md:overflow-hidden" style={{ "--region": region.color, "--on-region": region.onColor } as CSSProperties}>
      <div className="shrink-0 border border-[#111] bg-white p-[2px] md:hidden">
        <div className="p-[5px]" style={{ background: region.color }}>
          <div className="border border-white/80 leading-[0]">
            <PhotoPlaceholder spec={{ ...region.photo, aspect: 3.4 }} label={`Photographie : ${region.name}`} />
          </div>
        </div>
      </div>
      <div className="gv-chapter-title shrink-0">
        <h1>{fr(intro.title)}</h1>
        <span className="orn" aria-hidden="true" />
      </div>

      <div className="grid min-h-0 flex-1 gap-5 max-md:flex-none md:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
        <div className="flex min-h-0 flex-col gap-3 max-md:min-h-fit">
          <div className="gv-prose gv-opener-text min-h-0 max-md:shrink-0 md:overflow-hidden">
            {intro.paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? "gv-dropcap" : undefined}>
                <RichText text={p} />
              </p>
            ))}
          </div>
          {howto && (
            <section className="gv-howto gv-opener-howto mt-auto shrink-0 max-md:mt-0">
              <h3>{fr(howto.title)}</h3>
              <div className="gv-prose">
                {howto.paragraphs.map((p, i) => (
                  <p key={i}>
                    <RichText text={p} />
                  </p>
                ))}
              </div>
            </section>
          )}
        </div>

        <figure className="gv-opener-fig m-0 flex min-h-0 flex-col max-md:hidden">
          <div className="flex min-h-0 flex-1 flex-col border border-[#111] bg-white p-[3px]">
            <div className="min-h-0 flex-1 p-[7px]" style={{ background: region.color }}>
              <div className="h-full border border-white/80 leading-[0]">
                <PhotoPlaceholder fill spec={{ ...region.photo, aspect: 0.95 }} label={`Photographie : ${region.name}`} />
              </div>
            </div>
          </div>
          <figcaption className="f-body mt-1.5 shrink-0 text-[13px] italic leading-tight text-[#3a3832]">
            {fr(region.name)} — {pagesLabel(region)}
          </figcaption>
        </figure>
      </div>

      <section className="shrink-0 border-t border-[#111] pt-2 max-md:contents" aria-label="Sommaire du chapitre">
        <div className="f-didone mb-1 text-[9.5px] uppercase tracking-[0.28em] text-[#3b3935] max-md:mt-1 max-md:border-t max-md:border-[#111] max-md:pt-2">Les sites d’un coup d’œil</div>
        <div className={`grid gap-x-5 ${groups.length > 3 ? "sm:grid-cols-4" : groups.length > 1 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
          {groups.map((g) => (
            <div key={g.id} className="min-w-0">
              {g.short && (
                <div className="f-garamond mb-0.5 flex items-baseline justify-between gap-2 border-b border-[#111] text-[12.5px] font-semibold uppercase tracking-[0.06em]">
                  <span className="truncate">{fr(g.short)}</span>
                  {g.pages && <span className="f-body shrink-0 text-[11.5px] font-normal normal-case italic tracking-normal">p. {g.pages[0]}-{g.pages[1]}</span>}
                </div>
              )}
              <ul className="m-0 list-none p-0">
                {g.pois.map((p) => (
                  <li key={p.id}>
                    <button type="button" onClick={() => onJump(p.id)} className="gv-toc">
                      <span className="gv-toc-name f-garamond leading-[1.3]">{fr(p.name)}</span>
                      <Badge n={p.marker} />
                      <span className="gv-toc-dots" aria-hidden="true" />
                      <span className="f-gothic text-[12px] italic">{folioOf[p.id] ?? ""}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="gv-opener-cta mt-2.5 flex flex-wrap items-center gap-2.5 max-md:sticky max-md:bottom-0 max-md:z-[2] max-md:mt-1.5 max-md:flex-nowrap max-md:border-t max-md:border-[#111] max-md:bg-[var(--paper)] max-md:pb-0.5 max-md:pt-2">
          <button type="button" className="gv-btn" onClick={onStart}>
            Découvrir les sites
            <svg width="16" height="10" viewBox="0 0 16 10" aria-hidden="true">
              <path d="M0 5h14M10 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button type="button" className="gv-btn ghost" onClick={onTour}>
            Lancer la visite
          </button>
          <span className="gv-opener-hl f-body ml-auto text-[13px] italic text-[#4a4742]">{REGION_BY_ID[region.id].highlights.join(" · ")}</span>
        </div>
      </section>
    </div>
  );
}
