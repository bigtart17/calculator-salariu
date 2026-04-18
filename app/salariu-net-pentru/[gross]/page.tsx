import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaqSection } from "@/components/faq-section";
import { SiteHeader } from "@/components/site-header";
import { buildSalaryExample, programmaticExamples, SITE_URL } from "@/lib/content";

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
  const gross = Number(grossParam);

  if (!Number.isFinite(gross)) {
    return {};
  }

  return {
    title: `Salariu net pentru ${gross.toLocaleString("ro-RO")} lei brut în 2026`,
    description: `Află rapid salariul net, taxele și costul angajatorului pentru ${gross.toLocaleString(
      "ro-RO"
    )} lei brut în România 2026.`,
    alternates: {
      canonical: `${SITE_URL}/salariu-net-pentru/${gross}`
    }
  };
}

export default async function SalaryExamplePage({
  params
}: {
  params: Promise<{ gross: string }>;
}) {
  const { gross: grossParam } = await params;
  const gross = Number(grossParam);

  if (!Number.isFinite(gross) || gross < 1000 || gross > 50000) {
    notFound();
  }

  const example = buildSalaryExample(gross);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
            Long-tail SEO page
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-ink sm:text-6xl">
            Salariu net pentru {gross.toLocaleString("ro-RO")} lei brut în 2026
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Dacă ai un salariu brut de {gross.toLocaleString("ro-RO")} lei, estimarea standard pentru
            salariul net este de aproximativ {example.netSalary.toLocaleString("ro-RO")} lei, iar
            totalul primit, inclusiv eventuale beneficii selectate, ajunge la{" "}
            {example.takeHomeTotal.toLocaleString("ro-RO")} lei.
          </p>
        </div>

        <section className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="rounded-[32px] border border-slate-200/70 bg-white/90 p-6 shadow-panel">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Rezultat principal
            </p>
            <div className="mt-4 space-y-3 text-base leading-8 text-slate-600">
              <p>
                Salariu net estimat: <strong className="text-ink">{example.netSalary.toLocaleString("ro-RO")} lei</strong>
              </p>
              <p>
                Cost angajator:{" "}
                <strong className="text-ink">{example.totalEmployerCost.toLocaleString("ro-RO")} lei</strong>
              </p>
              <p>
                Total taxe lunare:{" "}
                <strong className="text-ink">{example.employeeTaxesTotal.toLocaleString("ro-RO")} lei</strong>
              </p>
            </div>
          </div>
          <div className="rounded-[32px] border border-slate-200/70 bg-white/90 p-6 shadow-panel">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Defalcare
            </p>
            <div className="mt-4 space-y-3 text-base leading-8 text-slate-600">
              <p>CAS: {example.cas.toLocaleString("ro-RO")} lei</p>
              <p>CASS: {example.cass.toLocaleString("ro-RO")} lei</p>
              <p>Impozit: {example.incomeTax.toLocaleString("ro-RO")} lei</p>
              <p>CAM: {example.employerCam.toLocaleString("ro-RO")} lei</p>
            </div>
          </div>
        </section>

        <section className="mt-12 rounded-[36px] border border-slate-200/70 bg-white/90 p-6 shadow-panel sm:p-8">
          <h2 className="text-3xl font-semibold tracking-tight text-ink">
            Cum se interpretează acest exemplu de salariu
          </h2>
          <div className="mt-5 space-y-5 text-base leading-8 text-slate-600">
            <p>
              Pentru o căutare precum „salariu net pentru {gross.toLocaleString("ro-RO")} lei brut”,
              utilizatorul vrea un răspuns imediat și ușor de verificat. Tocmai de aceea afișăm nu
              doar netul final, ci și fiecare componentă importantă: CAS, CASS, impozitul pe venit și
              costul total pentru angajator.
            </p>
            <p>
              Dacă negociezi un job, poți folosi acest exemplu ca punct de plecare. Dacă recrutezi, îl
              poți folosi pentru a explica rapid diferența dintre ofertă brută și suma încasată efectiv.
              Dacă administrezi un site de conținut sau un brand financiar, astfel de pagini long-tail
              sunt esențiale pentru captarea traficului organic cu intenție foarte clară.
            </p>
          </div>
        </section>

        <section className="mt-12 rounded-[36px] border border-slate-200/70 bg-white/90 p-6 shadow-panel sm:p-8">
          <h2 className="text-3xl font-semibold tracking-tight text-ink">
            Vrei să simulezi și alte scenarii?
          </h2>
          <div className="mt-5 flex flex-wrap gap-4">
            <Link
              href={`/?amount=${gross}&mode=grossToNet`}
              className="rounded-2xl bg-ink px-6 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5"
            >
              Deschide calculatorul complet
            </Link>
            <Link
              href="/"
              className="rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
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
