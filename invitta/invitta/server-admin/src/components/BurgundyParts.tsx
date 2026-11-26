"use client";

import { useEffect, useId, useState } from "react";
import type { ScheduleItem } from "@/lib/invitation-content";

/* Pieces of the "Burgundy Seal" model: wax-seal envelope gate, lace-framed cover, hairline timeline,
   details page (dress code / location / hotel) and the photo thank-you. Copy stays Romanian; the
   site-wide i18n dictionary translates it when English is active. */

type Data = Record<string, any>;

const DIDONE = '"Playfair Display", "Bodoni Moda", serif';
const CREAM = "#f4e9e4";

const WEEKDAYS = ["Duminică", "Luni", "Marți", "Miercuri", "Joi", "Vineri", "Sâmbătă"];
const MONTHS = ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"];

/* ------------------------------ Envelope gate ------------------------------ */

/** A wobbly circle, like pressed wax. */
function waxPath(cx: number, cy: number, r: number) {
  const pts = Array.from({ length: 36 }, (_, i) => {
    const a = (i / 36) * Math.PI * 2;
    const wobble = 1 + 0.045 * Math.sin(a * 5 + 0.8) + 0.03 * Math.sin(a * 9 + 2);
    return [cx + Math.cos(a) * r * wobble, cy + Math.sin(a) * r * wobble] as const;
  });
  return pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join("") + "Z";
}

export function EnvelopeGate({ data }: { data: Data }) {
  const [phase, setPhase] = useState<"closed" | "opening" | "gone">("closed");
  const uid = useId().replace(/:/g, "");
  const initials = [data.brideFirst, data.groomFirst].map((n: string) => (n ?? "").trim()[0]?.toUpperCase()).filter(Boolean).join("&");

  useEffect(() => {
    if (phase === "gone") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [phase]);

  const open = () => {
    if (phase !== "closed") return;
    setPhase("opening");
    setTimeout(() => setPhase("gone"), 1100);
  };

  if (phase === "gone") return null;
  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-1000 ease-in-out ${
        phase === "opening" ? "pointer-events-none -translate-y-full opacity-0" : ""
      }`}
      style={{ background: "#4b1d1f" }}
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <filter id={`${uid}n`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" />
            <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .22 0" />
          </filter>
          <linearGradient id={`${uid}g`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#5a2527" />
            <stop offset="1" stopColor="#3c1416" />
          </linearGradient>
        </defs>
        <rect width="400" height="800" fill={`url(#${uid}g)`} />
        <polygon points="-10,170 200,430 410,170 410,300 200,560 -10,300" fill="#3a0000" />
        <polyline points="-10,170 200,430 410,170" fill="none" stroke="#7a3a3c" strokeOpacity=".55" />
        <rect width="400" height="800" filter={`url(#${uid}n)`} />
      </svg>

      <button
        type="button"
        onClick={open}
        aria-label="Deschide invitația"
        className="relative flex flex-col items-center gap-8 focus-visible:outline-none"
      >
        <svg viewBox="0 0 160 160" className="h-44 w-44 drop-shadow-[0_10px_18px_rgba(0,0,0,.55)] transition-transform duration-500 hover:scale-105">
          <defs>
            <radialGradient id={`${uid}w`} cx=".35" cy=".3" r=".9">
              <stop offset="0" stopColor="#f3ecd2" />
              <stop offset="1" stopColor="#c9bb8f" />
            </radialGradient>
          </defs>
          <path d={waxPath(80, 80, 62)} fill={`url(#${uid}w)`} />
          <circle cx="80" cy="80" r="40" fill="none" stroke="#b3a577" strokeWidth="2" opacity=".8" />
          <circle cx="80" cy="80" r="36" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="1" />
          <text x="80" y="90" textAnchor="middle" fontSize="28" fontStyle="italic" fill="#a8996c" style={{ fontFamily: DIDONE }}>
            {initials || "♡"}
          </text>
        </svg>
        <span className="text-[11px] uppercase tracking-[0.4em] animate-pulse" style={{ color: CREAM }}>
          Atinge sigiliul pentru a deschide
        </span>
      </button>
    </div>
  );
}

/* ------------------------------ Lace frame ------------------------------ */

function LaceFrame({ photo, alt }: { photo: string; alt: string }) {
  const uid = useId().replace(/:/g, "");
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[22rem]" style={{ color: CREAM }}>
      <svg viewBox="0 0 300 300" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <pattern id={`${uid}p`} width="24" height="32" patternUnits="userSpaceOnUse">
            <g fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" opacity=".85">
              <path d="M12 3c-2.6 3.4-2.6 7 0 9 2.6-2 2.6-5.6 0-9z" />
              <path d="M12 12c-4.4 0-6.6 2.4-7.4 6 3.2-1.2 5.4-1 7.4 1 2-2 4.2-2.2 7.4-1-.8-3.6-3-6-7.4-6z" />
              <path d="M12 19v8M9 29h6" />
              <circle cx="3" cy="16" r="1" /><circle cx="21" cy="16" r="1" />
            </g>
          </pattern>
        </defs>
        <rect x="1" y="1" width="298" height="298" fill="none" stroke="currentColor" strokeOpacity=".7" />
        <g fill={`url(#${uid}p)`}>
          <rect x="4" y="4" width="292" height="32" />
          <rect x="4" y="264" width="292" height="32" />
          <rect x="4" y="36" width="32" height="228" />
          <rect x="264" y="36" width="32" height="228" />
        </g>
        <rect x="37" y="37" width="226" height="226" fill="none" stroke="currentColor" strokeOpacity=".7" />
      </svg>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={photo} alt={alt} className="absolute inset-[12.4%] h-[75.2%] w-[75.2%] object-cover grayscale" />
    </div>
  );
}

