import { IMG, MODEL_HERO_VEIL, MODEL_IMAGES } from "@/lib/assets";
import { getDemo } from "@/lib/demos";


export type SectionKey =
  | "hero"
  | "countdown"
  | "couple"
  | "parents"
  | "civil"
  | "religious"
  | "party"
  | "schedule"
  | "menu"
  | "details"
  | "story"
  | "gallery"
  | "thanks"
  | "rsvp";

/** `bgImage` (optional) is this section's own background picture; unset = the design's background colour. */
export type Section = { key: SectionKey; label: string; enabled: boolean; bgImage?: string };

/** Midnight Garden: the evening timeline with illustrations, the dinner menu and a star field. */
export const MIDNIGHT_SLUG = "midnight-garden";
/** Burgundy Seal: wax-seal envelope, framed cover photo, hairline timeline, dress code & hotel details. */
export const BURGUNDY_SLUG = "burgundy-seal";

/** Which sections each of the newer models has, in order. Every other model uses DEFAULT_SECTIONS. */
const MODEL_SECTIONS: Record<string, SectionKey[]> = {
  [MIDNIGHT_SLUG]: ["hero", "countdown", "couple", "parents", "civil", "religious", "party", "schedule", "menu", "story", "gallery", "thanks", "rsvp"],
  [BURGUNDY_SLUG]: ["hero", "countdown", "parents", "schedule", "details", "story", "thanks", "rsvp"],
};
const EXTRA_SECTIONS: SectionKey[] = ["schedule", "menu", "details"];

const ALL_SECTIONS: Section[] = [
  { key: "hero", label: "Prima pagină", enabled: true },
  { key: "countdown", label: "Numărătoare inversă", enabled: true },
  { key: "couple", label: "Despre sărbătoriți", enabled: true },
  { key: "parents", label: "Părinții și nașii", enabled: true },
  { key: "civil", label: "Cununia civilă", enabled: false },
  { key: "religious", label: "Cununia religioasă", enabled: true },
  { key: "party", label: "Petrecerea", enabled: true },
  { key: "schedule", label: "Programul serii", enabled: true },
  { key: "menu", label: "Meniul", enabled: true },
  { key: "details", label: "Detalii eveniment", enabled: true },
  { key: "story", label: "Povestea voastră", enabled: true },
  { key: "gallery", label: "Galerie foto", enabled: true },
  { key: "thanks", label: "Mulțumire", enabled: true },
  { key: "rsvp", label: "Confirmare RSVP", enabled: true },
];

export const DEFAULT_SECTIONS: Section[] = ALL_SECTIONS.filter((s) => !EXTRA_SECTIONS.includes(s.key));

function sectionsFor(modelSlug: string | undefined): Section[] {
  const keys = modelSlug ? MODEL_SECTIONS[modelSlug] : undefined;
  return keys ? keys.map((k) => ALL_SECTIONS.find((s) => s.key === k)!) : DEFAULT_SECTIONS;
}

export type IconKey = "pavilion" | "cocktail" | "cloche" | "disco" | "toast" | "clock" | "ring" | "cake";
export const ICON_OPTIONS: Array<{ id: IconKey; label: string }> = [
  { id: "pavilion", label: "Ceremonie" },
  { id: "ring", label: "Verighete" },
  { id: "cocktail", label: "Cocktail" },
  { id: "cloche", label: "Cină" },
  { id: "disco", label: "Dans" },
  { id: "cake", label: "Tort" },
  { id: "toast", label: "Toast" },
  { id: "clock", label: "Ceas" },
];

/** One stop on the evening timeline. */
export type ScheduleItem = { time: string; title: string; desc: string; icon: IconKey };
/** One course of the dinner menu ("Aperitiv", "Fel principal"...). `note` is the small italic line. */
export type MenuCourse = { label: string; text: string; note: string };

