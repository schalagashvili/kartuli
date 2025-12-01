import { controlHeights, iconSizes } from '../primitives/sizing';

export const semanticSizing = {
  control: controlHeights,
  icon: iconSizes,
  touchTarget: {
    min: 44,
  },
  avatar: {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 56,
    xl: 80,
  },
} as const;

export type SemanticSizing = typeof semanticSizing;
