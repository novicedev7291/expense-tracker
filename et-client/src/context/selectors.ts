import { AppState, MonthYearObj } from "./";
import { Expense, Income, Saving } from "../Types";

const selectSheet = (state: AppState): MonthYearObj | undefined => {
  const monthYearKey = state.currentMonthYear.toMonthYearStr();
  return state.monthYear ? state.monthYear!.get(monthYearKey) : state.monthYear;
};

export const selectExpenses = (state: AppState): Expense[] => {
  const sheet = selectSheet(state);

  let expenses: Expense[] = [];
  if (sheet && sheet.expenses) {
    sheet.expenses.forEach((value, key) => expenses.push(value));
  }
  return expenses;
};

export const selectIncomes = (state: AppState): Income[] => {
  const sheet = selectSheet(state);

  let incomes: Income[] = [];
  if (sheet && sheet.incomes) {
    sheet.incomes.forEach((value, key) => incomes.push(value));
  }
  return incomes;
};

export const selectSavings = (state: AppState): Saving[] => {
  const sheet = selectSheet(state);

  let savings: Saving[] = [];
  if (sheet && sheet.savings) {
    sheet.savings.forEach((value, key) => savings.push(value));
  }
  return savings;
};

export const selectExpense = (
  state: AppState,
  id: number
): Expense | undefined => {
  console.log(id);
  const sheet = selectSheet(state);
  if (sheet && sheet.expenses) {
    return sheet.expenses.get(id)!;
  }
  return undefined;
};

export const selectIncome = (
  state: AppState,
  id: number
): Income | undefined => {
  const sheet = selectSheet(state);
  if (sheet && sheet.incomes) {
    return sheet.incomes.get(id)!;
  }
  return undefined;
};

export const selectSaving = (
  state: AppState,
  id: number
): Saving | undefined => {
  const sheet = selectSheet(state);
  if (sheet && sheet.savings) {
    return sheet.savings.get(id)!;
  }
  return undefined;
};
