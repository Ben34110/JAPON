import type { PhotoSpec, RegionContent, Sidebar } from "@/lib/types";
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
export function SidebarBlock({ sidebar, span }: { sidebar: Sidebar; span: 1 | 2 | 3 }) {
  return (
    <aside className={`gv-sidebar ${sidebar.italic ? "italic" : ""}`}>
      <div className="gv-multi" data-span={span}>
        <h3>{fr(sidebar.title)}</h3>
        <div className="gv-prose">
          {sidebar.paragraphs.map((p, i) => (
            <p key={i} className={i === 0 ? "noindent" : undefined}>
              <RichText text={p} />
            </p>
          ))}
        </div>
        {sidebar.figure && (
          <div style={{ marginTop: 8 }} className="no-split">
            <FigureBlock photo={sidebar.figure} />
          </div>
        )}
      </div>
    </aside>
  );
}

export function HowToBlock({ title, paragraphs }: { title: string; paragraphs: string[] }) {
  return (
    <section className="gv-howto">
      <h3>{fr(title)}</h3>
      <div className="gv-prose">
        {paragraphs.map((p, i) => (
          <p key={i}>
            <RichText text={p} />
          </p>
        ))}
      </div>
    </section>
  );
}

/** Ouverture de chapitre : titre encadré, texte à lettrine, figurine détourée. */
export function IntroBlock({ content }: { content: RegionContent }) {
  const { intro } = content;
  return (
    <section>
      <div className="gv-chapter-title" style={{ marginBottom: 14 }}>
        <h1>{fr(intro.title)}</h1>
        <span className="orn" aria-hidden="true" />
      </div>
      <div className="gv-intro-grid">
        <div className="gv-multi" data-span="2">
          <div className="gv-prose">
            {intro.paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? "gv-dropcap" : undefined}>
                <RichText text={p} />
              </p>
            ))}
          </div>
        </div>
        {intro.figure && (
          <div className="fig" style={{ alignSelf: "center" }}>
            <div style={{ maxWidth: intro.figure.cutout ? 150 : undefined, margin: "0 auto" }}>
              <FigureBlock photo={intro.figure} />
            </div>
          </div>
        )}
      </div>
      {intro.wide && (
        <div style={{ marginTop: 14 }}>
          <FigureBlock photo={intro.wide} />
        </div>
      )}
    </section>
  );
}
