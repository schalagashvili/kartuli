import React, { forwardRef, memo, useCallback, useMemo } from 'react';

import {
  ActivityIndicator,
  type GestureResponderEvent,
  Pressable,
  Text,
  View,
} from 'react-native';

import { useUnistyles } from 'react-native-unistyles';

import { haptics } from '../../utils';
import type { ButtonProps, ButtonRef } from './Button.types';
import { IconRenderer } from './components/IconRenderer';
import {
  ICON_SIZES,
  SPINNER_SIZES,
  getForegroundColor,
  getHitSlop,
  styles,
} from './styles';

export const Button = memo(
  forwardRef<ButtonRef, ButtonProps>(
    (
      {
        label = '',
        hierarchy = 'primary',
        size = 'medium',
        shape = 'rect',
        widthMode = 'intrinsic',
        tone = 'default',
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
        pressableStyle,
        style,
        labelStyle,
      },
      ref
    ) => {
      const { theme } = useUnistyles();

      // console.log('this is button re-rendering');
      const isInteractionDisabled = disabled || loading;
      const isIconOnly = shape === 'circle' || shape === 'square';

      // Coerce widthMode to 'intrinsic' for icon-only shapes
      // Icon-only buttons (circle/square) should never stretch to fill container
      const effectiveWidthMode = isIconOnly ? 'intrinsic' : widthMode;

      if (__DEV__ && isIconOnly && widthMode === 'fixed') {
        console.warn(
          '[Button] widthMode="fixed" is not supported for icon-only shapes (circle/square). Using "intrinsic" instead.'
        );
      }

      const foregroundColor = getForegroundColor(
        hierarchy,
        active,
        disabled,
        theme,
        tone
      );

      const hitSlop = useMemo(() => getHitSlop(size), [size]);
      const iconSize = ICON_SIZES[size];
      const spinnerSize = SPINNER_SIZES[size];

      styles.useVariants({
        hierarchy,
        size,
        shape,
        widthMode: effectiveWidthMode,
        // Map 'default' → undefined because base hierarchy styles handle default colors
        // Only 'negative' tone requires variant overrides
        tone: tone === 'default' ? undefined : tone,
        disabled,
        active,
        loading,
      });

      const handlePress = useCallback(
        (event: GestureResponderEvent) => {
          if (isInteractionDisabled) return;

          if (hapticFeedback) {
            haptics.light();
          }

          onPress?.(event);
        },
        [isInteractionDisabled, hapticFeedback, onPress]
      );

      const handleLongPress = useCallback(
        (event: GestureResponderEvent) => {
          if (isInteractionDisabled) return;

          if (hapticFeedback) {
            haptics.medium();
          }

          onLongPress?.(event);
        },
        [isInteractionDisabled, hapticFeedback, onLongPress]
      );

      const computedAccessibilityLabel = useMemo(() => {
        if (accessibilityLabel) return accessibilityLabel;
        if (isIconOnly) {
          // console.warn(
          //   'Button: accessibilityLabel is required for icon-only buttons (circle/square shapes)'
          // );
        }
        return label;
      }, [accessibilityLabel, isIconOnly, label]);

      const renderInnerContent = () => {
        const commonLabelStyle = [styles.label, labelStyle];

        if (isIconOnly) {
          return leadingIcon ? (
            <IconRenderer
              icon={leadingIcon}
              size={iconSize}
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
                    size={iconSize}
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
                  size={iconSize}
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
                size={iconSize}
                color={foregroundColor}
              />
            )}
            <Text style={commonLabelStyle} numberOfLines={1}>
              {label}
            </Text>
            {trailingIcon && (
              <IconRenderer
                icon={trailingIcon}
                size={iconSize}
                color={foregroundColor}
              />
            )}
          </>
        );
      };

      // console.log('outside button');
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
          style={[styles.pressable, pressableStyle]}
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
