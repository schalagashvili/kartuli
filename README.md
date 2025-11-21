# Kartuli Monorepo

Monorepo for the Kartuli mobile apps and shared libraries. Managed with PNPM workspaces and TypeScript.

- **Apps:** `apps/rider-mobile` (Expo / React Native)
- **Packages:** `@kartuli/core`, `@kartuli/ui`, `@kartuli/state`, `@kartuli/types`
- **Tooling:** PNPM, TypeScript, ESLint, Prettier, Husky, lint-staged, Syncpack, Knip

## Requirements

- Node 20+
- PNPM (pinned in `packageManager`: `pnpm@10.21.0`)
- Xcode / Android SDKs for native builds (see app README for Expo/EAS)

## Install

```bash
pnpm install
```

## Common Scripts (root)

- `pnpm type-check` — workspace-wide TS check
- `pnpm deps:mismatch` / `deps:fix` / `deps:format` — dependency hygiene via Syncpack
- `pnpm clean:check` / `clean:fix` — unused code detection via Knip

## Workspaces

- `apps/rider-mobile` — Rider-facing mobile app (Expo Router, Unistyles)
- `packages/core` — environment config, monitoring (Sentry), shared utilities/constants
- `packages/ui` — shared UI components, theming (Unistyles), ErrorBoundary
- `packages/state` — shared state helpers (Zustand)
- `packages/types` — shared types

## Commit Hooks

Husky + lint-staged run ESLint/Prettier on staged files and Syncpack mismatch checks. Fix any reported issues before committing.

## More Docs

See `apps/rider-mobile/README.md` for app-specific setup and `packages/README.md` for package details.
