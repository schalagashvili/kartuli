import React from 'react';

import { Button, StyleSheet, Text, View } from 'react-native';

import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

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

export function ErrorBoundary({ children }: { children: React.ReactNode }) {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
});
