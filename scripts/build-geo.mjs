// Génère src/data/geo.generated.ts à partir d'un GeoJSON des préfectures japonaises.
// Usage : node scripts/build-geo.mjs <japan.geojson> <sortie.ts>
//   - carte nationale (page d'accueil, projection conique conforme)
//   - cartes de détail par région (Mercator, simplifiées à l'échelle d'affichage)
import fs from "node:fs";
import {
  geoPath,
  geoConicConformal,
  geoMercator,
} from "d3-geo";
import { topology } from "topojson-server";
import { feature, mesh, merge } from "topojson-client";
import { presimplify, simplify } from "topojson-simplify";

const [, , inFile, outFile] = process.argv;
const raw = JSON.parse(fs.readFileSync(inFile, "utf8"));

// Préfecture -> région du guide (code couleur du rabat)
const REGION_OF = {};
const assign = (region, ids) => ids.forEach((i) => (REGION_OF[i] = region));
assign("hokkaido", [1]);
assign("nord-honshu", [2, 3, 4, 5, 6, 7, 15]);
assign("tokyo", [13]);
assign("centre-honshu", [8, 9, 10, 11, 12, 14, 16, 17, 18, 19, 20, 21, 22, 23]);
assign("kyoto", [26]);
assign("ouest-honshu", [24, 25, 27, 28, 29, 30, 31, 32, 33, 34, 35]);
assign("shikoku", [36, 37, 38, 39]);
assign("kyushu", [40, 41, 42, 43, 44, 45, 46]);
assign("okinawa", [47]);

// 1) éclater les MultiPolygon, écarter les îles lointaines (hors cadre du guide)
const polyCentroidLat = (poly) => {
  const ring = poly[0];
  return ring.reduce((s, p) => s + p[1], 0) / ring.length;
};
const features = [];
for (const f of raw.features) {
  const id = f.properties.id;
  const polys =
    f.geometry.type === "Polygon" ? [f.geometry.coordinates] : f.geometry.coordinates;
  const kept = polys.filter((p) => {
    const lat = polyCentroidLat(p);
    if (id === 13) return lat > 34.2; // Tokyo : sans Izu / Ogasawara
    if (id === 46) return lat > 29.5; // Kagoshima : sans Amami
    return true;
  });
  features.push({
    type: "Feature",
    id,
    properties: { id, nameJa: f.properties.nam_ja, region: REGION_OF[id] },
    geometry: { type: "MultiPolygon", coordinates: kept },
  });
}

const topo = presimplify(
  topology({ prefs: { type: "FeatureCollection", features } }),
);

const REGIONS = Object.values(REGION_OF).filter((v, i, a) => a.indexOf(v) === i);

// poids planaire en degrés² : px² ramenés à l'échelle de la projection
const simplified = (proj, px2) =>
  simplify(topo, (px2 * (180 / Math.PI) ** 2) / (proj.scale() * proj.scale()));
const geoms = (t) => t.objects.prefs.geometries;

// Dessine un tableau de géométries topojson fusionnées -> chaîne de chemin SVG
const makePath = (proj, minArea) => {
  const gp = geoPath(proj).digits(1);
  return (geometry, t) => {
    const mp = merge(t, geometry);
    const polys = mp.coordinates
      .map((c) => ({ type: "Polygon", coordinates: c }))
      .filter((p) => gp.area(p) >= minArea);
    return polys.map((p) => gp(p)).join("");
  };
};

const spec = (kind, proj) => ({
  kind,
  rotate: proj.rotate(),
  center: proj.center(),
  parallels: kind === "conic" ? proj.parallels() : undefined,
  scale: +proj.scale().toFixed(3),
  translate: proj.translate().map((v) => +v.toFixed(3)),
});

// 2) Carte nationale ------------------------------------------------------
const HOME_W = 820;
const HOME_H = 940;
const homeProj = geoConicConformal().parallels([32, 44]).rotate([-137, 0]).center([0, 38]);
const mainland = {
  type: "FeatureCollection",
  features: features.filter((f) => f.id !== 47),
};
homeProj.fitExtent(
  [
    [30, 70],
    [HOME_W - 40, HOME_H - 120],
  ],
  mainland,
);
const homeTopo = simplified(homeProj, 2.2);
const homeMerge = makePath(homeProj, 6);
const homeGp = geoPath(homeProj).digits(1);
const home = { regions: {} };
for (const r of REGIONS) {
  if (r === "okinawa") continue;
  const gs = geoms(homeTopo).filter((g) => REGION_OF[g.id] === r);
  const d = homeMerge(gs, homeTopo);
  const fc = {
    type: "FeatureCollection",
    features: features.filter((f) => f.properties.region === r),
  };
  const c = homeGp.centroid(fc);
  home.regions[r] = { d, label: c.map((v) => +v.toFixed(1)) };
}
// frontières internes (maillage fin entre régions)
home.borders = homeGp(
  mesh(homeTopo, homeTopo.objects.prefs, (a, b) => REGION_OF[a.id] !== REGION_OF[b.id]),
);
home.proj = spec("conic", homeProj);
home.viewBox = [HOME_W, HOME_H];

