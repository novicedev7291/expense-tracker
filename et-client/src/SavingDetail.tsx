import * as React from "react";

import { RouteComponentProps } from "react-router-dom";

import TopHeading from "./components/TopHeading";
import { useLocalState, useUIDispatch } from "./hooks";
import { Saving } from "./Types";
import TransactionForm from "./components/TransactionForm";
import NavBack from "./components/NavBack";

interface Props extends RouteComponentProps<{ id: string }> {}

export const SavingDetail: React.FC<Props> = ({ match, history }) => {
  const [values, setValues] = React.useState<Saving>({
    id: 0,
    source: "",
    amount: 0,
    addedOn: new Date(),
  });
  const { selectSaving, loading, error } = useLocalState();

  const { addNewSaving, deleteSaving } = useUIDispatch();

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleDateChange = (value: Date) =>
    setValues({ ...values, addedOn: value });

  const handleAddNewSaving = () => addNewSaving(values);

  const handleDeleteSaving = (saving: Saving) => {
    history.goBack();
    deleteSaving(saving);
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
          variant="primary"
          handleDateChange={handleDateChange}
          handleFieldChange={handleFieldChange}
          handleOnAddClick={handleAddNewSaving}
        />
      );
    } else {
      const saving = selectSaving(Number.parseInt(id));
      formValues.set("source", saving!.source);
      formValues.set("amount", saving!.amount);
      formValues.set("addedOn", saving!.addedOn);

      transactionForm = (
        <TransactionForm
          title={`ID : ${saving && saving.id}`}
          fields={fields}
          loading={loading}
          error={error}
          readOnly
          variant="success"
          values={formValues}
          handleOnDeleteClick={() => handleDeleteSaving(saving!)}
        />
      );
    }

    return (
      <React.Fragment>
        <TopHeading
          iconName="hand-holding-usd"
          title="Add Saving"
          variantClassName="bg-primary"
        />
        <NavBack navAction={() => history.goBack()} />
        {transactionForm}
      </React.Fragment>
    );
  }
  return null;
};
