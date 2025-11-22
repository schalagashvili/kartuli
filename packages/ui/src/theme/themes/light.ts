import { primitiveColors } from '../tokens/colors';
import { radius } from '../tokens/radius';
import { gap, spacing } from '../tokens/spacing';
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
} from '../tokens/typography';

const lightThemeBase = {
  colors: {
    background: primitiveColors.white,
    backgroundSecondary: primitiveColors.gray100,
    backgroundTertiary: primitiveColors.white,

    backgroundInversePrimary: primitiveColors.gray900,
    backgroundStateDisabled: primitiveColors.gray200,
    backgroundNegative: primitiveColors.danger700,

    contentPrimary: primitiveColors.gray900,
    contentSecondary: primitiveColors.gray600,
    contentTertiary: primitiveColors.gray500,
    contentInversePrimary: primitiveColors.white,
    contentStateDisabled: primitiveColors.gray400,
    contentNegative: primitiveColors.danger600,

    foreground: primitiveColors.gray900,
    foregroundSecondary: primitiveColors.gray600,
    foregroundTertiary: primitiveColors.gray500,
    foregroundInverse: primitiveColors.white,

    border: primitiveColors.gray200,
    borderSecondary: primitiveColors.gray300,
    borderFocus: primitiveColors.primary500,

    primary: primitiveColors.primary500,
    primaryForeground: primitiveColors.white,
    primaryHover: primitiveColors.primary600,
    primaryActive: primitiveColors.primary700,

    secondary: primitiveColors.gray100,
    secondaryForeground: primitiveColors.gray900,
    secondaryHover: primitiveColors.gray200,
    secondaryActive: primitiveColors.gray300,

    tertiary: 'transparent',
    tertiaryForeground: primitiveColors.gray900,
    tertiaryHover: primitiveColors.gray100,
    tertiaryActive: primitiveColors.gray200,

    minimal: 'transparent',
    minimalForeground: primitiveColors.gray700,
    minimalHover: primitiveColors.gray50,
    minimalActive: primitiveColors.gray100,

    danger: primitiveColors.danger500,
    dangerForeground: primitiveColors.white,
    dangerHover: primitiveColors.danger600,
    dangerActive: primitiveColors.danger700,

    success: primitiveColors.success500,
    successForeground: primitiveColors.white,

    warning: primitiveColors.warning500,
    warningForeground: primitiveColors.gray900,

    disabled: primitiveColors.gray200,
    disabledForeground: primitiveColors.gray400,

    overlay: 'rgba(0, 0, 0, 0.5)',
  },

  spacing,
  gap,

  fonts: fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,

  radius,

  shadows: {
    none: {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    sm: {
      shadowColor: primitiveColors.black,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: primitiveColors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    lg: {
      shadowColor: primitiveColors.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
  },

  animation: {
    fast: 150,
    normal: 250,
    slow: 400,
  },

  opacity: {
    disabled: 0.5,
    pressed: 0.7,
  },
} as const;

type ThemeColors = { [K in keyof typeof lightThemeBase.colors]: string };

export type AppTheme = Omit<typeof lightThemeBase, 'colors'> & {
  colors: ThemeColors;
};

export const lightTheme: AppTheme = lightThemeBase;
