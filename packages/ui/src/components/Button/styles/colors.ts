import type { AppTheme } from '../../../theme/themes/light';
import type { ButtonHierarchy, ButtonTone } from '../Button.types';

// =============================================================================
// FOREGROUND COLOR GETTER
// For ActivityIndicator and icon colors
//
// This function determines the correct foreground (text/icon) color based on
// the button's current state. The logic follows Uber spec exactly:
//
// Priority order (highest to lowest):
// 1. Disabled → contentStateDisabled
// 2. Secondary + Active → contentInversePrimary (white)
// 3. Negative tone (secondary/tertiary) → contentNegative (red)
// 4. Default hierarchy colors
// =============================================================================
export const getForegroundColor = (
  hierarchy: ButtonHierarchy,
  active: boolean,
  disabled: boolean,
  theme: AppTheme,
  tone?: ButtonTone
): string => {
  // Disabled takes highest priority
  if (disabled) {
    return theme.colors.disabled;
  }

  // Secondary + active = inverted (white on black)
  if (hierarchy === 'secondary' && active) {
    return theme.colors.contentInversePrimary;
  }

  // Negative tone for secondary/tertiary = red text
  // Note: Primary + negative keeps white text (on red background)
  if (tone === 'negative' && hierarchy !== 'primary') {
    return theme.colors.danger;
  }

  // Default hierarchy colors
  const colorMap: Record<ButtonHierarchy, string> = {
    primary: theme.colors.contentInversePrimary, // White
    secondary: theme.colors.contentPrimary, // Black
    tertiary: theme.colors.contentPrimary, // Black
  };

  return colorMap[hierarchy];
};
