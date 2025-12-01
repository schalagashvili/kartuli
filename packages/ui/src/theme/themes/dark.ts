import { durations, easings } from '../tokens/primitives/animation';
import { borderWidths } from '../tokens/primitives/borders';
import { palette } from '../tokens/primitives/colors';
import { opacity } from '../tokens/primitives/opacity';
import { radius } from '../tokens/primitives/radius';
import { controlHeights, iconSizes } from '../tokens/primitives/sizing';
import { spacing } from '../tokens/primitives/spacing';
import {
  fontSizes,
  fontWeights,
  letterSpacing,
  lineHeights,
} from '../tokens/primitives/typography';
import { zIndex } from '../tokens/primitives/zIndex';
import { createSemanticColors } from '../tokens/semantics/colors';
import { semanticRadius } from '../tokens/semantics/radius';
import { semanticShadows } from '../tokens/semantics/shadows';
import { semanticSizing } from '../tokens/semantics/sizing';
import { semanticSpacing } from '../tokens/semantics/spacing';
import { textStyles } from '../tokens/semantics/typography';
import { semanticZIndex } from '../tokens/semantics/zIndex';
import type { Theme } from '../types';

export const darkTheme: Theme = {
  mode: 'dark',
  primitives: {
    colors: palette,
    spacing,
    radius,
    borderWidths,
    opacity,
    zIndex,
    sizing: {
      controlHeights,
      iconSizes,
    },
    animation: {
      durations,
      easings,
    },
    typography: {
      fontSizes,
      lineHeights,
      fontWeights,
      letterSpacing,
    },
  },
  colors: createSemanticColors('dark'),
  spacing: semanticSpacing,
  radius: semanticRadius,
  shadows: semanticShadows,
  sizing: semanticSizing,
  typography: textStyles,
  zIndex: semanticZIndex,
};
