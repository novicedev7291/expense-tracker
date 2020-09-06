import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../config/colors';

function AddButton({onPress, style}) {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <MaterialCommunityIcons name="pencil" size={35} color={colors.white} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderColor: colors.white,
    borderRadius: 35,
    borderWidth: 5,
    justifyContent: 'center',
    height: 70,
    width: 70,
  },
});

export default AddButton;
