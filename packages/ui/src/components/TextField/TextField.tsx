import React, { forwardRef, memo } from 'react';

import { Pressable, Text, TextInput, View } from 'react-native';

import { AlertCircle, CheckCircle } from 'lucide-react-native';
import Animated from 'react-native-reanimated';
import { useUnistyles } from 'react-native-unistyles';

import type { TextFieldProps, TextFieldRef } from './TextField.types';
import { TextFieldEnhancer } from './components/TextFieldEnhancer';
import { TrailingActions } from './components/TrailingActions';
import { useTextFieldAnimation } from './hooks/useTextFieldAnimation';
import { useTextFieldColors } from './hooks/useTextFieldColors';
import { useTextFieldLogic } from './hooks/useTextFieldLogic';
import { HINT_ICON_SIZE, ICON_SIZES } from './styles/constants';
import { styles } from './styles/stylesheet';

export const TextField = memo(
  forwardRef<TextFieldRef, TextFieldProps>((props, ref) => {
    const {
      onChangeText,
      placeholder,
      label,
      hint,
      error,
      errorText,
      success,
      successText,
      size = 'medium',
      disabled,
      readOnly,
      loading,
      validationState,
      passwordToggle,
      hapticFeedback,
      showCharacterCount,
      maxLength,
      style,
      inputContainerStyle,
      inputStyle,
      labelStyle,
      hintStyle,
      onFocus,
      onBlur,
      testID,
      ...textInputProps
    } = props;

    const logic = useTextFieldLogic(props, ref);
    const colors = useTextFieldColors({
      error,
      errorText,
      success,
      successText,
      readOnly,
      disabled,
    });
    const anim = useTextFieldAnimation(
      colors,
      hapticFeedback ?? false,
      onFocus,
      onBlur
    );

    const { theme } = useUnistyles();
    const iconSize = ICON_SIZES[size];

    styles.useVariants({
      size,
      hintState: colors.hasError
        ? 'error'
        : colors.hasSuccess
          ? 'success'
          : undefined,
      overLimit: logic.isOverLimit,
    });

    const displayHint = getDisplayHint(
      colors.hasError,
      colors.hasSuccess,
      errorText,
      successText,
      hint
    );

    return (
      <View style={[styles.root, style]} testID={testID}>
        {(label || (showCharacterCount && maxLength !== undefined)) && (
          <View style={styles.labelRow}>
            {label && (
              <Text
                style={[
                  styles.label,
                  disabled && { color: theme.colors.contentDisabled },
                  labelStyle,
                ]}
              >
                {label}
              </Text>
            )}
            {showCharacterCount && maxLength !== undefined && (
              <Text
                style={[
                  styles.characterCount,
                  logic.isOverLimit && { color: theme.colors.danger },
                  disabled && { color: theme.colors.contentDisabled },
                ]}
              >
                {logic.safeValue.length}/{maxLength}
              </Text>
            )}
          </View>
        )}

        {/* MAIN CONTAINER */}
        <Pressable
          onPress={logic.handleContainerPress}
          disabled={!logic.isEditable}
        >
          <Animated.View
            style={[
              styles.inputContainer,
              anim.containerAnimatedStyle,
              inputContainerStyle,
            ]}
          >
            {logic.normalizedLeading && (
              <View style={styles.enhancer}>
                <TextFieldEnhancer
                  enhancer={logic.normalizedLeading}
                  iconSize={iconSize}
                  iconColor={colors.iconColor}
                />
              </View>
            )}

            <TextInput
              ref={logic.inputRef}
              {...textInputProps}
              value={logic.safeValue}
              onChangeText={onChangeText}
              placeholder={placeholder}
              placeholderTextColor={colors.placeholderColor}
              editable={logic.isEditable}
              secureTextEntry={logic.isSecure}
              maxLength={maxLength}
              onFocus={anim.handleFocus}
              onBlur={anim.handleBlur}
              style={[styles.input, { color: colors.textColor }, inputStyle]}
              cursorColor={theme.colors.borderFocus}
              selectionColor={theme.colors.borderFocus}
              accessible
              accessibilityLabel={props.accessibilityLabel || label}
              accessibilityHint={props.accessibilityHint}
              accessibilityState={{ disabled }}
            />

            <TrailingActions
              loading={loading ?? false}
              showClear={logic.showClear}
              onClear={logic.handleClear}
              passwordToggle={passwordToggle ?? false}
              isPasswordVisible={logic.isPasswordVisible}
              onTogglePassword={logic.togglePassword}
              validationState={validationState ?? 'none'}
              trailingEnhancer={logic.normalizedTrailing}
              iconSize={iconSize}
              iconColor={colors.iconColor}
            />
          </Animated.View>
        </Pressable>

        <View style={styles.hintRow}>
          {(colors.hasError || colors.hasSuccess) &&
            (colors.hasError ? (
              <AlertCircle size={HINT_ICON_SIZE} color={colors.hintColor} />
            ) : (
              <CheckCircle size={HINT_ICON_SIZE} color={colors.hintColor} />
            ))}
          <Text
            style={[
              styles.hint,
              { color: colors.hintColor },
              !displayHint && { opacity: 0 },
              hintStyle,
            ]}
          >
            {displayHint || ' '}
          </Text>
        </View>
      </View>
    );
  })
);

export const getDisplayHint = (
  hasError: boolean,
  hasSuccess: boolean,
  errorText?: string,
  successText?: string,
  hintText?: string
): string | undefined => {
  if (hasError) return errorText;
  if (hasSuccess) return successText;
  return hintText;
};

TextField.displayName = 'TextField';
