import { MMKV } from 'react-native-mmkv';
import { create } from 'zustand';
import {
  type StateStorage,
  createJSONStorage,
  persist,
} from 'zustand/middleware';

import { SUPPORTED_LOCALES, type SupportedLocale, i18n } from '@kartuli/core';

let storageInstance: MMKV | undefined;

const getStorage = (): MMKV => {
  if (!storageInstance) {
    const { MMKV } = require('react-native-mmkv');
    storageInstance = new MMKV({ id: 'locale-storage' });
  }
  return storageInstance!;
};

const localeStorageAdapter: StateStorage = {
  getItem: (key) => {
    try {
      const value = getStorage().getString(key);
      return value ?? null;
    } catch (error) {
      console.error('[LocaleStore] Failed to get locale:', error);
      return null;
    }
  },
  setItem: (key, value) => {
    try {
      getStorage().set(key, value);
    } catch (error) {
      console.error('[LocaleStore] Failed to set locale:', error);
    }
  },
  removeItem: (key) => {
    try {
      getStorage().remove(key);
    } catch (error) {
      console.error('[LocaleStore] Failed to delete locale:', error);
    }
  },
};

interface LocaleState {
  locale: SupportedLocale;
  isHydrated: boolean;
  setLocale: (locale: SupportedLocale) => void;
}

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set) => ({
      locale: 'en',
      isHydrated: false,

      setLocale: (locale) => {
        if (!SUPPORTED_LOCALES.includes(locale)) {
          console.warn(`[LocaleStore] Unsupported locale: ${locale}`);
          return;
        }
        i18n.locale = locale;
        set({ locale });
      },
    }),
    {
      name: 'locale-storage',
      storage: createJSONStorage(() => localeStorageAdapter),
      onRehydrateStorage: () => (state) => {
        if (!state) {
          return;
        }

        if (state.locale && !SUPPORTED_LOCALES.includes(state.locale)) {
          console.warn(
            `[LocaleStore] Invalid stored locale: ${state.locale}. Resetting.`
          );
          state.locale = 'en';
        }

        i18n.locale = state.locale;

        state.isHydrated = true;
      },
    }
  )
);

export function setInitialDeviceLocale(locale: SupportedLocale) {
  const current = useLocaleStore.getState();
  if (!current.isHydrated) {
    useLocaleStore.setState({ locale });
    i18n.locale = locale;
  }
}
