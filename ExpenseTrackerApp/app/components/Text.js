import React from 'react';
import {Text, StyleSheet, Platform} from 'react-native';

function AppText({children, style, ...otherProps}) {
  return (
    <Text {...otherProps} style={[styles.main, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  main: {
    fontSize: 20,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
    fontWeight: '500',
  },
});

export default AppText;
