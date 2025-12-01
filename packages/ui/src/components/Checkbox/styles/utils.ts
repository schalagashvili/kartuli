import { createHitSlop } from '../../../utils';
import { CHECKBOX_DIMENSIONS } from '../Checkbox.types';

export const getHitSlop = (size: keyof typeof CHECKBOX_DIMENSIONS) =>
  createHitSlop(CHECKBOX_DIMENSIONS[size].hitSlop);

export const getTopOffset = (size: keyof typeof CHECKBOX_DIMENSIONS) => {
  const { rowMinHeight, boxSize } = CHECKBOX_DIMENSIONS[size];
  return (rowMinHeight - boxSize) / 2;
};
