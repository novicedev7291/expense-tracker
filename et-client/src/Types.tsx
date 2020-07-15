export interface RouteUrl {
  url: string;
}

export interface Transaction {
  id: BigInt;
  amount: Number;
  addedOn: Date;
}

export interface ExpenseJson {
  id: BigInt;
  category: string;
  description: string;
  amount: Number;
  addedOn: string;
}

export interface Expense {
  id: BigInt;
  category: string;
  description: string;
  amount: Number;
  addedOn: Date;
}
export interface TransactionJson {
  id: BigInt;
  source: string;
  amount: Number;
  addedOn: Date;
}
export interface Income {
  id: BigInt;
  source: string;
  amount: Number;
  addedOn: Date;
}

export interface Saving {
  id: BigInt;
  source: string;
  amount: Number;
  addedOn: Date;
}
