/**
 * Typographie française : espaces insécables avant « ; : ! ? » et à l'intérieur des guillemets,
 * apostrophes courbes, « p. 27 » insécable.
 */
const NB = " ";
const NNB = " "; // espace fine insécable avant ; ! ?

export function fr(text: string): string {
  return text
    .replace(/'/g, "’")
    .replace(/ ([;!?])/g, `${NNB}$1`)
    .replace(/ :/g, `${NB}:`)
    .replace(/« /g, `«${NB}`)
    .replace(/ »/g, `${NB}»`)
    .replace(/\bp\. (\d)/g, `p.${NB}$1`)
    .replace(/(\d) (km|m|mn|h|%|août|janv\.|juin|sept\.|oct\.|nov\.|déc\.|fév\.)/g, `$1${NB}$2`)
    .replace(/(\d) (\d{3})\b/g, `$1${NB}$2`);
}
