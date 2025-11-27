import type { FlexStyle } from 'react-native';

export const flex = {
  rigid: 0,
  fill: 1,
} as const;

export const shrink = {
  none: 0,
  initial: 1,
} as const;

export const grow = {
  none: 0,
  initial: 0,
  1: 1,
} as const;

export const direction = {
  row: 'row',
  column: 'column',
  rowReverse: 'row-reverse',
  columnReverse: 'column-reverse',
} as const satisfies Record<string, FlexStyle['flexDirection']>;

export const wrap = {
  none: 'nowrap',
  wrap: 'wrap',
  reverse: 'wrap-reverse',
} as const satisfies Record<string, FlexStyle['flexWrap']>;

export const alignItems = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  stretch: 'stretch',
  baseline: 'baseline',
} as const satisfies Record<string, FlexStyle['alignItems']>;

export const alignSelf = {
  auto: 'auto',
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  stretch: 'stretch',
  baseline: 'baseline',
} as const satisfies Record<string, FlexStyle['alignSelf']>;

export const alignContent = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  stretch: 'stretch',
  between: 'space-between',
  around: 'space-around',
} as const satisfies Record<string, FlexStyle['alignContent']>;

export const justify = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
} as const satisfies Record<string, FlexStyle['justifyContent']>;

export const size = {
  full: '100%',
  half: '50%',
  third: '33.333%',
  quarter: '25%',
  auto: 'auto',
} as const;

export type FlexValue = typeof flex;
export type Shrink = typeof shrink;
export type Grow = typeof grow;
export type Direction = keyof typeof direction;
export type Wrap = keyof typeof wrap;
export type AlignItems = keyof typeof alignItems;
export type AlignSelf = keyof typeof alignSelf;
export type AlignContent = keyof typeof alignContent;
export type Justify = keyof typeof justify;
export type Size = typeof size;
export type SizeKey = keyof Size;
