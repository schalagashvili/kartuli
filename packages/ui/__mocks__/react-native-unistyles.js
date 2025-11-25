// Mock react-native-unistyles for Jest to avoid requiring the Babel plugin/runtime
const mockTheme = {
  colors: {
    backgroundInversePrimary: '#000',
    backgroundSecondary: '#eee',
    backgroundNegative: '#e53935',
    backgroundStateDisabled: '#ccc',
    contentInversePrimary: '#fff',
    contentPrimary: '#111',
    contentSecondary: '#333',
    contentNegative: '#fff',
    overlayDefault: '#000000',
    overlayLight: '#ffffff',
    overlayDisabled: '#888888',
  },
  fonts: { sans: 'System' },
  fontWeights: { semibold: '600', medium: '500', regular: '400' },
  spacing: { s: 4, m: 8, l: 16 },
};

const createStyleSheet = jest.fn((stylesOrFn) => {
  // For Button styles, we need to extract the base style keys
  // Unistyles processes variants specially, but we just need the base style objects for tests
  let baseStyles = {};

  if (typeof stylesOrFn === 'function') {
    const result = stylesOrFn(mockTheme);
    // Extract top-level style keys (ignoring variants)
    baseStyles = Object.keys(result).reduce((acc, key) => {
      const styleObj = result[key];
      // Create a clean style object without variants
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

  // Create stylesheet object with useVariants method that returns self
  const stylesheet = { ...baseStyles };

  // useVariants should be a no-op that returns the stylesheet for chaining
  stylesheet.useVariants = jest.fn(() => stylesheet);

  return stylesheet;
});

module.exports = {
  StyleSheet: { create: createStyleSheet },
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
