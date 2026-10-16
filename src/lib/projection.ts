import { geoConicConformal, geoMercator, type GeoProjection } from "d3-geo";
import type { ProjectionSpec } from "@/data/geo.generated";

const cache = new WeakMap<object, GeoProjection>();

/** Reconstruit la projection d3 utilisée par scripts/build-geo.mjs. */
export function makeProjection(spec: ProjectionSpec): GeoProjection {
  const hit = cache.get(spec);
  if (hit) return hit;
  const p = spec.kind === "conic" ? geoConicConformal() : geoMercator();
  if (spec.kind === "conic" && spec.parallels) (p as ReturnType<typeof geoConicConformal>).parallels(spec.parallels);
  p.rotate(spec.rotate as [number, number, number]);
  p.center(spec.center);
  p.scale(spec.scale);
  p.translate(spec.translate);
  cache.set(spec, p);
  return p;
}

export function project(spec: ProjectionSpec, lonLat: [number, number]): [number, number] {
  const p = makeProjection(spec)(lonLat);
  // arrondi : évite les écarts de flottants entre serveur et navigateur (hydratation)
  return p ? [Math.round(p[0] * 10) / 10, Math.round(p[1] * 10) / 10] : [0, 0];
}
