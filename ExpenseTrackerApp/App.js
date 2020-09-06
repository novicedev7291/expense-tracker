import React, {useState} from 'react';
import ListItem from './app/components/ListItem';
import Text from './app/components/TextInput';
import Button from './app/components/Button';
import WelcomeScreen from './app/screens/WelcomeScreen';
import ExpensesScreen from './app/screens/ExpensesScreen';
import DatePickerModal from './app/components/DatePickerModal';
import AppDate from './app/utility/date';
import MonthHeader from './app/components/MonthHeader';
import ExpenseEditScreen from './app/screens/ExpenseEditScreen';

const App = () => {
  return <ExpenseEditScreen />;
};

export default App;
