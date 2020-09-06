import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import ListLayout from '../layouts/ListLayout';
import AppDate from '../utility/date';

const expenses = [
  {
    id: 1,
    title: 'Groceries for this week',
    amount: 783,
    subtitle: 'Groceries',
    addedOn: '08/08/2020',
  },
  {
    id: 2,
    title: 'Rent for this month',
    amount: 21000,
    subtitle: 'Rent',
    date: '08/08/2020',
  },
  {
    id: 3,
    title: 'Bike service',
    amount: 1210,
    subtitle: 'Miscellaneous',
    date: '08/08/2020',
  },
  {
    id: 4,
    title: 'Internet bill for this month',
    amount: 999,
    subtitle: 'Internet & Phone',
    date: '08/08/2020',
  },
];

function ExpensesScreen(props) {
  const [date, setDate] = useState(AppDate(new Date()));
  const [visible, setVisible] = useState(false);

  const hideDatePicker = () => setVisible(false);

  const handleDateChange = (newDate) => {
    hideDatePicker();
    setDate(AppDate(newDate));
  };

  const handleAddItem = () => console.log('Add new item');
  const handleDeleteItem = (id) =>
    console.log(`Deleting current item by ID : ${id}`);
  return (
    <ListLayout
      date={date}
      showMonthPicker={visible}
      onMonthClick={() => setVisible(true)}
      onMonthChange={handleDateChange}
      onMonthCancel={hideDatePicker}
      items={expenses}
      onAddItem={handleAddItem}
      onDeleteItem={handleDeleteItem}
      variant="success"
    />
  );
}

export default ExpensesScreen;
