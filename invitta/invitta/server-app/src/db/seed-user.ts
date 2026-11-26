// Creates (or resets) a login user without touching other data.
// Usage: pnpm db:seed-user [email] [password] [name]
import "dotenv/config";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as s from "./schema";

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  const [email = "admin@invitta.ro", password = "Invitta2026!", name = "Admin"] = process.argv.slice(2);
  const sql = postgres(url, { max: 1, prepare: process.env.DATABASE_PREPARE !== "false" });
  const db = drizzle(sql, { schema: s });

  const passwordHash = await bcrypt.hash(password, 10);
  const [existing] = await db.select().from(s.users).where(eq(s.users.email, email));
  if (existing) {
    await db.update(s.users).set({ passwordHash, name }).where(eq(s.users.email, email));
  } else {
    await db.insert(s.users).values({ email, name, passwordHash });
  }
  await sql.end();
  console.log(`${existing ? "Updated" : "Created"} user ${email}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
