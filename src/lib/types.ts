export type CurrencyID = "GBP" | "USD";
export interface CurrencyInfo {
    iso: string;
    symbol: string;
  }
export const availableCurrencies: Record<CurrencyID, CurrencyInfo> = {
    GBP: { iso: "GBP", symbol: "£" },
    USD: { iso: "USD", symbol: "$" },
  };


export interface ResultHistory {
    result: Result;
    input: OriginalLoanInputs;
}

export interface Result {
    dailyInterest: number;
    dailyInterestAccrued: number;
    accrualDate: Date | undefined;
    daysElapsed: number;
    totalInterest: number;
    currency: CurrencyID;
}

export interface OriginalLoanInputs {
    loanAmount: number,
    currency?: string,
    startDate?: Date | number | string,
    endDate?: Date | number | string,
    baseInterestRate?: number // percent
    margin?: number // percent
}