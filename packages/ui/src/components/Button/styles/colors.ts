import type { AppTheme } from '../../../theme/themes/light';
import type { ButtonHierarchy, ButtonTone } from '../Button.types';

export const getForegroundColor = (
  hierarchy: ButtonHierarchy,
  active: boolean,
  disabled: boolean,
  theme: AppTheme,
  tone?: ButtonTone
): string => {
  if (disabled) {
    return theme.colors.disabled;
  }

  if (hierarchy === 'secondary' && active) {
    return theme.colors.contentInversePrimary;
  }

  if (tone === 'negative' && hierarchy !== 'primary') {
    return theme.colors.danger;
  }

  const colorMap: Record<ButtonHierarchy, string> = {
    primary: theme.colors.contentInversePrimary,
    secondary: theme.colors.contentPrimary,
    tertiary: theme.colors.contentPrimary,
  };

  return colorMap[hierarchy];
};
