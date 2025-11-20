// packages/core/src/config/env.ts
import { z } from 'zod';

/**
 * Environment variable schema with validation
 *
 * ⚠️ CRITICAL: Each variable must be explicitly listed
 * due to Expo's Babel static replacement of process.env
 */
const envSchema = z.object({
  // ===== CORE (Required for app to function) =====
  API_URL: z.string().url('API_URL must be a valid URL'),
  GOOGLE_MAPS_API_KEY: z.string().min(1, 'Google Maps API key is required'),

  // ===== SUPABASE (Backend) =====
  SUPABASE_URL: z.string().url('Supabase URL must be a valid URL'),
  SUPABASE_ANON_KEY: z.string().min(1, 'Supabase anon key is required'),

  // ===== TBC BANK (Optional - only needed when implementing payments) =====
  TBC_API_URL: z.string().url().optional(),
  TBC_ENVIRONMENT: z.enum(['sandbox', 'production']).default('sandbox'),

  // ===== SENTRY (Optional - only needed when error tracking is set up) =====
  SENTRY_DSN: z.string().url().optional(),

  // ===== FEATURE FLAGS (Development helpers) =====
  ENABLE_WDYR: z.boolean().default(false),
  ENABLE_DEBUG_LOGS: z.boolean().default(false),

  // ===== ENVIRONMENT =====
  APP_ENV: z
    .enum(['development', 'preview', 'production'])
    .default('development'),
});

/**
 * Manual construction (required for Babel/Expo)
 * Cannot use Object.keys(process.env) or destructuring
 */
const rawEnv = {
  API_URL: process.env.EXPO_PUBLIC_API_URL,
  GOOGLE_MAPS_API_KEY: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,

  SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL,
  SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,

  TBC_API_URL: process.env.EXPO_PUBLIC_TBC_API_URL,
  TBC_ENVIRONMENT: process.env.EXPO_PUBLIC_TBC_ENVIRONMENT,

  SENTRY_DSN: process.env.EXPO_PUBLIC_SENTRY_DSN,

  // Boolean conversion: string "true" → boolean true
  ENABLE_WDYR: process.env.EXPO_PUBLIC_ENABLE_WDYR === 'true',
  ENABLE_DEBUG_LOGS: process.env.EXPO_PUBLIC_ENABLE_DEBUG_LOGS === 'true',

  APP_ENV: process.env.EXPO_PUBLIC_APP_ENV,
};

/**
 * 🛡️ WORLD-CLASS ERROR FORMATTING
 *
 * Instead of showing a raw Zod error JSON blob on React Native's
 * red screen, we format it into a readable list of issues.
 */
let parsed: z.infer<typeof envSchema>;

try {
  parsed = envSchema.parse(rawEnv);
} catch (error) {
  if (error instanceof z.ZodError) {
    // Format each error into a readable line
    const issues = error.issues
      .map((issue) => {
        const path = issue.path.join('.');
        return `  • ${path}: ${issue.message}`;
      })
      .join('\n');

    // Create a helpful error message
    const errorMessage = [
      '\n❌ INVALID ENVIRONMENT CONFIGURATION',
      '\n' + issues,
      '\n💡 Fix:',
      '  1. Check your .env file in the app directory',
      '  2. Ensure all EXPO_PUBLIC_* variables are set',
      '  3. Restart Metro bundler after fixing',
      '\n',
    ].join('\n');

    // In development, also log to console for better visibility
    if (__DEV__) {
      console.error(errorMessage);
    }

    // throw new Error(errorMessage);
  }

  // Re-throw if it's not a Zod error
  throw error;
}

/**
 * Validated environment configuration
 */
export const Env = parsed;

/**
 * Export type for use in other files
 */
export type EnvConfig = z.infer<typeof envSchema>;

/**
 * ===== CONVENIENCE EXPORTS =====
 * Destructure commonly used values for cleaner imports
 */
export const {
  API_URL,
  GOOGLE_MAPS_API_KEY,
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  TBC_API_URL,
  TBC_ENVIRONMENT,
  SENTRY_DSN,
  ENABLE_WDYR,
  ENABLE_DEBUG_LOGS,
  APP_ENV,
} = Env;

/**
 * ===== ENVIRONMENT HELPERS =====
 * Convenient boolean flags for environment checks
 */
export const IS_DEV = APP_ENV === 'development';
export const IS_STAGING = APP_ENV === 'preview';
export const IS_PROD = APP_ENV === 'production';

/**
 * ===== FEATURE FLAGS =====
 * Computed feature availability based on environment
 */
export const Features = {
  // Debug tools only in development
  showDevMenu: IS_DEV && ENABLE_DEBUG_LOGS,
  enableWDYR: IS_DEV && ENABLE_WDYR,

  // Sentry only in staging/production
  enableSentry: (IS_STAGING || IS_PROD) && !!SENTRY_DSN,

  // TBC payments only when configured
  enablePayments: !!TBC_API_URL,
} as const;
