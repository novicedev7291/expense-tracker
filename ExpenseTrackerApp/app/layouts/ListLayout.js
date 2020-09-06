import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';

import AddButton from '../components/AddButton';
import ListItemSeparator from '../components/ListItemSeparator';
import ListItem from '../components/ListItem';
import colors from '../config/colors';
import MonthHeader from '../components/MonthHeader';

/**
 * @typedef Item
 * @type {object}
 * @property {number} id - Unique identifier for item
 * @property {string} title - List item title.
 * @property {string} subtitle - List item subtitle (optional)
 * @property {number} amount - Amount
 * @property {string} addedOn - Date item added
 *
 * @typedef AppDate
 * @type {object}
 * @property {() => string} toMonth
 * @property {(format:string) => string} toFormat
 * @property {() => string} toDisplayStr
 * @property {() => Date} value
 */
/**
 * @typedef {Object} Props
 * @property {Array.<Item>} items - Items to be rendered in layout
 * @property {function} onAddItem - To add new item
 * @property {function} onDeleteItem - To delete item
 * @property {function} onMonthClick
 * @property {function} onMonthChange
 * @property {function} onMonthCancel
 * @property {boolean} showMonthPicker
 * @property {'primary' | 'warning' | 'success'} variant
 * @property {AppDate} date
 */
/**
 * @param {Props} props
 * @returns {JSX.Element} React Element
 */
function ListLayout({
  date,
  onMonthClick,
  onMonthChange,
  onMonthCancel,
  items,
  onAddItem,
  onDeleteItem,
  showMonthPicker,
  variant = 'primary',
}) {
  return (
    <View style={styles.container}>
      <MonthHeader
        variant={variant}
        date={date}
        visible={showMonthPicker}
        onPress={onMonthClick}
        onMonthChange={onMonthChange}
        onCancel={onMonthCancel}
      />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={ListItemSeparator}
        renderItem={({item}) => (
          <ListItem
            variant={variant}
            item={item}
            onDeleteItem={() => onDeleteItem(item.id)}
          />
        )}
      />
      <AddButton
        style={[styles.addBtn, {backgroundColor: colors[variant]}]}
        onPress={onAddItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  addBtn: {
    backgroundColor: colors.primary,
    bottom: 40,
    elevation: 2,
    position: 'absolute',
    right: 20,
    zIndex: 1,
  },
  container: {
    flex: 1,
  },
});

export default ListLayout;
