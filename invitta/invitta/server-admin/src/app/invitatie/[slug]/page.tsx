import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InvitationRenderer } from "@/components/InvitationRenderer";
import { isDemoSlug } from "@/lib/demos";
import { DESIGN_DEMOS } from "@/lib/invitation-content";
import { DemoInvitation } from "./demo-view";

const SERVER_APP_URL = process.env.SERVER_APP_URL ?? "http://localhost:4000";

type Props = { params: Promise<{ slug: string }> };
type PublicInvitation = { slug: string; modelSlug: string; content: Record<string, any> };

/** Guests open this page without an account; it is rendered on the server so link previews work. */
async function loadInvitation(slug: string): Promise<PublicInvitation | null> {
  try {
    const res = await fetch(`${SERVER_APP_URL}/api/public/invitations/${encodeURIComponent(slug)}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()).invitation as PublicInvitation;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (isDemoSlug(slug)) return { title: "Invitație demo" };
  const inv = await loadInvitation(slug);
  if (!inv) return { title: "Invitația nu a fost găsită" };
  const couple = [inv.content.brideFirst, inv.content.groomFirst].filter(Boolean).join(" & ");
  return {
    title: couple ? `${couple} — Invitație` : "Invitație",
    description: inv.content.heroIntro || "Sunteți invitați la nunta noastră.",
  };
}

export default async function InvitationPage({ params }: Props) {
  const { slug } = await params;
  if (DESIGN_DEMOS[slug]) {
    return <InvitationRenderer content={DESIGN_DEMOS[slug]} modelSlug={slug} backHref="/" />;
  }
  if (isDemoSlug(slug)) return <DemoInvitation slug={slug} />;
  const inv = await loadInvitation(slug);
  if (!inv) notFound();
  return <InvitationRenderer content={inv.content} slug={inv.slug} modelSlug={inv.modelSlug} />;
}
