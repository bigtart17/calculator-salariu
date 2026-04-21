import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SITE_URL } from "@/lib/content";

export const metadata: Metadata = {
  title: "Politica de confidențialitate | Net din Brut",
  description:
    "Politica de confidențialitate pentru calculatorul salariu net din brut România 2026.",
  alternates: {
    canonical: `${SITE_URL}/privacy-policy`
  },
  openGraph: {
    title: "Politica de confidențialitate | Net din Brut",
    description:
      "Cum sunt procesate datele, cookie-urile și consimțământul pe Net din Brut.",
    url: `${SITE_URL}/privacy-policy`,
    type: "website",
    locale: "ro_RO"
  }
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 pb-24 pt-12 sm:px-6 lg:px-8">
        <article className="rounded-[36px] border border-border bg-surface p-6 shadow-panel sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-text-muted">
            Legal
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-text-primary">
            Politica de confidențialitate
          </h1>
          <p className="mt-5 text-sm leading-7 text-text-secondary">
            Ultima actualizare: 21 aprilie 2026. Această politică explică modul în care sunt
            prelucrate datele atunci când folosești site-ul Net din Brut.
          </p>

          <div className="mt-8 space-y-8 text-base leading-8 text-text-secondary">
            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-text-primary">
                1. Operatorul de date
              </h2>
              <p className="mt-3">
                Operatorul site-ului este administratorul domeniului netdinbrut.ro, denumit în
                continuare „Operatorul”. Pentru solicitări privind datele personale ne poți contacta
                la adresa: contact@netdinbrut.ro. Datele juridice complete ale operatorului vor fi
                afișate aici înainte de lansarea comercială a serviciului.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-text-primary">
                2. Ce date putem colecta
              </h2>
              <p className="mt-3">
                Calculatorul salarial funcționează local în browser și nu solicită nume, CNP, adresă
                sau alte date personale introduse direct de utilizator. În funcție de consimțământul
                tău, putem colecta date tehnice și statistice, precum pagini vizitate, evenimente de
                utilizare, tip browser, dispozitiv, informații de performanță, cookie-uri și adrese IP
                procesate de furnizori precum Google Analytics sau infrastructura de hosting.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-text-primary">
                3. Scopuri și temei legal
              </h2>
              <p className="mt-3">
                Datele necesare sunt folosite pentru funcționarea și securitatea site-ului, în temeiul
                interesului legitim conform art. 6 alin. (1) lit. f GDPR. Datele de analytics și
                marketing sunt folosite doar pe baza consimțământului tău, conform art. 6 alin. (1)
                lit. a GDPR. Îți poți retrage consimțământul oricând din „Setări cookie”.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-text-primary">
                4. Terți și destinatari
              </h2>
              <p className="mt-3">
                Putem folosi servicii furnizate de Google LLC pentru Google Analytics 4, Google
                Consent Mode și Google AdSense, doar conform consimțământului exprimat. Site-ul poate
                fi găzduit pe Vercel, care poate procesa date tehnice necesare livrării și securității
                aplicației. Acești furnizori pot prelucra date în afara Spațiului Economic European,
                cu garanțiile contractuale și tehnice aplicabile. Pentru AdSense în EEA, UK și
                Elveția, este necesară configurarea unui CMP certificat Google/IAB TCF sau a soluției
                Google Privacy & Messaging.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-text-primary">
                5. Durata de stocare
              </h2>
              <p className="mt-3">
                Preferințele de consimțământ sunt păstrate până la 12 luni sau până când le modifici.
                Datele analytics și publicitare sunt păstrate conform setărilor din conturile Google
                și politicilor furnizorilor.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-text-primary">
                6. Drepturile tale
              </h2>
              <p className="mt-3">
                Ai dreptul de acces, rectificare, ștergere, restricționare, opoziție, portabilitate și
                retragere a consimțământului. Ai dreptul să depui o plângere la Autoritatea Națională
                de Supraveghere a Prelucrării Datelor cu Caracter Personal dacă apreciezi că drepturile
                tale au fost încălcate.
              </p>
            </section>
          </div>
        </article>
      </main>
    </>
  );
}
