export const spacing = {
  none: 0,
  xxs: 2, // ✅ Restored
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64, // ✅ Restored
} as const;

export type Spacing = typeof spacing;
export type SpacingKey = keyof Spacing;
