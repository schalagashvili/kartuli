import type { ComponentType, ReactElement } from 'react';

import type {
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

// =============================================================================
// HIERARCHY (replaces "kind")
// =============================================================================
// Primary: Highest emphasis, ONE per context (main forward action)
// Secondary: Medium emphasis, most actions live here
// Tertiary: Low emphasis, dismissive actions (cancel, skip, back)
// =============================================================================
export type ButtonHierarchy = 'primary' | 'secondary' | 'tertiary';

// =============================================================================
// SIZE
// =============================================================================
// Small:  36px height, 16px icon, 14/20 typography, 12px padding
// Medium: 48px height, 20px icon, 16/20 typography, 16px padding
// Large:  56px height, 24px icon, 18/24 typography, 16px/20px padding
// =============================================================================
export type ButtonSize = 'small' | 'medium' | 'large';

// =============================================================================
// SHAPE
// =============================================================================
// Rect:   8px corner radius, default CTA shape
// Pill:   height/2 corner radius, inline controls
// Circle: For icon-only or 1-2 characters (initials, single digits)
// Square: Same as circle but square container
// =============================================================================
export type ButtonShape = 'rect' | 'pill' | 'circle' | 'square';

// =============================================================================
// WIDTH MODE
// =============================================================================
// Fixed:     Stretches to container width (Fill Container in Figma)
// Intrinsic: Hugs content (Hug Contents in Figma)
// =============================================================================
export type ButtonWidthMode = 'fixed' | 'intrinsic';

// =============================================================================
// TONE
// =============================================================================
// Default:  Standard button colors
// Negative: Destructive actions (delete, remove) - uses negative color tokens
// =============================================================================
export type ButtonTone = 'default' | 'negative';

// =============================================================================
// ICON ENHANCER
// =============================================================================
// Leading icon:  Reinforces meaning of label (❤️ Favorites)
// Trailing icon: Hints what happens next / affordance (▼ opens menu)
// =============================================================================
export interface ButtonIconProps {
  size: number;
  color: string;
  fill?: string;
}

export type ButtonIcon =
  | ReactElement<ButtonIconProps>
  | ComponentType<ButtonIconProps>
  | null
  | false
  | undefined;

// =============================================================================
// BUTTON PROPS
// =============================================================================
export interface ButtonProps {
  /**
   * Button text content.
   * Keep to 1-3 words. Use sentence case.
   * Use action verbs (Save, Request, Confirm).
   */
  label?: string;

  /**
   * Visual hierarchy level.
   * - primary: Main action, ONE per context
   * - secondary: Alternative actions
   * - tertiary: Dismissive actions (cancel, skip)
   * @default 'primary'
   */
  hierarchy?: ButtonHierarchy;

  /**
   * Button size.
   * - small: 36px height (compact buttons)
   * - medium: 48px height (default)
   * - large: 56px height (prominent CTAs)
   * @default 'medium'
   */
  size?: ButtonSize;

  /**
   * Button shape.
   * - rect: Standard rectangular (8px radius)
   * - pill: Rounded ends (height/2 radius)
   * - circle: Icon-only circular button
   * - square: Icon-only square button
   * @default 'rect'
   */
  shape?: ButtonShape;

  /**
   * Width behavior.
   * - fixed: Stretches to fill container
   * - intrinsic: Hugs content
   * @default 'intrinsic'
   */
  widthMode?: ButtonWidthMode;

  /**
   * Color tone.
   * - default: Standard button colors
   * - negative: Destructive actions (red)
   * @default 'default'
   */
  tone?: ButtonTone;

  /**
   * Icon displayed before the label.
   * Use to reinforce the meaning of the label.
   */
  leadingIcon?: ButtonIcon;

  /**
   * Icon displayed after the label.
   * Use to indicate what happens next (dropdown, navigation).
   */
  trailingIcon?: ButtonIcon;

  /**
   * Whether the button is disabled.
   * Prefer keeping enabled and showing errors on press.
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the button is in loading state.
   * Shows spinner while MAINTAINING button's visual styling.
   * Per Uber spec: Loading buttons should NOT look disabled.
   * @default false
   */
  loading?: boolean;

  /**
   * Whether the button is in active/selected state.
   * Only applicable for secondary hierarchy (toggle buttons).
   * @default false
   */
  active?: boolean;

  /**
   * Press handler.
   */
  onPress?: (event: GestureResponderEvent) => void;

  /**
   * Long press handler.
   */
  onLongPress?: (event: GestureResponderEvent) => void;

  /**
   * Long press delay in milliseconds.
   * @default 500
   */
  delayLongPress?: number;

  /**
   * Whether to trigger haptic feedback on press.
   * @default false
   */
  hapticFeedback?: boolean;

  /**
   * Accessibility label for screen readers.
   * Required if using icon-only button (circle/square shapes).
   */
  accessibilityLabel?: string;

  /**
   * Accessibility hint describing what happens on press.
   * Use for external links: "Opens in Google Maps app"
   */
  accessibilityHint?: string;

  /**
   * Test ID for testing frameworks.
   */
  testID?: string;

  /**
   * Additional outer pressable styles (for layout/margin control).
   * Use sparingly - prefer variants.
   */
  pressableStyle?: StyleProp<ViewStyle>;

  /**
   * Additional container styles.
   * Use sparingly - prefer variants.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Additional label styles.
   * Use sparingly - prefer variants.
   */
  labelStyle?: StyleProp<TextStyle>;
}

export type ButtonRef = View;

// =============================================================================
// DIMENSION CONSTANTS (Uber Spec Page 34)
// =============================================================================
export const BUTTON_DIMENSIONS = {
  small: {
    height: 36,
    iconSize: 16,
    fontSize: 14,
    lineHeight: 20,
    paddingHorizontal: 12,
    gap: 8,
    hitSlop: 6, // (48 - 36) / 2
  },
  medium: {
    height: 48,
    iconSize: 20,
    fontSize: 16,
    lineHeight: 20,
    paddingHorizontal: 16,
    gap: 8,
    hitSlop: 0,
  },
  large: {
    height: 56,
    iconSize: 24,
    fontSize: 18,
    lineHeight: 24,
    paddingHorizontal: 16,
    gap: 8,
    hitSlop: 0,
  },
} as const;

// Corner radius: 8px for ALL rectangular buttons (Uber spec Page 34)
export const BUTTON_RADIUS = {
  rect: 8,
  square: 8,
  // pill and circle use height / 2 (calculated dynamically)
} as const;

// Pill minimum width formula: height + 24 (Uber spec Page 17)
export const getPillMinWidth = (height: number): number => height + 24;
