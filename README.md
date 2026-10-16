# Guides Voir · Japon — prototype numérique

Transposition web de la direction artistique du guide *Guides Voir – Japon* (Hachette / Dorling Kindersley) :
carte des régions au code couleur du rabat, pages en trois colonnes, visite guidée.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

Tout tient dans l'écran (pas de défilement vertical) : la vue région est un livre paginé — page 1 = page
explicative du chapitre (texte, photo, sommaire avec folios), puis les sites en trois colonnes qui
s'enchaînent ; on tourne les pages (boutons, ← →, glisser du doigt, ou visite guidée).
Tokyo est découpé comme dans le guide en trois secteurs (Centre, Nord, Ouest), chacun avec son plan,
plus une carte large (Kamakura) ; Kyoto est traité comme une seule ville (plan + carte large avec Nara).

Liens profonds : `#/kyushu`, `#/kyushu/kumamoto`, `#/kyushu/kumamoto/visite`, `#/apercu/kyushu`.

## Architecture

| Fichier | Rôle |
| --- | --- |
| `src/components/JapanMap.tsx` | Carte SVG du Japon par région, encart Okinawa, villes, rose des vents |
| `src/components/RegionPreviewCard.tsx` | Fiche d'aperçu (cadre de couleur, « Pages x-y », « Explorer la région ») |
| `src/components/ColorCodeFlap.tsx` | Rabat « Visite mode d'emploi » (code couleur, interactif) |
| `src/components/RegionColumnsLayout.tsx` | Livre paginé : en-tête pointillé, folio, onglet de chapitre, flux en 3 colonnes, pagination |
| `src/components/ChapterOpener.tsx` | Page explicative d'un chapitre + sommaire |
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

## Photographies

Les photos viennent de Wikimedia Commons (licences libres). `node scripts/fetch-wiki-photos.mjs` les
télécharge dans `public/photos/` et écrit `src/data/photos.generated.ts` (auteur, licence, lien) ;
la page `/credits` en donne l'attribution. Les figures du contenu y font référence par la clé `wiki`.

## Musique d'ambiance

Chaque région a sa propre ambiance, **synthétisée dans le navigateur** (Web Audio, aucun fichier audio,
donc aucun droit à gérer) : gamme japonaise propre à la région (hirajoshi, in, yo, ryukyu, iwato), timbres
de koto / shamisen / sanshin / shakuhachi / cloche, bourdon et bruits de fond (vent, mer, pluie, torrent,
ville, neige), fondu enchaîné de 3 s entre deux ambiances. Le son ne peut démarrer qu'après un premier clic
(règle des navigateurs) ; le bouton « Musique » en haut à droite le coupe, et le choix est mémorisé.
Code : `src/lib/ambient/` (réglages par région dans `presets.ts`), `src/state/ambient.tsx`.
