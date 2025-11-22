const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const reactNativePlugin = require('eslint-plugin-react-native');
const expoConfig = require('eslint-config-expo/flat');
const { defineConfig } = require('eslint/config');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.expo/**',
      '**/.expo-shared/**',
      '**/*.config.js', // Ignore config files
      '**/wdyr.js', // Ignore WDYR setup
    ],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'react-native': reactNativePlugin,
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: ['./apps/rider-mobile/tsconfig.json', './tsconfig.json'],
        },
        node: {
          extensions: ['.ts', '.tsx', '.js', '.jsx'],
          paths: ['apps/rider-mobile', 'packages'],
        },
      },
    },
    rules: {
      // TypeScript base rules
      ...tsPlugin.configs.recommended.rules,

      // ===== TypeScript =====
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_', // Also ignore unused vars starting with _
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-var-requires': 'off',

      // ===== React Hooks (Critical!) =====
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // ===== React Native Performance =====
      'react-native/no-unused-styles': 'warn',
      'react-native/no-inline-styles': 'warn', // Inline styles hurt performance
      'react-native/no-raw-text': 'off', // Too strict for MVP
      'react-native/no-color-literals': 'off', // Too strict for MVP

      // ===== General Code Quality =====
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },
  {
    // Special rules for config files (allow require)
    files: ['**/*.config.js', '**/wdyr.js', '**/.eslintrc.js'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
]);
