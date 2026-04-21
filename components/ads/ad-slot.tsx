"use client";

import { useConsent } from "@/components/cookies/consent-provider";

interface AdSlotProps {
  className?: string;
  label?: string;
}

export function AdSlot({ className = "", label = "Reclamă" }: AdSlotProps) {
  const { categories } = useConsent();

  if (!categories.marketing) {
    return null;
  }

  return (
    <div
      className={`rounded-[28px] border border-ad-border bg-ad p-4 text-center text-xs uppercase tracking-[0.2em] text-text-muted ${className}`}
      aria-label={label}
    />
  );
}