// Encart Okinawa
const okiFeat = features.find((f) => f.id === 47);
const okiProj = geoMercator();
const OKI_BOX = { x: 560, y: 706, w: 230, h: 190 };
okiProj.fitExtent(
  [
    [OKI_BOX.x + 14, OKI_BOX.y + 40],
    [OKI_BOX.x + OKI_BOX.w - 14, OKI_BOX.y + OKI_BOX.h - 18],
  ],
  { type: "Feature", geometry: okiFeat.geometry, properties: {} },
);
const okiTopo = simplified(okiProj, 0.6);
home.okinawa = {
  box: OKI_BOX,
  d: makePath(okiProj, 0.8)(geoms(okiTopo).filter((g) => g.id === 47), okiTopo),
  proj: spec("mercator", okiProj),
};

// 3) Cartes de détail par région -------------------------------------------
const DW = 1000;
const DH = 1000;
const FOCUS = {
  // [[lonMin, latMin], [lonMax, latMax]] — recadrage éditorial
  okinawa: [
    [126.2, 25.9],
    [128.9, 27.3],
  ],
  kyushu: [
    [129.3, 30.9],
    [132.1, 34.0],
  ],
  "centre-honshu": [
    [136.0, 34.6],
    [140.9, 37.7],
  ],
  "nord-honshu": [
    [138.4, 36.9],
    [142.2, 41.6],
  ],
};
const detail = {};
const DETAIL_REGIONS = ["hokkaido", "nord-honshu", "centre-honshu", "ouest-honshu", "shikoku", "kyushu", "okinawa"];
for (const r of DETAIL_REGIONS) {
  const regionFeats = features.filter((f) => f.properties.region === r);
  const target =
    FOCUS[r] != null
      ? {
          type: "Feature",
          properties: {},
          geometry: {
            type: "MultiPoint",
            coordinates: [FOCUS[r][0], FOCUS[r][1], [FOCUS[r][0][0], FOCUS[r][1][1]], [FOCUS[r][1][0], FOCUS[r][0][1]]],
          },
        }
      : { type: "FeatureCollection", features: regionFeats };
  const proj = geoMercator();
  proj.fitExtent(
    [
      [70, 90],
      [DW - 70, DH - 90],
    ],
    target,
  );
  proj.clipExtent([
    [-4, -4],
    [DW + 4, DH + 4],
  ]);
  const t = simplified(proj, 1.1);
  const px = makePath(proj, 3);
  const inRegion = geoms(t).filter((g) => REGION_OF[g.id] === r);
  const others = geoms(t).filter((g) => REGION_OF[g.id] !== r);
  detail[r] = {
    viewBox: [DW, DH],
    proj: spec("mercator", proj),
    land: px(inRegion, t),
    neighbors: px(others, t),
    borders:
      geoPath(proj).digits(1)(
        mesh(t, t.objects.prefs, (a, b) => a.id !== b.id && REGION_OF[a.id] === r && REGION_OF[b.id] === r),
      ) ?? "",
  };
}

const ts = `// FICHIER GÉNÉRÉ par scripts/build-geo.mjs — ne pas modifier à la main.
export type ProjectionSpec = {
  kind: "conic" | "mercator";
  rotate: [number, number, number?];
  center: [number, number];
  parallels?: [number, number];
  scale: number;
  translate: [number, number];
};

export interface HomeMapData {
  viewBox: [number, number];
  proj: ProjectionSpec;
  borders: string;
  regions: Record<string, { d: string; label: [number, number] }>;
  okinawa: { box: { x: number; y: number; w: number; h: number }; d: string; proj: ProjectionSpec };
}

export interface DetailMapData {
  viewBox: [number, number];
  proj: ProjectionSpec;
  land: string;
  neighbors: string;
  borders: string;
}

export const HOME_MAP: HomeMapData = ${JSON.stringify(home)};

export const DETAIL_MAPS: Record<string, DetailMapData> = ${JSON.stringify(detail)};
`;
fs.writeFileSync(outFile, ts);
console.log("écrit", outFile, (ts.length / 1024).toFixed(0), "Ko");
for (const [k, v] of Object.entries(detail)) {
  console.log(k, (v.land.length / 1024).toFixed(1), (v.neighbors.length / 1024).toFixed(1));
}
console.log("home", Object.values(home.regions).reduce((s, r) => s + r.d.length, 0) / 1024);
