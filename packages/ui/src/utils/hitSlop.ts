import type { Insets } from 'react-native';

export const createHitSlop = (slop?: number): Insets | undefined => {
  if (slop === undefined || slop <= 0) return undefined;

  return {
    top: slop,
    bottom: slop,
    left: slop,
    right: slop,
  };
};
