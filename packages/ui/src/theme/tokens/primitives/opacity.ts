export const opacity = {
  transparent: 0,
  subtle: 0.05,
  light: 0.1,
  muted: 0.2,
  medium: 0.4,
  half: 0.5,
  high: 0.7,
  heavy: 0.9,
  opaque: 1,
} as const;

export type Opacity = typeof opacity;
