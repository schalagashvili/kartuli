import { primitiveColors } from '../tokens/colors';
import { type AppTheme, lightTheme } from './light';

export const darkTheme: AppTheme = {
  ...lightTheme,

  colors: {
    background: primitiveColors.gray900,
    backgroundSecondary: primitiveColors.gray800,
    backgroundTertiary: primitiveColors.gray700,

    foreground: primitiveColors.white,
    foregroundSecondary: primitiveColors.gray300,
    foregroundTertiary: primitiveColors.gray400,
    foregroundInverse: primitiveColors.gray900,

    border: primitiveColors.gray700,
    borderSecondary: primitiveColors.gray600,
    borderFocus: primitiveColors.primary400,

    primary: primitiveColors.white,
    primaryForeground: primitiveColors.gray900,
    primaryHover: primitiveColors.gray100,
    primaryActive: primitiveColors.gray200,

    secondary: primitiveColors.gray800,
    secondaryForeground: primitiveColors.white,
    secondaryHover: primitiveColors.gray700,
    secondaryActive: primitiveColors.gray600,

    tertiary: 'transparent',
    tertiaryForeground: primitiveColors.white,
    tertiaryHover: primitiveColors.gray800,
    tertiaryActive: primitiveColors.gray700,

    minimal: 'transparent',
    minimalForeground: primitiveColors.gray300,
    minimalHover: primitiveColors.gray800,
    minimalActive: primitiveColors.gray700,

    danger: primitiveColors.danger400,
    dangerForeground: primitiveColors.white,
    dangerHover: primitiveColors.danger500,
    dangerActive: primitiveColors.danger600,

    success: primitiveColors.success400,
    successForeground: primitiveColors.white,

    warning: primitiveColors.warning400,
    warningForeground: primitiveColors.gray900,

    disabled: primitiveColors.gray700,
    disabledForeground: primitiveColors.gray500,

    overlay: 'rgba(0, 0, 0, 0.7)',
  },
};
