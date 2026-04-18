import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { SITE_URL } from "@/lib/content";

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
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  return (
    <html lang="ro" suppressHydrationWarning>
      <body className="font-sans antialiased">
        {adsenseClient ? (
          <Script
            id="adsense"
            async
            strategy="afterInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
            crossOrigin="anonymous"
          />
        ) : null}
        {children}
      </body>
    </html>
  );
}
