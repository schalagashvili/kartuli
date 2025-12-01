import { getLocales } from 'expo-localization';

import { getSupportedLocale, i18n, registerTranslations } from '@kartuli/core';
import { setInitialDeviceLocale, useLocaleStore } from '@kartuli/state';

import type { RiderKey } from './namespaces';
import { namespaces } from './namespaces';

Object.entries(namespaces).forEach(([namespace, translations]) => {
  registerTranslations({
    en: { [namespace]: translations.en },
    ka: { [namespace]: translations.ka },
  });
});

const deviceLocale = getSupportedLocale(getLocales()[0]?.languageCode);

let hasInitialized = false;
useLocaleStore.subscribe((state) => {
  if (state.isHydrated && !hasInitialized) {
    hasInitialized = true;
    if (!state.hasPersistedValue && deviceLocale !== 'en') {
      setInitialDeviceLocale(deviceLocale);
    }
  }
});

export type { RiderKey } from './namespaces';

export const tr = (key: RiderKey): string => i18n.t(`rider.${key}`);
