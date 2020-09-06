import React from 'react';
import {StyleSheet, View} from 'react-native';
import * as Yup from 'yup';

import AppDate from '../utility/date';
import {Button, DateField, Form, TextField} from '../components/form';

const validationSchema = Yup.object().shape({
  category: Yup.string().max(50).label('Category'),
  description: Yup.string().min(2).max(255).required().label('Description'),
  amount: Yup.number().positive().max(999999999).required().label('Amount'),
  addedOn: Yup.object().required().label('Added On'),
});

function ExpenseEditScreen(props) {
  return (
    <View style={styles.container}>
      <Form
        initialValues={{
          category: null,
          description: '',
          amount: '',
          addedOn: AppDate(new Date()),
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log(values)}>
        <TextField name="category" placeholder="Category" />
        <TextField
          multiline
          numberOfLines={2}
          name="description"
          placeholder="Description"
        />
        <TextField
          keyboardType="number-pad"
          name="amount"
          placeholder="Amount"
          width={150}
          maxLength={12}
        />
        <DateField icon="calendar" name="addedOn" placeholder="Choose a date" />
        <Button title="Add Expense" />
      </Form>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default ExpenseEditScreen;
