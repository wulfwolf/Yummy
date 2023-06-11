import type {Ref} from 'react';
import React, {forwardRef, useImperativeHandle} from 'react';
import type {TouchableOpacityProps} from 'react-native';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';

import type {TouchableProps} from './types';

export const Touchable = forwardRef(
  (
    {children, style, handleSubmit, onPress, ...props}: TouchableProps,
    ref?: Ref<TouchableOpacityProps>,
  ) => {
    useImperativeHandle(ref, () => ({
      onPress,
    }));

    if (Platform.OS === 'android') {
      const canUseForground = TouchableNativeFeedback.canUseNativeForeground();

      return (
        <TouchableNativeFeedback
          hitSlop={{bottom: 10, left: 10, right: 10, top: 10}}
          useForeground={!!canUseForground}
          background={TouchableNativeFeedback.SelectableBackground(5)}
          onPress={handleSubmit ?? onPress}
          {...props}>
          <View ref={ref} style={style}>
            {children}
          </View>
        </TouchableNativeFeedback>
      );
    }

    return (
      <TouchableOpacity
        hitSlop={{bottom: 10, left: 10, right: 10, top: 10}}
        ref={ref}
        style={style}
        onPress={handleSubmit ?? onPress}
        {...props}>
        {children}
      </TouchableOpacity>
    );
  },
);
