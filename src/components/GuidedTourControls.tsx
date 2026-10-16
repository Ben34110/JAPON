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
      <div className="gv-rise absolute inset-x-3 bottom-2 z-30 border border-[#111] bg-[var(--paper)] px-3 py-1.5 shadow-[0_10px_24px_-12px_rgba(0,0,0,0.55)]" role="region" aria-label="Visite guidée" aria-live="polite">
        <span className="pointer-events-none absolute inset-[3px] border-[0.5px] border-[#1119]" aria-hidden="true" />
        <div className="relative flex items-center gap-3">
          <div className="min-w-[38%] flex-1">
            <div className="f-gothic whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.18em] text-[#4a4742]">
              Visite guidée · Étape {index + 1} sur {steps.length}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="f-garamond truncate text-[19px] leading-tight" title={fr(cur.name)}>{fr(cur.name)}</span>
              <Badge n={cur.marker} active size="13px" />
              <span className="f-kanji text-[11px] text-[#2b2925] max-sm:hidden" lang="ja">
                {cur.nameJa}
              </span>
            </div>
          </div>
          {steps.length > 9 ? (
            <div className="hidden w-[26%] shrink-0 min-[1100px]:block" aria-hidden="true">
              <div className="h-[5px] w-full border border-[#111]">
                <div className="h-full" style={{ width: `${((index + 1) / steps.length) * 100}%`, background: "var(--region)", transition: "width 0.4s" }} />
              </div>
            </div>
          ) : (
          <div className="flex flex-wrap justify-center gap-1 max-md:hidden" role="tablist" aria-label="Étapes de la visite">
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
          )}
          <div className="flex shrink-0 gap-1.5">
            <button type="button" className="gv-btn ghost !px-2.5 !py-1.5 !text-[11px]" onClick={onPrev} disabled={index === 0} aria-label="Site précédent" title="Site précédent (←)">
              Préc.
            </button>
            <button type="button" className="gv-btn !px-2.5 !py-1.5 !text-[11px]" onClick={last ? onExit : onNext}>
              {last ? "Terminer" : "Suivant"}
            </button>
            {!last && (
              <span className="max-[1100px]:hidden">
                <button type="button" className="gv-btn ghost !px-2.5 !py-1.5 !text-[11px]" onClick={onExit}>
                  Quitter
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