export type InvitationContent = {
  // hero
  heroImage: string;
  heroOverlay: number;
  heroIntro: string;
  heroSmall: string;
  brideFirst: string;
  brideLast: string;
  groomFirst: string;
  groomLast: string;
  headerFont: string;
  headerReplacement: string;
  // countdown
  date: string;
  time: string;
  dateLabel: string;
  // parents
  parentsLabel: string;
  parentsNames: string;
  godparentsLabel: string;
  godparentsNames: string;
  // civil
  civilVenue: string;
  civilAddress: string;
  civilCity: string;
  civilDate: string;
  // religious
  religiousVenue: string;
  religiousAddress: string;
  religiousCity: string;
  religiousDate: string;
  // party
  partyVenue: string;
  partyAddress: string;
  partyCity: string;
  partyDate: string;
  // evening timeline
  scheduleTitle: string;
  scheduleNote: string;
  schedule: ScheduleItem[];
  // dinner menu
  menuTitle: string;
  menuSubtitle: string;
  menuCourses: MenuCourse[];
  // details (Burgundy Seal): dress code palette, hotel, thank-you photo, envelope intro
  dressColors: string[];
  dressNote: string;
  hotelName: string;
  hotelPhone: string;
  thanksImage: string;
  envelope: boolean;
  // story / description
  storyTitle: string;
  storyText: string;
  youtubeId: string;
  // thanks
  thanksTitle: string;
  thanksText: string;
  // rsvp
  rsvpDeadline: string;
  askMenu: boolean;
  askPeople: boolean;
  // sections
  sections: Section[];
};

export const DEFAULT_CONTENT: InvitationContent = {
  heroImage: IMG.hero,
  heroOverlay: 40,
  heroIntro: "Vă invităm la nunta noastră",
  heroSmall: "♡",
  brideFirst: "Ioana",
  brideLast: "",
  groomFirst: "Andrei",
  groomLast: "",
  headerFont: "cormorant",
  headerReplacement: "Ioana & Andrei",
  date: "2026-06-14",
  time: "17:00",
  dateLabel: "14 Iunie 2026",
  parentsLabel: "Părinții noștri",
  parentsNames: "Maria și Cristi Popescu\nIoana și Mihai Ionescu",
  godparentsLabel: "Împreună cu nașii",
  godparentsNames: "Andreea și Vlad Marin",
  civilVenue: "",
  civilAddress: "",
  civilCity: "",
  civilDate: "",
  religiousVenue: "Biserica Sfinții Apostoli Petru și Pavel",
  religiousAddress: "Strada Ion Iuga, 65",
  religiousCity: "Săliștea de Sus",
  religiousDate: "2026-05-09 17:00",
  partyVenue: "Domeniul Manasia",
  partyAddress: "Aleea Eroilor",
  partyCity: "Vișeu de Sus",
  partyDate: "2026-05-09 18:30",
  scheduleTitle: "Seara",
  scheduleNote: "Drumul de la biserică până la locația petrecerii durează zece minute, iar vremea poate fi răcoroasă.",
  schedule: [
    { time: "17:00", title: "Ceremonia", desc: "La biserică · intrarea se face cu 15 minute mai devreme", icon: "pavilion" },
    { time: "19:00", title: "Vin fiert și cocktailuri", desc: "În foaier, sub candelabre", icon: "cocktail" },
    { time: "19:30", title: "Cina la lumina lumânărilor", desc: "În salonul principal", icon: "cloche" },
    { time: "21:30", title: "Primul dans", desc: "Urmat de dansul nașilor și al părinților", icon: "disco" },
    { time: "00:00", title: "Tortul mirilor", desc: "Un pahar de șampanie pentru toți invitații", icon: "toast" },
    { time: "02:00", title: "Ultimul dans", desc: "Ne vedem pe ringul de dans până la ultima melodie", icon: "clock" },
  ],
  menuTitle: "Cina",
  menuSubtitle: "Domeniul Manasia · 19:30",
  menuCourses: [
    { label: "Pentru început", text: "Scoici sote, sos de unt cu șampanie", note: "" },
    { label: "Apoi", text: "Mușchi de vită, trufe negre, cartofi sufflé", note: "sau risotto cu ciuperci pentru vegetarieni" },
    { label: "Pentru final", text: "Croquembouche cu castane glasate", note: "" },
    { label: "Toată noaptea", text: "Șampanie și vinuri selecționate", note: "" },
  ],
  dressColors: ["#4a1c26", "#14573a", "#1c1c1c", "#808080", "#fffdf0"],
  dressNote: "",
  hotelName: "Hotel Central",
  hotelPhone: "+40 722 000 000",
  thanksImage: IMG.heroCouple,
  envelope: true,
  storyTitle: "Cum totul a început",
  storyText: "Ne-am cunoscut într-o seară de toamnă, în Cișmigiu...",
  youtubeId: "",
  thanksTitle: "Cu drag",
  thanksText: "Vă mulțumim că ne sunteți alături.",
  rsvpDeadline: "2026-05-01",
  askMenu: true,
  askPeople: true,
  sections: DEFAULT_SECTIONS,
};

