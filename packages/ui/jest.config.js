module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // Use test-specific TypeScript config
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
    },
  },

  // Module name mapper for mocks
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    'expo-haptics': '<rootDir>/__mocks__/expo-haptics.js',
    '^react-native-unistyles$': '<rootDir>/__mocks__/react-native-unistyles.js',
    // Button stylesheet already mocked via react-native-unistyles mock
  },

  // Ignore patterns - exclude interactive test components but KEEP __tests__
  testPathIgnorePatterns: [
    '/node_modules/',
    '/.reassure/',
    '/performance/', // Interactive performance test components
    '/tests/', // Other interactive test components
  ],

  // Transform ignore patterns for pnpm
  transformIgnorePatterns: [
    'node_modules/(?!(\\.pnpm/.*?/)?(' +
      '@react-native|' +
      'react-native|' +
      '@react-native-community|' +
      'expo|' +
      '@expo|' +
      'expo-haptics|' +
      'expo-modules-core|' +
      '@shopify|' +
      'reassure|' +
      '@callstack|' +
      '@react-navigation|' +
      'react-native-reanimated|' +
      'react-native-unistyles|' +
      'react-native-svg|' +
      'lucide-react-native' +
      ')/)',
  ],
};
