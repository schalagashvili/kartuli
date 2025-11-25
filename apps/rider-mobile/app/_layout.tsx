import '../wdyr';

import { useEffect } from 'react';

import { ActivityIndicator, View } from 'react-native';

import Button24Gallery from '@/app/dev/ButtonGallery';
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
import { useLocaleStore } from '@kartuli/state';
// Initialize Unistyles before importing any UI components
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
  const isHydrated = useLocaleStore((s) => s.isHydrated);

  useEffect(() => {
    if (navigationRef) {
      navigationIntegration.registerNavigationContainer(navigationRef);
    }
  }, [navigationRef]);

  // Wait for locale to be hydrated from storage before rendering
  // This prevents flash of wrong language
  if (!isHydrated) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (FLAGS.SHOW_GALLERY) return <Button24Gallery />;

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
