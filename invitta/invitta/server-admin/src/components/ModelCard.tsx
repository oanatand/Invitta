import Link from "next/link";
import { ChooseModelButton } from "@/components/ChooseModelButton";
import { MODEL_CARD_TEXT, MODEL_IMAGE_POSITION } from "@/lib/assets";
import type { CollectionModel } from "@/lib/collection";

const SCRIPT = '"Italianno", "Great Vibes", cursive';
const CORMORANT = '"Cormorant Garamond", Georgia, serif';
const PLAYFAIR = '"Playfair Display", "Bodoni Moda", serif';

type Lockup = "script" | "caps" | "didone" | "sparkle" | "split";
/** Each design gets its own way of setting the couple's names, matched to its mood. */
const LOCKUP: Record<string, Lockup> = {
  "minimal-ivory": "caps",
  "italian-romance": "script",
  "black-tie": "didone",
  "floral-beige": "split",
  "midnight-garden": "sparkle",
  "burgundy-seal": "didone",
};

/**
 * Two designs set their names in the colours of their own invitation instead of plain white/black:
 * - Minimal Ivory (cream embossed flowers on the edges, calm empty middle): warm espresso names with
 *   champagne-gold details, placed in the middle of the card between the flowers.
 * - Floral Beige (cream envelope, sage wax seal in the middle): sage green taken from the seal,
 *   placed under the seal.
 */
const PALETTE: Record<string, { ink: string; accent: string; place: "middle" | "bottom" }> = {
  "minimal-ivory": { ink: "#4a3b2f", accent: "#b8975a", place: "middle" },
  "floral-beige": { ink: "#4f5d44", accent: "#8a9a78", place: "bottom" },
};

/** Detail colour: the model's accent when it has one, otherwise the text colour. */
const ACCENT = "var(--accent, currentColor)";
const Hair = ({ w = "w-8" }: { w?: string }) => (
  <i aria-hidden="true" className={`block h-px ${w}`} style={{ background: ACCENT, opacity: 0.8 }} />
);

