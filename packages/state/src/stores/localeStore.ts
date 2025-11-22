import type { MMKV } from 'react-native-mmkv';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { SUPPORTED_LOCALES, SupportedLocale, i18n } from '@kartuli/core';

// Lazy initialization - storage is created only when first accessed
let storage: MMKV | undefined;
const getStorage = (): MMKV => {
  if (!storage) {
    // Dynamic import to avoid instantiation at module load time
    const { createMMKV } = require('react-native-mmkv');
    storage = createMMKV({ id: 'locale-storage' });
  }
  // At this point storage is guaranteed to be defined
  return storage as MMKV;
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
        // Validate locale before setting
        if (!SUPPORTED_LOCALES.includes(locale)) {
          console.warn(
            `[LocaleStore] Invalid locale: ${locale}. Falling back to 'en'`
          );
          return;
        }

        // Update state first, then sync i18n
        set({ locale, hasPersistedValue: true });
        i18n.locale = locale;
      },
    }),
    {
      name: 'locale-storage',
      storage: createJSONStorage(() => ({
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
            console.error(
              '[LocaleStore] Failed to save locale to storage:',
              error
            );
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
      })),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error(
            '[LocaleStore] Failed to rehydrate locale store:',
            error
          );
          // Use store API to set hydration flag even on error
          useLocaleStore.setState({
            isHydrated: true,
            hasPersistedValue: false,
          });
          return;
        }

        // State is undefined on first run (no stored data)
        if (!state) {
          // Use store API to mark as hydrated with no persisted value
          useLocaleStore.setState({
            isHydrated: true,
            hasPersistedValue: false,
          });
          return;
        }

        if (state.locale) {
          // Validate stored locale before using it
          if (SUPPORTED_LOCALES.includes(state.locale)) {
            // Sync i18n with the stored locale
            i18n.locale = state.locale;

            // Migration: Handle legacy data that predates hasPersistedValue
            // If we successfully loaded ANY locale from storage and the flag is missing,
            // assume it was a user preference (including explicit English choice)
            if (state.hasPersistedValue === undefined) {
              state.hasPersistedValue = true;
            }
            // Otherwise, respect the persisted flag from storage
          } else {
            console.warn(
              `[LocaleStore] Invalid stored locale: ${state.locale}. Resetting to 'en'.`
            );
            // Reset to default - state is mutable here
            state.locale = 'en';
            i18n.locale = 'en';
            state.hasPersistedValue = false;
          }
        }

        // Mark as hydrated
        state.isHydrated = true;
      },
    }
  )
);

/**
 * Internal helper for setting initial locale from device settings
 * Only to be used during app initialization, not exposed in public API
 * @internal
 */
export function setInitialDeviceLocale(locale: SupportedLocale) {
  useLocaleStore.setState({ locale });
  i18n.locale = locale;
}
