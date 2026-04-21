"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ConsentCategories } from "@/lib/consent/types";
import { useConsent } from "@/components/cookies/consent-provider";

export function CookieBanner() {
  const {
    categories,
    hasChoice,
    isPreferencesOpen,
    acceptAll,
    rejectAll,
    savePreferences,
    openPreferences,
    closePreferences
  } = useConsent();
  const [draftCategories, setDraftCategories] = useState<ConsentCategories>(categories);
  const shouldShowBanner = !hasChoice || isPreferencesOpen;

  useEffect(() => {
    setDraftCategories(categories);
  }, [categories, isPreferencesOpen]);

  if (!shouldShowBanner) {
    return null;
  }

  const updateDraft = (key: keyof Pick<ConsentCategories, "analytics" | "marketing">) => {
    setDraftCategories((current) => ({
      ...current,
      [key]: !current[key]
    }));
  };

  return (
    <div className="fixed inset-x-4 bottom-4 z-[80] mx-auto max-w-5xl rounded-[28px] border border-border bg-surface p-5 shadow-halo sm:p-6">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-text-muted">
            Confidențialitate
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-text-primary">
            Alegi tu cum folosim cookie-urile
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-text-secondary">
            Calculatorul funcționează complet și fără cookie-uri opționale. Dacă accepți, ne ajuți să
            înțelegem ce funcții sunt utile și să susținem proiectul prin reclame afișate responsabil.
            Poți modifica alegerea oricând din footer.
          </p>
          <div className="mt-3 flex flex-wrap gap-3 text-xs font-semibold text-primary">
            <Link href="/privacy-policy" className="transition hover:text-primary-hover">
              Politica de confidențialitate
            </Link>
            <Link href="/cookie-policy" className="transition hover:text-primary-hover">
              Politica cookies
            </Link>
          </div>

          {isPreferencesOpen ? (
            <div className="mt-5 grid gap-3">
              <label className="flex items-start justify-between gap-4 rounded-[20px] border border-border bg-surface-input px-4 py-3">
                <span>
                  <span className="block text-sm font-semibold text-text-primary">Necesare</span>
                  <span className="mt-1 block text-xs leading-5 text-text-muted">
                    Păstrează calculatorul funcțional, rețin alegerea ta și ajută la securitate.
                  </span>
                </span>
                <input type="checkbox" checked disabled className="mt-1 h-5 w-5" />
              </label>
              <label className="flex items-start justify-between gap-4 rounded-[20px] border border-border bg-surface-input px-4 py-3">
                <span>
                  <span className="block text-sm font-semibold text-text-primary">Analytics</span>
                  <span className="mt-1 block text-xs leading-5 text-text-muted">
                    Ne arată, agregat, ce pagini și funcții sunt folosite, ca să îmbunătățim produsul.
                  </span>
                </span>
                <input
                  type="checkbox"
                  checked={draftCategories.analytics}
                  onChange={() => updateDraft("analytics")}
                  className="mt-1 h-5 w-5 rounded border-border-strong text-primary focus:ring-primary"
                />
              </label>
              <label className="flex items-start justify-between gap-4 rounded-[20px] border border-border bg-surface-input px-4 py-3">
                <span>
                  <span className="block text-sm font-semibold text-text-primary">Marketing</span>
                  <span className="mt-1 block text-xs leading-5 text-text-muted">
                    Permite reclame și semnale publicitare. Ajută la monetizare fără să blocheze
                    calculatorul.
                  </span>
                </span>
                <input
                  type="checkbox"
                  checked={draftCategories.marketing}
                  onChange={() => updateDraft("marketing")}
                  className="mt-1 h-5 w-5 rounded border-border-strong text-primary focus:ring-primary"
                />
              </label>
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 sm:min-w-52">
          {isPreferencesOpen ? (
            <>
              <button
                type="button"
                onClick={() => savePreferences(draftCategories)}
                className="rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
              >
                Salvează preferințele
              </button>
              {hasChoice ? (
                <button
                  type="button"
                  onClick={closePreferences}
                  className="rounded-2xl border border-border px-5 py-3 text-sm font-semibold text-text-secondary transition hover:border-border-strong"
                >
                  Închide
                </button>
              ) : null}
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={acceptAll}
                className="rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
              >
                Acceptă tot
              </button>
              <button
                type="button"
                onClick={openPreferences}
                className="rounded-2xl bg-primary-subtle px-5 py-3 text-sm font-semibold text-text-primary transition hover:bg-background-secondary"
              >
                Alege ce accepți
              </button>
              <button
                type="button"
                onClick={rejectAll}
                className="rounded-2xl border border-border px-5 py-3 text-sm font-semibold text-text-secondary transition hover:border-border-strong"
              >
                Refuză tot
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
