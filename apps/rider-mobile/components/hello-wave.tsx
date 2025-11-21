import React, { useEffect } from 'react';

import { Text, View } from 'react-native';

import { usePostHog } from 'posthog-react-native';

import { Sentry } from '@kartuli/core';
import { Button } from '@kartuli/ui';

const HelloWave = () => {
  const posthog = usePostHog();

  useEffect(() => {
    posthog.capture('event_name');
  }, [posthog]);

  return (
    <View style={{ padding: 20 }}>
      <Button
        fullWidth
        onPress={() => {
          Sentry.captureException(new Error('First error on button'));
        }}
      >
        Hello new button
      </Button>
      <Button
        kind="danger"
        shape="round"
        onPress={() => {
          Sentry.captureException(new Error('Second error on button'));
        }}
      >
        Danger button
      </Button>
      <Button
        kind="minimal"
        size="compact"
        onPress={() => {
          Sentry.captureException(new Error('Third error on button'));
        }}
      >
        Minimal Compact
      </Button>
      <Button
        kind="secondary"
        size="large"
        onPress={() => {
          Sentry.captureException(new Error('Fourth error on button'));
        }}
      >
        Secondary Large
      </Button>
      <Button disabled fullWidth>
        Disabled Button
      </Button>
      <Button isLoading>Loading Button</Button>
      <Button
        startEnhancer={() => <Text style={{ color: 'white' }}>🚀</Text>}
        endEnhancer={() => <Text style={{ color: 'white' }}>➡️</Text>}
        onPress={() => {
          Sentry.captureException(new Error('Fifth error on button'));
        }}
      >
        With Enhancers
      </Button>
      <Button
        kind="tertiary"
        shape="round"
        fullWidth
        onPress={() => {
          Sentry.captureException(new Error('Sixth error on button'));
        }}
      >
        Tertiary Round FullWidth
      </Button>
      <Button
        kind="primary"
        size="large"
        shape="round"
        onPress={() => {
          Sentry.captureException(new Error('Seventh error on button'));
        }}
      >
        Primary Large Round
      </Button>
      <Button
        kind="danger"
        size="compact"
        onPress={() => {
          Sentry.captureException(new Error('Eighth error on button'));
        }}
      >
        Danger Compact
      </Button>
    </View>
  );
};

export { HelloWave };

HelloWave.whyDidYouRender = true;
