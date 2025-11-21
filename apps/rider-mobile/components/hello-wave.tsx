import React from 'react';

import { Pressable, Text, View } from 'react-native';

import { Sentry, env } from '@kartuli/core';
import { Button } from '@kartuli/ui';

const Counter = ({
  count,
  onIncrement,
}: {
  count: number;
  onIncrement: () => void;
}) => {
  return (
    <View style={{ marginTop: 10 }}>
      <Text style={{ fontSize: 18 }}>Count: {count}</Text>
      <Pressable
        style={{
          marginTop: 5,
          padding: 10,
          backgroundColor: '#007AFF',
          borderRadius: 5,
        }}
        onPress={onIncrement}
      >
        <Text style={{ color: 'white' }}>Increment</Text>
      </Pressable>
      <Button
        fullWidth
        onPress={() => {
          Sentry.captureException(new Error('First error on button'));
        }}
      >
        Hello new button
      </Button>
    </View>
  );
};
Counter.whyDidYouRender = true;

// Another child with object props (causes re-renders)
const DisplayInfo = ({
  user,
  config,
}: {
  user: { name: string; age: number };
  config: { theme: string };
}) => {
  // console.log('DisplayInfo rendered');
  return (
    <View style={{ marginTop: 10, padding: 10, backgroundColor: '#f0f0f0' }}>
      <Text>
        User: {user.name} (Age: {user.age})
      </Text>
      <Text>Theme: {config.theme}</Text>
      <Text>Env: {env.APP_ENV}</Text>
    </View>
  );
};
DisplayInfo.whyDidYouRender = true;

// Toggle component
const Toggle = ({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: () => void;
}) => {
  // console.log('Toggle rendered', enabled);
  return (
    <Pressable
      style={{
        marginTop: 10,
        padding: 10,
        backgroundColor: enabled ? '#34C759' : '#FF3B30',
        borderRadius: 5,
      }}
      onPress={onToggle}
    >
      <Text style={{ color: 'white' }}>
        {enabled ? 'Enabled ✓' : 'Disabled ✗'}
      </Text>
    </Pressable>
  );
};
Toggle.whyDidYouRender = true;

const HelloWave = () => {
  // const [count, setCount] = React.useState(0);
  // const [user, setUser] = React.useState({ name: 'John', age: 25 });
  // const [enabled, setEnabled] = React.useState(true);
  // const [timer, setTimer] = React.useState(0);

  // Intentionally creating new objects on every render (bad practice)
  // const config = { theme: 'light' };

  // Intentionally creating new function on every render (bad practice)
  // const handleIncrement = () => {
  //   setCount((c) => c + 1);
  // };

  // Effect that updates timer every second
  // React.useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTimer((t) => t + 1);
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  // Effect with console.log to debug
  // React.useEffect(() => {
  //   // console.log('HelloWave effect: count changed', count);
  // }, [count]);

  return (
    <View style={{ padding: 20 }}>
      {/* <Animated.Text
        style={{
          fontSize: 28,
          lineHeight: 32,
          marginTop: -6,
          animationName: {
            '50%': { transform: [{ rotate: '25deg' }] },
          },
          animationIterationCount: 4,
          animationDuration: '300ms',
        }}
      >
        👋 Timer
      </Animated.Text>

      <Counter count={count} onIncrement={handleIncrement} />

      <DisplayInfo user={user} config={config} />

      <Toggle enabled={enabled} onToggle={() => setEnabled(!enabled)} />

      <Pressable
        style={{
          marginTop: 10,
          padding: 10,
          backgroundColor: '#FF9500',
          borderRadius: 5,
        }}
        onPress={() => setUser({ ...user, age: user.age + 1 })}
      >
        <Text style={{ color: 'white' }}>Age Up</Text>
      </Pressable>

      <Text style={{ marginTop: 10, fontSize: 12, color: '#666' }}>
        Open debugger and watch WDYR logs!
      </Text> */}

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
