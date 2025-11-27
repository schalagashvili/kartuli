import { useCallback } from 'react';

import type { TextInputProps } from 'react-native';

import {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { haptics } from '../../../utils';
import type { useTextFieldColors } from './useTextFieldColors';

const TIMING_CONFIG = {
  duration: 150,
  easing: Easing.out(Easing.quad),
};

type Colors = ReturnType<typeof useTextFieldColors>;

export const useTextFieldAnimation = (
  colors: Colors,
  hapticFeedback: boolean,
  onFocusProp?: TextInputProps['onFocus'],
  onBlurProp?: TextInputProps['onBlur']
) => {
  const isFocused = useSharedValue(0);

  const containerAnimatedStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      backgroundColor: interpolateColor(
        isFocused.value,
        [0, 1],
        [colors.bgUnfocused, colors.bgFocused]
      ),
      borderColor: interpolateColor(
        isFocused.value,
        [0, 1],
        [colors.borderUnfocused, colors.borderFocused]
      ),
    };
  }, [colors]);

  const handleFocus = useCallback<NonNullable<TextInputProps['onFocus']>>(
    (e) => {
      isFocused.value = withTiming(1, TIMING_CONFIG);
      if (hapticFeedback) haptics.light();
      onFocusProp?.(e);
    },
    [hapticFeedback, onFocusProp, isFocused]
  );

  const handleBlur = useCallback<NonNullable<TextInputProps['onBlur']>>(
    (e) => {
      isFocused.value = withTiming(0, TIMING_CONFIG);
      onBlurProp?.(e);
    },
    [onBlurProp, isFocused]
  );

  return {
    containerAnimatedStyle,
    handleFocus,
    handleBlur,
  };
};
