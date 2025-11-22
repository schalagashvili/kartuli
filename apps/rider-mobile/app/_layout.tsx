import '../wdyr';

import { useEffect } from 'react';

import ButtonGallery from '@/app/dev/ButtonGallery';
import { FLAGS } from '@/config/flags';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Sentry, initSentry, navigationIntegration } from '@/sentry';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { Stack, useNavigationContainerRef } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PostHogProvider } from 'posthog-react-native';
import 'react-native-reanimated';

import { env } from '@kartuli/core';
import { ErrorBoundary } from '@kartuli/ui';

initSentry();

export const unstable_settings = {
  anchor: '(tabs)',
};

enum AppEnv {
  Development = 'development',
  Preview = 'preview',
  Production = 'production',
}

const PostHogConfig = {
  host: env.POSTHOG_HOST,
  disabled: env.APP_ENV === AppEnv.Development,
};

function RootLayout() {
  const colorScheme = useColorScheme();
  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    if (navigationRef) {
      navigationIntegration.registerNavigationContainer(navigationRef);
    }
  }, [navigationRef]);

  if (FLAGS.SHOW_GALLERY) return <ButtonGallery />;

  return (
    <PostHogProvider apiKey={env.POSTHOG_API_KEY} options={PostHogConfig}>
      <ErrorBoundary>
        <ThemeProvider
          value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="modal"
              options={{ presentation: 'modal', title: 'Modal' }}
            />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </ErrorBoundary>
    </PostHogProvider>
  );
}

export default Sentry.wrap(RootLayout);
