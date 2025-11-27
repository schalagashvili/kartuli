/**
 * CheckboxGallery - Development Only
 *
 * A comprehensive, interactive gallery for testing all Checkbox variants.
 * Features global state toggles to test Disabled/Error across all checkboxes.
 * Includes performance monitoring to detect unnecessary re-renders.
 *
 * Setup:
 * 1. Place at: apps/rider-mobile/app/dev/checkbox-gallery.tsx
 * 2. In _layout.tsx, add dev route (see bottom of file)
 */
import React, { useEffect, useRef, useState } from 'react';

import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

import { ComponentPerfMonitor } from '@/app/dev/components/ComponentPerfMonitor';
import { ScreenPerfMonitor } from '@/app/dev/components/ScreenPerfMonitor';

import { Checkbox as BaseCheckbox, Button } from '@kartuli/ui';

// =============================================================================
// INSTRUMENTED CHECKBOX (shows last render time)
// Uses ref + separate display component to avoid re-render cascade
// =============================================================================

type DevCheckboxProps = React.ComponentProps<typeof BaseCheckbox>;

interface MetricsDisplayProps {
  metricsRef: React.RefObject<{
    duration: number;
    phase: string;
    renderCount: number;
  }>;
}

// Separate component that polls the ref for display updates
const MetricsDisplay = ({ metricsRef }: MetricsDisplayProps) => {
  const [displayMetrics, setDisplayMetrics] = useState(metricsRef.current);

  useEffect(() => {
    const interval = setInterval(() => {
      if (metricsRef.current.renderCount !== displayMetrics.renderCount) {
        setDisplayMetrics({ ...metricsRef.current });
      }
    }, 500); // Poll every 500ms, not every frame

    return () => clearInterval(interval);
  }, [metricsRef, displayMetrics]);

  const metrics = metricsRef.current;
  if (!metrics) {
    return (
      <Text style={styles.renderTime} numberOfLines={1}>
        render...
      </Text>
    );
  }
  const { phase, duration, renderCount } = metrics;
  return (
    <Text style={styles.renderTime} numberOfLines={1}>
      {phase} {duration.toFixed(1)}ms{' '}
      <Text style={styles.renderCount}>#{renderCount}</Text>
    </Text>
  );
};

const Checkbox = (props: DevCheckboxProps) => {
  const metricsRef = useRef({
    duration: 0,
    phase: 'mount',
    renderCount: 0,
  });

  const handleRender: React.ProfilerOnRenderCallback = (
    _id,
    phase,
    actualDuration
  ) => {
    // Store in ref - no state update, no re-render cascade
    metricsRef.current = {
      duration: actualDuration,
      phase,
      renderCount: metricsRef.current.renderCount + 1,
    };
  };

  const labelForId =
    (typeof props.label === 'string' && props.label) ||
    props.accessibilityLabel ||
    'checkbox';

  return (
    <View style={styles.instrumentedCheckbox}>
      <React.Profiler id={`checkbox-${labelForId}`} onRender={handleRender}>
        <BaseCheckbox
          {...props}
          style={[props.style, { width: 'auto', flex: 1 }]}
        />
      </React.Profiler>
      <MetricsDisplay metricsRef={metricsRef} />
    </View>
  );
};

// =============================================================================
// SECTION HELPERS
// =============================================================================

const Section = ({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {description && (
      <Text style={styles.sectionDescription}>{description}</Text>
    )}
    <View style={styles.sectionContent}>{children}</View>
  </View>
);

const Row = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.row}>{children}</View>
);

const ControlRow = ({
  label,
  value,
  onValueChange,
}: {
  label: string;
  value: boolean;
  onValueChange: (val: boolean) => void;
}) => (
  <View style={styles.controlRow}>
    <Text style={styles.controlLabel}>{label}</Text>
    <Switch value={value} onValueChange={onValueChange} />
  </View>
);

