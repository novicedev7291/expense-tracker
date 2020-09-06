import React, {useState} from 'react';
import {useFormikContext} from 'formik';

import AppDate from '../../utility/date';
import DateInput from '../DateInput';
import ErrorMessage from './ErrorMessage';

function FormDateField({icon, name, placeholder, width}) {
  const [showCalendar, setShowCalendar] = useState(false);
  const {
    errors,
    setFieldValue,
    setFieldTouched,
    touched,
    values,
  } = useFormikContext();

  const hideCalendar = () => setShowCalendar(false);

  const handleOnCancel = () => hideCalendar();

  const handleOnConfirm = (newDate) => {
    hideCalendar();
    setFieldTouched(name, true);
    setFieldValue(name, AppDate(newDate));
  };

  return (
    <>
      <DateInput
        icon={icon}
        date={values[name]}
        placeholder={placeholder}
        onDateConfirm={handleOnConfirm}
        onDateCancel={handleOnCancel}
        onSelect={() => setShowCalendar(true)}
        showCalendar={showCalendar}
        width={width}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default FormDateField;
