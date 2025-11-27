import { createSpacing } from './utils';

export const spacing = {
  none: 0,
  xxs: 2,
  xs: createSpacing(1),
  sm: createSpacing(2),
  md: createSpacing(3),
  lg: createSpacing(4),
  xl: createSpacing(5),
  '2xl': createSpacing(6),
  '3xl': createSpacing(8),
  '4xl': createSpacing(10),
  '5xl': createSpacing(12),
  '6xl': createSpacing(16),
} as const;

export type Spacing = typeof spacing;
export type SpacingKey = keyof Spacing;
