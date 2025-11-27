import type { AppTheme } from '../../../theme/themes/light';
import type { CheckboxProps, CheckboxVisualState } from '../Checkbox.types';

// Re-export for convenience in other files
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
  // 1. Disabled takes highest priority
  if (disabled) {
    const isFilled = state === 'checked' || state === 'indeterminate';
    return {
      boxBorder: theme.colors.disabled,
      boxBackground: isFilled ? theme.colors.disabled : 'transparent',
      icon: theme.colors.disabled,
    };
  }

  // 2. Error/Negative tone
  const isError = error || tone === 'negative';
  if (isError) {
    const isFilled = state === 'checked' || state === 'indeterminate';
    return {
      boxBorder: theme.colors.danger,
      boxBackground: isFilled ? theme.colors.danger : 'transparent',
      icon: isFilled ? theme.colors.contentInversePrimary : theme.colors.danger,
    };
  }

  // 3. Preselected (Outlined box with small icon)
  if (state === 'preselected') {
    return {
      boxBorder: theme.colors.contentTertiary,
      boxBackground: 'transparent',
      icon: theme.colors.contentPrimary,
    };
  }

  // 4. Checked / Indeterminate (Filled box with inverse icon)
  if (state === 'checked' || state === 'indeterminate') {
    return {
      boxBorder: theme.colors.primary,
      boxBackground: theme.colors.primary,
      icon: theme.colors.contentInversePrimary,
    };
  }

  // 5. Default Unchecked (Outlined box, no icon)
  return {
    boxBorder: theme.colors.contentTertiary,
    boxBackground: 'transparent',
    icon: 'transparent',
  };
};
