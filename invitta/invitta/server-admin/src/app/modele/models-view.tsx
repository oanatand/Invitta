"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ModelCard } from "@/components/ModelCard";
import { SiteHeader } from "@/components/SiteHeader";
import { COLLECTION, FILTERS } from "@/lib/collection";

export function ModelsView() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("toate");

  const shown = filter === "toate" ? COLLECTION : COLLECTION.filter((m) => m.moods.includes(filter));

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="collection-section mx-auto max-w-[1400px] px-6 pb-16 pt-20 md:pb-20 md:pt-28">
        <div className="grid gap-x-12 gap-y-6 sm:grid-cols-2 sm:items-end">
          <div>
            <p className="text-xs uppercase text-collection-copy">Colecția 2026</p>
            <h1 className="mt-5 font-serif text-4xl leading-tight lg:text-6xl">
              <span className="block">Modele</span>
              <em className="block">pentru fiecare poveste</em>
            </h1>
          </div>
          <p className="max-w-md text-base leading-relaxed text-collection-copy">
            Deschide demo-ul oricărui model, fără cont. Doar editarea invitației și confirmările au nevoie de autentificare.
          </p>
        </div>

        {/* Filters: browse by feel instead of scrolling through everything */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-y border-collection-divider py-4">
          <div role="group" aria-label="Filtrează modelele" className="flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const on = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setFilter(f.id)}
                  className={`rounded-full border px-5 py-2 text-[11px] uppercase tracking-[0.18em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-collection-ink ${
                    on
                      ? "border-collection-ink bg-collection-ink text-collection-light"
                      : "border-collection-divider text-collection-copy hover:border-collection-ink hover:text-collection-ink"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-collection-copy" aria-live="polite">
            <span>{shown.length}</span> <span>modele</span>
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16">
          {shown.map((m) => (
            <ModelCard key={m.slug} model={m} />
          ))}
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-between gap-6 border-t border-collection-divider pt-10">
          <p className="text-sm text-collection-copy">Nu știi ce ți se potrivește? Vezi pachetele și prețurile.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Button asChild className="h-auto rounded-[4px] px-6 py-3 text-[11px] font-normal uppercase shadow-none">
              <Link href="/#pricing">Prețuri</Link>
            </Button>
            <Link href="/" className="text-[11px] uppercase text-collection-ink underline decoration-collection-divider underline-offset-8 hover:decoration-collection-ink">
              Înapoi acasă
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
