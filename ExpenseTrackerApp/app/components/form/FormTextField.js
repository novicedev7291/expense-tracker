import React from 'react';

import ErrorMessage from './ErrorMessage';
import TextInput from '../TextInput';
import {useFormikContext} from 'formik';

function FormTextField({icon, name, width, ...otherProps}) {
  const {
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    values,
  } = useFormikContext();
  return (
    <>
      <TextInput
        icon={icon}
        value={values[name]}
        name={name}
        onChangeText={(value) => {
          setFieldTouched(name, true);
          setFieldValue(name, value);
        }}
        {...otherProps}
        width={width}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default FormTextField;
