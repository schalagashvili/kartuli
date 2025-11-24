# Bundle Verification Guide

This guide explains how to verify that test files and mocks are excluded from your production bundles.

## Quick Verification

Run the comprehensive verification script:

```bash
pnpm verify:bundle
```

This checks:

- ✅ Package.json files configuration
- ✅ Metro blockList configuration
- ✅ TypeScript excludes
- ✅ No test imports in production code

## Individual Checks

### 1. Check npm Package Contents

See what files would be included if you published the package:

```bash
cd packages/ui
npm pack --dry-run
```

**Expected:** No `__tests__`, `__mocks__`, or `*.test.*` files should appear.

### 2. Check Metro Configuration

Verify Metro's blockList is working:

```bash
cd apps/rider-mobile
node check-bundle.js
```

**Expected:** All test patterns should show `🚫 BLOCKED`.

### 3. Check for Test Imports

Search for any imports from test directories:

```bash
grep -r "from.*__tests__\|from.*__mocks__" apps/rider-mobile/app --include="*.tsx" --include="*.ts"
```

**Expected:** No results (exit code 1).

### 4. Analyze Production Bundle Size

Generate a production bundle and check its contents:

```bash
cd apps/rider-mobile
npx expo export --platform ios --output-dir dist-check --clear

# Check for test files in bundle
find dist-check -name "*.bundle" -o -name "*.js" | xargs grep -l "__tests__\|__mocks__"

# Clean up
rm -rf dist-check
```

**Expected:** No test file references found.

## Configuration Files

### Metro Config

Location: `apps/rider-mobile/metro.config.js`

```javascript
config.resolver.blockList = [
  /\/__tests__\/.*/,
  /\/__mocks__\/.*/,
  /\.test\.[jt]sx?$/,
  /\.spec\.[jt]sx?$/,
  /\.perf\.test\.[jt]sx?$/,
];
```

### Package.json

Location: `packages/ui/package.json`

```json
{
  "files": [
    "src",
    "!src/**/__tests__",
    "!src/**/__mocks__",
    "!src/**/*.test.*",
    "!src/**/*.spec.*",
    "!src/**/*.perf.test.*"
  ]
}
```

### TypeScript Config

Location: `packages/ui/tsconfig.json`

```json
{
  "exclude": [
    "node_modules",
    "**/*.spec.ts",
    "**/*.test.ts",
    "**/*.spec.tsx",
    "**/*.test.tsx",
    "**/*.perf.test.tsx",
    "**/__tests__/**",
    "**/__mocks__/**"
  ]
}
```

## Troubleshooting

### Test files appearing in bundle

1. **Clear Metro cache:**

   ```bash
   cd apps/rider-mobile
   npx expo start --clear
   ```

2. **Restart bundler:**
   Stop and restart your development server.

3. **Verify configuration:**
   ```bash
   pnpm verify:bundle
   ```

### Bundle size seems large

1. **Check what's included:**

   ```bash
   cd packages/ui
   npm pack --dry-run
   ```

2. **Analyze production bundle:**
   ```bash
   cd apps/rider-mobile
   npx expo export --platform ios
   ```

## Best Practices

1. **Never export from `__tests__`** in production index files
2. **Run verification before releases:**
   ```bash
   pnpm verify:bundle
   ```
3. **Keep test files in `__tests__` directories**
4. **Use `.test.` or `.spec.` suffixes for test files**
5. **Keep mocks in `__mocks__` directories**

## CI/CD Integration

Add to your CI pipeline:

```yaml
- name: Verify bundle exclusions
  run: pnpm verify:bundle
```

This ensures test files never accidentally make it to production.
