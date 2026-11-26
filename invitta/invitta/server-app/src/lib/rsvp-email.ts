import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { guestGroups, invitations, users } from "@/db/schema";
import { sendMail } from "@/lib/mailer";

const MENU: Record<string, string> = { standard: "Standard", vegetarian: "Vegetarian", vegan: "Vegan" };
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export type NewAnswer = { name: string; attend: boolean; people: number; menu: string | null; message: string | null };

/**
 * Tells the couple (the account that owns the invitation) that a guest just answered:
 * who, how many people, the menu and message, plus the running total of confirmed guests.
 */
export async function emailCoupleAboutAnswer(invitationId: string, a: NewAnswer): Promise<void> {
  const [owner] = await db
    .select({ email: users.email, name: users.name })
    .from(invitations)
    .innerJoin(users, eq(users.id, invitations.userId))
    .where(eq(invitations.id, invitationId))
    .limit(1);
  if (!owner) return;

  const groups = await db
    .select({ name: guestGroups.name, status: guestGroups.status, people: guestGroups.people, menu: guestGroups.menu })
    .from(guestGroups)
    .where(eq(guestGroups.invitationId, invitationId));
  const confirmed = groups.filter((g) => g.status === "confirmat");
  const total = confirmed.reduce((n, g) => n + g.people, 0);

  const dashboard = `${process.env.APP_URL || "http://localhost:3000"}/dashboard/rsvp`;
  const subject = a.attend
    ? `${a.name} a confirmat prezența (${a.people} ${a.people === 1 ? "persoană" : "persoane"})`
    : `${a.name} nu poate ajunge`;

  const details: Array<[string, string]> = a.attend
    ? [
        ["Invitat", a.name],
        ["Număr de persoane", String(a.people)],
        ["Meniu", a.menu ? (MENU[a.menu] ?? a.menu) : "—"],
        ...(a.message ? ([["Mesaj", a.message]] as Array<[string, string]>) : []),
      ]
    : [["Invitat", a.name], ["Răspuns", "Nu poate ajunge"], ...(a.message ? ([["Mesaj", a.message]] as Array<[string, string]>) : [])];

  const summary = `Total confirmat până acum: ${total} ${total === 1 ? "persoană" : "persoane"} (${confirmed.length} ${confirmed.length === 1 ? "răspuns" : "răspunsuri"}).`;
  const list = confirmed.map((g) => `${g.name}: ${g.people}${g.menu ? `, ${MENU[g.menu] ?? g.menu}` : ""}`);

  const text = [
    `Salut${owner.name ? `, ${owner.name}` : ""}!`,
    "",
    a.attend ? "Un invitat a confirmat prezența:" : "Un invitat a răspuns:",
    ...details.map(([k, v]) => `- ${k}: ${v}`),
    "",
    summary,
    ...(list.length ? ["", "Persoanele confirmate:", ...list.map((l) => `• ${l}`)] : []),
    "",
    `Vezi toate confirmările: ${dashboard}`,
  ].join("\n");

  const html = `<div style="font-family:Georgia,serif;max-width:520px;margin:auto;color:#1a1a1a">
  <p style="font-size:13px;letter-spacing:.25em;text-transform:uppercase;color:#8a8a8a;margin:0">Invitta RSVP</p>
  <h2 style="font-weight:400;margin:8px 0 18px">${esc(a.attend ? "Confirmare nouă" : "Răspuns nou")}</h2>
  <table style="width:100%;border-collapse:collapse;font-size:15px">
    ${details
      .map(([k, v]) => `<tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#8a8a8a;width:42%">${esc(k)}</td><td style="padding:8px 0;border-bottom:1px solid #eee">${esc(v)}</td></tr>`)
      .join("")}
  </table>
  <p style="margin:20px 0 6px;font-size:15px"><strong>${esc(summary)}</strong></p>
  ${list.length ? `<ul style="padding-left:18px;margin:8px 0;font-size:14px;color:#444">${list.map((l) => `<li>${esc(l)}</li>`).join("")}</ul>` : ""}
  <p style="margin-top:24px"><a href="${esc(dashboard)}" style="background:#1a1a1a;color:#fff;text-decoration:none;padding:12px 22px;border-radius:4px;font-size:14px">Vezi toate confirmările</a></p>
</div>`;

  await sendMail({ to: owner.email, subject, text, html });
}
