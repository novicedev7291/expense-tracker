import React, { useEffect } from "react";

import { RouteUrl } from "./Types";
import TopHeading from "./components/TopHeading";
import { ExpenseRow } from "./components/TableRow";

import { RouteComponentProps } from "react-router-dom";

import { useLocalState, useUIDispatch } from "./hooks";
import { AppDate } from "./context";
import TopActions from "./components/TopActions";
import ColumnView from "./components/ColumnView";

interface Props extends RouteComponentProps<RouteUrl> {}

export const Expense: React.FC<Props> = ({ match }) => {
  const { url } = match;
  const {
    expenses,
    loading,
    error,
    currentMonthYear: monthYear,
  } = useLocalState();
  const { fetchExpenses, changeMonthYear } = useUIDispatch();

  useEffect(() => {
    fetchExpenses(monthYear);
  }, [monthYear, fetchExpenses]);

  return (
    <React.Fragment>
      <TopHeading
        iconName="money-bill-wave"
        title="Expense"
        variantClassName="bg-danger"
      />
      <TopActions
        actionDate={monthYear}
        actionNavLabel="Add Expense"
        actionNavLink={`/${url}/new`}
        handleDateChange={(value: Date) => changeMonthYear(new AppDate(value))}
      />
      <ColumnView
        heading="Expenses"
        headers={["#", "Category", "Description", "Amount", "AddedOn", ""]}
        loading={loading}
        error={error}
        renderFirstColumn={() => {
          if (expenses) {
            const expensesList = expenses?.map((e) => (
              <ExpenseRow
                key={`${e.id}`}
                detailLink={`${url}/${e.id}`}
                expense={e}
              />
            ));
            return expensesList;
          }
          return null;
        }}
      />
    </React.Fragment>
  );
};
