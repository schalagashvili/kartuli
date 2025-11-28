const Metro = require('metro');
const path = require('path');

async function checkBundle() {
  console.log('🔍 Checking Metro bundle configuration...\n');

  const config = await Metro.loadConfig({
    // eslint-disable-next-line no-undef
    config: path.resolve(__dirname, 'metro.config.js'),
  });

  console.log('📋 Metro blockList pattern:');
  if (config.resolver.blockList) {
    console.log(`  ${config.resolver.blockList}`);
  } else {
    console.log('  ⚠️  No blockList configured!');
  }

  console.log('\n✅ Test patterns to check:');
  const testPatterns = [
    'packages/ui/src/components/Button/__tests__/QuickTest.tsx',
    'packages/ui/src/components/Button/__tests__/Button.perf.test.tsx',
    'packages/ui/src/components/Button/__mocks__/expo-haptics.js',
    'packages/ui/src/components/Button/Button.test.tsx',
    'packages/ui/src/components/Button/Button.spec.tsx',
    'packages/ui/src/components/Button/Button.perf.test.tsx',
    'apps/rider-mobile/app/dev/ButtonGallery.tsx',
  ];

  testPatterns.forEach((testPath) => {
    const isBlocked = config.resolver.blockList?.test(testPath);
    const status = isBlocked ? '🚫 BLOCKED' : '⚠️  ALLOWED';
    console.log(`  ${status}: ${testPath}`);
  });

  console.log('\n✨ Done!');
}

checkBundle().catch((error) => {
  console.error('❌ Error checking bundle:', error);
  process.exit(1);
});
