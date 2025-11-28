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
    padding: theme.spacing.inset.xl,
    backgroundColor: theme.colors.background.primary,
  },
  title: {
    ...theme.typography.heading.h2,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.stack.sm,
  },
  message: {
    ...theme.typography.body.medium,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.stack.md,
    textAlign: 'center',
  },
}));
