import type { AppTheme } from '@/theme';

import type { TextFieldVisualState } from '../TextField.types';

// =============================================================================
// UBER BASE DESIGN SYSTEM - TEXT FIELD COLORS
// Reference: PDF Pages 8-9, 25-27
// =============================================================================

export type TextFieldColors = {
  // Input container
  containerBackground: string;
  containerBorder: string;
  // Text colors
  inputText: string;
  placeholder: string;
  label: string;
  hint: string;
  characterCount: string;
  // Enhancer colors
  enhancerIcon: string;
  enhancerLabel: string;
  // Action icons (clear, validation)
  actionIcon: string;
};

/**
 * Get colors for a given visual state
 * Per Uber spec (Pages 8-9, 25-27)
 */
export function getTextFieldColors(
  state: TextFieldVisualState,
  hasError: boolean,
  hasSuccess: boolean,
  theme: AppTheme
): TextFieldColors {
  // Base colors (enabled state)
  const base: TextFieldColors = {
    containerBackground: theme.colors.backgroundTertiary,
    containerBorder: 'transparent',
    inputText: theme.colors.contentPrimary,
    placeholder: theme.colors.contentSecondary,
    label: theme.colors.contentPrimary,
    hint: theme.colors.contentTertiary,
    characterCount: theme.colors.contentTertiary,
    enhancerIcon: theme.colors.contentPrimary,
    enhancerLabel: theme.colors.contentPrimary,
    actionIcon: theme.colors.contentPrimary,
  };

  switch (state) {
    case 'focused':
      return {
        ...base,
        // Uber inputs usually turn white (or stay gray) with a black border on focus
        containerBackground: theme.colors.background,
        containerBorder: theme.colors.borderFocus,
      };

    case 'error':
      return {
        ...base,
        containerBackground: theme.colors.background,
        containerBorder: theme.colors.borderError, // Was borderNegative
        hint: theme.colors.danger, // Was contentNegative
      };

    case 'success':
      return {
        ...base,
        containerBackground: theme.colors.background,
        containerBorder: theme.colors.success, // Was borderPositive
        hint: theme.colors.success, // Was contentPositive
      };

    case 'disabled':
      return {
        ...base,
        // Use the generic input background or specific disabled token
        containerBackground: theme.colors.disabled, // Was backgroundStateDisabled
        inputText: theme.colors.contentDisabled, // Was contentStateDisabled
        placeholder: theme.colors.contentDisabled,
        label: theme.colors.contentDisabled,
        hint: theme.colors.contentDisabled,
        characterCount: theme.colors.contentDisabled,
        enhancerIcon: theme.colors.contentDisabled,
        enhancerLabel: theme.colors.contentDisabled,
        actionIcon: theme.colors.contentDisabled,
      };

    case 'readOnly':
      return {
        ...base,
        // Just use the standard border for read-only
        containerBorder: theme.colors.border, // Was borderOpaque
      };

    case 'loading':
      return {
        ...base,
        // Loading uses same colors as enabled
      };

    case 'enabled':
    default:
      return base;
  }
}

/**
 * Get validation icon color based on validation state
 */
export function getValidationIconColor(
  validationState: 'complete' | 'incomplete',
  theme: AppTheme
): string {
  return validationState === 'complete'
    ? theme.colors.success
    : theme.colors.danger;
}

/**
 * Get character count color when over limit
 */
export function getCharacterCountColor(
  currentLength: number,
  maxLength: number,
  isDisabled: boolean,
  theme: AppTheme
): string {
  if (isDisabled) return theme.colors.contentDisabled;
  if (currentLength > maxLength) return theme.colors.danger;
  return theme.colors.contentTertiary;
}
