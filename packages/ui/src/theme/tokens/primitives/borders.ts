import { StyleSheet } from 'react-native';

export const borderWidths = {
  hairline: StyleSheet.hairlineWidth,
  thin: 1,
  medium: 2,
  thick: 3,
} as const;

export type BorderWidths = typeof borderWidths;
