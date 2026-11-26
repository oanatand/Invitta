"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useChooseInvitation, useSession } from "@/lib/session";

const style =
  "h-auto rounded-[4px] border-collection-ink bg-collection-ink px-4 py-2.5 text-[11px] font-normal uppercase tracking-[0.14em] text-collection-light shadow-none hover:bg-transparent hover:text-collection-ink";

/**
 * "Alege invitația" on a design card. Signed in: makes it the couple's invitation and opens the editor.
 * Signed out: sends the visitor to create an account first.
 */
export function ChooseModelButton({ slug }: { slug: string }) {
  const session = useSession();
  const router = useRouter();
  const choose = useChooseInvitation();

  if (session) {
    return (
      <Button
        type="button"
        variant="outline"
        disabled={choose.isPending}
        onClick={() => choose.mutate(slug, { onSuccess: () => router.push("/dashboard/invitatie") })}
        className={style}
      >
        Alege invitația
      </Button>
    );
  }
  return (
    <Button asChild variant="outline" className={style}>
      <Link href="/register">Alege invitația</Link>
    </Button>
  );
}
