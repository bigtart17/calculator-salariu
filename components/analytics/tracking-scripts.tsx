"use client";

import { useEffect, useRef } from "react";
import { useConsent } from "@/components/cookies/consent-provider";

const GA_SCRIPT_ID = "ga4-script";
const ADSENSE_SCRIPT_ID = "adsense-auto-ads-script";

function appendScript(id: string, src: string, attributes: Record<string, string> = {}) {
  if (document.getElementById(id)) {
    return;
  }

  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;

  Object.entries(attributes).forEach(([key, value]) => {
    script.setAttribute(key, value);
  });

  document.head.appendChild(script);
}

function normalizeAdSenseClientId(value: string) {
  return value.startsWith("ca-pub-") ? value : `ca-${value}`;
}

function loadGA4(gaId: string, allowAdvertisingSignals: boolean) {
  appendScript(GA_SCRIPT_ID, `https://www.googletagmanager.com/gtag/js?id=${gaId}`);

  window.gtag?.("js", new Date());
  window.gtag?.("config", gaId, {
    anonymize_ip: true,
    allow_google_signals: allowAdvertisingSignals,
    allow_ad_personalization_signals: allowAdvertisingSignals,
    send_page_view: false
  });
  window.gtag?.("event", "page_view", {
    page_location: window.location.href,
    page_path: window.location.pathname,
    page_title: document.title
  });
}

function loadAdSense(adSenseId: string) {
  const clientId = normalizeAdSenseClientId(adSenseId);

  appendScript(
    ADSENSE_SCRIPT_ID,
    `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`,
    { crossorigin: "anonymous" }
  );
}

export function TrackingScripts() {
  const { categories } = useConsent();
  const gaLoadedRef = useRef(false);
  const adsLoadedRef = useRef(false);
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const adSenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  useEffect(() => {
    if (categories.analytics && gaId && !gaLoadedRef.current) {
      loadGA4(gaId, categories.marketing);
      gaLoadedRef.current = true;
    }
  }, [categories.analytics, categories.marketing, gaId]);

  useEffect(() => {
    if (categories.marketing && adSenseId && !adsLoadedRef.current) {
      loadAdSense(adSenseId);
      adsLoadedRef.current = true;
    }
  }, [categories.marketing, adSenseId]);

  return null;
}
