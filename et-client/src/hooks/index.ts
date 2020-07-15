import { useState, useEffect } from "react";

import { Income, Saving, Expense } from "../Types";
import sheet from "../sheet.json";

const decodeExpense = (json: any): Expense => {
  return Object.assign({}, json);
};

const decodeIncome = (json: any): Income => Object.assign({}, json);
const decodeSaving = (json: any): Saving => Object.assign({}, json);

type S = keyof Expense | keyof Income | keyof Saving;

const fetch = async (url: string): Promise<Array<S>> => {
  if (url.indexOf("/expenses") === 0) {
    const fetchExpenses = () =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(sheet.expenses.reverse().map(decodeExpense));
        }, 1000);
      });
    const response = await fetchExpenses();
    return new Promise((resolve) => {
      resolve((response as any[]) as S[]);
    });
  }
  if (url.indexOf("/incomes") === 0) {
    const fetchIncomes = () =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(sheet.incomes.reverse().map(decodeIncome));
        }, 1000);
      });
    const response = await fetchIncomes();
    return new Promise((resolve) => {
      resolve((response as any[]) as S[]);
    });
  }
  if (url.indexOf("/savings") === 0) {
    const fetchSavings = () =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(sheet.savings.reverse().map(decodeSaving));
        }, 1000);
      });
    const response = await fetchSavings();
    return new Promise((resolve) => {
      resolve((response as any[]) as S[]);
    });
  }
  return new Promise((resolve, reject) => reject("Could not fetch data"));
};

interface ApiReturnData<S> {
  data?: S;
  error?: string;
  loading: boolean;
}

export const useFetch = <T>(
  url: string,
  forMonthYear?: Date
): ApiReturnData<T> => {
  const [data, setData] = useState<ApiReturnData<T>>({ loading: false });

  useEffect(() => {
    setData({ loading: true });

    if (url) {
      try {
        const getData = async () => {
          const data = await fetch(url);
          setData({
            data: (data as any) as T,
            error: undefined,
            loading: false,
          });
        };
        getData();
      } catch (e) {
        setData({ error: e, loading: false });
        console.error(e);
      }
    }
  }, [url]);

  return data;
};
