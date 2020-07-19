import React, { useEffect } from "react";

import TopHeading from "./components/TopHeading";
import { RouteUrl } from "./Types";
import { SavingRow } from "./components/TableRow";

import { RouteComponentProps } from "react-router-dom";
import { useLocalState, useUIDispatch } from "./hooks";
import { AppDate } from "./context";
import TopActions from "./components/TopActions";
import ColumnView from "./components/ColumnView";

interface Props extends RouteComponentProps<RouteUrl> {}

export const Saving: React.FC<Props> = ({ match }) => {
  const { url } = match;
  const {
    savings,
    loading,
    error,
    currentMonthYear: monthYear,
  } = useLocalState();
  const { fetchSavings, changeMonthYear } = useUIDispatch();

  useEffect(() => {
    fetchSavings(monthYear);
  }, [fetchSavings, monthYear]);
  return (
    <React.Fragment>
      <TopHeading iconName="hand-holding-usd" title="Saving" />
      <TopActions
        actionDate={monthYear}
        actionNavLabel="Add Saving"
        actionNavLink={`/${url}/new`}
        actionNavVariant="btn-primary"
        handleDateChange={(value: Date) => changeMonthYear(new AppDate(value))}
      />
      <ColumnView
        heading="Savings"
        headers={["#", "Source", "Amount", "AddedOn", ""]}
        loading={loading}
        error={error}
        renderFirstColumn={() => {
          if (savings) {
            const savingsList = savings.map((s) => (
              <SavingRow
                key={`${s.id}`}
                detailLink={`${url}/${s.id}`}
                saving={s}
              />
            ));
            return savingsList;
          }
          return null;
        }}
      />
    </React.Fragment>
  );
};
