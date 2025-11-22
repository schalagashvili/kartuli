import * as Sentry from '@sentry/react-native';

import { MobileAppName } from '../types/AppConfig';

export interface MobileSentryConfig {
  dsn?: string;
  environment: string;
  appName: MobileAppName;
  debug?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  integrations?: any[];
  replay?: {
    maskAllText: boolean;
    maskAllImages: boolean;
    maskAllVectors: boolean;
  };
}

export function initMobileSentry({
  dsn,
  environment,
  appName,
  debug = false,
  integrations = [],
}: MobileSentryConfig) {
  if (!dsn) {
    if (debug) console.warn('[Sentry] Skipped: DSN missing');
    return;
  }

  const isProd = environment === 'production';
  const sampleRate = isProd ? 0.2 : 1.0;

  const mobileReplay = Sentry.mobileReplayIntegration({
    maskAllText: true,
    maskAllImages: true,
    maskAllVectors: true,
  });

  Sentry.init({
    dsn,
    environment,
    debug,
    enabled: environment !== 'development',

    tracesSampleRate: sampleRate,
    profilesSampleRate: sampleRate,

    initialScope: {
      tags: { app: appName },
    },

    integrations: (defaults) => [...defaults, mobileReplay, ...integrations],
  });
}

export { Sentry };
