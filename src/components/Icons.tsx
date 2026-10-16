import type { ReactNode } from "react";
import type { AddressIcon } from "@/lib/types";

/**
 * Pictogrammes des fiches pratiques : petits carrés noirs à glyphe blanc,
 * comme les icônes du guide (téléphone, transport, horaires, tarifs…).
 */

type IcoProps = { size?: number; className?: string; title?: string };

function Square({ size = 13, children, className, title }: IcoProps & { children: ReactNode }) {
  return (
    <svg
      className={`ico ${className ?? ""}`}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      style={{ flex: "none", display: "inline-block" }}
    >
      <rect x="0.5" y="0.5" width="15" height="15" rx="2.4" fill="#111" />
      <g fill="#fff">{children}</g>
    </svg>
  );
}

export const IconPhone = (p: IcoProps) => (
  <Square {...p} title={p.title}>
    <path d="M4.3 3.2h2.1l.8 2.4-1.300 1c.8 1.700 1.900 2.800 3.600 3.600l1-1.300 2.400.8v2.100c0 .6-.5 1-1.100 1C7.500 12.500 3.500 8.600 3.200 4.300c0-.6.500-1.100 1.100-1.100z" />
  </Square>
);

export const IconTrain = (p: IcoProps) => (
  <Square {...p}>
    <path d="M5.200 3h5.600c.8 0 1.400.6 1.400 1.400v5.200c0 .8-.6 1.400-1.400 1.400l1.100 1.600h-1.300l-.8-1.100H6.200l-.8 1.100H4.100L5.200 11c-.8 0-1.400-.6-1.400-1.400V4.400C3.800 3.600 4.400 3 5.200 3z" />
    <rect x="5" y="4.300" width="6" height="3" fill="#111" />
    <circle cx="5.900" cy="9.300" r=".7" fill="#111" />
    <circle cx="10.100" cy="9.300" r=".7" fill="#111" />
  </Square>
);

export const IconBus = (p: IcoProps) => (
  <Square {...p}>
    <rect x="3.600" y="3.200" width="8.800" height="8" rx="1.400" />
    <rect x="4.600" y="4.300" width="6.800" height="2.800" fill="#111" />
    <circle cx="5.700" cy="9.200" r=".75" fill="#111" />
    <circle cx="10.300" cy="9.200" r=".75" fill="#111" />
    <rect x="4.300" y="11.200" width="1.500" height="1.500" />
    <rect x="10.200" y="11.200" width="1.500" height="1.500" />
  </Square>
);

export const IconBoat = (p: IcoProps) => (
  <Square {...p}>
    <path d="M8 3.200 8.600 3.200 8.600 8.800 12.200 8.800C11.900 9.900 11.300 11 10.400 11.600L5.600 11.600C4.700 11 4.100 9.900 3.800 8.800L7.400 8.800 7.400 5.400 5.200 8 4.300 7.500Z" />
    <path d="M2.800 12.400c1.100.7 2.200.7 3.200 0s2.100-.7 3.200 0 2.100.7 3.200 0" stroke="#fff" strokeWidth=".9" fill="none" />
  </Square>
);

export const IconPlane = (p: IcoProps) => (
  <Square {...p}>
    <path d="M7.300 2.800h1.400l.5 3.600 4 2.600v1.200l-4-1-.2 2.200 1.200 1v.9L8 12.600l-2.200.7v-.9l1.200-1-.2-2.200-4 1V9l4-2.600Z" />
  </Square>
);

export const IconCable = (p: IcoProps) => (
  <Square {...p}>
    <path d="M2.500 4.200 13.500 3.200" stroke="#fff" strokeWidth=".9" />
    <rect x="5.500" y="5.600" width="5.600" height="5" rx=".8" />
    <rect x="6.400" y="6.600" width="1.700" height="1.700" fill="#111" />
    <rect x="8.700" y="6.600" width="1.700" height="1.700" fill="#111" />
    <path d="M8.300 3.800v1.800" stroke="#fff" strokeWidth=".9" />
  </Square>
);

export const IconCar = (p: IcoProps) => (
  <Square {...p}>
    <path d="M4.300 6.300 5.200 4.200c.2-.5.6-.8 1.200-.8h3.200c.6 0 1 .3 1.200.8l.9 2.100c.6.2 1 .8 1 1.400v2.400h-1.300v.9H10v-.9H6v.9H4.600v-.9H3.300V7.700c0-.6.4-1.200 1-1.400Z" />
    <circle cx="5.600" cy="8.100" r=".75" fill="#111" />
    <circle cx="10.400" cy="8.100" r=".75" fill="#111" />
  </Square>
);

export const IconInfo = (p: IcoProps) => (
  <Square {...p}>
    <circle cx="8" cy="4.200" r="1.200" />
    <path d="M6.600 6.600h2.400v5.200h1.200v1H5.800v-1H7V7.600h-.4Z" />
  </Square>
);

