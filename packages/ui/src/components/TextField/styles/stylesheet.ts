// packages/ui/src/components/TextField/styles/stylesheet.ts
import { StyleSheet } from 'react-native-unistyles';

import {
  HINT_ICON_GAP,
  INPUT_HINT_GAP,
  LABEL_INPUT_GAP,
  LABEL_ROW_GAP,
  TEXTFIELD_DIMENSIONS,
} from './constants';

export const styles = StyleSheet.create((theme) => ({
  // ===========================================================================
  // ROOT
  // ===========================================================================
  root: {
    width: '100%',
  },

  // ===========================================================================
  // LABEL ROW
  // ===========================================================================
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: LABEL_INPUT_GAP,
    gap: LABEL_ROW_GAP,
  },

  label: {
    fontFamily: theme.fonts.sans,
    fontWeight: theme.fontWeights.medium,
    color: theme.colors.contentPrimary,
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
    fontFamily: theme.fonts.sans,
    fontWeight: theme.fontWeights.normal,
    color: theme.colors.contentTertiary,
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
          color: theme.colors.danger,
        },
      },
    },
  },

  // ===========================================================================
  // INPUT CONTAINER
  // CRITICAL: borderWidth is ALWAYS 2px to prevent layout shifts
  // Border color is animated via useAnimatedStyle (transparent → colored)
  // ===========================================================================
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12, // ← FIXED: Was 8, now matches Uber
    borderWidth: 2, // ← FIXED: Was 3, now matches Uber
    // borderColor: animated via containerAnimatedStyle
    // backgroundColor: animated via containerAnimatedStyle
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

  // ===========================================================================
  // TEXT INPUT
  // ===========================================================================
  input: {
    flex: 1,
    alignSelf: 'center', // Vertical centering (iOS)
    fontFamily: theme.fonts.sans,
    fontWeight: theme.fontWeights.normal,
    color: theme.colors.contentPrimary,
    // padding: 0, // Reset default padding (Android fix)
    // margin: 0,
    // textAlignVertical: 'center', // Vertical centering (Android)
    // includeFontPadding: false, // Remove extra font padding (Android)

    variants: {
      size: {
        small: {
          fontSize: TEXTFIELD_DIMENSIONS.small.fontSize,
          //   lineHeight: TEXTFIELD_DIMENSIONS.small.lineHeight,
        },
        medium: {
          fontSize: TEXTFIELD_DIMENSIONS.medium.fontSize,
          //   lineHeight: TEXTFIELD_DIMENSIONS.medium.lineHeight,
        },
        large: {
          fontSize: TEXTFIELD_DIMENSIONS.large.fontSize,
          //   lineHeight: TEXTFIELD_DIMENSIONS.large.lineHeight,
        },
      },
    },
  },

  // ===========================================================================
  // ENHANCERS
  // ===========================================================================
  enhancer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  enhancerLabel: {
    fontFamily: theme.fonts.sans,
    fontWeight: theme.fontWeights.normal,
    fontSize: 14,
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

  // ===========================================================================
  // HINT ROW
  // CRITICAL: minHeight reserves space to prevent layout shifts
  // ===========================================================================
  hintRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: INPUT_HINT_GAP,
    gap: HINT_ICON_GAP,
    minHeight: 20, // ← RESERVE SPACE - prevents jump when error appears
  },

  hint: {
    fontFamily: theme.fonts.sans,
    fontWeight: theme.fontWeights.normal,
    fontSize: 12,
    lineHeight: 16,
    color: theme.colors.contentTertiary,
    flex: 1,

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
}));
