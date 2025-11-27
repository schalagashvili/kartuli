import { createSpacing } from './utils';

export const radius = {
  none: 0,
  sm: createSpacing(1),
  md: createSpacing(2),
  lg: createSpacing(3),
  xl: createSpacing(4),
  '2xl': createSpacing(6),
  '3xl': createSpacing(8),
  full: 9999,
} as const;

export type Radius = typeof radius;
export type RadiusKey = keyof Radius;
