import { radius as primitiveRadius } from '../primitives/radius';

export const semanticRadius = {
  none: primitiveRadius.none,
  button: {
    pill: primitiveRadius.full,
    rounded: primitiveRadius.lg,
    subtle: primitiveRadius.md,
  },
  card: {
    default: primitiveRadius.xl,
    small: primitiveRadius.lg,
  },
  input: primitiveRadius.md,
  chip: primitiveRadius.full,
  avatar: primitiveRadius.full,
  modal: primitiveRadius['2xl'],
  toast: primitiveRadius.lg,
  badge: primitiveRadius.full,
  thumbnail: primitiveRadius.md,
  marker: primitiveRadius.full,
} as const;

export type SemanticRadius = typeof semanticRadius;
