import { palette } from '../tokens/primitives/colors';
import { type AppTheme, sharedTokens } from './light';

export const darkTheme: AppTheme = {
  ...sharedTokens,
  colors: {
    transparent: palette.transparent,

    background: palette.black,
    backgroundSecondary: palette.gray900,
    backgroundTertiary: palette.gray800,
    backgroundInverse: palette.white,

    surfaceModal: palette.gray900,

    inputBackground: palette.gray800,
    inputPlaceholder: palette.gray500,
    inputText: palette.white,

    contentPrimary: palette.white,
    contentSecondary: palette.gray400,
    contentTertiary: palette.gray500,
    contentInversePrimary: palette.black,
    contentDisabled: palette.gray600,
    contentBrand: palette.blue400,

    borderSubtle: palette.gray900,
    border: palette.gray800,
    borderStrong: palette.gray700,
    borderFocus: palette.blue400,
    borderError: palette.danger400,

    primary: palette.white,
    primaryForeground: palette.black,
    primaryHover: palette.gray200,
    primaryActive: palette.gray300,

    secondary: palette.gray800,
    secondaryForeground: palette.white,
    secondaryHover: palette.gray700,
    secondaryActive: palette.gray600,

    tertiary: palette.transparent,
    tertiaryForeground: palette.gray400,
    tertiaryHover: palette.gray800,
    tertiaryActive: palette.gray700,

    brand: palette.blue500,
    brandForeground: palette.white,
    brandBackground: 'rgba(39, 110, 241, 0.2)',

    link: palette.blue400,

    disabled: palette.gray800,
    disabledForeground: palette.gray600,

    rating: palette.rating,

    success: palette.success400,
    successBackground: 'rgba(5, 163, 87, 0.2)',
    successForeground: palette.success200,

    warning: palette.warning400,
    warningBackground: 'rgba(255, 192, 67, 0.2)',
    warningForeground: palette.warning200,

    danger: palette.danger400,
    dangerBackground: 'rgba(225, 25, 0, 0.2)',
    dangerForeground: palette.danger200,

    overlayLight: palette.whiteAlpha10,
    overlay: palette.blackAlpha70,
    overlayHeavy: 'rgba(0, 0, 0, 0.9)',
    overlayMuted: palette.whiteAlpha20,
  },

  shadows: {
    sm: {
      shadowColor: palette.black,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: palette.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.6,
      shadowRadius: 8,
      elevation: 5,
    },
    lg: {
      shadowColor: palette.black,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.8,
      shadowRadius: 16,
      elevation: 10,
    },
    xl: {
      shadowColor: palette.black,
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.9,
      shadowRadius: 24,
      elevation: 16,
    },
  },
};
