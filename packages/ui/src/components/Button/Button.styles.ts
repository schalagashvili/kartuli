import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import {
  BUTTON_DIMENSIONS,
  BUTTON_RADIUS,
  type ButtonHierarchy,
  type ButtonSize,
  type ButtonTone,
  getPillMinWidth,
} from './Button.types';

// =============================================================================
// UBER BASE DESIGN SYSTEM - BUTTON STYLES
// =============================================================================
// Reference: Uber Base Button Specs (Pages 13-15, 34-35)
//
// Key principles:
// - Overlay logic for states (not opacity)
// - 8px corner radius for ALL rect buttons
// - 48px minimum touch target
// - Pill min-width = height + 24
//
// COMPOUND VARIANT ORDER MATTERS:
// 1. Shape variants (pill, circle, square per size)
// 2. Tone variants (negative overrides base colors)
// 3. Active variants (toggle state)
// 4. Disabled variants (LAST - overrides everything)
// =============================================================================

// Helper for absolute fill (defined before usage)
const absoluteFill = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
} as const;

export const styles = StyleSheet.create((theme) => ({
  // ===========================================================================
  // CONTAINER
  // ===========================================================================
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',

    variants: {
      // -----------------------------------------------------------------------
      // HIERARCHY (Primary/Secondary/Tertiary)
      // Base background colors per hierarchy level
      // -----------------------------------------------------------------------
      hierarchy: {
        primary: {
          backgroundColor: theme.colors.backgroundInversePrimary,
        },
        secondary: {
          backgroundColor: theme.colors.backgroundSecondary,
        },
        tertiary: {
          backgroundColor: 'transparent',
        },
      },

      // -----------------------------------------------------------------------
      // SIZE (Small/Medium/Large)
      // -----------------------------------------------------------------------
      size: {
        small: {
          height: BUTTON_DIMENSIONS.small.height,
          paddingHorizontal: BUTTON_DIMENSIONS.small.paddingHorizontal,
        },
        medium: {
          height: BUTTON_DIMENSIONS.medium.height,
          paddingHorizontal: BUTTON_DIMENSIONS.medium.paddingHorizontal,
        },
        large: {
          height: BUTTON_DIMENSIONS.large.height,
          paddingHorizontal: BUTTON_DIMENSIONS.large.paddingHorizontal,
        },
      },

      // -----------------------------------------------------------------------
      // SHAPE (Rect/Pill/Circle/Square)
      // -----------------------------------------------------------------------
      shape: {
        rect: {
          borderRadius: BUTTON_RADIUS.rect,
        },
        pill: {
          // Pill radius is dynamic (height / 2), set via compoundVariants
        },
        circle: {
          // Circle is height x height, radius = height / 2
          // Set dynamically via compoundVariants
        },
        square: {
          borderRadius: BUTTON_RADIUS.square,
          // Square is height x height
          // Set dynamically via compoundVariants
        },
      },

      // -----------------------------------------------------------------------
      // WIDTH MODE (Fixed/Intrinsic)
      // -----------------------------------------------------------------------
      widthMode: {
        fixed: {
          width: '100%',
        },
        intrinsic: {
          alignSelf: 'flex-start',
        },
      },

      // -----------------------------------------------------------------------
      // DISABLED STATE
      // Per Uber spec: Use specific disabled tokens, not just opacity
      // NOTE: This variant is for ACTUAL disabled prop, not loading state
      // -----------------------------------------------------------------------
      disabled: {
        true: {},
        false: {},
      },

      // -----------------------------------------------------------------------
      // PRESSED STATE
      // Handled via overlay, not background change
      // -----------------------------------------------------------------------
      pressed: {
        true: {},
        false: {},
      },

      // -----------------------------------------------------------------------
      // ACTIVE STATE (Toggle - Secondary only)
      // -----------------------------------------------------------------------
      active: {
        true: {},
        false: {},
      },

      // -----------------------------------------------------------------------
      // TONE (Default/Negative)
      // -----------------------------------------------------------------------
      tone: {
        default: {},
        negative: {},
      },

      // -----------------------------------------------------------------------
      // LOADING STATE
      // Per Uber spec (Page 13): Loading maintains visual styling
      // -----------------------------------------------------------------------
      loading: {
        true: {},
        false: {},
      },
    },

    // -------------------------------------------------------------------------
    // COMPOUND VARIANTS
    // ORDER MATTERS: Later variants override earlier ones
    // -------------------------------------------------------------------------
    compoundVariants: [
      // =======================================================================
      // 1. PILL SHAPE - Dynamic radius and min-width per size
      // =======================================================================
      {
        shape: 'pill',
        size: 'small',
        styles: {
          borderRadius: BUTTON_DIMENSIONS.small.height / 2,
          minWidth: getPillMinWidth(BUTTON_DIMENSIONS.small.height),
        },
      },
      {
        shape: 'pill',
        size: 'medium',
        styles: {
          borderRadius: BUTTON_DIMENSIONS.medium.height / 2,
          minWidth: getPillMinWidth(BUTTON_DIMENSIONS.medium.height),
        },
      },
      {
        shape: 'pill',
        size: 'large',
        styles: {
          borderRadius: BUTTON_DIMENSIONS.large.height / 2,
          minWidth: getPillMinWidth(BUTTON_DIMENSIONS.large.height),
        },
      },

      // =======================================================================
      // 2. CIRCLE SHAPE - Height x Height with full radius
      // =======================================================================
      {
        shape: 'circle',
        size: 'small',
        styles: {
          width: BUTTON_DIMENSIONS.small.height,
          height: BUTTON_DIMENSIONS.small.height,
          borderRadius: BUTTON_DIMENSIONS.small.height / 2,
          paddingHorizontal: 0,
        },
      },
      {
        shape: 'circle',
        size: 'medium',
        styles: {
          width: BUTTON_DIMENSIONS.medium.height,
          height: BUTTON_DIMENSIONS.medium.height,
          borderRadius: BUTTON_DIMENSIONS.medium.height / 2,
          paddingHorizontal: 0,
        },
      },
      {
        shape: 'circle',
        size: 'large',
        styles: {
          width: BUTTON_DIMENSIONS.large.height,
          height: BUTTON_DIMENSIONS.large.height,
          borderRadius: BUTTON_DIMENSIONS.large.height / 2,
          paddingHorizontal: 0,
        },
      },

      // =======================================================================
      // 3. SQUARE SHAPE - Height x Height
      // =======================================================================
      {
        shape: 'square',
        size: 'small',
        styles: {
          width: BUTTON_DIMENSIONS.small.height,
          height: BUTTON_DIMENSIONS.small.height,
          paddingHorizontal: 0,
        },
      },
      {
        shape: 'square',
        size: 'medium',
        styles: {
          width: BUTTON_DIMENSIONS.medium.height,
          height: BUTTON_DIMENSIONS.medium.height,
          paddingHorizontal: 0,
        },
      },
      {
        shape: 'square',
        size: 'large',
        styles: {
          width: BUTTON_DIMENSIONS.large.height,
          height: BUTTON_DIMENSIONS.large.height,
          paddingHorizontal: 0,
        },
      },

      // =======================================================================
      // 4. NEGATIVE TONE - Override background colors
      // Per Uber spec (Page 7-8):
      // - Primary + Negative = RED background (backgroundNegative)
      // - Secondary + Negative = Keep gray bg, red TEXT (handled in label)
      // =======================================================================
      {
        hierarchy: 'primary',
        tone: 'negative',
        styles: {
          backgroundColor: theme.colors.backgroundNegative,
        },
      },
      {
        hierarchy: 'secondary',
        tone: 'negative',
        styles: {
          backgroundColor: theme.colors.backgroundSecondary,
        },
      },

      // =======================================================================
      // 5. ACTIVE STATE (Secondary toggle)
      // Inverts colors when active/selected
      // =======================================================================
      {
        hierarchy: 'secondary',
        active: true,
        styles: {
          backgroundColor: theme.colors.backgroundInversePrimary,
        },
      },

      // =======================================================================
      // 6. DISABLED STATE - MUST BE LAST
      // Disabled takes precedence over ALL other visual states
      // Only applies when disabled=true (not when loading=true)
      // =======================================================================
      {
        disabled: true,
        styles: {
          backgroundColor: theme.colors.backgroundStateDisabled,
        },
      },

      // Tertiary disabled - keep transparent but with disabled content color
      {
        hierarchy: 'tertiary',
        disabled: true,
        styles: {
          backgroundColor: 'transparent',
        },
      },
    ],
  },

  pressable: {
    variants: {
      widthMode: {
        fixed: {
          width: '100%',
          alignSelf: 'stretch',
        },
        intrinsic: {
          // ✅ FIX: Explicitly center the button itself
          // 'auto' can sometimes inherit 'stretch' unexpectedly.
          // 'center' ensures it sits in the middle of your Root View.
          alignSelf: 'center',
        },
      },
    },
  },

  // ===========================================================================
  // PRESSED OVERLAY
  // Uber uses color overlays instead of opacity for pressed states
  // Primary: +20% white overlay
  // Secondary/Tertiary: +8% black overlay
  // ===========================================================================
  pressedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    variants: {
      hierarchy: {
        primary: {
          backgroundColor: 'rgba(255, 255, 255, 0.20)',
        },
        secondary: {
          backgroundColor: 'rgba(0, 0, 0, 0.08)',
        },
        tertiary: {
          backgroundColor: 'rgba(0, 0, 0, 0.08)',
        },
      },
    },
  },

  // ===========================================================================
  // CONTENT WRAPPER
  // Contains icons and label
  // ===========================================================================
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8, // Uber spec: 8px gap consistently
    variants: {
      loading: {
        true: {
          opacity: 0,
        },
        false: {
          opacity: 1,
        },
      },
    },
  },
  contentHidden: {
    opacity: 0,
  },

  // ===========================================================================
  // FIXED WIDTH LAYOUT
  // For fixed width: leading icon + label center, trailing pins right
  // ===========================================================================
  contentFixed: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Pushes center left, trailing right
    width: '100%',
  },

  contentFixedCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1, // Takes available space, can shrink
    gap: 8, // Keep your existing gap
    paddingRight: 8, // Spacing from trailing icon
  },

  trailingIconFixed: {
    flexShrink: 0, // Never shrink - icon stays full size
    // Remove position: 'absolute' and right: 0
  },

  // ===========================================================================
  // LABEL
  // ===========================================================================
  label: {
    fontFamily: theme.fonts.sans,
    fontWeight: theme.fontWeights.semibold,
    textAlign: 'center',
    flexShrink: 1,

    variants: {
      // -----------------------------------------------------------------------
      // HIERARCHY COLORS
      // Base text colors per hierarchy
      // -----------------------------------------------------------------------
      hierarchy: {
        primary: {
          color: theme.colors.contentInversePrimary,
        },
        secondary: {
          color: theme.colors.contentPrimary,
        },
        tertiary: {
          color: theme.colors.contentPrimary,
        },
      },

      // -----------------------------------------------------------------------
      // SIZE TYPOGRAPHY
      // -----------------------------------------------------------------------
      size: {
        small: {
          fontSize: BUTTON_DIMENSIONS.small.fontSize,
          lineHeight: BUTTON_DIMENSIONS.small.lineHeight,
        },
        medium: {
          fontSize: BUTTON_DIMENSIONS.medium.fontSize,
          lineHeight: BUTTON_DIMENSIONS.medium.lineHeight,
        },
        large: {
          fontSize: BUTTON_DIMENSIONS.large.fontSize,
          lineHeight: BUTTON_DIMENSIONS.large.lineHeight,
        },
      },

      // -----------------------------------------------------------------------
      // DISABLED STATE
      // -----------------------------------------------------------------------
      disabled: {
        true: {},
        false: {},
      },

      // -----------------------------------------------------------------------
      // TONE
      // -----------------------------------------------------------------------
      tone: {
        default: {},
        negative: {},
      },

      // -----------------------------------------------------------------------
      // ACTIVE STATE
      // -----------------------------------------------------------------------
      active: {
        true: {},
        false: {},
      },
    },

    // -------------------------------------------------------------------------
    // LABEL COMPOUND VARIANTS
    // ORDER MATTERS: Later variants override earlier ones
    // -------------------------------------------------------------------------
    compoundVariants: [
      // =======================================================================
      // 1. NEGATIVE TONE TEXT COLORS
      // Per Uber spec (Page 7-8):
      // - Primary + Negative = WHITE text (on red background)
      // - Secondary + Negative = RED text
      // - Tertiary + Negative = RED text
      // =======================================================================
      {
        hierarchy: 'primary',
        tone: 'negative',
        styles: {
          color: theme.colors.contentInversePrimary, // White on red bg
        },
      },
      {
        hierarchy: 'secondary',
        tone: 'negative',
        styles: {
          color: theme.colors.backgroundNegative, // Red text
        },
      },
      {
        hierarchy: 'tertiary',
        tone: 'negative',
        styles: {
          color: theme.colors.backgroundNegative, // Red text
        },
      },

      // =======================================================================
      // 2. ACTIVE STATE (Secondary toggle)
      // Active secondary = inverted text (white on black)
      // =======================================================================
      {
        hierarchy: 'secondary',
        active: true,
        styles: {
          color: theme.colors.contentInversePrimary,
        },
      },

      // =======================================================================
      // 3. DISABLED STATE - MUST BE LAST
      // Disabled takes precedence over ALL other text states
      // =======================================================================
      {
        disabled: true,
        styles: {
          color: theme.colors.contentStateDisabled,
        },
      },
    ],
  },

  // ===========================================================================
  // LOADING OVERLAY
  // Centered spinner that appears on top of hidden content
  // ===========================================================================
  loadingOverlay: {
    ...absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

// =============================================================================
// ICON SIZE MAP
// =============================================================================
export const ICON_SIZES: Record<ButtonSize, number> = {
  small: BUTTON_DIMENSIONS.small.iconSize,
  medium: BUTTON_DIMENSIONS.medium.iconSize,
  large: BUTTON_DIMENSIONS.large.iconSize,
};

// =============================================================================
// SPINNER SIZE MAP (matches icon size per Uber spec)
// =============================================================================
export const SPINNER_SIZES: Record<ButtonSize, number> = {
  small: 16,
  medium: 20,
  large: 24,
};

// =============================================================================
// HIT SLOP (for 48px minimum touch target)
// =============================================================================
export const getHitSlop = (
  size: ButtonSize
): { top: number; bottom: number; left: number; right: number } => {
  const slop = BUTTON_DIMENSIONS[size].hitSlop;
  return {
    top: slop,
    bottom: slop,
    left: 0,
    right: 0,
  };
};

// =============================================================================
// FOREGROUND COLOR GETTER
// For ActivityIndicator and icon colors
//
// This function determines the correct foreground (text/icon) color based on
// the button's current state. The logic follows Uber spec exactly:
//
// Priority order (highest to lowest):
// 1. Disabled → contentStateDisabled
// 2. Secondary + Active → contentInversePrimary (white)
// 3. Negative tone (secondary/tertiary) → contentNegative (red)
// 4. Default hierarchy colors
// =============================================================================
export const getForegroundColor = (
  hierarchy: ButtonHierarchy,
  active: boolean,
  disabled: boolean,
  theme: ReturnType<typeof useUnistyles>['theme'],
  tone?: ButtonTone
): string => {
  // Disabled takes highest priority
  if (disabled) {
    return theme.colors.contentStateDisabled;
  }

  // Secondary + active = inverted (white on black)
  if (hierarchy === 'secondary' && active) {
    return theme.colors.contentInversePrimary;
  }

  // Negative tone for secondary/tertiary = red text
  // Note: Primary + negative keeps white text (on red background)
  if (tone === 'negative' && hierarchy !== 'primary') {
    return theme.colors.backgroundNegative;
  }

  // Default hierarchy colors
  const colorMap: Record<ButtonHierarchy, string> = {
    primary: theme.colors.contentInversePrimary, // White
    secondary: theme.colors.contentPrimary, // Black
    tertiary: theme.colors.contentPrimary, // Black
  };

  return colorMap[hierarchy];
};
