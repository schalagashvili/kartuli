import { BUTTON_DIMENSIONS, type ButtonSize } from '../Button.types';

// =============================================================================
// ICON SIZE MAP
// =============================================================================
export const ICON_SIZES: Record<ButtonSize, number> = {
  small: BUTTON_DIMENSIONS.small.iconSize,
  medium: BUTTON_DIMENSIONS.medium.iconSize,
  large: BUTTON_DIMENSIONS.large.iconSize,
};

// =============================================================================
// SPINNER SIZE MAP (matches icon size per Uber spec)
// =============================================================================
export const SPINNER_SIZES: Record<ButtonSize, number> = {
  small: BUTTON_DIMENSIONS.small.spinnerSize,
  medium: BUTTON_DIMENSIONS.medium.spinnerSize,
  large: BUTTON_DIMENSIONS.large.spinnerSize,
};

// =============================================================================
// HIT SLOP (for 48px minimum touch target)
// =============================================================================
export const getHitSlop = (
  size: ButtonSize
): { top: number; bottom: number; left: number; right: number } => {
  const slop = BUTTON_DIMENSIONS[size].hitSlop;
  return {
    top: slop,
    bottom: slop,
    left: 0,
    right: 0,
  };
};
