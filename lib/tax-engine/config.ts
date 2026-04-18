import { SalarySector, TaxPeriodConfig, TaxPeriodId } from "@/lib/tax-engine/types";

export const TAX_PERIODS: Record<TaxPeriodId, TaxPeriodConfig> = {
  "2026-h1": {
    id: "2026-h1",
    label: "Ianuarie - Iunie 2026",
    year: 2026,
    minimumWage: 4050,
    minimumWageRelief: 300
  },
  "2026-h2": {
    id: "2026-h2",
    label: "Iulie - Decembrie 2026",
    year: 2026,
    minimumWage: 4325,
    minimumWageRelief: 200
  }
};

export const SECTOR_LABELS: Record<SalarySector, string> = {
  standard: "Standard",
  it: "IT / software",
  construction: "Construcții",
  agriculture: "Agricultură & industrie alimentară"
};

export const BASE_TAXES = {
  casRate: 0.25,
  cassRate: 0.1,
  incomeTaxRate: 0.1,
  employerCamRate: 0.0225
};

export const ADVANCED_SECTOR_RULES = {
  it: {
    exemptIncomeTaxCap: 10000,
    casRate: BASE_TAXES.casRate,
    cassRate: BASE_TAXES.cassRate,
    employerCamRate: BASE_TAXES.employerCamRate
  },
  construction: {
    exemptIncomeTaxCap: 10000,
    casRate: 0.2025,
    cassRate: 0.1,
    employerCamRate: 0.003375
  },
  agriculture: {
    exemptIncomeTaxCap: 10000,
    casRate: 0.2025,
    cassRate: 0.1,
    employerCamRate: 0.003375
  }
} as const;