/* ------------------------------ Cover ------------------------------ */

export function BurgundyHero({ data }: { data: Data }) {
  const d = data.date ? new Date(`${data.date}T00:00:00`) : null;
  const valid = d && !isNaN(d.getTime());
  const place = [data.partyVenue, data.partyCity].filter(Boolean);
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center" style={{ color: CREAM }}>
      {data.heroImage && <LaceFrame photo={data.heroImage} alt="" />}

      <h1 className="mt-12 text-5xl font-light uppercase leading-[1.1] tracking-[0.04em] sm:text-6xl" style={{ fontFamily: DIDONE }}>
        <span className="block">{data.brideFirst}</span>
        <span className="block text-4xl">&amp;</span>
        <span className="block">{data.groomFirst}</span>
      </h1>

      {valid ? (
        <div className="mt-12 flex flex-col items-center">
          <span className="text-[11px] uppercase tracking-[0.35em]">{MONTHS[d.getMonth()]}</span>
          <div className="mt-3 flex items-center gap-5 sm:gap-8">
            <span className="w-24 text-right text-xs uppercase tracking-[0.25em]">{WEEKDAYS[d.getDay()]}</span>
            <span className="border-x border-current px-5 text-6xl font-light leading-none" style={{ fontFamily: DIDONE }}>
              {d.getDate()}
            </span>
            <span className="w-24 text-left text-xs uppercase tracking-[0.25em]">
              <span>la</span> <span>{data.time}</span>
            </span>
          </div>
          <span className="mt-4 text-sm tracking-[0.3em]">{d.getFullYear()}</span>
        </div>
      ) : (
        data.dateLabel && <p className="mt-12 text-sm uppercase tracking-[0.35em]">{data.dateLabel}</p>
      )}

      {place.length > 0 && (
        <p className="mt-10 max-w-xs text-xs uppercase leading-relaxed tracking-[0.35em]">{place.join(" · ")}</p>
      )}
    </section>
  );
}

/* ------------------------------ Framed pages ------------------------------ */

