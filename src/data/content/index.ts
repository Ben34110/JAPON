import type { RegionContent, RegionId } from "@/lib/types";
import { centreHonshu } from "./centre-honshu";
import { hokkaido } from "./hokkaido";
import { kyoto } from "./kyoto";
import { kyushu } from "./kyushu";
import { nordHonshu } from "./nord-honshu";
import { okinawa } from "./okinawa";
import { ouestHonshu } from "./ouest-honshu";
import { shikoku } from "./shikoku";
import { tokyo } from "./tokyo";

/** Jeu de données fictif en français, une entrée par chapitre du guide. */
export const CONTENT: Record<RegionId, RegionContent> = {
  tokyo,
  "centre-honshu": centreHonshu,
  kyoto,
  "ouest-honshu": ouestHonshu,
  shikoku,
  kyushu,
  okinawa,
  "nord-honshu": nordHonshu,
  hokkaido,
};
