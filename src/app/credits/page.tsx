import type { Metadata } from "next";
import Link from "next/link";
import { PHOTOS } from "@/data/photos.generated";

export const metadata: Metadata = {
  title: "Crédits photographiques — Guides Voir · Japon",
};

/** Attribution des photographies Wikimedia Commons (licences libres : CC BY, CC BY-SA, domaine public). */
export default function CreditsPage() {
  const rows = Object.entries(PHOTOS).sort((a, b) => a[1].article.localeCompare(b[1].article));
  return (
    <main className="mx-auto max-w-[980px] px-5 py-8">
      <div className="gv-band" style={{ margin: "-32px -20px 24px" }}>
        <span>Crédits photographiques</span>
      </div>
      <h1 className="f-didone m-0 text-[30px] font-normal uppercase tracking-[0.1em]">Crédits photographiques</h1>
      <p className="f-body mt-2 text-[16px] italic">
        Les photographies de cette maquette proviennent de Wikimedia Commons et sont placées sous licence libre. Elles sont
        redimensionnées et recadrées pour la mise en page. Chaque ligne renvoie à la page d’origine du fichier.
      </p>
      <p className="mt-2">
        <Link className="f-gothic text-[13px] font-bold uppercase tracking-[0.12em] underline" href="/">
          ← Retour au guide
        </Link>
      </p>
      <table className="mt-6 w-full border-collapse text-left text-[13.5px]">
        <thead>
          <tr className="f-gothic border-b border-[#111] text-[11px] uppercase tracking-[0.14em]">
            <th className="py-1.5 pr-3">Photo</th>
            <th className="py-1.5 pr-3">Article</th>
            <th className="py-1.5 pr-3">Auteur</th>
            <th className="py-1.5">Licence</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([key, p]) => (
            <tr key={key} className="border-b border-[#1112] align-top">
              <td className="py-1.5 pr-3">
                <a href={p.page} target="_blank" rel="noopener noreferrer" className="underline">
                  {p.file.replace(/_/g, " ")}
                </a>
              </td>
              <td className="py-1.5 pr-3">{p.article.replace(/^[a-z]{2}:/, "")}</td>
              <td className="py-1.5 pr-3">{p.author}</td>
              <td className="py-1.5">
                {p.licenseUrl ? (
                  <a href={p.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline">
                    {p.license}
                  </a>
                ) : (
                  p.license
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
