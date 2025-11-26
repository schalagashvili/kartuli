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
      boxBorder: theme.colors.contentStateDisabled,
      boxBackground: isFilled
        ? theme.colors.backgroundStateDisabled
        : 'transparent',
      icon: theme.colors.contentStateDisabled,
    };
  }

  // 2. Error/Negative tone
  const isError = error || tone === 'negative';
  if (isError) {
    const isFilled = state === 'checked' || state === 'indeterminate';
    return {
      boxBorder: theme.colors.backgroundNegative,
      boxBackground: isFilled ? theme.colors.backgroundNegative : 'transparent',
      icon: isFilled
        ? theme.colors.contentInversePrimary
        : theme.colors.backgroundNegative,
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
      boxBorder: theme.colors.backgroundInversePrimary,
      boxBackground: theme.colors.backgroundInversePrimary,
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
