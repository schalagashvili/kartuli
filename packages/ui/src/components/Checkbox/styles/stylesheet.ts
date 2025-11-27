import { StyleSheet } from 'react-native-unistyles';

import { getTopOffset } from '../../../components/Checkbox/styles/utils';
import { spacing } from '../../../theme';
import {
  CHECKBOX_BORDER_WIDTH,
  CHECKBOX_DIMENSIONS,
  CHECKBOX_RADIUS,
} from '../Checkbox.types';

export const styles = StyleSheet.create((theme) => {
  return {
    root: {
      flexDirection: theme.flex.direction.row,
      width: theme.size.full,
      variants: {
        align: {
          center: { alignItems: theme.flex.alignItems.center },
          top: { alignItems: theme.flex.alignItems.start },
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

    box: {
      alignItems: theme.flex.alignItems.center,
      justifyContent: theme.flex.justify.center,
      borderRadius: CHECKBOX_RADIUS,
      borderWidth: CHECKBOX_BORDER_WIDTH,
      // 2. Critical: This replaces the "borderRadius - 1" math
      backgroundColor: 'transparent',
      overflow: 'hidden',

      variants: {
        size: {
          small: {
            width: CHECKBOX_DIMENSIONS.small.boxSize,
            height: CHECKBOX_DIMENSIONS.small.boxSize,
          },
          medium: {
            width: CHECKBOX_DIMENSIONS.medium.boxSize,
            height: CHECKBOX_DIMENSIONS.medium.boxSize,
          },
          large: {
            width: CHECKBOX_DIMENSIONS.large.boxSize,
            height: CHECKBOX_DIMENSIONS.large.boxSize,
          },
        },
        align: {
          center: { marginTop: spacing.none },
          top: {},
        },
      },
      compoundVariants: [
        {
          align: 'top',
          size: 'small',
          styles: { marginTop: getTopOffset('small') },
        },
        {
          align: 'top',
          size: 'medium',
          styles: { marginTop: getTopOffset('medium') },
        },
        {
          align: 'top',
          size: 'large',
          styles: { marginTop: getTopOffset('large') },
        },
      ],
    },

    fillLayer: {
      ...StyleSheet.absoluteFillObject,
    },

    iconWrapper: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: theme.flex.justify.center,
      alignItems: theme.flex.alignItems.center,
      zIndex: theme.zIndex.base,
    },

    pressedOverlay: {
      ...StyleSheet.absoluteFillObject,
      variants: {
        visualState: {
          unchecked: { backgroundColor: theme.colors.overlayLight },
          preselected: { backgroundColor: theme.colors.overlayLight },
          checked: { backgroundColor: theme.colors.overlayMuted },
          indeterminate: { backgroundColor: theme.colors.overlayMuted },
        },
      },
    },

    labelContainer: {
      flex: theme.flex.flex.fill,
      justifyContent: theme.flex.justify.center,
      variants: {
        align: {
          center: {},
          top: { paddingVertical: theme.spacing.sm },
        },
      },
    },

    label: {
      fontFamily: theme.fontFamilies.sans,
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
      fontFamily: theme.fontFamilies.sans,
      fontWeight: theme.fontWeights.medium,
      color: theme.colors.contentSecondary,
      marginTop: theme.spacing.xxs,
      variants: {
        disabled: {
          true: { color: theme.colors.contentDisabled },
        },
        size: {
          small: {
            fontSize: theme.fontSizes.sm,
            lineHeight: theme.lineHeights.sm,
          },
          medium: {
            fontSize: theme.fontSizes.md,
            lineHeight: theme.lineHeights.md,
          },
          large: {
            fontSize: theme.fontSizes.lg,
            lineHeight: theme.lineHeights.lg,
          },
        },
      },
    },

    errorText: {
      fontFamily: theme.fontFamilies.sans,
      fontWeight: theme.fontWeights.medium,
      color: theme.colors.danger,
      marginTop: theme.spacing.xxs,
      variants: {
        size: {
          small: {
            fontSize: theme.fontSizes.sm,
            lineHeight: theme.lineHeights.sm,
          },
          medium: {
            fontSize: theme.fontSizes.md,
            lineHeight: theme.lineHeights.md,
          },
          large: {
            fontSize: theme.fontSizes.lg,
            lineHeight: theme.lineHeights.lg,
          },
        },
      },
    },
  };
});
