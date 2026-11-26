import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db/client";
import { invitations, users } from "@/db/schema";
import { publicUser, startSession, verifyPassword } from "@/lib/auth";
import { ApiError, json, parseBody, route } from "@/lib/http";

const Body = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1).max(200),
});

export const POST = route(async (req) => {
  const body = await parseBody(req, Body);
  const [user] = await db.select().from(users).where(eq(users.email, body.email)).limit(1);
  if (!user || !(await verifyPassword(body.password, user.passwordHash))) {
    throw new ApiError(401, "Email sau parolă incorectă. Dacă nu ai cont, creează unul nou.");
  }
  await startSession(user.id);
  const list = await db
    .select({ id: invitations.id, slug: invitations.slug, modelSlug: invitations.modelSlug })
    .from(invitations)
    .where(eq(invitations.userId, user.id))
    .orderBy(invitations.createdAt);
  return json({ user: publicUser(user), invitations: list });
});
