import { Expense } from "../Types";
import { LocaleUtils } from "react-day-picker/types/LocaleUtils";
import { APP_DATE_FORMAT } from "../constant";

export class ExpenseModel implements Expense {
  id: BigInt;
  category: string;
  description: string;
  amount: number;
  addedOn: Date;

  constructor(expenseJson: any) {
    this.id = expenseJson.id;
    this.category = expenseJson.category;
    this.description = expenseJson.description;
    this.amount = expenseJson.amount;
    this.addedOn = LocaleUtils.parseDate(expenseJson.addedOn, APP_DATE_FORMAT);
  }
}
