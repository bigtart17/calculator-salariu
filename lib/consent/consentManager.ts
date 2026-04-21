import {
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  ConsentCategories,
  StoredConsent,
  defaultConsentCategories
} from "@/lib/consent/types";

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

function normalizeConsent(value: unknown): StoredConsent | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const candidate = value as Partial<StoredConsent>;
  const categories = candidate.categories as Partial<ConsentCategories> | undefined;

  if (candidate.version !== CONSENT_VERSION || !categories) {
    return null;
  }

  return {
    version: CONSENT_VERSION,
    timestamp:
      typeof candidate.timestamp === "string" ? candidate.timestamp : new Date().toISOString(),
    categories: {
      necessary: true,
      analytics: categories.analytics === true,
      marketing: categories.marketing === true
    }
  };
}

function parseStoredConsent(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  try {
    return normalizeConsent(JSON.parse(decodeURIComponent(value)));
  } catch {
    return null;
  }
}

function readCookieValue(cookieSource: string, key: string) {
  return cookieSource
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${key}=`))
    ?.slice(key.length + 1);
}

function readLocalStorageValue(key: string) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeLocalStorageValue(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // The cookie fallback keeps consent functional when storage is blocked.
  }
}

function removeLocalStorageValue(key: string) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Ignore blocked storage cleanup; the cookie is cleared separately.
  }
}

export function createConsent(categories: Partial<ConsentCategories>): StoredConsent {
  return {
    version: CONSENT_VERSION,
    timestamp: new Date().toISOString(),
    categories: {
      ...defaultConsentCategories,
      analytics: categories.analytics === true,
      marketing: categories.marketing === true
    }
  };
}

export function getConsent(): StoredConsent | null {
  if (typeof window === "undefined") {
    return null;
  }

  const localConsent = parseStoredConsent(readLocalStorageValue(CONSENT_STORAGE_KEY));

  if (localConsent) {
    return localConsent;
  }

  return parseStoredConsent(readCookieValue(document.cookie, CONSENT_STORAGE_KEY));
}

export function getConsentFromCookie(cookieHeader: string | null | undefined) {
  return parseStoredConsent(cookieHeader ? readCookieValue(cookieHeader, CONSENT_STORAGE_KEY) : null);
}

export function saveConsent(consent: StoredConsent) {
  if (typeof window === "undefined") {
    return;
  }

  const serializedConsent = encodeURIComponent(JSON.stringify(consent));
  const secureAttribute = window.location.protocol === "https:" ? "; Secure" : "";

  writeLocalStorageValue(CONSENT_STORAGE_KEY, JSON.stringify(consent));
  document.cookie = `${CONSENT_STORAGE_KEY}=${serializedConsent}; Max-Age=${ONE_YEAR_SECONDS}; Path=/; SameSite=Lax${secureAttribute}`;
}

export function clearConsent() {
  if (typeof window === "undefined") {
    return;
  }

  removeLocalStorageValue(CONSENT_STORAGE_KEY);
  document.cookie = `${CONSENT_STORAGE_KEY}=; Max-Age=0; Path=/; SameSite=Lax`;
}
