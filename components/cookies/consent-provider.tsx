"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import {
  createConsent,
  getConsent,
  saveConsent
} from "@/lib/consent/consentManager";
import { updateGoogleConsent } from "@/lib/consent/googleConsent";
import { ConsentCategories, StoredConsent, defaultConsentCategories } from "@/lib/consent/types";
import { CookieBanner } from "@/components/cookies/cookie-banner";
import { TrackingScripts } from "@/components/analytics/tracking-scripts";

interface ConsentContextValue {
  consent: StoredConsent | null;
  categories: ConsentCategories;
  hasChoice: boolean;
  isPreferencesOpen: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (categories: Partial<ConsentCategories>) => void;
  openPreferences: () => void;
  closePreferences: () => void;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<StoredConsent | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

  useEffect(() => {
    const storedConsent = getConsent();

    if (storedConsent) {
      setConsent(storedConsent);
      updateGoogleConsent(storedConsent.categories);
    }

    setIsLoaded(true);
  }, []);

  const persistConsent = useCallback((nextCategories: Partial<ConsentCategories>) => {
    const nextConsent = createConsent(nextCategories);
    const shouldReload = consent !== null;

    saveConsent(nextConsent);
    setConsent(nextConsent);
    updateGoogleConsent(nextConsent.categories);
    setIsPreferencesOpen(false);

    if (shouldReload) {
      window.setTimeout(() => window.location.reload(), 50);
    }
  }, [consent]);

  const value = useMemo<ConsentContextValue>(
    () => ({
      consent,
      categories: consent?.categories ?? defaultConsentCategories,
      hasChoice: consent !== null,
      isPreferencesOpen,
      acceptAll: () => persistConsent({ analytics: true, marketing: true }),
      rejectAll: () => persistConsent({ analytics: false, marketing: false }),
      savePreferences: persistConsent,
      openPreferences: () => setIsPreferencesOpen(true),
      closePreferences: () => setIsPreferencesOpen(false)
    }),
    [consent, isPreferencesOpen, persistConsent]
  );

  return (
    <ConsentContext.Provider value={value}>
      {children}
      {isLoaded ? (
        <>
          <TrackingScripts />
          <CookieBanner />
        </>
      ) : null}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  const context = useContext(ConsentContext);

  if (!context) {
    throw new Error("useConsent must be used inside ConsentProvider");
  }

  return context;
}