/** Stored content may be partial (older invitations); always read it through this. */
export function withDefaults(
  content: Partial<InvitationContent> | null | undefined,
  modelSlug?: string,
): InvitationContent {
  const base = sectionsFor(modelSlug);
  const merged = { ...DEFAULT_CONTENT, ...(content ?? {}) };
  // Keep the saved order/toggles, drop sections this model doesn't have, and slot in any it is missing.
  const sections = (merged.sections ?? base).filter((s) => base.some((b) => b.key === s.key));
  base.forEach((d, i) => {
    if (sections.some((s) => s.key === d.key)) return;
    const prev = base.slice(0, i).reverse().find((p) => sections.some((s) => s.key === p.key));
    const at = prev ? sections.findIndex((s) => s.key === prev.key) + 1 : sections.length;
    sections.splice(at, 0, d);
  });
  return { ...merged, sections };
}

/** Content a brand-new invitation starts from for the given model. */
export function startingContent(modelSlug: string | undefined): InvitationContent {
  if (modelSlug === MIDNIGHT_SLUG) {
    // A moody night photo behind the cover; a veil keeps the names readable.
    return { ...DEFAULT_CONTENT, heroImage: IMG.heroHands, heroOverlay: 45 };
  }
  if (modelSlug === BURGUNDY_SLUG) {
    return {
      ...DEFAULT_CONTENT,
      heroImage: IMG.heroCouple,
      heroOverlay: 0,
      scheduleTitle: "Program",
      scheduleNote: "",
      schedule: [
        { time: "17:00", title: "Ceremonia", desc: "", icon: "clock" },
        { time: "18:30", title: "Cocktail", desc: "", icon: "clock" },
        { time: "19:30", title: "Cina și toasturi", desc: "", icon: "clock" },
        { time: "21:30", title: "Să petrecem!", desc: "", icon: "clock" },
        { time: "00:00", title: "Artificii și rămas bun", desc: "", icon: "clock" },
      ],
    };
  }
  // The classic designs start on their own cover photo (the picture on their card), with the same veil
  // their demo uses, so "Alege invitația" gives the couple the invitation they just looked at.
  const cover = modelSlug ? MODEL_IMAGES[modelSlug] : undefined;
  if (modelSlug && cover) {
    return { ...DEFAULT_CONTENT, heroImage: cover, heroOverlay: Math.round((MODEL_HERO_VEIL[modelSlug] ?? 0.4) * 100) };
  }
  return DEFAULT_CONTENT;
}

/**
 * True when a hero image is empty or one of the pictures the designs themselves start with, i.e. the
 * couple has not uploaded or picked their own. Only then does switching design swap the picture too.
 */
export function isStockHeroImage(src: string | undefined): boolean {
  if (!src) return true;
  return src === IMG.hero || src === IMG.heroCouple || src === IMG.heroHands || Object.values(MODEL_IMAGES).includes(src);
}

/** The demo invitation shown in the collection for each of the newer models. */
function demoContent(slug: string): InvitationContent {
  const couple = getDemo(slug); // each demo has its own couple (see demos.ts)
  return withDefaults(
    {
      ...startingContent(slug),
      brideFirst: couple.bride,
      groomFirst: couple.groom,
      headerReplacement: `${couple.bride} & ${couple.groom}`,
    },
    slug,
  );
}
export const DESIGN_DEMOS: Record<string, InvitationContent> = {
  [MIDNIGHT_SLUG]: demoContent(MIDNIGHT_SLUG),
  [BURGUNDY_SLUG]: demoContent(BURGUNDY_SLUG),
};
/** @deprecated use DESIGN_DEMOS[MIDNIGHT_SLUG] */
export const MIDNIGHT_DEMO = DESIGN_DEMOS[MIDNIGHT_SLUG];
