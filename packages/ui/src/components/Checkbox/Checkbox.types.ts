import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

// =============================================================================
// VISUAL STATES
// =============================================================================
export type CheckboxVisualState =
  | 'unchecked'
  | 'checked'
  | 'indeterminate'
  | 'preselected';

// =============================================================================
// CHECKBOX PROPS
// =============================================================================
export interface CheckboxProps {
  /**
   * Controlled checked state.
   */
  checked: boolean;

  /**
   * Change handler.
   */
  onChange: (checked: boolean) => void;

  /**
   * Visual indeterminate state (mixed/partial selection).
   * Overrides 'checked' state visually.
   */
  indeterminate?: boolean;

  /**
   * Preselected state.
   * Shows a small checkmark in an outlined box.
   * Overrides 'unchecked' state visually.
   */
  preselected?: boolean;

  /**
   * Primary label text.
   */
  label?: string;

  /**
   * Helper text below label.
   */
  description?: string;

  /**
   * Error text below label.
   * Replaces description and applies error styling.
   */
  errorText?: string;

  /**
   * Size variant.
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Color tone.
   * - default: Standard colors
   * - negative: Error/destructive colors
   * @default 'default'
   */
  tone?: 'default' | 'negative';

  /**
   * Vertical alignment of checkbox relative to text.
   * @default 'center'
   */
  align?: 'top' | 'center';

  /**
   * Whether to trigger haptic feedback on toggle.
   * @default false
   */
  hapticFeedback?: boolean;

  /**
   * Disabled interaction & visuals.
   * @default false
   */
  disabled?: boolean;

  // Accessibility & Testing
  accessibilityLabel?: string;
  accessibilityHint?: string;
  testID?: string;

  // Styling Overrides
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

// =============================================================================
// DIMENSION CONSTANTS
// =============================================================================
export const CHECKBOX_DIMENSIONS = {
  small: {
    boxSize: 16,
    iconSize: 12,
    preselectedIconSize: 10,
    fontSize: 14,
    lineHeight: 20,
    rowMinHeight: 36,
    gap: 8,
    hitSlop: 6,
  },
  medium: {
    boxSize: 20,
    iconSize: 14,
    preselectedIconSize: 12,
    fontSize: 16,
    lineHeight: 20,
    rowMinHeight: 48,
    gap: 8,
    hitSlop: 0,
  },
  large: {
    boxSize: 24,
    iconSize: 16,
    preselectedIconSize: 14,
    fontSize: 18,
    lineHeight: 24,
    rowMinHeight: 56,
    gap: 16,
    hitSlop: 0,
  },
} as const;

export const CHECKBOX_RADIUS = 2;
export const CHECKBOX_BORDER_WIDTH = 2;
