export const durations = {
  instant: 0,
  fastest: 100,
  fast: 150,
  normal: 250,
  slow: 350,
  slower: 500,
  slowest: 700,
} as const;

export const easings = {
  linear: [0, 0, 1, 1],
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1],
  overshoot: [0.34, 1.56, 0.64, 1],
  bounce: [0.33, 1.53, 0.69, -0.49],
} satisfies Record<string, [number, number, number, number]>;

export type Durations = typeof durations;
export type Easings = typeof easings;
