import { useCallback, useMemo } from 'react';

import { CommonKey, i18n } from '@kartuli/core';

import { useLocaleStore } from '../stores/localeStore';

export function useTranslation() {
  // Optimized: separate selectors for stable references
  const locale = useLocaleStore((s) => s.locale);
  const setLocale = useLocaleStore((s) => s.setLocale);

  // Memoize bound function to prevent recreation on every render
  const t = useMemo(() => i18n.t.bind(i18n), []);

  // Memoize translation helper to prevent recreation
  const tc = useCallback(
    (key: CommonKey): string => i18n.t(`common.${key}`),
    []
  );

  // Memoize the entire return object to prevent unnecessary re-renders in consumers
  return useMemo(
    () => ({ locale, setLocale, t, tc }),
    [locale, setLocale, t, tc]
  );
}
