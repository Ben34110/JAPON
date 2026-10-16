"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from "react";
import type { RegionId } from "@/lib/types";
import { CONTENT } from "@/data/content";
import { REGION_BY_ID } from "@/data/regions";

/** D'où vient le changement : sert à décider s'il faut faire défiler le texte / recentrer la carte. */
export type ChangeSource = "map" | "text" | "tour" | "init";
export type Mode = "free" | "tour";

export interface RegionSession {
  activePoiId: string | null;
  mode: Mode;
  tourIndex: number;
  source: ChangeSource;
  /** compteur : permet de re-déclencher le défilement sur un même site */
  nonce: number;
}

interface State {
  screen: "home" | "region";
  /** région dont la fiche d'aperçu est ouverte sur la carte générale */
  previewId: RegionId | null;
  regionId: RegionId | null;
  /** état conservé par région : on retrouve sa visite en revenant */
  sessions: Partial<Record<RegionId, RegionSession>>;
}

type Action =
  | { type: "preview"; id: RegionId | null }
  | { type: "open"; id: RegionId; poiId?: string | null; tour?: boolean }
  | { type: "home" }
  | { type: "activate"; poiId: string | null; source: ChangeSource }
  | { type: "startTour" }
  | { type: "stopTour" }
  | { type: "step"; delta: 1 | -1 }
  | { type: "goto"; index: number };

const blankSession = (): RegionSession => ({
  activePoiId: null,
  mode: "free",
  tourIndex: 0,
  source: "init",
  nonce: 0,
});

const poiIds = (id: RegionId) => CONTENT[id].pois.map((p) => p.id);

function withSession(state: State, fn: (s: RegionSession, ids: string[]) => RegionSession): State {
  const id = state.regionId;
  if (!id) return state;
  const cur = state.sessions[id] ?? blankSession();
  return { ...state, sessions: { ...state.sessions, [id]: fn(cur, poiIds(id)) } };
}

function reducer(state: State, a: Action): State {
  switch (a.type) {
    case "preview":
      return { ...state, previewId: a.id };
    case "open": {
      const ids = poiIds(a.id);
      const prev = state.sessions[a.id] ?? blankSession();
      let s = prev;
      if (a.poiId && ids.includes(a.poiId)) {
        s = { ...prev, activePoiId: a.poiId, tourIndex: ids.indexOf(a.poiId), source: "init", nonce: prev.nonce + 1 };
      }
      if (a.tour) {
        const idx = Math.max(0, s.activePoiId ? ids.indexOf(s.activePoiId) : 0);
        s = { ...s, mode: "tour", tourIndex: idx, activePoiId: ids[idx] ?? null, source: "tour", nonce: s.nonce + 1 };
      }
      return { ...state, screen: "region", regionId: a.id, previewId: a.id, sessions: { ...state.sessions, [a.id]: s } };
    }
    case "home":
      return { ...state, screen: "home", previewId: state.regionId ?? state.previewId };
    case "activate":
      return withSession(state, (s, ids) => ({
        ...s,
        activePoiId: a.poiId,
        tourIndex: a.poiId && ids.includes(a.poiId) ? ids.indexOf(a.poiId) : s.tourIndex,
        source: a.source,
        nonce: s.nonce + 1,
      }));
    case "startTour":
      return withSession(state, (s, ids) => {
        const idx = s.activePoiId && ids.includes(s.activePoiId) ? ids.indexOf(s.activePoiId) : 0;
        return { ...s, mode: "tour", tourIndex: idx, activePoiId: ids[idx] ?? null, source: "tour", nonce: s.nonce + 1 };
      });
    case "stopTour":
      return withSession(state, (s) => ({ ...s, mode: "free", source: "init", nonce: s.nonce + 1 }));
    case "step":
      return withSession(state, (s, ids) => {
        const idx = Math.min(ids.length - 1, Math.max(0, s.tourIndex + a.delta));
        return { ...s, mode: "tour", tourIndex: idx, activePoiId: ids[idx] ?? null, source: "tour", nonce: s.nonce + 1 };
      });
    case "goto":
      return withSession(state, (s, ids) => {
        const idx = Math.min(ids.length - 1, Math.max(0, a.index));
        return { ...s, tourIndex: idx, activePoiId: ids[idx] ?? null, source: "tour", nonce: s.nonce + 1 };
      });
  }
}