export const IconPopulation = (p: IcoProps) => (
  <Square {...p}>
    <circle cx="8" cy="5" r="1.800" />
    <path d="M4.300 12.800c0-2.400 1.600-4 3.700-4s3.700 1.600 3.700 4Z" />
  </Square>
);

export const IconFestival = (p: IcoProps) => (
  <Square {...p}>
    <path d="M8 2.800 9 5l2.400.3-1.800 1.600.5 2.400L8 8.200 5.900 9.300l.5-2.400L4.600 5.300 7 5Z" />
    <rect x="7.300" y="10" width="1.400" height="3" />
  </Square>
);

export const IconWeb = (p: IcoProps) => (
  <Square {...p}>
    <circle cx="8" cy="8" r="4.600" fill="none" stroke="#fff" strokeWidth=".9" />
    <path d="M3.400 8h9.200M8 3.400c-2 2.600-2 6.600 0 9.200M8 3.400c2 2.600 2 6.600 0 9.200" stroke="#fff" strokeWidth=".8" fill="none" />
  </Square>
);

/** Horaires : cercle ouvert, comme dans le guide (« ◯ t.l.j. »). */
export const IconClock = ({ size = 12, title }: IcoProps) => (
  <svg
    className="ico"
    width={size}
    height={size}
    viewBox="0 0 16 16"
    role={title ? "img" : undefined}
    aria-label={title}
    aria-hidden={title ? undefined : true}
    style={{ flex: "none", display: "inline-block" }}
  >
    <circle cx="8" cy="8" r="6.600" fill="#fff" stroke="#111" strokeWidth="1.500" />
    <path d="M8 4.200V8l2.600 1.600" stroke="#111" strokeWidth="1.300" fill="none" strokeLinecap="round" />
  </svg>
);

/** Entrée payante : carré hachuré (¥). */
export const IconTicket = ({ size = 13, title }: IcoProps) => (
  <svg
    className="ico"
    width={size}
    height={size}
    viewBox="0 0 16 16"
    role={title ? "img" : undefined}
    aria-label={title}
    aria-hidden={title ? undefined : true}
    style={{ flex: "none", display: "inline-block" }}
  >
    <rect x="0.5" y="0.5" width="15" height="15" rx="2.400" fill="#111" />
    <path d="M-1 14 14 -1M2 17 17 2M-1 8 8 -1M8 17l9-9" stroke="#fff" strokeWidth="1.100" opacity=".95" />
    <rect x="4" y="4" width="8" height="8" rx="1.300" fill="#111" />
    <path d="M5.700 5.400 8 8.200l2.300-2.800M8 8.200v3.400M6.200 8.600h3.600M6.200 10h3.600" stroke="#fff" strokeWidth=".95" fill="none" />
  </svg>
);

