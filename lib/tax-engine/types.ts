export type CalculatorMode = "grossToNet" | "netToGross";

export type SalarySector = "standard" | "it" | "construction" | "agriculture";

export type TaxPeriodId = "2026-h1" | "2026-h2";

export interface TaxPeriodConfig {
  id: TaxPeriodId;
  label: string;
  year: number;
  minimumWage: number;
  minimumWageRelief: number;
}

export interface SalaryInput {
  mode: CalculatorMode;
  amount: number;
  bonus: number;
  dependents: number;
  sector: SalarySector;
  taxPeriodId: TaxPeriodId;
  isBaseJob: boolean;
  applyMinimumWageRelief: boolean;
}

export interface SalaryBreakdown {
  periodLabel: string;
  grossSalary: number;
  grossTaxableCompensation: number;
  targetNetSalary: number | null;
  bonus: number;
  netSalary: number;
  takeHomeTotal: number;
  cas: number;
  cass: number;
  incomeTax: number;
  employerCam: number;
  totalEmployerCost: number;
  incomeTaxBase: number;
  personalDeduction: number;
  minimumWageReliefApplied: number;
  employeeTaxesTotal: number;
  employerTaxesTotal: number;
  effectiveNetRate: number;
  effectiveTaxRate: number;
  yearlyNetSalary: number;
  yearlyEmployerCost: number;
  yearlyTaxes: number;
  sectorLabel: string;
  notes: string[];
}
