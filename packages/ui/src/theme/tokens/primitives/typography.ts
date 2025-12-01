import { Platform } from 'react-native';

export const fontFamilies = {
  sans:
    Platform.select({
      ios: 'System',
      android: 'sans-serif',
      default: 'System',
    }) ?? 'System',
  mono:
    Platform.select({
      ios: 'Roboto',
      android: 'monospace',
      default: 'Courier',
    }) ?? 'Courier',
} as const;

export const fontSizes = {
  xxs: 10,
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
  '6xl': 60,
} as const;

export type FontSizes = typeof fontSizes;

export const lineHeights = {
  xxs: 14,
  xs: 16,
  sm: 20,
  md: 22,
  lg: 26,
  xl: 28,
  '2xl': 32,
  '3xl': 36,
  '4xl': 42,
  '5xl': 56,
  '6xl': 72,
} as const;

export type LineHeights = typeof lineHeights;

export const fontWeights = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export type FontWeights = typeof fontWeights;

export const letterSpacing = {
  tighter: -0.8,
  tight: -0.4,
  normal: 0,
  wide: 0.4,
  wider: 0.8,
  widest: 1.6,
} as const;

export type LetterSpacing = typeof letterSpacing;
