import { eq } from "drizzle-orm";
import { after } from "next/server";
import { z } from "zod";
import { db } from "@/db/client";
import { guestGroups, guests, invitations } from "@/db/schema";
import { ApiError, json, parseBody, route, type SlugParams } from "@/lib/http";
import { emailCoupleAboutAnswer } from "@/lib/rsvp-email";

const Body = z.object({
  name: z.string().trim().min(1).max(160),
  attend: z.boolean(),
  people: z.number().int().min(1).max(10).default(1),
  menu: z.enum(["standard", "vegetarian", "vegan"]).nullable().optional(),
  message: z.string().trim().max(2000).nullable().optional(),
});

/** Public (no auth): a guest answers the invitation. Creates an RSVP entry the couple sees in the dashboard. */
export const POST = route<SlugParams>(async (req, { params }) => {
  const { slug } = await params;
  const [inv] = await db.select({ id: invitations.id }).from(invitations).where(eq(invitations.slug, slug)).limit(1);
  if (!inv) throw new ApiError(404, "Invitația nu a fost găsită.");
  const body = await parseBody(req, Body);

  const people = body.attend ? body.people : 0;
  await db.transaction(async (tx) => {
    const [group] = await tx
      .insert(guestGroups)
      .values({
        invitationId: inv.id,
        name: body.name,
        status: body.attend ? "confirmat" : "refuzat",
        people,
        menu: body.attend ? (body.menu ?? "standard") : null,
        message: body.message || null,
      })
      .returning();
    // One seatable person per attendee: the guest, then "+1", "+2"…
    const seats = Math.max(1, people);
    await tx.insert(guests).values(
      Array.from({ length: seats }, (_, i) => ({
        groupId: group.id,
        invitationId: inv.id,
        name: i === 0 ? body.name : `${body.name} +${i}`,
        isPartner: i > 0,
        position: i,
      })),
    );
  });
  // After the guest got their answer: email the couple. A mail problem must never fail the RSVP.
  after(async () => {
    try {
      await emailCoupleAboutAnswer(inv.id, {
        name: body.name,
        attend: body.attend,
        people,
        menu: body.attend ? (body.menu ?? "standard") : null,
        message: body.message || null,
      });
    } catch (e) {
      console.error("[rsvp-email] could not notify the couple:", e);
    }
  });
  return json({ ok: true }, { status: 201 });
});
