#!/usr/bin/env node
/**
 * Bundle Checker Script
 * Verifies that test files and mocks are excluded from the Metro bundle
 */

const Metro = require('metro');
const path = require('path');

async function checkBundle() {
  console.log('🔍 Checking Metro bundle configuration...\n');

  const config = await Metro.loadConfig({
    config: path.resolve(__dirname, 'metro.config.js'),
  });

  console.log('📋 Metro blockList pattern:');
  if (config.resolver.blockList) {
    // blockList is a single RegExp, not an array
    console.log(`  ${config.resolver.blockList}`);
  } else {
    console.log('  ⚠️  No blockList configured!');
  }

  console.log('\n✅ Test patterns to check:');
  const testPatterns = [
    '__tests__/QuickTest.tsx',
    '__tests__/Button.perf.test.tsx',
    '__mocks__/expo-haptics.js',
    'Button.test.tsx',
    'Button.spec.tsx',
    'Button.perf.test.tsx',
  ];

  testPatterns.forEach((pattern) => {
    const testPath = `/packages/ui/src/components/Button/${pattern}`;
    // blockList is a single RegExp, not an array
    const isBlocked = config.resolver.blockList?.test(testPath);
    const status = isBlocked ? '🚫 BLOCKED' : '⚠️  ALLOWED';
    console.log(`  ${status}: ${pattern}`);
  });

  console.log('\n✨ Done!');
}

checkBundle().catch((error) => {
  console.error('❌ Error checking bundle:', error);
  process.exit(1);
});
