const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// Watch the entire monorepo so Metro can resolve workspace packages
config.watchFolders = [monorepoRoot];

// Resolve node_modules from both the app and monorepo root (hoisted deps)
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];

// Force single instances of critical dependencies to avoid duplicates
config.resolver.extraNodeModules = new Proxy(
  {
    react: path.resolve(projectRoot, 'node_modules/react'),
    'react-native': path.resolve(projectRoot, 'node_modules/react-native'),
    'react-native-reanimated': path.resolve(
      projectRoot,
      'node_modules/react-native-reanimated'
    ),
    'react-native-unistyles': path.resolve(
      projectRoot,
      'node_modules/react-native-unistyles'
    ),
    '@react-native-async-storage/async-storage': path.resolve(
      monorepoRoot,
      'node_modules/@react-native-async-storage/async-storage'
    ),
  },
  {
    get: (target, name) =>
      target[name] ||
      path.join(projectRoot, 'node_modules', name) ||
      path.join(monorepoRoot, 'node_modules', name),
  }
);

// Ensure Storybook internals resolve cjs/mjs modules
config.resolver.sourceExts = Array.from(
  new Set([...(config.resolver.sourceExts || []), 'cjs', 'mjs'])
);

const withStorybook = require('@storybook/react-native/metro/withStorybook');

module.exports = withStorybook(config);
