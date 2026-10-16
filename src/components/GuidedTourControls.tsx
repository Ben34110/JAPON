"use client";

import { fr } from "@/lib/typo";
import { Badge } from "./Badge";

export interface TourStep {
  id: string;
  name: string;
  nameJa: string;
  marker: number;
}

interface Props {
  steps: TourStep[];
  index: number;
  onPrev: () => void;
  onNext: () => void;
  onGoto: (index: number) => void;
  onExit: () => void;
}

const Chevron = ({ dir }: { dir: "left" | "right" }) => (
  <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
    <path d={dir === "left" ? "M14 3 6 11l8 8" : "M8 3l8 8-8 8"} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * Mode « Lancer la visite » : boutons flottants < et > de part et d'autre de l'écran,
 * et bandeau d'étape en bas (étape x sur N, nom, kanji, frise numérotée).
 */
export function GuidedTourControls({ steps, index, onPrev, onNext, onGoto, onExit }: Props) {
  const cur = steps[index];
  if (!cur) return null;
  const last = index === steps.length - 1;
  return (
    <>
      <button type="button" className="gv-float-nav" style={{ left: 14 }} onClick={onPrev} disabled={index === 0} aria-label="Site précédent" title="Site précédent (←)">
        <Chevron dir="left" />
      </button>
      <button type="button" className="gv-float-nav" style={{ right: 14 }} onClick={onNext} disabled={last} aria-label="Site suivant" title="Site suivant (→)">
        <Chevron dir="right" />
      </button>

      <div
        className="gv-rise fixed bottom-4 left-1/2 z-40 w-[min(760px,calc(100%-96px))] -translate-x-1/2 border border-[#111] bg-[var(--paper)] px-4 py-3 shadow-[0_14px_30px_-12px_rgba(0,0,0,0.5)] max-sm:w-[calc(100%-88px)] max-sm:px-3"
        role="region"
        aria-label="Visite guidée"
        aria-live="polite"
      >
        <span className="pointer-events-none absolute inset-[3px] border-[0.5px] border-[#1119]" aria-hidden="true" />
        <div className="relative flex items-center gap-4 max-sm:gap-2">
          <div className="min-w-0 flex-1">
            <div className="f-gothic text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#4a4742]">
              Visite guidée · Étape {index + 1} sur {steps.length}
            </div>
            <div className="mt-0.5 flex items-baseline gap-2">
              <span className="f-garamond truncate text-[21px] leading-tight max-sm:text-[18px]">{fr(cur.name)}</span>
              <Badge n={cur.marker} active size="14px" />
              <span className="f-kanji text-[12px] text-[#2b2925] max-sm:hidden" lang="ja">
                {cur.nameJa}
              </span>
            </div>
            <div className="mt-1.5 flex flex-wrap gap-1" role="tablist" aria-label="Étapes de la visite">
              {steps.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Étape ${i + 1} : ${s.name}`}
                  title={fr(s.name)}
                  onClick={() => onGoto(i)}
                  className="f-gothic grid h-[18px] min-w-[18px] place-items-center rounded-full border border-[#111] px-1 text-[10px] font-bold leading-none transition-colors"
                  style={i === index ? { background: "var(--region)", color: "var(--on-region)" } : i < index ? { background: "#111", color: "#fff" } : { background: "transparent" }}
                >
                  {s.marker}
                </button>
              ))}
            </div>
          </div>
          <div className="flex shrink-0 gap-2 max-sm:flex-col">
            <button type="button" className="gv-btn !px-3 !py-2 !text-[11px]" onClick={last ? onExit : onNext}>
              {last ? "Terminer" : "Suivant"}
            </button>
            {!last && (
              <button type="button" className="gv-btn ghost !px-3 !py-2 !text-[11px]" onClick={onExit}>
                Quitter
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
