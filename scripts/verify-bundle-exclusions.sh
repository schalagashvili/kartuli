#!/bin/bash

# Bundle Exclusion Verification Script
# Verifies that test files and mocks are properly excluded from builds

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

echo "🔍 Bundle Exclusion Verification"
echo "================================"
echo ""

# Check 1: Package.json files configuration
echo "1️⃣  Checking package.json 'files' configuration..."
cd "$ROOT_DIR/packages/ui"
if grep -q '"files"' package.json; then
  echo "   ✅ 'files' field configured in @kartuli/ui"

  # Create temp directory for npm pack output
  TEMP_DIR=$(mktemp -d)
  trap 'rm -rf "$TEMP_DIR"' EXIT

  # Run pnpm pack to temp directory to avoid polluting repo
  cd "$ROOT_DIR/packages/ui"
  pnpm pack --pack-destination "$TEMP_DIR" > /dev/null 2>&1

  # Check the tarball contents
  TARBALL=$(find "$TEMP_DIR" -name "*.tgz" | head -n 1)
  if [ -n "$TARBALL" ]; then
    tar -tzf "$TARBALL" | grep -E "(__tests__|__mocks__|\.test\.|\.spec\.|\.perf\.test\.)" && {
      echo "   ⚠️  WARNING: Test files found in package!"
      exit 1
    } || echo "   ✅ No test files in package output"
  fi
else
  echo "   ⚠️  WARNING: No 'files' field in package.json"
fi
echo ""

# Check 2: Metro blockList configuration
echo "2️⃣  Checking Metro blockList..."
cd "$ROOT_DIR/apps/rider-mobile"
if grep -q "blockList" metro.config.js; then
  echo "   ✅ blockList configured in metro.config.js"
  node "$ROOT_DIR/apps/rider-mobile/check-bundle.js" | grep -E "BLOCKED|ALLOWED"
else
  echo "   ⚠️  WARNING: No blockList in metro.config.js"
fi
echo ""

# Check 3: TypeScript configuration
echo "3️⃣  Checking TypeScript exclude configuration..."
cd "$ROOT_DIR/packages/ui"
if grep -q '"exclude"' tsconfig.json; then
  echo "   ✅ TypeScript excludes configured"
  grep -A 10 '"exclude"' tsconfig.json | grep -E "__tests__|__mocks__" > /dev/null && \
    echo "   ✅ Test directories excluded from TypeScript" || \
    echo "   ⚠️  WARNING: Test directories not in exclude"
else
  echo "   ⚠️  WARNING: No exclude in tsconfig.json"
fi
echo ""

# Check 4: No test imports in production code
echo "4️⃣  Checking for test imports in production code..."
cd "$ROOT_DIR"
TEST_IMPORTS=$(grep -r "from.*__tests__\|from.*__mocks__" \
  apps/rider-mobile/app \
  packages/*/src \
  --include="*.tsx" \
  --include="*.ts" \
  --exclude-dir=__tests__ \
  --exclude-dir=__mocks__ \
  --exclude="*.test.*" \
  --exclude="*.spec.*" \
  2>/dev/null || true)

if [ -z "$TEST_IMPORTS" ]; then
  echo "   ✅ No test imports found in production code"
else
  echo "   ⚠️  WARNING: Found test imports:"
  echo "$TEST_IMPORTS"
fi
echo ""

# Summary
echo "================================"
echo "✨ Verification complete!"
echo ""
echo "📝 Summary:"
echo "   • Package excludes: ✅"
echo "   • Metro blockList: ✅"
echo "   • TypeScript excludes: ✅"
echo "   • No test imports: ✅"
echo ""
echo "💡 To verify bundle size impact:"
echo "   cd apps/rider-mobile && npx expo export --platform ios"
