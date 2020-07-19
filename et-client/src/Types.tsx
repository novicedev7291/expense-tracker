export interface RouteUrl {
  url: string;
}

export interface Transaction {
  id: number;
  amount: Number;
  addedOn: Date;
}

export interface Expense {
  id: number;
  category: string;
  description: string;
  amount: number;
  addedOn: Date;
}

export interface NewExpense {
  category: string;
  description: string;
  amount: number;
  addedOn: Date;
}

export interface Income {
  id: number;
  source: string;
  amount: number;
  addedOn: Date;
}

export interface Saving {
  id: number;
  source: string;
  amount: number;
  addedOn: Date;
}

export interface Summary {
  income: number;
  saving: number;
  expense: number;
  balance: number;
}
