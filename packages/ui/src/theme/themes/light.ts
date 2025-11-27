import { primitiveColors } from '../tokens/colors';
import { radius } from '../tokens/radius';
import { gap, spacing } from '../tokens/spacing';
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
} from '../tokens/typography';

// ------------------------------------------------------------
// 1. Shared Tokens
// ------------------------------------------------------------
export const sharedTokens = {
  spacing,
  gap,
  fonts: fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  radius,
  animation: {
    fast: 200,
    normal: 400,
    slow: 600,
  },
  opacity: {
    disabled: 0.3,
    pressed: 0.7,
  },
};

// ------------------------------------------------------------
// 2. Base Implementation (Light Theme)
// ------------------------------------------------------------
const lightThemeBase = {
  ...sharedTokens,
  colors: {
    // --- Surfaces ---
    background: primitiveColors.white,
    backgroundSecondary: primitiveColors.gray50,
    backgroundTertiary: primitiveColors.gray100,
    backgroundInverse: primitiveColors.black,

    // --- Inputs ---
    inputBackground: primitiveColors.gray100,
    inputPlaceholder: primitiveColors.gray600,

    // --- Content ---
    contentPrimary: primitiveColors.black,
    contentSecondary: primitiveColors.gray600,
    contentTertiary: primitiveColors.gray500,
    contentInversePrimary: primitiveColors.white,
    contentDisabled: primitiveColors.gray400,

    // --- Borders (The Hierarchy you need) ---
    borderSubtle: primitiveColors.gray50, // Very faint
    border: primitiveColors.gray200, // Default dividers
    borderStrong: primitiveColors.gray300, // Inputs / Cards
    borderFocus: primitiveColors.black,
    borderError: primitiveColors.danger500,

    // --- Interactive: Primary ---
    primary: primitiveColors.black,
    primaryForeground: primitiveColors.white,
    primaryHover: primitiveColors.gray800,
    primaryActive: primitiveColors.gray700,

    // --- Interactive: Secondary ---
    secondary: primitiveColors.gray100,
    secondaryForeground: primitiveColors.black,
    secondaryHover: primitiveColors.gray200,
    secondaryActive: primitiveColors.gray300,

    // --- Interactive: Brand / Links ---
    brand: primitiveColors.blue500,
    brandForeground: primitiveColors.white,
    brandBackground: primitiveColors.blue50,
    link: primitiveColors.blue500, // Explicit link color

    // --- Interactive: Ghost ---
    ghost: 'transparent',
    ghostForeground: primitiveColors.gray600,
    ghostHover: primitiveColors.gray50,
    ghostActive: primitiveColors.gray100,

    // --- Interactive: Disabled ---
    disabled: primitiveColors.gray100,
    disabledForeground: primitiveColors.gray400,

    // --- Semantic ---
    rating: primitiveColors.rating500,

    success: primitiveColors.success600,
    successBackground: primitiveColors.success50,

    warning: primitiveColors.warning500,
    warningBackground: primitiveColors.warning50,

    danger: primitiveColors.danger500,
    dangerBackground: primitiveColors.danger50,

    // --- Overlays (The Tiers you need) ---
    overlayLight: 'rgba(0, 0, 0, 0.05)',
    overlay: 'rgba(0, 0, 0, 0.4)',
    overlayHeavy: 'rgba(0, 0, 0, 0.7)',
  },
  shadows: {
    sm: {
      shadowColor: primitiveColors.black,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: primitiveColors.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 4,
    },
    lg: {
      shadowColor: primitiveColors.black,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 20,
      elevation: 10,
    },
  },
} as const;

// ------------------------------------------------------------
// 3. Type Definitions
// ------------------------------------------------------------

type ThemeShadow = {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
};

export type ThemeColors = {
  [K in keyof typeof lightThemeBase.colors]: string;
};

export type AppTheme = Omit<typeof lightThemeBase, 'colors' | 'shadows'> & {
  colors: ThemeColors;
  shadows: {
    [K in keyof typeof lightThemeBase.shadows]: ThemeShadow;
  };
};

// ------------------------------------------------------------
// 4. Exports
// ------------------------------------------------------------

export const lightTheme: AppTheme = lightThemeBase;
