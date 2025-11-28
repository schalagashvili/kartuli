export const zIndex = {
  hide: -1,
  base: 0,
  raised: 1,
  sticky: 100,
  overlay: 200,
  modal: 300,
  popover: 400,
  toast: 500,
  max: 9999,
} as const;

export type ZIndex = typeof zIndex;
