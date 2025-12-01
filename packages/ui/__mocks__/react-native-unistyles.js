/* eslint-disable no-undef */
// Mock react-native-unistyles for Jest to avoid requiring the Babel plugin/runtime
const { lightTheme } = require('../src/theme/themes/light');

const mockTheme = lightTheme;

const createStyleSheet = jest.fn((stylesOrFn) => {
  let baseStyles = {};

  if (typeof stylesOrFn === 'function') {
    const result = stylesOrFn(mockTheme);
    baseStyles = Object.keys(result).reduce((acc, key) => {
      const styleObj = result[key];
      const cleanStyle = {};
      for (const styleKey in styleObj) {
        if (styleObj.hasOwnProperty(styleKey) && styleKey !== 'variants') {
          cleanStyle[styleKey] = styleObj[styleKey];
        }
      }
      acc[key] = cleanStyle;
      return acc;
    }, {});
  } else {
    baseStyles = stylesOrFn || {};
  }

  const stylesheet = { ...baseStyles };

  stylesheet.useVariants = jest.fn(() => stylesheet);

  return stylesheet;
});

const StyleSheet = {
  absoluteFillObject: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  create: createStyleSheet,
};

module.exports = {
  StyleSheet,
  createStyleSheet,
  useStyles: jest.fn(() => ({
    styles: {},
    theme: mockTheme,
  })),
  useUnistyles: jest.fn(() => ({
    styles: {},
    theme: mockTheme,
  })),
  UnistylesRuntime: {
    themeName: 'light',
    setTheme: jest.fn(),
  },
  useVariants: jest.fn(() => ({})),
};
