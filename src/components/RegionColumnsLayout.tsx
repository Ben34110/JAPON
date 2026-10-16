"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import type { Block, PhotoSpec, Region, RegionContent } from "@/lib/types";
import { fr } from "@/lib/typo";
import type { ChangeSource } from "@/state/app-state";
import { ChapterOpener } from "./ChapterOpener";
import { FigureBlock, SidebarBlock } from "./BookBlocks";
import { PhotoPlaceholder } from "./PhotoPlaceholder";
import { PointOfInterestItem } from "./PointOfInterestItem";
import { RichText } from "./RichText";

const GAP = 28;
/** une photo plus haute que cette part de la colonne passe sur sa propre page */
const BIG_PHOTO_RATIO = 0.45;
/** grossissement maximal du texte d'un lieu (ordinateur) */
const MAX_ZOOM = 1.6;

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

/** Un segment du livre : les pages d'un lieu (texte en colonnes) ou une planche photo pleine page. */
type Segment =
  | { key: string; kind: "text"; poiId: string; blocks: Block[] }
  | { key: string; kind: "photo"; poiId: string; photo: PhotoSpec };

/**
 * Double page du guide, sans défilement : page 1 = page explicative du chapitre, puis chaque lieu a
 * ses propres pages (trois colonnes qui s'enchaînent). Une photo trop grande pour la colonne passe seule
 * sur la page suivante. En-tête (folio + titre courant sur filet pointillé) et onglet de chapitre.
 */
