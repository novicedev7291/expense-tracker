import * as React from "react";

import { RouteComponentProps } from "react-router-dom";

import { useLocalState, useUIDispatch } from "./hooks";
import { Income } from "./Types";
import TopHeading from "./components/TopHeading";
import TransactionForm from "./components/TransactionForm";
import NavBack from "./components/NavBack";

interface Props extends RouteComponentProps<{ id: string }> {}

export const IncomeDetail: React.FC<Props> = ({ match, history }) => {
  const [values, setValues] = React.useState<Income>({
    id: 0,
    source: "",
    amount: 0,
    addedOn: new Date(),
  });
  const { selectIncome, loading, error } = useLocalState();

  const { addNewIncome, deleteIncome } = useUIDispatch();

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleDateChange = (value: Date) =>
    setValues({ ...values, addedOn: value });

  const handleAddNewIncome = () => addNewIncome(values);

  const handleDeleteIncome = (income: Income) => {
    history.goBack();
    deleteIncome(income);
  };

  const fields = [
    {
      placeholder: "Source",
      name: "source",
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
    const formValues = new Map<string, any>();
    let transactionForm = null;
    if (id === "new") {
      formValues.set("source", values.source);
      formValues.set("amount", values.amount);
      formValues.set("addedOn", values.addedOn);

      transactionForm = (
        <TransactionForm
          fields={fields}
          loading={loading}
          error={error}
          values={formValues}
          variant="success"
          handleDateChange={handleDateChange}
          handleFieldChange={handleFieldChange}
          handleOnAddClick={handleAddNewIncome}
        />
      );
    } else {
      const income = selectIncome(Number.parseInt(id));
      formValues.set("source", income!.source);
      formValues.set("amount", income!.amount);
      formValues.set("addedOn", income!.addedOn);
      transactionForm = (
        <TransactionForm
          title={`ID : ${income && income.id}`}
          fields={fields}
          loading={loading}
          error={error}
          readOnly
          variant="success"
          values={formValues}
          handleOnDeleteClick={() => handleDeleteIncome(income!)}
        />
      );
    }

    return (
      <React.Fragment>
        <TopHeading
          iconName="wallet"
          title="View Income"
          variantClassName="bg-success"
        />
        <NavBack navAction={() => history.goBack()} />
        {transactionForm}
      </React.Fragment>
    );
  }
  return null;
};
