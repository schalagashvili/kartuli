import type enCommon from './locales/en/common.json';

export type SupportedLocale = 'en' | 'ka';

export const SUPPORTED_LOCALES: SupportedLocale[] = ['en', 'ka'];

export type CommonKey = keyof typeof enCommon;

/**
 * Validates and returns a supported locale from a language code.
 * Falls back to 'en' if the language code is invalid or undefined.
 *
 * @param languageCode - The language code to validate (e.g., from device settings)
 * @returns A valid SupportedLocale
 */
export function getSupportedLocale(
  languageCode: string | undefined | null
): SupportedLocale {
  if (!languageCode) {
    return 'en';
  }

  // Type-safe check without using 'as'
  return (SUPPORTED_LOCALES as readonly string[]).includes(languageCode)
    ? (languageCode as SupportedLocale)
    : 'en';
}
