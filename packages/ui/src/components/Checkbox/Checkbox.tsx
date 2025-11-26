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
import { getHitSlop } from './styles/constants';
import { styles } from './styles/stylesheet';

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

    // ─────────────────────────────────────────────────────────────
    // 1. Derived State
    // ─────────────────────────────────────────────────────────────
    const visualState: CheckboxVisualState = useMemo(() => {
      if (indeterminate) return 'indeterminate';
      if (checked) return 'checked';
      if (preselected) return 'preselected';
      return 'unchecked';
    }, [indeterminate, checked, preselected]);

    // Separate concerns: fill (background) vs icon visibility
    const isFilled =
      visualState === 'checked' || visualState === 'indeterminate';
    const showIcon = isFilled || visualState === 'preselected';

    // ─────────────────────────────────────────────────────────────
    // 2. Colors (JS-side, memoized)
    // ─────────────────────────────────────────────────────────────
    const colors = useMemo(
      () => getCheckboxColors(visualState, disabled, !!errorText, tone, theme),
      [visualState, disabled, errorText, tone, theme]
    );

    // ─────────────────────────────────────────────────────────────
    // 3. Animation Drivers
    // ─────────────────────────────────────────────────────────────
    // Pattern: drive shared values from JS deps (explicit deps, no plugin reliance)

    // Animated output values
    const fillProgress = useSharedValue(isFilled ? 1 : 0);
    const iconProgress = useSharedValue(showIcon ? 1 : 0);
    const borderColor = useSharedValue(colors.boxBorder);

    // Animate when source changes (JS-side dependency tracking, no plugin reliance)
    useEffect(() => {
      fillProgress.value = withTiming(isFilled ? 1 : 0, ANIMATION_CONFIG);
    }, [fillProgress, isFilled]);

    useEffect(() => {
      iconProgress.value = withTiming(showIcon ? 1 : 0, ANIMATION_CONFIG);
    }, [iconProgress, showIcon]);

    useEffect(() => {
      borderColor.value = withTiming(colors.boxBorder, ANIMATION_CONFIG);
    }, [borderColor, colors.boxBorder]);

    // ─────────────────────────────────────────────────────────────
    // 4. Animated Styles
    // ─────────────────────────────────────────────────────────────

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

    // Icon uses its own driver so preselected state works correctly
    const animatedIconStyle = useAnimatedStyle(() => {
      // Slight overshoot for satisfying "pop" effect
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

    // ─────────────────────────────────────────────────────────────
    // 5. Static Values
    // ─────────────────────────────────────────────────────────────
    const IconComponent = visualState === 'indeterminate' ? Minus : Check;
    const hitSlop = useMemo(() => getHitSlop(size), [size]);
    const dimensions = CHECKBOX_DIMENSIONS[size];
    const strokeWidth = size === 'medium' || size === 'small' ? 3 : 2.5;
    const iconSize =
      visualState === 'preselected'
        ? dimensions.preselectedIconSize
        : dimensions.iconSize;

    // Apply Unistyles variants before render
    styles.useVariants({ size, align, disabled, visualState });

    // ─────────────────────────────────────────────────────────────
    // 6. Handlers
    // ─────────────────────────────────────────────────────────────
    const handlePress = useCallback(() => {
      if (disabled) return;
      if (hapticFeedback) haptics.light();
      onChange(!checked);
    }, [disabled, hapticFeedback, onChange, checked]);

    // ─────────────────────────────────────────────────────────────
    // 7. Render
    // ─────────────────────────────────────────────────────────────
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
              {/* Fill layer - scales from center when checked/indeterminate */}
              <Animated.View style={[styles.fillLayer, animatedFillStyle]} />

              {/* Icon - always mounted, animated via opacity/scale
                  This avoids layout animations (ZoomIn/ZoomOut) which cause
                  Yoga layout passes and hurt list performance */}
              <Animated.View style={[styles.iconWrapper, animatedIconStyle]}>
                <IconComponent
                  size={iconSize}
                  color={colors.icon}
                  strokeWidth={strokeWidth}
                />
              </Animated.View>

              {/* Press feedback overlay */}
              {pressed && !disabled && (
                <View style={styles.pressedOverlay} pointerEvents="none" />
              )}
            </Animated.View>

            {/* Label/Description/Error */}
            {(label || description || errorText) && (
              <View style={styles.labelContainer}>
                {label && (
                  <Text style={[styles.label, labelStyle]}>{label}</Text>
                )}
                {errorText ? (
                  <Text style={styles.errorText}>{errorText}</Text>
                ) : description ? (
                  <Text style={styles.description}>{description}</Text>
                ) : null}
              </View>
            )}
          </>
        )}
      </Pressable>
    );
  }
);

Checkbox.displayName = 'Checkbox';
