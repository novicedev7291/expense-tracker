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

export interface MonthYearObj {
  expenses?: Map<number, Expense>;
  savings?: Map<number, Saving>;
  incomes?: Map<number, Income>;
  totalIncome?: number;
  totalSaving?: number;
  totalExpense?: number;
}

export interface AppState {
  currentMonthYear: AppDate;
  monthYear?: Map<string, MonthYearObj>;
  loading: boolean;
  error?: string;
}

export class Payload<T> {
  monthYear?: AppDate;
  data?: T[] | T;

  constructor(monthYear?: AppDate, data?: T[] | T) {
    this.monthYear = monthYear;
    this.data = data;
  }
}

export type ReducerAction = {
  type: string;
  payload: Payload<any>;
  error?: string;
};

export const initialState = {
  currentMonthYear: new AppDate(new Date()),
  loading: false,
  error: undefined,
};

const AppStateContext = createContext<AppState>(initialState);
const AppDispatchContext = createContext<
  React.Dispatch<ReducerAction> | undefined
>(undefined);

export { AppStateContext, AppDispatchContext };
