import { StyleSheet } from 'react-native-unistyles';

import { darkTheme } from './themes/dark';
import { lightTheme } from './themes/light';
import type { Theme } from './types';

export const breakpoints = {
  xs: 0,
  sm: 380,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

type AppBreakpoints = typeof breakpoints;

declare module 'react-native-unistyles' {
  export interface UnistylesThemes {
    light: Theme;
    dark: Theme;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}

StyleSheet.configure({
  themes: {
    light: lightTheme,
    dark: darkTheme,
  },
  breakpoints,
  settings: {
    initialTheme: 'light',
  },
});
