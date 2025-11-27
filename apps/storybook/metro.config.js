const fs = require('fs');
const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

config.watchFolders = [monorepoRoot];

config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];

config.resolver.extraNodeModules = {
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
};

config.resolver.sourceExts = Array.from(
  new Set([...(config.resolver.sourceExts || []), 'cjs', 'mjs'])
);

const withStorybook = require('@storybook/react-native/metro/withStorybook');

module.exports = withStorybook(config);
