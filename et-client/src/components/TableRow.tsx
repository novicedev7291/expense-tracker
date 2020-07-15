import React from "react";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Expense, Saving, Income } from "../Types";
import { APP_DATE_FORMAT } from "../constant";

import LocaleUtils from "react-day-picker/moment";

interface TableRowProps {
  detailLink: string;
}

interface ExpenseRowProps extends TableRowProps {
  expense: Expense;
}

interface SavingRowProps extends TableRowProps {
  saving: Saving;
}

interface IncomeRowProps extends TableRowProps {
  income: Income;
}

export const SavingRow: React.FC<SavingRowProps> = ({ detailLink, saving }) => {
  return (
    <React.Fragment>
      <tr>
        <td>{saving.id}</td>
        <td>{saving.source}</td>
        <td>{`Rs.${saving.amount}`}</td>
        <td>{LocaleUtils.formatDate(saving.addedOn, APP_DATE_FORMAT)}</td>
        <td>
          <Link to={detailLink} className="btn btn-secondary">
            <FontAwesomeIcon icon="angle-double-right" />
          </Link>
        </td>
      </tr>
    </React.Fragment>
  );
};

export const IncomeRow: React.FC<IncomeRowProps> = ({ detailLink, income }) => {
  return (
    <React.Fragment>
      <tr>
        <td>{income.id}</td>
        <td>{income.source}</td>
        <td>{`Rs.${income.amount}`}</td>
        <td>{LocaleUtils.formatDate(income.addedOn, APP_DATE_FORMAT)}</td>
        <td>
          <Link to={detailLink} className="btn btn-secondary">
            <FontAwesomeIcon icon="angle-double-right" />
          </Link>
        </td>
      </tr>
    </React.Fragment>
  );
};

export const ExpenseRow: React.FC<ExpenseRowProps> = ({
  detailLink,
  expense,
}) => {
  return (
    <React.Fragment>
      <tr>
        <td>{expense.id}</td>
        <td>{expense.category}</td>
        <td>{expense.description}</td>
        <td>{`Rs.${expense.amount}`}</td>
        <td>{LocaleUtils.formatDate(expense.addedOn, APP_DATE_FORMAT)}</td>
        <td>
          <Link to={detailLink} className="btn btn-secondary">
            <FontAwesomeIcon icon="angle-double-right" />
          </Link>
        </td>
      </tr>
    </React.Fragment>
  );
};
