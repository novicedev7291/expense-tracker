import React from 'react';
import {StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

import colors from '../config/colors';

function ListItemDeleteAction({onPress, style}) {
  return (
    <TouchableWithoutFeedback
      style={[styles.container, style]}
      onPress={onPress}>
      <MaterialCommunityIcons
        name="delete-forever"
        size={35}
        color={colors.white}
      />
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.danger,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default ListItemDeleteAction;