// =============================================================================
// SMART STATE WRAPPER
// Handles local checked AND indeterminate state so gallery items don't get stuck
// =============================================================================

interface CheckboxStateWrapperProps
  extends Omit<DevCheckboxProps, 'checked' | 'onChange'> {
  defaultChecked?: boolean;
  name: string;
  globalDisabled: boolean;
  globalError: boolean;
  error?: boolean;
}

const CheckboxStateWrapper = ({
  defaultChecked = false,
  indeterminate: initialIndeterminate, // Capture initial visual state
  globalDisabled,
  disabled: localDisabled,
  ...props
}: CheckboxStateWrapperProps) => {
  const [checked, setChecked] = useState(defaultChecked);
  // We track indeterminate locally so clicking it actually clears the visual state
  const [indeterminate, setIndeterminate] = useState(initialIndeterminate);

  const handleChange = (nextChecked: boolean) => {
    setChecked(nextChecked);
    if (indeterminate) {
      setIndeterminate(false); // Clear mixed state on interaction
    }
  };

  return (
    <Checkbox
      {...props}
      checked={checked}
      indeterminate={indeterminate}
      onChange={handleChange}
      disabled={globalDisabled || localDisabled}
    />
  );
};

// =============================================================================
// PARENT-CHILD DEMO COMPONENT
// A real working example for Section 8
// =============================================================================

const ParentChildDemo = ({
  globalProps,
}: {
  globalProps: { globalDisabled: boolean; globalError: boolean };
}) => {
  const [items, setItems] = useState([true, false, false]);

  const allChecked = items.every(Boolean);
  const someChecked = items.some(Boolean);
  const isIndeterminate = someChecked && !allChecked;

  const toggleAll = () => {
    const nextState = !allChecked; // If not all checked, check all. If all checked, uncheck all.
    setItems(items.map(() => nextState));
  };

  const toggleItem = (index: number) => {
    const newItems = [...items];
    newItems[index] = !newItems[index];
    setItems(newItems);
  };

  return (
    <View>
      <ComponentPerfMonitor name="demo-parent" enabled={false}>
        <Checkbox
          label="Select all payment methods"
          checked={allChecked}
          indeterminate={isIndeterminate}
          onChange={toggleAll}
          {...globalProps}
          disabled={globalProps.globalDisabled}
        />
      </ComponentPerfMonitor>

      <View style={styles.indentedGroup}>
        {['Credit Card', 'Cash', 'TBC Pay'].map((label, i) => (
          <ComponentPerfMonitor
            key={label}
            name={`demo-child-${i}`}
            enabled={false}
          >
            <Checkbox
              label={label}
              size="small"
              checked={!!items[i]}
              onChange={() => toggleItem(i)}
              {...globalProps}
              disabled={globalProps.globalDisabled}
            />
          </ComponentPerfMonitor>
        ))}
      </View>
    </View>
  );
};

// =============================================================================
// MONITORED CHECKBOX (Tracks Render Count for Performance Testing)
// =============================================================================
interface MonitoredCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onRenderCountChange: (count: number) => void;
}

const MonitoredCheckbox = React.memo<MonitoredCheckboxProps>(
  ({ onRenderCountChange, ...checkboxProps }) => {
    const renderCount = useRef(0);

    useEffect(() => {
      renderCount.current += 1;
      onRenderCountChange(renderCount.current);
    });

    return <BaseCheckbox {...checkboxProps} />;
  }
);

MonitoredCheckbox.displayName = 'MonitoredCheckbox';

// =============================================================================
// TOGGLE PROPS TEST
// =============================================================================
const TogglePropsTest = () => {
  const [checked, setChecked] = useState(false);
  const buttonRenderCount = useRef(0);
  const [displayCount, setDisplayCount] = useState(0);

  return (
    <View style={styles.testContainer}>
      <MonitoredCheckbox
        label="Toggle Checked"
        checked={checked}
        onChange={(val) => setChecked(val)}
        onRenderCountChange={(count) => {
          buttonRenderCount.current = count;
          setDisplayCount(count);
        }}
      />
      <Text style={styles.renderInfo}>Checkbox renders: {displayCount}</Text>
      <Text style={styles.expectation}>
        Expected: Increments when you click (checked changes)
      </Text>
    </View>
  );
};

