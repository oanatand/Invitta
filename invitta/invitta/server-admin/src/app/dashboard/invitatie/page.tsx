"use client";

import { useMutation } from "@tanstack/react-query";
import { cloneElement, isValidElement, useCallback, useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";
import { GALLERY } from "@/lib/assets";
import {
  DEFAULT_CONTENT,
  BURGUNDY_SLUG,
  ICON_OPTIONS,
  MIDNIGHT_SLUG,
  withDefaults,
  type IconKey,
  type InvitationContent as Data,
  type MenuCourse,
  type ScheduleItem,
  type Section,
} from "@/lib/invitation-content";
import { useInvitation } from "@/lib/queries";
import { useSession } from "@/lib/session";

const input =
  "w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-champagne transition-colors placeholder:text-muted-foreground/60";

export default function Builder() {
  const session = useSession();
  const invitationId = session?.invitation?.id;
  const slug = session?.invitation?.slug ?? "";
  const { data: invitation } = useInvitation(invitationId);

  const [tab, setTab] = useState<"info" | "people" | "places" | "program" | "details" | "custom" | "sections">("info");
  const model = session?.invitation?.modelSlug;
  const [data, setData] = useState<Data>(DEFAULT_CONTENT);
  const [hydrated, setHydrated] = useState(false);
  const [saved, setSaved] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const dirty = useRef(false);
  const latest = useRef(data);
  useEffect(() => {
    latest.current = data;
  }, [data]);

  // Load the saved content once.
  useEffect(() => {
    if (invitation && !hydrated) {
      setData(withDefaults(invitation.content, invitation.modelSlug));
      setHydrated(true);
    }
  }, [invitation, hydrated]);

  const saveMutation = useMutation({
    mutationFn: (content: Data) =>
      api(`/invitations/${invitationId}`, { method: "PATCH", body: { content } }),
  });

  const persist = useCallback(() => {
    if (!invitationId || !dirty.current) return Promise.resolve();
    dirty.current = false;
    return saveMutation.mutateAsync(latest.current).catch(() => {
      dirty.current = true;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invitationId]);

  // Autosave 800ms after the last edit, and once more when leaving the page.
  useEffect(() => {
    if (!hydrated || !dirty.current) return;
    const t = setTimeout(persist, 800);
    return () => clearTimeout(t);
  }, [data, hydrated, persist]);
  useEffect(
    () => () => {
      if (dirty.current && invitationId) {
        api(`/invitations/${invitationId}`, { method: "PATCH", body: { content: latest.current } }).catch(() => {});
      }
    },
    [invitationId],
  );

  const set = <K extends keyof Data>(k: K, v: Data[K]) => {
    dirty.current = true;
    setData((d) => ({ ...d, [k]: v }));
  };

  // Preview reads the *saved* invitation, so flush pending edits first. The tab is opened
  // synchronously (popup blockers) and pointed at the preview once the save finished.
  const openPreview = (e: React.MouseEvent) => {
    e.preventDefault();
    const w = window.open("about:blank", "_blank");
    persist().finally(() => {
      if (w) w.location.href = "/invitatie/preview";
      else window.location.href = "/invitatie/preview";
    });
  };

  const save = async () => {
    await persist();
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  if (!hydrated) {
    return <p className="px-6 py-24 text-center text-xs uppercase tracking-[0.35em] text-muted-foreground">Se încarcă…</p>;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Editor</p>
          <h1 className="mt-2 font-serif text-4xl">Invitația voastră</h1>
          <p className="mt-2 text-sm text-muted-foreground">Personalizați fiecare detaliu. Modificările sunt salvate automat.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            // The shared link shows the *saved* invitation, so save pending edits before handing it out.
            onClick={() => persist().finally(() => setShareOpen(true))}
            className="h-auto rounded-full border-foreground bg-foreground/0 px-6 py-3 shadow-none hover:bg-foreground hover:text-background"
          >
            Trimite invitația
          </Button>
          <a
            href="/invitatie/preview"
            onClick={openPreview}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-border bg-card px-6 py-3 text-sm hover:border-champagne transition inline-flex items-center gap-2"
          >
            <span>Previzualizare</span>
            <span className="text-champagne">↗</span>
          </a>
          <Button onClick={save} className="h-auto rounded-[4px] px-6 py-3 shadow-none hover:opacity-90">
            {saved ? "✓ Salvat" : saveMutation.isPending ? "Se salvează…" : "Salvează"}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)} className="mb-8">
        <TabsList className="h-auto w-fit flex-wrap justify-start gap-1 rounded-md bg-secondary/40 p-1">
          {[
            { id: "info", label: "Informații generale" },
            { id: "people", label: "Sărbătoriți" },
            { id: "places", label: "Detalii locații" },
            ...(model === MIDNIGHT_SLUG ? [{ id: "program", label: "Program și meniu" }] : []),
            ...(model === BURGUNDY_SLUG
              ? [
                  { id: "program", label: "Program" },
                  { id: "details", label: "Detalii eveniment" },
                ]
              : []),
            { id: "custom", label: "Personalizare avansată" },
            { id: "sections", label: "Secțiuni" },
          ].map((t) => (
            <TabsTrigger
              key={t.id}
              value={t.id}
              className="rounded-xl px-4 py-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground data-[state=active]:bg-ivory data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="space-y-8">
        {tab === "info" && <InfoTab data={data} set={set} />}
        {tab === "people" && <PeopleTab data={data} set={set} />}
        {tab === "places" && <PlacesTab data={data} set={set} />}
        {tab === "program" && <ProgramTab data={data} set={set} model={model} />}
        {tab === "details" && <EventDetailsTab data={data} set={set} />}
        {tab === "custom" && <CustomTab data={data} set={set} />}
        {tab === "sections" && (
          <SectionsTab sections={data.sections} onChange={(s) => set("sections", s)} />
        )}
        <div className="text-center pt-4">
          <a
            href="/invitatie/preview"
            onClick={openPreview}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground transition"
          >
            Deschide previzualizarea într-o pagină nouă
            <span className="text-champagne">↗</span>
          </a>
        </div>
      </div>
      {shareOpen && <ShareDialog slug={slug} onClose={() => setShareOpen(false)} />}
    </div>
  );
}

function ShareDialog({ slug, onClose }: { slug: string; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const link = typeof window !== "undefined" && slug ? `${window.location.origin}/invitatie/${slug}` : "";
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };
  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="w-full sm:max-w-lg rounded-2xl bg-background p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Distribuie</p>
        <DialogTitle className="mt-2 font-serif text-3xl font-normal">Trimite invitația</DialogTitle>
        <DialogDescription className="mt-2 text-sm text-muted-foreground">
          Copiază linkul și trimite-l invitaților. Oricine îl deschide vede invitația.
        </DialogDescription>
        <Input readOnly value={link || "Se generează linkul…"} onFocus={(e) => e.target.select()} className={`${input} mt-6 font-mono text-xs`} />
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
          <Button disabled={!link} onClick={copy} className="h-auto rounded-[4px] px-4 py-3 shadow-none">
            {copied ? "✓ Copiat" : "Copiază linkul"}
          </Button>
          <Button asChild variant="outline" className="h-auto rounded-[4px] px-4 py-3 shadow-none hover:border-foreground">
            <a
              href={link ? `https://wa.me/?text=${encodeURIComponent(link)}` : undefined}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
          </Button>
          <Button asChild variant="outline" className="h-auto rounded-[4px] px-4 py-3 shadow-none hover:border-foreground">
            <a href={link || undefined} target="_blank" rel="noreferrer">
              Deschide
            </a>
          </Button>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Linkul arată mereu versiunea salvată a invitației, iar confirmările invitaților ajung în secțiunea RSVP.
        </p>
        <Button variant="ghost" onClick={onClose} className="mt-6 w-full text-xs uppercase tracking-[0.3em] text-muted-foreground hover:bg-transparent hover:text-foreground">
          Închide
        </Button>
      </DialogContent>
    </Dialog>
  );
}

/* ============================ Tabs ============================ */

function Card({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <Collapsible open={open} onOpenChange={setOpen} className="rounded-md border border-border bg-card overflow-hidden">
      <CollapsibleTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="h-auto w-full justify-between whitespace-normal rounded-none px-6 py-5 text-left font-normal hover:bg-transparent"
        >
          <div>
            <h3 className="font-serif text-xl">{title}</h3>
            {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
          </div>
          <span className={`text-champagne transition-transform ${open ? "rotate-180" : ""}`}>⌄</span>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="px-6 pb-6 space-y-5 border-t border-border pt-5">{children}</CollapsibleContent>
    </Collapsible>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode | ((id: string) => React.ReactNode);
}) {
  const id = useId();
  let body: React.ReactNode;
  if (typeof children === "function") body = children(id);
  else if (isValidElement<{ id?: string }>(children) && (children.type === Input || children.type === Textarea))
    body = cloneElement(children, { id });
  else body = children;
  return (
    <div>
      <Label htmlFor={id} className="text-[11px] font-normal uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
        {label}
        {hint && <span className="opacity-50" title={hint}>ⓘ</span>}
      </Label>
      <div className="mt-2">{body}</div>
    </div>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{children}</div>;
}

/* -------------- Info tab (hero / countdown / general) -------------- */

function InfoTab({ data, set }: { data: Data; set: <K extends keyof Data>(k: K, v: Data[K]) => void }) {
  return (
    <>
      <Card title="Prima pagină" hint="Imaginea de fundal și textele din antet">
        <Field label="Imagine de fundal pentru prima pagina">
          <ImagePicker value={data.heroImage} onChange={(v) => set("heroImage", v)} />
        </Field>

        <Field label="Filtru imagine de pe prima pagină" hint="Întunecă imaginea pentru lizibilitate">
          {(id) => (
            <>
              <Slider
                id={id} min={0} max={80} step={1} value={[data.heroOverlay]}
                onValueChange={([v]) => set("heroOverlay", v)}
              />
              <div className="text-xs text-muted-foreground mt-1">{data.heroOverlay}%</div>
            </>
          )}
        </Field>

        <Field label="Text introducere">
          <Textarea rows={2} className={input} value={data.heroIntro}
            onChange={(e) => set("heroIntro", e.target.value)} />
        </Field>

        <Row>
          <Field label="Text mic din antet">
            <Input className={input} value={data.heroSmall}
              onChange={(e) => set("heroSmall", e.target.value)} />
          </Field>
          <Field label="Text înlocuire nume">
            <Input className={input} value={data.headerReplacement}
              onChange={(e) => set("headerReplacement", e.target.value)} />
          </Field>
        </Row>

        <Field label="Font pentru textul din antet">
          {(id) => (
            <Select value={data.headerFont} onValueChange={(v) => set("headerFont", v)}>
              <SelectTrigger id={id} className={`${input} h-auto shadow-none`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cormorant">Cormorant Garamond</SelectItem>
                <SelectItem value="playfair">Playfair Display</SelectItem>
                <SelectItem value="italianno">Italianno</SelectItem>
                <SelectItem value="dmserif">DM Serif Display</SelectItem>
              </SelectContent>
            </Select>
          )}
        </Field>
      </Card>

      <Card title="Secțiune numărătoare" hint="Data nunții și textele din contor">
        <Row>
          <Field label="Data nunții">
            <Input type="date" className={input} value={data.date}
              onChange={(e) => set("date", e.target.value)} />
          </Field>
          <Field label="Ora">
            <Input type="time" className={input} value={data.time}
              onChange={(e) => set("time", e.target.value)} />
          </Field>
        </Row>
        <Field label="Text înlocuire dată" hint="Cum apare data afișată">
          <Input className={input} value={data.dateLabel}
            onChange={(e) => set("dateLabel", e.target.value)} />
        </Field>
      </Card>

    </>
  );
}

/* -------------- People tab -------------- */

function PeopleTab({ data, set }: { data: Data; set: <K extends keyof Data>(k: K, v: Data[K]) => void }) {
  return (
    <>
      <Card title="Despre sărbătoriți">
        <Row>
          <Field label="Prenume mireasă">
            <Input className={input} value={data.brideFirst} onChange={(e) => set("brideFirst", e.target.value)} />
          </Field>
          <Field label="Nume mireasă">
            <Input className={input} value={data.brideLast} onChange={(e) => set("brideLast", e.target.value)} />
          </Field>
          <Field label="Prenume mire">
            <Input className={input} value={data.groomFirst} onChange={(e) => set("groomFirst", e.target.value)} />
          </Field>
          <Field label="Nume mire">
            <Input className={input} value={data.groomLast} onChange={(e) => set("groomLast", e.target.value)} />
          </Field>
        </Row>
      </Card>

      <Card title="Părinții și nașii">
        <Field label="Etichetă părinți" hint="Cum sunt prezentați părinții">
          <Input className={input} value={data.parentsLabel} onChange={(e) => set("parentsLabel", e.target.value)} />
        </Field>
        <Field label="Numele părinților">
          <Textarea rows={3} className={input} placeholder="Ex: Maria și Cristi Popescu"
            value={data.parentsNames} onChange={(e) => set("parentsNames", e.target.value)} />
        </Field>
        <Field label="Etichetă nași">
          <Input className={input} value={data.godparentsLabel}
            onChange={(e) => set("godparentsLabel", e.target.value)} />
        </Field>
        <Field label="Numele nașilor">
          <Textarea rows={3} className={input} placeholder="Ex: Andreea și Vlad Marin"
            value={data.godparentsNames} onChange={(e) => set("godparentsNames", e.target.value)} />
        </Field>
      </Card>
    </>
  );
}

/* -------------- Places tab -------------- */

function PlacesTab({ data, set }: { data: Data; set: <K extends keyof Data>(k: K, v: Data[K]) => void }) {
  return (
    <>
      <Card title="Cununia civilă" hint="Lasă necompletată dacă nu o vrei în invitație.">
        <Field label="Denumire local">
          <Input className={input} value={data.civilVenue} onChange={(e) => set("civilVenue", e.target.value)} />
        </Field>
        <Row>
          <Field label="Adresa">
            <Input className={input} value={data.civilAddress} onChange={(e) => set("civilAddress", e.target.value)} />
          </Field>
          <Field label="Orașul și țara">
            <Input className={input} value={data.civilCity} onChange={(e) => set("civilCity", e.target.value)} />
          </Field>
        </Row>
        <Field label="Data și ora">
          <Input className={input} placeholder="2026/05/09 16:00" value={data.civilDate}
            onChange={(e) => set("civilDate", e.target.value)} />
        </Field>
      </Card>

      <Card title="Cununia religioasă" hint="Lasă necompletată dacă nu o vrei în invitație.">
        <Field label="Locație cununie religioasă">
          <Input className={input} value={data.religiousVenue}
            onChange={(e) => set("religiousVenue", e.target.value)} />
        </Field>
        <Row>
          <Field label="Adresa">
            <Input className={input} value={data.religiousAddress}
              onChange={(e) => set("religiousAddress", e.target.value)} />
          </Field>
          <Field label="Orașul și țara">
            <Input className={input} value={data.religiousCity}
              onChange={(e) => set("religiousCity", e.target.value)} />
          </Field>
        </Row>
        <Field label="Data și ora">
          <Input className={input} value={data.religiousDate}
            onChange={(e) => set("religiousDate", e.target.value)} />
        </Field>
      </Card>

      <Card title="Petrecerea">
        <Field label="Denumire local">
          <Input className={input} value={data.partyVenue} onChange={(e) => set("partyVenue", e.target.value)} />
        </Field>
        <Row>
          <Field label="Adresa">
            <Input className={input} value={data.partyAddress}
              onChange={(e) => set("partyAddress", e.target.value)} />
          </Field>
          <Field label="Orașul și țara">
            <Input className={input} value={data.partyCity}
              onChange={(e) => set("partyCity", e.target.value)} />
          </Field>
        </Row>
        <Field label="Data și ora">
          <Input className={input} value={data.partyDate}
            onChange={(e) => set("partyDate", e.target.value)} />
        </Field>
      </Card>
    </>
  );
}

/* -------------- Program & menu tab -------------- */

/** Edits a list of rows: each row gets ↑ ↓ ✕ controls and the list gets an "add" button. */
function useListEditor<T>(items: T[], onChange: (next: T[]) => void, blank: T) {
  const patch = (i: number, p: Partial<T>) => onChange(items.map((x, j) => (j === i ? { ...x, ...p } : x)));
  const remove = (i: number) => onChange(items.filter((_, j) => j !== i));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  const add = () => onChange([...items, { ...blank }]);
  return { patch, remove, move, add };
}

function RowControls({ i, n, move, remove }: { i: number; n: number; move: (i: number, d: -1 | 1) => void; remove: (i: number) => void }) {
  return (
    <div className="flex items-center gap-1">
      <Button type="button" variant="outline" size="icon" disabled={i === 0} onClick={() => move(i, -1)}
        className="h-8 w-8 rounded-full bg-transparent shadow-none" title="Sus">↑</Button>
      <Button type="button" variant="outline" size="icon" disabled={i === n - 1} onClick={() => move(i, 1)}
        className="h-8 w-8 rounded-full bg-transparent shadow-none" title="Jos">↓</Button>
      <Button type="button" variant="outline" size="icon" onClick={() => remove(i)}
        className="h-8 w-8 rounded-full bg-transparent shadow-none hover:text-destructive" title="Șterge">✕</Button>
    </div>
  );
}

function ProgramTab({ data, set, model }: { data: Data; set: <K extends keyof Data>(k: K, v: Data[K]) => void; model?: string }) {
  const illustrated = model === MIDNIGHT_SLUG; // only Midnight Garden draws an illustration per moment
  const sched = useListEditor<ScheduleItem>(data.schedule, (v) => set("schedule", v), {
    time: "", title: "", desc: "", icon: "clock",
  });
  const menu = useListEditor<MenuCourse>(data.menuCourses, (v) => set("menuCourses", v), {
    label: "", text: "", note: "",
  });
  return (
    <>
      <Card title="Programul serii" hint="Cronologia evenimentelor, afișată cu ilustrații în invitație.">
        <Row>
          <Field label="Titlu">
            <Input className={input} value={data.scheduleTitle} onChange={(e) => set("scheduleTitle", e.target.value)} />
          </Field>
          <Field label="Notă de final">
            <Input className={input} value={data.scheduleNote} onChange={(e) => set("scheduleNote", e.target.value)} />
          </Field>
        </Row>
        <div className="space-y-3">
          {data.schedule.map((it, i) => (
            <div key={i} className="rounded-md border border-border bg-ivory p-4 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{i + 1}</span>
                <RowControls i={i} n={data.schedule.length} move={sched.move} remove={sched.remove} />
              </div>
              <Row>
                <Field label="Ora">
                  <Input type="time" className={input} value={it.time} onChange={(e) => sched.patch(i, { time: e.target.value })} />
                </Field>
                {illustrated && (
                  <Field label="Ilustrație">
                    <select
                      className={input}
                      value={it.icon}
                      onChange={(e) => sched.patch(i, { icon: e.target.value as IconKey })}
                    >
                      {ICON_OPTIONS.map((o) => (
                        <option key={o.id} value={o.id}>{o.label}</option>
                      ))}
                    </select>
                  </Field>
                )}
              </Row>
              <Field label="Titlu moment">
                <Input className={input} value={it.title} onChange={(e) => sched.patch(i, { title: e.target.value })} />
              </Field>
              <Field label="Descriere">
                <Input className={input} value={it.desc} onChange={(e) => sched.patch(i, { desc: e.target.value })} />
              </Field>
            </div>
          ))}
        </div>
        <Button type="button" variant="outline" onClick={sched.add}
          className="h-auto w-full rounded-md border-dashed bg-secondary/30 p-4 font-normal text-muted-foreground shadow-none hover:border-champagne hover:bg-secondary/30 hover:text-foreground">
          + Adaugă moment
        </Button>
      </Card>

      {illustrated && (
      <Card title="Meniul" hint="Felurile de mâncare, afișate într-un cadru ornamental.">
        <Row>
          <Field label="Titlu">
            <Input className={input} value={data.menuTitle} onChange={(e) => set("menuTitle", e.target.value)} />
          </Field>
          <Field label="Subtitlu" hint="Ex: locația și ora cinei">
            <Input className={input} value={data.menuSubtitle} onChange={(e) => set("menuSubtitle", e.target.value)} />
          </Field>
        </Row>
        <div className="space-y-3">
          {data.menuCourses.map((c, i) => (
            <div key={i} className="rounded-md border border-border bg-ivory p-4 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{i + 1}</span>
                <RowControls i={i} n={data.menuCourses.length} move={menu.move} remove={menu.remove} />
              </div>
              <Field label="Denumire fel" hint="Ex: Pentru început, Fel principal">
                <Input className={input} value={c.label} onChange={(e) => menu.patch(i, { label: e.target.value })} />
              </Field>
              <Field label="Preparat">
                <Textarea rows={2} className={input} value={c.text} onChange={(e) => menu.patch(i, { text: e.target.value })} />
              </Field>
              <Field label="Mențiune" hint="Linia mică, cursivă. Ex: varianta vegetariană">
                <Input className={input} value={c.note} onChange={(e) => menu.patch(i, { note: e.target.value })} />
              </Field>
            </div>
          ))}
        </div>
        <Button type="button" variant="outline" onClick={menu.add}
          className="h-auto w-full rounded-md border-dashed bg-secondary/30 p-4 font-normal text-muted-foreground shadow-none hover:border-champagne hover:bg-secondary/30 hover:text-foreground">
          + Adaugă fel de mâncare
        </Button>
      </Card>
      )}
    </>
  );
}

/* -------------- Event details tab (Burgundy Seal) -------------- */

function EventDetailsTab({ data, set }: { data: Data; set: <K extends keyof Data>(k: K, v: Data[K]) => void }) {
  const colors = data.dressColors;
  const setColor = (i: number, c: string) => set("dressColors", colors.map((x, j) => (j === i ? c : x)));
  return (
    <>
      <Card title="Dress code" hint="Paleta de culori recomandată invitaților.">
        <div className="flex flex-wrap items-center gap-3">
          {colors.map((c, i) => (
            <div key={i} className="relative">
              <input
                type="color"
                value={c}
                onChange={(e) => setColor(i, e.target.value)}
                aria-label={`Culoarea ${i + 1}`}
                className="h-12 w-12 cursor-pointer rounded-full border border-border bg-transparent p-0"
              />
              <button
                type="button"
                title="Șterge"
                onClick={() => set("dressColors", colors.filter((_, j) => j !== i))}
                className="absolute -right-1 -top-1 h-5 w-5 rounded-full border border-border bg-card text-[10px] leading-none hover:text-destructive"
              >✕</button>
            </div>
          ))}
          {colors.length < 8 && (
            <Button type="button" variant="outline" onClick={() => set("dressColors", [...colors, "#ffffff"])}
              className="h-12 w-12 rounded-full border-dashed bg-transparent p-0 text-lg shadow-none">+</Button>
          )}
        </div>
        <Field label="Mențiune dress code" hint="Opțional. Ex: ținută de seară">
          <Input className={input} value={data.dressNote} onChange={(e) => set("dressNote", e.target.value)} />
        </Field>
      </Card>

      <Card title="Cazare" hint="Hotelul recomandat invitaților.">
        <Row>
          <Field label="Denumire hotel">
            <Input className={input} value={data.hotelName} onChange={(e) => set("hotelName", e.target.value)} />
          </Field>
          <Field label="Telefon">
            <Input className={input} value={data.hotelPhone} onChange={(e) => set("hotelPhone", e.target.value)} />
          </Field>
        </Row>
      </Card>

      <Card title="Poza de mulțumire" hint="Apare la finalul invitației, în alb-negru.">
        <ImagePicker value={data.thanksImage} onChange={(v) => set("thanksImage", v)} />
      </Card>

      <Card title="Plicul de deschidere">
        <Toggle label="Arată plicul cu sigiliu la deschiderea invitației" value={data.envelope} onChange={(v) => set("envelope", v)} />
      </Card>
    </>
  );
}

/* -------------- Custom tab -------------- */

function CustomTab({ data, set }: { data: Data; set: <K extends keyof Data>(k: K, v: Data[K]) => void }) {
  return (
    <>
      <Card title="Secțiune descriere">
        <Field label="Titlu">
          <Input className={input} value={data.storyTitle} onChange={(e) => set("storyTitle", e.target.value)} />
        </Field>
        <Field label="Text mesaj personalizat">
          <Textarea rows={5} className={input} value={data.storyText}
            onChange={(e) => set("storyText", e.target.value)} />
        </Field>
        <Field label='ID video Youtube' hint='Doar codul, ex: Lvy4vG4Ns94'>
          <Input className={input} placeholder="Lvy4vG4Ns94" value={data.youtubeId}
            onChange={(e) => set("youtubeId", e.target.value)} />
        </Field>
      </Card>

      <Card title="Secțiune mulțumire">
        <Field label="Titlu">
          <Input className={input} value={data.thanksTitle} onChange={(e) => set("thanksTitle", e.target.value)} />
        </Field>
        <Field label="Mesaj">
          <Textarea rows={3} className={input} value={data.thanksText}
            onChange={(e) => set("thanksText", e.target.value)} />
        </Field>
      </Card>

      <Card title="Opțiuni confirmare">
        <Field label="Termen limită confirmare">
          <Input type="date" className={input} value={data.rsvpDeadline}
            onChange={(e) => set("rsvpDeadline", e.target.value)} />
        </Field>
        <Toggle label="Întreabă numărul de persoane" value={data.askPeople} onChange={(v) => set("askPeople", v)} />
        <Toggle label="Întreabă preferințele de meniu" value={data.askMenu} onChange={(v) => set("askMenu", v)} />
      </Card>

      <Card title="Galerie foto">
        <Button variant="outline" className="h-auto w-full rounded-md border-dashed bg-secondary/30 p-8 font-normal text-muted-foreground shadow-none hover:border-champagne hover:bg-secondary/30 hover:text-foreground">
          + Adaugă fotografii
        </Button>
      </Card>

      <Card title="Muzică de fundal">
        <Button variant="outline" className="h-auto w-full rounded-md border-dashed bg-secondary/30 p-6 font-normal text-muted-foreground shadow-none hover:border-champagne hover:bg-secondary/30 hover:text-foreground">
          ♫  Alege o melodie
        </Button>
      </Card>
    </>
  );
}

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  const id = useId();
  return (
    <div className="w-full flex items-center justify-between py-2">
      <Label htmlFor={id} className="text-sm font-normal cursor-pointer">{label}</Label>
      <Switch id={id} checked={value} onCheckedChange={onChange} className="data-[state=checked]:bg-noir data-[state=unchecked]:bg-border" />
    </div>
  );
}

/* -------------- Image picker -------------- */

function ImagePicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [tab, setTab] = useState<"gallery" | "details">("gallery");
  const [dims, setDims] = useState<{ w: number; h: number } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const isUpload = value.startsWith("data:");
  // data URL → approx. bytes (base64 is 4 chars per 3 bytes)
  const sizeKb = isUpload ? Math.round(((value.length - value.indexOf(",") - 1) * 3) / 4 / 1024) : null;
  const detailRows: Array<[string, string]> = value
    ? [
        ["Sursă", isUpload ? "Încărcată de tine" : "Galerie"],
        ["Dimensiuni", dims ? `${dims.w} × ${dims.h} px` : "—"],
        ...(sizeKb !== null ? ([["Mărime", `${sizeKb} KB`]] as Array<[string, string]>) : []),
      ]
    : [];

  const onFile = (f: File | undefined) => {
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => onChange(String(reader.result));
    reader.readAsDataURL(f);
  };

  return (
    <div className="rounded-md border border-dashed border-border bg-secondary/20 p-4">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-noir">
        {value ? (
          <img
            src={value} alt="" className="h-full w-full object-cover"
            onLoad={(e) => setDims({ w: e.currentTarget.naturalWidth, h: e.currentTarget.naturalHeight })}
          />
        ) : (
          <div className="h-full w-full grid place-items-center text-ivory/40 text-sm">Fără imagine</div>
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          variant={tab === "gallery" ? "default" : "secondary"}
          onClick={() => setTab("gallery")}
          className={`h-auto rounded-[4px] px-4 py-2 shadow-none ${
            tab === "gallery" ? "bg-noir text-ivory hover:bg-noir" : "text-foreground"
          }`}
        >
          🖼  Galerie
        </Button>
        <Button
          type="button"
          size="sm"
          variant="secondary"
          onClick={() => fileRef.current?.click()}
          className="h-auto rounded-[4px] px-4 py-2 text-foreground shadow-none"
        >
          ↑  Încarcă poză
        </Button>
        <Button
          type="button"
          size="sm"
          variant={tab === "details" ? "default" : "secondary"}
          onClick={() => setTab("details")}
          className={`h-auto rounded-[4px] px-4 py-2 shadow-none ${
            tab === "details" ? "bg-noir text-ivory hover:bg-noir" : "text-foreground"
          }`}
        >
          ⓘ  Details
        </Button>
        <Button
          type="button"
          size="sm"
          variant="secondary"
          onClick={() => onChange("")}
          className="h-auto rounded-[4px] px-4 py-2 text-muted-foreground shadow-none hover:text-destructive"
        >
          🗑  Șterge
        </Button>
        <input
          ref={fileRef} type="file" accept="image/*" className="hidden"
          onChange={(e) => onFile(e.target.files?.[0])}
        />
      </div>

      {tab === "gallery" && (
        <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-2">
          {GALLERY.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onChange(src)}
              className={`relative aspect-square overflow-hidden rounded-lg border-2 transition ${
                value === src ? "border-champagne" : "border-transparent hover:border-border"
              }`}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
      {tab === "details" && (
        <dl className="mt-4 divide-y divide-border rounded-lg border border-border bg-background text-sm">
          {detailRows.length === 0 ? (
            <p className="px-4 py-3 text-muted-foreground">Fără imagine</p>
          ) : (
            detailRows.map(([k, v]) => (
              <div key={k} className="flex justify-between px-4 py-2">
                <dt className="text-muted-foreground">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))
          )}
        </dl>
      )}
      <p className="mt-3 text-[10px] text-muted-foreground">
        * Prin încărcarea pozelor, confirmi că imaginile îți aparțin și nu încalcă restricții de drept de autor.
      </p>
    </div>
  );
}

/* -------------- Sections tab (reorder + toggle) -------------- */

function SectionsTab({ sections, onChange }: { sections: Section[]; onChange: (s: Section[]) => void }) {
  const move = (idx: number, dir: -1 | 1) => {
    const next = [...sections];
    const j = idx + dir;
    if (j < 0 || j >= next.length) return;
    [next[idx], next[j]] = [next[j], next[idx]];
    onChange(next);
  };
  const toggle = (idx: number) => {
    const next = [...sections];
    next[idx] = { ...next[idx], enabled: !next[idx].enabled };
    onChange(next);
  };
  const setBg = (idx: number, bgImage: string) => {
    const next = [...sections];
    next[idx] = { ...next[idx], bgImage: bgImage || undefined };
    onChange(next);
  };
  const [openBg, setOpenBg] = useState<string | null>(null);

  return (
    <Card title="Secțiuni invitație" hint="Rearanjează ordinea, dezactivează secțiuni sau alege o imagine de fundal pentru fiecare">
      <ul className="space-y-2">
        {sections.map((s, i) => (
          <li
            key={s.key}
            className={`rounded-md border border-border bg-ivory px-4 py-3 transition ${
              s.enabled ? "" : "opacity-50"
            }`}
          >
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground cursor-grab select-none">⋮⋮</span>
            <span className="font-serif text-lg flex-1">{s.label}</span>
            {s.key !== "hero" && (
              <Button
                size="sm"
                variant={openBg === s.key ? "default" : "secondary"}
                onClick={() => setOpenBg(openBg === s.key ? null : s.key)}
                className={`h-auto rounded-[4px] px-3 py-1 shadow-none ${
                  openBg === s.key ? "bg-noir text-ivory hover:bg-noir" : "text-foreground"
                }`}
              >
                🖼  Fundal{s.bgImage ? " ✓" : ""}
              </Button>
            )}
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                onClick={() => move(i, -1)}
                disabled={i === 0}
                className="h-8 w-8 rounded-full bg-transparent shadow-none"
                title="Sus"
              >↑</Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => move(i, 1)}
                disabled={i === sections.length - 1}
                className="h-8 w-8 rounded-full bg-transparent shadow-none"
                title="Jos"
              >↓</Button>
              <Button
                size="sm"
                variant={s.enabled ? "default" : "secondary"}
                onClick={() => toggle(i)}
                className={`ml-2 h-auto rounded-[4px] px-3 py-1 shadow-none ${
                  s.enabled ? "bg-noir text-ivory hover:bg-noir" : "text-muted-foreground"
                }`}
              >
                {s.enabled ? "Activă" : "Ascunsă"}
              </Button>
            </div>
          </div>
          {s.key !== "hero" && openBg === s.key && (
            <div className="mt-3">
              <ImagePicker value={s.bgImage ?? ""} onChange={(v) => setBg(i, v)} />
            </div>
          )}
          </li>
        ))}
      </ul>
    </Card>
  );
}
