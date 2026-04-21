"use client";

import { useEffect, useMemo, useState } from "react";
import { calculateSalary } from "@/lib/tax-engine/calculator";
import { TAX_PERIODS } from "@/lib/tax-engine/config";
import { SalaryInput } from "@/lib/tax-engine/types";
import { TaxTooltip } from "@/components/calculator/tax-tooltip";

type Locale = "ro" | "en";

interface SalaryCalculatorProps {
  locale: Locale;
  initialState: SalaryInput;
}

const formatCurrency = (value: number, locale: Locale = "ro") =>
  new Intl.NumberFormat(locale === "ro" ? "ro-RO" : "en-US", {
    style: "currency",
    currency: "RON",
    maximumFractionDigits: 0
  }).format(value);

const formatDetailedCurrency = (value: number, locale: Locale = "ro") =>
  new Intl.NumberFormat(locale === "ro" ? "ro-RO" : "en-US", {
    style: "currency",
    currency: "RON",
    maximumFractionDigits: 2
  }).format(value);

const PERIODS = Object.values(TAX_PERIODS);
const URL_SYNC_DELAY_MS = 450;

function buildCalculatorUrl(state: SalaryInput) {
  if (typeof window === "undefined") {
    return "";
  }

  const params = new URLSearchParams(window.location.search);

  params.set("mode", state.mode);
  params.set("amount", String(state.amount));
  params.set("bonus", String(state.bonus));
  params.set("dependents", String(state.dependents));
  params.set("sector", state.sector);
  params.set("period", state.taxPeriodId);
  params.set("baseJob", state.isBaseJob ? "1" : "0");
  params.set("minRelief", state.applyMinimumWageRelief ? "1" : "0");

  return `${window.location.pathname}?${params.toString()}`;
}

function safelyReplaceUrl(nextUrl: string) {
  if (!nextUrl || nextUrl === `${window.location.pathname}${window.location.search}`) {
    return;
  }

  try {
    window.history.replaceState({}, "", nextUrl);
  } catch {
    // Safari rate-limits History API calls during rapid range input changes.
  }
}

