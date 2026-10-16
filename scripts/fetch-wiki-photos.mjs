// Télécharge la photo d'en-tête de pages Wikipédia (images libres de Wikimedia Commons uniquement)
// vers public/photos/ et écrit src/data/photos.generated.ts avec auteur + licence pour les crédits.
// Usage : node scripts/fetch-wiki-photos.mjs
import fs from "node:fs";
import path from "node:path";

const UA = "guides-voir-japon-prototype/1.0 (https://github.com/Ben34110/JAPON; projet étudiant)";
const OUT_DIR = "public/photos";
const OUT_TS = "src/data/photos.generated.ts";

// clé -> titre de l'article (Wikipédia anglophone : meilleures photos d'en-tête)
const MANIFEST = {
  // Kyushu
  nagasaki: "Nagasaki",
  "huis-ten-bosch": "Huis Ten Bosch (theme park)",
  "mont-unzen": "Mount Unzen",
  dejima: "Dejima",
  "kumamoto-castle": "Kumamoto Castle",
  "mont-aso": "Mount Aso",
  beppu: ["Umi Jigoku", "Beppu Onsen", "fr:Beppu"],
  sakurajima: "Sakurajima",
  "hakata-doll": "Hakata ningyō",
  kagoshima: ["Kagoshima", "Sakurajima"],
  "sengan-en": "Sengan-en",
  // Tokyo
  tokyo: ["Tokyo Skytree", "Shinjuku"],
  "ueno-park": "Ueno Park",
  ameyoko: "Ameya-Yokochō",
  yanaka: "Yanaka, Tokyo",
  kaminarimon: "Kaminarimon",
  "senso-ji": "Sensō-ji",
  ukiyoe: ["The Great Wave off Kanagawa", "Ukiyo-e"],
  "tokyo-national-museum": "Tokyo National Museum",
  "kamakura-daibutsu": "Kōtoku-in",
  kamakura: "Kamakura",
  "imperial-palace": ["Nijubashi", "Tokyo Imperial Palace"],
  "tokyo-station": ["Tokyo Station"],
  ginza: ["Ginza", "Wako (department store)"],
  hamarikyu: ["Hamarikyu Gardens", "Hama-rikyū Gardens"],
  shinjuku: ["Tokyo Metropolitan Government Building", "Shinjuku"],
  "meiji-jingu": ["Meiji Shrine"],
  shibuya: ["Shibuya Crossing", "Shibuya"],
  roppongi: ["Roppongi Hills", "Mori Art Museum"],
  // Kyoto
  kyoto: "Kyoto",
  "kinkaku-ji": "Kinkaku-ji",
  "nijo-castle": "Nijō Castle",
  gion: "Gion, Kyoto",
  "kiyomizu-dera": "Kiyomizu-dera",
  "fushimi-inari": "Fushimi Inari-taisha",
  "todai-ji": "Tōdai-ji",
  // Ouest de Honshu
  dotonbori: "Dōtonbori",
  "osaka-castle": "Osaka Castle",
  "nara-park": "Nara Park",
  "kasuga-taisha": "Kasuga-taisha",
  "himeji-castle": "Himeji Castle",
  "hiroshima-dome": "Hiroshima Peace Memorial",
  itsukushima: "Itsukushima Shrine",
  "yakushi-ji": "Yakushi-ji",
  // Shikoku
  "matsuyama-castle": ["Matsuyama Castle", "fr:Château de Matsuyama", "Matsuyama, Ehime"],
  "shikoku-pilgrimage": "Shikoku Pilgrimage",
  "seto-inland-sea": "Seto Inland Sea",
  ritsurin: "Ritsurin Garden",
  kotohira: "Kotohira Shrine",
  "awa-odori": "Awa Dance Festival",
  naruto: "Naruto whirlpools",
  "onaruto-bridge": "Ōnaruto Bridge",
  tokushima: ["Mount Bizan", "Tokushima Prefecture"],
  "dogo-onsen": "Dōgo Onsen",
  // Centre de Honshu
  nagamachi: ["Nagamachi, Kanazawa", "fr:Nagamachi", "Kanazawa"],
  kenrokuen: "Kenroku-en",
  oyama: ["Oyama Shrine (Kanazawa)", "fr:Sanctuaire Oyama"],
  takayama: "Takayama, Gifu",
  "mont-fuji": "Mount Fuji",
  kawaguchiko: "Lake Kawaguchi",
  "kanazawa-castle": "Kanazawa Castle",
  // Okinawa
  "shuri-castle": "Shuri Castle",
  shureimon: "Shureimon",
  churaumi: ["Churaumi Aquarium", "fr:Aquarium Churaumi", "Okinawa Churaumi Aquarium"],
  naha: ["Kokusai-dōri", "Naha"],
  zamami: "Zamami, Okinawa",
  // Nord de Honshu
  sendai: ["Sendai Castle", "Sendai"],
  zuihoden: ["Zuihō-den", "fr:Zuihō-den"],
  matsushima: ["Matsushima, Miyagi", "Matsushima Bay"],
  "chuson-ji": "Chūson-ji",
  "hirosaki-castle": "Hirosaki Castle",
  // Hokkaido
  sapporo: ["Sapporo Clock Tower", "Odori Park"],
  hakodate: ["Hakodate", "Goryōkaku"],
  shiretoko: "Shiretoko National Park",
  furano: ["Furano", "fr:Furano", "Farm Tomita"],
  "sapporo-snow": "Sapporo Snow Festival",
  "hakodate-mountain": "Mount Hakodate",
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function getJson(url, tries = 4) {
  for (let i = 0; i < tries; i++) {
    const res = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" } });
    if (res.status === 429 || res.status >= 500) {
      await sleep(1500 * (i + 1));
      continue;
    }
    if (!res.ok) return null;
    return res.json();
  }
  return null;
}
const strip = (html = "") =>
  html
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

fs.mkdirSync(OUT_DIR, { recursive: true });
const photos = {};
const failed = [];

const REJECT = /montage|logo|\bmap\b|karte|plattegrond|diagram|flag|locator|\.svg$/i;

async function tryTitle(spec) {
  const [lang, title] = /^[a-z]{2}:/.test(spec) ? [spec.slice(0, 2), spec.slice(3)] : ["en", spec];
  const sum = await getJson(`https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title.replace(/ /g, "_"))}`);
  const orig = sum?.originalimage?.source ?? sum?.thumbnail?.source;
  const m = orig && /\/wikipedia\/commons\/(?:thumb\/)?[0-9a-f]\/[0-9a-f]{2}\/([^/?]+)/.exec(orig);
  if (!m) throw new Error("pas d'image libre en tête d'article");
  const file = decodeURIComponent(m[1]);
  if (!/\.(jpe?g|png)$/i.test(file) || REJECT.test(file)) throw new Error(`image écartée : ${file}`);
  return { file, title: spec };
}

for (const [key, spec] of Object.entries(MANIFEST)) {
  const candidates = Array.isArray(spec) ? spec : [spec];
  let done = false;
  const errors = [];
  for (const cand of candidates) {
    try {
      const { file, title } = await tryTitle(cand);
      const ext = /\.png$/i.test(file) ? "png" : "jpg";
      const dest = path.join(OUT_DIR, `${key}.${ext}`);
      const info = await getJson(
        `https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=url|size|extmetadata&iiurlwidth=800&titles=${encodeURIComponent("File:" + file)}`,
      );
      const page = info && Object.values(info.query.pages)[0];
      const ii = page?.imageinfo?.[0];
      if (!ii?.thumburl) throw new Error("pas de métadonnées Commons");
      const md = ii.extmetadata ?? {};
      const license = strip(md.LicenseShortName?.value) || "Licence libre";
      if (/fair use|non-free/i.test(license)) throw new Error("licence non libre");
      const img = await fetch(ii.thumburl, { headers: { "User-Agent": UA } });
      if (!img.ok) throw new Error(`téléchargement ${img.status}`);
      fs.writeFileSync(dest, Buffer.from(await img.arrayBuffer()));
      photos[key] = {
        src: `/photos/${key}.${ext}`,
        w: ii.thumbwidth,
        h: ii.thumbheight,
        article: title,
        file,
        author: strip(md.Artist?.value) || "Auteur inconnu",
        license,
        licenseUrl: md.LicenseUrl?.value ?? "",
        page: ii.descriptionurl,
      };
      console.log("ok  ", key.padEnd(22), license.padEnd(16), file.slice(0, 60));
      done = true;
      break;
    } catch (e) {
      errors.push(`${cand}: ${e.message}`);
    }
    await sleep(200);
  }
  if (!done) {
    failed.push(key);
    console.log("FAIL", key.padEnd(22), errors.join(" | ").slice(0, 200));
  }
  await sleep(250);
}

const ts = `// FICHIER GÉNÉRÉ par scripts/fetch-wiki-photos.mjs — ne pas modifier à la main.
// Photographies : Wikimedia Commons (licences libres). Voir /credits.
export interface WikiPhoto {
  src: string;
  w: number;
  h: number;
  article: string;
  file: string;
  author: string;
  license: string;
  licenseUrl: string;
  page: string;
}

export const PHOTOS: Record<string, WikiPhoto> = ${JSON.stringify(photos, null, 2)};
`;
fs.writeFileSync(OUT_TS, ts);
console.log(`\n${Object.keys(photos).length} photos, ${failed.length} échecs :`, failed.join(", "));
