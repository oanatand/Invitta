"use client";

import { useState, useEffect, type FormEvent } from "react";
import { BackLink } from "@/components/BackLink";
import { MODEL_HERO_VEIL, MODEL_IMAGES, MODEL_IMAGE_POSITION } from "@/lib/assets";
import { getDemo } from "@/lib/demos";

const SECTIONS = [
  { id: "povestea", label: "Povestea" },
  { id: "program", label: "Program" },
  { id: "locatia", label: "Locația" },
  { id: "confirmare", label: "Confirmare" },
];

function InvitationNav({ monogram, dark }: { monogram: string; dark: boolean }) {
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState("");
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const solidBar = dark
    ? "border-ivory/10 bg-noir/95 backdrop-blur-md"
    : "border-collection-divider bg-ivory/95 backdrop-blur-md";
  const inkIdle = dark ? "text-ivory/60 hover:text-ivory" : "text-stone hover:text-noir";
  const inkActive = dark ? "text-ivory" : "text-noir";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
        solid ? solidBar : "border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center gap-6 px-5 py-2.5 sm:px-6 sm:py-3">
        <BackLink
          fallback="/"
          className={`shrink-0 flex items-center gap-1.5 py-2 text-[10px] uppercase tracking-[0.22em] transition-colors sm:py-3 sm:text-[11px] sm:tracking-[0.28em] ${
            solid ? inkIdle : "text-ivory/70 hover:text-ivory"
          }`}
        >
          ← Înapoi
        </BackLink>
        <a
          href="#top"
          className={`hidden shrink-0 font-serif text-lg tracking-[0.25em] transition-colors sm:block ${
            solid ? (dark ? "text-ivory" : "text-noir") : "text-ivory"
          }`}
        >
          {monogram}
        </a>
        <nav
          aria-label="Cuprins invitație"
          className="flex flex-1 flex-wrap items-center justify-center gap-x-5 gap-y-1 sm:gap-x-7"
        >
          {SECTIONS.map((s) => {
            const isActive = active === s.id;
            const tone = solid
              ? isActive
                ? inkActive
                : inkIdle
              : isActive
                ? "text-ivory"
                : "text-ivory/70 hover:text-ivory";
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`shrink-0 whitespace-nowrap py-2 text-[10px] uppercase tracking-[0.22em] transition-colors sm:py-3 sm:text-[11px] sm:tracking-[0.28em] ${tone} ${
                  isActive ? "underline decoration-1 underline-offset-8" : ""
                }`}
              >
                {s.label}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now.getTime());
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { d, h, m, s };
}

export function DemoInvitation({ slug }: { slug: string }) {
  const demo = getDemo(slug);
  const target = new Date(demo.dateISO);
  const { d, h, m, s } = useCountdown(target);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", attend: "da", people: "2", menu: "standard", message: "" });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const muted = demo.dark ? "text-ivory/60" : "text-muted-foreground";
  const body = demo.dark ? "text-ivory/80" : "text-foreground/80";
  const mapLink = demo.dark
    ? "border-ivory/30 hover:bg-ivory/10"
    : "border-noir/30 hover:bg-secondary";
  const programBg = demo.dark ? "bg-ivory/5" : "bg-secondary/40";
  const rsvpBg = demo.dark ? "bg-ivory/5" : "bg-noir";

  return (
    <div id="top" className={`min-h-screen ${demo.dark ? "bg-noir text-ivory" : "bg-ivory text-foreground"}`}>
      <InvitationNav monogram={demo.monogram} dark={demo.dark} />

      {/* HERO */}
      <section className="relative h-screen min-h-[600px] w-full overflow-hidden bg-noir">
        {/* The model's own photo is the hero background; a veil keeps the white text readable. */}
        {MODEL_IMAGES[demo.slug] && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={MODEL_IMAGES[demo.slug]}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: MODEL_IMAGE_POSITION[demo.slug] }}
            />
            <div className="absolute inset-0" style={{ background: `rgba(0,0,0,${MODEL_HERO_VEIL[demo.slug] ?? 0.35})` }} />
          </>
        )}
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-6">
          <p className="text-xs uppercase tracking-[0.4em] animate-shimmer">Vă invităm la nunta noastră</p>
          <div className="my-10 space-y-2 animate-fade-up">
            <h1 className="font-serif italic text-6xl sm:text-7xl md:text-8xl">{demo.bride}</h1>
            <p className={`font-serif text-3xl ${demo.accentText}`}>&</p>
            <h1 className="font-serif italic text-6xl sm:text-7xl md:text-8xl">{demo.groom}</h1>
          </div>
          <div className={`h-px w-20 ${demo.accentBg}`} />
          <p className="mt-8 font-serif text-2xl tracking-wide">{demo.dateLabel}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.3em]">{demo.venue}</p>
          <div className="absolute bottom-10 text-xs uppercase tracking-[0.3em] opacity-70">↓ Descoperă povestea</div>
        </div>
      </section>

      {/* COUNTDOWN */}
      <section className="bg-noir text-ivory py-20 text-center">
        <p className={`text-xs uppercase tracking-[0.35em] ${demo.accentText}`}>Numărătoare inversă</p>
        <div className="mt-10 flex justify-center gap-6 sm:gap-12">
          {[
            { v: d, l: "Zile" }, { v: h, l: "Ore" }, { v: m, l: "Minute" }, { v: s, l: "Secunde" },
          ].map((x) => (
            <div key={x.l} className="text-center">
              <div className="font-serif text-5xl sm:text-6xl tabular-nums">{x.v.toString().padStart(2, "0")}</div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.3em] text-ivory/60">{x.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* STORY */}
      <section id="povestea" className="mx-auto max-w-2xl scroll-mt-24 px-6 py-24 text-center">
        <p className={`text-xs uppercase tracking-[0.35em] ${muted}`}>Povestea noastră</p>
        <h2 className="mt-4 font-serif text-4xl sm:text-5xl italic">{demo.storyTitle}</h2>
        <div className={`mt-6 mx-auto gold-divider w-16`} />
        <p className={`mt-10 font-serif text-xl leading-relaxed ${body}`}>
          {demo.story}
        </p>
      </section>

      {/* TIMELINE */}
      <section id="program" className={`${programBg} scroll-mt-24 py-24`}>
        <div className="mx-auto max-w-2xl px-6">
          <div className="text-center">
            <p className={`text-xs uppercase tracking-[0.35em] ${muted}`}>Programul zilei</p>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl">{demo.dateTitle}</h2>
          </div>
          <div className="mt-16 space-y-10">
            {demo.program.map((e) => (
              <div key={e.t} className="flex gap-8 items-baseline">
                <div className={`font-serif text-2xl ${demo.accentText} w-20 shrink-0`}>{e.t}</div>
                <div>
                  <p className="font-serif text-2xl">{e.n}</p>
                  <p className={`text-sm mt-1 ${muted}`}>{e.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section id="locatia" className="mx-auto max-w-4xl scroll-mt-24 px-6 py-24 text-center">
        <p className={`text-xs uppercase tracking-[0.35em] ${muted}`}>Locația</p>
        <h2 className="mt-4 font-serif text-4xl sm:text-5xl">{demo.venue}</h2>
        <p className={`mt-3 ${muted}`}>{demo.venueArea}</p>
        <div className={`mt-10 overflow-hidden rounded-md soft-shadow aspect-[16/9] ${demo.dark ? "bg-noir" : "bg-secondary"}`}>
          <iframe
            title="Hartă"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${demo.mapBbox}&layer=mapnik`}
            className={`h-full w-full ${demo.dark ? "grayscale invert-[0.92] hue-rotate-180 brightness-95 contrast-90" : ""}`}
            loading="lazy"
          />
        </div>
        <a className={`mt-8 inline-block rounded-[4px] border px-6 py-3 text-sm transition-colors ${mapLink}`} href={`https://maps.google.com/?q=${encodeURIComponent(`${demo.venue}, ${demo.venueArea}`)}`} target="_blank" rel="noreferrer">
          Deschide în Google Maps →
        </a>
      </section>

      {/* RSVP */}
      <section id="confirmare" className={`${rsvpBg} scroll-mt-24 text-ivory py-24`}>
        <div className="mx-auto max-w-md px-6">
          <p className={`text-xs uppercase tracking-[0.35em] ${demo.accentText} text-center`}>Confirmare</p>
          <h2 className="mt-4 font-serif text-4xl text-center">Vino alături de noi</h2>
          <p className="mt-3 text-center text-ivory/60 text-sm">{`Te rugăm să confirmi până la ${demo.rsvpUntil}.`}</p>

          {sent ? (
            <div className="mt-12 text-center py-12 border border-champagne/30 rounded-md">
              <div className={`font-serif text-5xl ${demo.accentText}`}>♡</div>
              <p className="mt-4 font-serif text-2xl">Mulțumim!</p>
              <p className="mt-2 text-sm text-ivory/60">Confirmarea ta a fost trimisă cu drag.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-12 space-y-7">
              <div>
                <label className="text-[10px] uppercase tracking-[0.3em] text-ivory/60">Nume</label>
                <input
                  required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-2 w-full border-0 border-b border-ivory/30 bg-transparent py-3 text-ivory outline-none focus:border-champagne"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.3em] text-ivory/60 block mb-3">Vei participa?</label>
                <div className="grid grid-cols-2 gap-3">
                  {[{ v: "da", l: "Particip cu drag" }, { v: "nu", l: "Nu pot ajunge" }].map((o) => (
                    <button
                      type="button" key={o.v}
                      onClick={() => setForm({ ...form, attend: o.v })}
                      className={`rounded-full border px-4 py-3 text-sm transition-all ${form.attend === o.v ? "border-champagne bg-champagne/10" : "border-ivory/20"}`}
                    >
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>
              {form.attend === "da" && (
                <>
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.3em] text-ivory/60">Număr persoane</label>
                    <input
                      type="number" min={1} max={5} value={form.people} onChange={(e) => setForm({ ...form, people: e.target.value })}
                      className="mt-2 w-full border-0 border-b border-ivory/30 bg-transparent py-3 text-ivory outline-none focus:border-champagne"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.3em] text-ivory/60">Preferințe meniu</label>
                    <select
                      value={form.menu} onChange={(e) => setForm({ ...form, menu: e.target.value })}
                      className="mt-2 w-full border-0 border-b border-ivory/30 bg-transparent py-3 text-ivory outline-none focus:border-champagne"
                    >
                      <option className="bg-noir" value="standard">Standard</option>
                      <option className="bg-noir" value="vegetarian">Vegetarian</option>
                      <option className="bg-noir" value="vegan">Vegan</option>
                    </select>
                  </div>
                </>
              )}
              <div>
                <label className="text-[10px] uppercase tracking-[0.3em] text-ivory/60">Mesaj pentru miri (opțional)</label>
                <textarea
                  rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="mt-2 w-full border-0 border-b border-ivory/30 bg-transparent py-3 text-ivory outline-none focus:border-champagne resize-none"
                />
              </div>
              <button type="submit" className="mt-4 w-full rounded-[4px] bg-ivory text-noir px-6 py-4 text-sm tracking-wider hover:bg-champagne transition-colors">
                Trimite confirmarea
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="py-12 text-center">
        <p className="font-serif italic text-2xl">Cu drag, {demo.bride} &amp; {demo.groom}</p>
        <p className={`mt-6 text-[10px] uppercase tracking-[0.3em] ${muted}`}>Powered by Invitta RSVP</p>
      </footer>
    </div>
  );
}
