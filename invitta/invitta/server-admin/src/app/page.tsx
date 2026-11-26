import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { IMG } from "@/lib/assets";
import { COLLECTION, FEATURED } from "@/lib/collection";
import { ModelCard } from "@/components/ModelCard";
import type { Metadata } from "next";
import { PhoneMockup } from "@/components/PhoneMockup";
import { InvitationPreview } from "@/components/InvitationPreview";

export const metadata: Metadata = {
  title: "Invitta RSVP — Invitații digitale de nuntă, create cu eleganță",
  description:
    "Povestea voastră merită o invitație pe măsură. Invitații digitale elegante, confirmări RSVP și aranjarea meselor, într-un singur loc.",
  openGraph: {
    title: "Invitta RSVP — Invitații digitale de nuntă",
    description: "Invitații digitale create cu eleganță. Momente speciale, împărtășite cu cei dragi.",
    type: "website",
    images: [IMG.heroHands],
  },
  twitter: { card: "summary_large_image", images: [IMG.heroHands] },
};

const steps = [
  { n: "01", title: "Alege un design", desc: "Selectează din colecția noastră de invitații editoriale, creată cu grijă." },
  { n: "02", title: "Trimite invitația", desc: "Distribuie linkul personalizat prin WhatsApp, e-mail sau social media." },
  { n: "03", title: "Primește confirmările", desc: "Vezi toate răspunsurile într-un singur loc, elegant și simplu." },
];

const features = [
  { title: "Invitație online", desc: "Pagina ta personalizată, mereu disponibilă." },
  { title: "Confirmări RSVP", desc: "Răspunsurile invitaților, ordonate frumos." },
  { title: "Aranjare la mese", desc: "Drag & drop intuitiv, vizual și satisfăcător." },
  { title: "Guest list elegant", desc: "Listă completă cu preferințe și mesaje." },
  { title: "Link personalizat", desc: "invitta.ro/ioana-andrei — simplu, memorabil." },
];

const testimonials = [
  { name: "Ana & Mihai", text: "Invitația noastră a primit atâtea complimente. Totul a fost extrem de simplu și elegant.", date: "Mai 2025" },
  { name: "Ioana & Răzvan", text: "Am organizat 180 de invitați fără stres. Funcția de aranjare a meselor e magică.", date: "August 2025" },
  { name: "Diana & Cristian", text: "Pur și simplu frumos. Părea că am angajat un designer doar pentru noi.", date: "Iulie 2025" },
];

const plans = [
  { name: "Basic", price: "150", desc: "Pentru a începe", features: ["1 design", "50 invitați", "RSVP de bază", "Link personalizat"] },
  { name: "Premium", price: "199", desc: "Experiența completă", featured: true, features: ["Toate design-urile", "200 invitați", "Aranjare la mese", "Galerie foto", "Suport prioritar"] },
];

