import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SITE_URL } from "@/lib/content";

export const metadata: Metadata = {
  title: "Politica cookies | Net din Brut",
  description: "Politica de cookies pentru calculatorul salariu net din brut România 2026.",
  alternates: {
    canonical: `${SITE_URL}/cookie-policy`
  },
  openGraph: {
    title: "Politica cookies | Net din Brut",
    description: "Cum folosim cookie-uri necesare, analytics și marketing pe Net din Brut.",
    url: `${SITE_URL}/cookie-policy`,
    type: "website",
    locale: "ro_RO"
  }
};

export default function CookiePolicyPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 pb-24 pt-12 sm:px-6 lg:px-8">
        <article className="rounded-[36px] border border-border bg-surface p-6 shadow-panel sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-text-muted">
            Legal
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-text-primary">
            Politica cookies
          </h1>
          <p className="mt-5 text-sm leading-7 text-text-secondary">
            Această politică explică tipurile de cookie-uri și tehnologii similare folosite pe Net din
            Brut și modul în care îți poți gestiona consimțământul.
          </p>

          <div className="mt-8 space-y-8 text-base leading-8 text-text-secondary">
            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-text-primary">
                1. Categorii de cookie-uri
              </h2>
              <p className="mt-3">
                Cookie-urile necesare sunt folosite pentru funcționarea site-ului, securitate și
                păstrarea preferințelor tale de consimțământ. Acestea sunt mereu active. Cookie-urile
                Analytics sunt folosite pentru măsurarea traficului și a utilizării site-ului prin
                Google Analytics 4. Cookie-urile Marketing sunt folosite pentru Google AdSense,
                reclame și semnale publicitare, doar dacă îți dai acordul și doar dacă soluția de
                consimțământ necesară pentru regiunea ta este configurată corect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-text-primary">
                2. Mecanismul de consimțământ
              </h2>
              <p className="mt-3">
                La prima vizită, bannerul de consimțământ îți permite să accepți toate categoriile,
                să refuzi categoriile opționale sau să personalizezi alegerea. Preferința este stocată
                în localStorage și, ca fallback, într-un cookie numit cookie_consent_v1, împreună cu
                versiunea și timestamp-ul alegerii.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-text-primary">
                3. Durata cookie-urilor
              </h2>
              <p className="mt-3">
                Cookie-ul de consimțământ este păstrat până la 12 luni. Cookie-urile Google Analytics
                și Google Ads pot avea durate diferite, stabilite de Google, și sunt folosite doar în
                categoriile pentru care ai acordat consimțământul. Pe conexiuni HTTPS, cookie-ul de
                consimțământ este setat cu atributul Secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-text-primary">
                4. Retragerea consimțământului
              </h2>
              <p className="mt-3">
                Îți poți modifica sau retrage consimțământul oricând folosind linkul „Setări cookie”
                din footer. După modificare, Google Consent Mode v2 este actualizat pentru a reflecta
                noua alegere.
              </p>
            </section>
          </div>
        </article>
      </main>
    </>
  );
}