export function SalaryCalculator({ locale, initialState }: SalaryCalculatorProps) {
  const [state, setState] = useState<SalaryInput>(initialState);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      safelyReplaceUrl(buildCalculatorUrl(state));
    }, URL_SYNC_DELAY_MS);

    return () => window.clearTimeout(timeoutId);
  }, [state]);

  const result = useMemo(() => calculateSalary(state), [state]);
  const primaryResultValue =
    state.mode === "grossToNet" ? result.takeHomeTotal : result.grossSalary;
  const primaryResultDescription =
    state.mode === "grossToNet"
      ? "Suma estimată pe care o încasezi"
      : "Brut estimat pentru ținta selectată";
  const primaryResultMobileLabel = state.mode === "grossToNet" ? "Net estimat" : "Brut estimat";
  const sliderAmount = Math.min(Math.max(state.amount, 1000), 30000);

  const updateState = <Key extends keyof SalaryInput>(key: Key, value: SalaryInput[Key]) =>
    setState((current) => ({ ...current, [key]: value }));

  const handleCopy = async () => {
    const summary =
      state.mode === "grossToNet"
        ? `Brut: ${formatDetailedCurrency(state.amount, locale)} | Net estimat: ${formatDetailedCurrency(
            result.takeHomeTotal,
            locale
          )} | Cost angajator: ${formatDetailedCurrency(result.totalEmployerCost, locale)}`
        : `Net dorit: ${formatDetailedCurrency(state.amount, locale)} | Brut necesar: ${formatDetailedCurrency(
            result.grossSalary,
            locale
          )} | Cost angajator: ${formatDetailedCurrency(result.totalEmployerCost, locale)}`;

    await navigator.clipboard.writeText(summary);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const handleShare = async () => {
    const nextUrl = buildCalculatorUrl(state);
    safelyReplaceUrl(nextUrl);
    const url = nextUrl ? `${window.location.origin}${nextUrl}` : window.location.href;

    if (navigator.share) {
      await navigator.share({
        title: "Calculator salariu net",
        text: "Vezi simularea salarială",
        url
      });
      return;
    }

    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const taxRows = [
    {
      label: "CAS",
      info: "Contribuția la pensii. În scenariul standard este 25% din baza de calcul.",
      value: result.cas
    },
    {
      label: "CASS",
      info: "Contribuția la sănătate. În scenariul standard este 10% din baza de calcul.",
      value: result.cass
    },
    {
      label: "Impozit",
      info: "Impozitul pe venit aplicat bazei impozabile după contribuții și deduceri.",
      value: result.incomeTax
    },
    {
      label: "CAM angajator",
      info: "Contribuția asiguratorie pentru muncă plătită de angajator, inclusă în costul total.",
      value: result.employerCam
    }
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] xl:grid-cols-[1.05fr_0.95fr]">
      <section className="rounded-[32px] border border-border bg-surface p-5 shadow-halo backdrop-blur sm:p-7">
        <div className="mb-6 flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-text-muted">
              Calculator instant
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-text-primary">
              Salariu net ↔ brut, în timp real
            </h2>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="grid gap-4 md:grid-cols-2">
            <button
              type="button"
              onClick={() => updateState("mode", "grossToNet")}
              className={`rounded-[24px] border px-5 py-4 text-left transition ${
                state.mode === "grossToNet"
                  ? "border-primary bg-primary text-primary-foreground shadow-panel"
                  : "border-border bg-primary-subtle text-text-secondary"
              }`}
            >
              <div className="text-xs uppercase tracking-[0.22em] opacity-70">Mode</div>
              <div className="mt-2 text-lg font-semibold">Brut → Net</div>
            </button>
            <button
              type="button"
              onClick={() => updateState("mode", "netToGross")}
              className={`rounded-[24px] border px-5 py-4 text-left transition ${
                state.mode === "netToGross"
                  ? "border-primary bg-primary text-primary-foreground shadow-panel"
                  : "border-border bg-primary-subtle text-text-secondary"
              }`}
            >
              <div className="text-xs uppercase tracking-[0.22em] opacity-70">Mode</div>
              <div className="mt-2 text-lg font-semibold">Net → Brut</div>
            </button>
          </div>

          <div className="rounded-[28px] border border-border bg-surface-input p-5">
            <label className="mb-2 block text-sm font-medium text-text-secondary">
              {state.mode === "grossToNet" ? "Brut lunar" : "Net lunar dorit"}
            </label>
            <div className="flex items-center gap-3 rounded-[22px] border border-border bg-surface px-4 py-4">
              <input
                type="number"
                min={0}
                value={state.amount}
                onChange={(event) => updateState("amount", Number(event.target.value))}
                className="calculator-number-input w-full bg-transparent text-3xl font-semibold tracking-tight text-text-primary outline-none sm:text-4xl"
              />
              <span className="text-sm font-semibold uppercase tracking-[0.24em] text-text-muted">
                RON
              </span>
            </div>
            <input
              type="range"
              min={1000}
              max={30000}
              step={50}
              value={sliderAmount}
              onChange={(event) => updateState("amount", Number(event.target.value))}
              className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-primary-subtle accent-primary"
            />
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-text-muted">
              <span className="rounded-full bg-surface px-3 py-2">Actualizare instant</span>
              <span className="rounded-full bg-surface px-3 py-2">Fără refresh</span>
              <span className="rounded-full bg-surface px-3 py-2">Link shareable</span>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-text-secondary">Bonus lunar</label>
              <input
                type="number"
                min={0}
                value={state.bonus}
                onChange={(event) => updateState("bonus", Number(event.target.value))}
                className="calculator-number-input w-full rounded-[22px] border border-border bg-surface-input px-4 py-3 text-lg font-medium text-text-primary outline-none transition focus:border-primary focus:bg-surface"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-text-secondary">
                Persoane în întreținere
              </label>
              <select
                value={state.dependents}
                onChange={(event) => updateState("dependents", Number(event.target.value))}
                className="calculator-select w-full rounded-[22px] border border-border bg-surface-input px-4 py-3 text-lg font-medium text-text-primary outline-none transition focus:border-primary focus:bg-surface"
              >
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4+</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-text-secondary">Sector fiscal</label>
              <select
                value={state.sector}
                onChange={(event) =>
                  updateState("sector", event.target.value as SalaryInput["sector"])
                }
                className="calculator-select w-full rounded-[22px] border border-border bg-surface-input px-4 py-3 text-lg font-medium text-text-primary outline-none transition focus:border-primary focus:bg-surface"
              >
                <option value="standard">Standard</option>
                <option value="it">IT / software</option>
                <option value="construction">Construcții</option>
                <option value="agriculture">Agricultură</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-text-secondary">Perioadă</label>
              <select
                value={state.taxPeriodId}
                onChange={(event) =>
                  updateState("taxPeriodId", event.target.value as SalaryInput["taxPeriodId"])
                }
                className="calculator-select w-full rounded-[22px] border border-border bg-surface-input px-4 py-3 text-lg font-medium text-text-primary outline-none transition focus:border-primary focus:bg-surface"
              >
                {PERIODS.map((period) => (
                  <option key={period.id} value={period.id}>
                    {period.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-3 rounded-[28px] border border-border bg-surface-input p-5">
            <label className="flex items-center justify-between gap-4 rounded-[20px] bg-surface px-4 py-3">
              <span className="text-sm font-medium text-text-secondary">Funcție de bază</span>
              <input
                type="checkbox"
                checked={state.isBaseJob}
                onChange={(event) => updateState("isBaseJob", event.target.checked)}
                className="h-5 w-5 rounded border-border-strong text-primary focus:ring-primary"
              />
            </label>
            <label className="flex items-center justify-between gap-4 rounded-[20px] bg-surface px-4 py-3">
              <span className="text-sm font-medium text-text-secondary">
                Aplică facilitatea pentru salariul minim
              </span>
              <input
                type="checkbox"
                checked={state.applyMinimumWageRelief}
                onChange={(event) => updateState("applyMinimumWageRelief", event.target.checked)}
                className="h-5 w-5 rounded border-border-strong text-primary focus:ring-primary"
              />
            </label>
          </div>
        </div>
      </section>

      <aside className="space-y-5 lg:pt-1">
        <div className="rounded-[32px] border border-border-strong bg-primary p-6 text-primary-foreground shadow-halo sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-primary-muted">Rezultat principal</p>
              <h3 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
                {formatCurrency(primaryResultValue, locale)}
              </h3>
              <p className="mt-2 text-sm font-medium text-primary-muted">
                {primaryResultDescription}
              </p>
              <p className="mt-1 text-sm text-primary-muted">{result.periodLabel}</p>
              <div className="mt-4 inline-flex rounded-full bg-primary-panel px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary-muted">
                Taxe estimate: {formatCurrency(result.employeeTaxesTotal, locale)}
              </div>
            </div>
            <div className="rounded-2xl bg-primary-panel px-3 py-2 text-right text-sm shadow-sm">
              <div className="text-primary-muted">Randament net</div>
              <div className="mt-1 text-lg font-semibold">{result.effectiveNetRate}%</div>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[24px] border border-primary-border bg-primary-panel p-4 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.24em] text-primary-muted">Net lunar</p>
              <p className="mt-2 text-2xl font-semibold">{formatCurrency(result.netSalary, locale)}</p>
            </div>
            <div className="rounded-[24px] border border-primary-border bg-primary-panel p-4 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.24em] text-primary-muted">Cost angajator</p>
              <p className="mt-2 text-2xl font-semibold">
                {formatCurrency(result.totalEmployerCost, locale)}
              </p>
            </div>
            <div className="rounded-[24px] border border-primary-border bg-primary-panel p-4 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.24em] text-primary-muted">Net anual</p>
              <p className="mt-2 text-2xl font-semibold">
                {formatCurrency(result.yearlyNetSalary, locale)}
              </p>
            </div>
            <div className="rounded-[24px] border border-primary-border bg-primary-panel p-4 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.24em] text-primary-muted">Cost anual firmă</p>
              <p className="mt-2 text-2xl font-semibold">
                {formatCurrency(result.yearlyEmployerCost, locale)}
              </p>
            </div>
          </div>

          <p className="mt-5 rounded-[20px] bg-primary-panel px-4 py-3 text-sm leading-6 text-primary-muted">
            Rezultatele sunt estimative și au scop informativ.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-2xl bg-surface px-4 py-3 text-sm font-semibold text-text-primary transition hover:-translate-y-0.5"
            >
              {copied ? "Copiat" : "Copiază sumarul"}
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="rounded-2xl border border-primary-border px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary-panel"
            >
              Distribuie / link
            </button>
          </div>
        </div>

        <div className="rounded-[32px] border border-border bg-surface p-6 shadow-panel">
          <h3 className="text-xl font-semibold tracking-tight text-text-primary">Detalii contribuții</h3>
          <div className="mt-5 space-y-4">
            {taxRows.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between gap-4 rounded-[22px] bg-surface-input px-4 py-3"
              >
                <div className="text-sm font-medium text-text-secondary">
                  <TaxTooltip label={row.label} content={row.info} />
                </div>
                <div className="text-base font-semibold text-text-primary">
                  {formatDetailedCurrency(row.value, locale)}
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between gap-4 rounded-[22px] bg-accent-subtle px-4 py-3">
              <div className="text-sm font-medium text-text-secondary">Deducere personală</div>
              <div className="text-base font-semibold text-text-primary">
                {formatDetailedCurrency(result.personalDeduction, locale)}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[32px] border border-border bg-surface p-6 shadow-panel">
          <h3 className="text-xl font-semibold tracking-tight text-text-primary">Note utile</h3>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-text-secondary">
            {result.notes.map((note) => (
              <li key={note} className="rounded-[20px] bg-surface-input px-4 py-3">
                {note}
              </li>
            ))}
            <li className="rounded-[20px] bg-surface-input px-4 py-3">
              Actualizat pentru scenarii fiscale 2026. Pentru state de plată finale, confirmă cu HR sau
              contabilul companiei.
            </li>
          </ul>
        </div>

        <div className="rounded-[32px] border border-border bg-surface p-6 shadow-panel">
          <h3 className="text-xl font-semibold tracking-tight text-text-primary">Comparație rapidă</h3>
          <div className="mt-5 grid grid-cols-1 gap-3 text-center sm:grid-cols-3">
            <div className="rounded-[24px] border border-border bg-surface-input p-4">
              <div className="text-xs uppercase tracking-[0.24em] text-text-muted">Brut</div>
              <div className="mt-2 text-lg font-semibold text-text-primary">
                {formatCurrency(result.grossSalary, locale)}
              </div>
            </div>
            <div className="rounded-[24px] border border-border-strong bg-success-subtle p-4">
              <div className="text-xs uppercase tracking-[0.24em] text-success">Net</div>
              <div className="mt-2 text-lg font-semibold text-text-primary">
                {formatCurrency(result.takeHomeTotal, locale)}
              </div>
            </div>
            <div className="rounded-[24px] border border-border bg-surface-input p-4">
              <div className="text-xs uppercase tracking-[0.24em] text-text-muted">Cost firmă</div>
              <div className="mt-2 text-lg font-semibold text-text-primary">
                {formatCurrency(result.totalEmployerCost, locale)}
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div className="fixed inset-x-4 bottom-[108px] z-50 rounded-[24px] border border-border bg-surface p-4 shadow-halo backdrop-blur lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.24em] text-text-muted">
              {primaryResultMobileLabel}
            </div>
            <div className="mt-1 text-xl font-semibold text-text-primary">
              {formatCurrency(primaryResultValue, locale)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs uppercase tracking-[0.24em] text-text-muted">Cost angajator</div>
            <div className="mt-1 text-base font-semibold text-text-primary">
              {formatCurrency(result.totalEmployerCost, locale)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
