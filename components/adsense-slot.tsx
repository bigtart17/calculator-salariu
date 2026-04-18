"use client";

import { useEffect, useRef, useState } from "react";

interface AdSenseSlotProps {
  slot: string;
  label: string;
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdSenseSlot({ slot, label }: AdSenseSlotProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "160px" }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || !client) {
      return;
    }

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // Ignore AdSense bootstrap errors during local development.
    }
  }, [client, visible]);

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-[28px] border border-slate-200/70 bg-white/80 p-4 shadow-panel backdrop-blur"
    >
      <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.24em] text-slate-500">
        <span>{label}</span>
        <span>Revenue slot</span>
      </div>
      {client && visible ? (
        <ins
          className="adsbygoogle block min-h-[160px] rounded-[20px] bg-slate-50"
          data-ad-client={client}
          data-ad-format="auto"
          data-ad-slot={slot}
          data-full-width-responsive="true"
        />
      ) : (
        <div className="flex min-h-[160px] items-center justify-center rounded-[20px] border border-dashed border-slate-300 bg-slate-50 text-center text-sm text-slate-500">
          <p>
            Zonă publicitară premium, încărcată lazy pentru a proteja viteza paginii și UX-ul.
          </p>
        </div>
      )}
    </div>
  );
}
