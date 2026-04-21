"use client";

import Link from "next/link";
import { useConsent } from "@/components/cookies/consent-provider";

export function SiteFooter() {
  const { openPreferences } = useConsent();
  const hasAds = Boolean(process.env.NEXT_PUBLIC_ADSENSE_ID);

  return (
    <footer className="border-t border-border bg-background px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 text-sm leading-7 text-text-secondary md:flex-row md:items-center md:justify-between">
        <div>
          <p>Cookie-urile opționale ne ajută să îmbunătățim calculatorul și să susținem proiectul.</p>
          {hasAds ? <p>Site-ul poate afișa reclame pentru monetizare, doar cu acordul tău.</p> : null}
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={openPreferences}
            className="font-semibold text-primary transition hover:text-primary-hover"
          >
            Setări cookie
          </button>
          <Link href="/privacy-policy" className="transition hover:text-primary">
            Confidențialitate
          </Link>
          <Link href="/cookie-policy" className="transition hover:text-primary">
            Cookies
          </Link>
          <Link href="/terms-of-service" className="transition hover:text-primary">
            Termeni
          </Link>
        </div>
      </div>
    </footer>
  );
}
