import React from 'react';
import {ImageBackground, Image, View, StyleSheet} from 'react-native';
import {GoogleSigninButton} from '@react-native-community/google-signin';

import Text from '../components/Text';
import colors from '../config/colors';

function WelcomeScreen(props) {
  return (
    <View style={styles.background}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../assets/logo.png')} />
        <Text style={styles.tagline}>Track Your Expenses</Text>
        <GoogleSigninButton
          style={styles.googleSignInBtn}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  googleSignInBtn: {
    height: 50,
    marginTop: 20,
  },
  logoContainer: {
    alignItems: 'center',
    position: 'absolute',
    top: 80,
  },
  logo: {
    height: 100,
    width: 100,
  },
  tagline: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default WelcomeScreen;
