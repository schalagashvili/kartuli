import { useCallback, useImperativeHandle, useRef, useState } from 'react';

import type { TextInput } from 'react-native';

import { haptics } from '../../../utils';
import type { TextFieldProps, TextFieldRef } from '../TextField.types';

export const useTextFieldLogic = (
  props: TextFieldProps,
  ref: React.Ref<TextFieldRef>
) => {
  const { hapticFeedback, onChangeText, onClear } = props;
  const inputRef = useRef<TextInput>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const safeValue = props.value ?? '';
  const isEditable = !props.disabled && !props.readOnly && !props.loading;
  const isSecure = props.passwordToggle && !isPasswordVisible;
  const showClear =
    (props.clearable ?? false) && safeValue.length > 0 && isEditable;
  const isOverLimit = props.maxLength
    ? safeValue.length > props.maxLength
    : false;

  const normalizedLeading = props.leadingEnhancer;
  const normalizedTrailing = props.trailingEnhancer;

  const handleClear = useCallback(() => {
    if (hapticFeedback) haptics.light();
    onChangeText?.('');
    onClear?.();
    inputRef.current?.focus();
  }, [hapticFeedback, onChangeText, onClear]);

  const togglePassword = useCallback(() => {
    if (hapticFeedback) haptics.light();
    setIsPasswordVisible((prev) => !prev);
  }, [hapticFeedback]);

  const handleContainerPress = useCallback(() => {
    if (isEditable) inputRef.current?.focus();
  }, [isEditable]);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
    clear: handleClear,
    isFocused: () => inputRef.current?.isFocused() ?? false,
  }));

  return {
    inputRef,
    safeValue,
    isEditable,
    isSecure,
    showClear,
    isOverLimit,
    isPasswordVisible,
    normalizedLeading,
    normalizedTrailing,
    handleClear,
    togglePassword,
    handleContainerPress,
  };
};
