import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SITE_URL } from "@/lib/content";

export const metadata: Metadata = {
  title: "Termeni și condiții | Net din Brut",
  description: "Termeni de utilizare pentru calculatorul salariu net din brut România 2026.",
  alternates: {
    canonical: `${SITE_URL}/terms-of-service`
  },
  openGraph: {
    title: "Termeni și condiții | Net din Brut",
    description: "Condițiile de utilizare pentru calculatorul salariu net din brut România.",
    url: `${SITE_URL}/terms-of-service`,
    type: "website",
    locale: "ro_RO"
  }
};

export default function TermsOfServicePage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 pb-24 pt-12 sm:px-6 lg:px-8">
        <article className="rounded-[36px] border border-border bg-surface p-6 shadow-panel sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-text-muted">
            Legal
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-text-primary">
            Termeni și condiții
          </h1>
          <p className="mt-5 text-sm leading-7 text-text-secondary">
            Prin folosirea site-ului Net din Brut accepți acești termeni de utilizare.
          </p>

          <div className="mt-8 space-y-8 text-base leading-8 text-text-secondary">
            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-text-primary">
                1. Scopul aplicației
              </h2>
              <p className="mt-3">
                Site-ul oferă un calculator informativ pentru estimarea salariului net, salariului brut,
                taxelor salariale și costului total pentru angajator în România. Rezultatele sunt
                estimative și au scop informativ.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-text-primary">
                2. Fără consultanță fiscală, financiară sau juridică
              </h2>
              <p className="mt-3">
                Informațiile publicate pe site nu reprezintă consultanță fiscală, financiară, juridică
                sau contabilă. Pentru decizii oficiale, state de plată, contracte sau situații
                particulare, consultă un specialist HR, contabil sau consultant fiscal autorizat.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-text-primary">
                3. Limitarea răspunderii
              </h2>
              <p className="mt-3">
                Depunem eforturi pentru acuratețe și actualizare, dar nu garantăm că rezultatele sunt
                complete, fără erori sau potrivite tuturor situațiilor individuale. Nu suntem
                răspunzători pentru pierderi sau decizii luate exclusiv pe baza calculatorului.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-text-primary">
                4. Monetizare și reclame
              </h2>
              <p className="mt-3">
                Site-ul poate afișa reclame sau linkuri comerciale pentru monetizare. Reclamele Google
                sunt încărcate doar conform consimțământului tău pentru categoria Marketing.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-text-primary">
                5. Modificări
              </h2>
              <p className="mt-3">
                Putem actualiza acești termeni pentru a reflecta schimbări legislative, tehnice sau de
                produs. Versiunea publicată pe site este cea aplicabilă la momentul accesării.
              </p>
            </section>
          </div>
        </article>
      </main>
    </>
  );
}