/** The names printed on a card, as a small piece of typography rather than a caption. */
function NameLockup({ model: m }: { model: CollectionModel }) {
  const kind = LOCKUP[m.slug] ?? "script";
  const custom = PALETTE[m.slug];
  const tone = custom ? "" : (MODEL_CARD_TEXT[m.slug] ?? "");
  const eyebrow = "block text-[9px] uppercase tracking-[0.4em] opacity-80 sm:text-[10px]";
  // "split" frames the middle of the picture (the wax seal): bride above it, groom below it.
  const place =
    kind === "split"
      ? "inset-y-6 flex flex-col justify-between sm:inset-y-9"
      : custom?.place === "middle"
        ? "top-1/2 -translate-y-1/2"
        : "bottom-5 sm:bottom-7";
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-3 text-center ${place} ${tone}`}
      style={custom ? ({ color: custom.ink, ["--accent" as string]: custom.accent } as React.CSSProperties) : undefined}
    >
      {kind === "script" && (
        <>
          <span className={eyebrow}>Ne căsătorim</span>
          <span className="mt-1 block text-[2.6rem] leading-[0.9] sm:text-6xl" style={{ fontFamily: SCRIPT }}>{m.bride}</span>
          <span className="block text-2xl leading-none opacity-80 sm:text-4xl" style={{ fontFamily: SCRIPT, color: ACCENT }}>&amp;</span>
          <span className="block text-[2.6rem] leading-[0.9] sm:text-6xl" style={{ fontFamily: SCRIPT }}>{m.groom}</span>
          <span className={`${eyebrow} mt-3`}>{m.date}</span>
        </>
      )}
      {kind === "split" && (
        <>
          <div>
            <span className={eyebrow}>Ne căsătorim</span>
            <span className="mt-1 block text-[2.6rem] leading-[0.9] sm:text-6xl" style={{ fontFamily: SCRIPT }}>{m.bride}</span>
          </div>
          <div>
            <span className="flex items-center justify-center gap-3">
              <Hair w="w-6" />
              <span className="text-2xl leading-none sm:text-4xl" style={{ fontFamily: SCRIPT, color: ACCENT }}>&amp;</span>
              <Hair w="w-6" />
            </span>
            <span className="block text-[2.6rem] leading-[0.9] sm:text-6xl" style={{ fontFamily: SCRIPT }}>{m.groom}</span>
            <span className={`${eyebrow} mt-3`}>{m.date}</span>
          </div>
        </>
      )}
      {kind === "caps" && (
        <>
          <span className={eyebrow}>{m.date}</span>
          <span className="mt-3 block text-xl font-light uppercase tracking-[0.3em] sm:text-3xl" style={{ fontFamily: CORMORANT }}>{m.bride}</span>
          <span className="my-1.5 flex items-center justify-center gap-3">
            <Hair />
            <span className="text-lg italic sm:text-2xl" style={{ fontFamily: CORMORANT, color: ACCENT }}>&amp;</span>
            <Hair />
          </span>
          <span className="block text-xl font-light uppercase tracking-[0.3em] sm:text-3xl" style={{ fontFamily: CORMORANT }}>{m.groom}</span>
        </>
      )}
      {kind === "didone" && (
        <>
          <span className="block text-lg font-normal uppercase leading-tight tracking-[0.18em] sm:text-3xl" style={{ fontFamily: PLAYFAIR }}>{m.bride}</span>
          <span className="my-1 block text-base leading-none opacity-80 sm:text-xl" style={{ fontFamily: PLAYFAIR }}>&amp;</span>
          <span className="block text-lg font-normal uppercase leading-tight tracking-[0.18em] sm:text-3xl" style={{ fontFamily: PLAYFAIR }}>{m.groom}</span>
          <span className="mx-auto mt-3 block h-px w-10 bg-current opacity-50" />
          <span className={`${eyebrow} mt-3`}>{m.date}</span>
        </>
      )}
      {kind === "sparkle" && (
        <>
          <span className="block text-sm opacity-80 sm:text-base">✦ ✧ ✦</span>
          <span className="mt-2 block text-3xl italic leading-none sm:text-5xl" style={{ fontFamily: CORMORANT }}>
            {m.bride} <span className="opacity-70">&amp;</span> {m.groom}
          </span>
          <span className={`${eyebrow} mt-3`}>{m.date}</span>
        </>
      )}
    </div>
  );
}

/**
 * One design of the collection, drawn as the invitation itself (portrait, like a phone screen) with the
 * couple's names on it. The whole picture is the link to the demo.
 * Both next steps sit on every card: "Vezi demo" and "Alege invitația".
 * - `compact`: the landing page (picture, name, mood, the two buttons).
 * - default: /modele, which also says what the design includes.
 */
export function ModelCard({ model: m, compact = false }: { model: CollectionModel; compact?: boolean }) {
  return (
    <figure className="group min-w-0">
      <Link
        href={`/invitatie/${m.slug}`}
        aria-label={`Vezi demo-ul ${m.name}`}
        className="relative block aspect-[3/4] overflow-hidden rounded-[4px] bg-collection-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-collection-ink"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={m.image}
          alt={`Invitația ${m.name}`}
          loading="lazy"
          width={600}
          height={800}
          style={{ objectPosition: MODEL_IMAGE_POSITION[m.slug] }}
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04] group-focus-within:scale-[1.04] motion-reduce:transform-none motion-reduce:transition-none"
        />
        <NameLockup model={m} />
      </Link>

      <figcaption className="mt-4">
        <div className="flex items-baseline justify-between gap-3">
          <Link
            href={`/invitatie/${m.slug}`}
            className="font-serif text-xl leading-tight text-collection-ink decoration-1 underline-offset-8 hover:underline focus-visible:underline sm:text-2xl"
          >
            {m.name}
          </Link>
          <span aria-hidden="true" className="shrink-0 font-serif text-lg italic text-collection-copy">{m.numeral}</span>
        </div>
        <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-collection-copy">{m.mood}</p>

        {!compact && <p className="mt-3 text-xs text-collection-copy">{m.includes}</p>}

        {/* Every card carries both next steps: look at the demo, or pick this design. */}
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
          <Link
            href={`/invitatie/${m.slug}`}
            className="group/demo inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-collection-ink"
          >
            <span className="border-b border-collection-divider pb-1 transition-colors group-hover/demo:border-collection-ink">
              Vezi demo
            </span>
            <span aria-hidden="true" className="transition-transform duration-500 group-hover/demo:translate-x-1">→</span>
          </Link>
          <ChooseModelButton slug={m.slug} />
        </div>
      </figcaption>
    </figure>
  );
}
