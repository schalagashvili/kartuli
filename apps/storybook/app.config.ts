// app.config.ts
import type { ConfigContext, ExpoConfig } from 'expo/config';

const IS_STORYBOOK = process.env.STORYBOOK_ENABLED === 'true';
const APP_VARIANT = process.env.EXPO_PUBLIC_APP_VARIANT ?? 'development';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Kartuli Storybook',
  slug: 'kartuli-storybook',
  version: '1.0.0',
  owner: 'schalagashvili2',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: `kartuli-${APP_VARIANT}`,

  ios: {
    bundleIdentifier: 'com.kartuli.storybook',
    supportsTablet: false,
  },

  android: {
    package: 'com.kartuli.storybook',
  },

  extra: {
    eas: {
      isStorybook: IS_STORYBOOK,
      appVariant: APP_VARIANT,
      projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
    },
  },
  runtimeVersion: {
    policy: 'appVersion',
  },

  updates: {
    url: 'https://u.expo.dev/bdf24704-8265-49d3-af37-4be004e2ae05',
  },
});
