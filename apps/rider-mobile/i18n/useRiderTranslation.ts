import { useTranslation } from '@kartuli/state';

import type { RiderKey } from './namespaces';

export function useRiderTranslation() {
  const { locale, setLocale, t, tc } = useTranslation();

  return {
    locale,
    setLocale,
    tc,
    // Rider-specific translation helper
    tr: (key: RiderKey): string => t(`rider.${key}`),
  };
}
