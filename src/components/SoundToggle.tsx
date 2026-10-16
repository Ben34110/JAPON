"use client";

import { useAmbient } from "@/state/ambient";

/** Bouton « musique d'ambiance » : haut-parleur avec barres animées quand le son joue. */
export function SoundToggle({ className = "" }: { className?: string }) {
  const { enabled, playing, label, toggle } = useAmbient();
  const title = !enabled
    ? "Musique d’ambiance coupée — cliquer pour l’activer"
    : playing
      ? `Ambiance : ${label} — cliquer pour couper`
      : "Musique d’ambiance : cliquez n’importe où pour la lancer";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={enabled ? "Couper la musique d’ambiance" : "Activer la musique d’ambiance"}
      title={title}
      className={`f-gothic flex items-center gap-2 border border-white/50 px-2.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-white hover:text-black ${className}`}
    >
      <svg width="18" height="16" viewBox="0 0 18 16" aria-hidden="true">
        <path d="M2 6h3l4-3.5v11L5 10H2z" fill="currentColor" />
        {enabled ? (
          <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M11.5 5.5c1.3 1.4 1.3 3.6 0 5" className={playing ? "gv-wave" : ""} />
            <path d="M13.5 3.5c2.4 2.5 2.4 6.5 0 9" className={playing ? "gv-wave gv-wave-2" : ""} opacity={playing ? 1 : 0.45} />
          </g>
        ) : (
          <path d="M12 5.5 17 10.5M17 5.5 12 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        )}
      </svg>
      <span className="max-sm:hidden">Musique</span>
    </button>
  );
}
