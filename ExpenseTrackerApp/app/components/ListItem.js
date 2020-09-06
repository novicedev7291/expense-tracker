import React from 'react';
import {View, StyleSheet} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import colors from '../config/colors';
import Text from './Text';
import DeleteSwipeAction from './ListItemDeleteSwipeAction';

/**
 * @typedef Item
 * @type {object}
 * @property {number} id - Unique identifier for item
 * @property {string} title - List item title.
 * @property {string} subtitle - List item subtitle (optional)
 * @property {number} amount - Amount
 * @property {string} addedOn - Date item added
 */
/**
 * @typedef Props
 * @type {object}
 * @property {Item} item - item to be rendered
 * @property {function} onDeleteItem - Callback on delete item click
 *
 * @param {Props} props
 */
function ListItem({item, onDeleteItem, variant}) {
  const swipeRef = React.useRef();

  const handleDelete = (id) => {
    swipeRef.current.close();
    onDeleteItem(id);
  };

  const renderLeftActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 80],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    return (
      <DeleteSwipeAction
        style={[styles.deleteAction, {backgroundColor: colors[variant]}]}
        actionStyle={[styles.deleteIcon, {transform: [{scale}]}]}
        onDeletePress={() => handleDelete(item.id)}
      />
    );
  };

  return (
    <Swipeable
      ref={swipeRef}
      friction={3}
      leftThreshold={80}
      renderLeftActions={renderLeftActions}>
      <View style={styles.container}>
        <View style={styles.detailContainer}>
          <View style={styles.firstLine}>
            <Text
              numberOfLines={2}
              style={[styles.heading, {color: colors[variant]}]}>
              {item.title}
            </Text>
            <Text style={styles.date}>{item.addedOn}</Text>
          </View>
          {item.subtitle && (
            <Text numberOfLines={1} style={styles.subtitle}>
              {item.subtitle}
            </Text>
          )}
          <Text
            numberOfLines={1}
            style={styles.price}>{`$${item.amount}`}</Text>
        </View>
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.white,
    flexDirection: 'row',
    padding: 10,
    width: '100%',
  },
  date: {
    color: colors.mediumGrey,
    fontSize: 14,
    fontWeight: 'bold',
  },
  deleteAction: {
    alignItems: 'center',
    backgroundColor: colors.danger,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  deleteIcon: {
    marginHorizontal: 10,
    width: 35,
  },
  detailContainer: {
    flex: 1,
  },
  firstLine: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  heading: {
    color: colors.primary,
    fontWeight: 'bold',
    flex: 1,
  },
  price: {
    color: colors.secondary,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default ListItem;
