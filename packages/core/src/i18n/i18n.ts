import { I18n } from 'i18n-js';

import enCommon from './locales/en/common.json';
import kaCommon from './locales/ka/common.json';

export const i18n = new I18n({
  en: { common: enCommon },
  ka: { common: kaCommon },
});

i18n.defaultLocale = 'en';
i18n.enableFallback = true;

// Explicit helper instead of relying on i18n.store()
// (clearer intent, easier to search codebase)
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

// Dev-only missing translation warnings
if (__DEV__) {
  i18n.missingTranslation.register('warn', (_i18n, scope, _options) => {
    console.warn(
      `🔍 Missing translation: "${scope}" for locale "${i18n.locale}"`
    );
    return `[MISSING: ${scope}]`;
  });
  // Activate the registered 'warn' handler
  i18n.missingBehavior = 'warn';
}
