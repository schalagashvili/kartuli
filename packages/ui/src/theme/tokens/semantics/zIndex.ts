import { zIndex as primitiveZIndex } from '../primitives/zIndex';

export const semanticZIndex = {
  ...primitiveZIndex,
  mapOverlay: primitiveZIndex.raised,
  rideSheet: primitiveZIndex.modal,
} as const;

export type SemanticZIndex = typeof semanticZIndex;
