import { StyleSheet } from 'react-native-unistyles';

import { BUTTON_DIMENSIONS, BUTTON_RADIUS, getPillMinWidth } from './constants';

export const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    variants: {
      hierarchy: {
        primary: { backgroundColor: theme.colors.interactive.primary },
        secondary: { backgroundColor: theme.colors.background.secondary },
        tertiary: { backgroundColor: 'transparent' },
      },
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
      shape: {
        rect: { borderRadius: BUTTON_RADIUS.rect },
        pill: {},
        circle: {},
        square: { borderRadius: BUTTON_RADIUS.square },
      },
      widthMode: {
        fixed: { width: '100%' },
        intrinsic: { alignSelf: 'flex-start' },
      },
      disabled: {
        true: {},
        false: {},
      },
      pressed: {
        true: {},
        false: {},
      },
      active: {
        true: {},
        false: {},
      },
      tone: {
        default: {},
        negative: {},
      },
      loading: {
        true: {},
        false: {},
      },
    },
    compoundVariants: [
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
      {
        hierarchy: 'primary',
        tone: 'negative',
        styles: {
          backgroundColor: theme.colors.status.error,
        },
      },
      {
        hierarchy: 'secondary',
        tone: 'negative',
        styles: {
          backgroundColor: theme.colors.background.secondary,
        },
      },
      {
        hierarchy: 'secondary',
        active: true,
        styles: {
          backgroundColor: theme.colors.interactive.primary,
        },
      },
      {
        disabled: true,
        styles: {
          backgroundColor: theme.colors.interactive.secondary,
        },
      },
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
          alignSelf: 'center',
        },
      },
    },
  },

  pressedOverlay: {
    ...StyleSheet.absoluteFillObject,
    variants: {
      hierarchy: {
        primary: {
          backgroundColor: theme.colors.palette.blackAlpha20,
        },
        secondary: {
          backgroundColor: theme.colors.palette.blackAlpha10,
        },
        tertiary: {
          backgroundColor: theme.colors.palette.blackAlpha10,
        },
      },
    },
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.gap.sm,
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

  contentFixed: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },

  contentFixedCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: theme.spacing.gap.sm,
    paddingRight: theme.spacing.inset.sm,
  },

  trailingIconFixed: {
    flexShrink: 0,
  },

  label: {
    ...theme.typography.label.medium,
    fontWeight: theme.typography.label.medium.fontWeight,
    textAlign: 'center',
    flexShrink: 1,

    variants: {
      hierarchy: {
        primary: {
          color: theme.colors.text.inverse,
        },
        secondary: {
          color: theme.colors.text.primary,
        },
        tertiary: {
          color: theme.colors.text.primary,
        },
      },
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
      disabled: {
        true: {},
        false: {},
      },
      tone: {
        default: {},
        negative: {},
      },
      active: {
        true: {},
        false: {},
      },
    },

    compoundVariants: [
      {
        hierarchy: 'primary',
        tone: 'negative',
        styles: {
          color: theme.colors.text.inverse,
        },
      },
      {
        hierarchy: 'secondary',
        tone: 'negative',
        styles: {
          color: theme.colors.status.error,
        },
      },
      {
        hierarchy: 'tertiary',
        tone: 'negative',
        styles: {
          color: theme.colors.status.error,
        },
      },
      {
        hierarchy: 'secondary',
        active: true,
        styles: {
          color: theme.colors.text.inverse,
        },
      },
      {
        disabled: true,
        styles: {
          color: theme.colors.text.disabled,
        },
      },
    ],
  },

  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
