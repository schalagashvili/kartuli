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

// Determine if we should exclude dev directory
// Dev directory should ONLY be available in development mode
const isDevelopment =
  process.env.NODE_ENV !== 'production' &&
  process.env.APP_VARIANT !== 'production' &&
  process.env.APP_VARIANT !== 'preview';

// Build blockList patterns
const blockPatterns = [
  '__tests__',
  '__mocks__',
  '\\.test\\.[jt]sx?$',
  '\\.spec\\.[jt]sx?$',
  '\\.perf\\.test\\.[jt]sx?$',
];

// Exclude dev directory in production/preview builds
if (!isDevelopment) {
  blockPatterns.push('/app/dev/');
  blockPatterns.push('/app/dev$');
}

config.resolver.blockList = new RegExp(`(${blockPatterns.join('|')})`);

module.exports = config;
