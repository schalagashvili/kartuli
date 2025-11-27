import { primitiveColors } from '../tokens/colors';
import { type AppTheme, sharedTokens } from './light';

export const darkTheme: AppTheme = {
  ...sharedTokens,
  colors: {
    // --- Surfaces ---
    background: primitiveColors.black,
    backgroundSecondary: primitiveColors.gray900,
    backgroundTertiary: primitiveColors.gray800,
    backgroundInverse: primitiveColors.white,

    // --- Inputs ---
    inputBackground: primitiveColors.gray800,
    inputPlaceholder: primitiveColors.gray500,

    // --- Content ---
    contentPrimary: primitiveColors.white,
    contentSecondary: primitiveColors.gray400,
    contentTertiary: primitiveColors.gray500,
    contentInversePrimary: primitiveColors.black,
    contentDisabled: primitiveColors.gray600,

    // --- Borders ---
    borderSubtle: primitiveColors.gray900,
    border: primitiveColors.gray800,
    borderStrong: primitiveColors.gray700,
    borderFocus: primitiveColors.white,
    borderError: primitiveColors.danger400,

    // --- Interactive: Primary ---
    primary: primitiveColors.white,
    primaryForeground: primitiveColors.black,
    primaryHover: primitiveColors.gray200,
    primaryActive: primitiveColors.gray300,

    // --- Interactive: Secondary ---
    secondary: primitiveColors.gray800,
    secondaryForeground: primitiveColors.white,
    secondaryHover: primitiveColors.gray700,
    secondaryActive: primitiveColors.gray600,

    // --- Interactive: Brand / Links ---
    brand: primitiveColors.blue500,
    brandForeground: primitiveColors.white,
    brandBackground: 'rgba(39, 110, 241, 0.2)',
    link: primitiveColors.blue400, // Lighter blue for dark mode legibility

    // --- Interactive: Ghost ---
    ghost: 'transparent',
    ghostForeground: primitiveColors.gray400,
    ghostHover: primitiveColors.gray800,
    ghostActive: primitiveColors.gray700,

    // --- Interactive: Disabled ---
    disabled: primitiveColors.gray800,
    disabledForeground: primitiveColors.gray600,

    // --- Semantic ---
    rating: primitiveColors.rating500,

    success: primitiveColors.success400,
    successBackground: 'rgba(5, 163, 87, 0.2)',

    warning: primitiveColors.warning400,
    warningBackground: 'rgba(255, 192, 67, 0.2)',

    danger: primitiveColors.danger400,
    dangerBackground: 'rgba(225, 25, 0, 0.2)',

    // --- Overlays ---
    overlayLight: 'rgba(255, 255, 255, 0.05)',
    overlay: 'rgba(0, 0, 0, 0.7)',
    overlayHeavy: 'rgba(0, 0, 0, 0.9)',
  },
  shadows: {
    sm: {
      shadowColor: primitiveColors.black,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: primitiveColors.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.6,
      shadowRadius: 8,
      elevation: 5,
    },
    lg: {
      shadowColor: primitiveColors.black,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.8,
      shadowRadius: 16,
      elevation: 10,
    },
  },
};
