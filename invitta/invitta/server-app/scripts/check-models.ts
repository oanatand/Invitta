// Keeps the two lists of invitation designs in sync. A design that exists on the site but not on the
// server can be previewed but not chosen (the API rejects its slug); this catches that before it ships.
// Usage: pnpm check:models   (also runs as part of `pnpm typecheck` at the repo root)
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { MODEL_IMAGES } from "../../server-admin/src/lib/assets";
import { DEMOS } from "../../server-admin/src/lib/demos";
import { MODEL_SLUGS } from "../src/lib/models";

const problems: string[] = [];
const site = DEMOS.map((d) => d.slug);
const server: string[] = [...MODEL_SLUGS];

for (const s of site) {
  if (!server.includes(s)) {
    problems.push(`"${s}" is in server-admin/src/lib/demos.ts but not in server-app/src/lib/models.ts (MODEL_SLUGS): choosing it would fail.`);
  }
}
for (const s of server) {
  if (!site.includes(s)) {
    problems.push(`"${s}" is in server-app/src/lib/models.ts but has no entry in server-admin/src/lib/demos.ts (no card, no demo).`);
  }
}
const dupes = site.filter((s, i) => site.indexOf(s) !== i);
for (const s of new Set(dupes)) problems.push(`"${s}" appears more than once in demos.ts.`);

// Every design needs a cover image that really exists on disk.
const publicDir = fileURLToPath(new URL("../../server-admin/public", import.meta.url));
for (const s of site) {
  const img = MODEL_IMAGES[s];
  if (!img) problems.push(`"${s}" has no cover in MODEL_IMAGES (server-admin/src/lib/assets.ts).`);
  else if (!existsSync(resolve(publicDir, "." + img))) problems.push(`"${s}" cover points to ${img}, which is missing from server-admin/public.`);
}

if (problems.length) {
  console.error(`Design lists are out of sync (${problems.length}):\n- ${problems.join("\n- ")}`);
  process.exit(1);
}
console.log(`OK: ${site.length} designs, site and server agree, all covers exist.`);
