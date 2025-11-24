const path = require('path');
const { getSentryExpoConfig } = require('@sentry/react-native/metro');
const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

const config = getSentryExpoConfig(__dirname, {
  annotateReactComponents: true,
});

config.watchFolders = [monorepoRoot];

config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];

// Ensure Metro can resolve .tsx and .ts files
config.resolver.sourceExts = [
  ...(config.resolver.sourceExts || []),
  'tsx',
  'ts',
  'jsx',
  'js',
  'json',
];

// Exclude test files and mocks from the bundle
// Metro requires a single RegExp (combining patterns with |)
config.resolver.blockList = /(__tests__|__mocks__|\.test\.[jt]sx?$|\.spec\.[jt]sx?$|\.perf\.test\.[jt]sx?$)/;

module.exports = config;
