import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  // 1. Tell Knip about your workspaces
  workspaces: {
    '.': {
      entry: ['scripts/*.ts'],
    },
    'apps/rider-mobile': {
      // Expo entry point
      entry: ['src/app/**/*.tsx', 'src/app/**/*.ts', 'app.config.ts'],
      project: ['src/**/*.{ts,tsx}'],
    },
    'apps/driver-web': {
      // Next.js entry points handled mostly by the 'next' plugin, but good to specify
      entry: ['next.config.js'],
      project: ['src/**/*.{ts,tsx}'],
    },
    'packages/*': {
      entry: ['src/index.ts', 'src/index.tsx'], // The public API of your packages
      project: ['src/**/*.{ts,tsx}'],
    },
  },

  // 2. Ignore common tooling files
  ignore: [
    '**/*.d.ts',
    '**/jest.config.js',
    '**/tailwind.config.js', // Knip usually detects this via plugin, but safety first
  ],

  // 3. Ignore dependencies that are used by tools but not imported
  ignoreDependencies: [
    'husky',
    'lint-staged',
    'prettier',
    'eslint-config-expo',
    '@commitlint/*',
    'ts-node', // often used to run knip itself
  ],
};

export default config;
