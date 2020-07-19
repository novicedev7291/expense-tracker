import React, { useEffect } from "react";

import { IncomeRow } from "./components/TableRow";
import TopHeading from "./components/TopHeading";
import { RouteComponentProps } from "react-router-dom";

import { AppDate } from "./context";
import { useLocalState, useUIDispatch } from "./hooks";
import TopActions from "./components/TopActions";
import ColumnView from "./components/ColumnView";

interface Props extends RouteComponentProps<{ url: string }> {}

export const Income: React.FC<Props> = ({ match }) => {
  const { url } = match;

  const {
    incomes,
    loading,
    error,
    currentMonthYear: monthYear,
  } = useLocalState();
  const { fetchIncomes, changeMonthYear } = useUIDispatch();

  useEffect(() => {
    fetchIncomes(monthYear);
  }, [fetchIncomes, monthYear]);

  return (
    <React.Fragment>
      <TopHeading
        iconName="wallet"
        title="Income"
        variantClassName="bg-success"
      />
      <TopActions
        actionDate={monthYear}
        actionNavLabel="Add Income"
        actionNavLink={`/${url}/new`}
        actionNavVariant="btn-success"
        handleDateChange={(value: Date) => changeMonthYear(new AppDate(value))}
      />

      <ColumnView
        heading="Income Sources"
        headers={["#", "Source", "Amount", "AddedOn", ""]}
        loading={loading}
        error={error}
        renderFirstColumn={() => {
          if (incomes) {
            const incomeList = incomes?.map((i) => (
              <IncomeRow
                key={`${i.id}`}
                detailLink={`${url}/${i.id}`}
                income={i}
              />
            ));
            return incomeList;
          }
          return null;
        }}
      />
    </React.Fragment>
  );
};
