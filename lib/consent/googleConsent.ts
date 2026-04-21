import { ConsentCategories } from "@/lib/consent/types";

type ConsentState = "granted" | "denied";

interface GoogleConsentUpdate {
  ad_storage: ConsentState;
  analytics_storage: ConsentState;
  ad_user_data: ConsentState;
  ad_personalization: ConsentState;
  personalization_storage: ConsentState;
  functionality_storage: "granted";
  security_storage: "granted";
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GOOGLE_CONSENT_DEFAULT_SCRIPT = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('consent', 'default', {
    ad_storage: 'denied',
    analytics_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    personalization_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
    wait_for_update: 500
  });
`;

function ensureGtag() {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtagFallback(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
}

export function buildGoogleConsentUpdate(categories: ConsentCategories): GoogleConsentUpdate {
  return {
    ad_storage: categories.marketing ? "granted" : "denied",
    analytics_storage: categories.analytics ? "granted" : "denied",
    ad_user_data: categories.marketing ? "granted" : "denied",
    ad_personalization: categories.marketing ? "granted" : "denied",
    personalization_storage: categories.marketing ? "granted" : "denied",
    functionality_storage: "granted",
    security_storage: "granted"
  };
}

export function updateGoogleConsent(categories: ConsentCategories) {
  if (typeof window === "undefined") {
    return;
  }

  ensureGtag();
  window.gtag?.("consent", "update", buildGoogleConsentUpdate(categories));
}
