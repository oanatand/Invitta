/** Invitation designs offered in the collection. Keep in sync with server-admin/src/lib/demos.ts. */
export const MODEL_SLUGS = ["minimal-ivory", "italian-romance", "black-tie", "floral-beige", "midnight-garden", "burgundy-seal"] as const;
export type ModelSlug = (typeof MODEL_SLUGS)[number];
