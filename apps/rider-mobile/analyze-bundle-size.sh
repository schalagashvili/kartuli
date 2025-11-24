#!/bin/bash

# Bundle Size Analyzer
# Generates production bundle and shows size breakdown

echo "📦 Building production bundle..."
echo ""

# Export production bundle
npx expo export --platform ios --output-dir dist-check --clear 2>&1 | grep -E "(bundle|size|MB|KB)" || echo "Build initiated..."

echo ""
echo "📊 Analyzing bundle contents..."
echo ""

# Check if __tests__ or __mocks__ appear in bundles
if [ -d "dist-check" ]; then
  echo "🔍 Searching for test files in bundle:"

  TEST_FILES=$(find dist-check -name "*.bundle" -o -name "*.js" 2>/dev/null | xargs grep -l "__tests__\|__mocks__\|\.test\.\|\.spec\." 2>/dev/null || echo "")

  if [ -z "$TEST_FILES" ]; then
    echo "  ✅ No test files found in bundle!"
  else
    echo "  ⚠️  Found test references:"
    echo "$TEST_FILES"
  fi

  echo ""
  echo "📈 Bundle size summary:"
  du -sh dist-check/* 2>/dev/null | head -10

  echo ""
  echo "🗑️  Cleaning up..."
  rm -rf dist-check
else
  echo "⚠️  Bundle directory not created. Run 'npx expo export' manually to check."
fi

echo ""
echo "✨ Done!"
