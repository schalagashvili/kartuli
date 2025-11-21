# Kartuli Rider Mobile (Expo)

Expo Router app for the rider experience, using Unistyles for theming and shared packages from this monorepo.

## Requirements

- Node 20+, PNPM (pinned in root `packageManager`)
- Xcode / Android SDKs for simulators or device builds
- EAS CLI for remote builds (`npm i -g eas-cli`) if needed

## Setup

1. Install deps from the repo root:

```bash
pnpm install
```

2. Environment vars  
   Create `.env.development` (`preview` and `production`) with `EXPO_PUBLIC_*` keys. See `apps/rider-mobile/.env.development` for required fields (API URL, Google Maps key, Supabase keys, Sentry DSN, etc.).  
   Runtime variants are selected via `APP_VARIANT` (see `eas.json`).

3. Unistyles config  
   Already imported via `apps/rider-mobile/index.ts` and Babel plugin (`apps/rider-mobile/babel.config.js`).

4. Sentry  
   Provide `SENTRY_AUTH_TOKEN` for build-time symbol uploads (set as an EAS secret). Runtime DSN comes from `EXPO_PUBLIC_SENTRY_DSN`.

## Typical Commands

- Start dev server (development variant):  
  `pnpm --filter @kartuli/rider-mobile dev`
- Run platform builds locally:  
  `pnpm --filter @kartuli/rider-mobile ios` or `android`
- Expo web:  
  `pnpm --filter @kartuli/rider-mobile web`
- Lint / Type-check:  
  `pnpm --filter @kartuli/rider-mobile lint`  
  `pnpm --filter @kartuli/rider-mobile type-check`
- EAS builds:  
  `pnpm --filter @kartuli/rider-mobile eas:build:dev|preview|prod` (remote)  
  `pnpm --filter @kartuli/rider-mobile eas:local:dev|preview|prod` (local iOS)

## Project Notes

- Routing: Expo Router inside `app/`.
- Theming: Unistyles + shared tokens from `@kartuli/ui/theme`.
- Shared deps: `@kartuli/core`, `@kartuli/ui`, `@kartuli/state`, `@kartuli/types` are linked via PNPM workspaces.
- Sentry: initialized in `app/_layout.tsx` via `@/sentry`; uses `SENTRY_AUTH_TOKEN` during builds for symbol/source map upload.
