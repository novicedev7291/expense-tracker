import React from 'react';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

function DatePickerModal({date, onDateConfirm, onDateCancel, visible}) {
  return (
    <DateTimePickerModal
      date={date}
      isVisible={visible}
      mode="calendar"
      onConfirm={onDateConfirm}
      onCancel={onDateCancel}
    />
  );
}

export default DatePickerModal;
