import { StyleSheet } from 'react-native-unistyles';

import {
  CHECKBOX_BORDER_WIDTH,
  CHECKBOX_DIMENSIONS,
  CHECKBOX_RADIUS,
} from '../Checkbox.types';

export const styles = StyleSheet.create((theme) => ({
  // ===========================================================================
  // ROOT CONTAINER
  // ===========================================================================
  root: {
    flexDirection: 'row',
    width: '100%',
    variants: {
      align: {
        center: { alignItems: 'center' },
        top: { alignItems: 'flex-start' },
      },
      size: {
        small: {
          minHeight: CHECKBOX_DIMENSIONS.small.rowMinHeight,
          gap: CHECKBOX_DIMENSIONS.small.gap,
        },
        medium: {
          minHeight: CHECKBOX_DIMENSIONS.medium.rowMinHeight,
          gap: CHECKBOX_DIMENSIONS.medium.gap,
        },
        large: {
          minHeight: CHECKBOX_DIMENSIONS.large.rowMinHeight,
          gap: CHECKBOX_DIMENSIONS.large.gap,
        },
      },
    },
  },

  // ===========================================================================
  // CHECKBOX SQUARE
  // Colors are injected inline from the main component
  // ===========================================================================
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: CHECKBOX_RADIUS,
    borderWidth: CHECKBOX_BORDER_WIDTH,
    backgroundColor: 'transparent',

    overflow: 'hidden', // CRITICAL: Clips the growing square to the rounded corners

    variants: {
      // ... existing size variants ...
      size: {
        small: {
          width: CHECKBOX_DIMENSIONS.small.boxSize,
          height: CHECKBOX_DIMENSIONS.small.boxSize,
          marginTop:
            (CHECKBOX_DIMENSIONS.small.rowMinHeight -
              CHECKBOX_DIMENSIONS.small.boxSize) /
            2,
        },
        medium: {
          width: CHECKBOX_DIMENSIONS.medium.boxSize,
          height: CHECKBOX_DIMENSIONS.medium.boxSize,
          marginTop:
            (CHECKBOX_DIMENSIONS.medium.rowMinHeight -
              CHECKBOX_DIMENSIONS.medium.boxSize) /
            2,
        },
        large: {
          width: CHECKBOX_DIMENSIONS.large.boxSize,
          height: CHECKBOX_DIMENSIONS.large.boxSize,
          marginTop:
            (CHECKBOX_DIMENSIONS.large.rowMinHeight -
              CHECKBOX_DIMENSIONS.large.boxSize) /
            2,
        },
      },
      align: {
        center: { marginTop: 0 },
        top: {},
      },
    },
  },

  fillLayer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: CHECKBOX_RADIUS - 1,
  },
  iconWrapper: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2, // Optional, but good safety
  },

  // ===========================================================================
  // PRESSED OVERLAY
  // ===========================================================================
  pressedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    variants: {
      visualState: {
        unchecked: { backgroundColor: theme.colors.overlayLight },
        preselected: { backgroundColor: theme.colors.overlayLight },
        checked: { backgroundColor: theme.colors.overlay },
        indeterminate: { backgroundColor: theme.colors.overlay },
      },
    },
  },

  // ===========================================================================
  // LABEL CONTAINER & TEXT
  // ===========================================================================
  labelContainer: {
    flex: 1,
    justifyContent: 'center',
    variants: {
      align: {
        center: {},
        top: {
          paddingVertical: 8,
        },
      },
    },
  },

  label: {
    fontFamily: theme.fonts.sans,
    fontWeight: theme.fontWeights.medium,
    color: theme.colors.contentPrimary,
    variants: {
      disabled: {
        true: { color: theme.colors.contentDisabled },
      },
      size: {
        small: {
          fontSize: CHECKBOX_DIMENSIONS.small.fontSize,
          lineHeight: CHECKBOX_DIMENSIONS.small.lineHeight,
        },
        medium: {
          fontSize: CHECKBOX_DIMENSIONS.medium.fontSize,
          lineHeight: CHECKBOX_DIMENSIONS.medium.lineHeight,
        },
        large: {
          fontSize: CHECKBOX_DIMENSIONS.large.fontSize,
          lineHeight: CHECKBOX_DIMENSIONS.large.lineHeight,
        },
      },
    },
  },

  description: {
    fontFamily: theme.fonts.sans,
    fontWeight: theme.fontWeights.normal,
    color: theme.colors.contentSecondary,
    marginTop: 2,
    variants: {
      disabled: {
        true: { color: theme.colors.contentDisabled },
      },
      size: {
        small: { fontSize: 12, lineHeight: 16 },
        medium: { fontSize: 14, lineHeight: 20 },
        large: { fontSize: 16, lineHeight: 24 },
      },
    },
  },

  errorText: {
    fontFamily: theme.fonts.sans,
    fontWeight: theme.fontWeights.normal,
    color: theme.colors.danger,
    marginTop: 2,
    variants: {
      size: {
        small: { fontSize: 12, lineHeight: 16 },
        medium: { fontSize: 14, lineHeight: 20 },
        large: { fontSize: 16, lineHeight: 24 },
      },
    },
  },
}));
