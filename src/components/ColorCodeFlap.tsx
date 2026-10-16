"use client";

import { FLAP_EXTRAS, REGIONS, pagesLabel } from "@/data/regions";
import type { RegionId } from "@/lib/types";
import { EyeLogo } from "./Icons";

interface Props {
  selectedId: RegionId | null;
  hoverId: RegionId | null;
  onSelect: (id: RegionId) => void;
  onHover: (id: RegionId | null) => void;
}

/**
 * Le rabat « Visite mode d'emploi » : code couleur des chapitres avec pagination,
 * bonnes adresses et renseignements pratiques. Les lignes de chapitre sont cliquables.
 */
export function ColorCodeFlap({ selectedId, hoverId, onSelect, onHover }: Props) {
  return (
    <section className="relative border border-[#111] bg-[var(--paper)] p-5" aria-labelledby="flap-title">
      <span className="pointer-events-none absolute inset-[4px] border border-[#111]" aria-hidden="true" />
      <div className="relative">
        <div className="f-didone flex items-center justify-center gap-2.5 text-[10px] uppercase tracking-[0.28em]" aria-hidden="true">
          Guides <EyeLogo size={11} color="#111" /> Voir
        </div>
        <h2 id="flap-title" className="f-didone m-0 mt-2.5 text-center text-[26px] font-normal uppercase leading-[1.05] tracking-[0.04em]">
          Visite <span className="text-[0.82em]">mode</span> <span className="text-[0.82em]">d’emploi</span>
        </h2>
        <p className="f-body mx-auto mt-2 max-w-[30ch] text-center text-[14px] italic leading-[1.25]">
          Pour vous aider à retrouver votre page, une couleur a été attribuée à chaque chapitre
        </p>
        <hr className="mx-auto my-3 border-0 border-t border-[#111]" />

        <div className="f-garamond mb-2 text-center text-[13px] font-semibold uppercase tracking-[0.18em]">Code couleur des chapitres</div>
        <ul className="m-0 list-none p-0">
          {REGIONS.map((r) => {
            const on = selectedId === r.id;
            const hot = hoverId === r.id;
            return (
              <li key={r.id}>
                <button
                  type="button"
                  onClick={() => onSelect(r.id)}
                  onMouseEnter={() => onHover(r.id)}
                  onMouseLeave={() => onHover(null)}
                  onFocus={() => onHover(r.id)}
                  onBlur={() => onHover(null)}
                  aria-pressed={on}
                  className="group flex w-full items-center gap-3 border-0 bg-transparent px-1.5 py-[3px] text-left transition-colors"
                  style={{ background: on || hot ? `color-mix(in srgb, ${r.color} 14%, transparent)` : "transparent" }}
                >
                  <span className="block h-[26px] shrink-0 transition-[width] duration-200" style={{ background: r.color, width: on || hot ? 14 : 5 }} aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className={`f-garamond block text-[15px] uppercase leading-[1.1] tracking-[0.04em] [font-variant-caps:normal] ${on ? "font-bold" : "font-medium"}`}>{r.name.replace(/^L'/, "L’")}</span>
                    <span className="f-body block text-[13px] italic leading-[1.1] text-[#3a3832]">{pagesLabel(r)}</span>
                  </span>
                  <svg className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" style={{ opacity: on ? 1 : undefined }} width="14" height="10" viewBox="0 0 14 10" aria-hidden="true">
                    <path d="M0 5h12M8 1l4 4-4 4" fill="none" stroke="#111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </li>
            );
          })}
        </ul>

        {FLAP_EXTRAS.map((g) => (
          <div key={g.group} className="mt-4">
            <div className="f-didone mb-1.5 border-b border-[#111] pb-1 text-[10.5px] uppercase tracking-[0.2em]">{g.group}</div>
            <ul className="m-0 list-none p-0">
              {g.items.map((it) => (
                <li key={it.name} className="flex items-center gap-3 px-1.5 py-[3px]" aria-label={`${it.name}, pages ${it.pages[0]}-${it.pages[1]}`}>
                  <span className="block h-[22px] w-[5px] shrink-0" style={{ background: it.color }} aria-hidden="true" />
                  <span>
                    <span className="f-garamond block text-[14px] font-medium uppercase leading-[1.1] tracking-[0.04em]">{it.name.replace(/'/g, "’")}</span>
                    <span className="f-body block text-[13px] italic leading-[1.1] text-[#3a3832]">
                      Pages {it.pages[0]}-{it.pages[1]}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
