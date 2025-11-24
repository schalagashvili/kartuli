/**
 * Performance test for Button component
 * Tests for unnecessary re-renders caused by styles.useVariants
 */
import React, { useEffect, useRef, useState } from 'react';

import { Text, View } from 'react-native';

import { Button } from '../Button';

// =============================================================================
// RENDER COUNTER COMPONENT
// =============================================================================
export const ButtonRenderCounter = () => {
  const [, forceUpdate] = useState(0);
  const renderCountRef = useRef(0);
  const [count, setCount] = useState(0);

  // Increment render counter
  renderCountRef.current += 1;

  // Log renders in dev
  useEffect(() => {
    console.log(`[ButtonRenderCounter] Render #${renderCountRef.current}`);
  });

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>
        Button Render Count: {renderCountRef.current}
      </Text>

      <Text style={{ fontSize: 14, marginBottom: 20, color: '#666' }}>
        Expected: Should only re-render when props actually change
      </Text>

      {/* Test 1: Static props - should render once */}
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 20 }}>
        Test 1: Static Props (should render once)
      </Text>
      <Button label="Static Button" size="medium" hierarchy="primary" />

      {/* Test 2: Parent re-renders but button props unchanged */}
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 20 }}>
        Test 2: Parent Re-renders (button should NOT re-render)
      </Text>
      <Text>Parent render count: {count}</Text>
      <Button label="Unchanged Props" size="medium" hierarchy="primary" />
      <Button
        label="Force Parent Re-render"
        onPress={() => {
          setCount((c) => c + 1);
          forceUpdate((u) => u + 1);
        }}
      />

      {/* Test 3: Toggle props - should re-render on change */}
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 20 }}>
        Test 3: Toggle Props (should re-render on toggle)
      </Text>
      <TogglePropsTest />

      {/* Test 4: Same props, different references */}
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 20 }}>
        Test 4: Same Props, Different References
      </Text>
      <SamePropsTest />
    </View>
  );
};

// =============================================================================
// TOGGLE PROPS TEST
// =============================================================================
const TogglePropsTest = () => {
  const [loading, setLoading] = useState(false);
  const buttonRenderCount = useRef(0);

  return (
    <View>
      <MonitoredButton
        label="Toggle Loading"
        loading={loading}
        onPress={() => setLoading((l) => !l)}
        onRenderCountChange={(count) => {
          buttonRenderCount.current = count;
        }}
      />
      <Text>Button renders: {buttonRenderCount.current}</Text>
      <Text>Expected: Increments when you click (loading changes)</Text>
    </View>
  );
};

// =============================================================================
// SAME PROPS TEST (Different Object References)
// =============================================================================
const SamePropsTest = () => {
  const [, forceUpdate] = useState(0);
  const buttonRenderCount = useRef(0);

  // ⚠️ Creating new function reference on every render
  const handlePress = () => {
    console.log('Pressed');
  };

  return (
    <View>
      <MonitoredButton
        label="Same Props Button"
        size="medium"
        hierarchy="primary"
        onPress={handlePress} // ⚠️ New reference every render
        onRenderCountChange={(count) => {
          buttonRenderCount.current = count;
        }}
      />
      <Text>Button renders: {buttonRenderCount.current}</Text>
      <Button
        label="Force Parent Re-render"
        onPress={() => forceUpdate((u) => u + 1)}
      />
      <Text style={{ fontSize: 12, color: '#666', marginTop: 5 }}>
        Expected: Should NOT re-render when parent re-renders{'\n'}
        (Button is memoized, onPress change should be ignored)
      </Text>
    </View>
  );
};

// =============================================================================
// MONITORED BUTTON (Tracks Render Count)
// =============================================================================
interface MonitoredButtonProps {
  label: string;
  loading?: boolean;
  size?: 'small' | 'medium' | 'large';
  hierarchy?: 'primary' | 'secondary' | 'tertiary';
  onPress?: () => void;
  onRenderCountChange: (count: number) => void;
}

const MonitoredButton = React.memo<MonitoredButtonProps>(
  ({ onRenderCountChange, ...buttonProps }) => {
    const renderCount = useRef(0);

    useEffect(() => {
      renderCount.current += 1;
      onRenderCountChange(renderCount.current);
      console.log(
        `[MonitoredButton "${buttonProps.label}"] Render #${renderCount.current}`
      );
    });

    return <Button {...buttonProps} />;
  }
);

MonitoredButton.displayName = 'MonitoredButton';

// =============================================================================
// STYLES.USEVARIANTS PERFORMANCE TEST
// =============================================================================
export const UseVariantsPerformanceTest = () => {
  const [activeTab, setActiveTab] = useState<'test1' | 'test2' | 'test3'>(
    'test1'
  );

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
        styles.useVariants Performance Test
      </Text>

      {/* Tab Switcher */}
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <Button
          label="Test 1"
          hierarchy={activeTab === 'test1' ? 'primary' : 'secondary'}
          onPress={() => setActiveTab('test1')}
          style={{ marginRight: 10 }}
        />
        <Button
          label="Test 2"
          hierarchy={activeTab === 'test2' ? 'primary' : 'secondary'}
          onPress={() => setActiveTab('test2')}
          style={{ marginRight: 10 }}
        />
        <Button
          label="Test 3"
          hierarchy={activeTab === 'test3' ? 'primary' : 'secondary'}
          onPress={() => setActiveTab('test3')}
        />
      </View>

      {activeTab === 'test1' && <ManyButtonsTest />}
      {activeTab === 'test2' && <VariantChangesTest />}
      {activeTab === 'test3' && <StressTest />}
    </View>
  );
};

