import { CHECKBOX_DIMENSIONS } from '../../../components/Checkbox/Checkbox.types';
import { createHitSlop } from '../../../utils';

export const getHitSlop = (size: keyof typeof CHECKBOX_DIMENSIONS) =>
  createHitSlop(CHECKBOX_DIMENSIONS[size].hitSlop);

export const getTopOffset = (size: keyof typeof CHECKBOX_DIMENSIONS) => {
  const { rowMinHeight, boxSize } = CHECKBOX_DIMENSIONS[size];
  return (rowMinHeight - boxSize) / 2;
};
