import {
  ADVANCED_SECTOR_RULES,
  BASE_TAXES,
  SECTOR_LABELS,
  TAX_PERIODS
} from "@/lib/tax-engine/config";
import { SalaryBreakdown, SalaryInput, SalarySector } from "@/lib/tax-engine/types";

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const round2 = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;
const roundUpToTen = (value: number) => Math.ceil(value / 10) * 10;
const isValidSector = (sector: SalaryInput["sector"]) =>
  Object.prototype.hasOwnProperty.call(SECTOR_LABELS, sector);
const isValidTaxPeriod = (taxPeriodId: SalaryInput["taxPeriodId"]) =>
  Object.prototype.hasOwnProperty.call(TAX_PERIODS, taxPeriodId);

const sanitizeInput = (input: SalaryInput): SalaryInput => {
  return {
    ...input,
    amount: Number.isFinite(input.amount) ? Math.max(0, input.amount) : 0,
    bonus: Number.isFinite(input.bonus) ? Math.max(0, input.bonus) : 0,
    dependents: clamp(Math.floor(input.dependents || 0), 0, 4)
  };
};

export function calculatePersonalDeduction(
  grossSalary: number,
  minimumWage: number,
  dependents: number
) {
  const cappedDependents = Math.min(dependents, 4);

  if (grossSalary > minimumWage + 2000) {
    return 0;
  }

  const basePercent = [20, 25, 30, 35, 45][cappedDependents];
  const delta = Math.max(0, grossSalary - minimumWage);
  const steps = delta === 0 ? 0 : Math.ceil(delta / 50);
  const adjustedPercent = Math.max(basePercent - steps * 0.5, 0);

  return roundUpToTen((minimumWage * adjustedPercent) / 100);
}

function getSectorRates(sector: SalarySector, isBaseJob: boolean) {
  if (!isBaseJob || sector === "standard") {
    return {
      casRate: BASE_TAXES.casRate,
      cassRate: BASE_TAXES.cassRate,
      employerCamRate: BASE_TAXES.employerCamRate,
      exemptIncomeTaxCap: 0
    };
  }

  if (sector === "it") {
    return ADVANCED_SECTOR_RULES.it;
  }

  return ADVANCED_SECTOR_RULES[sector];
}

function calculateGrossBreakdown(grossSalary: number, rawInput: SalaryInput): SalaryBreakdown {
  const input = sanitizeInput({
    ...rawInput,
    sector: isValidSector(rawInput.sector) ? rawInput.sector : "standard",
    taxPeriodId: isValidTaxPeriod(rawInput.taxPeriodId) ? rawInput.taxPeriodId : "2026-h1"
  });
  const period = TAX_PERIODS[input.taxPeriodId];
  const rates = getSectorRates(input.sector, input.isBaseJob);
  const employmentGross = round2(grossSalary + input.bonus);

  const minimumReliefEligible =
    input.applyMinimumWageRelief &&
    input.isBaseJob &&
    input.sector === "standard" &&
    input.bonus === 0 &&
    round2(grossSalary) === period.minimumWage;
  const minimumWageReliefApplied = minimumReliefEligible ? period.minimumWageRelief : 0;

  const contributionBase = Math.max(employmentGross - minimumWageReliefApplied, 0);
  const cas = round2(contributionBase * rates.casRate);
  const cass = round2(contributionBase * rates.cassRate);
  const personalDeduction = calculatePersonalDeduction(
    grossSalary,
    period.minimumWage,
    input.dependents
  );
  const incomeTaxBase = Math.max(contributionBase - cas - cass - personalDeduction, 0);
  const exemptIncomeCap = rates.exemptIncomeTaxCap;
  const incomeTaxableRatio =
    exemptIncomeCap > 0 && employmentGross > 0
      ? Math.max(employmentGross - Math.min(employmentGross, exemptIncomeCap), 0) / employmentGross
      : 1;
  const incomeTaxableBase =
    exemptIncomeCap > 0 && input.isBaseJob ? incomeTaxBase * incomeTaxableRatio : incomeTaxBase;
  const incomeTax = round2(incomeTaxableBase * BASE_TAXES.incomeTaxRate);

  const employerCam = round2(contributionBase * rates.employerCamRate);
  const netSalary = round2(employmentGross - cas - cass - incomeTax);
  const takeHomeTotal = netSalary;
  const totalEmployerCost = round2(employmentGross + employerCam);
  const employeeTaxesTotal = round2(cas + cass + incomeTax);
  const employerTaxesTotal = round2(employerCam);
  const notes: string[] = [];

  if (minimumWageReliefApplied > 0) {
    notes.push(
      `Facilitatea pentru salariul minim a exclus ${minimumWageReliefApplied} lei din baza de contribuții și impozit.`
    );
  }

  if (input.sector !== "standard") {
    notes.push(
      `Facilitățile pentru ${SECTOR_LABELS[input.sector].toLowerCase()} depind de CAEN, cifra de afaceri, funcția de bază și plafonul de 10.000 lei.`
    );
  }

  if (personalDeduction > 0) {
    notes.push(`Deducerea personală estimată este ${personalDeduction} lei pentru luna selectată.`);
  }

  return {
    periodLabel: period.label,
    grossSalary: round2(grossSalary),
    grossTaxableCompensation: employmentGross,
    targetNetSalary: input.mode === "netToGross" ? input.amount : null,
    bonus: round2(input.bonus),
    netSalary,
    takeHomeTotal,
    cas,
    cass,
    incomeTax,
    employerCam,
    totalEmployerCost,
    incomeTaxBase: round2(incomeTaxBase),
    personalDeduction,
    minimumWageReliefApplied,
    employeeTaxesTotal,
    employerTaxesTotal,
    effectiveNetRate: employmentGross > 0 ? round2((takeHomeTotal / employmentGross) * 100) : 0,
    effectiveTaxRate: employmentGross > 0 ? round2((employeeTaxesTotal / employmentGross) * 100) : 0,
    yearlyNetSalary: round2(takeHomeTotal * 12),
    yearlyEmployerCost: round2(totalEmployerCost * 12),
    yearlyTaxes: round2((employeeTaxesTotal + employerTaxesTotal) * 12),
    sectorLabel: SECTOR_LABELS[input.sector],
    notes
  };
}

export function calculateFromGross(input: SalaryInput): SalaryBreakdown {
  return calculateGrossBreakdown(input.amount, { ...input, mode: "grossToNet" });
}

export function calculateFromNet(input: SalaryInput): SalaryBreakdown {
  const sanitized = sanitizeInput(input);
  const targetNet = sanitized.amount;
  let low = 0;
  let high = Math.max(targetNet * 2.2 + sanitized.bonus, 1000);
  let result = calculateGrossBreakdown(high, sanitized);

  while (result.takeHomeTotal < targetNet) {
    high *= 1.5;
    result = calculateGrossBreakdown(high, sanitized);
    if (high > 200000) {
      break;
    }
  }

  for (let index = 0; index < 60; index += 1) {
    const mid = (low + high) / 2;
    const attempt = calculateGrossBreakdown(mid, sanitized);

    if (attempt.takeHomeTotal >= targetNet) {
      high = mid;
      result = attempt;
    } else {
      low = mid;
    }
  }

  return {
    ...result,
    grossSalary: round2(result.grossSalary),
    targetNetSalary: targetNet
  };
}

export function calculateSalary(input: SalaryInput) {
  const sanitized = sanitizeInput(input);

  return sanitized.mode === "grossToNet"
    ? calculateFromGross(sanitized)
    : calculateFromNet(sanitized);
}
