import React from 'react';
import {StyleSheet} from 'react-native';

import colors from '../../config/colors';
import Text from '../Text';

function ErrorMessage({error, visible}) {
  if (!visible || !error) return null;
  return <Text style={styles.error}>{error}</Text>;
}

const styles = StyleSheet.create({
  error: {
    alignSelf: 'flex-start',
    color: colors.danger,
    fontSize: 16,
    marginTop: 5,
  },
});

export default ErrorMessage;
