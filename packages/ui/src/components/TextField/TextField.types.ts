import type { ReactNode } from 'react';

import type {
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';

import type { LucideIcon } from 'lucide-react-native';

// =============================================================================
// SIZE VARIANTS
// =============================================================================
export type TextFieldSize = 'small' | 'medium' | 'large';

// =============================================================================
// VISUAL STATES
// Per Uber spec (Page 8-9): 13 states, but we model the controllable ones
// =============================================================================
export type TextFieldVisualState =
  | 'enabled'
  | 'focused'
  | 'error'
  | 'success'
  | 'disabled'
  | 'readOnly'
  | 'loading';

// Field validation (Complete/Incomplete icons)
export type TextFieldValidationState = 'none' | 'complete' | 'incomplete';

// =============================================================================
// ENHANCER TYPES
// Per Uber spec (Page 1-2): Artwork, Label, or Artwork+Label
// =============================================================================
type EnhancerArtwork = {
  type: 'artwork';
  icon: LucideIcon | ReactNode;
  /** If true, enhancer is pressable (actionable) */
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

// =============================================================================
// DIMENSION TYPES
// =============================================================================
export type TextFieldDimensions = {
  height: number;
  paddingVertical: number;
  paddingHorizontal: number;
  contentGap: number;
  borderRadius: number;
  borderWidth: number;
  // Typography
  fontSize: number;
  lineHeight: number;
  labelFontSize: number;
  labelLineHeight: number;
  hintFontSize: number;
  hintLineHeight: number;
  // Enhancers
  artworkSize: number;
  enhancerLabelFontSize: number;
};

export interface TextFieldProps
  extends Omit<
    TextInputProps,
    'style' | 'value' | 'onChangeText' | 'editable'
  > {
  // ─────────────────────────────────────────────────────────────────────────
  // Core (Controlled)
  // ─────────────────────────────────────────────────────────────────────────
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;

  // ─────────────────────────────────────────────────────────────────────────
  // Label & Hint
  // ─────────────────────────────────────────────────────────────────────────
  label?: string;
  hint?: string;

  // ─────────────────────────────────────────────────────────────────────────
  // Size
  // ─────────────────────────────────────────────────────────────────────────
  size?: TextFieldSize;

  // ─────────────────────────────────────────────────────────────────────────
  // States
  // ─────────────────────────────────────────────────────────────────────────
  disabled?: boolean;
  readOnly?: boolean;
  loading?: boolean;

  // ─────────────────────────────────────────────────────────────────────────
  // Validation (Error/Success with hint override)
  // ─────────────────────────────────────────────────────────────────────────
  error?: boolean;
  errorText?: string;
  success?: boolean;
  successText?: string;

  // ─────────────────────────────────────────────────────────────────────────
  // Field Validation (Complete/Incomplete icons)
  // ─────────────────────────────────────────────────────────────────────────
  validationState?: TextFieldValidationState;

  // ─────────────────────────────────────────────────────────────────────────
  // Character Count
  // ─────────────────────────────────────────────────────────────────────────
  maxLength?: number;
  showCharacterCount?: boolean;

  // ─────────────────────────────────────────────────────────────────────────
  // Clear Button
  // ─────────────────────────────────────────────────────────────────────────
  clearable?: boolean;
  onClear?: () => void;

  // ─────────────────────────────────────────────────────────────────────────
  // Password
  // ─────────────────────────────────────────────────────────────────────────
  /** If true, handles secureTextEntry toggling internally with eye icon */
  passwordToggle?: boolean;

  // ─────────────────────────────────────────────────────────────────────────
  // Enhancers (New API & Legacy Support)
  // ─────────────────────────────────────────────────────────────────────────
  leadingEnhancer?: TextFieldEnhancer;
  trailingEnhancer?: TextFieldEnhancer;

  // ─────────────────────────────────────────────────────────────────────────
  // Interaction
  // ─────────────────────────────────────────────────────────────────────────
  hapticFeedback?: boolean;

  // ─────────────────────────────────────────────────────────────────────────
  // Accessibility
  // ─────────────────────────────────────────────────────────────────────────
  accessibilityLabel?: string;
  accessibilityHint?: string;

  // ─────────────────────────────────────────────────────────────────────────
  // Styling
  // ─────────────────────────────────────────────────────────────────────────
  style?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  hintStyle?: StyleProp<TextStyle>;

  // ─────────────────────────────────────────────────────────────────────────
  // Test
  // ─────────────────────────────────────────────────────────────────────────
  testID?: string;
}

export type TextFieldRef = {
  focus: () => void;
  blur: () => void;
  clear: () => void;
  isFocused: () => boolean;
};
