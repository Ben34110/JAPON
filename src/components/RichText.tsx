import { Fragment, type ReactNode } from "react";
import { fr } from "@/lib/typo";

/**
 * Micro-balisage éditorial : **gras**, *italique*, ^{e} (exposant : XVII^{e}).
 * Les guillemets français et espaces insécables sont saisis tels quels dans les données.
 */
export function RichText({ text: raw }: { text: string }) {
  const text = fr(raw);
  const out: ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*|\*([^*]+)\*|\^\{([^}]+)\}/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(<Fragment key={i++}>{text.slice(last, m.index)}</Fragment>);
    if (m[1] !== undefined) out.push(<strong key={i++}>{m[1]}</strong>);
    else if (m[2] !== undefined) out.push(<em key={i++}>{m[2]}</em>);
    else out.push(<sup key={i++}>{m[3]}</sup>);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(<Fragment key={i++}>{text.slice(last)}</Fragment>);
  return <>{out}</>;
}
