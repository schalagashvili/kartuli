import { durations, easings } from '../tokens/primitives/animation';
import { borderWidths } from '../tokens/primitives/borders';
import { palette } from '../tokens/primitives/colors';
import {
  alignContent,
  alignItems,
  alignSelf,
  direction,
  flex,
  grow,
  justify,
  shrink,
  size,
  wrap,
} from '../tokens/primitives/layout';
import { opacity } from '../tokens/primitives/opacity';
import { radius } from '../tokens/primitives/radius';
import { spacing } from '../tokens/primitives/spacing';
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  letterSpacing,
  lineHeights,
} from '../tokens/primitives/typography';
import { zIndex } from '../tokens/primitives/zIndex';
import {
  semanticRadius,
  semanticSpacing,
  textStyles,
} from '../tokens/semantics';
import type { ThemeShadow } from '../types';

export const sharedTokens = {
  spacing,
  radius,
  borderWidths,
  opacity,
  zIndex,
  size,
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacing,
  animation: {
    durations,
    easings,
  },
  textStyles,
  semanticSpacing,
  semanticRadius,
  flex: {
    flex,
    shrink,
    grow,
    direction,
    wrap,
    alignItems,
    alignSelf,
    justify,
    alignContent,
  },
} as const;

const lightThemeBase = {
  ...sharedTokens,
  colors: {
    transparent: palette.transparent,

    background: palette.white,
    backgroundSecondary: palette.gray50,
    backgroundTertiary: palette.gray100,
    backgroundInverse: palette.black,

    surfaceModal: palette.white,

    inputBackground: palette.gray100,
    inputPlaceholder: palette.gray600,
    inputText: palette.black,

    contentPrimary: palette.black,
    contentSecondary: palette.gray600,
    contentTertiary: palette.gray500,
    contentInversePrimary: palette.white,
    contentDisabled: palette.gray400,
    contentBrand: palette.blue600,

    borderSubtle: palette.gray50,
    border: palette.gray200,
    borderStrong: palette.gray300,
    borderFocus: palette.black,
    borderError: palette.danger500,

    primary: palette.black,
    primaryForeground: palette.white,
    primaryHover: palette.gray800,
    primaryActive: palette.gray700,

    secondary: palette.gray100,
    secondaryForeground: palette.black,
    secondaryHover: palette.gray200,
    secondaryActive: palette.gray300,

    tertiary: palette.transparent,
    tertiaryForeground: palette.gray600,
    tertiaryHover: palette.gray50,
    tertiaryActive: palette.gray100,

    brand: palette.blue500,
    brandForeground: palette.white,
    brandBackground: palette.blue50,

    link: palette.blue600,

    disabled: palette.gray100,
    disabledForeground: palette.gray400,

    rating: palette.rating,

    success: palette.success600,
    successBackground: palette.success50,
    successForeground: palette.success800,

    warning: palette.warning700,
    warningBackground: palette.warning50,
    warningForeground: palette.warning900,

    danger: palette.danger600,
    dangerBackground: palette.danger50,
    dangerForeground: palette.danger900,

    overlayLight: palette.blackAlpha5,
    overlay: palette.blackAlpha40,
    overlayHeavy: palette.blackAlpha70,
    overlayMuted: palette.blackAlpha10,
  },

  shadows: {
    sm: {
      shadowColor: palette.black,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    } as ThemeShadow,
    md: {
      shadowColor: palette.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 10,
      elevation: 4,
    } as ThemeShadow,
    lg: {
      shadowColor: palette.black,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 20,
      elevation: 10,
    } as ThemeShadow,
    xl: {
      shadowColor: palette.black,
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.15,
      shadowRadius: 24,
      elevation: 16,
    } as ThemeShadow,
  },
} as const;

export type ThemeColors = {
  [K in keyof typeof lightThemeBase.colors]: string;
};

export type AppTheme = Omit<typeof lightThemeBase, 'colors' | 'shadows'> & {
  colors: ThemeColors;
  shadows: Record<keyof typeof lightThemeBase.shadows, ThemeShadow>;
};

export const lightTheme: AppTheme = lightThemeBase;