// =============================================================================
// MANY BUTTONS TEST
// Tests if useVariants causes issues with many instances
// =============================================================================
const ManyButtonsTest = () => {
  const [parentRenderCount, setParentRenderCount] = useState(0);
  const startTime = useRef(Date.now());

  useEffect(() => {
    const renderTime = Date.now() - startTime.current;
    console.log(
      `[ManyButtonsTest] Rendered ${parentRenderCount} - took ${renderTime}ms`
    );
    startTime.current = Date.now();
  });

  return (
    <View>
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>
        50 Buttons Test
      </Text>
      <Text style={{ fontSize: 12, color: '#666', marginBottom: 10 }}>
        Check console for render time. Should be &lt;100ms on modern devices.
      </Text>

      <Button
        label={`Force Re-render (${parentRenderCount})`}
        onPress={() => setParentRenderCount((c) => c + 1)}
      />

      <View style={{ marginTop: 10 }}>
        {Array.from({ length: 50 }).map((_, i) => (
          <Button
            key={i}
            label={`Button ${i + 1}`}
            size={i % 3 === 0 ? 'small' : i % 3 === 1 ? 'medium' : 'large'}
            hierarchy={
              i % 3 === 0 ? 'primary' : i % 3 === 1 ? 'secondary' : 'tertiary'
            }
            style={{ marginBottom: 5 }}
          />
        ))}
      </View>
    </View>
  );
};

// =============================================================================
// VARIANT CHANGES TEST
// Tests if changing variants causes efficient re-renders
// =============================================================================
const VariantChangesTest = () => {
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [hierarchy, setHierarchy] = useState<
    'primary' | 'secondary' | 'tertiary'
  >('primary');
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
    console.log(
      `[VariantChangesTest] Button should re-render. Count: ${renderCount.current}`
    );
  });

  return (
    <View>
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>
        Variant Changes Test
      </Text>
      <Text style={{ fontSize: 12, color: '#666', marginBottom: 10 }}>
        Changing size/hierarchy should cause exactly ONE button re-render.
      </Text>

      <Text>Button renders: {renderCount.current}</Text>

      <Button label="Test Button" size={size} hierarchy={hierarchy} />

      <View style={{ marginTop: 20 }}>
        <Text style={{ fontWeight: 'bold' }}>Change Size:</Text>
        <View style={{ flexDirection: 'row', marginTop: 5 }}>
          <Button
            label="Small"
            size="small"
            onPress={() => setSize('small')}
            style={{ marginRight: 5 }}
          />
          <Button
            label="Medium"
            size="small"
            onPress={() => setSize('medium')}
            style={{ marginRight: 5 }}
          />
          <Button label="Large" size="small" onPress={() => setSize('large')} />
        </View>
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={{ fontWeight: 'bold' }}>Change Hierarchy:</Text>
        <View style={{ flexDirection: 'row', marginTop: 5 }}>
          <Button
            label="Primary"
            size="small"
            onPress={() => setHierarchy('primary')}
            style={{ marginRight: 5 }}
          />
          <Button
            label="Secondary"
            size="small"
            onPress={() => setHierarchy('secondary')}
            style={{ marginRight: 5 }}
          />
          <Button
            label="Tertiary"
            size="small"
            onPress={() => setHierarchy('tertiary')}
          />
        </View>
      </View>
    </View>
  );
};

// =============================================================================
// STRESS TEST
// Rapidly changes props to test performance
// =============================================================================
const StressTest = () => {
  const [counter, setCounter] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(
    undefined
  );

  const startStressTest = () => {
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setCounter((c) => c + 1);
    }, 16); // ~60fps
  };

  const stopStressTest = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <View>
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>
        Stress Test (60fps prop changes)
      </Text>
      <Text style={{ fontSize: 12, color: '#666', marginBottom: 10 }}>
        Updates button props 60 times/sec. Should stay smooth.
      </Text>

      <Text>Updates: {counter}</Text>

      <Button
        label={`Dynamic ${counter}`}
        hierarchy={counter % 2 === 0 ? 'primary' : 'secondary'}
        loading={counter % 10 === 0}
        disabled={counter % 15 === 0}
      />

      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <Button
          label={isRunning ? 'Running...' : 'Start Stress Test'}
          onPress={startStressTest}
          disabled={isRunning}
          style={{ marginRight: 10 }}
        />
        <Button
          label="Stop"
          hierarchy="secondary"
          onPress={stopStressTest}
          disabled={!isRunning}
        />
      </View>
    </View>
  );
};
