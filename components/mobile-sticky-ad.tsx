"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface MobileStickyAdProps {
  slot: string;
}

export function MobileStickyAd({ slot }: MobileStickyAdProps) {
  const [dismissed, setDismissed] = useState(false);
  const [ready, setReady] = useState(false);
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 1600);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!client || !ready || dismissed) {
      return;
    }

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // Ignore AdSense bootstrap errors in development.
    }
  }, [client, dismissed, ready]);

  if (dismissed) {
    return null;
  }

  return (
    <div className="fixed inset-x-4 bottom-4 z-40 lg:hidden">
      <div className="rounded-[24px] border border-slate-200/80 bg-white/95 p-3 shadow-halo backdrop-blur">
        <div className="mb-2 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
          <span>Mobile sponsor slot</span>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="rounded-full border border-slate-200 px-2 py-1 text-[10px] tracking-[0.2em] text-slate-500"
          >
            Închide
          </button>
        </div>
        {client && ready ? (
          <ins
            className="adsbygoogle block min-h-[72px] rounded-[18px] bg-slate-50"
            data-ad-client={client}
            data-ad-format="horizontal"
            data-ad-slot={slot}
            data-full-width-responsive="true"
          />
        ) : (
          <div className="flex min-h-[72px] items-center justify-center rounded-[18px] bg-slate-50 px-4 text-center text-xs leading-6 text-slate-500">
            Banner mobil sticky pentru AdSense sau partener afiliat, gândit să nu blocheze
            calculatorul.
          </div>
        )}
      </div>
    </div>
  );
}
