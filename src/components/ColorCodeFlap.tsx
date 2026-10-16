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
    <section className="relative shrink-0 border border-[#111] bg-[var(--paper)] px-4 py-3" aria-labelledby="flap-title">
      <span className="pointer-events-none absolute inset-[4px] border border-[#111]" aria-hidden="true" />
      <div className="relative">
        <div className="flex items-baseline justify-between gap-3">
          <h2 id="flap-title" className="f-didone m-0 text-[21px] font-normal uppercase leading-[1.05] tracking-[0.04em]">
            Visite <span className="text-[0.82em]">mode d’emploi</span>
          </h2>
          <div className="f-didone flex items-center gap-2 text-[9px] uppercase tracking-[0.26em]" aria-hidden="true">
            Guides <EyeLogo size={9} color="#111" /> Voir
          </div>
        </div>
        <p className="f-body m-0 mt-0.5 text-[13px] italic leading-[1.2] text-[#3a3832]">Pour vous aider à retrouver votre page, une couleur a été attribuée à chaque chapitre.</p>
        <hr className="my-2 border-0 border-t border-[#111]" />

        <div className="f-garamond mb-1 text-[12px] font-semibold uppercase tracking-[0.18em]">Code couleur des chapitres</div>
        <ul className="m-0 grid list-none grid-cols-2 gap-x-3 p-0">
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
                  className="group flex w-full items-center gap-2.5 border-0 px-1 py-[2px] text-left transition-colors"
                  style={{ background: on || hot ? `color-mix(in srgb, ${r.color} 14%, transparent)` : "transparent" }}
                >
                  <span className="block h-[24px] shrink-0 transition-[width] duration-200" style={{ background: r.color, width: on || hot ? 12 : 5 }} aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className={`f-garamond block truncate text-[13.5px] uppercase leading-[1.1] tracking-[0.03em] ${on ? "font-bold" : "font-medium"}`}>{r.name.replace(/'/g, "’")}</span>
                    <span className="f-body block text-[12px] italic leading-[1.1] text-[#3a3832]">{pagesLabel(r)}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-2 grid grid-cols-2 gap-x-3 border-t border-[#111] pt-1.5">
          {FLAP_EXTRAS.map((g) => (
            <div key={g.group}>
              <div className="f-didone mb-0.5 text-[9px] uppercase tracking-[0.2em]">{g.group}</div>
              <ul className="m-0 list-none p-0">
                {g.items.map((it) => (
                  <li key={it.name} className="flex items-center gap-2 py-px" aria-label={`${it.name}, pages ${it.pages[0]}-${it.pages[1]}`}>
                    <span className="block h-[12px] w-[5px] shrink-0" style={{ background: it.color }} aria-hidden="true" />
                    <span className="f-body truncate text-[12px] leading-[1.2]">
                      <span className="f-garamond uppercase">{it.name.replace(/'/g, "’")}</span> <em className="text-[#4a4742]">p. {it.pages[0]}-{it.pages[1]}</em>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
