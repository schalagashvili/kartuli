import type { TextStyle } from 'react-native';

import {
  fontFamilies,
  fontSizes,
  fontWeights,
  letterSpacing,
  lineHeights,
} from '../primitives/typography';

export type TextStyleToken = Pick<
  TextStyle,
  | 'fontFamily'
  | 'fontSize'
  | 'fontWeight'
  | 'lineHeight'
  | 'letterSpacing'
  | 'textTransform'
  | 'textDecorationLine'
>;

export const textStyles = {
  display: {
    large: {
      fontFamily: fontFamilies.sans,
      fontSize: fontSizes['6xl'],
      lineHeight: lineHeights['6xl'],
      fontWeight: fontWeights.bold,
      letterSpacing: letterSpacing.tighter,
    },
    medium: {
      fontFamily: fontFamilies.sans,
      fontSize: fontSizes['5xl'],
      lineHeight: lineHeights['5xl'],
      fontWeight: fontWeights.bold,
      letterSpacing: letterSpacing.tight,
    },
    small: {
      fontFamily: fontFamilies.sans,
      fontSize: fontSizes['4xl'],
      lineHeight: lineHeights['4xl'],
      fontWeight: fontWeights.semibold,
      letterSpacing: letterSpacing.tight,
    },
  },
  heading: {
    h1: {
      fontFamily: fontFamilies.sans,
      fontSize: fontSizes['3xl'],
      lineHeight: lineHeights['3xl'],
      fontWeight: fontWeights.bold,
      letterSpacing: letterSpacing.tight,
    },
    h2: {
      fontFamily: fontFamilies.sans,
      fontSize: fontSizes['2xl'],
      lineHeight: lineHeights['2xl'],
      fontWeight: fontWeights.semibold,
      letterSpacing: letterSpacing.tight,
    },
    h3: {
      fontFamily: fontFamilies.sans,
      fontSize: fontSizes.xl,
      lineHeight: lineHeights.xl,
      fontWeight: fontWeights.semibold,
      letterSpacing: letterSpacing.normal,
    },
    h4: {
      fontFamily: fontFamilies.sans,
      fontSize: fontSizes.lg,
      lineHeight: lineHeights.lg,
      fontWeight: fontWeights.semibold,
      letterSpacing: letterSpacing.normal,
    },
  },
  body: {
    large: {
      fontFamily: fontFamilies.sans,
      fontSize: fontSizes.lg,
      lineHeight: lineHeights.lg,
      fontWeight: fontWeights.regular,
    },
    medium: {
      fontFamily: fontFamilies.sans,
      fontSize: fontSizes.md,
      lineHeight: lineHeights.md,
      fontWeight: fontWeights.regular,
    },
    small: {
      fontFamily: fontFamilies.sans,
      fontSize: fontSizes.sm,
      lineHeight: lineHeights.sm,
      fontWeight: fontWeights.regular,
    },
  },
  label: {
    large: {
      fontFamily: fontFamilies.sans,
      fontSize: fontSizes.lg,
      lineHeight: lineHeights.lg,
      fontWeight: fontWeights.semibold,
      letterSpacing: letterSpacing.wide,
    },
    medium: {
      fontFamily: fontFamilies.sans,
      fontSize: fontSizes.md,
      lineHeight: lineHeights.md,
      fontWeight: fontWeights.medium,
      letterSpacing: letterSpacing.wide,
    },
    small: {
      fontFamily: fontFamilies.sans,
      fontSize: fontSizes.sm,
      lineHeight: lineHeights.sm,
      fontWeight: fontWeights.medium,
      letterSpacing: letterSpacing.wide,
    },
  },
  caption: {
    default: {
      fontFamily: fontFamilies.sans,
      fontSize: fontSizes.xs,
      lineHeight: lineHeights.xs,
      fontWeight: fontWeights.regular,
    },
    emphasis: {
      fontFamily: fontFamilies.sans,
      fontSize: fontSizes.xs,
      lineHeight: lineHeights.xs,
      fontWeight: fontWeights.medium,
    },
    small: {
      fontFamily: fontFamilies.sans,
      fontSize: fontSizes.xxs,
      lineHeight: lineHeights.xxs,
      fontWeight: fontWeights.medium,
      letterSpacing: letterSpacing.wide,
    },
  },
  utility: {
    tiny: {
      fontFamily: fontFamilies.sans,
      fontSize: fontSizes.xs,
      lineHeight: lineHeights.xs,
      fontWeight: fontWeights.medium,
      letterSpacing: letterSpacing.wider,
    },
    overline: {
      fontFamily: fontFamilies.sans,
      fontSize: fontSizes.xs,
      lineHeight: lineHeights.xs,
      fontWeight: fontWeights.semibold,
      letterSpacing: letterSpacing.wider,
      textTransform: 'uppercase',
    },
    mono: {
      fontFamily: fontFamilies.mono,
      fontSize: fontSizes.sm,
      lineHeight: lineHeights.sm,
      fontWeight: fontWeights.regular,
    },
  },
} as const;

export type TextStyles = typeof textStyles;
