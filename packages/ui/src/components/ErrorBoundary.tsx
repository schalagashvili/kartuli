import React from 'react';

import { Button, Text, View } from 'react-native';

import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { StyleSheet } from 'react-native-unistyles';

import { logger } from '@kartuli/core';

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  readonly error: Error;
  readonly resetErrorBoundary: () => void;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>😞 Something went wrong</Text>
      <Text style={styles.message}>{error.message}</Text>
      <Button title="Try Again" onPress={resetErrorBoundary} />
    </View>
  );
}

export function ErrorBoundary({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        logger.error('React Error Boundary caught error', {
          error: error.message,
          componentStack: errorInfo.componentStack,
        });
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: theme.fontSizes['2xl'],
    fontWeight: theme.fontWeights.bold,
    fontFamily: theme.fontFamilies.sans,
    color: theme.colors.contentPrimary,
    marginBottom: theme.spacing.sm,
  },
  message: {
    fontSize: theme.fontSizes.md,
    fontFamily: theme.fontFamilies.sans,
    color: theme.colors.contentSecondary,
    marginBottom: theme.spacing.xl,
    textAlign: 'center',
  },
}));
