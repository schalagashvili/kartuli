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
    width: '100%',
  },

  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: LABEL_INPUT_GAP,
    gap: LABEL_ROW_GAP,
  },

  label: {
    fontWeight: theme.primitives.typography.fontWeights.medium,
    color: theme.colors.text.primary,
    flexShrink: 1,
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
    fontWeight: theme.primitives.typography.fontWeights.regular,
    color: theme.colors.text.tertiary,
    flexShrink: 0,
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
          color: theme.colors.status.error,
        },
      },
    },
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: theme.primitives.radius.lg,
    borderWidth: TEXTFIELD_DIMENSIONS.medium.borderWidth,
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
    flex: 1,
    alignSelf: 'center',

    color: theme.colors.text.primary,

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
    justifyContent: 'center',
    alignItems: 'center',
  },

  enhancerLabel: {
    fontWeight: theme.primitives.typography.fontWeights.regular,
    fontSize: theme.primitives.typography.fontSizes.md,
  },

  artworkLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  trailingActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  hintRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: INPUT_HINT_GAP,
    gap: HINT_ICON_GAP,
    minHeight: 20,
  },

  hint: {
    fontWeight: theme.primitives.typography.fontWeights.regular,
    fontSize: theme.primitives.typography.fontSizes.sm,
    lineHeight: 16,
    color: theme.colors.text.tertiary,
    flex: 1,
    variants: {
      hintState: {
        default: {
          color: theme.colors.text.tertiary,
        },
        error: {
          color: theme.colors.status.error,
        },
        success: {
          color: theme.colors.status.success,
        },
      },
    },
  },

  hidden: {
    opacity: theme.primitives.opacity.transparent,
  },
}));
