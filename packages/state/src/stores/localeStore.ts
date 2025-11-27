import type { MMKV } from 'react-native-mmkv';
import { create } from 'zustand';
import type { StateStorage } from 'zustand/middleware';
import { createJSONStorage, persist } from 'zustand/middleware';

import { SUPPORTED_LOCALES, SupportedLocale, i18n } from '@kartuli/core';

const getStorage = (() => {
  let instance: MMKV | undefined;
  return (): MMKV => {
    if (!instance) {
      const { createMMKV } = require('react-native-mmkv');
      instance = createMMKV({ id: 'locale-storage' });
    }
    return instance as MMKV;
  };
})();

const createStateStorage = (): StateStorage => {
  return {
    getItem: (key) => {
      try {
        const value = getStorage().getString(key);
        return value ?? null;
      } catch (error) {
        console.error(
          '[LocaleStore] Failed to get locale from storage:',
          error
        );
        return null;
      }
    },
    setItem: (key, value) => {
      try {
        getStorage().set(key, value);
      } catch (error) {
        console.error('[LocaleStore] Failed to save locale to storage:', error);
      }
    },
    removeItem: (key) => {
      try {
        getStorage().remove(key);
      } catch (error) {
        console.error(
          '[LocaleStore] Failed to remove locale from storage:',
          error
        );
      }
    },
  };
};

interface LocaleState {
  locale: SupportedLocale;
  isHydrated: boolean;
  hasPersistedValue: boolean;
  setLocale: (locale: SupportedLocale) => void;
}

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set) => ({
      locale: 'en',
      isHydrated: false,
      hasPersistedValue: false,

      setLocale: (locale) => {
        if (!SUPPORTED_LOCALES.includes(locale)) {
          console.warn(
            `[LocaleStore] Invalid locale: ${locale}. Falling back to 'en'`
          );
          return;
        }

        set({ locale, hasPersistedValue: true });
        i18n.locale = locale;
      },
    }),
    {
      name: 'locale-storage',
      storage: createJSONStorage(createStateStorage),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error(
            '[LocaleStore] Failed to rehydrate locale store:',
            error
          );
          useLocaleStore.setState({
            isHydrated: true,
            hasPersistedValue: false,
          });
          return;
        }

        if (!state) {
          useLocaleStore.setState({
            isHydrated: true,
            hasPersistedValue: false,
          });
          return;
        }

        if (state.locale) {
          if (SUPPORTED_LOCALES.includes(state.locale)) {
            i18n.locale = state.locale;
            if (state.hasPersistedValue === undefined) {
              state.hasPersistedValue = true;
            }
          } else {
            console.warn(
              `[LocaleStore] Invalid stored locale: ${state.locale}. Resetting to 'en'.`
            );
            state.locale = 'en';
            i18n.locale = 'en';
            state.hasPersistedValue = false;
          }
        }

        state.isHydrated = true;
      },
    }
  )
);

export function setInitialDeviceLocale(locale: SupportedLocale) {
  useLocaleStore.setState({ locale });
  i18n.locale = locale;
}
