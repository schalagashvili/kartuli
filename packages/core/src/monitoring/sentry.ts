import * as Sentry from '@sentry/react-native';

export type MobileAppName = 'rider';

export interface MobileSentryConfig {
  dsn?: string;
  environment: string;
  appName: MobileAppName;
  debug?: boolean;
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
  console.log('holaa');
  // if (!dsn) {
  //   if (debug) console.warn('[Sentry] Skipped: DSN missing');
  //   return;
  // }

  const isProd = environment === 'production';
  const sampleRate = isProd ? 0.2 : 1.0;

  const mobileReplay = Sentry.mobileReplayIntegration({
    maskAllText: true,
    maskAllImages: true,
    maskAllVectors: true,
  });

  console.log({ dsn });
  Sentry.init({
    dsn,
    environment,
    // debug,
    // enabled: environment !== 'development',

    tracesSampleRate: sampleRate,
    profilesSampleRate: sampleRate,

    initialScope: {
      tags: { app: appName },
    },

    integrations: (defaults) => [...defaults, mobileReplay, ...integrations],
  });

  if (debug) {
    console.log(`[Sentry] Initialized for ${appName} (${environment})`);
  }
}

export { Sentry };
