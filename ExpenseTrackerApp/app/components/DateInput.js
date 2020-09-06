import React from 'react';
import {
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import defaultStyles from '../config/styles';
import Text from '../components/Text';
import DatePickerModal from './DatePickerModal';

/**
 * @typedef AppDate
 * @type {import('../layouts/ListLayout').AppDate}
 *
 * @typedef Props
 * @type {object}
 * @property {AppDate} date
 *
 * @param {Props} props
 */
function DateInput({
  date,
  icon,
  placeholder,
  onDateConfirm,
  onDateCancel,
  onSelect,
  showCalendar,
  width,
}) {
  return (
    <>
      <TouchableWithoutFeedback onPress={onSelect}>
        <View style={[styles.container, {width: width ? width : '100%'}]}>
          {icon && (
            <Icon
              style={styles.icon}
              name="calendar"
              color={defaultStyles.colors.mediumGrey}
              size={20}
            />
          )}
          {!date && <Text style={styles.placeholder}>{placeholder}</Text>}
          {date && <Text style={styles.text}>{date.toDisplayStr()}</Text>}
        </View>
      </TouchableWithoutFeedback>
      <DatePickerModal
        date={date.value()}
        visible={showCalendar}
        onDateConfirm={onDateConfirm}
        onDateCancel={onDateCancel}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: defaultStyles.colors.lightGrey,
    borderRadius: 25,
    flexDirection: 'row',
    marginVertical: 10,
    padding: 15,
  },
  icon: {
    marginRight: 10,
  },
  placeholder: {
    color: defaultStyles.colors.mediumGrey,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
    fontSize: 18,
    fontWeight: '500',
  },
  text: {
    color: defaultStyles.colors.black,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default DateInput;
