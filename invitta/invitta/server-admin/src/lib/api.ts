export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public details?: unknown,
  ) {
    super(message);
  }
}

/** Thin fetch wrapper. Requests go to /api/*, which next.config.ts proxies to server-app. */
export async function api<T>(path: string, init: { method?: string; body?: unknown } = {}): Promise<T> {
  const res = await fetch(`/api${path}`, {
    method: init.method ?? (init.body !== undefined ? "POST" : "GET"),
    headers: init.body !== undefined ? { "content-type": "application/json" } : undefined,
    body: init.body !== undefined ? JSON.stringify(init.body) : undefined,
    credentials: "same-origin",
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new ApiError(res.status, data?.error ?? "A apărut o eroare.", data?.details);
  return data as T;
}

/* ---------- Response shapes (mirror server-app) ---------- */

export type ApiUser = { id: string; email: string; name: string; phone: string | null };
export type InvitationSummary = { id: string; slug: string; modelSlug: string };
export type MeResponse = { user: ApiUser | null; invitations: InvitationSummary[] };

export type Invitation = InvitationSummary & {
  userId: string;
  content: Record<string, any>;
  createdAt: string;
  updatedAt: string;
};

export type RsvpStatus = "confirmat" | "asteptare" | "refuzat";
export type MenuType = "standard" | "vegetarian" | "vegan";
export type TableShape = "round" | "rect" | "square" | "oval" | "presidium";

export type GuestMember = { id: string; name: string; isPartner: boolean; tableId: string | null };
export type GuestGroup = {
  id: string;
  name: string;
  status: RsvpStatus;
  people: number;
  menu: MenuType | null;
  message: string | null;
  members: GuestMember[];
  /** When the answer arrived (ISO string). */
  createdAt: string;
};
export type SeatingTable = {
  id: string;
  name: string;
  seats: number;
  shape: TableShape;
  color: string;
  notes: string | null;
  guests: { id: string; name: string }[];
};
export type Stats = { confirmed: number; pending: number; declined: number; total: number };
export type InvoiceRow = {
  id: string;
  number: string;
  plan: string;
  amountCents: number;
  currency: string;
  issuedAt: string;
};
