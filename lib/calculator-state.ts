import { SalaryInput } from "@/lib/tax-engine/types";

const VALID_SECTORS: SalaryInput["sector"][] = ["standard", "it", "construction", "agriculture"];
const VALID_PERIODS: SalaryInput["taxPeriodId"][] = ["2026-h1", "2026-h2"];

function parseBoolean(value: string | null) {
  return value === "1" || value === "true";
}

export function buildInitialStateFromSearchParams(
  searchParams: Record<string, string | string[] | undefined>,
  fallback: SalaryInput
) {
  const getSingle = (key: string) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };

  const sectorValue = getSingle("sector");
  const periodValue = getSingle("period");

  return {
    ...fallback,
    mode: getSingle("mode") === "netToGross" ? "netToGross" : fallback.mode,
    amount: Number(getSingle("amount") || fallback.amount),
    bonus: Number(getSingle("bonus") || fallback.bonus),
    dependents: Number(getSingle("dependents") || fallback.dependents),
    sector: VALID_SECTORS.includes(sectorValue as SalaryInput["sector"])
      ? (sectorValue as SalaryInput["sector"])
      : fallback.sector,
    taxPeriodId: VALID_PERIODS.includes(periodValue as SalaryInput["taxPeriodId"])
      ? (periodValue as SalaryInput["taxPeriodId"])
      : fallback.taxPeriodId,
    isBaseJob: parseBoolean(getSingle("baseJob") || "1"),
    applyMinimumWageRelief: parseBoolean(getSingle("minRelief") || "1")
  };
}
