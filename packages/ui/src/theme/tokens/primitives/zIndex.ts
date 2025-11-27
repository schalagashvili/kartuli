export const zIndex = {
  hide: -1,
  base: 0,
  raised: 10,
  sticky: 100,
  drawer: 200,
  sheet: 300,
  modal: 400,
  popover: 500,
  toast: 600,
  max: 9999,
} as const;

export type ZIndex = typeof zIndex;
