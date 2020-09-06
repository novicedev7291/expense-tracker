import React from 'react';
import {View, StyleSheet} from 'react-native';

import colors from '../config/colors';

function ListItemSeparator(props) {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGrey,
    height: 1,
    width: '100%',
  },
});

export default ListItemSeparator;
