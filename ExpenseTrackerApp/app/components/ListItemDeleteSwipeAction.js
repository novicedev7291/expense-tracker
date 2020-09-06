import React from 'react';
import {Animated} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {RectButton} from 'react-native-gesture-handler';
import colors from '../config/colors';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

function DeleteSwipeAction({actionStyle, style, onDeletePress}) {
  return (
    <RectButton style={style} onPress={onDeletePress}>
      <AnimatedIcon
        name="delete-forever"
        size={35}
        color={colors.white}
        style={actionStyle}
      />
    </RectButton>
  );
}

export default DeleteSwipeAction;
