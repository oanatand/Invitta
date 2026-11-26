import { MODEL_IMAGES } from "@/lib/assets";
import { DEMOS } from "@/lib/demos";

/** How the collection can be browsed: a design belongs to one or more of these moods. */
export type Mood = "luminos" | "intunecat" | "romantic";
export const FILTERS: Array<{ id: "toate" | Mood; label: string }> = [
  { id: "toate", label: "Toate" },
  { id: "luminos", label: "Luminoase" },
  { id: "intunecat", label: "Întunecate" },
  { id: "romantic", label: "Romantice" },
];

/** What each design adds beyond the shared structure, and which moods it belongs to. */
type Extras = { moods: Mood[]; includes: string; featured?: boolean };
const EXTRAS: Record<string, Extras> = {
  "minimal-ivory": { moods: ["luminos"], includes: "Program, hartă, RSVP", featured: true },
  "italian-romance": { moods: ["luminos", "romantic"], includes: "Program, hartă, RSVP", featured: true },
  "black-tie": { moods: ["intunecat"], includes: "Program, hartă, RSVP", featured: true },
  "floral-beige": { moods: ["luminos", "romantic"], includes: "Program, hartă, RSVP", featured: true },
  "midnight-garden": { moods: ["intunecat", "romantic"], includes: "Program ilustrat, meniu", featured: true },
  "burgundy-seal": { moods: ["intunecat", "romantic"], includes: "Plic cu sigiliu, dress code", featured: true },
};

/** How many designs the landing page shows; the rest are one click away on /modele. */
export const FEATURED_MAX = 6;

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

export type CollectionModel = {
  slug: string;
  name: string;
  mood: string;
  bride: string;
  groom: string;
  /** Wedding date as printed on the card, e.g. "14 · 06 · 2026". */
  date: string;
  numeral: string;
  image: string;
  moods: Mood[];
  includes: string;
  /** Recommended: shown on the landing page. */
  featured: boolean;
};

/** Every design shown on the landing page and on /modele, in one place. */
export const COLLECTION: CollectionModel[] = DEMOS.map((d, i) => ({
  slug: d.slug,
  name: d.model,
  mood: d.mood,
  bride: d.bride,
  groom: d.groom,
  date: d.dateLabel,
  numeral: ROMAN[i] ?? String(i + 1),
  image: MODEL_IMAGES[d.slug],
  ...(EXTRAS[d.slug] ?? { moods: [], includes: "" }),
  featured: EXTRAS[d.slug]?.featured ?? false,
}));

/** The recommended designs for the landing page (flagged `featured`, capped at FEATURED_MAX). */
export const FEATURED = COLLECTION.filter((m) => m.featured).slice(0, FEATURED_MAX);
