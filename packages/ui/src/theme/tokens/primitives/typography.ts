import { Platform, TextStyle } from 'react-native';

export const fontFamilies = {
  sans: Platform.select({
    ios: 'System',
    android: 'sans-serif',
    default: 'System',
  }),
  mono: Platform.select({
    ios: 'System',
    android: 'monospace',
    default: 'monospace',
  }),
  georgian: Platform.select({
    ios: 'System',
    android: 'sans-serif',
    default: 'System',
  }),
} as const;

export const fontWeights = {
  300: '300' as TextStyle['fontWeight'],
  400: '400' as TextStyle['fontWeight'],
  500: '500' as TextStyle['fontWeight'],
  600: '600' as TextStyle['fontWeight'],
  700: '700' as TextStyle['fontWeight'],
  800: '800' as TextStyle['fontWeight'],
  900: '900' as TextStyle['fontWeight'],
  light: '300' as TextStyle['fontWeight'],
  regular: '400' as TextStyle['fontWeight'],
  medium: '500' as TextStyle['fontWeight'],
  semibold: '600' as TextStyle['fontWeight'],
  bold: '700' as TextStyle['fontWeight'],
  extrabold: '800' as TextStyle['fontWeight'],
  black: '900' as TextStyle['fontWeight'],
} as const;

export const fontSizes = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  '2xl': 20,
  '3xl': 24,
  '4xl': 30,
  '5xl': 36,
  '6xl': 48,
} as const;

export const lineHeights = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 26,
  '2xl': 30,
  '3xl': 32,
  '4xl': 36,
  '5xl': 44,
  '6xl': 56,
} as const;

export const letterSpacing = {
  tighter: -0.5,
  tight: -0.25,
  normal: 0,
  wide: 0.25,
  wider: 0.5,
  widest: 1,
} as const;

export type FontFamilies = typeof fontFamilies;
export type FontWeights = typeof fontWeights;
export type FontSizes = typeof fontSizes;
export type LineHeights = typeof lineHeights;
export type LetterSpacing = typeof letterSpacing;
