import { Expense, Income, Saving } from "../Types";

import { AppState, AppDate } from "./";

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

type Entity = Expense | Income | Saving;

const toMap = (data: Entity[]): Map<BigInt, Entity> => {
  return data.reduce((map: Map<BigInt, Entity>, value: Entity) => {
    map.set(value.id, value);
    return map;
  }, new Map<BigInt, Entity>());
};

const addExpenses = (state: AppState, payload: Payload<Expense>): AppState => {
  const monthYearVal = payload.monthYear!.toMonthYearStr();
  return {
    ...state,
    [monthYearVal]: {
      expenses: toMap(payload.data!),
      ...["incomes"],
      ...["savings"],
    },
    loading: false,
  };
};

const addIncomes = (state: AppState, payload: Payload<Income>): AppState => {
  const monthYearVal = payload.monthYear!.toMonthYearStr();
  return {
    ...state,
    [monthYearVal]: {
      incomes: toMap(payload.data!),
      ...["expenses"],
      ...["savings"],
    },
    loading: false,
  };
};

const addSavings = (state: AppState, payload: Payload<Saving>): AppState => {
  const monthYearVal = payload.monthYear!.toMonthYearStr();
  return {
    ...state,
    [monthYearVal]: {
      savings: toMap(payload.data!),
      ...["expenses"],
      ...["incomes"],
    },
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
