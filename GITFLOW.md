# Git Workflow & CI/CD Guide

Complete guide for Git conventions, branching strategy, code quality automation, and deployment workflows for the Kartuli project.

## Table of Contents

- [Branch Strategy](#branch-strategy)
- [Branch Naming Convention](#branch-naming-convention)
- [Commit Message Convention](#commit-message-convention)
- [Git Workflow](#git-workflow)
- [Rebasing Guide](#rebasing-guide)
- [Git Hooks (Husky)](#git-hooks-husky)
- [Pull Request Process](#pull-request-process)
- [Code Quality Checks](#code-quality-checks)
- [EAS Build & Deployment](#eas-build--deployment)
- [CI/CD Pipeline](#cicd-pipeline)

---

## Branch Strategy

We use a simplified GitFlow model optimized for rapid MVP development.

### Branch Types

| Branch      | Purpose                         | Lifetime     |
| ----------- | ------------------------------- | ------------ |
| `main`      | Production-ready code           | Permanent    |
| `develop`   | Integration branch for features | Permanent    |
| `feat/*`    | New features                    | Until merged |
| `fix/*`     | Bug fixes                       | Until merged |
| `chore/*`   | Maintenance tasks               | Until merged |
| `release/*` | Release preparation             | Until merged |

### Branch Flow

```
main ←────────────────────────────────────────────── Production releases
  ↑                                                       ↑
  │                                                       │
  └── release/1.0.0 ←─────────────────────────────────────┘
                       ↑
                       │
develop ←──────────────┴──────────────────────────── Integration
  ↑         ↑         ↑         ↑
  │         │         │         │
feat/     feat/     fix/     chore/
auth      maps      crash    deps
```

### Rules

1. **Never commit directly to `main` or `develop`**
2. **All changes go through pull requests**
3. **Feature branches are created from `develop`**
4. **Hotfixes can branch from `main` when critical**
5. **Delete branches after merging**

---

## Branch Naming Convention

### Format

```
<type>/<short-description>
```

### Types (Must Match Commit Types)

| Type       | Use For                 | Example                    |
| ---------- | ----------------------- | -------------------------- |
| `feat`     | New feature             | `feat/ride-request-screen` |
| `fix`      | Bug fix                 | `fix/map-marker-crash`     |
| `docs`     | Documentation           | `docs/api-readme`          |
| `style`    | UI/formatting changes   | `style/button-colors`      |
| `refactor` | Code restructuring      | `refactor/auth-store`      |
| `perf`     | Performance improvement | `perf/location-updates`    |
| `test`     | Adding tests            | `test/payment-flow`        |
| `chore`    | Maintenance             | `chore/upgrade-expo`       |
| `ci`       | CI/CD changes           | `ci/eas-workflow`          |
| `build`    | Build configuration     | `build/metro-config`       |
| `security` | Security fixes          | `security/sanitize-input`  |
| `wip`      | Work in progress        | `wip/new-experiment`       |
| `revert`   | Reverting changes       | `revert/broken-feature`    |

### Rules

1. **Lowercase only** — `feat/button` not `Feat/Button`
2. **Kebab-case** — `feat/button-component` not `feat/button_component`
3. **Short but descriptive** — max ~30 characters after the slash
4. **No special characters** — only letters, numbers, and hyphens

### Examples

```bash
# ✅ Valid
feat/ride-tracking
fix/payment-timeout
chore/upgrade-expo-54
refactor/zustand-stores
perf/map-rendering

# ❌ Invalid
feature/ride-tracking     # wrong type
feat/RideTracking         # not kebab-case
feat/ride_tracking        # underscore not allowed
my-feature                # missing type prefix
feat/implement-the-new-ride-request-screen-with-all-components  # too long
```

### Creating Branches

```bash
# Create and switch to new branch
git checkout -b feat/ride-request

# Or create from develop explicitly
git checkout develop
git pull origin develop
git checkout -b feat/ride-request
```

---

## Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/) enforced by commitlint.

### Format

```
<type>(<scope>): <subject>

[optional body]

[optional footer(s)]
```

### Types

| Type       | Description                             | Triggers           |
| ---------- | --------------------------------------- | ------------------ |
| `feat`     | New feature                             | Minor version bump |
| `fix`      | Bug fix                                 | Patch version bump |
| `docs`     | Documentation only                      | -                  |
| `style`    | Formatting, UI styling                  | -                  |
| `refactor` | Code change that neither fixes nor adds | -                  |
| `perf`     | Performance improvement                 | -                  |
| `test`     | Adding/updating tests                   | -                  |
| `chore`    | Maintenance tasks                       | -                  |
| `ci`       | CI/CD configuration                     | -                  |
| `build`    | Build system changes                    | -                  |
| `revert`   | Reverting previous commit               | -                  |
| `security` | Security improvements                   | Patch version bump |
| `wip`      | Work in progress (avoid on main)        | -                  |

### Scopes

| Scope           | Use For                    |
| --------------- | -------------------------- |
| `rider-mobile`  | Rider mobile app           |
| `driver-mobile` | Driver mobile app          |
| `driver-web`    | Driver web app             |
| `admin-web`     | Admin dashboard            |
| `ui`            | UI package                 |
| `core`          | Core utilities package     |
| `types`         | Types package              |
| `state`         | State management package   |
| `api`           | API package                |
| `hooks`         | Hooks package              |
| `repo`          | Repository-wide changes    |
| `mobile`        | Both mobile apps           |
| `web`           | Both web apps              |
| `deps`          | Dependencies               |
| `auth`          | Authentication feature     |
| `ride`          | Ride management feature    |
| `map`           | Map/location feature       |
| `payment`       | Payment feature            |
| `tracking`      | Real-time tracking feature |

### Subject Rules

1. **Imperative mood** — "add" not "added" or "adds"
2. **Lowercase first letter** — "add feature" not "Add feature"
3. **No period at end** — "add feature" not "add feature."
4. **10-72 characters** — be concise but descriptive

### Examples

```bash
# ✅ Valid commits
feat(ui): add button component with haptic feedback
fix(rider-mobile): resolve crash on map initialization
chore(deps): upgrade expo to sdk 54
refactor(state): simplify auth store actions
perf(map): optimize driver marker rendering
docs(api): add supabase integration guide
test(payment): add unit tests for fare calculation
ci(repo): add sonarcloud workflow
security(api): sanitize user input in search

# ✅ With body (for complex changes)
feat(ride): implement ride request flow

- Add RideRequestScreen with location picker
- Integrate Google Places autocomplete
- Add price estimation component
- Connect to Supabase realtime for driver matching

Closes #123

# ❌ Invalid commits
Fix(ui): add button          # uppercase type
feat(ui): Add button.        # capital letter, period at end
feat: add button             # missing scope (will warn)
feat(unknown): add button    # invalid scope
added button component       # not conventional format
feat(ui): added button       # past tense, should be imperative
```

### Writing Good Commit Messages

Think: **"If applied, this commit will..."**

- ✅ "If applied, this commit will **add button component**"
- ❌ "If applied, this commit will **added button component**"

---

## Git Workflow

### Daily Development Flow

```bash
# 1. Start your day - sync with remote
git checkout develop
git pull origin develop

# 2. Create feature branch
git checkout -b feat/new-feature

# 3. Make changes and commit
git add .
git commit -m "feat(ui): add new component"

# 4. Push to remote (first time)
git push -u origin feat/new-feature

# 5. Continue working...
git add .
git commit -m "feat(ui): add styling to component"
git push

# 6. When ready, create PR on GitHub
# 7. After PR approved and merged, clean up
git checkout develop
git pull origin develop
git branch -d feat/new-feature
```

### Syncing with Develop

```bash
# While on your feature branch
git fetch origin
git rebase origin/develop

# If conflicts, resolve them, then
git add .
git rebase --continue

# Force push after rebase (your branch only!)
git push --force-with-lease
```

---

## Rebasing Guide

We use **rebase** strategy for clean, linear history.

### Configure Git for Rebase

```bash
# Set rebase as default for pull
git config --global pull.rebase true

# Enable autostash during rebase
git config --global rebase.autoStash true
```

### Basic Rebase Workflow

```bash
# 1. Fetch latest changes
git fetch origin

# 2. Rebase your branch onto develop
git checkout feat/your-feature
git rebase origin/develop

# 3. If no conflicts, you're done!
# 4. Force push (only your branch!)
git push --force-with-lease
```

### Handling Rebase Conflicts

```bash
# When conflicts occur during rebase:

# 1. Git will pause and show conflicting files
git status

# 2. Open each conflicting file and resolve
# Look for conflict markers: <<<<<<<, =======, >>>>>>>

# 3. After resolving, stage the files
git add <resolved-file>

# 4. Continue the rebase
git rebase --continue

# 5. If you want to skip a commit
git rebase --skip

# 6. If you want to abort and go back
git rebase --abort
```

### Interactive Rebase (Cleaning Up Commits)

Before creating a PR, clean up your commit history:

```bash
# Rebase last 5 commits interactively
git rebase -i HEAD~5

# Or rebase all commits since branching from develop
git rebase -i origin/develop
```

In the editor:

```
pick abc1234 feat(ui): add button component
squash def5678 fix typo                      # Squash into previous
pick ghi9012 feat(ui): add button tests
reword jkl3456 WIP                           # Reword this commit
drop mno7890 debug console.log               # Remove this commit
```

Commands:

- `pick` — keep commit as-is
- `squash` — combine with previous commit
- `fixup` — combine with previous, discard message
- `reword` — keep commit, edit message
- `drop` — remove commit entirely

### Golden Rules of Rebasing

1. **Never rebase public branches** (`main`, `develop`)
2. **Only rebase your own feature branches**
3. **Always use `--force-with-lease`** not `--force`
4. **Communicate with team** if branch is shared

---

## Git Hooks (Husky)

Automated checks run on git operations.

### Pre-commit Hook

Runs before each commit:

```bash
# .husky/pre-commit
#!/bin/sh

# Run lint-staged (ESLint, Prettier on staged files)
pnpm lint-staged

# Check for dependency version mismatches
echo ""
echo "🔍 Checking for dependency version mismatches..."
pnpm deps:check

if [ $? -ne 0 ]; then
  echo ""
  echo "❌ Dependency version mismatches found!"
  echo "Run 'pnpm deps:fix' to fix them, then try committing again."
  exit 1
fi

echo "✅ All pre-commit checks passed"
```

### Commit-msg Hook

Validates commit message format:

```bash
# .husky/commit-msg
#!/bin/sh

npx --no -- commitlint --edit $1
```

### Pre-push Hook

Validates branch naming before push:

```bash
# .husky/pre-push
#!/bin/sh

branch=$(git symbolic-ref --short HEAD)

# Allow main/develop branches
if [ "$branch" = "main" ] || [ "$branch" = "develop" ]; then
  exit 0
fi

# Pattern: type/description (kebab-case)
valid_pattern="^(feat|fix|docs|style|refactor|perf|test|chore|ci|revert|build|security|wip)/[a-z0-9-]+$"

if ! echo "$branch" | grep -Eq "$valid_pattern"; then
  echo ""
  echo "❌ Branch name '$branch' doesn't follow naming convention."
  echo ""
  echo "Expected format: <type>/<description>"
  echo ""
  echo "Types: feat, fix, docs, style, refactor, perf, test, chore, ci, revert, build, security, wip"
  echo ""
  echo "Examples:"
  echo "  feat/button-component"
  echo "  fix/map-marker-crash"
  echo "  chore/upgrade-expo"
  echo ""
  exit 1
fi

echo "✅ Branch name follows convention"
```

### Setting Up Husky

```bash
# Install Husky
pnpm add -D husky

# Initialize Husky
npx husky init

# Create hooks
echo 'pnpm lint-staged' > .husky/pre-commit
echo 'npx --no -- commitlint --edit $1' > .husky/commit-msg

# Make hooks executable
chmod +x .husky/*
```

---

## Pull Request Process

### Creating a PR

1. **Push your branch**

   ```bash
   git push -u origin feat/your-feature
   ```

2. **Open PR on GitHub**
   - Base: `develop` (or `main` for hotfixes)
   - Compare: your feature branch

3. **Fill PR template**
   - Title: Same format as commit (`feat(scope): description`)
   - Description: What, why, how
   - Link related issues

4. **Request review** (if team)

5. **Wait for checks to pass**
   - SonarCloud analysis
   - Qodo AI review
   - TypeScript check
   - ESLint
   - Tests

### PR Title Format

Same as commit messages:

```
feat(rider-mobile): add ride request screen
fix(map): resolve marker positioning issue
chore(deps): upgrade react-native to 0.76
```

### PR Checklist

Before requesting review:

- [ ] Branch is rebased on latest `develop`
- [ ] All commits follow convention
- [ ] Code compiles without errors
- [ ] Tests pass locally
- [ ] No console.log/debugger statements
- [ ] Self-reviewed the diff

### Merging PRs

1. **Ensure all checks pass**
2. **Get approvals** (if required)
3. **Squash and merge** or **Rebase and merge**
4. **Delete the branch** after merge

---

## Code Quality Checks

### SonarCloud

Automated static code analysis on every PR.

#### What It Checks

- **Bugs** — Code that will cause runtime errors
- **Vulnerabilities** — Security issues
- **Code Smells** — Maintainability issues
- **Duplications** — Copy-pasted code
- **Coverage** — Test coverage percentage

#### Quality Gate

PRs must pass the quality gate to merge:

- No new bugs
- No new vulnerabilities
- Code smells under threshold
- Coverage not decreased

#### Configuration

```properties
# sonar-project.properties
sonar.organization=your-org
sonar.projectKey=kartuli
sonar.projectName=Kartuli

sonar.sources=apps,packages
sonar.exclusions=**/node_modules/**,**/.expo/**,**/android/**,**/ios/**
sonar.typescript.tsconfigPath=tsconfig.json
```

#### Viewing Results

- **PR Comments**: SonarCloud bot posts summary
- **GitHub Checks**: Pass/fail status
- **Dashboard**: [sonarcloud.io](https://sonarcloud.io) for detailed analysis

### Qodo (AI Code Review)

AI-powered code review on every PR.

#### What It Does

- **Bug Detection** — Finds logic errors humans might miss
- **Test Suggestions** — Recommends missing test cases
- **Security Review** — Flags potential vulnerabilities
- **Code Walkthrough** — Explains changes for reviewers
- **Auto PR Description** — Generates PR summaries

#### How It Works

1. Qodo GitHub App installed on repository
2. When PR opened/updated, Qodo analyzes changes
3. Posts review comments inline on code
4. Provides overall PR summary

#### Responding to Qodo

- 👍 on helpful suggestions
- 👎 on unhelpful suggestions (helps it learn)
- Reply to discuss specific points
- Can dismiss suggestions if not applicable

---

## EAS Build & Deployment

### Build Profiles

```json
// apps/rider-mobile/eas.json
{
  "cli": { "version": ">= 12.0.0" },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "channel": "preview"
    },
    "production": {
      "channel": "production",
      "autoIncrement": true
    }
  },
  "submit": {
    "production": {}
  }
}
```

### Manual Builds

```bash
# Development build
cd apps/rider-mobile
eas build --profile development --platform ios

# Preview build (for testing)
eas build --profile preview --platform all

# Production build
eas build --profile production --platform all
```

### Tag-Triggered Builds

Production builds are triggered by Git tags:

```bash
# Create release tag
git tag -a v1.0.0 -m "Release version 1.0.0"

# Push tag to trigger build
git push origin v1.0.0
```

### Tag Naming Convention

| Tag Format      | Triggers             | Example          |
| --------------- | -------------------- | ---------------- |
| `v*.*.*`        | Both apps production | `v1.0.0`         |
| `rider-v*.*.*`  | Rider app only       | `rider-v1.0.0`   |
| `driver-v*.*.*` | Driver app only      | `driver-v1.0.0`  |
| `*-preview`     | Preview builds       | `v1.0.0-preview` |

### OTA Updates

For JavaScript-only changes (no native code):

```bash
# Push update to production channel
eas update --branch production --message "Fix ride tracking bug"

# Push update to preview channel
eas update --branch preview --message "Testing new feature"
```

---

## CI/CD Pipeline

### Workflow Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         GitHub Events                            │
├─────────────┬─────────────┬─────────────┬─────────────┬─────────┤
│   PR Open   │  PR Update  │ Push Main   │  Push Tag   │ Manual  │
└──────┬──────┴──────┬──────┴──────┬──────┴──────┬──────┴────┬────┘
       │             │             │             │           │
       ▼             ▼             ▼             ▼           ▼
┌──────────────────────────────────────────────────────────────────┐
│                        Quality Checks                             │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐    │
│  │  Lint   │ │  Type   │ │  Test   │ │  Sonar  │ │  Qodo   │    │
│  │ (ESLint)│ │ (TSC)   │ │ (Jest)  │ │ (Cloud) │ │  (AI)   │    │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘    │
└──────────────────────────────────────────────────────────────────┘
                              │
                              ▼ (if checks pass)
┌──────────────────────────────────────────────────────────────────┐
│                        EAS Builds                                 │
│  ┌─────────────────────┐    ┌─────────────────────┐              │
│  │   Preview Build     │    │  Production Build   │              │
│  │  (PR to develop)    │    │    (Push tag)       │              │
│  └─────────────────────┘    └─────────────────────┘              │
└──────────────────────────────────────────────────────────────────┘
                              │
                              ▼ (production only)
┌──────────────────────────────────────────────────────────────────┐
│                      App Store Submit                             │
│  ┌─────────────────────┐    ┌─────────────────────┐              │
│  │   App Store (iOS)   │    │  Play Store (Android)│             │
│  └─────────────────────┘    └─────────────────────┘              │
└──────────────────────────────────────────────────────────────────┘
```

### GitHub Actions Workflows

#### Quality Check (On Every PR)

```yaml
# .github/workflows/quality.yml
name: Quality Check

on:
  pull_request:
    branches: [main, develop]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: pnpm/action-setup@v3
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Lint
        run: pnpm lint

      - name: Type check
        run: pnpm typecheck

      - name: Test
        run: pnpm test --coverage

      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@v3
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```

#### EAS Build (On Tag Push)

```yaml
# .github/workflows/eas-build.yml
name: EAS Build

on:
  push:
    tags:
      - 'v*.*.*'
      - 'rider-v*.*.*'
      - 'driver-v*.*.*'

jobs:
  build-rider:
    if: ${{ !startsWith(github.ref_name, 'driver-') }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v3
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - uses: expo/expo-github-action@v8
        with:
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build Rider App
        working-directory: apps/rider-mobile
        run: eas build --platform all --profile production --non-interactive

  build-driver:
    if: ${{ !startsWith(github.ref_name, 'rider-') }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v3
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - uses: expo/expo-github-action@v8
        with:
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build Driver App
        working-directory: apps/driver-mobile
        run: eas build --platform all --profile production --non-interactive
```

#### Preview Build (On PR to Develop)

```yaml
# .github/workflows/preview.yml
name: Preview Build

on:
  pull_request:
    branches: [develop]
    types: [opened, synchronize]

jobs:
  preview:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v3
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - uses: expo/expo-github-action@v8
        with:
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      # Only build if app code changed
      - name: Check for rider changes
        id: rider-changes
        uses: dorny/paths-filter@v3
        with:
          filters: |
            rider:
              - 'apps/rider-mobile/**'
              - 'packages/**'

      - name: Build Rider Preview
        if: steps.rider-changes.outputs.rider == 'true'
        working-directory: apps/rider-mobile
        run: eas build --platform all --profile preview --non-interactive --no-wait
```

### Required GitHub Secrets

| Secret         | Description        | How to Get                                          |
| -------------- | ------------------ | --------------------------------------------------- |
| `EXPO_TOKEN`   | EAS authentication | Expo dashboard → Account Settings → Access Tokens   |
| `SONAR_TOKEN`  | SonarCloud auth    | SonarCloud → My Account → Security → Generate Token |
| `GITHUB_TOKEN` | Auto-provided      | Automatically available in workflows                |

### Setting Up Secrets

1. Go to GitHub repo → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add each required secret

---

## Quick Reference

### Common Commands

```bash
# Branch operations
git checkout -b feat/new-feature      # Create feature branch
git checkout develop                   # Switch to develop
git branch -d feat/old-feature        # Delete local branch
git push origin --delete feat/old     # Delete remote branch

# Commit operations
git add .                              # Stage all changes
git commit -m "feat(ui): add button"  # Commit with message
git commit --amend                     # Modify last commit
git reset HEAD~1                       # Undo last commit (keep changes)

# Sync operations
git fetch origin                       # Fetch remote changes
git pull                              # Pull with rebase (configured)
git push                              # Push changes
git push --force-with-lease           # Force push (after rebase)

# Rebase operations
git rebase origin/develop             # Rebase on develop
git rebase -i HEAD~5                  # Interactive rebase
git rebase --continue                 # Continue after conflict
git rebase --abort                    # Cancel rebase

# Tag operations
git tag -a v1.0.0 -m "Release 1.0.0" # Create annotated tag
git push origin v1.0.0               # Push tag (triggers build)
git tag -d v1.0.0                    # Delete local tag
git push origin --delete v1.0.0      # Delete remote tag
```

### Branch Naming Cheatsheet

```
feat/     → New feature
fix/      → Bug fix
docs/     → Documentation
style/    → UI/formatting
refactor/ → Code restructuring
perf/     → Performance
test/     → Tests
chore/    → Maintenance
ci/       → CI/CD
build/    → Build config
security/ → Security
wip/      → Work in progress
```

### Commit Message Cheatsheet

```
Type:   feat | fix | docs | style | refactor | perf | test | chore | ci | build | security | wip
Scope:  rider-mobile | driver-mobile | ui | state | api | types | core | hooks | deps | repo
Format: <type>(<scope>): <imperative verb> <what changed>

Examples:
feat(ui): add button component
fix(rider-mobile): resolve map crash
chore(deps): upgrade expo to 54
```

---

## Troubleshooting

### "Branch name doesn't follow convention"

```bash
# Rename your branch
git branch -m old-name feat/proper-name
git push origin -u feat/proper-name
git push origin --delete old-name
```

### "Commit message doesn't follow convention"

```bash
# Amend the last commit message
git commit --amend -m "feat(ui): correct message format"

# For older commits, use interactive rebase
git rebase -i HEAD~3
# Change 'pick' to 'reword' for commits to fix
```

### "Rebase conflict hell"

```bash
# If rebase gets too messy, abort and try merge
git rebase --abort

# Or create a fresh branch and cherry-pick
git checkout develop
git checkout -b feat/fresh-start
git cherry-pick <commit-hashes>
```

### "Pre-push hook failing but branch name is correct"

```bash
# Check the hook file has correct permissions
chmod +x .husky/pre-push

# Check the regex pattern matches your branch
echo "feat/my-branch" | grep -E "^(feat|fix|docs|style|refactor|perf|test|chore|ci|revert|build|security|wip)/[a-z0-9-]+$"
```

### "SonarCloud not posting to PR"

1. Verify `SONAR_TOKEN` secret is set
2. Check SonarCloud project settings → Pull Requests → GitHub integration enabled
3. Ensure `fetch-depth: 0` in checkout action

### "EAS build not triggering on tag"

1. Verify tag format matches workflow filter (`v*.*.*`)
2. Ensure `EXPO_TOKEN` secret is set
3. Check workflow file is on the tagged commit

---

Part of the [Kartuli](../README.md) monorepo
