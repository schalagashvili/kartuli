import { CHECKBOX_DIMENSIONS } from '../Checkbox.types';

// Re-export dimensions for easy access
export { CHECKBOX_DIMENSIONS };

export const getHitSlop = (
  size: keyof typeof CHECKBOX_DIMENSIONS
): { top: number; bottom: number; left: number; right: number } => {
  const slop = CHECKBOX_DIMENSIONS[size].hitSlop;
  return {
    top: slop,
    bottom: slop,
    left: 0,
    right: 0,
  };
};
