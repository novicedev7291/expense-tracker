import React, { useContext } from "react";

import { Income, Saving, Expense, Summary } from "../Types";
import {
  selectExpenses,
  selectIncomes,
  selectSavings,
  selectExpense,
  selectIncome,
  selectSaving,
  selectSummary,
} from "../context/selectors";
import {
  AppDispatchContext,
  AppDate,
  Payload,
  AppStateContext,
} from "../context";
import {
  CHANGE_MONTH,
  ADD_EXPENSES,
  ADD_INCOMES,
  ADD_SAVINGS,
  ERROR,
  ADD_EXPENSE,
  API_CALL,
  ADD_SAVING,
  ADD_INCOME,
  ADD_SUMMARY,
} from "../context/reducers";
import { ETApiService } from "../service/ETApiService";
import { useHistory } from "react-router";

export interface ContextStateValue {
  currentMonthYear: AppDate;
  expenses: Expense[];
  incomes: Income[];
  savings: Saving[];
  loading: boolean;
  selectExpense: (id: number) => Expense | undefined;
  selectSaving: (id: number) => Saving | undefined;
  selectIncome: (id: number) => Income | undefined;
  summary: Summary;
  error: string | undefined;
}

const etService = new ETApiService();

export const useLocalState = (): ContextStateValue => {
  const state = useContext(AppStateContext);

  const getExpenseById = (id: number): Expense | undefined =>
    selectExpense(state, id);
  const getIncomeById = (id: number): Income | undefined =>
    selectIncome(state, id);
  const getSavignById = (id: number): Saving | undefined =>
    selectSaving(state, id);

  return {
    currentMonthYear: state.currentMonthYear,
    expenses: selectExpenses(state),
    incomes: selectIncomes(state),
    savings: selectSavings(state),
    selectExpense: getExpenseById,
    selectIncome: getIncomeById,
    selectSaving: getSavignById,
    summary: selectSummary(state),
    loading: state.loading,
    error: state.error,
  };
};

export const useUIDispatch = () => {
  const dispatch = useContext(AppDispatchContext);
  const history = useHistory();

  const fetchSummary = React.useCallback(
    (value: AppDate) => {
      etService
        .getSummary(value.toMonthYearStr())
        .then((summary) =>
          dispatch!({ type: ADD_SUMMARY, payload: new Payload(value, summary) })
        )
        .catch((err) =>
          dispatch!({ type: ERROR, payload: new Payload(), error: err })
        );
    },
    [dispatch]
  );

  const changeMonthYear = React.useCallback(
    (value: AppDate) => {
      dispatch!({ type: CHANGE_MONTH, payload: new Payload(value) });
    },
    [dispatch]
  );

  const fetchExpenses = React.useCallback(
    (monthYear: AppDate) => {
      etService
        .getExpenses(monthYear.toMonthYearStr())
        .then((value) =>
          dispatch!({
            type: ADD_EXPENSES,
            payload: new Payload<Expense>(monthYear, value),
          })
        )
        .catch((err) =>
          dispatch!({
            type: ERROR,
            payload: new Payload(),
            error: err,
          })
        );
    },
    [dispatch]
  );

  const fetchIncomes = React.useCallback(
    (monthYear: AppDate) => {
      etService
        .getIncomes(monthYear.toMonthYearStr())
        .then((value) =>
          dispatch!({
            type: ADD_INCOMES,
            payload: new Payload<Income>(monthYear, value),
          })
        )
        .catch((err) =>
          dispatch!({
            type: ERROR,
            payload: new Payload(),
            error: err,
          })
        );
    },
    [dispatch]
  );

  const fetchSavings = React.useCallback(
    (monthYear: AppDate) => {
      etService
        .getSavings(monthYear.toMonthYearStr())
        .then((value) =>
          dispatch!({
            type: ADD_SAVINGS,
            payload: new Payload<Saving>(monthYear, value),
          })
        )
        .catch((err) =>
          dispatch!({
            type: ERROR,
            payload: new Payload(),
            error: err,
          })
        );
    },
    [dispatch]
  );

  const addNewExpense = React.useCallback(
    (expense: Expense) => {
      dispatch!({ type: API_CALL, payload: new Payload() });
      etService
        .addNewExpense(expense)
        .then((expenseData) => {
          dispatch!({
            type: ADD_EXPENSE,
            payload: new Payload<Expense>(undefined, expenseData),
          });

          history.goBack();
        })
        .catch((err) => {
          dispatch!({
            type: ERROR,
            payload: new Payload(undefined, undefined),
            error: err,
          });
        });
    },
    [dispatch, history]
  );

  const addNewIncome = React.useCallback(
    (income: Income) => {
      dispatch!({ type: API_CALL, payload: new Payload() });
      etService
        .addNewIncome(income)
        .then((incomeData) => {
          dispatch!({
            type: ADD_SAVING,
            payload: new Payload<Income>(undefined, incomeData),
          });
          history.goBack();
        })
        .catch((err) => {
          dispatch!({
            type: ERROR,
            payload: new Payload(undefined, undefined),
            error: err,
          });
        });
    },
    [dispatch, history]
  );

  const addNewSaving = React.useCallback(
    (saving: Saving) => {
      dispatch!({ type: API_CALL, payload: new Payload() });
      etService
        .addNewSaving(saving)
        .then((savingData) => {
          dispatch!({
            type: ADD_INCOME,
            payload: new Payload<Income>(undefined, savingData),
          });
          history.goBack();
        })
        .catch((err) => {
          dispatch!({
            type: ERROR,
            payload: new Payload(undefined, undefined),
            error: err,
          });
        });
    },
    [dispatch, history]
  );

  return {
    changeMonthYear,
    fetchExpenses,
    fetchSavings,
    fetchIncomes,
    addNewExpense,
    addNewIncome,
    addNewSaving,
    fetchSummary,
  };
};
