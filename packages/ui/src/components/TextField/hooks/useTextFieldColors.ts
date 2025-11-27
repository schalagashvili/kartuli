import { useMemo } from 'react';

import { useUnistyles } from 'react-native-unistyles';

import type { TextFieldProps } from '../TextField.types';

type ColorProps = Pick<
  TextFieldProps,
  'error' | 'errorText' | 'success' | 'successText' | 'readOnly' | 'disabled'
>;

export const useTextFieldColors = ({
  error,
  errorText,
  success,
  successText,
  readOnly,
  disabled,
}: ColorProps) => {
  const { theme } = useUnistyles();

  const hasError = !!(error || errorText);
  const hasSuccess = !!(success || successText);

  return useMemo(() => {
    let borderUnfocused = 'transparent';
    let borderFocused = theme.colors.borderFocus;

    if (hasError) {
      borderUnfocused = theme.colors.borderError;
      borderFocused = theme.colors.borderError;
    } else if (hasSuccess) {
      borderUnfocused = theme.colors.success;
      borderFocused = theme.colors.success;
    } else if (readOnly) {
      borderUnfocused = theme.colors.border;
      borderFocused = theme.colors.border;
    }

    const bgUnfocused = disabled
      ? theme.colors.disabled
      : theme.colors.inputBackground;
    const bgFocused = disabled
      ? theme.colors.disabled
      : theme.colors.background;

    const iconColor = disabled
      ? theme.colors.contentDisabled
      : theme.colors.contentPrimary;
    const textColor = disabled
      ? theme.colors.contentDisabled
      : theme.colors.contentPrimary;
    const placeholderColor = theme.colors.contentTertiary;

    const hintColor = hasError
      ? theme.colors.danger
      : hasSuccess
        ? theme.colors.success
        : theme.colors.contentTertiary;

    return {
      bgUnfocused,
      bgFocused,
      borderUnfocused,
      borderFocused,
      iconColor,
      textColor,
      placeholderColor,
      hintColor,
      hasError,
      hasSuccess,
    };
  }, [theme, hasError, hasSuccess, readOnly, disabled]);
};
