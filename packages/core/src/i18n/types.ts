import type enCommon from './locales/en/common.json';

export type SupportedLocale = 'en' | 'ka';

export const SUPPORTED_LOCALES: SupportedLocale[] = ['en', 'ka'];

export type CommonKey = keyof typeof enCommon;

export function getSupportedLocale(
  languageCode: string | undefined | null
): SupportedLocale {
  if (!languageCode) {
    return 'en';
  }

  return (SUPPORTED_LOCALES as readonly string[]).includes(languageCode)
    ? (languageCode as SupportedLocale)
    : 'en';
}
