import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, EB_Garamond, Crimson_Pro, Archivo } from "next/font/google";
import "./globals.css";

// Didone (ITC Bodoni / Didot) : titres de collection, lettrines, couverture
const didone = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--ff-didone",
  display: "swap",
});

// Garamond : titres de sites, petites capitales
const garamond = EB_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--ff-garamond",
  display: "swap",
});

// Minion / Caslon : texte courant, encadrés d'histoire (italique)
const body = Crimson_Pro({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--ff-body",
  display: "swap",
});

// Franklin Gothic Demi Condensed : fiches pratiques, folios, métadonnées
const gothic = Archivo({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["wdth"],
  variable: "--ff-gothic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Guides Voir — Japon, région par région",
  description:
    "Prototype numérique de la direction artistique du guide « Guides Voir – Japon » (Hachette / Dorling Kindersley) : carte des régions, mise en page en trois colonnes, visite guidée.",
};

export const viewport: Viewport = {
  themeColor: "#F9F8F5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${didone.variable} ${garamond.variable} ${body.variable} ${gothic.variable}`}
    >
      <head>
        {/* Kanji : Shippori Mincho (tranches unicode-range, seules les tranches utilisées sont chargées) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;500;700&family=Noto+Serif+JP:wght@400;600&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