interface Ctx {
  state: State;
  session: RegionSession | null;
  previewRegion: (id: RegionId | null) => void;
  openRegion: (id: RegionId, opts?: { poiId?: string; tour?: boolean }) => void;
  backToMap: () => void;
  activatePoi: (poiId: string | null, source: ChangeSource) => void;
  startTour: () => void;
  stopTour: () => void;
  step: (delta: 1 | -1) => void;
  goto: (index: number) => void;
}

const AppCtx = createContext<Ctx | null>(null);

const REGION_IDS = Object.keys(REGION_BY_ID) as RegionId[];

/** `#kyushu/kumamoto` ou `#kyushu/kumamoto/visite` */
function parseHash(hash: string): { id: RegionId; poiId?: string; tour?: boolean } | null {
  const [id, poiId, flag] = hash.replace(/^#\/?/, "").split("/");
  if (!REGION_IDS.includes(id as RegionId)) return null;
  return { id: id as RegionId, poiId: poiId || undefined, tour: flag === "visite" };
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    screen: "home",
    previewId: null,
    regionId: null,
    sessions: {},
  } satisfies State);

  const hydrated = useRef(false);

  // lien profond au chargement
  useEffect(() => {
    const parsed = parseHash(window.location.hash);
    const preview = /^#\/?apercu\/([\w-]+)/.exec(window.location.hash)?.[1] as RegionId | undefined;
    if (parsed) dispatch({ type: "open", id: parsed.id, poiId: parsed.poiId, tour: parsed.tour });
    else if (preview && REGION_IDS.includes(preview)) dispatch({ type: "preview", id: preview });
    hydrated.current = true;
    const onHash = () => {
      const p = parseHash(window.location.hash);
      if (p) dispatch({ type: "open", id: p.id, poiId: p.poiId, tour: p.tour });
      else dispatch({ type: "home" });
    };
    window.addEventListener("popstate", onHash);
    return () => window.removeEventListener("popstate", onHash);
  }, []);

  const session = state.regionId ? (state.sessions[state.regionId] ?? null) : null;

  // l'URL suit l'état (partageable, sans recharger)
  useEffect(() => {
    if (!hydrated.current) return;
    let hash = "";
    if (state.screen === "region" && state.regionId) {
      hash = `#/${state.regionId}`;
      if (session?.activePoiId) hash += `/${session.activePoiId}`;
      if (session?.mode === "tour") hash += session.activePoiId ? "/visite" : "//visite";
    }
    if (window.location.hash !== hash) {
      window.history.replaceState(null, "", hash || window.location.pathname + window.location.search);
    }
  }, [state.screen, state.regionId, session?.activePoiId, session?.mode, session]);

  const previewRegion = useCallback((id: RegionId | null) => dispatch({ type: "preview", id }), []);
  const openRegion = useCallback(
    (id: RegionId, opts?: { poiId?: string; tour?: boolean }) => dispatch({ type: "open", id, ...opts }),
    [],
  );
  const backToMap = useCallback(() => dispatch({ type: "home" }), []);
  const activatePoi = useCallback(
    (poiId: string | null, source: ChangeSource) => dispatch({ type: "activate", poiId, source }),
    [],
  );
  const startTour = useCallback(() => dispatch({ type: "startTour" }), []);
  const stopTour = useCallback(() => dispatch({ type: "stopTour" }), []);
  const step = useCallback((delta: 1 | -1) => dispatch({ type: "step", delta }), []);
  const goto = useCallback((index: number) => dispatch({ type: "goto", index }), []);

  const value = useMemo<Ctx>(
    () => ({ state, session, previewRegion, openRegion, backToMap, activatePoi, startTour, stopTour, step, goto }),
    [state, session, previewRegion, openRegion, backToMap, activatePoi, startTour, stopTour, step, goto],
  );

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp(): Ctx {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error("useApp doit être utilisé dans <AppStateProvider>");
  return ctx;
}
