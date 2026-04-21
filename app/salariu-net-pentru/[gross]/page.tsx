import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaqSection } from "@/components/faq-section";
import { SiteHeader } from "@/components/site-header";
import { buildSalaryExample, programmaticExamples, SITE_URL } from "@/lib/content";

const MIN_GROSS_PAGE = 1000;
const MAX_GROSS_PAGE = 50000;

function parseGrossParam(grossParam: string) {
  if (!/^\d+$/.test(grossParam)) {
    return null;
  }

  const gross = Number(grossParam);
  return Number.isFinite(gross) && gross >= MIN_GROSS_PAGE && gross <= MAX_GROSS_PAGE
    ? gross
    : null;
}

export function generateStaticParams() {
  return programmaticExamples.map((gross) => ({
    gross: String(gross)
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ gross: string }>;
}): Promise<Metadata> {
  const { gross: grossParam } = await params;
  const gross = parseGrossParam(grossParam);

  if (gross === null) {
    return {};
  }

  const formattedGross = gross.toLocaleString("ro-RO");

  return {
    title: `Salariu net pentru ${formattedGross} lei brut în 2026`,
    description: `Află rapid salariul net, taxele și costul angajatorului pentru ${formattedGross} lei brut în România 2026.`,
    alternates: {
      canonical: `${SITE_URL}/salariu-net-pentru/${gross}`
    },
    openGraph: {
      title: `Salariu net pentru ${formattedGross} lei brut în 2026`,
      description: `Calcul complet pentru ${formattedGross} lei brut: net estimat, CAS, CASS, impozit și cost angajator.`,
      url: `${SITE_URL}/salariu-net-pentru/${gross}`,
      type: "article",
      locale: "ro_RO"
    },
    twitter: {
      card: "summary",
      title: `Salariu net pentru ${formattedGross} lei brut în 2026`,
      description: `Vezi netul estimat și costul angajatorului pentru ${formattedGross} lei brut.`
    }
  };
}

export default async function SalaryExamplePage({
  params
}: {
  params: Promise<{ gross: string }>;
}) {
  const { gross: grossParam } = await params;
  const gross = parseGrossParam(grossParam);

  if (gross === null) {
    notFound();
  }

  const example = buildSalaryExample(gross);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-text-muted">
            Long-tail SEO page
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-text-primary sm:text-6xl">
            Salariu net pentru {gross.toLocaleString("ro-RO")} lei brut în 2026
          </h1>
          <p className="mt-6 text-lg leading-8 text-text-secondary">
            Dacă ai un salariu brut de {gross.toLocaleString("ro-RO")} lei, estimarea standard pentru
            salariul net este de aproximativ {example.netSalary.toLocaleString("ro-RO")} lei, cu
            taxele și costul angajatorului defalcate mai jos.
          </p>
        </div>

        <section className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="rounded-[32px] border border-border bg-surface p-6 shadow-panel">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-text-muted">
              Rezultat principal
            </p>
            <div className="mt-4 space-y-3 text-base leading-8 text-text-secondary">
              <p>
                Salariu net estimat: <strong className="text-text-primary">{example.netSalary.toLocaleString("ro-RO")} lei</strong>
              </p>
              <p>
                Cost angajator:{" "}
                <strong className="text-text-primary">{example.totalEmployerCost.toLocaleString("ro-RO")} lei</strong>
              </p>
              <p>
                Total taxe lunare:{" "}
                <strong className="text-text-primary">{example.employeeTaxesTotal.toLocaleString("ro-RO")} lei</strong>
              </p>
            </div>
          </div>
          <div className="rounded-[32px] border border-border bg-surface p-6 shadow-panel">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-text-muted">
              Defalcare
            </p>
            <div className="mt-4 space-y-3 text-base leading-8 text-text-secondary">
              <p>CAS: {example.cas.toLocaleString("ro-RO")} lei</p>
              <p>CASS: {example.cass.toLocaleString("ro-RO")} lei</p>
              <p>Impozit: {example.incomeTax.toLocaleString("ro-RO")} lei</p>
              <p>CAM: {example.employerCam.toLocaleString("ro-RO")} lei</p>
            </div>
          </div>
        </section>

        <section className="mt-12 rounded-[36px] border border-border bg-surface p-6 shadow-panel sm:p-8">
          <h2 className="text-3xl font-semibold tracking-tight text-text-primary">
            Cum se interpretează acest exemplu de salariu
          </h2>
          <div className="mt-5 space-y-5 text-base leading-8 text-text-secondary">
            <p>
              Pentru o căutare precum „salariu net pentru {gross.toLocaleString("ro-RO")} lei brut”
              afișăm fiecare componentă importantă: CAS, CASS, impozitul pe venit și
              costul total pentru angajator.
            </p>
            <p>
              Dacă negociezi un job, poți folosi acest exemplu ca punct de plecare. Dacă recrutezi, îl
              poți folosi pentru a explica rapid diferența dintre ofertă brută și suma încasată efectiv.
            </p>
          </div>
        </section>

        <section className="mt-12 rounded-[36px] border border-border bg-surface p-6 shadow-panel sm:p-8">
          <h2 className="text-3xl font-semibold tracking-tight text-text-primary">
            Vrei să simulezi și alte scenarii?
          </h2>
          <div className="mt-5 flex flex-wrap gap-4">
            <Link
              href={`/?amount=${gross}&mode=grossToNet`}
              className="rounded-2xl bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground shadow-panel transition hover:-translate-y-0.5 hover:bg-primary-hover"
            >
              Deschide calculatorul complet
            </Link>
            <Link
              href="/"
              className="rounded-2xl border border-border bg-surface px-6 py-4 text-sm font-semibold text-text-secondary transition hover:border-border-strong hover:bg-background-secondary"
            >
              Înapoi la homepage
            </Link>
          </div>
        </section>

        <section className="mt-16">
          <FaqSection />
        </section>
      </main>
    </>
  );
}
