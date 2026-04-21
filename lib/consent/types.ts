export const CONSENT_VERSION = 1;
export const CONSENT_STORAGE_KEY = "cookie_consent_v1";

export type ConsentCategory = "necessary" | "analytics" | "marketing";

export interface ConsentCategories {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
}

export interface StoredConsent {
  version: typeof CONSENT_VERSION;
  timestamp: string;
  categories: ConsentCategories;
}

export const defaultConsentCategories: ConsentCategories = {
  necessary: true,
  analytics: false,
  marketing: false
};
