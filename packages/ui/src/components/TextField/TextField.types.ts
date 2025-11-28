import type { ReactNode } from 'react';

import type {
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';

import type { LucideIcon } from 'lucide-react-native';

export type TextFieldSize = 'small' | 'medium' | 'large';

export type TextFieldVisualState =
  | 'enabled'
  | 'focused'
  | 'error'
  | 'success'
  | 'disabled'
  | 'readOnly'
  | 'loading';

export type TextFieldValidationState = 'none' | 'complete' | 'incomplete';

type EnhancerArtwork = {
  type: 'artwork';
  icon: LucideIcon | ReactNode;
  onPress?: () => void;
};

type EnhancerLabel = {
  type: 'label';
  text: string;
  onPress?: () => void;
};

type EnhancerArtworkLabel = {
  type: 'artworkLabel';
  icon: LucideIcon | ReactNode;
  text: string;
  onPress?: () => void;
};

export type TextFieldEnhancer =
  | EnhancerArtwork
  | EnhancerLabel
  | EnhancerArtworkLabel;

export type TextFieldDimensions = {
  height: number;
  paddingVertical: number;
  paddingHorizontal: number;
  contentGap: number;
  borderRadius: number;
  borderWidth: number;
  fontSize: number;
  lineHeight: number;
  labelFontSize: number;
  labelLineHeight: number;
  hintFontSize: number;
  hintLineHeight: number;
  artworkSize: number;
  enhancerLabelFontSize: number;
};

export interface TextFieldProps
  extends Omit<
    TextInputProps,
    'style' | 'value' | 'onChangeText' | 'editable'
  > {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;

  label?: string;
  hint?: string;

  size?: TextFieldSize;

  disabled?: boolean;
  readOnly?: boolean;
  loading?: boolean;

  error?: boolean;
  errorText?: string;
  success?: boolean;
  successText?: string;

  validationState?: TextFieldValidationState;

  maxLength?: number;
  showCharacterCount?: boolean;

  clearable?: boolean;
  onClear?: () => void;

  passwordToggle?: boolean;

  leadingEnhancer?: TextFieldEnhancer;
  trailingEnhancer?: TextFieldEnhancer;

  hapticFeedback?: boolean;

  accessibilityLabel?: string;
  accessibilityHint?: string;

  style?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  hintStyle?: StyleProp<TextStyle>;

  testID?: string;
}

export type TextFieldRef = {
  focus: () => void;
  blur: () => void;
  clear: () => void;
  isFocused: () => boolean;
};
