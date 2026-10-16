# Guides Voir · Japon — prototype numérique

Transposition web de la direction artistique du guide *Guides Voir – Japon* (Hachette / Dorling Kindersley) :
carte des régions au code couleur du rabat, pages en trois colonnes, visite guidée.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

Liens profonds : `#/kyushu`, `#/kyushu/kumamoto`, `#/kyushu/kumamoto/visite`, `#/apercu/kyushu`.

## Architecture

| Fichier | Rôle |
| --- | --- |
| `src/components/JapanMap.tsx` | Carte SVG du Japon par région, encart Okinawa, villes, rose des vents |
| `src/components/RegionPreviewCard.tsx` | Fiche d'aperçu (cadre de couleur, « Pages x-y », « Explorer la région ») |
| `src/components/ColorCodeFlap.tsx` | Rabat « Visite mode d'emploi » (code couleur, interactif) |
| `src/components/RegionColumnsLayout.tsx` | Pages : en-tête pointillé, folio, onglet de chapitre, grille 3 colonnes |
| `src/components/PointOfInterestItem.tsx` | Site : titre + pastille + kanji, métadonnées, lettrine, fiches pratiques |
| `src/components/RegionMapPanel.tsx`, `MapCanvas.tsx`, `MapBases.tsx` | Carte/plan synchronisés, pins, zoom animé |
| `src/components/GuidedTourControls.tsx` | Boutons flottants `<` `>` et bandeau d'étape |
| `src/state/app-state.tsx` | État global (une session par région : site actif, mode, étape) + URL |
| `src/data/content/*.ts` | Jeu de données français (9 chapitres ; Kyushu, Tokyo, Shikoku, Centre détaillés) |
| `src/data/plans.ts` | Plans stylisés (Tokyo-nord, Kyoto) |
| `scripts/build-geo.mjs` | Génère `src/data/geo.generated.ts` (contours simplifiés) depuis un GeoJSON des préfectures |

Régénérer la géométrie : `node scripts/build-geo.mjs <japan.geojson> src/data/geo.generated.ts`
(source utilisée : `dataofjapan/land`).

Les photographies sont des visuels SVG de substitution ; renseigner `src` dans un `PhotoSpec`
(ex. URL Unsplash) pour les remplacer.
