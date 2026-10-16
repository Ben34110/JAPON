"use client";

import type { Poi } from "@/lib/types";
import { fr } from "@/lib/typo";
import { AddressBox } from "./AddressBox";
import { Badge } from "./Badge";
import { IconFestival, IconInfo, IconPopulation, IconWeb, TransitIcon } from "./Icons";
import { PhotoPlaceholder } from "./PhotoPlaceholder";
import { RichText } from "./RichText";

interface Props {
  poi: Poi;
  active: boolean;
  onSelect: (poiId: string) => void;
}

/**
 * Un site du guide : titre Garamond + pastille numérotée + kanji, filet,
 * bloc de métadonnées, texte justifié à lettrine Didone, fiches pratiques.
 */
export function PointOfInterestItem({ poi, active, onSelect }: Props) {
  const { meta } = poi;
  return (
    <article id={`poi-${poi.id}`} className={`gv-poi ${active ? "is-active" : ""}`} data-poi={poi.id} aria-current={active ? "true" : undefined}>
      <div>
        <header className="gv-poi-head" style={{ breakAfter: "avoid" }}>
          <button
            type="button"
            className="gv-poi-title max-md:my-[-10px] max-md:py-[10px]"
            onClick={() => onSelect(poi.id)}
            aria-label={`${poi.name}, repère ${poi.marker} : afficher sur la carte`}
          >
            {fr(poi.name)} <Badge n={poi.marker} active={active} />
          </button>
          <div className="gv-kanji" lang="ja">
            {poi.nameJa}
          </div>
          <div className="gv-meta">
            {meta.prefecture && <span>{fr(meta.prefecture)} </span>}
            {meta.plan && <span>{fr(meta.plan)} </span>}
            {meta.population && (
              <span>
                <IconPopulation size={11} title="Population" /> {fr(meta.population)}.{" "}
              </span>
            )}
            {meta.transit?.map((t, i) => (
              <span key={i}>
                <TransitIcon mode={t.mode} size={11} /> {fr(t.text)}{" "}
              </span>
            ))}
            {meta.info && (
              <span>
                <IconInfo size={11} title="Informations touristiques" /> {fr(meta.info)}{" "}
              </span>
            )}
            {meta.web && (
              <span>
                <IconWeb size={11} title="Site Internet" /> {meta.web}{" "}
              </span>
            )}
            {meta.festival && (
              <span>
                <IconFestival size={11} title="Fête" /> {fr(meta.festival)}
              </span>
            )}
          </div>
        </header>
        <div className="gv-prose" style={{ marginTop: 10 }}>
          {poi.body.map((p, i) => (
            <p key={i} className={i === 0 ? "gv-dropcap" : undefined}>
              <RichText text={p} />
            </p>
          ))}
        </div>
        {poi.practical && poi.practical.length > 0 && (
          <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 7 }}>
            {poi.practical.map((e) => (
              <AddressBox key={e.name} entry={e} />
            ))}
          </div>
        )}
        {poi.aside && (
          <figure className="gv-figure" data-cutout={poi.aside.cutout ? "true" : undefined} style={{ margin: "10px auto 0", width: poi.aside.cutout ? "38%" : "70%", minWidth: 70 }}>
            <div className="frame">
              <PhotoPlaceholder spec={poi.aside} />
            </div>
            {poi.aside.caption && (
              <figcaption>
                <RichText text={poi.aside.caption} />
              </figcaption>
            )}
          </figure>
        )}
      </div>
    </article>
  );
}
