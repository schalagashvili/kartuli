import type { AppTheme } from '../../../theme/themes/light';
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
  theme: AppTheme
): CheckboxColors => {
  if (disabled) {
    const isFilled = state === 'checked' || state === 'indeterminate';
    return {
      boxBorder: theme.colors.disabled,
      boxBackground: isFilled ? theme.colors.disabled : 'transparent',
      icon: theme.colors.disabled,
    };
  }

  const isError = error || tone === 'negative';
  if (isError) {
    const isFilled = state === 'checked' || state === 'indeterminate';
    return {
      boxBorder: theme.colors.danger,
      boxBackground: isFilled ? theme.colors.danger : 'transparent',
      icon: isFilled ? theme.colors.contentInversePrimary : theme.colors.danger,
    };
  }

  if (state === 'preselected') {
    return {
      boxBorder: theme.colors.contentTertiary,
      boxBackground: 'transparent',
      icon: theme.colors.contentPrimary,
    };
  }

  if (state === 'checked' || state === 'indeterminate') {
    return {
      boxBorder: theme.colors.primary,
      boxBackground: theme.colors.primary,
      icon: theme.colors.contentInversePrimary,
    };
  }

  return {
    boxBorder: theme.colors.contentTertiary,
    boxBackground: 'transparent',
    icon: 'transparent',
  };
};
