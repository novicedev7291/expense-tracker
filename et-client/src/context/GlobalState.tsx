import React, { PropsWithChildren, useReducer } from "react";

import AppContext, { AppDate, initialState } from "./";
import { Expense, Saving, Income } from "../Types";
import {
  appReducer,
  ADD_EXPENSES,
  ADD_INCOMES,
  ADD_SAVINGS,
  Payload,
  ERROR,
} from "./reducers";

import { ETApiService } from "../service/ETApiService";

const etService = new ETApiService();

const GlobalStateProvider = (props: PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const fetchExpenses = (monthYear: AppDate) => {
    etService
      .getExpenses(monthYear.toMonthYearStr())
      .then((value) =>
        dispatch({
          type: ADD_EXPENSES,
          payload: new Payload<Expense>(monthYear, value),
        })
      )
      .catch((err) =>
        dispatch({
          type: ERROR,
          payload: new Payload(undefined, undefined),
          error: err,
        })
      );
  };

  const fetchIncomes = (monthYear: AppDate) => {
    etService
      .getIncomes(monthYear.toMonthYearStr())
      .then((value) =>
        dispatch({
          type: ADD_INCOMES,
          payload: new Payload<Income>(monthYear, value),
        })
      )
      .catch((err) =>
        dispatch({
          type: ERROR,
          payload: new Payload(undefined, undefined),
          error: err,
        })
      );
  };

  const fetchSavings = (monthYear: AppDate) => {
    etService
      .getSavings(monthYear.toMonthYearStr())
      .then((value) =>
        dispatch({
          type: ADD_SAVINGS,
          payload: new Payload<Saving>(monthYear, value),
        })
      )
      .catch((err) =>
        dispatch({
          type: ERROR,
          payload: new Payload(undefined, undefined),
          error: err,
        })
      );
  };

  return (
    <AppContext.Provider
      value={{
        state,
        fetchExpenses,
        fetchIncomes,
        fetchSavings,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default GlobalStateProvider;
