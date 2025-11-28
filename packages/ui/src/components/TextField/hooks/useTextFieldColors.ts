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
    let borderFocused: string = theme.colors.border.focus;

    if (hasError) {
      borderUnfocused = theme.colors.status.error;
      borderFocused = theme.colors.status.error;
    } else if (hasSuccess) {
      borderUnfocused = theme.colors.status.success;
      borderFocused = theme.colors.status.success;
    } else if (readOnly) {
      borderUnfocused = theme.colors.border.default;
      borderFocused = theme.colors.border.default;
    }

    const bgUnfocused = disabled
      ? theme.colors.interactive.secondary
      : theme.colors.background.tertiary;
    const bgFocused = disabled
      ? theme.colors.interactive.secondary
      : theme.colors.background.primary;

    const iconColor = disabled
      ? theme.colors.text.disabled
      : theme.colors.text.primary;
    const textColor = disabled
      ? theme.colors.text.disabled
      : theme.colors.text.primary;
    const placeholderColor = theme.colors.text.secondary;

    const hintColor = hasError
      ? theme.colors.status.error
      : hasSuccess
        ? theme.colors.status.success
        : theme.colors.text.tertiary;

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
