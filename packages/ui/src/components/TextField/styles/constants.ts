import type { TextFieldDimensions, TextFieldSize } from '../TextField.types';

// =============================================================================
// UBER BASE DESIGN SYSTEM - TEXT FIELD DIMENSIONS
// Reference: PDF Pages 23-24
// =============================================================================

export const TEXTFIELD_DIMENSIONS: Record<TextFieldSize, TextFieldDimensions> =
  {
    small: {
      height: 36,
      paddingVertical: 8,
      paddingHorizontal: 16,
      contentGap: 16,
      borderRadius: 8,
      borderWidth: 3,
      // Typography (ParagraphSmall)
      fontSize: 14,
      lineHeight: 20,
      // Label (LabelSmall)
      labelFontSize: 12,
      labelLineHeight: 16,
      // Hint (ParagraphSmall)
      hintFontSize: 12,
      hintLineHeight: 16,
      // Enhancers
      artworkSize: 16,
      enhancerLabelFontSize: 12,
    },
    medium: {
      height: 48,
      paddingVertical: 12,
      paddingHorizontal: 16,
      contentGap: 16,
      borderRadius: 8,
      borderWidth: 3,
      // Typography (ParagraphMedium)
      fontSize: 16,
      lineHeight: 24,
      // Label (LabelMedium)
      labelFontSize: 14,
      labelLineHeight: 20,
      // Hint (ParagraphSmall)
      hintFontSize: 12,
      hintLineHeight: 16,
      // Enhancers
      artworkSize: 20,
      enhancerLabelFontSize: 14,
    },
    large: {
      height: 56,
      // Padding set to center 28px line-height text within 56px height
      paddingVertical: 14,
      paddingHorizontal: 16,
      contentGap: 16,
      borderRadius: 8,
      borderWidth: 3,
      // Typography (ParagraphLarge)
      fontSize: 18,
      lineHeight: 28,
      // Label (LabelLarge)
      labelFontSize: 16,
      labelLineHeight: 24,
      // Hint (ParagraphSmall)
      hintFontSize: 12,
      hintLineHeight: 16,
      // Enhancers
      artworkSize: 24,
      enhancerLabelFontSize: 16,
    },
  };

// Clear button and validation icon sizes
export const ICON_SIZES: Record<TextFieldSize, number> = {
  small: 16,
  medium: 20,
  large: 24,
};

// Hint icon size (always 14px per spec)
export const HINT_ICON_SIZE = 14;

// Spacing between hint icon and text
export const HINT_ICON_GAP = 4;

// Label row spacing (between label and character count)
export const LABEL_ROW_GAP = 8;

// Spacing between label row and input container
export const LABEL_INPUT_GAP = 8;

// Spacing between input container and hint
export const INPUT_HINT_GAP = 8;

// Minimum touch target
export const MIN_TOUCH_TARGET = 44;

// Animation durations
export const ANIMATION_DURATION = {
  focus: 150,
  color: 120,
} as const;

// Hit slop for enhancer buttons
export const ENHANCER_HIT_SLOP = {
  top: 8,
  right: 8,
  bottom: 8,
  left: 8,
} as const;
