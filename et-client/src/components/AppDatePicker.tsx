import React, { Fragment } from "react";

import "../fontawesome";
import "react-datetime/css/react-datetime.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import InputGroup from "react-bootstrap/InputGroup";

import "react-day-picker/lib/style.css";
import DayPickerInput from "react-day-picker/DayPickerInput";
import LocaleUtils from "react-day-picker/moment";

interface DatePickerProps {
  dateFormat: string;
  handleDayChange?: (value: Date) => void;
  $value?: Date;
}

const AppDatePicker: React.FunctionComponent<DatePickerProps> = ({
  dateFormat,
  handleDayChange,
  $value = new Date(),
}: DatePickerProps) => (
  <Fragment>
    <InputGroup>
      <DayPickerInput
        format={dateFormat}
        placeholder={`${LocaleUtils.formatDate($value, dateFormat)}`}
        formatDate={LocaleUtils.formatDate}
        parseDate={LocaleUtils.parseDate}
        onDayChange={handleDayChange}
      />
      <InputGroup.Append>
        <InputGroup.Text>
          <FontAwesomeIcon icon="calendar-alt" />
        </InputGroup.Text>
      </InputGroup.Append>
    </InputGroup>
  </Fragment>
);

export default AppDatePicker;
