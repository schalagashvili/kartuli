import { StyleSheet } from 'react-native-unistyles';

import { BUTTON_DIMENSIONS, BUTTON_RADIUS, getPillMinWidth } from './constants';

export const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: theme.flex.direction.row,
    alignItems: theme.flex.alignItems.center,
    justifyContent: theme.flex.justify.center,
    overflow: 'hidden',
    variants: {
      hierarchy: {
        primary: { backgroundColor: theme.colors.primary },
        secondary: { backgroundColor: theme.colors.backgroundSecondary },
        tertiary: { backgroundColor: theme.colors.transparent },
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
        fixed: { width: theme.size.full },
        intrinsic: { alignSelf: theme.flex.alignSelf.start },
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
          paddingHorizontal: theme.spacing.none,
        },
      },
      {
        shape: 'circle',
        size: 'medium',
        styles: {
          width: BUTTON_DIMENSIONS.medium.height,
          height: BUTTON_DIMENSIONS.medium.height,
          borderRadius: BUTTON_DIMENSIONS.medium.height / 2,
          paddingHorizontal: theme.spacing.none,
        },
      },
      {
        shape: 'circle',
        size: 'large',
        styles: {
          width: BUTTON_DIMENSIONS.large.height,
          height: BUTTON_DIMENSIONS.large.height,
          borderRadius: BUTTON_DIMENSIONS.large.height / 2,
          paddingHorizontal: theme.spacing.none,
        },
      },
      {
        shape: 'square',
        size: 'small',
        styles: {
          width: BUTTON_DIMENSIONS.small.height,
          height: BUTTON_DIMENSIONS.small.height,
          paddingHorizontal: theme.spacing.none,
        },
      },
      {
        shape: 'square',
        size: 'medium',
        styles: {
          width: BUTTON_DIMENSIONS.medium.height,
          height: BUTTON_DIMENSIONS.medium.height,
          paddingHorizontal: theme.spacing.none,
        },
      },
      {
        shape: 'square',
        size: 'large',
        styles: {
          width: BUTTON_DIMENSIONS.large.height,
          height: BUTTON_DIMENSIONS.large.height,
          paddingHorizontal: theme.spacing.none,
        },
      },
      {
        hierarchy: 'primary',
        tone: 'negative',
        styles: {
          backgroundColor: theme.colors.danger,
        },
      },
      {
        hierarchy: 'secondary',
        tone: 'negative',
        styles: {
          backgroundColor: theme.colors.backgroundSecondary,
        },
      },
      {
        hierarchy: 'secondary',
        active: true,
        styles: {
          backgroundColor: theme.colors.primary,
        },
      },
      {
        disabled: true,
        styles: {
          backgroundColor: theme.colors.disabled,
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
          width: theme.size.full,
          alignSelf: theme.flex.alignSelf.stretch,
        },
        intrinsic: {
          alignSelf: theme.flex.alignSelf.center,
        },
      },
    },
  },

  pressedOverlay: {
    ...StyleSheet.absoluteFillObject,
    variants: {
      hierarchy: {
        primary: {
          backgroundColor: `rgba(255, 255, 255, ${theme.opacity.muted})`,
        },
        secondary: {
          backgroundColor: `rgba(0, 0, 0, ${theme.opacity.light})`,
        },
        tertiary: {
          backgroundColor: `rgba(0, 0, 0, ${theme.opacity.light})`,
        },
      },
    },
  },

  content: {
    flexDirection: theme.flex.direction.row,
    alignItems: theme.flex.alignItems.center,
    justifyContent: theme.flex.justify.center,
    gap: theme.spacing.sm,
    variants: {
      loading: {
        true: {
          opacity: theme.opacity.transparent,
        },
        false: {
          opacity: theme.opacity.opaque,
        },
      },
    },
  },
  contentHidden: {
    opacity: theme.opacity.transparent,
  },

  contentFixed: {
    flexDirection: theme.flex.direction.row,
    alignItems: theme.flex.alignItems.center,
    justifyContent: theme.flex.justify.between,
    width: theme.size.full,
  },

  contentFixedCenter: {
    flexDirection: theme.flex.direction.row,
    alignItems: theme.flex.alignItems.center,
    justifyContent: theme.flex.justify.center,
    flex: theme.flex.flex.fill,
    gap: theme.spacing.sm,
    paddingRight: theme.spacing.sm,
  },

  trailingIconFixed: {
    flexShrink: theme.flex.shrink.none,
  },

  label: {
    fontFamily: theme.fontFamilies.sans,
    fontWeight: theme.fontWeights.semibold,
    textAlign: 'center',
    flexShrink: theme.flex.shrink.initial,

    variants: {
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
          color: theme.colors.contentInversePrimary,
        },
      },
      {
        hierarchy: 'secondary',
        tone: 'negative',
        styles: {
          color: theme.colors.danger,
        },
      },
      {
        hierarchy: 'tertiary',
        tone: 'negative',
        styles: {
          color: theme.colors.danger,
        },
      },
      {
        hierarchy: 'secondary',
        active: true,
        styles: {
          color: theme.colors.contentInversePrimary,
        },
      },
      {
        disabled: true,
        styles: {
          color: theme.colors.contentDisabled,
        },
      },
    ],
  },

  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: theme.flex.alignItems.center,
    justifyContent: theme.flex.justify.center,
  },
}));
