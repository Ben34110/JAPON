"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import { ambient } from "@/lib/ambient/engine";
import { trackFor } from "@/lib/ambient/presets";
import { useApp } from "./app-state";

// préférence « musique » mémorisée (activée par défaut, coupée si l'utilisateur la coupe)
const KEY = "gv-music";
const listeners = new Set<() => void>();
const readPref = () => {
  try {
    return window.localStorage.getItem(KEY) !== "0";
  } catch {
    return true;
  }
};
const writePref = (v: boolean) => {
  try {
    window.localStorage.setItem(KEY, v ? "1" : "0");
  } catch {
    /* stockage indisponible */
  }
  listeners.forEach((l) => l());
};
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
};

interface Ctx {
  enabled: boolean;
  /** vrai quand le son est réellement lancé (préférence active + premier geste effectué) */
  playing: boolean;
  label: string;
  toggle: () => void;
}

const AmbientCtx = createContext<Ctx | null>(null);

/** Musique d'ambiance : suit la région ouverte (ou la région présélectionnée sur la carte générale). */
export function AmbientProvider({ children }: { children: ReactNode }) {
  const { state } = useApp();
  const enabled = useSyncExternalStore(subscribe, readPref, () => true);
  const [unlocked, setUnlocked] = useState(false);

  const trackId = state.screen === "region" && state.regionId ? state.regionId : (state.previewId ?? "home");
  const preset = trackFor(trackId);

  // les navigateurs n'autorisent le son qu'après un geste : le premier clic / la première touche suffit
  useEffect(() => {
    if (unlocked) return;
    const go = () => {
      if (ambient.unlock()) setUnlocked(true);
    };
    window.addEventListener("pointerdown", go, { once: true });
    window.addEventListener("keydown", go, { once: true });
    return () => {
      window.removeEventListener("pointerdown", go);
      window.removeEventListener("keydown", go);
    };
  }, [unlocked]);

  useEffect(() => {
    ambient.play(enabled && unlocked ? preset.id : null);
  }, [enabled, unlocked, preset.id]);

  const toggle = useCallback(() => {
    if (ambient.unlock()) setUnlocked(true);
    writePref(!readPref());
  }, []);

  const value = useMemo<Ctx>(() => ({ enabled, playing: enabled && unlocked, label: preset.label, toggle }), [enabled, unlocked, preset.label, toggle]);
  return <AmbientCtx.Provider value={value}>{children}</AmbientCtx.Provider>;
}

export function useAmbient(): Ctx {
  const ctx = useContext(AmbientCtx);
  if (!ctx) throw new Error("useAmbient doit être utilisé dans <AmbientProvider>");
  return ctx;
}
