import type { ComponentType, ReactElement } from 'react';

import type {
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

export type ButtonHierarchy = 'primary' | 'secondary' | 'tertiary';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonShape = 'rect' | 'pill' | 'circle' | 'square';
export type ButtonWidthMode = 'fixed' | 'intrinsic';
export type ButtonTone = 'default' | 'negative';

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

export interface ButtonProps {
  label?: string;
  hierarchy?: ButtonHierarchy;
  size?: ButtonSize;
  shape?: ButtonShape;
  widthMode?: ButtonWidthMode;
  tone?: ButtonTone;
  leadingIcon?: ButtonIcon;
  trailingIcon?: ButtonIcon;
  disabled?: boolean;
  loading?: boolean;
  active?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  onLongPress?: (event: GestureResponderEvent) => void;
  delayLongPress?: number;
  hapticFeedback?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  testID?: string;
  pressableStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

export type ButtonRef = View;
