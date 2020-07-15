import { Expense, Income, Saving } from "../Types";
import LocaleUtils from "react-day-picker/moment";
import { APP_DATE_FORMAT } from "../constant";

export class ETApiService {
  getExpenses = async (monthYear: string): Promise<Expense[]> => {
    const res = await fetch(`/expenses?monthYear=${monthYear}`);
    const expenseJsonArray = (res.json() as unknown) as any[];
    return expenseJsonArray.map((value) =>
      Object.assign({}, value, {
        addedOn: LocaleUtils.parseDate(value.addedOn, APP_DATE_FORMAT),
      })
    );
  };
  getIncomes = async (monthYear: string): Promise<Income[]> => {
    const res = await fetch(`/incomes?monthYear=${monthYear}`);
    const incomeJsonArray = (res.json() as unknown) as any[];
    return incomeJsonArray.map((value) =>
      Object.assign({}, value, {
        addedOn: LocaleUtils.parseDate(value.addedOn, APP_DATE_FORMAT),
      })
    );
  };
  getSavings = async (monthYear: string): Promise<Saving[]> => {
    const res = await fetch(`/savings?monthYear=${monthYear}`);
    const savingsJsonArray = (res.json() as unknown) as any[];
    return savingsJsonArray.map((value) =>
      Object.assign({}, value, {
        addedOn: LocaleUtils.parseDate(value.addedOn, APP_DATE_FORMAT),
      })
    );
  };
}
