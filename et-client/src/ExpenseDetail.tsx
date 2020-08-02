import * as React from "react";

import { RouteComponentProps } from "react-router-dom";

import TopHeading from "./components/TopHeading";
import { useLocalState, useUIDispatch } from "./hooks";
import { Expense } from "./Types";
import TransactionForm from "./components/TransactionForm";
import NavBack from "./components/NavBack";

interface Props extends RouteComponentProps<{ id: string }> {}

export const ExpenseDetail: React.FC<Props> = ({ match, history }) => {
  const [values, setValues] = React.useState<Expense>({
    id: 0,
    category: "",
    description: "",
    amount: 0,
    addedOn: new Date(),
  });

  const { selectExpense, loading, error } = useLocalState();
  const { addNewExpense, deleteExpense } = useUIDispatch();

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleDateChange = (value: Date) => {
    setValues({ ...values, addedOn: value });
  };

  const handleOnDelete = (expense: Expense) => {
    history.goBack();
    deleteExpense(expense);
  };

  const handleAddExpense = () => {
    console.log(values);
    addNewExpense(values);
  };

  const fields = [
    {
      placeholder: "Category",
      name: "category",
      type: "text",
    },
    {
      placeholder: "Description",
      name: "description",
      type: "text",
    },
    {
      placeholder: "Amount",
      name: "amount",
      type: "number",
    },
  ];

  if (match) {
    const { id } = match.params;

    let transactionForm = null;
    const formValues = new Map<string, any>();

    if (id === "new") {
      formValues.set("category", values.category);
      formValues.set("description", values.description);
      formValues.set("amount", values.amount);
      formValues.set("addedOn", values.addedOn);

      transactionForm = (
        <TransactionForm
          loading={loading}
          error={error}
          fields={fields}
          values={formValues}
          variant="danger"
          handleDateChange={handleDateChange}
          handleFieldChange={handleFieldChange}
          handleOnAddClick={handleAddExpense}
        />
      );
    } else {
      const expense = selectExpense(Number.parseInt(id));

      formValues.set("category", expense!.category);
      formValues.set("description", expense!.description);
      formValues.set("amount", expense!.amount);
      formValues.set("addedOn", expense!.addedOn);

      transactionForm = (
        <TransactionForm
          title={`ID : ${expense && expense.id}`}
          loading={loading}
          error={error}
          fields={fields}
          values={formValues}
          variant="danger"
          readOnly
          handleOnDeleteClick={() => handleOnDelete(expense!)}
        />
      );
    }

    return (
      <React.Fragment>
        <TopHeading
          iconName="money-bill-wave"
          title="Add Expense"
          variantClassName="bg-danger"
        />
        <NavBack navAction={() => history.goBack()} />
        {transactionForm}
      </React.Fragment>
    );
  }
  return null;
};
