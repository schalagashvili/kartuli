import { StyleSheet } from 'react-native-unistyles';

import {
  HINT_ICON_GAP,
  INPUT_HINT_GAP,
  LABEL_INPUT_GAP,
  LABEL_ROW_GAP,
  TEXTFIELD_DIMENSIONS,
} from './constants';

export const styles = StyleSheet.create((theme) => ({
  root: {
    width: theme.size.full,
  },

  labelRow: {
    flexDirection: theme.flex.direction.row,
    justifyContent: theme.flex.justify.between,
    alignItems: theme.flex.alignItems.center,
    marginBottom: LABEL_INPUT_GAP,
    gap: LABEL_ROW_GAP,
  },

  label: {
    fontFamily: theme.fontFamilies.sans,
    fontWeight: theme.fontWeights.medium,
    color: theme.colors.contentPrimary,
    flexShrink: theme.flex.shrink.initial,

    variants: {
      size: {
        small: {
          fontSize: TEXTFIELD_DIMENSIONS.small.labelFontSize,
          lineHeight: TEXTFIELD_DIMENSIONS.small.labelLineHeight,
        },
        medium: {
          fontSize: TEXTFIELD_DIMENSIONS.medium.labelFontSize,
          lineHeight: TEXTFIELD_DIMENSIONS.medium.labelLineHeight,
        },
        large: {
          fontSize: TEXTFIELD_DIMENSIONS.large.labelFontSize,
          lineHeight: TEXTFIELD_DIMENSIONS.large.labelLineHeight,
        },
      },
    },
  },

  characterCount: {
    fontFamily: theme.fontFamilies.sans,
    fontWeight: theme.fontWeights.medium,
    color: theme.colors.contentTertiary,
    flexShrink: theme.flex.shrink.none,

    variants: {
      size: {
        small: {
          fontSize: TEXTFIELD_DIMENSIONS.small.labelFontSize,
          lineHeight: TEXTFIELD_DIMENSIONS.small.labelLineHeight,
        },
        medium: {
          fontSize: TEXTFIELD_DIMENSIONS.medium.labelFontSize,
          lineHeight: TEXTFIELD_DIMENSIONS.medium.labelLineHeight,
        },
        large: {
          fontSize: TEXTFIELD_DIMENSIONS.large.labelFontSize,
          lineHeight: TEXTFIELD_DIMENSIONS.large.labelLineHeight,
        },
      },
      overLimit: {
        true: {
          color: theme.colors.danger,
        },
      },
    },
  },

  inputContainer: {
    flexDirection: theme.flex.direction.row,
    alignItems: theme.flex.alignItems.center,
    borderRadius: theme.radius.lg,
    borderWidth: theme.borderWidths.medium,
    overflow: 'hidden',

    variants: {
      size: {
        small: {
          minHeight: TEXTFIELD_DIMENSIONS.small.height,
          paddingVertical: TEXTFIELD_DIMENSIONS.small.paddingVertical,
          paddingHorizontal: TEXTFIELD_DIMENSIONS.small.paddingHorizontal,
          gap: TEXTFIELD_DIMENSIONS.small.contentGap,
        },
        medium: {
          minHeight: TEXTFIELD_DIMENSIONS.medium.height,
          paddingVertical: TEXTFIELD_DIMENSIONS.medium.paddingVertical,
          paddingHorizontal: TEXTFIELD_DIMENSIONS.medium.paddingHorizontal,
          gap: TEXTFIELD_DIMENSIONS.medium.contentGap,
        },
        large: {
          minHeight: TEXTFIELD_DIMENSIONS.large.height,
          paddingVertical: TEXTFIELD_DIMENSIONS.large.paddingVertical,
          paddingHorizontal: TEXTFIELD_DIMENSIONS.large.paddingHorizontal,
          gap: TEXTFIELD_DIMENSIONS.large.contentGap,
        },
      },
    },
  },

  input: {
    flex: theme.flex.flex.fill,
    alignSelf: theme.flex.alignSelf.center,
    fontFamily: theme.fontFamilies.sans,
    fontWeight: theme.fontWeights.medium,
    color: theme.colors.contentPrimary,

    variants: {
      size: {
        small: {
          fontSize: TEXTFIELD_DIMENSIONS.small.fontSize,
        },
        medium: {
          fontSize: TEXTFIELD_DIMENSIONS.medium.fontSize,
        },
        large: {
          fontSize: TEXTFIELD_DIMENSIONS.large.fontSize,
        },
      },
    },
  },

  enhancer: {
    justifyContent: theme.flex.justify.center,
    alignItems: theme.flex.alignItems.center,
  },

  enhancerLabel: {
    fontFamily: theme.fontFamilies.sans,
    fontWeight: theme.fontWeights.medium,
    fontSize: theme.fontSizes.sm,
  },

  artworkLabelRow: {
    flexDirection: theme.flex.direction.row,
    alignItems: theme.flex.alignItems.center,
    gap: theme.spacing.sm,
  },

  trailingActions: {
    flexDirection: theme.flex.direction.row,
    alignItems: theme.flex.alignItems.center,
    gap: theme.spacing.sm,
  },

  hintRow: {
    flexDirection: theme.flex.direction.row,
    alignItems: theme.flex.alignItems.start,
    marginTop: INPUT_HINT_GAP,
    gap: HINT_ICON_GAP,
    minHeight: theme.lineHeights.sm,
  },

  hint: {
    fontFamily: theme.fontFamilies.sans,
    fontWeight: theme.fontWeights.medium,
    fontSize: theme.fontSizes.xs,
    lineHeight: theme.lineHeights.xs,
    color: theme.colors.contentTertiary,
    flex: theme.flex.flex.fill,

    variants: {
      hintState: {
        default: {
          color: theme.colors.contentTertiary,
        },
        error: {
          color: theme.colors.danger,
        },
        success: {
          color: theme.colors.success,
        },
      },
    },
  },
  hidden: { opacity: theme.opacity.transparent },
}));
