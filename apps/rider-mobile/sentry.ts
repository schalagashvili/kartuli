import { isRunningInExpoGo } from 'expo';

import { Sentry, env, initMobileSentry } from '@kartuli/core';

export { Sentry, navigationIntegration };

const navigationIntegration = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay: !isRunningInExpoGo(),
});

export function initSentry() {
  return initMobileSentry({
    dsn: env.SENTRY_DSN,
    // TODO: set correct  app name based on build variant
    appName: 'rider',
    environment: env.APP_ENV,
    integrations: [navigationIntegration],
    replay: {
      maskAllText: true,
      maskAllImages: true,
      maskAllVectors: true,
    },
  });
}
