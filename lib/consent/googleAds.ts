import { getConsent } from "@/lib/consent/consentManager";

interface ConversionOptions {
  sendTo: string;
  value?: number;
  currency?: string;
  transactionId?: string;
}

interface EnhancedConversionData {
  email?: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  street?: string;
  city?: string;
  region?: string;
  postalCode?: string;
  country?: string;
}

function hasMarketingConsent() {
  return getConsent()?.categories.marketing === true;
}

export function trackGoogleAdsConversion(options: ConversionOptions) {
  if (typeof window === "undefined" || !window.gtag || !hasMarketingConsent()) {
    return;
  }

  window.gtag("event", "conversion", {
    send_to: options.sendTo,
    value: options.value,
    currency: options.currency ?? "RON",
    transaction_id: options.transactionId
  });
}

export function setEnhancedConversionData(data: EnhancedConversionData) {
  if (typeof window === "undefined" || !window.gtag || !hasMarketingConsent()) {
    return;
  }

  window.gtag("set", "user_data", data);
}