// =============================================================================
// SAME PROPS TEST (Different Object References)
// =============================================================================
const SamePropsTest = () => {
  const [, forceUpdate] = useState(0);
  const [checked, setChecked] = useState(false);
  const buttonRenderCount = useRef(0);
  const [displayCount, setDisplayCount] = useState(0);

  // ⚠️ Creating new function reference on every render
  const handleChange = (val: boolean) => {
    setChecked(val);
  };

  return (
    <View style={styles.testContainer}>
      <MonitoredCheckbox
        label="Same Props Checkbox"
        size="medium"
        checked={checked}
        onChange={handleChange} // ⚠️ New reference every render
        onRenderCountChange={(count) => {
          buttonRenderCount.current = count;
          setDisplayCount(count);
        }}
      />
      <Text style={styles.renderInfo}>Checkbox renders: {displayCount}</Text>
      <Button
        label="Force Parent Re-render"
        size="small"
        onPress={() => forceUpdate((u) => u + 1)}
      />
      <Text style={styles.expectation}>
        Expected: Should NOT re-render when parent re-renders{'\n'}
        (Checkbox is memoized, onChange change should be ignored)
      </Text>
    </View>
  );
};

// =============================================================================
// MANY CHECKBOXES TEST
// Tests if useVariants causes issues with many instances
// =============================================================================
const ManyCheckboxesTest = () => {
  const [parentRenderCount, setParentRenderCount] = useState(0);
  const startTime = useRef<number | null>(null);
  const [renderTime, setRenderTime] = useState(0);

  useEffect(() => {
    if (startTime.current !== null) {
      const time = Date.now() - startTime.current;
      setRenderTime(time);

      startTime.current = null;
    }
  }, [parentRenderCount]);

  const handleRerender = () => {
    startTime.current = Date.now(); // Start timing RIGHT before state update
    setParentRenderCount((c) => c + 1);
  };

  return (
    <View style={styles.testContainer}>
      <Text style={styles.testTitle}>20 Checkboxes Test</Text>
      <Text style={styles.renderInfo}>
        Last render time: {renderTime}ms (should be &lt;100ms)
      </Text>

      <Button
        label={`Force Re-render (${parentRenderCount})`}
        size="small"
        onPress={handleRerender}
      />

      <View style={styles.checkboxGrid}>
        {Array.from({ length: 20 }).map((_, i) => (
          <BaseCheckbox
            key={i}
            label={`Checkbox ${i + 1}`}
            size={i % 3 === 0 ? 'small' : i % 3 === 1 ? 'medium' : 'large'}
            checked={i % 2 === 0}
            onChange={() => {}}
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
  const [checked, setChecked] = useState(false);
  const renderCount = useRef(0);
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    renderCount.current += 1;
    setDisplayCount(renderCount.current);
  }, [size, checked]);

  return (
    <View style={styles.testContainer}>
      <Text style={styles.testTitle}>Variant Changes Test</Text>
      <Text style={styles.expectation}>
        Changing size/checked should cause exactly ONE checkbox re-render.
      </Text>

      <Text style={styles.renderInfo}>Parent renders: {displayCount}</Text>

      <BaseCheckbox
        label="Test Checkbox"
        size={size}
        checked={checked}
        onChange={setChecked}
      />

      <View style={styles.buttonRow}>
        <Text style={styles.buttonRowLabel}>Change Size:</Text>
        <Button
          label="Small"
          size="small"
          hierarchy={size === 'small' ? 'primary' : 'secondary'}
          onPress={() => setSize('small')}
        />
        <Button
          label="Medium"
          size="small"
          hierarchy={size === 'medium' ? 'primary' : 'secondary'}
          onPress={() => setSize('medium')}
        />
        <Button
          label="Large"
          size="small"
          hierarchy={size === 'large' ? 'primary' : 'secondary'}
          onPress={() => setSize('large')}
        />
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
    <View style={styles.testContainer}>
      <Text style={styles.testTitle}>Stress Test (60fps prop changes)</Text>
      <Text style={styles.expectation}>
        Updates checkbox props 60 times/sec. Should stay smooth.
      </Text>

      <Text style={styles.renderInfo}>Updates: {counter}</Text>

      <BaseCheckbox
        label={`Dynamic ${counter}`}
        checked={counter % 2 === 0}
        indeterminate={counter % 10 === 0}
        disabled={counter % 15 === 0}
        onChange={() => {}}
      />

      <View style={styles.buttonRow}>
        <Button
          label={isRunning ? 'Running...' : 'Start Stress Test'}
          onPress={startStressTest}
          disabled={isRunning}
          size="small"
        />
        <Button
          label="Stop"
          hierarchy="secondary"
          onPress={stopStressTest}
          disabled={!isRunning}
          size="small"
        />
      </View>
    </View>
  );
};

// =============================================================================
// PERFORMANCE TAB CONTENT
// =============================================================================
const PerformanceTests = () => {
  const [activeTest, setActiveTest] = useState<
    'toggle' | 'sameProps' | 'many' | 'variants' | 'stress'
  >('toggle');

  return (
    <View>
      <View style={styles.tabBar}>
        <Button
          label="Toggle"
          size="small"
          hierarchy={activeTest === 'toggle' ? 'primary' : 'tertiary'}
          onPress={() => setActiveTest('toggle')}
        />
        <Button
          label="Refs"
          size="small"
          hierarchy={activeTest === 'sameProps' ? 'primary' : 'tertiary'}
          onPress={() => setActiveTest('sameProps')}
        />
        <Button
          label="Many"
          size="small"
          hierarchy={activeTest === 'many' ? 'primary' : 'tertiary'}
          onPress={() => setActiveTest('many')}
        />
        <Button
          label="Variants"
          size="small"
          hierarchy={activeTest === 'variants' ? 'primary' : 'tertiary'}
          onPress={() => setActiveTest('variants')}
        />
        <Button
          label="Stress"
          size="small"
          hierarchy={activeTest === 'stress' ? 'primary' : 'tertiary'}
          onPress={() => setActiveTest('stress')}
        />
      </View>

      {activeTest === 'toggle' && <TogglePropsTest />}
      {activeTest === 'sameProps' && <SamePropsTest />}
      {activeTest === 'many' && <ManyCheckboxesTest />}
      {activeTest === 'variants' && <VariantChangesTest />}
      {activeTest === 'stress' && <StressTest />}
    </View>
  );
};

// =============================================================================
// MAIN GALLERY COMPONENT
// =============================================================================

const CheckboxGallery = () => {
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(false);
  const [showPerf, setShowPerf] = useState(false);

  // Manual states for Section 1
  const [indeterminateChecked, setIndeterminateChecked] = useState(false);
  const [preselectedChecked, setPreselectedChecked] = useState(false);

  const globalProps = { globalDisabled: disabled, globalError: error };

  return (
    <ScreenPerfMonitor screenName="CheckboxGallery" enabled={__DEV__}>
      <View style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />

        <View style={styles.controls}>
          <Text style={styles.headerTitle}>Checkbox Gallery</Text>
          <Text style={styles.headerSubtitle}>
            Toggle states to test all variants instantly
          </Text>
          <View style={styles.controlsGrid}>
            <ControlRow
              label="Disabled"
              value={disabled}
              onValueChange={setDisabled}
            />
            <ControlRow label="Error" value={error} onValueChange={setError} />
            <ControlRow
              label="Show Performance"
              value={showPerf}
              onValueChange={setShowPerf}
            />
          </View>

          {showPerf && (
            <View style={styles.perfHint}>
              <Text style={styles.perfHintText}>
                💡 Watch render count (#) - it should only increment when props
                change
              </Text>
            </View>
          )}
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* 7. PARENT-CHILD LOGIC */}
          <Section
            title="7. Functional Logic"
            description="Real parent-child state management"
          >
            <ParentChildDemo globalProps={globalProps} />
          </Section>
          {/* 1. BASIC STATES */}
          <Section
            title="1. Basic States"
            description="Manual control to test specific prop behaviors"
          >
            <ComponentPerfMonitor name="state-unchecked" enabled={showPerf}>
              <Checkbox
                checked={false}
                onChange={() => {}}
                label="Unchecked (Static)"
                {...globalProps}
              />
            </ComponentPerfMonitor>

            <ComponentPerfMonitor name="state-checked" enabled={showPerf}>
              <Checkbox
                checked={true}
                onChange={() => {}}
                label="Checked (Static)"
                {...globalProps}
              />
            </ComponentPerfMonitor>

            <ComponentPerfMonitor name="state-indeterminate" enabled={showPerf}>
              <Checkbox
                checked={indeterminateChecked}
                onChange={setIndeterminateChecked}
                indeterminate={true}
                label="Indeterminate (Fixed)"
                description="Visual state forced via prop"
                {...globalProps}
              />
            </ComponentPerfMonitor>

            <ComponentPerfMonitor name="state-preselected" enabled={showPerf}>
              <Checkbox
                checked={preselectedChecked}
                onChange={setPreselectedChecked}
                preselected={!preselectedChecked}
                label="Preselected"
                description="Toggles: Preselected -> Checked -> Unchecked"
                {...globalProps}
              />
            </ComponentPerfMonitor>
          </Section>

          {/* 2. SIZES */}
          <Section
            title="2. Sizes"
            description="Small (16px), Medium (20px), Large (24px)"
          >
            <ComponentPerfMonitor name="size-small" enabled={showPerf}>
              <CheckboxStateWrapper
                name="size-small"
                size="small"
                label="Small checkbox"
                {...globalProps}
              />
            </ComponentPerfMonitor>

            <ComponentPerfMonitor name="size-medium" enabled={showPerf}>
              <CheckboxStateWrapper
                name="size-medium"
                size="medium"
                label="Medium checkbox (default)"
                {...globalProps}
              />
            </ComponentPerfMonitor>

            <ComponentPerfMonitor name="size-large" enabled={showPerf}>
              <CheckboxStateWrapper
                name="size-large"
                size="large"
                label="Large checkbox"
                {...globalProps}
              />
            </ComponentPerfMonitor>
          </Section>

          {/* 3. LABELS & CONTENT */}
          <Section title="3. Content Variants">
            <ComponentPerfMonitor name="label-none" enabled={showPerf}>
              <Row>
                <CheckboxStateWrapper
                  name="label-none"
                  accessibilityLabel="No Label"
                  {...globalProps}
                />
                <Text style={styles.noteInline}>← No Label</Text>
              </Row>
            </ComponentPerfMonitor>

            <ComponentPerfMonitor name="label-desc" enabled={showPerf}>
              <CheckboxStateWrapper
                name="label-desc"
                label="Enable notifications"
                description="Get real-time updates about your rides"
                {...globalProps}
              />
            </ComponentPerfMonitor>

            <ComponentPerfMonitor name="label-multiline" enabled={showPerf}>
              <CheckboxStateWrapper
                name="label-multiline"
                label="I agree to receive marketing emails and promotional offers from Kartuli and its partners"
                description="You can unsubscribe at any time from your account settings"
                {...globalProps}
              />
            </ComponentPerfMonitor>
          </Section>

          {/* 4. ERROR STATES */}
          <Section title="4. Error States">
            <ComponentPerfMonitor name="error-text" enabled={showPerf}>
              <CheckboxStateWrapper
                name="error-text"
                label="Accept terms"
                description="Normal description"
                errorText="You must accept the terms to continue"
                error={true} // Local error override
                {...globalProps}
              />
            </ComponentPerfMonitor>

            <ComponentPerfMonitor name="error-checked" enabled={showPerf}>
              <CheckboxStateWrapper
                name="error-checked"
                defaultChecked={true}
                label="Invalid Selection"
                errorText="This option is not available right now"
                error={true}
                {...globalProps}
              />
            </ComponentPerfMonitor>
          </Section>

          {/* 5. TONES */}
          <Section title="5. Negative Tone">
            <ComponentPerfMonitor name="tone-negative" enabled={showPerf}>
              <CheckboxStateWrapper
                name="tone-negative"
                label="Delete Account"
                description="This action cannot be undone"
                tone="negative"
                {...globalProps}
              />
            </ComponentPerfMonitor>
          </Section>

          {/* 6. ALIGNMENT */}
          <Section title="6. Alignment">
            <Text style={styles.note}>
              Top-aligned (Standard for multi-line):
            </Text>
            <ComponentPerfMonitor name="align-top" enabled={showPerf}>
              <CheckboxStateWrapper
                name="align-top"
                label="Long label that wraps to multiple lines and needs proper alignment with the checkbox box"
                align="top"
                {...globalProps}
              />
            </ComponentPerfMonitor>

            <Text style={styles.note}>Center-aligned:</Text>
            <ComponentPerfMonitor name="align-center" enabled={showPerf}>
              <CheckboxStateWrapper
                name="align-center"
                label="Short Label"
                align="center"
                {...globalProps}
              />
            </ComponentPerfMonitor>
          </Section>

          {/* 8. PERFORMANCE TESTS */}
          <Section
            title="8. Performance Tests"
            description="Test render efficiency and detect unnecessary re-renders"
          >
            <PerformanceTests />
          </Section>

          <View style={styles.footer} />
        </ScrollView>
      </View>
    </ScreenPerfMonitor>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  controls: {
    backgroundColor: '#FFF',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 12,
  },
  controlsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  controlLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#666',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  sectionDescription: {
    fontSize: 12,
    color: '#888',
    marginBottom: 12,
  },
  sectionContent: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    flexWrap: 'wrap',
  },
  // ✅ FIX: Layout for the wrapper row to support text on right
  instrumentedCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    gap: 8,
  },
  // ✅ FIX: Prevent text shrinking and force fixed width
  renderTime: {
    fontSize: 10,
    color: '#999',
    fontFamily: 'monospace',
    flexShrink: 0,
    minWidth: 100,
    textAlign: 'right',
  },
  renderCount: {
    fontSize: 10,
    color: '#4CAF50',
    fontWeight: '600',
  },
  note: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 8,
    marginTop: 8,
  },
  noteInline: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    alignSelf: 'center',
  },
  indentedGroup: {
    marginLeft: 28, // Indent children
    marginTop: 8,
    gap: 8,
    borderLeftWidth: 1,
    borderLeftColor: '#E0E0E0',
    paddingLeft: 12,
  },
  footer: {
    height: 48,
  },
  perfHint: {
    marginTop: 12,
    padding: 8,
    backgroundColor: '#FEF3C7',
    borderRadius: 6,
  },
  perfHintText: {
    fontSize: 12,
    color: '#92400E',
  },
  // Performance Test Styles
  testContainer: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  testTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  renderInfo: {
    fontSize: 14,
    color: '#666',
    marginVertical: 8,
    fontFamily: 'monospace',
  },
  expectation: {
    fontSize: 12,
    color: '#888',
    marginTop: 8,
    fontStyle: 'italic',
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
    alignItems: 'center',
  },
  buttonRowLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginRight: 4,
  },
  checkboxGrid: {
    marginTop: 12,
    gap: 8,
  },
  tabBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 16,
  },
});

export default CheckboxGallery;
