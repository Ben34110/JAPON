"use client";

import { AppStateProvider, useApp } from "@/state/app-state";
import { HomeScreen } from "./HomeScreen";
import { RegionView } from "./RegionView";

function Screens() {
  const { state } = useApp();
  if (state.screen === "region" && state.regionId) return <RegionView regionId={state.regionId} />;
  return <HomeScreen />;
}

export function AppShell() {
  return (
    <AppStateProvider>
      <Screens />
    </AppStateProvider>
  );
}
