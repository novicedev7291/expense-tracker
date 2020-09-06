import React from 'react';
import {View, StyleSheet} from 'react-native';

import colors from '../config/colors';
import Text from './Text';

function Tag({title, style}) {
  return (
    <View style={[styles.container, style]}>
      <Text numberOfLines={1} style={styles.text}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.warning,
    borderRadius: 10,
    justifyContent: 'center',
    height: 20,
    padding: 10,
  },
  text: {
    color: colors.alert,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Tag;
