import React, { PropsWithChildren, useReducer, Reducer } from "react";

import {
  AppStateContext,
  AppDispatchContext,
  initialState,
  ReducerAction,
  AppState,
} from "./";

import appReducer from "./reducers";

const ContextProvider = (props: PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer<Reducer<AppState, ReducerAction>>(
    appReducer,
    initialState
  );
  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {props.children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

export default ContextProvider;
