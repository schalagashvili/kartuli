import { useCallback, useMemo } from 'react';

import { CommonKey, i18n } from '@kartuli/core';

import { useLocaleStore } from '../stores/localeStore';

export function useTranslation() {
  const locale = useLocaleStore((s) => s.locale);
  const setLocale = useLocaleStore((s) => s.setLocale);

  const t = useMemo(() => i18n.t.bind(i18n), []);

  const tc = useCallback(
    (key: CommonKey): string => i18n.t(`common.${key}`),
    []
  );

  return useMemo(
    () => ({ locale, setLocale, t, tc }),
    [locale, setLocale, t, tc]
  );
}