/** Icône « type de lieu » qui précède le nom de la fiche. */
export function PlaceIcon({ kind, size = 15 }: { kind: AddressIcon; size?: number }) {
  const g: Record<AddressIcon, ReactNode> = {
    castle: (
      <>
        <path d="M8 2.500 12.800 6.200H3.200Z" />
        <path d="M3.200 6.800h9.600v1H3.200ZM4 8.300h8v4.700H4Z" />
        <rect x="7" y="10" width="2" height="3" fill="#111" />
      </>
    ),
    temple: (
      <>
        <path d="M2.200 4.300c1.800.5 3.800.8 5.800.8s4-.3 5.800-.8v1.600H2.200Z" />
        <rect x="4" y="6.300" width="1.300" height="6.700" />
        <rect x="10.700" y="6.300" width="1.300" height="6.700" />
        <rect x="3" y="8" width="10" height="1.200" />
      </>
    ),
    garden: (
      <path d="M13 2.800C7.500 2.600 3.800 5.400 3.800 9.200c0 1 .3 1.800.8 2.500L3 13.300l.7.7 1.600-1.600c.7.400 1.500.6 2.300.6 3.900 0 5.700-3.800 5.400-8.200Z" />
    ),
    museum: (
      <>
        <path d="M8 2.600 13.600 5.500v1H2.400v-1Z" />
        <rect x="3.500" y="7.300" width="1.500" height="4.200" />
        <rect x="6.300" y="7.300" width="1.500" height="4.200" />
        <rect x="9.100" y="7.300" width="1.500" height="4.200" />
        <rect x="2.400" y="12" width="11.200" height="1.300" />
      </>
    ),
    house: (
      <>
        <path d="M8 2.800 13.200 7.300H2.800Z" />
        <rect x="4" y="7.500" width="8" height="5.600" />
        <rect x="6.800" y="9.200" width="2.400" height="3.900" fill="#111" />
      </>
    ),
    shop: (
      <>
        <path d="M3 6.200h10l-1 6.800H4Z" />
        <path d="M5.600 6.200c0-3 4.800-3 4.800 0" stroke="#fff" strokeWidth="1.100" fill="none" />
      </>
    ),
    park: (
      <>
        <path d="M8 2.200 12.200 8.200H9.800L12.600 12H3.400L6.200 8.200H3.800Z" />
        <rect x="7.300" y="11.800" width="1.400" height="2" />
      </>
    ),
    church: (
      <>
        <path d="M7.200 2.200h1.600v2h2v1.500h-2v1.600l3 2.300V13H3.800V9.600l3-2.300V5.700h-2V4.200h2.400Z" />
        <rect x="7" y="10.400" width="2" height="2.600" fill="#111" />
      </>
    ),
    market: (
      <>
        <path d="M2.600 5 4 2.800h8L13.400 5Z" />
        <rect x="3.400" y="5.800" width="1.200" height="7" />
        <rect x="11.400" y="5.800" width="1.200" height="7" />
        <rect x="3.400" y="9" width="9.200" height="1.300" />
      </>
    ),
    peace: (
      <path d="M2.800 9.400c1.200-.2 2.400-1 3.200-2.200L7.200 3.800 8.700 6.200c1.700.2 2.900-.5 4-1.800-.1 3.300-2.100 5.600-4.800 6l.2 2.500H7.200l.2-2.400C5.600 10.300 3.900 10 2.800 9.400Z" />
    ),
    theme: (
      <>
        <circle cx="8" cy="7" r="4.200" fill="none" stroke="#fff" strokeWidth="1" />
        <path d="M8 2.800v8.400M3.800 7h8.400M5 4l6 6M11 4 5 10" stroke="#fff" strokeWidth=".7" />
        <path d="M5.800 13.300 8 7.500l2.200 5.800Z" />
      </>
    ),
    onsen: (
      <>
        <path d="M5.200 2.800c-1 1 1 1.800 0 3M8 2.800c-1 1 1 1.800 0 3M10.800 2.800c-1 1 1 1.800 0 3" stroke="#fff" strokeWidth=".95" fill="none" strokeLinecap="round" />
        <path d="M2.600 8.300h10.800c0 2.800-1.600 4.800-5.400 4.800S2.600 11.100 2.600 8.300Z" />
      </>
    ),
    mountain: <path d="M1.800 12.800 6.400 4.600 8.600 8.200 10 6.200l4.200 6.600Z" />,
    boat: (
      <>
        <path d="M8 2.600h.8v5.600H12c-.3 1.100-.8 2.100-1.600 2.700H5.600C4.800 10.300 4.300 9.300 4 8.200h3.200V4.800L5 7.400Z" />
        <path d="M2.800 12.400c1.100.7 2.200.7 3.200 0s2.100-.7 3.200 0 2.100.7 3.200 0" stroke="#fff" strokeWidth=".9" fill="none" />
      </>
    ),
    cable: (
      <>
        <path d="M2.500 4.200 13.500 3.200" stroke="#fff" strokeWidth=".9" />
        <rect x="5.500" y="5.600" width="5.600" height="5" rx=".8" />
      </>
    ),
  };
  return <Square size={size}>{g[kind]}</Square>;
}

export function TransitIcon({ mode, size = 13 }: { mode: "train" | "bus" | "boat" | "car" | "plane" | "cable"; size?: number }) {
  const C = { train: IconTrain, bus: IconBus, boat: IconBoat, car: IconCar, plane: IconPlane, cable: IconCable }[mode];
  return <C size={size} />;
}

/** « GUIDES 👁 VOIR » : l'œil de la collection. */
export function EyeLogo({ size = 22, color = "#fff" }: { size?: number; color?: string }) {
  return (
    <svg width={size * 1.6} height={size} viewBox="0 0 40 25" aria-hidden="true" style={{ display: "inline-block" }}>
      <path d="M1.500 12.500C6 5.200 12.600 2 20 2s14 3.200 18.500 10.500C34 19.800 27.400 23 20 23S6 19.800 1.500 12.500Z" fill="none" stroke={color} strokeWidth="1.800" />
      <circle cx="20" cy="12.500" r="7.200" fill={color} />
      <circle cx="20" cy="12.500" r="4.400" fill="#0b0b0b" />
      <circle cx="17.600" cy="10" r="1.700" fill={color} />
    </svg>
  );
}

/** Rose des vents du guide (bleu clair et filet noir). */
export function Compass({ size = 70 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="-50 -50 100 100" aria-hidden="true">
      <circle r="42" fill="none" stroke="#111" strokeWidth=".6" opacity=".35" />
      <path d="M0-46 7-7 46 0 7 7 0 46-7 7-46 0-7-7Z" fill="#9ccfe6" stroke="#111" strokeWidth=".9" strokeLinejoin="round" />
      <path d="M0-46 7-7 0 0Z M46 0 7 7 0 0Z M0 46-7 7 0 0Z M-46 0-7-7 0 0Z" fill="#fff" stroke="#111" strokeWidth=".6" />
      <path d="M0-30 5-5 30 0 5 5 0 30-5 5-30 0-5-5Z" fill="#cfe9f4" opacity=".9" />
      <circle r="2.200" fill="#111" />
    </svg>
  );
}
