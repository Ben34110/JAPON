"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import type { Block, Region, RegionContent } from "@/lib/types";
import { fr } from "@/lib/typo";
import type { ChangeSource } from "@/state/app-state";
import { ChapterOpener } from "./ChapterOpener";
import { FigureBlock, SidebarBlock } from "./BookBlocks";
import { PointOfInterestItem } from "./PointOfInterestItem";

const GAP = 28;

interface Props {
  region: Region;
  content: RegionContent;
  activePoiId: string | null;
  /** change à chaque sélection : permet de re-tourner vers le même site */
  nonce: number;
  source: ChangeSource | undefined;
  tourMode: boolean;
  onSelectPoi: (poiId: string) => void;
  onStartTour: () => void;
  /** barre de visite guidée, posée sur le pied de page */
  tourBar?: ReactNode;
}

/**
 * Double page du guide, sans défilement : page 1 = page explicative du chapitre, puis le détail
 * des sites en trois colonnes qui s'enchaînent d'une page à l'autre (on tourne les pages).
 * En-tête (folio + titre courant sur filet pointillé) et onglet de chapitre au bord extérieur.
 */
export function RegionColumnsLayout({ region, content, activePoiId, nonce, source, tourMode, onSelectPoi, onStartTour, tourBar }: Props) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [flowPages, setFlowPages] = useState(1);
  const [poiPage, setPoiPage] = useState<Record<string, number>>({});
  const [measured, setMeasured] = useState(0);
  const [pageRaw, setPage] = useState(0);
  const poiPageRef = useRef(poiPage);
  useEffect(() => {
    poiPageRef.current = poiPage;
  }, [poiPage]);

  const cols = size.w >= 700 ? 3 : size.w >= 440 ? 2 : 1;
  const step = size.w + GAP;
  const total = 1 + flowPages;
  const page = Math.min(pageRaw, total - 1);

  // blocs dans l'ordre de lecture, regroupés par pile d'origine ; l'ouverture (intro, « comment y aller »)
  // a sa propre page. Un groupe qui contient un site démarre en haut d'une colonne.
  const { groups, howto } = useMemo(() => {
    const out: { key: string; blocks: Block[]; hasPoi: boolean }[] = [];
    let howto: { title: string; paragraphs: string[] } | undefined;
    content.pages.forEach((pg, pi) =>
      pg.bands.forEach((band, bi) =>
        band.stacks.forEach((st, si) => {
          const blocks: Block[] = [];
          st.blocks.forEach((b) => {
            if (b.t === "intro") return;
            if (b.t === "howto") {
              howto = howto ?? { title: b.title, paragraphs: b.paragraphs };
              return;
            }
            blocks.push(b);
          });
          if (blocks.length) out.push({ key: `${pi}-${bi}-${si}`, blocks, hasPoi: blocks.some((b) => b.t === "poi") });
        }),
      ),
    );
    return { groups: out, howto };
  }, [content.pages]);

  const poiById = useMemo(() => new Map(content.pois.map((p) => [p.id, p])), [content.pois]);
  const sidebarById = useMemo(() => new Map(content.sidebars.map((s) => [s.id, s])), [content.sidebars]);

  // taille de la fenêtre de lecture
  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const read = () => setSize({ w: Math.floor(el.clientWidth), h: Math.floor(el.clientHeight) });
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // pagination : nombre de pages et page de chaque site, d'après la mise en colonnes réelle
  const measure = useCallback(() => {
    const flowEl = flowRef.current;
    if (!flowEl || !size.w) return;
    const s = size.w + GAP;
    setFlowPages(Math.max(1, Math.round((flowEl.scrollWidth + GAP) / s)));
    const fr0 = flowEl.getBoundingClientRect().left;
    const map: Record<string, number> = {};
    flowEl.querySelectorAll<HTMLElement>("[data-poi]").forEach((el) => {
      const x = el.getBoundingClientRect().left - fr0;
      map[el.dataset.poi!] = Math.floor((x + 6) / s) + 1;
    });
    setPoiPage(map);
    setMeasured((m) => m + 1);
  }, [size.w]);

  useLayoutEffect(() => {
    measure();
  }, [measure, size.h, cols, groups]);

  useEffect(() => {
    // les polices (Garamond, Crimson…) changent la mise en colonnes quand elles arrivent
    let alive = true;
    document.fonts?.ready.then(() => alive && measure());
    const t = window.setTimeout(() => alive && measure(), 400);
    return () => {
      alive = false;
      window.clearTimeout(t);
    };
  }, [measure, size.h]);

  const goto = useCallback((p: number) => setPage(Math.min(Math.max(0, p), Math.max(0, total - 1))), [total]);

  // carte / visite → on tourne vers la page du site actif
  useEffect(() => {
    if (!activePoiId || source === "text" || !measured) return;
    const pg = poiPageRef.current[activePoiId];
    if (pg != null) setPage(pg);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nonce, activePoiId, measured > 0]);

  // clavier (hors visite guidée) et glisser du doigt
  useEffect(() => {
    if (tourMode) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
      if (e.key === "ArrowRight" || e.key === "PageDown") setPage((p) => Math.min(total - 1, p + 1));
      else if (e.key === "ArrowLeft" || e.key === "PageUp") setPage((p) => Math.max(0, p - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [tourMode, total]);

  const touchX = useRef<number | null>(null);

  // titre courant : le secteur (Centre / Nord / Ouest…) auquel appartient la page affichée
  const runningSection = useMemo(() => {
    if (!content.sections || page === 0) return content.sectionTitle;
    let best: (typeof content.pois)[number] | undefined;
    let bestPage = -1;
    for (const poi of content.pois) {
      const pg = poiPage[poi.id];
      if (pg != null && pg <= page && pg >= bestPage) {
        best = poi;
        bestPage = pg;
      }
    }
    return content.sections.find((sec) => sec.id === best?.section)?.name ?? content.sectionTitle;
  }, [content, page, poiPage]);

  const folio = content.startFolio + page;
  const odd = folio % 2 === 1;
  const folioOf = useMemo(() => Object.fromEntries(Object.entries(poiPage).map(([id, p]) => [id, content.startFolio + p])), [poiPage, content.startFolio]);

  const vars = { "--region": region.color, "--on-region": region.onColor } as CSSProperties;

  return (
    <section className="gv-sheet gv-sheet-fixed" style={vars} aria-label={`Page ${folio} — ${region.name}`}>
      <span className="gv-tab" data-side={odd ? "right" : "left"} aria-hidden="true" />
      <header className="gv-running" data-side={odd ? "right" : "left"}>
        <span className="folio">{folio}</span>
        <span className="title">{fr(odd ? runningSection : content.runningTitle)}</span>
      </header>

      <div
        ref={viewportRef}
        className="gv-viewport"
        onScroll={(e) => {
          // un focus clavier hors champ ne doit jamais décaler la page
          if (e.currentTarget.scrollLeft) e.currentTarget.scrollLeft = 0;
        }}
        onFocusCapture={(e) => {
          const poiEl = (e.target as HTMLElement).closest<HTMLElement>("[data-poi]");
          if (poiEl && poiPageRef.current[poiEl.dataset.poi!] != null) setPage(poiPageRef.current[poiEl.dataset.poi!]);
        }}
        onPointerDown={(e) => {
          touchX.current = e.pointerType === "touch" ? e.clientX : null;
        }}
        onPointerUp={(e) => {
          if (touchX.current == null) return;
          const dx = e.clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 60) setPage((p) => Math.min(total - 1, Math.max(0, p + (dx < 0 ? 1 : -1))));
        }}
      >
        {size.w > 0 && (
          <div className="gv-track" style={{ height: size.h, gap: GAP, transform: `translate3d(${-page * step}px,0,0)` }}>
            <div style={{ width: size.w, height: size.h, flex: "none" }} aria-hidden={page !== 0}>
              <ChapterOpener
                region={region}
                content={content}
                folioOf={folioOf}
                howto={howto}
                onJump={(id) => {
                  onSelectPoi(id);
                  const pg = poiPageRef.current[id];
                  if (pg != null) setPage(pg);
                }}
                onStart={() => goto(1)}
                onTour={onStartTour}
              />
            </div>
            <div
              ref={flowRef}
              className="gv-flow gv-prose"
              style={{ width: size.w, height: size.h, flex: "none", columnCount: cols, columnGap: GAP }}
            >
              {groups.map((g, gi) => (
                <div key={g.key} className={g.hasPoi && gi > 0 ? "gv-group gv-newcol" : "gv-group"}>
                  {g.blocks.map((block, bi) => {
                    const key = `${g.key}-${bi}`;
                    switch (block.t) {
                      case "poi": {
                        const poi = poiById.get(block.id);
                        return poi ? <PointOfInterestItem key={key} poi={poi} active={activePoiId === poi.id} onSelect={onSelectPoi} /> : null;
                      }
                      case "figure":
                        return (
                          <div key={key} className="gv-flow-item">
                            <FigureBlock photo={block.photo} />
                          </div>
                        );
                      case "sidebar": {
                        const sb = sidebarById.get(block.id);
                        return sb ? (
                          <div key={key} className="gv-flow-item">
                            <SidebarBlock sidebar={sb} />
                          </div>
                        ) : null;
                      }
                      default:
                        return null;
                    }
                  })}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="gv-pager" aria-label="Pagination">
        {!tourMode && (
          <>
            <button type="button" onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0} aria-label="Page précédente">
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <path d="M9 2 4 7l5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="whitespace-nowrap max-[1100px]:hidden">Page précédente</span>
            </button>
            {total > 12 ? (
              <div className="f-gothic text-[12px] font-bold uppercase tracking-[0.14em]" aria-live="polite">
                {page === 0 ? "Page explicative" : `Page ${folio}`} · {page + 1} / {total}
              </div>
            ) : (
              <div className="flex items-center gap-1.5" role="tablist" aria-label="Pages du chapitre">
                {Array.from({ length: total }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={i === page}
                    aria-label={i === 0 ? "Page explicative" : `Page ${content.startFolio + i}`}
                    title={i === 0 ? "Page explicative" : `Page ${content.startFolio + i}`}
                    onClick={() => setPage(i)}
                    className="gv-dot"
                    data-on={i === page ? "true" : undefined}
                  />
                ))}
              </div>
            )}
            <button type="button" onClick={() => setPage((p) => Math.min(total - 1, p + 1))} disabled={page >= total - 1} aria-label="Page suivante">
              <span className="whitespace-nowrap max-[1100px]:hidden">Page suivante</span>
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <path d="M5 2l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}
      </footer>
      {tourMode && tourBar}
    </section>
  );
}
