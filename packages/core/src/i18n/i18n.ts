import { I18n } from 'i18n-js';

import enCommon from './locales/en/common.json';
import kaCommon from './locales/ka/common.json';

export const i18n = new I18n({
  en: { common: enCommon },
  ka: { common: kaCommon },
});

i18n.defaultLocale = 'en';
i18n.enableFallback = true;

export function registerTranslations(
  translations: Record<string, Record<string, Record<string, string>>>
) {
  for (const [locale, namespaces] of Object.entries(translations)) {
    i18n.translations[locale] = {
      ...i18n.translations[locale],
      ...namespaces,
    };
  }
}

if (__DEV__) {
  i18n.missingTranslation.register('warn', (_i18n, scope, _options) => {
    console.warn(
      `🔍 Missing translation: "${scope}" for locale "${i18n.locale}"`
    );
    return `[MISSING: ${scope}]`;
  });
  i18n.missingBehavior = 'warn';
}
