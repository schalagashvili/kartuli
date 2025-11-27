import { radius } from '../../../theme/tokens/primitives/radius';
import {
  controlHeights,
  iconSizes,
} from '../../../theme/tokens/primitives/sizing';
import { spacing } from '../../../theme/tokens/primitives/spacing';
import {
  fontSizes,
  lineHeights,
} from '../../../theme/tokens/primitives/typography';
import { createHitSlop } from '../../../utils/hitSlop';
import type { ButtonSize } from '../Button.types';

const MIN_TOUCH_TARGET = 48;

const computeHitSlop = (height: number) => {
  const deficit = Math.max(0, MIN_TOUCH_TARGET - height);
  return deficit / 2;
};

export const BUTTON_DIMENSIONS = {
  small: {
    height: controlHeights.sm,
    iconSize: iconSizes.sm,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    spinnerSize: iconSizes.sm,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
    hitSlop: computeHitSlop(controlHeights.sm),
  },
  medium: {
    height: controlHeights.md,
    iconSize: iconSizes.md,
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
    spinnerSize: iconSizes.md,
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    hitSlop: computeHitSlop(controlHeights.md),
  },
  large: {
    height: controlHeights.lg,
    iconSize: iconSizes.lg,
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.lg,
    spinnerSize: iconSizes.lg,
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
    hitSlop: computeHitSlop(controlHeights.lg),
  },
} as const;

export const getHitSlop = (size: ButtonSize) =>
  createHitSlop(BUTTON_DIMENSIONS[size].hitSlop);

export const BUTTON_RADIUS = {
  rect: radius.md,
  square: radius.md,
  pill: radius.full,
  circle: radius.full,
} as const;

export const getPillMinWidth = (height: number): number =>
  height + spacing['2xl'];

export const ICON_SIZES: Record<ButtonSize, number> = {
  small: BUTTON_DIMENSIONS.small.iconSize,
  medium: BUTTON_DIMENSIONS.medium.iconSize,
  large: BUTTON_DIMENSIONS.large.iconSize,
};

export const SPINNER_SIZES: Record<ButtonSize, number> = {
  small: BUTTON_DIMENSIONS.small.spinnerSize,
  medium: BUTTON_DIMENSIONS.medium.spinnerSize,
  large: BUTTON_DIMENSIONS.large.spinnerSize,
};
