import { APP_IDENTITY } from '@/constants/app';
import { isRunningInExpoGo } from 'expo';

import { Sentry, env, initMobileSentry } from '@kartuli/core';

const navigationIntegration = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay: !isRunningInExpoGo(),
});

export function initSentry() {
  return initMobileSentry({
    dsn: env.SENTRY_DSN,
    appName: APP_IDENTITY.appName,
    environment: env.APP_ENV,
    integrations: [navigationIntegration],
    replay: {
      maskAllText: true,
      maskAllImages: true,
      maskAllVectors: true,
    },
  });
}

export { Sentry, navigationIntegration };
