import { z } from 'zod';

const envSchema = z.object({
  API_URL: z.string().url('API_URL must be a valid URL'),
  GOOGLE_MAPS_API_KEY: z.string().min(1, 'Google Maps API key is required'),

  SUPABASE_URL: z.string().url('Supabase URL must be a valid URL'),
  SUPABASE_ANON_KEY: z.string().min(1, 'Supabase anon key is required'),

  SENTRY_DSN: z.string().url().optional(),
  ENABLE_WDYR: z.boolean().default(false),
  ENABLE_DEBUG_LOGS: z.boolean().default(false),

  POSTHOG_API_KEY: z.string().min(1, 'PostHog API key is required'),
  POSTHOG_HOST: z.string().url('PostHog host must be a valid URL'),

  APP_ENV: z
    .enum(['development', 'preview', 'production'])
    .default('development'),
});

const rawEnv = {
  API_URL: process.env.EXPO_PUBLIC_API_URL,
  GOOGLE_MAPS_API_KEY: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,

  SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL,
  SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,

  SENTRY_DSN: process.env.EXPO_PUBLIC_SENTRY_DSN,

  ENABLE_WDYR: process.env.EXPO_PUBLIC_ENABLE_WDYR === 'true',
  ENABLE_DEBUG_LOGS: process.env.EXPO_PUBLIC_ENABLE_DEBUG_LOGS === 'true',

  POSTHOG_API_KEY: process.env.EXPO_PUBLIC_POSTHOG_API_KEY,
  POSTHOG_HOST: process.env.EXPO_PUBLIC_POSTHOG_HOST,

  APP_ENV: process.env.EXPO_PUBLIC_APP_ENV,
};

let parsed: z.infer<typeof envSchema>;

try {
  parsed = envSchema.parse(rawEnv);
} catch (error) {
  if (error instanceof z.ZodError) {
    const issues = error.issues
      .map((issue) => {
        const path = issue.path.join('.');
        return `  • ${path}: ${issue.message}`;
      })
      .join('\n');

    const errorMessage = [
      '\n❌ INVALID ENVIRONMENT CONFIGURATION',
      '\n' + issues,
      '\n💡 Fix:',
      '  1. Check your .env file in the app directory',
      '  2. Ensure all EXPO_PUBLIC_* variables are set',
      '  3. Restart Metro bundler after fixing',
      '\n',
    ].join('\n');

    if (__DEV__) {
      console.error(errorMessage);
    }

    throw new Error(errorMessage);
  }

  throw error;
}

export const Env = parsed;
export type EnvConfig = z.infer<typeof envSchema>;

export const {
  API_URL,
  GOOGLE_MAPS_API_KEY,
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  POSTHOG_API_KEY,
  POSTHOG_HOST,
  SENTRY_DSN,
  ENABLE_WDYR,
  ENABLE_DEBUG_LOGS,
  APP_ENV,
} = Env;

export const IS_DEV = APP_ENV === 'development';
export const IS_STAGING = APP_ENV === 'preview';
export const IS_PROD = APP_ENV === 'production';

export const Features = {
  showDevMenu: IS_DEV && ENABLE_DEBUG_LOGS,
  enableWDYR: IS_DEV && ENABLE_WDYR,

  enableSentry: (IS_STAGING || IS_PROD) && !!SENTRY_DSN,
} as const;