function Label({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-[11px] uppercase tracking-[0.35em] text-muted-foreground ${className}`}>{children}</p>;
}

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* HERO */}
      <section className="relative min-h-[88vh] overflow-hidden">
        <img
          src={IMG.heroHands}
          alt="Mireasa și mirele întinzându-și mâinile unul spre celălalt"
          width={735}
          height={480}
          className="absolute inset-0 h-full w-full object-cover object-center animate-[invitta-reveal_1.6s_ease-out_both]"
        />
        <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-end px-6 pb-16 pt-32 md:justify-center md:pb-0">
          <div className="max-w-xl animate-fade-up">
            <Label className="!text-ivory/70">Atelier de invitații digitale</Label>
            <h1 className="mt-8 font-serif text-5xl leading-[1.02] text-ivory sm:text-6xl lg:text-[5.5rem]">
              Povestea voastră merită o invitație <em className="text-ivory/70">pe măsură.</em>
            </h1>
            <div className="mt-8 h-px w-16 bg-ivory/40" />
            <p className="mt-8 max-w-sm text-base leading-relaxed text-ivory/80">
              Invitații digitale create cu eleganță. Momente speciale, împărtășite cu cei dragi.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a href="#colectii" className="rounded-[4px] bg-ivory px-8 py-4 text-sm tracking-wide text-noir transition-opacity hover:opacity-90">
                Descoperă colecțiile
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* COLLECTIONS: a short, static grid of the recommended designs; the full catalogue lives on /modele */}
      <section id="templates" className="collection-section mx-auto max-w-[1400px] px-6 py-28 md:py-36">
        <div id="colectii" className="grid gap-x-12 gap-y-6 sm:grid-cols-2 sm:items-end">
          <div>
            <p className="text-xs uppercase text-collection-copy">Colecția 2026</p>
            <h2 className="mt-5 font-serif text-4xl leading-tight lg:text-6xl">
              <span className="block">O colecție</span>
              <em className="block">pentru fiecare poveste</em>
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-collection-copy sm:justify-self-end">
            Fiecare design este compus ca o papetărie de nuntă — tipografie atentă, ritm și liniște.
          </p>
        </div>

        <ul
          aria-label="Modelele recomandate"
          className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-8 md:gap-y-14"
        >
          {FEATURED.map((m) => (
            <li key={m.slug}>
              <ModelCard model={m} compact />
            </li>
          ))}
        </ul>

        <div className="mt-16 flex justify-center">
          <Link
            href="/modele"
            className="group/all inline-flex items-center gap-4 rounded-[4px] border border-collection-ink px-8 py-4 text-[11px] uppercase tracking-[0.2em] text-collection-ink transition-colors hover:bg-collection-ink hover:text-collection-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-collection-ink"
          >
            <span>{`Vezi toate cele ${COLLECTION.length} ${COLLECTION.length >= 20 ? "de " : ""}modele`}</span>
            <span aria-hidden="true" className="transition-transform duration-500 group-hover/all:translate-x-1">→</span>
          </Link>
        </div>
      </section>

      {/* STATEMENT */}
      <section className="bg-cream py-28 md:py-40">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="font-serif text-4xl leading-[1.15] sm:text-6xl">
            Nu doar o invitație. <em className="text-taupe">Primul capitol</em> al zilei voastre.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-6 py-28">
        <div className="text-center">
          <Label>Cum funcționează</Label>
          <h2 className="mt-5 font-serif text-4xl sm:text-5xl">Trei pași simpli, fără efort</h2>
        </div>
        <div className="mt-16 grid gap-12 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="border-t border-border pt-6">
              <span className="font-serif text-3xl italic text-taupe">{s.n}</span>
              <h3 className="mt-4 font-serif text-2xl">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES LIST */}
      <section className="border-y border-border">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <Label>Tot ce ai nevoie</Label>
            <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">Doar esențialul, <em>gândit cu grijă</em>.</h2>
          </div>
          <ul>
            {features.map((f) => (
              <li key={f.title} className="group flex flex-col justify-between gap-2 border-b border-border py-5 transition-colors last:border-0 sm:flex-row sm:items-baseline">
                <span className="font-serif text-2xl transition-transform duration-500 group-hover:translate-x-1">{f.title}</span>
                <span className="text-sm text-muted-foreground">{f.desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* STORY 1 — EDITOR */}
      <section id="features" className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-28 md:py-36 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-[4px] bg-cream p-6 sm:p-10">
          <div className="grid overflow-hidden rounded-[4px] bg-card sm:grid-cols-[1fr_200px]">
            <div className="space-y-5 p-6 text-sm">
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Editor · Informații</p>
              {[["Mireasa", "Ioana"], ["Mirele", "Andrei"], ["Data", "14 Iunie 2026"], ["Locația", "Domeniul Manasia"]].map(([l, v]) => (
                <div key={l} className="border-b border-border pb-3">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{l}</p>
                  <p className="mt-1 font-serif text-lg">{v}</p>
                </div>
              ))}
              <div className="flex gap-2 pt-1">
                {["bg-ivory", "bg-beige", "bg-taupe", "bg-noir"].map((c) => (
                  <span key={c} className={`h-6 w-6 rounded-full border border-border ${c}`} />
                ))}
              </div>
            </div>
            <div className="hidden h-[340px] border-l border-border sm:block">
              <InvitationPreview compact />
            </div>
          </div>
        </div>
        <div>
          <Label>01 — Personal</Label>
          <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">Creează ceva <em>doar al vostru</em>.</h2>
          <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
            Numele, data, locurile, povestea și fotografiile voastre. Schimbați orice și vedeți invitația prinzând viață în timp real.
          </p>
          <Link href="/register" className="mt-8 inline-block border-b border-foreground/40 pb-1 text-sm hover:border-foreground">
            Începe personalizarea
          </Link>
        </div>
      </section>

      {/* STORY 2 — SHARE (DARK) */}
      <section className="bg-noir py-28 text-ivory md:py-36">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <p className="text-[11px] uppercase tracking-[0.35em] text-taupe">02 — Împărtășit</p>
            <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">Momentul vostru, <em>în buzunarul fiecăruia</em>.</h2>
            <p className="mt-6 max-w-md leading-relaxed text-ivory/60">
              Un singur link, trimis pe WhatsApp. Invitații deschid invitația pe telefon și confirmă prezența în câteva secunde.
            </p>
            <Link
              href="/invitatie/ioana-andrei"
              className="mt-8 inline-block border-b border-ivory/40 pb-1 text-sm hover:border-ivory"
            >
              Vezi o invitație demo
            </Link>
          </div>
          <div className="order-1 flex justify-center gap-6 lg:order-2">
            <PhoneMockup>
              <InvitationPreview />
            </PhoneMockup>
            <div className="hidden w-60 self-end rounded-[4px] bg-ivory p-6 text-noir sm:block">
              <p className="text-[10px] uppercase tracking-[0.3em] text-stone">Confirmare</p>
              <p className="mt-3 font-serif text-xl">Maria Popescu</p>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <span className="rounded-[4px] bg-noir px-3 py-2 text-center text-ivory">Particip</span>
                <span className="rounded-[4px] border border-border px-3 py-2 text-center text-stone">Nu particip</span>
              </div>
              <p className="mt-4 text-xs text-stone">2 persoane · Meniu clasic</p>
            </div>
          </div>
        </div>
      </section>

      {/* STORY 3 — MANAGE */}
      <section className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-28 md:py-36 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <Label>03 — Liniștit</Label>
          <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">Sărbătoriți, <em>fără griji</em>.</h2>
          <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
            Toate confirmările într-un singur loc. Așezați invitații la mese cu un simplu gest și vedeți imediat locurile libere.
          </p>
        </div>
        <div className="rounded-[4px] bg-cream p-6 sm:p-10">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-[4px] bg-card p-5 text-sm">
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Invitați</p>
              {[["Maria Popescu", "Confirmat"], ["Ion Ionescu", "În așteptare"], ["Elena Dima", "Confirmat"], ["Radu Stan", "Refuzat"]].map(([n, s]) => (
                <div key={n} className="flex justify-between border-b border-border py-3 last:border-0">
                  <span>{n}</span>
                  <span className="text-xs text-muted-foreground">{s}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center justify-center rounded-[4px] bg-card p-5">
              <div className="relative flex h-36 w-36 items-center justify-center rounded-full border border-taupe/60">
                <div className="text-center">
                  <p className="font-serif text-xl">Masa 1</p>
                  <p className="text-xs text-muted-foreground">8 / 10</p>
                </div>
                {Array.from({ length: 10 }).map((_, i) => (
                  <span
                    key={i}
                    className={`absolute h-3 w-3 rounded-full ${i < 8 ? "bg-noir" : "border border-taupe bg-card"}`}
                    style={{ transform: `rotate(${i * 36}deg) translateY(-84px)` }}
                  />
                ))}
              </div>
              <p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">2 locuri libere</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-6 py-28">
        <div className="text-center">
          <Label>Povești adevărate</Label>
          <h2 className="mt-5 font-serif text-4xl sm:text-5xl">Iubit de cuplurile noastre</h2>
        </div>
        <div className="mt-16 grid gap-12 md:grid-cols-3">
          {testimonials.map((t) => (
            <blockquote key={t.name} className="border-t border-border pt-6">
              <p className="font-serif text-2xl italic leading-snug">„{t.text}”</p>
              <footer className="mt-6 flex justify-between text-sm">
                <span>{t.name}</span>
                <span className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{t.date}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="border-t border-border bg-cream py-28">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <Label>Prețuri</Label>
            <h2 className="mt-5 font-serif text-4xl sm:text-5xl">Alege pachetul potrivit</h2>
            <p className="mt-4 text-sm text-muted-foreground">Plată unică. Fără abonament.</p>
          </div>
          <div className="mt-16 grid gap-px overflow-hidden rounded-[4px] border border-border bg-border md:grid-cols-2">
            {plans.map((p) => (
              <div key={p.name} className={`flex flex-col p-10 ${p.featured ? "bg-noir text-ivory" : "bg-ivory"}`}>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-serif text-3xl">{p.name}</h3>
                  {p.featured && <span className="text-[10px] uppercase tracking-[0.3em] text-taupe">Recomandat</span>}
                </div>
                <p className={`mt-1 text-sm ${p.featured ? "text-ivory/60" : "text-muted-foreground"}`}>{p.desc}</p>
                <p className="mt-8 font-serif text-5xl">{`${p.price} lei`}</p>
                <ul className="mt-8 flex-1 space-y-3 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-3">
                      <span className="mt-2 h-px w-3 shrink-0 bg-taupe" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/register"
                  className={`mt-10 block rounded-[4px] px-6 py-3.5 text-center text-sm transition-opacity hover:opacity-90 ${p.featured ? "bg-ivory text-noir" : "border border-noir/30"}`}
                >
                  Alege {p.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="mx-auto max-w-4xl px-6 py-32 text-center">
        <h2 className="font-serif text-4xl leading-tight sm:text-6xl">Totul începe cu <em className="text-taupe">o invitație.</em></h2>
        <Link href="/register" className="mt-12 inline-block rounded-[4px] bg-primary px-8 py-4 text-sm tracking-wide text-primary-foreground hover:opacity-90">
          Creează invitația
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-12 md:flex-row">
          <div className="font-serif text-2xl">Invitta · RSVP</div>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <a href="#colectii" className="hover:text-foreground">Colecții</a>
            <a href="#features" className="hover:text-foreground">Experiența</a>
            <a href="#pricing" className="hover:text-foreground">Prețuri</a>
          </div>
          <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">© {new Date().getFullYear()} Invitta RSVP</p>
        </div>
      </footer>
    </div>
  );
}
