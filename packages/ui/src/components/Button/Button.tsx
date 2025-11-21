import React, { forwardRef, isValidElement, memo, useCallback } from 'react';

import {
  ActivityIndicator,
  type GestureResponderEvent,
  Pressable,
  Text,
  View,
} from 'react-native';

import * as Haptics from 'expo-haptics';
import { useUnistyles } from 'react-native-unistyles';

import { ICON_SIZES, getForegroundColor, styles } from './Button.styles';
import type {
  ButtonEnhancer,
  ButtonEnhancerProps,
  ButtonProps,
  ButtonRef,
  ButtonSize,
} from './Button.types';

const triggerHaptic = async (
  style: Haptics.ImpactFeedbackStyle
): Promise<void> => {
  try {
    await Haptics.impactAsync(style);
  } catch {
    // No-op on unsupported platforms (web, etc.)
  }
};

interface EnhancerRendererProps {
  enhancer: ButtonEnhancer;
  size: ButtonSize;
  color: string;
}

const EnhancerRenderer = memo<EnhancerRendererProps>(
  ({ enhancer, size, color }) => {
    const iconSize = ICON_SIZES[size];

    // Component type - render with props
    if (typeof enhancer === 'function') {
      const Component = enhancer as React.ComponentType<ButtonEnhancerProps>;
      return <Component size={iconSize} color={color} />;
    }

    // Valid element - clone with props
    if (isValidElement<ButtonEnhancerProps>(enhancer)) {
      return React.cloneElement(enhancer, { size: iconSize, color });
    }

    // Primitive (string, number, null) - render as-is
    return <>{enhancer}</>;
  }
);

EnhancerRenderer.displayName = 'EnhancerRenderer';

export const Button = memo(
  forwardRef<ButtonRef, ButtonProps>(
    (
      {
        children,

        kind = 'primary',
        size = 'default',
        shape = 'default',

        disabled = false,
        isLoading = false,

        startEnhancer,
        endEnhancer,

        fullWidth = false,

        onPress,
        onLongPress,
        delayLongPress = 500,
        hapticFeedback = false,

        accessibilityLabel,
        accessibilityHint,

        testID,

        style,
        labelStyle,
      },
      ref
    ) => {
      // useUnistyles is used here ONLY for ActivityIndicator and enhancer colors.
      // This is one of the valid use cases per Unistyles docs (third-party components).
      // The actual button styling uses variants which update via ShadowTree.
      const { theme } = useUnistyles();
      const foregroundColor = getForegroundColor(kind, theme);

      const isDisabled = disabled || isLoading;
      const variantSize = size === 'default' ? undefined : size;
      const variantShape = shape === 'default' ? undefined : shape;

      const handlePress = useCallback(
        (event: GestureResponderEvent) => {
          if (isDisabled) return;

          if (hapticFeedback) {
            triggerHaptic(Haptics.ImpactFeedbackStyle.Light);
          }

          onPress?.(event);
        },
        [isDisabled, hapticFeedback, onPress]
      );

      const handleLongPress = useCallback(
        (event: GestureResponderEvent) => {
          if (isDisabled) return;

          if (hapticFeedback) {
            triggerHaptic(Haptics.ImpactFeedbackStyle.Medium);
          }

          onLongPress?.(event);
        },
        [isDisabled, hapticFeedback, onLongPress]
      );

      const isTextContent =
        typeof children === 'string' || typeof children === 'number';

      return (
        <Pressable
          ref={ref}
          onPress={handlePress}
          onLongPress={onLongPress ? handleLongPress : undefined}
          delayLongPress={delayLongPress}
          disabled={isDisabled}
          accessible
          accessibilityRole="button"
          accessibilityLabel={accessibilityLabel}
          accessibilityHint={accessibilityHint}
          accessibilityState={{
            disabled: isDisabled,
            busy: isLoading,
          }}
          testID={testID}
          style={({ pressed }) => {
            styles.useVariants({
              kind,
              size: variantSize,
              shape: variantShape,
              fullWidth,
              disabled: isDisabled,
              pressed: pressed && !isDisabled,
              isLoading,
            });

            return [styles.container, style];
          }}
        >
          <View style={styles.content}>
            {startEnhancer && (
              <EnhancerRenderer
                enhancer={startEnhancer}
                size={size}
                color={foregroundColor}
              />
            )}

            {isTextContent ? (
              <Text style={[styles.label, labelStyle]}>{children}</Text>
            ) : (
              children
            )}

            {endEnhancer && (
              <EnhancerRenderer
                enhancer={endEnhancer}
                size={size}
                color={foregroundColor}
              />
            )}
          </View>

          {isLoading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="small" color={foregroundColor} />
            </View>
          )}
        </Pressable>
      );
    }
  )
);

Button.displayName = 'Button';
