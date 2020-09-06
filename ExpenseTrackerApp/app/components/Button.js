import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import colors from '../config/colors';
import Text from './Text';

function Button({color = 'primary', title, onPress}) {
  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor: colors[color]}]}
      onPress={onPress}>
      <Text style={{color: colors.white, textTransform: 'uppercase'}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    height: 60,
    width: '100%',
    marginTop: 10,
  },
});

export default Button;
