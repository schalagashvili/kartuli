import React, { memo, useCallback, useEffect, useMemo } from 'react';

import { Pressable, Text, View } from 'react-native';

import { Check, Minus } from 'lucide-react-native';
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useUnistyles } from 'react-native-unistyles';

import { haptics } from '../../utils';
import type { CheckboxProps } from './Checkbox.types';
import { CHECKBOX_DIMENSIONS } from './Checkbox.types';
import { type CheckboxVisualState, getCheckboxColors } from './styles/colors';
import { styles } from './styles/stylesheet';
import { getHitSlop } from './styles/utils';

const ANIMATION_CONFIG = {
  duration: 120,
  easing: Easing.out(Easing.quad),
} as const;

export const Checkbox = memo(
  ({
    checked,
    onChange,
    label,
    description,
    errorText,
    indeterminate = false,
    preselected = false,
    size = 'medium',
    tone = 'default',
    disabled = false,
    align = 'center',
    hapticFeedback = false,
    accessibilityLabel,
    accessibilityHint,
    testID,
    style,
    labelStyle,
  }: CheckboxProps) => {
    const { theme } = useUnistyles();
    const visualState: CheckboxVisualState = useMemo(() => {
      if (indeterminate) return 'indeterminate';
      if (checked) return 'checked';
      if (preselected) return 'preselected';
      return 'unchecked';
    }, [indeterminate, checked, preselected]);

    const isFilled =
      visualState === 'checked' || visualState === 'indeterminate';
    const showIcon = isFilled || visualState === 'preselected';
    const colors = useMemo(
      () => getCheckboxColors(visualState, disabled, !!errorText, tone, theme),
      [visualState, disabled, errorText, tone, theme]
    );

    const fillProgress = useSharedValue(isFilled ? 1 : 0);
    const iconProgress = useSharedValue(showIcon ? 1 : 0);
    const borderColor = useSharedValue(colors.boxBorder);

    useEffect(() => {
      fillProgress.value = withTiming(isFilled ? 1 : 0, ANIMATION_CONFIG);
    }, [fillProgress, isFilled]);

    useEffect(() => {
      iconProgress.value = withTiming(showIcon ? 1 : 0, ANIMATION_CONFIG);
    }, [iconProgress, showIcon]);

    useEffect(() => {
      borderColor.value = withTiming(colors.boxBorder, ANIMATION_CONFIG);
    }, [borderColor, colors.boxBorder]);

    const animatedBorderStyle = useAnimatedStyle(() => ({
      borderColor: borderColor.value,
    }));

    const animatedFillStyle = useAnimatedStyle(
      () => ({
        transform: [{ scale: fillProgress.value }],
        opacity: fillProgress.value,
        backgroundColor: colors.boxBackground,
      }),
      [colors.boxBackground]
    );

    const animatedIconStyle = useAnimatedStyle(() => {
      const scale = interpolate(
        iconProgress.value,
        [0, 0.6, 1],
        [0, 1.1, 1],
        Extrapolation.CLAMP
      );
      return {
        opacity: iconProgress.value,
        transform: [{ scale }],
      };
    });

    const IconComponent = visualState === 'indeterminate' ? Minus : Check;
    const hitSlop = useMemo(() => getHitSlop(size), [size]);
    const dimensions = CHECKBOX_DIMENSIONS[size];
    const strokeWidth = size === 'medium' || size === 'small' ? 3 : 2.5;
    const iconSize =
      visualState === 'preselected'
        ? dimensions.preselectedIconSize
        : dimensions.iconSize;

    styles.useVariants({ size, align, disabled, visualState });

    const handlePress = useCallback(() => {
      if (disabled) return;
      if (hapticFeedback) haptics.light();
      onChange(!checked);
    }, [disabled, hapticFeedback, onChange, checked]);

    const renderHelperContent = () => {
      if (errorText) {
        return <Text style={styles.errorText}>{errorText}</Text>;
      }
      if (description) {
        return <Text style={styles.description}>{description}</Text>;
      }
      return null;
    };

    return (
      <Pressable
        onPress={handlePress}
        disabled={disabled}
        hitSlop={hitSlop}
        accessible
        accessibilityRole="checkbox"
        accessibilityState={{
          checked: indeterminate ? 'mixed' : checked,
          disabled,
        }}
        accessibilityLabel={accessibilityLabel || label}
        accessibilityHint={accessibilityHint}
        testID={testID}
        style={[styles.root, style]}
      >
        {({ pressed }) => (
          <>
            <Animated.View style={[styles.box, animatedBorderStyle]}>
              <Animated.View style={[styles.fillLayer, animatedFillStyle]} />
              <Animated.View style={[styles.iconWrapper, animatedIconStyle]}>
                <IconComponent
                  size={iconSize}
                  color={colors.icon}
                  strokeWidth={strokeWidth}
                />
              </Animated.View>
              {pressed && !disabled && (
                <View style={styles.pressedOverlay} pointerEvents="none" />
              )}
            </Animated.View>
            {(label || description || errorText) && (
              <View style={styles.labelContainer}>
                {label && (
                  <Text style={[styles.label, labelStyle]}>{label}</Text>
                )}
                {renderHelperContent()}
              </View>
            )}
          </>
        )}
      </Pressable>
    );
  }
);

Checkbox.displayName = 'Checkbox';
