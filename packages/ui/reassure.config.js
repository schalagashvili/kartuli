/** @type {import('reassure').Config} */
module.exports = {
  testMatch: '**/__tests__/**/*.perf.test.[jt]s?(x)',

  // Explicitly set test runner (Jest)
  testRunner: 'jest',

  // Performance thresholds
  performance: {
    renderTime: {
      absolute: 50,
      relative: 0.2,
    },
    renderCount: {
      absolute: 2,
      relative: 0.1,
    },
  },

  // Output directory
  outputDir: '.reassure',

  // Test runs
  runs: 10,
  warmupRuns: 2,

  // Verbose logging
  verbose: true,
};
