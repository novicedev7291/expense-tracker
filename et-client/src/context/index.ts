import { createContext } from "react";

import LocaleUtils from "react-day-picker/moment";

import { Expense, Income, Saving } from "../Types";
import { MONTH_YEAR_FORMAT } from "../constant";

export class AppDate {
  value: Date;

  constructor(value: Date) {
    this.value = value;
  }
  toMonthYearStr = (): string =>
    LocaleUtils.formatDate(this.value, MONTH_YEAR_FORMAT);
  toFormat = (format: string): string =>
    LocaleUtils.formatDate(this.value, format);
}

interface MonthYearObj {
  expenses?: Map<BigInt, Expense>;
  savings?: Map<BigInt, Saving>;
  incomes?: Map<BigInt, Income>;
  totalIncome?: number;
  totalSaving?: number;
  totalExpense?: number;
}

export interface AppState {
  monthYear?: Map<string, MonthYearObj>;
  loading: boolean;
  error?: string;
}

export interface ContextValues {
  state: AppState;
  fetchExpenses?: (monthYear: AppDate) => void;
  fetchIncomes?: (monthYear: AppDate) => void;
  fetchSavings?: (monthYear: AppDate) => void;
}

export const initialState = {
  loading: false,
};

const AppContext = createContext<ContextValues>({ state: initialState });

export default AppContext;
