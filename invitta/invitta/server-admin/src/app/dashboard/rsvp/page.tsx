"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { api, type GuestGroup, type RsvpStatus } from "@/lib/api";
import { qk, useGuestGroups, useTables } from "@/lib/queries";
import { useSession } from "@/lib/session";

const statusLabel: Record<RsvpStatus, string> = {
  confirmat: "Confirmat",
  asteptare: "În așteptare",
  refuzat: "Refuzat",
};
const statusClass: Record<RsvpStatus, string> = {
  confirmat: "bg-champagne/20 text-foreground",
  asteptare: "bg-secondary text-muted-foreground",
  refuzat: "bg-destructive/10 text-destructive",
};

const menuLabel: Record<string, string> = { standard: "Standard", vegetarian: "Vegetarian", vegan: "Vegan" };

/** "12 nov., 18:42": when the guest answered. */
const received = (iso: string) =>
  new Date(iso).toLocaleString("ro-RO", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

const csvCell = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;

export default function RsvpPage() {
  const session = useSession();
  const invitationId = session?.invitation?.id;
  const qc = useQueryClient();
  const { data: groups = [], isPending } = useGuestGroups(invitationId);
  const { data: tables = [] } = useTables(invitationId);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"toti" | RsvpStatus>("toti");
  const [adding, setAdding] = useState(false);

  const tableName = useMemo(() => {
    const names = new Map(tables.map((t) => [t.id, t.name]));
    return (g: GuestGroup) => {
      const ids = new Set(g.members.map((m) => m.tableId).filter(Boolean) as string[]);
      return [...ids].map((id) => names.get(id)).filter(Boolean).join(", ");
    };
  }, [tables]);

  const refresh = () => {
    qc.invalidateQueries({ queryKey: qk.groups(invitationId) });
    qc.invalidateQueries({ queryKey: qk.stats(invitationId) });
    qc.invalidateQueries({ queryKey: qk.tables(invitationId) });
  };

  const setStatus = useMutation({
    mutationFn: (v: { id: string; status: RsvpStatus }) =>
      api(`/guest-groups/${v.id}`, { method: "PATCH", body: { status: v.status } }),
    onSuccess: refresh,
  });
  const remove = useMutation({
    mutationFn: (id: string) => api(`/guest-groups/${id}`, { method: "DELETE" }),
    onSuccess: refresh,
  });

  const visible = groups.filter(
    (g) =>
      (filter === "toti" || g.status === filter) &&
      g.name.toLowerCase().includes(search.toLowerCase()),
  );

  const exportCsv = () => {
    const rows = [
      ["Nume", "Status", "Persoane", "Masă", "Meniu", "Mesaj", "Primit"],
      ...groups.map((g) => [
        g.name,
        statusLabel[g.status],
        g.people,
        tableName(g),
        g.menu ? (menuLabel[g.menu] ?? g.menu) : "",
        g.message ?? "",
        g.createdAt ? received(g.createdAt) : "",
      ]),
    ];
    const blob = new Blob(["﻿" + rows.map((r) => r.map(csvCell).join(",")).join("\n")], {
      type: "text/csv;charset=utf-8",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "invitati.csv";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Confirmări</p>
          <h1 className="mt-2 font-serif text-4xl">Invitații voștri</h1>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => setAdding((a) => !a)} className="rounded-[4px] px-5 py-2.5 h-auto">
            {adding ? "Închide" : "Adaugă invitat"}
          </Button>
          <Button variant="outline" onClick={exportCsv} className="rounded-full bg-card px-5 py-2.5 h-auto hover:bg-secondary">
            Exportă lista
          </Button>
        </div>
      </div>

      {adding && invitationId && (
        <AddGuestForm invitationId={invitationId} onDone={() => { refresh(); setAdding(false); }} />
      )}

      <div className="flex flex-wrap gap-3 items-center mb-8">
        <Input
          placeholder="Caută invitat..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[200px] h-auto rounded-full border-border bg-card px-5 py-3 text-sm focus-visible:border-champagne"
        />
        <div className="flex gap-2 flex-wrap">
          {(["toti", "confirmat", "asteptare", "refuzat"] as const).map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              onClick={() => setFilter(f)}
              className={`rounded-[4px] px-4 py-2 h-auto shadow-none ${filter === f ? "bg-noir text-ivory hover:bg-noir" : "bg-card border-border text-muted-foreground hover:text-foreground hover:bg-card"}`}
            >
              {f === "toti" ? "Toți" : statusLabel[f]}
            </Button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-md border border-border bg-card">
        <Table className="w-full text-sm">
          <TableHeader className="bg-secondary/50 text-xs uppercase tracking-[0.15em] text-muted-foreground">
            <TableRow>
              <TableHead className="text-left font-normal px-6 py-4 h-auto">Nume</TableHead>
              <TableHead className="text-left font-normal px-6 py-4 h-auto">Status</TableHead>
              <TableHead className="text-left font-normal px-6 py-4 h-auto">Persoane</TableHead>
              <TableHead className="text-left font-normal px-6 py-4 h-auto">Masă</TableHead>
              <TableHead className="text-left font-normal px-6 py-4 h-auto">Meniu</TableHead>
              <TableHead className="text-left font-normal px-6 py-4 h-auto">Mesaj</TableHead>
              <TableHead className="text-left font-normal px-6 py-4 h-auto">Primit</TableHead>
              <TableHead className="px-6 py-4 h-auto" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {visible.map((g) => (
              <TableRow key={g.id} className="border-t border-border hover:bg-secondary/30 transition-colors">
                <TableCell className="px-6 py-5">
                  <span className="font-serif text-lg">{g.name}</span>
                </TableCell>
                <TableCell className="px-6 py-5">
                  <Select
                    value={g.status}
                    onValueChange={(v) => setStatus.mutate({ id: g.id, status: v as RsvpStatus })}
                  >
                    <SelectTrigger
                      className={`h-auto w-auto rounded-[4px] border-0 px-3 py-1 text-xs shadow-none ${statusClass[g.status]}`}
                      aria-label="Status"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {(Object.keys(statusLabel) as RsvpStatus[]).map((s) => (
                        <SelectItem key={s} value={s}>{statusLabel[s]}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="px-6 py-5">{g.people}</TableCell>
                <TableCell className="px-6 py-5 text-muted-foreground">{tableName(g) || "—"}</TableCell>
                <TableCell className="px-6 py-5 text-muted-foreground">{g.menu ? (menuLabel[g.menu] ?? g.menu) : "—"}</TableCell>
                <TableCell className="px-6 py-5 max-w-[16rem] text-muted-foreground">
                  {g.message ? <span className="text-xs">„{g.message}”</span> : "—"}
                </TableCell>
                <TableCell className="whitespace-nowrap px-6 py-5 text-xs text-muted-foreground">
                  {g.createdAt ? received(g.createdAt) : "—"}
                </TableCell>
                <TableCell className="px-6 py-5 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => { if (confirm(`Ștergi „${g.name}”?`)) remove.mutate(g.id); }}
                    className="h-auto px-0 text-xs text-muted-foreground hover:bg-transparent hover:text-destructive"
                  >
                    Șterge
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {!isPending && visible.length === 0 && (
              <TableRow><TableCell colSpan={8} className="px-6 py-16 text-center text-muted-foreground">Niciun invitat găsit.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function AddGuestForm({ invitationId, onDone }: { invitationId: string; onDone: () => void }) {
  const [name, setName] = useState("");
  const [partner, setPartner] = useState("");
  const add = useMutation({
    mutationFn: () =>
      api(`/invitations/${invitationId}/guest-groups`, {
        body: {
          name,
          status: "asteptare",
          people: partner.trim() ? 2 : 1,
          members: [{ name }, ...(partner.trim() ? [{ name: partner.trim(), isPartner: true }] : [])],
        },
      }),
    onSuccess: onDone,
  });
  const submit = (e: FormEvent) => {
    e.preventDefault();
    add.mutate();
  };
  const field = "h-auto w-full rounded-xl border-border bg-card px-4 py-3 text-sm focus-visible:border-champagne";
  return (
    <form onSubmit={submit} className="mb-8 grid gap-4 rounded-md border border-border bg-card p-6 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
      <div>
        <Label htmlFor="guest-name" className="text-xs font-normal uppercase tracking-[0.2em] text-muted-foreground">Nume invitat sau familie</Label>
        <Input id="guest-name" required value={name} onChange={(e) => setName(e.target.value)} className={`${field} mt-2`} />
      </div>
      <div>
        <Label htmlFor="guest-partner" className="text-xs font-normal uppercase tracking-[0.2em] text-muted-foreground">Partener (opțional)</Label>
        <Input id="guest-partner" value={partner} onChange={(e) => setPartner(e.target.value)} className={`${field} mt-2`} />
      </div>
      <Button type="submit" disabled={add.isPending} className="rounded-[4px] px-6 py-3 h-auto">
        Adaugă
      </Button>
      {add.error && <p role="alert" className="text-sm text-destructive sm:col-span-3">{add.error.message}</p>}
    </form>
  );
}
