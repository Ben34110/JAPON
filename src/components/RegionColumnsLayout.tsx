"use client";

import type { CSSProperties } from "react";
import type { Block, BookPage, Region, RegionContent } from "@/lib/types";
import { fr } from "@/lib/typo";
import { FigureBlock, HowToBlock, IntroBlock, SidebarBlock } from "./BookBlocks";
import { PointOfInterestItem } from "./PointOfInterestItem";

interface Props {
  region: Region;
  content: RegionContent;
  activePoiId: string | null;
  onSelectPoi: (poiId: string) => void;
}

/**
 * Reproduit la double page du guide : pages empilées, chacune avec son en-tête
 * (folio + titre courant sur filet pointillé), son onglet de chapitre au bord extérieur
 * et une grille de trois colonnes séparées par des filets noirs.
 */
export function RegionColumnsLayout({ region, content, activePoiId, onSelectPoi }: Props) {
  const poiById = new Map(content.pois.map((p) => [p.id, p]));
  const sidebarById = new Map(content.sidebars.map((s) => [s.id, s]));

  const renderBlock = (b: Block, span: 1 | 2 | 3, key: string) => {
    switch (b.t) {
      case "intro":
        return <IntroBlock key={key} content={content} />;
      case "poi": {
        const poi = poiById.get(b.id);
        return poi ? (
          <PointOfInterestItem key={key} poi={poi} span={span} active={activePoiId === poi.id} onSelect={onSelectPoi} />
        ) : null;
      }
      case "figure":
        return <FigureBlock key={key} photo={b.photo} />;
      case "sidebar": {
        const sb = sidebarById.get(b.id);
        return sb ? <SidebarBlock key={key} sidebar={sb} span={span} /> : null;
      }
      case "howto":
        return <HowToBlock key={key} title={b.title} paragraphs={b.paragraphs} />;
    }
  };

  const template = (stacks: BookPage["bands"][number]["stacks"]) => stacks.map((s) => s.span).join("-");

  return (
    <div className="flex flex-col gap-10" style={{ "--region": region.color, "--on-region": region.onColor } as CSSProperties}>
      {content.pages.map((page, pi) => {
        const folio = content.startFolio + pi;
        const odd = folio % 2 === 1;
        return (
          <section key={pi} className="gv-sheet" aria-label={`Page ${folio}`}>
            <span className="gv-tab" data-side={odd ? "right" : "left"} aria-hidden="true" />
            <header className="gv-running" data-side={odd ? "right" : "left"}>
              <span className="folio">{folio}</span>
              <span className="title">{fr(odd ? content.sectionTitle : content.runningTitle)}</span>
            </header>
            {page.bands.map((band, bi) => (
              <div key={bi} className="gv-band-row" data-template={template(band.stacks)} data-cols={band.stacks.length}>
                {band.stacks.map((stack, si) => (
                  <div key={si} className="gv-stack" data-span={stack.span}>
                    {stack.blocks.map((b, i) => renderBlock(b, stack.span, `${pi}-${bi}-${si}-${i}`))}
                  </div>
                ))}
              </div>
            ))}
          </section>
        );
      })}
    </div>
  );
}
