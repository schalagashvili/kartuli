import { getLocales } from 'expo-localization';

import { getSupportedLocale, i18n, registerTranslations } from '@kartuli/core';
import { setInitialDeviceLocale, useLocaleStore } from '@kartuli/state';

import type { RiderKey } from './namespaces';
import { namespaces } from './namespaces';

// Register all app namespaces from the registry
// This automatically registers all namespaces defined in namespaces.ts
Object.entries(namespaces).forEach(([namespace, translations]) => {
  registerTranslations({
    en: { [namespace]: translations.en },
    ka: { [namespace]: translations.ka },
  });
});

// Set device locale as initial value (will be overridden by hydration if user has saved preference)
const deviceLocale = getSupportedLocale(getLocales()[0]?.languageCode);

// Use a subscription to handle initial locale after hydration completes
let hasInitialized = false;
useLocaleStore.subscribe((state) => {
  if (state.isHydrated && !hasInitialized) {
    hasInitialized = true;
    // Only apply device locale if user has NO stored preference
    // This prevents overwriting an explicit English choice
    if (!state.hasPersistedValue && deviceLocale !== 'en') {
      setInitialDeviceLocale(deviceLocale);
    }
  }
});

// Re-export types and helpers from namespaces
export type { RiderKey } from './namespaces';

// Export translation helper function - uses i18n instance which is synced with locale store
export const tr = (key: RiderKey): string => i18n.t(`rider.${key}`);
