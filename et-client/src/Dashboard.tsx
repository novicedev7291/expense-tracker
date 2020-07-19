import React, { useEffect } from "react";

import TopHeading from "./components/TopHeading";
import { ExpenseRow } from "./components/TableRow";

import { useLocalState, useUIDispatch } from "./hooks";
import { AppDate } from "./context";
import SummaryChart from "./components/SummaryChart";
import TopActions from "./components/TopActions";
import ColumnView from "./components/ColumnView";

interface Props {}

export const Dashboard: React.FC<Props> = () => {
  const {
    expenses,
    loading,
    error,
    summary,
    currentMonthYear: monthYear,
  } = useLocalState();

  const { fetchExpenses, fetchSummary, changeMonthYear } = useUIDispatch();

  useEffect(() => {
    fetchExpenses(monthYear);
    fetchSummary(monthYear);
  }, [monthYear, fetchExpenses, fetchSummary]);

  return (
    <React.Fragment>
      <TopHeading iconName="cog" title="Dashboard" />
      <TopActions
        actionDate={monthYear}
        actionNavLabel="Add Expense"
        actionNavLink="/expense/new"
        handleDateChange={(value: Date) => changeMonthYear(new AppDate(value))}
      />
      <ColumnView
        heading="Latest Expenses"
        headers={["#", "Category", "Description", "Amount", "Added On", ""]}
        loading={loading}
        error={error}
        renderSecondColumn={() => <SummaryChart {...summary} />}
        renderFirstColumn={() => {
          if (expenses) {
            const expenseList = expenses?.map((e) => (
              <ExpenseRow
                key={e.id.toString()}
                detailLink={`expense/${e.id}`}
                expense={e}
              />
            ));
            return expenseList;
          }
          return null;
        }}
        reverseColumnDirection
      />
    </React.Fragment>
  );
};
