"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

/**
 * "Back" for pages people open from elsewhere on the site (an invitation demo). It goes back to
 * the page they actually came from (the landing page, the collection...), and falls back to
 * `fallback` (the landing page) when there is nothing to go back to, e.g. a link opened in a new tab.
 * It is still a real link, so open-in-new-tab and copy-link keep working.
 */
export function BackLink({
  fallback = "/",
  className,
  title = "Înapoi",
  children,
}: {
  fallback?: string;
  className?: string;
  title?: string;
  children: React.ReactNode;
}) {
  const router = useRouter();

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    let cameFromSite = false;
    try {
      cameFromSite = Boolean(document.referrer) && new URL(document.referrer).origin === window.location.origin;
    } catch {}
    // A same-site referrer and some history: step back, so the landing page keeps its scroll position.
    if (cameFromSite && window.history.length > 1) {
      e.preventDefault();
      router.back();
    }
  };

  return (
    <Link href={fallback} onClick={onClick} title={title} aria-label={title} className={className}>
      {children}
    </Link>
  );
}
