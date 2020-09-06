import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../config/colors';
import defaultStyles from '../config/styles';

function AppTextInput({icon, width, ...otherProps}) {
  return (
    <View style={[styles.container, {width: width ? width : '100%'}]}>
      {icon && (
        <MaterialCommunityIcons style={styles.icon} size={20} name={icon} />
      )}
      <TextInput
        placeholderTextColor={colors.medium}
        style={[
          defaultStyles.textInput,
          {color: colors.black, fontWeight: '500'},
        ]}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: defaultStyles.colors.lightGrey,
    borderRadius: 25,
    flexDirection: 'row',
    marginVertical: 10,
    paddingLeft: 10,
    paddingBottom: 5,
    paddingTop: 5,
    paddingRight: 5,
  },
  icon: {
    marginRight: 5,
  },
});

export default AppTextInput;
