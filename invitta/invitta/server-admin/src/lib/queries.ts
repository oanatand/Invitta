"use client";

import { useQuery } from "@tanstack/react-query";
import { api, type GuestGroup, type InvoiceRow, type Invitation, type SeatingTable, type Stats } from "./api";

export const qk = {
  invitation: (id?: string) => ["invitation", id] as const,
  stats: (id?: string) => ["stats", id] as const,
  groups: (id?: string) => ["guest-groups", id] as const,
  tables: (id?: string) => ["tables", id] as const,
  invoices: ["invoices"] as const,
};

/** Guests answer at any time, so the couple's RSVP numbers refresh on their own (and when the tab regains focus). */
const LIVE = { refetchInterval: 10_000, refetchOnWindowFocus: true } as const;

export const useInvitation = (id?: string) =>
  useQuery({
    queryKey: qk.invitation(id),
    queryFn: async () => (await api<{ invitation: Invitation }>(`/invitations/${id}`)).invitation,
    enabled: !!id,
  });

export const useStats = (id?: string) =>
  useQuery({
    queryKey: qk.stats(id),
    queryFn: () => api<Stats>(`/invitations/${id}/stats`),
    enabled: !!id,
    ...LIVE,
  });

export const useGuestGroups = (id?: string) =>
  useQuery({
    queryKey: qk.groups(id),
    queryFn: async () => (await api<{ groups: GuestGroup[] }>(`/invitations/${id}/guest-groups`)).groups,
    enabled: !!id,
    ...LIVE,
  });

export const useTables = (id?: string) =>
  useQuery({
    queryKey: qk.tables(id),
    queryFn: async () => (await api<{ tables: SeatingTable[] }>(`/invitations/${id}/tables`)).tables,
    enabled: !!id,
  });

export const useInvoices = () =>
  useQuery({
    queryKey: qk.invoices,
    queryFn: async () => (await api<{ invoices: InvoiceRow[] }>("/invoices")).invoices,
  });

/** Whole days from today until `date` (YYYY-MM-DD), or null when unknown. */
export function daysUntil(date: unknown): number | null {
  if (typeof date !== "string" || !date) return null;
  const target = new Date(`${date.slice(0, 10)}T00:00:00`);
  if (Number.isNaN(target.getTime())) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - today.getTime()) / 86_400_000);
}
