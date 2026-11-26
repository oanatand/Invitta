import type { IconKey } from "@/lib/invitation-content";

/* Line-art illustrations, drawn in `currentColor` so the surrounding text colour controls them. */

const STROKE = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export function Illustration({ icon, className }: { icon: IconKey; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" {...STROKE}>
      {ART[icon] ?? ART.clock}
    </svg>
  );
}

const ART: Record<IconKey, React.ReactNode> = {
  pavilion: (
    <>
      <path d="M14 88h72M20 88V52M80 88V52M20 52h60" />
      <path d="M22 52Q50 6 78 52" />
      <path d="M50 14v-6M47 8h6" />
      <path d="M34 88V60q0-8 8-8h16q8 0 8 8v28" />
      <path d="M50 52v36M42 70h16" />
      <path d="M8 88v-14M92 88V74" />
      <circle cx="8" cy="68" r="5" />
      <circle cx="92" cy="68" r="5" />
    </>
  ),
  cocktail: (
    <>
      <path d="M22 30h56L50 60z" fill="currentColor" fillOpacity=".08" />
      <path d="M50 60v26M34 88h32" />
      <path d="M30 36h40" opacity=".5" />
      <path d="M62 34l18-22" />
      <path d="M72 20l8 2M68 26l9 0" opacity=".7" />
      <circle cx="40" cy="42" r="2.4" />
    </>
  ),
  cloche: (
    <>
      <path d="M16 70a34 32 0 0 1 68 0z" fill="currentColor" fillOpacity=".08" />
      <path d="M8 74h84M10 80h80" />
      <path d="M50 38v-6M45 32h10" />
      <path d="M26 60q6-14 22-18" opacity=".6" />
      <path d="M14 52V30M14 30c-3 4-3 8 0 10 3-2 3-6 0-10z" />
    </>
  ),
  disco: (
    <>
      <path d="M50 4v14" />
      <circle cx="50" cy="48" r="30" fill="currentColor" fillOpacity=".08" />
      <path d="M20 48h60M50 18v60M28 28q22 10 44 0M28 68q22-10 44 0M36 22q-12 26 0 52M64 22q12 26 0 52" opacity=".75" />
      <path d="M86 14l2 6 6 2-6 2-2 6-2-6-6-2 6-2zM12 80l1.5 4 4 1.5-4 1.5L12 91l-1.5-4-4-1.5 4-1.5z" />
    </>
  ),
  toast: (
    <>
      <path d="M18 38l20 6-6 22q-3 8-10 6t-6-10z" fill="currentColor" fillOpacity=".08" />
      <path d="M80 38l-20 6 6 22q3 8 10 6t6-10z" fill="currentColor" fillOpacity=".08" />
      <path d="M26 72l-4 16M18 90h14M72 72l4 16M68 90h14" />
      <path d="M50 8a14 14 0 1 0 12 20 11 11 0 1 1-12-20z" />
      <path d="M46 46l2 4 4 2-4 2-2 4-2-4-4-2 4-2z" opacity=".7" />
    </>
  ),
  clock: (
    <>
      <circle cx="50" cy="56" r="30" fill="currentColor" fillOpacity=".06" />
      <circle cx="50" cy="56" r="25" opacity=".6" />
      <path d="M50 31v5M50 76v5M25 56h5M70 56h5M32 38l3 3M68 38l-3 3M32 74l3-3M68 74l-3-3" />
      <path d="M50 56V40M50 56l12 8" />
      <circle cx="50" cy="56" r="1.8" fill="currentColor" />
      <path d="M44 26h12v-6H44zM50 20v-8" />
      <circle cx="50" cy="8" r="5" />
    </>
  ),
  ring: (
    <>
      <circle cx="38" cy="58" r="22" />
      <circle cx="62" cy="58" r="22" />
      <circle cx="38" cy="58" r="17" opacity=".5" />
      <circle cx="62" cy="58" r="17" opacity=".5" />
      <path d="M44 14l6 8 6-8-3-6h-6z" />
    </>
  ),
  cake: (
    <>
      <path d="M26 86V64h48v22zM34 64V46h32v18zM42 46V30h16v16z" fill="currentColor" fillOpacity=".07" />
      <path d="M18 86h64" />
      <path d="M26 74q6 6 12 0t12 0 12 0 12 0" opacity=".7" />
      <path d="M50 30V20M50 20c-3-3-3-6 0-9 3 3 3 6 0 9z" />
    </>
  ),
};

/* Deterministic star field so server and client render the same dots. */
function starfield(seed: string, count: number) {
  let h = 2166136261;
  for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  const rnd = () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
  return Array.from({ length: count }, () => ({
    x: rnd() * 100,
    y: rnd() * 100,
    s: 1 + Math.round(rnd() * 2),
    o: 0.25 + rnd() * 0.5,
    pulse: rnd() > 0.7,
  }));
}

export function Stars({ seed, count = 26 }: { seed: string; count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {starfield(seed, count).map((p, i) => (
        <span
          key={i}
          className={`absolute rounded-full bg-white ${p.pulse ? "animate-pulse" : ""}`}
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s, opacity: p.o }}
        />
      ))}
    </div>
  );
}

/* ---- Ornate frame for the menu: a stretchy border + fixed-size bow and corner sprigs ---- */

function Sprig({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden="true" {...STROKE}>
      <path d="M6 54C6 28 28 6 54 6" />
      <path d="M12 46c-6-2-8-8-6-12 5 0 8 4 6 12zM22 30c-6 0-10-5-9-10 6 0 10 4 9 10zM38 16c-4-4-3-10 1-12 3 5 2 9-1 12z" fill="currentColor" fillOpacity=".12" />
      <circle cx="16" cy="16" r="6" fill="currentColor" fillOpacity=".1" />
      <circle cx="16" cy="16" r="2.4" />
    </svg>
  );
}

function Bow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 60" className={className} aria-hidden="true" {...STROKE}>
      <path d="M60 30C48 10 18 4 10 16c-6 10 8 22 50 14zM60 30c12-20 42-26 50-14 6 10-8 22-50 14z" fill="currentColor" fillOpacity=".1" />
      <path d="M60 30c-10 8-22 20-24 28M60 30c10 8 22 20 24 28" />
      <rect x="52" y="22" width="16" height="16" rx="6" fill="currentColor" fillOpacity=".18" />
    </svg>
  );
}

export function MenuFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-md px-10 pb-14 pt-24 sm:px-14">
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
        <rect x="14" y="40" rx="18" style={{ width: "calc(100% - 28px)", height: "calc(100% - 54px)" }} fill="rgba(255,255,255,0.03)" stroke="currentColor" strokeWidth="1.5" />
        <rect x="24" y="50" rx="12" style={{ width: "calc(100% - 48px)", height: "calc(100% - 74px)" }} fill="none" stroke="currentColor" strokeOpacity=".45" strokeWidth="1" />
      </svg>
      <Bow className="absolute left-1/2 top-3 w-28 -translate-x-1/2 text-[#e8e2cf]" />
      <Sprig className="absolute left-2 top-9 w-14 text-[#e8e2cf]" />
      <Sprig className="absolute right-2 top-9 w-14 -scale-x-100 text-[#e8e2cf]" />
      <Sprig className="absolute bottom-2 left-2 w-14 -scale-y-100 text-[#e8e2cf]" />
      <Sprig className="absolute bottom-2 right-2 w-14 -scale-100 text-[#e8e2cf]" />
      <div className="relative">{children}</div>
    </div>
  );
}
