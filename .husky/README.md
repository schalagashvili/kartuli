# Git Hooks Documentation

This directory contains Git hooks managed by Husky that run automatically during git operations.

## Pre-Commit Hook

Runs before every commit. The following checks are performed:

### Always Run

1. **Lint-staged** - Formats and lints staged files
   - TypeScript/TSX files: ESLint + Prettier
   - JSON/Markdown files: Prettier

2. **Dependency Mismatch Check** - Ensures all workspace packages use consistent dependency versions
   - Fix with: `pnpm deps:fix`

### Conditional Checks (UI Package Changes Only)

When staging files from `packages/ui/src/**`, additional checks run:

3. **Bundle Verification** (`pnpm verify:bundle`)
   - Ensures test files are excluded from production bundles
   - Checks: package.json files, Metro blockList, TypeScript excludes
   - Validates no test imports in production code

4. **Performance Tests** (`pnpm --filter @kartuli/ui test:perf`)
   - **Only runs when component files are staged** (`packages/ui/src/components/**`)
   - Uses Reassure.js to detect performance regressions
   - Compares render times against baseline

### Skipping Pre-Commit Checks

If you need to bypass the pre-commit hook (use sparingly):

```bash
git commit --no-verify
```

**⚠️ Warning:** This skips ALL checks, including linting and formatting.

## Pre-Push Hook

Runs before pushing to remote. Validates branch naming convention:

**Format:** `<type>/<description>`

**Valid Types:**

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Code style (formatting, etc.)
- `refactor` - Code refactoring
- `perf` - Performance improvements
- `test` - Adding/updating tests
- `chore` - Maintenance tasks
- `ci` - CI/CD changes
- `revert` - Revert previous commit
- `build` - Build system changes
- `security` - Security fixes
- `wip` - Work in progress

**Examples:**

```bash
feat/button-component
fix/map-marker-crash
perf/optimize-list-rendering
```

**Exempt Branches:** `main`, `staging`, `develop`

## Commit-Msg Hook

Validates commit message format using Commitlint (Conventional Commits).

**Format:** `<type>(<scope>): <subject>`

**Examples:**

```
feat(ui): add haptic feedback to buttons
fix(rider): resolve map marker crash on iOS
docs: update bundle verification guide
```

## Manual Verification

Run all checks manually:

```bash
# Bundle verification only
pnpm verify:bundle

# Performance tests only
pnpm test:perf

# Both bundle + perf tests
pnpm verify:all
```

## Performance Optimization

Performance tests only run when:

1. Files in `packages/ui/src/components/**` are staged
2. This prevents slow commits for non-component changes

To run perf tests for other packages, extend the conditional check in `.husky/pre-commit`.

## Troubleshooting

### Pre-commit hook not running

```bash
# Reinstall hooks
pnpm prepare
```

### Performance tests taking too long

- Reduce `runs` in `reassure.config.js`
- Or commit without component changes first, then commit component changes separately

### Bundle verification fails

- Check that test files are in `__tests__/` or `__mocks__/` directories
- Verify `packages/ui/package.json` has correct `files` field
- Run `pnpm verify:bundle` manually to see detailed output
