import type { Durations, Easings } from './tokens/primitives/animation';
import type { BorderWidths } from './tokens/primitives/borders';
import type { Palette } from './tokens/primitives/colors';
import type { Opacity } from './tokens/primitives/opacity';
import type { Radius } from './tokens/primitives/radius';
import type { ControlHeights, IconSizes } from './tokens/primitives/sizing';
import type { Spacing } from './tokens/primitives/spacing';
import type {
  FontSizes,
  FontWeights,
  LetterSpacing,
  LineHeights,
} from './tokens/primitives/typography';
import type { ZIndex } from './tokens/primitives/zIndex';
import type { SemanticColors } from './tokens/semantics/colors';
import type { SemanticRadius } from './tokens/semantics/radius';
import type { SemanticShadows } from './tokens/semantics/shadows';
import type { SemanticSizing } from './tokens/semantics/sizing';
import type { SemanticSpacing } from './tokens/semantics/spacing';
import type { TextStyles } from './tokens/semantics/typography';
import type { SemanticZIndex } from './tokens/semantics/zIndex';

export type ShadowStyle = {
  shadowColor?: string;
  shadowOffset?: { width: number; height: number };
  shadowOpacity?: number;
  shadowRadius?: number;
  elevation?: number;
};

export type Theme = {
  mode: 'light' | 'dark';

  primitives: {
    colors: Palette;
    spacing: Spacing;
    radius: Radius;
    borderWidths: BorderWidths;
    opacity: Opacity;
    zIndex: ZIndex;
    sizing: {
      controlHeights: ControlHeights;
      iconSizes: IconSizes;
    };
    animation: {
      durations: Durations;
      easings: Easings;
    };
    typography: {
      fontSizes: FontSizes;
      lineHeights: LineHeights;
      fontWeights: FontWeights;
      letterSpacing: LetterSpacing;
    };
  };

  colors: SemanticColors;
  spacing: SemanticSpacing;
  radius: SemanticRadius;
  typography: TextStyles;
  shadows: SemanticShadows;
  sizing: SemanticSizing;
  zIndex: SemanticZIndex;
};
