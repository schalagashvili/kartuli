export const fontFamilies = {
  sans: 'System',
  mono: 'monospace',
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

export const fontWeights = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export const lineHeights = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
} as const;

export type FontFamilies = typeof fontFamilies;
export type FontSizes = typeof fontSizes;
export type FontWeights = typeof fontWeights;
export type LineHeights = typeof lineHeights;
