import type { PhotoSpec, Sidebar } from "@/lib/types";
import { fr } from "@/lib/typo";
import { PhotoPlaceholder } from "./PhotoPlaceholder";
import { RichText } from "./RichText";

export function FigureBlock({ photo }: { photo: PhotoSpec }) {
  return (
    <figure className="gv-figure" data-cutout={photo.cutout ? "true" : undefined}>
      <div className="frame">
        <PhotoPlaceholder spec={photo} />
      </div>
      {photo.caption && (
        <figcaption>
          <RichText text={photo.caption} />
        </figcaption>
      )}
    </figure>
  );
}

/** Encadré d'histoire : double filet, titre en petites capitales, texte italique. */
export function SidebarBlock({ sidebar }: { sidebar: Sidebar }) {
  return (
    <aside className={`gv-sidebar ${sidebar.italic ? "italic" : ""}`}>
      <h3>{fr(sidebar.title)}</h3>
      <div className="gv-prose">
        {sidebar.paragraphs.map((p, i) => (
          <p key={i} className={i === 0 ? "noindent" : undefined}>
            <RichText text={p} />
          </p>
        ))}
      </div>
      {sidebar.figure && (
        <div style={{ marginTop: 8 }}>
          <FigureBlock photo={sidebar.figure} />
        </div>
      )}
    </aside>
  );
}
