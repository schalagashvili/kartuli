import { radius as primitive } from '../primitives/radius';

export const semanticRadius = {
  none: primitive.none,
  sm: primitive.sm,
  md: primitive.md,
  lg: primitive.lg,
  xl: primitive.xl,
  pill: primitive.full,
  circle: primitive.full,
} as const;

export type SemanticRadius = typeof semanticRadius;
