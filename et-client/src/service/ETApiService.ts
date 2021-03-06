import { Expense, Income, Saving, Summary } from "../Types";
import LocaleUtils from "react-day-picker/moment";
import { API_DATE_FORMAT } from "../constant";
import { AppDate } from "../context";

export class ETApiService {
  private mapJsonToObject = <T extends Expense | Saving | Income>(
    json: any
  ): T => {
    return Object.assign({}, json, {
      addedOn: LocaleUtils.parseDate(json.addedOn, API_DATE_FORMAT),
    });
  };

  getExpenses = async (monthYear: string): Promise<Expense[]> => {
    const res = await fetch(`/expenses?monthYear=${monthYear}`);
    const expenseJsonArray = (await res.json()) as any[];
    console.log(expenseJsonArray);
    return expenseJsonArray.map((value) => this.mapJsonToObject(value));
  };

  getIncomes = async (monthYear: string): Promise<Income[]> => {
    const res = await fetch(`/incomeSources?monthYear=${monthYear}`);
    const incomeJsonArray = (await res.json()) as any[];
    return incomeJsonArray.map((value) => this.mapJsonToObject(value));
  };

  getSummary = async (monthYear: string): Promise<Summary> => {
    const response = await fetch(`/summary?monthYear=${monthYear}`);
    const summaryJson = await response.json();
    return Object.assign({}, summaryJson) as Summary;
  };

  getSavings = async (monthYear: string): Promise<Saving[]> => {
    const res = await fetch(`/savings?monthYear=${monthYear}`);
    const savingsJsonArray = (await res.json()) as any[];
    return savingsJsonArray.map((value) => this.mapJsonToObject(value));
  };

  addNewExpense = async (expense: Expense): Promise<Expense> => {
    const addedOn = new AppDate(expense.addedOn);
    const monthYearVal = addedOn.toMonthYearStr();

    const bodyData = Object.assign({}, expense, {
      monthYear: monthYearVal,
      addedOn: addedOn.toFormat(API_DATE_FORMAT),
    });

    console.log(bodyData);

    const response = await fetch("/expenses", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });
    const expenseJson = await response.json();
    return this.mapJsonToObject(expenseJson) as Expense;
  };

  addNewIncome = async (income: Income): Promise<Income> => {
    const addedOn = new AppDate(income.addedOn);
    const monthYearVal = addedOn.toMonthYearStr();

    const bodyData = Object.assign({}, income, {
      monthYear: monthYearVal,
      addedOn: addedOn.toFormat(API_DATE_FORMAT),
    });

    console.log(bodyData);

    const response = await fetch("/incomeSources", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });
    const incomeJson = await response.json();
    return this.mapJsonToObject(incomeJson) as Income;
  };

  addNewSaving = async (saving: Saving): Promise<Saving> => {
    const addedOn = new AppDate(saving.addedOn);
    const monthYearVal = addedOn.toMonthYearStr();

    const bodyData = Object.assign({}, saving, {
      monthYear: monthYearVal,
      addedOn: addedOn.toFormat(API_DATE_FORMAT),
    });

    console.log(bodyData);

    const response = await fetch("/savings", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });
    const savingJson = await response.json();
    return this.mapJsonToObject(savingJson) as Saving;
  };

  deleteExpense = async (id: number): Promise<Expense> => {
    const response = await fetch(`/expense/${id}`, {
      method: "DELETE",
      mode: "cors",
    });
    const deletedExpenseJson = await response.json();
    return this.mapJsonToObject(deletedExpenseJson) as Expense;
  };

  deleteIncome = async (id: number): Promise<Income> => {
    const response = await fetch(`/txn/${id}`, {
      method: "DELETE",
      mode: "cors",
    });
    const deletedIncomeJson = await response.json();
    return this.mapJsonToObject(deletedIncomeJson) as Income;
  };

  deleteSaving = async (id: number): Promise<Saving> => {
    const response = await fetch(`/txn/${id}`, {
      method: "DELETE",
      mode: "cors",
    });
    const deletedSavingJson = await response.json();
    return this.mapJsonToObject(deletedSavingJson) as Saving;
  };
}
