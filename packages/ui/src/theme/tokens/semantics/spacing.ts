import { spacing as primitive } from '../primitives/spacing';

export const semanticSpacing = {
  // Padding inside a container
  inset: {
    none: primitive.none, // 0
    xxs: primitive.xxs, // 2
    xs: primitive.xs, // 4
    sm: primitive.sm, // 8
    md: primitive.md, // 12
    lg: primitive.lg, // 16
    xl: primitive.xl, // 20
    '2xl': primitive['2xl'], // 24 (Parity with stack)
  },

  // Vertical spacing between elements (Shifted scale)
  stack: {
    none: primitive.none, // 0
    xxs: primitive.xs, // 4
    xs: primitive.sm, // 8
    sm: primitive.md, // 12
    md: primitive.lg, // 16
    lg: primitive['2xl'], // 24
    xl: primitive['3xl'], // 32
    '2xl': primitive['5xl'], // 48
  },

  // Horizontal spacing between elements (Shifted scale)
  inline: {
    none: primitive.none, // 0
    xxs: primitive.xs, // 4
    xs: primitive.sm, // 8
    sm: primitive.md, // 12
    md: primitive.lg, // 16
    lg: primitive.xl, // 20 (Completeness)
    xl: primitive['2xl'], // 24 (Completeness)
  },

  // Flex gaps (Unshifted scale for grouping)
  gap: {
    none: primitive.none, // 0
    xxs: primitive.xxs, // 2 (Consistency)
    xs: primitive.xs, // 4
    sm: primitive.sm, // 8
    md: primitive.md, // 12
    lg: primitive.lg, // 16
    xl: primitive['2xl'], // 24
  },

  // Screen boundaries
  screen: {
    horizontal: primitive.lg, // 16
    top: primitive.lg, // 16
    bottom: primitive['2xl'], // 24
  },

  // Pattern: Lists
  list: {
    itemGap: primitive.sm, // 8
    sectionGap: primitive['2xl'], // 24
    separatorInset: primitive.lg, // 16
  },
} as const;

export type SemanticSpacing = typeof semanticSpacing;
