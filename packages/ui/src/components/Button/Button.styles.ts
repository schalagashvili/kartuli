import { StyleSheet } from 'react-native-unistyles';

import type { AppTheme } from '../../theme/themes/light';

export const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',

    variants: {
      kind: {
        primary: {
          backgroundColor: theme.colors.primary,
        },
        secondary: {
          backgroundColor: theme.colors.secondary,
          borderWidth: 1,
          borderColor: theme.colors.border,
        },
        tertiary: {
          backgroundColor: theme.colors.tertiary,
        },
        minimal: {
          backgroundColor: theme.colors.minimal,
        },
        danger: {
          backgroundColor: theme.colors.danger,
        },
      },

      size: {
        compact: {
          height: 36,
          paddingHorizontal: 12,
          borderRadius: 8,
        },
        default: {
          height: 48,
          paddingHorizontal: 16,
          borderRadius: 12,
        },
        large: {
          height: 56,
          paddingHorizontal: 24,
          borderRadius: 16,
        },
      },

      shape: {
        default: {
          // borderRadius handled by size
        },
        round: {
          borderRadius: theme.radius.full,
        },
      },

      fullWidth: {
        true: {
          width: '100%',
        },
        false: {
          alignSelf: 'flex-start',
        },
      },

      disabled: {
        true: {
          opacity: theme.opacity.disabled,
        },
        false: {},
      },

      pressed: {
        true: {
          opacity: theme.opacity.pressed,
          transform: [{ scale: 0.98 }],
        },
        false: {},
      },
    },

    compoundVariants: [
      // Disabled overrides pressed state
      {
        disabled: true,
        pressed: true,
        styles: {
          opacity: theme.opacity.disabled,
          transform: [{ scale: 1 }],
        },
      },
    ],
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    variants: {
      size: {
        compact: {
          gap: 4,
        },
        default: {
          gap: 8,
        },
        large: {
          gap: 12,
        },
      },

      isLoading: {
        true: {
          opacity: 0,
        },
        false: {
          opacity: 1,
        },
      },
    },
  },

  label: {
    fontFamily: theme.fonts.sans,
    fontWeight: theme.fontWeights.semibold,
    textAlign: 'center',

    variants: {
      kind: {
        primary: {
          color: theme.colors.primaryForeground,
        },
        secondary: {
          color: theme.colors.secondaryForeground,
        },
        tertiary: {
          color: theme.colors.tertiaryForeground,
        },
        minimal: {
          color: theme.colors.minimalForeground,
        },
        danger: {
          color: theme.colors.dangerForeground,
        },
      },

      size: {
        compact: {
          fontSize: 14,
        },
        default: {
          fontSize: 16,
        },
        large: {
          fontSize: 18,
        },
      },
    },
  },

  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export const ICON_SIZES = {
  compact: 16,
  default: 20,
  large: 24,
} as const;

type ButtonKindType =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'minimal'
  | 'danger';

export const getForegroundColor = (
  kind: ButtonKindType,
  theme: AppTheme
): string => {
  const colorMap: Record<ButtonKindType, string> = {
    primary: theme.colors.primaryForeground,
    secondary: theme.colors.secondaryForeground,
    tertiary: theme.colors.tertiaryForeground,
    minimal: theme.colors.minimalForeground,
    danger: theme.colors.dangerForeground,
  };

  return colorMap[kind];
};
