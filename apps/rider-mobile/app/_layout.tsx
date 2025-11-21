import '../wdyr';

import { useEffect } from 'react';

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

function RootLayout() {
  const colorScheme = useColorScheme();
  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    if (navigationRef) {
      navigationIntegration.registerNavigationContainer(navigationRef);
    }
  }, [navigationRef]);

  return (
    <PostHogProvider
      apiKey={env.POSTHOG_API_KEY}
      options={{ host: env.POSTHOG_HOST }}
    >
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
