import React, { forwardRef, memo, useCallback, useMemo } from 'react';

import {
  ActivityIndicator,
  type GestureResponderEvent,
  Pressable,
  Text,
  View,
} from 'react-native';

import * as Haptics from 'expo-haptics';
import { useUnistyles } from 'react-native-unistyles';

import {
  ICON_SIZES,
  SPINNER_SIZES,
  getForegroundColor,
  getHitSlop,
  styles,
} from './Button.styles';
import type {
  ButtonIcon,
  ButtonIconProps,
  ButtonProps,
  ButtonRef,
  ButtonSize,
} from './Button.types';

const triggerHaptic = async (
  style: Haptics.ImpactFeedbackStyle
): Promise<void> => {
  try {
    await Haptics.impactAsync(style);
  } catch {}
};

const IconRenderer = ({
  icon,
  size,
  color,
}: {
  icon: ButtonIcon;
  size: ButtonSize;
  color: string;
}) => {
  const iconSize = ICON_SIZES[size];

  if (React.isValidElement<ButtonIconProps>(icon)) {
    return React.cloneElement(icon, { size: iconSize, color });
  }

  const Component = icon as React.ComponentType<ButtonIconProps>;
  return <Component size={iconSize} color={color} />;
};

export const Button = memo(
  forwardRef<ButtonRef, ButtonProps>(
    (
      {
        label = '',
        hierarchy = 'primary',
        size = 'medium',
        shape = 'rect',
        widthMode = 'intrinsic',
        tone,
        leadingIcon,
        trailingIcon,
        disabled = false,
        loading = false,
        active = false,
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
      const { theme } = useUnistyles();

      const isInteractionDisabled = disabled || loading;
      const isIconOnly = shape === 'circle' || shape === 'square';

      const foregroundColor = getForegroundColor(
        hierarchy,
        active,
        disabled,
        theme,
        tone
      );

      const hitSlop = useMemo(() => getHitSlop(size), [size]);
      const spinnerSize = SPINNER_SIZES[size];

      styles.useVariants({
        hierarchy,
        size,
        shape,
        widthMode,
        tone,
        disabled,
        active,
        loading,
      });

      const handlePress = useCallback(
        (event: GestureResponderEvent) => {
          if (isInteractionDisabled) return;

          if (hapticFeedback) {
            triggerHaptic(Haptics.ImpactFeedbackStyle.Light);
          }

          onPress?.(event);
        },
        [isInteractionDisabled, hapticFeedback, onPress]
      );

      const handleLongPress = useCallback(
        (event: GestureResponderEvent) => {
          if (isInteractionDisabled) return;

          if (hapticFeedback) {
            triggerHaptic(Haptics.ImpactFeedbackStyle.Medium);
          }

          onLongPress?.(event);
        },
        [isInteractionDisabled, hapticFeedback, onLongPress]
      );

      const computedAccessibilityLabel = useMemo(() => {
        if (accessibilityLabel) return accessibilityLabel;
        if (isIconOnly) {
          console.warn(
            'Button: accessibilityLabel is required for icon-only buttons (circle/square shapes)'
          );
        }
        return label;
      }, [accessibilityLabel, isIconOnly, label]);

      const renderInnerContent = () => {
        const commonLabelStyle = [
          styles.label,
          { color: foregroundColor },
          labelStyle,
        ];

        if (isIconOnly) {
          return leadingIcon ? (
            <IconRenderer
              icon={leadingIcon}
              size={size}
              color={foregroundColor}
            />
          ) : null;
        }

        if (widthMode === 'fixed' && trailingIcon) {
          return (
            <View style={styles.contentFixed}>
              <View style={styles.contentFixedCenter}>
                {leadingIcon && (
                  <IconRenderer
                    icon={leadingIcon}
                    size={size}
                    color={foregroundColor}
                  />
                )}
                <Text style={commonLabelStyle} numberOfLines={1}>
                  {label}
                </Text>
              </View>
              <View style={styles.trailingIconFixed}>
                <IconRenderer
                  icon={trailingIcon}
                  size={size}
                  color={foregroundColor}
                />
              </View>
            </View>
          );
        }

        return (
          <>
            {leadingIcon && (
              <IconRenderer
                icon={leadingIcon}
                size={size}
                color={foregroundColor}
              />
            )}
            <Text style={commonLabelStyle} numberOfLines={1}>
              {label}
            </Text>
            {trailingIcon && (
              <IconRenderer
                icon={trailingIcon}
                size={size}
                color={foregroundColor}
              />
            )}
          </>
        );
      };

      return (
        <Pressable
          ref={ref}
          onPress={handlePress}
          onLongPress={onLongPress ? handleLongPress : undefined}
          delayLongPress={delayLongPress}
          disabled={isInteractionDisabled}
          hitSlop={hitSlop}
          accessible
          accessibilityRole="button"
          accessibilityLabel={computedAccessibilityLabel}
          accessibilityHint={accessibilityHint}
          accessibilityState={{
            disabled: isInteractionDisabled,
            busy: loading,
            selected: active,
          }}
          style={styles.pressable}
          testID={testID}
        >
          {({ pressed }) => (
            <View style={[styles.container, style]}>
              {pressed && !isInteractionDisabled && (
                <View style={styles.pressedOverlay} pointerEvents="none" />
              )}

              <View style={styles.content}>{renderInnerContent()}</View>

              {loading && (
                <View style={styles.loadingOverlay}>
                  <ActivityIndicator
                    size={spinnerSize}
                    color={foregroundColor}
                  />
                </View>
              )}
            </View>
          )}
        </Pressable>
      );
    }
  )
);

Button.displayName = 'Button';
