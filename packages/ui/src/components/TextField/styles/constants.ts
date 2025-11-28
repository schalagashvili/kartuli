import { borderWidths } from '../../../theme/tokens/primitives/borders';
import { radius } from '../../../theme/tokens/primitives/radius';
import { controlHeights } from '../../../theme/tokens/primitives/sizing';
import { spacing } from '../../../theme/tokens/primitives/spacing';
import {
  fontSizes,
  lineHeights,
} from '../../../theme/tokens/primitives/typography';
import type { TextFieldDimensions, TextFieldSize } from '../TextField.types';

export const TEXTFIELD_DIMENSIONS: Record<TextFieldSize, TextFieldDimensions> =
  {
    small: {
      height: controlHeights.sm,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.lg,
      contentGap: spacing.lg,
      borderRadius: radius.sm,
      borderWidth: borderWidths.thick,
      fontSize: fontSizes.md,
      lineHeight: lineHeights.md,
      labelFontSize: fontSizes.sm,
      labelLineHeight: lineHeights.sm,
      hintFontSize: fontSizes.sm,
      hintLineHeight: lineHeights.sm,
      artworkSize: spacing.lg,
      enhancerLabelFontSize: fontSizes.sm,
    },
    medium: {
      height: controlHeights.md,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      contentGap: spacing.lg,
      borderRadius: radius.sm,
      borderWidth: borderWidths.thick,
      fontSize: fontSizes.lg,
      lineHeight: lineHeights.lg,
      labelFontSize: fontSizes.md,
      labelLineHeight: lineHeights.md,
      hintFontSize: fontSizes.sm,
      hintLineHeight: lineHeights.sm,
      artworkSize: spacing.xl,
      enhancerLabelFontSize: fontSizes.md,
    },
    large: {
      height: controlHeights.lg,
      paddingVertical: spacing.lg,
      paddingHorizontal: spacing.lg,
      contentGap: spacing.lg,
      borderRadius: radius.sm,
      borderWidth: borderWidths.thick,
      fontSize: fontSizes.xl,
      lineHeight: lineHeights.xl,
      labelFontSize: fontSizes.lg,
      labelLineHeight: lineHeights.lg,
      hintFontSize: fontSizes.sm,
      hintLineHeight: lineHeights.sm,
      artworkSize: spacing['2xl'],
      enhancerLabelFontSize: fontSizes.lg,
    },
  };

export const ICON_SIZES: Record<TextFieldSize, number> = {
  small: spacing.lg,
  medium: spacing.xl,
  large: spacing['2xl'],
};

export const HINT_ICON_SIZE = fontSizes.md;

export const HINT_ICON_GAP = spacing.xs;

export const LABEL_ROW_GAP = spacing.sm;

export const LABEL_INPUT_GAP = spacing.sm;

export const INPUT_HINT_GAP = spacing.sm;

export const MIN_TOUCH_TARGET = 44;

export const ANIMATION_DURATION = {
  focus: 150,
  color: 120,
} as const;

export const ENHANCER_HIT_SLOP = {
  top: spacing.sm,
  right: spacing.sm,
  bottom: spacing.sm,
  left: spacing.sm,
} as const;
