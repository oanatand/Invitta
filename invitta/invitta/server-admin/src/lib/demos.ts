// Demo invitation content for each design in the collection.
// Every model has its own public demo so visitors can browse without an account.
// Every demo has its own couple, so the collection cards and demo pages do not all read "Ioana & Andrei".

export type DemoEvent = { t: string; n: string; d: string };

export type Demo = {
  slug: string;
  model: string;
  mood: string;
  dark: boolean;
  accentText: string;
  accentBg: string;
  accentBorder: string;
  bride: string;
  groom: string;
  monogram: string;
  dateISO: string;
  dateLabel: string;
  dateTitle: string;
  venue: string;
  venueArea: string;
  mapBbox: string;
  rsvpUntil: string;
  storyTitle: string;
  story: string;
  program: DemoEvent[];
};

export const DEMOS: Demo[] = [
  {
    slug: "minimal-ivory",
    model: "Minimal Ivory",
    mood: "Pur · Atemporal",
    dark: false,
    accentText: "text-champagne",
    accentBg: "bg-champagne",
    accentBorder: "border-champagne",
    bride: "Elena",
    groom: "Matei",
    monogram: "E&M",
    dateISO: "2026-06-14T17:00:00",
    dateLabel: "14 · 06 · 2026",
    dateTitle: "14 Iunie 2026",
    venue: "Domeniul Manasia",
    venueArea: "Sat Manasia, jud. Ialomița",
    mapBbox: "26.6%2C44.6%2C26.8%2C44.7",
    rsvpUntil: "1 Mai 2026",
    storyTitle: "Cum totul a început",
    story:
      "Ne-am cunoscut într-o seară de toamnă, în Cișmigiu. Au trecut șapte ani, două case și nenumărate amintiri. Astăzi vă invităm să ne fiți alături în cea mai frumoasă zi a vieții noastre.",
    program: [
      { t: "15:00", n: "Cununia religioasă", d: "Biserica Sfântul Anton" },
      { t: "17:00", n: "Cocktail de bun venit", d: "Domeniul Manasia · Terasă" },
      { t: "19:00", n: "Cina festivă", d: "Salonul Principal" },
      { t: "22:00", n: "Dansul mirilor", d: "Și petrecere până dimineața" },
    ],
  },
  {
    slug: "italian-romance",
    model: "Italian Romance",
    mood: "Cald · Toscan",
    dark: false,
    accentText: "text-taupe",
    accentBg: "bg-taupe",
    accentBorder: "border-taupe",
    bride: "Livia",
    groom: "Matteo",
    monogram: "L&M",
    dateISO: "2026-09-05T16:00:00",
    dateLabel: "05 · 09 · 2026",
    dateTitle: "5 Septembrie 2026",
    venue: "Villa Aurora",
    venueArea: "Sinaia, jud. Prahova",
    mapBbox: "25.53%2C45.32%2C25.56%2C45.35",
    rsvpUntil: "1 Iulie 2026",
    storyTitle: "O vară în Positano",
    story:
      "Ne-am promis unul altuia pe o terraceță deasupra mării, între lămâi și apus. Ne place să ne spuneți povestea noastră exact așa cum este: caldă, lentă și plină de soare.",
    program: [
      { t: "16:00", n: "Cununia civilă", d: "Grădina Villei Aurora" },
      { t: "17:30", n: "Aperitiv în livadă", d: "Sub măslii și lumânări" },
      { t: "19:30", n: "Cina italiană", d: "Terasa cu pergole" },
      { t: "23:00", n: "Petrecere până dimineața", d: "Și prima dansare a mirilor" },
    ],
  },
  {
    slug: "black-tie",
    model: "Black Tie",
    mood: "Sofisticat · Nocturn",
    dark: true,
    accentText: "text-champagne",
    accentBg: "bg-champagne",
    accentBorder: "border-champagne",
    bride: "Cristina",
    groom: "Alexandru",
    monogram: "C&A",
    dateISO: "2026-12-31T19:00:00",
    dateLabel: "31 · 12 · 2026",
    dateTitle: "31 Decembrie 2026",
    venue: "Palatul Belmonte",
    venueArea: "București",
    mapBbox: "26.08%2C44.42%2C26.12%2C44.45",
    rsvpUntil: "1 Noiembrie 2026",
    storyTitle: "O seară de iarnă",
    story:
      "Alexandru a întrebat-o pe Cristina să se mărite cu el într-o seară de Crăciun, într-un hol plin de lumini. Ne place să ne spunem povestea în ton cu ziua: elegantă, nocturnă și puțin cinematografică.",
    program: [
      { t: "19:00", n: "Cocktail de bun venit", d: "Salonul de Oglinzi" },
      { t: "20:30", n: "Cina de gală", d: "Sala Balurilor" },
      { t: "22:00", n: "Primul dans", d: "În sunete de viori" },
      { t: "00:00", n: "Numărătoare inversă", d: "Și petrecere până dimineața" },
    ],
  },
  {
    slug: "floral-beige",
    model: "Floral Beige",
    mood: "Romantic · Delicat",
    dark: false,
    accentText: "text-stone",
    accentBg: "bg-stone",
    accentBorder: "border-stone",
    bride: "Daria",
    groom: "Tudor",
    monogram: "D&T",
    dateISO: "2026-06-20T15:30:00",
    dateLabel: "20 · 06 · 2026",
    dateTitle: "20 Iunie 2026",
    venue: "Grădina Maria",
    venueArea: "Brașov, jud. Brașov",
    mapBbox: "25.58%2C45.64%2C25.62%2C45.67",
    rsvpUntil: "1 Mai 2026",
    storyTitle: "O dimineață de primăvară",
    story:
      "Ne-am cunoscut la o târg de flori, într-o dimineață de primăvară, amândoi căutând aceeași lalea. Ne place să ne spunem povestea simplu, cu flori, cafea și multă răbdare.",
    program: [
      { t: "15:30", n: "Cununia civilă", d: "Grădina cu trandafiri" },
      { t: "17:00", n: "Ceai și prăjituri", d: "În sere, sub lumânări" },
      { t: "19:00", n: "Cina festivă", d: "Șura de lemn" },
      { t: "21:30", n: "Dans sub lumânări", d: "Și petrecere până dimineața" },
    ],
  },
  {
    // Rendered by InvitationRenderer (timeline + menu), see app/invitatie/[slug]/page.tsx.
    slug: "midnight-garden",
    model: "Midnight Garden",
    mood: "Nocturn · Botanic",
    dark: true,
    accentText: "text-champagne",
    accentBg: "bg-champagne",
    accentBorder: "border-champagne",
    bride: "Ilinca",
    groom: "Vlad",
    monogram: "I&V",
    dateISO: "2026-06-14T17:00:00",
    dateLabel: "14 · 06 · 2026",
    dateTitle: "14 Iunie 2026",
    venue: "Domeniul Manasia",
    venueArea: "Sat Manasia, jud. Ialomița",
    mapBbox: "26.6%2C44.6%2C26.8%2C44.7",
    rsvpUntil: "1 Mai 2026",
    storyTitle: "Cum totul a început",
    story: "",
    program: [],
  },
  {
    // Rendered by InvitationRenderer (envelope gate, lace-framed cover), see app/invitatie/[slug]/page.tsx.
    slug: "burgundy-seal",
    model: "Burgundy Seal",
    mood: "Bordo · Clasic",
    dark: true,
    accentText: "text-champagne",
    accentBg: "bg-champagne",
    accentBorder: "border-champagne",
    bride: "Antonia",
    groom: "Răzvan",
    monogram: "A&R",
    dateISO: "2026-06-14T17:00:00",
    dateLabel: "14 · 06 · 2026",
    dateTitle: "14 Iunie 2026",
    venue: "Domeniul Manasia",
    venueArea: "Sat Manasia, jud. Ialomița",
    mapBbox: "26.6%2C44.6%2C26.8%2C44.7",
    rsvpUntil: "1 Mai 2026",
    storyTitle: "Cum totul a început",
    story: "",
    program: [],
  },
];

// The invitation the couple actually uses in the demo dashboard.
const ALIASES: Record<string, string> = { "ioana-andrei": "minimal-ivory" };

export function getDemo(slug: string | undefined): Demo {
  const key = slug ? (ALIASES[slug] ?? slug) : "";
  return DEMOS.find((d) => d.slug === key) ?? DEMOS[0];
}

/** True for the built-in demo invitations (and the legacy "ioana-andrei" alias). */
export function isDemoSlug(slug: string): boolean {
  const key = ALIASES[slug] ?? slug;
  return DEMOS.some((d) => d.slug === key);
}
