import type { Theme } from '../../../theme';
import type { ButtonHierarchy, ButtonTone } from '../Button.types';

export const getForegroundColor = (
  hierarchy: ButtonHierarchy,
  active: boolean,
  disabled: boolean,
  theme: Theme,
  tone?: ButtonTone
): string => {
  if (disabled) {
    return theme.colors.text.disabled;
  }

  if (hierarchy === 'secondary' && active) {
    return theme.colors.text.inverse;
  }

  if (tone === 'negative' && hierarchy !== 'primary') {
    return theme.colors.status.error;
  }

  const colorMap: Record<ButtonHierarchy, string> = {
    primary: theme.colors.text.inverse,
    secondary: theme.colors.text.primary,
    tertiary: theme.colors.text.primary,
  };

  return colorMap[hierarchy];
};
