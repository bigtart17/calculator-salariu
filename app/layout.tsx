import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { ConsentProvider } from "@/components/cookies/consent-provider";
import { SiteFooter } from "@/components/site-footer";
import { SITE_URL } from "@/lib/content";
import { GOOGLE_CONSENT_DEFAULT_SCRIPT } from "@/lib/consent/googleConsent";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Calculator salariu net din brut 2026 România",
  description:
    "Calculator salariu net ↔ brut România 2026: CAS, CASS, impozit, deduceri personale, cost angajator și simulare anuală.",
  keywords: [
    "calculator salariu net",
    "salariu brut net Romania",
    "calcul salariu 2026",
    "calculator salariu brut net",
    "calculator net din brut"
  ],
  openGraph: {
    title: "Calculator salariu net din brut 2026 România",
    description:
      "Simulează instant salariul net, salariul brut, costul angajatorului și proiecția anuală pentru România 2026.",
    url: SITE_URL,
    siteName: "Net din Brut",
    locale: "ro_RO",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculator salariu net din brut 2026 România",
    description: "Brut ↔ net, reverse calculation, cost angajator și deduceri personale."
  },
  alternates: {
    canonical: SITE_URL
  },
  other: {
    "google-adsense-account": "ca-pub-2278987460608929"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <Script
          id="google-consent-default"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: GOOGLE_CONSENT_DEFAULT_SCRIPT }}
        />
        <ConsentProvider>
          {children}
          <SiteFooter />
        </ConsentProvider>
      </body>
    </html>
  );
}
