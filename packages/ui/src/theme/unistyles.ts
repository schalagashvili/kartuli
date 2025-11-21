import { StyleSheet } from 'react-native-unistyles';

import { darkTheme, lightTheme } from './themes';

const breakpoints = {
  xs: 0,
  sm: 360,
  md: 428,
  lg: 768,
  xl: 1024,
  '2xl': 1280,
} as const;

const themes = {
  light: lightTheme,
  dark: darkTheme,
} as const;

type AppBreakpoints = typeof breakpoints;
type AppThemes = typeof themes;

declare module 'react-native-unistyles' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface UnistylesBreakpoints extends AppBreakpoints {}
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface UnistylesThemes extends AppThemes {}
}

StyleSheet.configure({
  themes,
  breakpoints,
  settings: {
    initialTheme: 'light',
    // adaptiveThemes: true,
  },
});
