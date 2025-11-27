import { borderWidths } from '../primitives/borders';
import { spacing as primitiveSpacing } from '../primitives/spacing';

export const semanticSpacing = {
  screen: {
    horizontal: primitiveSpacing.lg,
    top: primitiveSpacing.lg,
    bottom: primitiveSpacing['2xl'],
  },
  gap: {
    xs: primitiveSpacing.xs,
    sm: primitiveSpacing.sm,
    md: primitiveSpacing.md,
    lg: primitiveSpacing.lg,
    xl: primitiveSpacing['2xl'],
  },
  component: {
    xs: primitiveSpacing.sm,
    sm: primitiveSpacing.md,
    md: primitiveSpacing.lg,
    lg: primitiveSpacing.xl,
    xl: primitiveSpacing['2xl'],
  },
  stack: {
    xxs: primitiveSpacing.xs,
    xs: primitiveSpacing.sm,
    sm: primitiveSpacing.md,
    md: primitiveSpacing.lg,
    lg: primitiveSpacing['2xl'],
    xl: primitiveSpacing['3xl'],
    '2xl': primitiveSpacing['5xl'],
  },
  inline: {
    xxs: primitiveSpacing.xs,
    xs: primitiveSpacing.sm,
    sm: primitiveSpacing.md,
    md: primitiveSpacing.lg,
  },
  card: {
    padding: primitiveSpacing.lg,
    contentGap: primitiveSpacing.md,
    listGap: primitiveSpacing.md,
  },
  input: {
    paddingX: primitiveSpacing.md,
    paddingY: primitiveSpacing.md,
    labelGap: primitiveSpacing.sm,
    helperGap: primitiveSpacing.xs,
  },
  button: {
    iconGap: primitiveSpacing.sm,
    paddingXSm: primitiveSpacing.md,
    paddingXMd: primitiveSpacing.lg,
    paddingXLg: primitiveSpacing.xl,
  },
  list: {
    itemGap: primitiveSpacing.sm,
    sectionGap: primitiveSpacing['2xl'],
    separatorInset: primitiveSpacing.lg,
  },
  modal: {
    padding: primitiveSpacing['2xl'],
    sectionGap: primitiveSpacing.lg,
    headerMargin: primitiveSpacing.lg,
    footerMargin: primitiveSpacing['2xl'],
  },
  divider: {
    vertical: primitiveSpacing['3xl'],
    horizontal: primitiveSpacing.lg,
    inset: primitiveSpacing.md,
    thickness: borderWidths.thin,
  },
} as const;

export type SemanticSpacing = typeof semanticSpacing;
