import type { ComponentType, ReactNode } from 'react';

import type {
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

export type ButtonKind =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'minimal'
  | 'danger';

export type ButtonSize = 'compact' | 'default' | 'large';
export type ButtonShape = 'default' | 'round';

export interface ButtonEnhancerProps {
  size: number;
  color: string;
}

export type ButtonEnhancer = ReactNode | ComponentType<ButtonEnhancerProps>;

export interface ButtonProps {
  children?: ReactNode;
  kind?: ButtonKind;
  size?: ButtonSize;
  shape?: ButtonShape;
  disabled?: boolean;
  isLoading?: boolean;
  startEnhancer?: ButtonEnhancer;
  endEnhancer?: ButtonEnhancer;
  fullWidth?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  onLongPress?: (event: GestureResponderEvent) => void;
  delayLongPress?: number;
  hapticFeedback?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  testID?: string;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

export type ButtonRef = View;
