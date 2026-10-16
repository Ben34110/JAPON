/** Pastille noire numérotée (⓮ ⓯ …) accolée aux noms de sites, comme dans le guide. */
export function Badge({ n, active, size }: { n: number; active?: boolean; size?: string }) {
  return (
    <span
      className="gv-badge"
      data-active={active ? "true" : undefined}
      style={size ? { fontSize: size } : undefined}
      aria-label={`Repère ${n}`}
    >
      {n}
    </span>
  );
}
