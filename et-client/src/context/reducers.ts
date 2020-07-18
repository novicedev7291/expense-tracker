import { Expense, Income, Saving } from "../Types";

import { AppState, MonthYearObj, Payload, ReducerAction, AppDate } from "./";

export const ADD_EXPENSES = "ADD_EXPENSES";
export const ADD_INCOMES = "ADD_INCOMES";
export const ADD_SAVINGS = "ADD_SAVINGS";
export const ADD_INCOME = "ADD_INCOME";
export const ADD_SAVING = "ADD_INCOME";
export const ADD_EXPENSE = "ADD_EXPENSE";
export const FETCH_SUMMARY = "FETCH_SUMMARY";
export const CHANGE_MONTH = "CHANGE_MONTH";
export const API_CALL = "API_CALL";
export const ERROR = "ERROR";

const toMap = <T extends { id: number }>(data: T[]): Map<number, T> => {
  return data.reduce((map: Map<number, T>, value: T) => {
    map.set(value.id, value);
    return map;
  }, new Map<number, T>());
};

const addExpenses = (state: AppState, payload: Payload<Expense>): AppState => {
  const monthYearVal = payload.monthYear!.toMonthYearStr();
  const existingMonthYearMap =
    state.monthYear || new Map<string, MonthYearObj>();

  const monthYearObj = existingMonthYearMap.get(monthYearVal) || {};
  monthYearObj.expenses = toMap(payload.data! as Expense[]);

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
  monthYearObj.incomes = toMap(payload.data! as Income[]);

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
  monthYearObj.savings = toMap(payload.data! as Saving[]);

  monthYearMap.set(monthYearVal, monthYearObj);

  return {
    ...state,
    monthYear: monthYearMap,
    loading: false,
  };
};

const addExpense = (state: AppState, payload: Payload<Expense>): AppState => {
  const expense = payload.data! as Expense;

  if (expense) {
    const monthYearVal = new AppDate(expense.addedOn).toMonthYearStr();
    const monthYearMap = state.monthYear || new Map<string, MonthYearObj>();
    const monthYearObj = monthYearMap.get(monthYearVal) || {};

    const expenses = monthYearObj.expenses || new Map<number, Expense>();
    expenses.set(expense.id, expense);

    return {
      ...state,
      monthYear: {
        ...monthYearMap,
        [monthYearVal]: {
          ...monthYearObj,
          expenses: {
            ...expenses,
          },
        },
      },
      loading: false,
    };
  }

  return state;
};

const appReducer = (state: AppState, action: ReducerAction): AppState => {
  console.log(action);
  switch (action.type) {
    case ADD_EXPENSES:
      return addExpenses(state, action.payload);
    case ADD_INCOMES:
      return addIncomes(state, action.payload);
    case ADD_SAVINGS:
      return addSavings(state, action.payload);
    case API_CALL:
      return {
        ...state,
        loading: true,
      };
    case CHANGE_MONTH:
      return {
        ...state,
        currentMonthYear: action.payload.monthYear!,
      };
    case ADD_EXPENSE:
      return addExpense(state, action.payload);
    case ERROR:
      return { ...state, error: action.error, loading: false };
    default:
      return state;
  }
};

export default appReducer;