export function RegionColumnsLayout({ region, content, activePoiId, nonce, source, tourMode, onSelectPoi, onStartTour, tourBar }: Props) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const segRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [segPages, setSegPages] = useState<number[]>([]);
  const [segZoom, setSegZoom] = useState<number[]>([]);
  const [measured, setMeasured] = useState(0);
  const [pageRaw, setPage] = useState(0);

  const cols = size.w >= 700 ? 3 : size.w >= 440 ? 2 : 1;
  const step = size.w + GAP;
  const colW = cols ? (size.w - (cols - 1) * GAP) / cols : 0;

  const poiById = useMemo(() => new Map(content.pois.map((p) => [p.id, p])), [content.pois]);
  const sidebarById = useMemo(() => new Map(content.sidebars.map((s) => [s.id, s])), [content.sidebars]);

  // ---- 1) rattacher chaque photo / encadré à son lieu ---------------------------------------
  const { groups, howto } = useMemo(() => {
    const order = content.pois.map((p) => p.id);
    const stacks = content.pages.flatMap((pg) => pg.bands.flatMap((b) => b.stacks.map((st) => st.blocks)));
    const g = new Map(order.map((id) => [id, { pre: [] as Block[], poi: null as Block | null, post: [] as Block[] }]));
    let howto: { title: string; paragraphs: string[] } | undefined;

    const firstPoiIdx = (blocks: Block[]) => blocks.findIndex((b) => b.t === "poi");
    stacks.forEach((blocks, si) => {
      const pi = firstPoiIdx(blocks);
      // lieu précédent / suivant (hors de la pile) pour les piles sans lieu
      const prevPoi = (() => {
        for (let k = si - 1; k >= 0; k--) {
          const ids = stacks[k].filter((b): b is Extract<Block, { t: "poi" }> => b.t === "poi");
          if (ids.length) return ids[ids.length - 1].id;
        }
        return null;
      })();
      const nextPoi = (() => {
        for (let k = si + 1; k < stacks.length; k++) {
          const j = stacks[k].findIndex((b) => b.t === "poi");
          if (j >= 0) return (stacks[k][j] as { id: string }).id;
        }
        return null;
      })();
      let current: string | null = null; // lieu courant dans la pile
      blocks.forEach((b, i) => {
        if (b.t === "intro") return;
        if (b.t === "howto") {
          howto = howto ?? { title: b.title, paragraphs: b.paragraphs };
          return;
        }
        if (b.t === "poi") {
          current = b.id;
          const slot = g.get(b.id);
          if (slot) slot.poi = b;
          return;
        }
        const explicit = b.t === "sidebar" ? b.poi : b.photo.poi;
        let owner: string | null = explicit ?? null;
        let isPre = false;
        if (!owner && pi >= 0) {
          if (i < pi) {
            owner = (blocks[pi] as { id: string }).id;
            isPre = true;
          } else owner = current;
        }
        if (!owner) owner = b.t === "figure" ? (nextPoi ?? prevPoi) : (prevPoi ?? nextPoi);
        const slot = owner ? g.get(owner) : undefined;
        if (!slot) return;
        // une photo placée avant son lieu (dans sa pile) s'affiche avant le titre
        if (isPre || (explicit && pi >= 0 && i < pi && (blocks[pi] as { id: string }).id === explicit)) slot.pre.push(b);
        else slot.post.push(b);
      });
    });
    return { groups: g, howto };
  }, [content.pois, content.pages]);

  // ---- 2) segments : texte par lieu + planches photo -----------------------------------------
  const segments = useMemo<Segment[]>(() => {
    if (!size.w || !size.h) return [];
    const isBig = (b: Block) => b.t === "figure" && colW / b.photo.aspect + 52 > size.h * BIG_PHOTO_RATIO;
    const out: Segment[] = [];
    for (const poi of content.pois) {
      const slot = groups.get(poi.id);
      if (!slot?.poi) continue;
      const bigs: PhotoSpec[] = [];
      const keep = (b: Block) => {
        if (isBig(b)) {
          if (b.t === "figure") bigs.push(b.photo);
          return false;
        }
        return true;
      };
      const blocks = [...slot.pre.filter(keep), slot.poi, ...slot.post.filter(keep)];
      out.push({ key: `t-${poi.id}`, kind: "text", poiId: poi.id, blocks });
      bigs.forEach((photo, i) => out.push({ key: `p-${poi.id}-${i}`, kind: "photo", poiId: poi.id, photo }));
    }
    return out;
  }, [content.pois, groups, size.w, size.h, colW]);

  // pages occupées par chaque segment (1 par défaut, mesuré ensuite pour les textes)
  const pagesOf = useCallback((i: number) => segPages[i] ?? 1, [segPages]);
  const starts = useMemo(() => {
    const s: number[] = [];
    let acc = 1;
    segments.forEach((_, i) => {
      s.push(acc);
      acc += segPages[i] ?? 1;
    });
    return { s, total: acc };
  }, [segments, segPages]);
  const total = Math.max(1, starts.total);
  const page = Math.min(pageRaw, total - 1);

  // page de départ de chaque lieu, propriétaire de chaque page
  const { poiPage, pageOwner } = useMemo(() => {
    const poiPage: Record<string, number> = {};
    const pageOwner: string[] = ["" /* page explicative */];
    segments.forEach((sg, i) => {
      if (sg.kind === "text" && poiPage[sg.poiId] == null) poiPage[sg.poiId] = starts.s[i];
      for (let k = 0; k < (segPages[i] ?? 1); k++) pageOwner.push(sg.poiId);
    });
    return { poiPage, pageOwner };
  }, [segments, starts, segPages]);
  const poiPageRef = useRef(poiPage);
  const pageOwnerRef = useRef(pageOwner);
  useEffect(() => {
    poiPageRef.current = poiPage;
    pageOwnerRef.current = pageOwner;
  }, [poiPage, pageOwner]);

  // ---- 3) mesures ---------------------------------------------------------------------------
  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const read = () => setSize({ w: Math.floor(el.clientWidth), h: Math.floor(el.clientHeight) });
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const measure = useCallback(() => {
    if (!size.w) return;
    const s = size.w + GAP;
    const grow = size.w >= 700; // ordinateur : le texte grossit pour combler les pages peu remplies
    const zooms: number[] = [];
    const pages: number[] = segments.map((sg, i) => {
      zooms[i] = 1;
      if (sg.kind === "photo") return 1;
      const el = segRefs.current[i];
      if (!el) return 1;
      const apply = (z: number) => {
        el.style.zoom = z === 1 ? "" : String(z);
        el.style.width = `${size.w / z}px`;
        el.style.height = `${size.h / z}px`;
        el.style.columnGap = `${GAP / z}px`;
        // largeur de colonne et pages, dans le repère (zoomé) de l'élément
        return Math.max(1, Math.round((el.scrollWidth + GAP / z) / (size.w / z + GAP / z)));
      };
      const n0 = apply(1);
      if (grow) {
        let best = 1;
        for (let z = 1.08; z <= MAX_ZOOM + 0.001; z += 0.08) {
          if (apply(z) === n0) best = z;
          else break;
        }
        apply(best);
        zooms[i] = best;
      }
      return n0;
    });
    setSegPages((prev) => (prev.length === pages.length && prev.every((v, i) => v === pages[i]) ? prev : pages));
    setSegZoom((prev) => (prev.length === zooms.length && prev.every((v, i) => v === zooms[i]) ? prev : zooms));
    void s;
    setMeasured((m) => m + 1);
  }, [size.w, size.h, segments]);

  useLayoutEffect(() => {
    measure();
  }, [measure, size.h, cols]);

  useEffect(() => {
    // les polices (Garamond, Crimson…) changent la mise en colonnes quand elles arrivent
    let alive = true;
    document.fonts?.ready.then(() => alive && measure());
    const t = window.setTimeout(() => alive && measure(), 400);
    return () => {
      alive = false;
      window.clearTimeout(t);
    };
  }, [measure]);

  // ---- 4) navigation ------------------------------------------------------------------------
  /** Tourner la page à la main : le lieu affiché devient le site actif (surbrillance sur la carte). */
  const turn = useCallback(
    (p: number) => {
      const target = Math.min(Math.max(0, p), Math.max(0, total - 1));
      setPage(target);
      const owner = target === 0 ? "" : pageOwnerRef.current[target];
      if (owner && owner !== activePoiId) onSelectPoi(owner);
    },
    [total, activePoiId, onSelectPoi],
  );

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
      if (e.key === "ArrowRight" || e.key === "PageDown") turn(page + 1);
      else if (e.key === "ArrowLeft" || e.key === "PageUp") turn(page - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [tourMode, page, turn]);

  const touchX = useRef<number | null>(null);

  // titre courant : le secteur (Centre / Nord / Ouest…) auquel appartient la page affichée
  const runningSection = useMemo(() => {
    if (!content.sections || page === 0) return content.sectionTitle;
    const poi = poiById.get(pageOwner[page] ?? "");
    return content.sections.find((sec) => sec.id === poi?.section)?.name ?? content.sectionTitle;
  }, [content, page, pageOwner, poiById]);

  const folio = content.startFolio + page;
  const odd = folio % 2 === 1;
  const folioOf = useMemo(() => Object.fromEntries(Object.entries(poiPage).map(([id, p]) => [id, content.startFolio + p])), [poiPage, content.startFolio]);

  const vars = { "--region": region.color, "--on-region": region.onColor } as CSSProperties;

  const renderBlock = (block: Block, key: string) => {
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
  };

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
          if (Math.abs(dx) > 60) turn(page + (dx < 0 ? 1 : -1));
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
                onStart={() => turn(1)}
                onTour={onStartTour}
              />
            </div>

            {segments.map((sg, i) => (
              <div key={sg.key} style={{ width: pagesOf(i) * step - GAP, height: size.h, flex: "none" }}>
                {sg.kind === "text" ? (
                  <div
                    ref={(el) => {
                      segRefs.current[i] = el;
                    }}
                    className="gv-flow gv-prose"
                    style={{ width: size.w / (segZoom[i] ?? 1), height: size.h / (segZoom[i] ?? 1), columnCount: cols, columnGap: GAP / (segZoom[i] ?? 1), zoom: segZoom[i] && segZoom[i] !== 1 ? segZoom[i] : undefined }}
                  >
                    {sg.blocks.map((b, bi) => renderBlock(b, `${sg.key}-${bi}`))}
                  </div>
                ) : (
                  <figure className="gv-plate" style={{ width: size.w, height: size.h }}>
                    <div className="gv-plate-frame">
                      <div style={{ position: "absolute", inset: 0 }}>
                        <PhotoPlaceholder fill spec={sg.photo} />
                      </div>
                    </div>
                    {sg.photo.caption && (
                      <figcaption>
                        <RichText text={sg.photo.caption} />
                      </figcaption>
                    )}
                  </figure>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="gv-pager" aria-label="Pagination">
        {!tourMode && (
          <>
            <button type="button" onClick={() => turn(page - 1)} disabled={page === 0} aria-label="Page précédente">
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
                    onClick={() => turn(i)}
                    className="gv-dot"
                    data-on={i === page ? "true" : undefined}
                  />
                ))}
              </div>
            )}
            <button type="button" onClick={() => turn(page + 1)} disabled={page >= total - 1} aria-label="Page suivante">
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
