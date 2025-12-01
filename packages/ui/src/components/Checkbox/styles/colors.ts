import type { Theme } from '../../../theme';
import type { CheckboxProps, CheckboxVisualState } from '../Checkbox.types';

export { CheckboxVisualState };

interface CheckboxColors {
  boxBorder: string;
  boxBackground: string;
  icon: string;
}

export const getCheckboxColors = (
  state: CheckboxVisualState,
  disabled: boolean,
  error: boolean,
  tone: CheckboxProps['tone'],
  theme: Theme
): CheckboxColors => {
  if (disabled) {
    const isFilled = state === 'checked' || state === 'indeterminate';
    return {
      boxBorder: theme.colors.border.subtle,
      boxBackground: isFilled
        ? theme.colors.interactive.secondary
        : theme.colors.palette.transparent,
      icon: theme.colors.text.disabled,
    };
  }

  const isError = error || tone === 'negative';
  if (isError) {
    const isFilled = state === 'checked' || state === 'indeterminate';
    return {
      boxBorder: theme.colors.status.error,
      boxBackground: isFilled
        ? theme.colors.status.error
        : theme.colors.palette.transparent,
      icon: isFilled ? theme.colors.text.inverse : theme.colors.status.error,
    };
  }

  if (state === 'preselected') {
    return {
      boxBorder: theme.colors.border.default,
      boxBackground: theme.colors.palette.transparent,
      icon: theme.colors.text.primary,
    };
  }

  if (state === 'checked' || state === 'indeterminate') {
    return {
      boxBorder: theme.colors.interactive.primary,
      boxBackground: theme.colors.interactive.primary,
      icon: theme.colors.text.inverse,
    };
  }

  return {
    boxBorder: theme.colors.border.default,
    boxBackground: theme.colors.palette.transparent,
    icon: 'transparent',
  };
};
