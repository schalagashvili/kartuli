import { StyleSheet } from 'react-native-unistyles';

import { getTopOffset } from '../../../components/Checkbox/styles/utils';
import {
  CHECKBOX_BORDER_WIDTH,
  CHECKBOX_DIMENSIONS,
  CHECKBOX_RADIUS,
} from '../Checkbox.types';

export const styles = StyleSheet.create((theme) => ({
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

  box: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: CHECKBOX_RADIUS,
    borderWidth: CHECKBOX_BORDER_WIDTH,
    backgroundColor: theme.colors.palette.transparent,
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
        center: { marginTop: 0 },
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
    borderRadius: CHECKBOX_RADIUS - 1,
  },

  iconWrapper: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: theme.zIndex.base,
  },

  pressedOverlay: {
    ...StyleSheet.absoluteFillObject,
    variants: {
      visualState: {
        unchecked: { backgroundColor: theme.colors.interactive.ghostPressed },
        preselected: { backgroundColor: theme.colors.interactive.ghostPressed },
        checked: {
          backgroundColor:
            theme.mode === 'light'
              ? theme.colors.palette.blackAlpha20
              : theme.colors.palette.whiteAlpha20,
        },
        indeterminate: {
          backgroundColor:
            theme.mode === 'light'
              ? theme.colors.palette.blackAlpha20
              : theme.colors.palette.whiteAlpha20,
        },
      },
    },
  },

  labelContainer: {
    flex: 1,
    justifyContent: 'center',
    variants: {
      align: {
        center: {},
        top: { paddingVertical: theme.spacing.inset.sm },
      },
    },
  },

  label: {
    ...theme.typography.label.medium,
    color: theme.colors.text.primary,
    variants: {
      disabled: {
        true: { color: theme.colors.text.disabled },
      },
      size: {
        small: {
          ...theme.typography.label.small,
        },
        medium: {
          ...theme.typography.label.medium,
        },
        large: {
          ...theme.typography.label.large,
        },
      },
    },
  },

  description: {
    ...theme.typography.body.small,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.stack.xxs,
    variants: {
      disabled: {
        true: { color: theme.colors.text.disabled },
      },
      size: {
        small: {
          ...theme.typography.body.small,
        },
        medium: {
          ...theme.typography.body.medium,
        },
        large: {
          ...theme.typography.body.large,
        },
      },
    },
  },

  errorText: {
    ...theme.typography.body.small,
    color: theme.colors.status.error,
    marginTop: theme.spacing.stack.xxs,
    variants: {
      size: {
        small: {
          ...theme.typography.body.small,
        },
        medium: {
          ...theme.typography.body.medium,
        },
        large: {
          ...theme.typography.body.large,
        },
      },
    },
  },
}));
