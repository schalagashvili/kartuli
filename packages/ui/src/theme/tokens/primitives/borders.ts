import { StyleSheet } from 'react-native';

export const borderWidths = {
  hairline: Math.max(StyleSheet.hairlineWidth, 0.5),
  thin: 1,
  medium: 2,
  thick: 3,
} as const;

export type BorderWidths = typeof borderWidths;
