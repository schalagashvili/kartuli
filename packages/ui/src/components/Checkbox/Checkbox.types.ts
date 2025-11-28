import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

import { borderWidths } from '../../theme/tokens/primitives/borders';
import { spacing } from '../../theme/tokens/primitives/spacing';

export type CheckboxVisualState =
  | 'unchecked'
  | 'checked'
  | 'indeterminate'
  | 'preselected';

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  indeterminate?: boolean;
  preselected?: boolean;
  label?: string;
  description?: string;
  errorText?: string;
  size?: 'small' | 'medium' | 'large';
  tone?: 'default' | 'negative';
  align?: 'top' | 'center';
  hapticFeedback?: boolean;
  disabled?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  testID?: string;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

export const CHECKBOX_DIMENSIONS = {
  small: {
    boxSize: 16,
    iconSize: 12,
    preselectedIconSize: 10,
    fontSize: 14,
    lineHeight: 20,
    rowMinHeight: 36,
    gap: spacing.sm,
    hitSlop: 6,
  },
  medium: {
    boxSize: 20,
    iconSize: 14,
    preselectedIconSize: 12,
    fontSize: 16,
    lineHeight: 20,
    rowMinHeight: 48,
    gap: spacing.sm,
    hitSlop: spacing.none,
  },
  large: {
    boxSize: 24,
    iconSize: 16,
    preselectedIconSize: 14,
    fontSize: 18,
    lineHeight: 24,
    rowMinHeight: 56,
    gap: spacing.lg,
    hitSlop: spacing.none,
  },
} as const;

export const CHECKBOX_RADIUS = 2;
export const CHECKBOX_BORDER_WIDTH = borderWidths.medium;
