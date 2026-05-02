import type { Metadata } from "next";
import Link from "next/link";
import { SalaryCalculator } from "@/components/calculator/salary-calculator";
import { FaqSection } from "@/components/faq-section";
import { SiteHeader } from "@/components/site-header";
import { buildInitialStateFromSearchParams } from "@/lib/calculator-state";
import {
  SITE_URL,
  buildSalaryExample,
  defaultCalculatorState,
  getPageCopy,
  longFormRomanianContent,
  programmaticExamples
} from "@/lib/content";
import { buildFaqSchema, buildWebAppSchema } from "@/lib/seo";

type SearchParams = Record<string, string | string[] | undefined>;

function hasAnySearchParam(searchParams: SearchParams) {
  return Object.values(searchParams).some((value) =>
    Array.isArray(value) ? value.some(Boolean) : Boolean(value)
  );
}

export async function generateMetadata({
  searchParams
}: {
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const isShareableStateUrl = hasAnySearchParam(resolvedSearchParams);

  return {
    alternates: {
      canonical: SITE_URL
    },
    robots: isShareableStateUrl
      ? {
          index: false,
          follow: true
        }
      : {
          index: true,
          follow: true
        }
  };
}

export default async function Home({
  searchParams
}: {
  searchParams: Promise<SearchParams>;
}) {
  const resolvedSearchParams = await searchParams;
  const copy = getPageCopy();
  const initialState = buildInitialStateFromSearchParams(resolvedSearchParams, defaultCalculatorState);
  const faqSchema = buildFaqSchema();
  const appSchema = buildWebAppSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <SiteHeader />
      <main className="pb-24">
        <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8 lg:pt-14">
          <div className="overflow-hidden rounded-[40px] border border-border bg-surface shadow-halo backdrop-blur">
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="max-w-5xl">
                <p className="text-sm font-semibold uppercase tracking-[0.26em] text-text-muted">
                  Actualizat pentru legislația din 2026
                </p>
                <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-tight text-text-primary sm:text-6xl lg:text-7xl">
                  {copy.heroTitle}
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-text-secondary sm:text-xl">
                  {copy.heroSubtitle}
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="#calculator"
                    className="rounded-2xl bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground shadow-panel transition hover:-translate-y-0.5 hover:bg-primary-hover"
                  >
                    {copy.ctaPrimary}
                  </a>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <div className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-text-secondary shadow-sm">
                    Brut → Net instant
                  </div>
                  <div className="rounded-full border border-border bg-secondary-subtle px-4 py-2 text-sm font-medium text-text-secondary shadow-sm">
                    Net → Brut clar
                  </div>
                  <div className="rounded-full border border-border bg-accent-subtle px-4 py-2 text-sm font-medium text-text-secondary shadow-sm">
                    Cost angajator inclus
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="calculator"
          className="mx-auto max-w-7xl scroll-mt-28 px-4 pt-14 sm:px-6 lg:px-8 lg:pt-16"
        >
          <div className="mb-8 max-w-3xl rounded-[32px] border border-border bg-surface p-6 shadow-panel backdrop-blur sm:p-7">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-text-muted">
                Core feature
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
                {copy.calculatorTitle}
              </h2>
              <p className="mt-4 text-lg leading-8 text-text-secondary">{copy.calculatorLead}</p>
            </div>
          </div>
          <SalaryCalculator initialState={initialState} />
        </section>

        <section id="ghid" className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8 lg:pt-20">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            <div className="rounded-[36px] border border-border bg-surface p-6 shadow-panel backdrop-blur sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-text-muted">
                Calculator salariu 2026
              </p>
              <p className="mt-4 text-lg leading-8 text-text-secondary">
                {longFormRomanianContent.intro}
              </p>
              {longFormRomanianContent.sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="mt-10 scroll-mt-28 border-t border-border pt-8 first:border-t-0 first:pt-0"
                >
                  <h2 className="text-3xl font-semibold tracking-tight text-text-primary">{section.title}</h2>
                  <div className="mt-4 space-y-5 text-base leading-8 text-text-secondary">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
              <p className="mt-10 text-base leading-8 text-text-secondary">
                {longFormRomanianContent.outro}
              </p>
            </div>

            <div className="space-y-6 lg:sticky lg:top-28">
              <div className="rounded-[32px] border border-border bg-surface p-6 shadow-panel">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-text-muted">
                  Linkuri utile
                </p>
                <div className="mt-4 space-y-3">
                  <a
                    href="#calculator"
                    className="block rounded-[24px] bg-primary px-5 py-4 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:bg-primary-hover"
                  >
                    Vezi joburi mai bine plătite
                  </a>
                  <a
                    href="#calculator"
                    className="block rounded-[24px] bg-primary-subtle px-5 py-4 text-sm font-semibold text-text-primary transition hover:bg-background-secondary"
                  >
                    Compară salarii în IT
                  </a>
                  <a
                    href="#faq"
                    className="block rounded-[24px] bg-accent-subtle px-5 py-4 text-sm font-semibold text-accent-foreground transition hover:bg-warning-subtle"
                  >
                    Găsește contabil
                  </a>
                </div>
              </div>
              <div className="rounded-[32px] border border-border bg-surface p-6 shadow-panel">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-text-muted">
                  Important!
                </p>
                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  Rezultatele au caracter informativ și sunt construite pentru claritate și estimare
                  rapidă. Pentru state de plată finale sau cazuri speciale, verifică legislația și
                  confirmă cu HR sau un specialist contabil.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8 lg:pt-20">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-text-muted">
              Calculator salariu 2026
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
              Exemple populare de calcul salariu
            </h2>
            <p className="mt-4 text-lg leading-8 text-text-secondary">
              Blocuri gata să captureze intenția long-tail pentru căutări de tip „salariu net pentru
              X lei brut”.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {programmaticExamples.map((gross) => {
              const example = buildSalaryExample(gross);
              return (
                <Link
                  key={gross}
                  href={`/salariu-net-pentru/${gross}`}
                  className="rounded-[32px] border border-border bg-surface p-6 shadow-panel transition hover:-translate-y-1 hover:border-border-strong"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-text-muted">
                    Exemplu
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-text-primary">
                    {gross.toLocaleString("ro-RO")} lei brut
                  </h3>
                  <div className="mt-5 space-y-2 text-sm leading-7 text-text-secondary">
                    <p>Net total estimat: {example.takeHomeTotal.toLocaleString("ro-RO")} lei</p>
                    <p>Cost angajator: {example.totalEmployerCost.toLocaleString("ro-RO")} lei</p>
                    <p>CAS: {example.cas.toLocaleString("ro-RO")} lei</p>
                    <p>CASS + impozit: {(example.cass + example.incomeTax).toLocaleString("ro-RO")} lei</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8 lg:pt-20">
          <FaqSection />
        </section>
      </main>
    </>
  );
}
