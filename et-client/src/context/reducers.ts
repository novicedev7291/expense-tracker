import { Expense, Income, Saving } from "../Types";

import { AppState, AppDate, MonthYearObj } from "./";

export const ADD_EXPENSES = "ADD_EXPENSES";
export const ADD_INCOMES = "ADD_INCOMES";
export const ADD_SAVINGS = "ADD_SAVINGS";
export const ERROR = "ERROR";

export class Payload<T> {
  monthYear?: AppDate;
  data?: T[];

  constructor(monthYear?: AppDate, data?: T[]) {
    this.monthYear = monthYear;
    this.data = data;
  }
}

type ReducerAction = {
  type: string;
  payload: Payload<any>;
  error?: string;
};

const toMap = <T extends { id: BigInt }>(data: T[]): Map<BigInt, T> => {
  return data.reduce((map: Map<BigInt, T>, value: T) => {
    map.set(value.id, value);
    return map;
  }, new Map<BigInt, T>());
};

const addExpenses = (state: AppState, payload: Payload<Expense>): AppState => {
  const monthYearVal = payload.monthYear!.toMonthYearStr();
  const existingMonthYearMap =
    state.monthYear || new Map<string, MonthYearObj>();

  const monthYearObj = existingMonthYearMap.get(monthYearVal) || {};
  monthYearObj.expenses = toMap(payload.data!);

  existingMonthYearMap.set(monthYearVal, monthYearObj);

  return {
    ...state,
    monthYear: existingMonthYearMap,
    loading: false,
  };
};

const addIncomes = (state: AppState, payload: Payload<Income>): AppState => {
  const monthYearVal = payload.monthYear!.toMonthYearStr();

  const monthYearMap = state.monthYear || new Map<string, MonthYearObj>();

  const monthYearObj = monthYearMap.get(monthYearVal) || {};
  monthYearObj.incomes = toMap(payload.data!);

  monthYearMap.set(monthYearVal, monthYearObj);

  return {
    ...state,
    monthYear: monthYearMap,
    loading: false,
  };
};

const addSavings = (state: AppState, payload: Payload<Saving>): AppState => {
  const monthYearVal = payload.monthYear!.toMonthYearStr();

  const monthYearMap = state.monthYear || new Map<string, MonthYearObj>();

  const monthYearObj = monthYearMap.get(monthYearVal) || {};
  monthYearObj.savings = toMap(payload.data!);

  monthYearMap.set(monthYearVal, monthYearObj);

  return {
    ...state,
    monthYear: monthYearMap,
    loading: false,
  };
};

export const appReducer = (state: AppState, action: ReducerAction) => {
  console.log(action);
  switch (action.type) {
    case ADD_EXPENSES:
      return addExpenses(state, action.payload);
    case ADD_INCOMES:
      return addIncomes(state, action.payload);
    case ADD_SAVINGS:
      return addSavings(state, action.payload);
    case "ERROR":
      return { ...state, error: action.error };
    default:
      return state;
  }
};
