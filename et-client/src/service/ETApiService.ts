import { Expense, Income, Saving } from "../Types";
import LocaleUtils from "react-day-picker/moment";
import { API_DATE_FORMAT } from "../constant";
import { AppDate } from "../context";

export class ETApiService {
  getExpenses = async (monthYear: string): Promise<Expense[]> => {
    const res = await fetch(`/expenses?monthYear=${monthYear}`);
    const expenseJsonArray = (await res.json()) as any[];
    console.log(expenseJsonArray);
    return expenseJsonArray.map((value) =>
      Object.assign({}, value, {
        addedOn: LocaleUtils.parseDate(value.addedOn, API_DATE_FORMAT),
      })
    );
  };
  getIncomes = async (monthYear: string): Promise<Income[]> => {
    const res = await fetch(`/incomeSources?monthYear=${monthYear}`);
    const incomeJsonArray = (await res.json()) as any[];
    return incomeJsonArray.map((value) =>
      Object.assign({}, value, {
        addedOn: LocaleUtils.parseDate(value.addedOn, API_DATE_FORMAT),
      })
    );
  };
  getSavings = async (monthYear: string): Promise<Saving[]> => {
    const res = await fetch(`/savings?monthYear=${monthYear}`);
    const savingsJsonArray = (await res.json()) as any[];
    return savingsJsonArray.map((value) =>
      Object.assign({}, value, {
        addedOn: LocaleUtils.parseDate(value.addedOn, API_DATE_FORMAT),
      })
    );
  };
  addNewExpense = async (expense: Expense): Promise<any> => {
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

    return response;
  };
}
