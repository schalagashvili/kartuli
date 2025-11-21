# Shared Packages

Overview of the reusable libraries published from this monorepo.

## @kartuli/core (`packages/core`)

- Environment validation via Zod (`packages/core/src/config/env.ts`)
- Monitoring helpers (Sentry mobile init)
- Shared constants, utilities, and logger export

## @kartuli/ui (`packages/ui`)

- Shared React Native UI components (e.g., Button, ErrorBoundary)
- Theme system using Unistyles (`theme/unistyles.ts` must be imported by apps)
- Depends on `@kartuli/core` and `@kartuli/types`

## @kartuli/state (`packages/state`)

- State utilities built on Zustand
- Depends on `@kartuli/types`

## @kartuli/types (`packages/types`)

- Central TypeScript types for the other packages

### Working with packages

- Install deps at the repo root: `pnpm install`
- Type-check a package: `pnpm --filter <package-name> type-check` (where available)
- Packages are linked with `workspace:*` and resolved by PNPM; no additional setup is needed after root install.
