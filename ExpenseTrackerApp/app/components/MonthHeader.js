import React from 'react';
import {View, StyleSheet, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../config/colors';
import DatePickerModal from './DatePickerModal';
import Text from './Text';
import Date from '../utility/date';

function MonthHeader({
  date,
  variant,
  visible,
  onPress,
  onMonthChange,
  onCancel,
}) {
  return (
    <>
      <TouchableHighlight onPress={onPress}>
        <View style={[styles.container, {backgroundColor: colors[variant]}]}>
          <Text style={styles.month}>{date.toMonth()}</Text>
          <Icon
            style={styles.icon}
            name="chevron-down"
            color={colors.white}
            size={20}
          />
        </View>
      </TouchableHighlight>
      <DatePickerModal
        date={date.value()}
        onDateConfirm={onMonthChange}
        onDateCancel={onCancel}
        visible={visible}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    height: 50,
    width: '100%',
  },
  icon: {
    marginLeft: 10,
  },
  month: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default MonthHeader;