function Framed({ title, id, children }: { title: string; id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="px-5 py-12 sm:py-16" style={{ color: CREAM }}>
      <div className="mx-auto max-w-md border px-8 py-14 text-center sm:px-12" style={{ borderColor: `${CREAM}80` }}>
        <h2 className="text-4xl font-light uppercase tracking-[0.06em] sm:text-5xl" style={{ fontFamily: DIDONE }}>
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

export function BurgundySchedule({ data }: { data: Data }) {
  const items: ScheduleItem[] = Array.isArray(data.schedule) ? data.schedule : [];
  if (items.length === 0) return null;
  return (
    <Framed id="program" title={data.scheduleTitle || "Program"}>
      <ul className="mt-12">
        {items.map((it, i) => (
          <li key={i} className={`py-7 ${i > 0 ? "border-t" : ""}`} style={{ borderColor: `${CREAM}66` }}>
            <p className="text-xl font-light tracking-wide" style={{ fontFamily: DIDONE }}>{it.time}</p>
            <p className="mt-2 text-xl uppercase tracking-wide">{it.title}</p>
            {it.desc && <p className="mt-1 text-sm italic opacity-70">{it.desc}</p>}
          </li>
        ))}
      </ul>
      {data.scheduleNote && <p className="mt-6 text-sm italic opacity-70">{data.scheduleNote}</p>}
    </Framed>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-14 first:mt-12">
      <h3 className="mx-auto inline-block min-w-[13rem] border-b pb-2 text-2xl uppercase tracking-wide" style={{ fontFamily: DIDONE, borderColor: `${CREAM}88` }}>
        {label}
      </h3>
      <div className="mt-6">{children}</div>
    </div>
  );
}

export function BurgundyDetails({ data }: { data: Data }) {
  const colors: string[] = Array.isArray(data.dressColors) ? data.dressColors : [];
  const ceremony = [data.religiousVenue || data.civilVenue, data.religiousAddress || data.civilAddress, data.religiousCity || data.civilCity].filter(Boolean);
  const party = [data.partyVenue, data.partyAddress, data.partyCity].filter(Boolean);
  return (
    <Framed id="unde" title="Detalii">
      {colors.length > 0 && (
        <Block label="Dress code">
          <div className="flex flex-wrap justify-center gap-3">
            {colors.map((c, i) => (
              <span key={i} className="h-11 w-11 rounded-full border" style={{ background: c, borderColor: `${CREAM}99` }} />
            ))}
          </div>
          {data.dressNote && <p className="mt-5 text-sm italic opacity-80">{data.dressNote}</p>}
        </Block>
      )}
      {ceremony.length > 0 && (
        <Block label="Ceremonia">
          <p className="text-lg leading-relaxed">{ceremony.map((l, i) => <span key={i} className="block">{l}</span>)}</p>
        </Block>
      )}
      {party.length > 0 && (
        <Block label="Locație">
          <p className="text-lg leading-relaxed">{party.map((l, i) => <span key={i} className="block">{l}</span>)}</p>
        </Block>
      )}
      {data.hotelName && (
        <Block label="Cazare">
          <p className="text-base uppercase tracking-[0.18em]">{data.hotelName}</p>
          {data.hotelPhone && <p className="mt-2 text-sm tracking-wider opacity-80">{data.hotelPhone}</p>}
        </Block>
      )}
    </Framed>
  );
}

/* ------------------------------ Thank you ------------------------------ */

export function BurgundyThanks({ data }: { data: Data }) {
  if (!data.thanksImage && !data.thanksTitle && !data.thanksText) return null;
  return (
    <section className="px-5 py-12 sm:py-16 text-center" style={{ color: CREAM }}>
      <div className="mx-auto max-w-md">
        {data.thanksImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={data.thanksImage} alt="" className="w-full border object-cover grayscale" style={{ borderColor: `${CREAM}cc`, aspectRatio: "3 / 4" }} />
        )}
        {data.thanksTitle && (
          <h3 className="mt-12 text-6xl" style={{ fontFamily: '"Italianno", "Great Vibes", cursive' }}>{data.thanksTitle}</h3>
        )}
        {data.thanksText && <p className="mt-5 font-serif text-lg leading-relaxed opacity-85">{data.thanksText}</p>}
      </div>
    </section>
  );
}
