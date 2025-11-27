/**
 * ButtonGallery - Development Only
 *
 * A comprehensive, interactive gallery for testing all Button variants.
 * Features global state toggles to test Loading/Disabled/Active across all buttons.
 *
 * Setup:
 * 1. Place at: apps/rider/src/screens/dev/ButtonGallery.tsx
 * 2. In App.tsx or _layout.tsx, add the dev mode switch (see bottom of file)
 *
 * Features:
 * - Global toggles for Loading/Disabled/Active states
 * - MockIcon for layout testing without icon dependencies
 * - Real icon examples (optional)
 * - All hierarchy, size, shape, tone, width mode variants
 * - Long text truncation tests
 * - Real-world usage examples
 */
import React, { Profiler, useEffect, useRef, useState } from 'react';

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

import { Button as BaseButton, Heart, Star } from '@kartuli/ui';

// Optional: Import real icons for some examples
// import { Trash2, MapPin, ChevronDown, Heart, Link2 } from 'lucide-react-native';

// =============================================================================
// MOCK ICON
// Simple shape to test layout without SVG dependencies
// =============================================================================

const MockIcon = Heart;

const MockIconRound = Star;

// =============================================================================
// INSTRUMENTED BUTTON (shows last render time)
// =============================================================================

type DevButtonProps = React.ComponentProps<typeof BaseButton>;

const Button = (props: DevButtonProps) => {
  const [metrics, setMetrics] = useState<{
    duration: number;
    phase: 'mount' | 'update' | 'nested-update';
  } | null>(null);

  const handleRender: React.ProfilerOnRenderCallback = (
    _id,
    phase,
    actualDuration
  ) => {
    setMetrics((prev) => {
      const unchanged =
        prev &&
        prev.phase === phase &&
        Math.abs(prev.duration - actualDuration) < 0.05;
      return unchanged ? prev : { duration: actualDuration, phase };
    });
  };

  const labelForId =
    (typeof props.label === 'string' && props.label) ||
    props.accessibilityLabel ||
    'button';

  const shouldStack = props.widthMode === 'fixed';

  return (
    <View
      style={[
        styles.instrumentedButton,
        shouldStack && styles.instrumentedButtonStacked,
      ]}
    >
      <Profiler id={`button-${labelForId}`} onRender={handleRender}>
        <BaseButton {...props} />
      </Profiler>
      <Text style={styles.renderTime}>
        {metrics
          ? `${metrics.phase} ${metrics.duration.toFixed(1)}ms`
          : 'render...'}
      </Text>
    </View>
  );
};

// =============================================================================
// SECTION COMPONENT
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

// =============================================================================
// ROW COMPONENT
// =============================================================================

const Row = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.row}>{children}</View>
);

// =============================================================================
// CONTROL ROW (Toggle Switch)
// =============================================================================

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
// MAIN GALLERY COMPONENT
// =============================================================================

const ButtonGallery = () => {
  // Global state toggles - affects ALL buttons
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [active, setActive] = useState(false);
  const [showPerf, setShowPerf] = useState(false);

  const handlePress = () => {};
  const globalProps = { loading, disabled, active };

  return (
    <ScreenPerfMonitor screenName="ButtonGallery" enabled={__DEV__}>
      <View style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />

        {/* Controls Header */}
        <View style={styles.controls}>
          <Text style={styles.headerTitle}>Button Gallery</Text>
          <Text style={styles.headerSubtitle}>
            Toggle states to test all variants instantly
          </Text>
          <View style={styles.controlsGrid}>
            <ControlRow
              label="Loading"
              value={loading}
              onValueChange={setLoading}
            />
            <ControlRow
              label="Disabled"
              value={disabled}
              onValueChange={setDisabled}
            />
            <ControlRow
              label="Active"
              value={active}
              onValueChange={setActive}
            />
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
          {/* 1. HIERARCHY */}
          <Section
            title="1. Hierarchy"
            description="Primary for main CTAs, Secondary for alternatives, Tertiary for less emphasis"
          >
            <ComponentPerfMonitor name="hierarchy-primary" enabled={showPerf}>
              <Button
                label="Primary Button"
                hierarchy="primary"
                {...globalProps}
                onPress={handlePress}
              />
            </ComponentPerfMonitor>

            <ComponentPerfMonitor name="hierarchy-secondary" enabled={showPerf}>
              <Button
                label="Secondary Button"
                hierarchy="secondary"
                {...globalProps}
                onPress={handlePress}
              />
            </ComponentPerfMonitor>

            <ComponentPerfMonitor name="hierarchy-tertiary" enabled={showPerf}>
              <Button
                label="Tertiary Button"
                hierarchy="tertiary"
                {...globalProps}
                onPress={handlePress}
              />
            </ComponentPerfMonitor>
          </Section>

          {/* 2. SIZES */}
          <Section
            title="2. Sizes"
            description="Small (36px), Medium (48px), Large (56px)"
          >
            <Row>
              <ComponentPerfMonitor
                name="size-small"
                enabled={showPerf}
                mode="minimal"
              >
                <Button
                  label="Small"
                  size="small"
                  {...globalProps}
                  onPress={handlePress}
                />
              </ComponentPerfMonitor>

              <ComponentPerfMonitor
                name="size-medium"
                enabled={showPerf}
                mode="minimal"
              >
                <Button
                  label="Medium"
                  size="medium"
                  {...globalProps}
                  onPress={handlePress}
                />
              </ComponentPerfMonitor>

              <ComponentPerfMonitor
                name="size-large"
                enabled={showPerf}
                mode="minimal"
              >
                <Button
                  label="Large"
                  size="large"
                  {...globalProps}
                  onPress={handlePress}
                />
              </ComponentPerfMonitor>
            </Row>
          </Section>

          {/* 3. WIDTH MODES */}
          <Section title="3. Width Modes">
            <Text style={styles.note}>Intrinsic (default) — fits content:</Text>
            <Row>
              <ComponentPerfMonitor
                name="width-short"
                enabled={showPerf}
                mode="minimal"
              >
                <Button
                  label="Short"
                  widthMode="intrinsic"
                  hierarchy="secondary"
                  {...globalProps}
                  onPress={handlePress}
                />
              </ComponentPerfMonitor>

              <ComponentPerfMonitor
                name="width-longer"
                enabled={showPerf}
                mode="minimal"
              >
                <Button
                  label="Longer Label"
                  widthMode="intrinsic"
                  hierarchy="secondary"
                  {...globalProps}
                  onPress={handlePress}
                />
              </ComponentPerfMonitor>
            </Row>

            <Text style={[styles.note]}>Fixed — 100% width:</Text>
            <ComponentPerfMonitor name="width-fixed" enabled={showPerf}>
              <Button
                label="Fixed Width Button"
                widthMode="fixed"
                hierarchy="primary"
                {...globalProps}
                onPress={handlePress}
              />
            </ComponentPerfMonitor>
          </Section>

          {/* 4. SHAPES */}
          <Section title="4. Shapes">
            <ComponentPerfMonitor name="shape-rect" enabled={showPerf}>
              <Button
                label="Rect (default)"
                shape="rect"
                // {...globalProps}
                onPress={handlePress}
              />
            </ComponentPerfMonitor>

            <ComponentPerfMonitor name="shape-pill" enabled={showPerf}>
              <Button
                label="Pill"
                shape="pill"
                {...globalProps}
                onPress={handlePress}
              />
            </ComponentPerfMonitor>

            <Row>
              <ComponentPerfMonitor
                name="shape-circle"
                enabled={showPerf}
                mode="minimal"
              >
                <Button
                  leadingIcon={MockIconRound}
                  shape="circle"
                  hierarchy="secondary"
                  accessibilityLabel="Circle button"
                  {...globalProps}
                  onPress={handlePress}
                />
              </ComponentPerfMonitor>

              <ComponentPerfMonitor
                name="shape-square"
                enabled={showPerf}
                mode="minimal"
              >
                <Button
                  leadingIcon={MockIcon}
                  shape="square"
                  hierarchy="secondary"
                  accessibilityLabel="Square button"
                  {...globalProps}
                  onPress={handlePress}
                />
              </ComponentPerfMonitor>

              <Text style={styles.noteInline}>
                ← Circle & Square (icon-only)
              </Text>
            </Row>
          </Section>

          {/* 5. ICONS */}
          <Section title="5. Icons">
            <ComponentPerfMonitor name="icons-leading" enabled={showPerf}>
              <Button
                label="Leading Icon"
                leadingIcon={MockIcon}
                {...globalProps}
                onPress={handlePress}
              />
            </ComponentPerfMonitor>

            <ComponentPerfMonitor name="icons-trailing" enabled={showPerf}>
              <Button
                label="Trailing Icon"
                trailingIcon={MockIcon}
                {...globalProps}
                onPress={handlePress}
              />
            </ComponentPerfMonitor>

            <ComponentPerfMonitor name="icons-both" enabled={showPerf}>
              <Button
                label="Both Icons"
                leadingIcon={MockIcon}
                trailingIcon={MockIcon}
                {...globalProps}
                onPress={handlePress}
              />
            </ComponentPerfMonitor>
          </Section>

          {/* 6. COMPLEX LAYOUTS */}
          <Section
            title="6. Complex Layouts"
            description="Fixed width + icons with text truncation"
          >
            <ComponentPerfMonitor name="complex-1" enabled={showPerf}>
              <Button
                label="Manage Account Settings"
                widthMode="fixed"
                hierarchy="secondary"
                leadingIcon={MockIcon}
                trailingIcon={MockIcon}
                {...globalProps}
                onPress={handlePress}
              />
            </ComponentPerfMonitor>

            <ComponentPerfMonitor name="complex-2" enabled={showPerf}>
              <Button
                label="This is a very long label that should truncate properly"
                widthMode="fixed"
                hierarchy="secondary"
                leadingIcon={MockIcon}
                trailingIcon={MockIcon}
                {...globalProps}
                onPress={handlePress}
              />
            </ComponentPerfMonitor>
          </Section>

          {/* 7. TONES */}
          <Section
            title="7. Negative Tone"
            description="For destructive actions (delete, cancel, remove)"
          >
            <ComponentPerfMonitor name="tone-primary-neg" enabled={showPerf}>
              <Button
                label="Delete Account"
                hierarchy="primary"
                tone="negative"
                {...globalProps}
                onPress={handlePress}
              />
            </ComponentPerfMonitor>

            <ComponentPerfMonitor name="tone-secondary-neg" enabled={showPerf}>
              <Button
                label="Remove Item"
                hierarchy="secondary"
                tone="negative"
                {...globalProps}
                onPress={handlePress}
              />
            </ComponentPerfMonitor>

            <ComponentPerfMonitor name="tone-tertiary-neg" enabled={showPerf}>
              <Button
                label="Cancel"
                hierarchy="tertiary"
                tone="negative"
                {...globalProps}
                onPress={handlePress}
              />
            </ComponentPerfMonitor>
          </Section>

          {/* 8. ICON BUTTONS - ALL SIZES */}
          <Section title="8. Icon Buttons — All Sizes">
            <Row>
              <ComponentPerfMonitor
                name="icon-circle-small"
                enabled={showPerf}
                mode="minimal"
              >
                <Button
                  leadingIcon={MockIconRound}
                  shape="circle"
                  size="small"
                  hierarchy="secondary"
                  accessibilityLabel="Small"
                  {...globalProps}
                  onPress={handlePress}
                />
              </ComponentPerfMonitor>

              <ComponentPerfMonitor
                name="icon-circle-medium"
                enabled={showPerf}
                mode="minimal"
              >
                <Button
                  leadingIcon={MockIconRound}
                  shape="circle"
                  size="medium"
                  hierarchy="secondary"
                  accessibilityLabel="Medium"
                  {...globalProps}
                  onPress={handlePress}
                />
              </ComponentPerfMonitor>

              <ComponentPerfMonitor
                name="icon-circle-large"
                enabled={showPerf}
                mode="minimal"
              >
                <Button
                  leadingIcon={MockIconRound}
                  shape="circle"
                  size="large"
                  hierarchy="secondary"
                  accessibilityLabel="Large"
                  {...globalProps}
                  onPress={handlePress}
                />
              </ComponentPerfMonitor>
            </Row>

            <Row>
              <ComponentPerfMonitor
                name="icon-square-small"
                enabled={showPerf}
                mode="minimal"
              >
                <Button
                  leadingIcon={MockIcon}
                  shape="square"
                  size="small"
                  hierarchy="secondary"
                  accessibilityLabel="Small"
                  {...globalProps}
                  onPress={handlePress}
                />
              </ComponentPerfMonitor>

              <ComponentPerfMonitor
                name="icon-square-medium"
                enabled={showPerf}
                mode="minimal"
              >
                <Button
                  leadingIcon={MockIcon}
                  shape="square"
                  size="medium"
                  hierarchy="secondary"
                  accessibilityLabel="Medium"
                  {...globalProps}
                  onPress={handlePress}
                />
              </ComponentPerfMonitor>

              <ComponentPerfMonitor
                name="icon-square-large"
                enabled={showPerf}
                mode="minimal"
              >
                <Button
                  leadingIcon={MockIcon}
                  shape="square"
                  size="large"
                  hierarchy="secondary"
                  accessibilityLabel="Large"
                  {...globalProps}
                  onPress={handlePress}
                />
              </ComponentPerfMonitor>
            </Row>
          </Section>

          {/* 9. REAL-WORLD EXAMPLES */}
          <Section
            title="9. Real-World Examples"
            description="Common patterns in the Kartuli app"
          >
            <ComponentPerfMonitor name="real-confirm" enabled={showPerf}>
              <Button
                label="Confirm ride"
                hierarchy="primary"
                size="large"
                widthMode="fixed"
                {...globalProps}
                onPress={handlePress}
              />
            </ComponentPerfMonitor>

            <ComponentPerfMonitor name="real-change" enabled={showPerf}>
              <Button
                label="Change"
                hierarchy="tertiary"
                {...globalProps}
                onPress={handlePress}
              />
            </ComponentPerfMonitor>

            <ComponentPerfMonitor name="real-delete" enabled={showPerf}>
              <Button
                label="Delete"
                hierarchy="secondary"
                tone="negative"
                {...globalProps}
                onPress={handlePress}
              />
            </ComponentPerfMonitor>

            <Row>
              <ComponentPerfMonitor
                name="real-fav-icon"
                enabled={showPerf}
                mode="minimal"
              >
                <Button
                  leadingIcon={MockIconRound}
                  shape="circle"
                  hierarchy="secondary"
                  accessibilityLabel="Favorite"
                  {...globalProps}
                  onPress={handlePress}
                />
              </ComponentPerfMonitor>

              <ComponentPerfMonitor name="real-fav-label" enabled={showPerf}>
                <Button
                  label="Favorites"
                  hierarchy="secondary"
                  leadingIcon={MockIconRound}
                  trailingIcon={MockIcon}
                  {...globalProps}
                  onPress={handlePress}
                />
              </ComponentPerfMonitor>
            </Row>
          </Section>

          {/* 10. STATIC STATE EXAMPLES */}
          <Section
            title="10. Static State Examples"
            description="These ignore global toggles for comparison"
          >
            <Row>
              <ComponentPerfMonitor
                name="static-normal"
                enabled={showPerf}
                mode="minimal"
              >
                <Button
                  label="Normal"
                  hierarchy="primary"
                  onPress={handlePress}
                />
              </ComponentPerfMonitor>

              <ComponentPerfMonitor
                name="static-disabled"
                enabled={showPerf}
                mode="minimal"
              >
                <Button
                  label="Disabled"
                  hierarchy="primary"
                  disabled
                  onPress={handlePress}
                />
              </ComponentPerfMonitor>
            </Row>

            <Row>
              <ComponentPerfMonitor
                name="static-loading"
                enabled={showPerf}
                mode="minimal"
              >
                <Button
                  label="Loading"
                  hierarchy="primary"
                  loading
                  onPress={handlePress}
                />
              </ComponentPerfMonitor>

              <ComponentPerfMonitor
                name="static-active"
                enabled={showPerf}
                mode="minimal"
              >
                <Button
                  label="Active"
                  hierarchy="secondary"
                  active
                  onPress={handlePress}
                />
              </ComponentPerfMonitor>
            </Row>
          </Section>

          {/* 11. PERFORMANCE TESTS */}
          <Section
            title="11. Performance Tests"
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

// =============================================================================
// PERFORMANCE TESTING COMPONENTS
// =============================================================================

type ButtonHierarchy = 'primary' | 'secondary' | 'tertiary';
type ButtonSize = 'small' | 'medium' | 'large';
type ButtonShape = 'rect' | 'pill' | 'circle' | 'square';

// =============================================================================
// VARIANT CHANGES TEST
// =============================================================================
function VariantChangesTest() {
  const [hierarchy, setHierarchy] = useState<ButtonHierarchy>('primary');
  const [size, setSize] = useState<ButtonSize>('medium');
  const [shape, setShape] = useState<ButtonShape>('rect');
  const [hasLeadingIcon, setHasLeadingIcon] = useState(false);
  const [hasTrailingIcon, setHasTrailingIcon] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [tone, setTone] = useState<'default' | 'negative'>('default');
  const renderCount = useRef(0);
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    renderCount.current += 1;
    setDisplayCount(renderCount.current);
  }, [
    hierarchy,
    size,
    shape,
    hasLeadingIcon,
    hasTrailingIcon,
    isLoading,
    isDisabled,
    isActive,
    tone,
  ]);

  const isIconOnly = shape === 'circle' || shape === 'square';

  return (
    <View style={styles.testContainer}>
      <Text style={styles.testTitle}>Variant Changes Test</Text>
      <Text style={styles.expectation}>
        Toggling options should cause exactly ONE Button re-render.
      </Text>

      <Text style={styles.renderInfo}>Parent renders: {displayCount}</Text>

      <View style={styles.stressTestButtonContainer}>
        <BaseButton
          label={isIconOnly ? '' : 'Test Button'}
          hierarchy={hierarchy}
          size={size}
          shape={shape}
          tone={tone}
          leadingIcon={hasLeadingIcon ? MockIcon : undefined}
          trailingIcon={
            hasTrailingIcon && !isIconOnly ? MockIconRound : undefined
          }
          loading={isLoading}
          disabled={isDisabled}
          active={isActive}
          accessibilityLabel={isIconOnly ? 'Icon button' : undefined}
          onPress={() => {}}
        />
      </View>

      <View style={styles.buttonRow}>
        <Text style={styles.buttonRowLabel}>Hierarchy:</Text>
        <BaseButton
          label="Pri"
          size="small"
          hierarchy={hierarchy === 'primary' ? 'secondary' : 'primary'}
          onPress={() => setHierarchy('primary')}
        />
        <BaseButton
          label="Sec"
          size="small"
          hierarchy={hierarchy === 'secondary' ? 'secondary' : 'primary'}
          onPress={() => setHierarchy('secondary')}
        />
        <BaseButton
          label="Ter"
          size="small"
          hierarchy={hierarchy === 'tertiary' ? 'secondary' : 'primary'}
          onPress={() => setHierarchy('tertiary')}
        />
      </View>

      <View style={styles.buttonRow}>
        <Text style={styles.buttonRowLabel}>Size:</Text>
        <BaseButton
          label="S"
          size="small"
          hierarchy={size === 'small' ? 'secondary' : 'primary'}
          onPress={() => setSize('small')}
        />
        <BaseButton
          label="M"
          size="small"
          hierarchy={size === 'medium' ? 'secondary' : 'primary'}
          onPress={() => setSize('medium')}
        />
        <BaseButton
          label="L"
          size="small"
          hierarchy={size === 'large' ? 'secondary' : 'primary'}
          onPress={() => setSize('large')}
        />
      </View>

      <View style={styles.buttonRow}>
        <Text style={styles.buttonRowLabel}>Shape:</Text>
        <BaseButton
          label="Rect"
          size="small"
          hierarchy={shape === 'rect' ? 'secondary' : 'primary'}
          onPress={() => setShape('rect')}
        />
        <BaseButton
          label="Pill"
          size="small"
          hierarchy={shape === 'pill' ? 'secondary' : 'primary'}
          onPress={() => setShape('pill')}
        />
        <BaseButton
          label="Circle"
          size="small"
          hierarchy={shape === 'circle' ? 'secondary' : 'primary'}
          onPress={() => {
            setShape('circle');
            setHasLeadingIcon(true);
          }}
        />
        <BaseButton
          label="Square"
          size="small"
          hierarchy={shape === 'square' ? 'secondary' : 'primary'}
          onPress={() => {
            setShape('square');
            setHasLeadingIcon(true);
          }}
        />
      </View>

      <View style={styles.buttonRow}>
        <Text style={styles.buttonRowLabel}>Icons:</Text>
        <BaseButton
          label="Leading"
          size="small"
          hierarchy={hasLeadingIcon ? 'secondary' : 'primary'}
          onPress={() => setHasLeadingIcon(!hasLeadingIcon)}
        />
        <BaseButton
          label="Trailing"
          size="small"
          hierarchy={hasTrailingIcon ? 'secondary' : 'primary'}
          onPress={() => setHasTrailingIcon(!hasTrailingIcon)}
          disabled={isIconOnly}
        />
      </View>

      <View style={styles.buttonRow}>
        <Text style={styles.buttonRowLabel}>State:</Text>
        <BaseButton
          label="Loading"
          size="small"
          hierarchy={isLoading ? 'secondary' : 'primary'}
          onPress={() => setIsLoading(!isLoading)}
        />
        <BaseButton
          label="Disabled"
          size="small"
          hierarchy={isDisabled ? 'secondary' : 'primary'}
          onPress={() => setIsDisabled(!isDisabled)}
        />
        <BaseButton
          label="Active"
          size="small"
          hierarchy={isActive ? 'secondary' : 'primary'}
          onPress={() => setIsActive(!isActive)}
        />
      </View>

      <View style={styles.buttonRow}>
        <Text style={styles.buttonRowLabel}>Tone:</Text>
        <BaseButton
          label="Default"
          size="small"
          hierarchy={tone === 'default' ? 'secondary' : 'primary'}
          onPress={() => setTone('default')}
        />
        <BaseButton
          label="Negative"
          size="small"
          hierarchy={tone === 'negative' ? 'secondary' : 'primary'}
          tone="negative"
          onPress={() => setTone('negative')}
        />
      </View>
    </View>
  );
}

// =============================================================================
// RENDER STRESS TEST
// =============================================================================
function RenderStressTest() {
  const [counter, setCounter] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [includeIcons, setIncludeIcons] = useState(true);
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

  // Cycle through different combinations
  const hierarchies: ButtonHierarchy[] = ['primary', 'secondary', 'tertiary'];
  const currentHierarchy = hierarchies[counter % 3];

  const hasLeading = includeIcons && counter % 2 === 0;
  const hasTrailing = includeIcons && counter % 3 === 0;

  return (
    <View style={styles.testContainer}>
      <Text style={styles.testTitle}>Render Stress (60fps prop changes)</Text>
      <Text style={styles.expectation}>
        Updates Button props 60 times/sec. Should stay smooth.
      </Text>

      <Text style={styles.renderInfo}>Updates: {counter}</Text>

      <View style={styles.stressTestButtonContainer}>
        <BaseButton
          label={`Button ${counter}`}
          hierarchy={currentHierarchy}
          size="medium"
          leadingIcon={hasLeading ? MockIcon : undefined}
          trailingIcon={hasTrailing ? MockIconRound : undefined}
          loading={counter % 20 === 0}
          disabled={counter % 15 === 0}
          active={counter % 10 === 0}
          onPress={() => {}}
        />
      </View>

      <View style={styles.buttonRow}>
        <BaseButton
          label={isRunning ? 'Running...' : 'Start'}
          onPress={startStressTest}
          disabled={isRunning}
          size="small"
        />
        <BaseButton
          label="Stop"
          hierarchy="secondary"
          onPress={stopStressTest}
          disabled={!isRunning}
          size="small"
        />
        <BaseButton
          label={includeIcons ? 'Icons ON' : 'Icons OFF'}
          hierarchy={includeIcons ? 'secondary' : 'primary'}
          onPress={() => setIncludeIcons(!includeIcons)}
          size="small"
        />
      </View>
    </View>
  );
}

// =============================================================================
// ONPRESS STRESS TEST
// =============================================================================
function OnPressStressTest() {
  const [displayState, setDisplayState] = useState({
    pressCount: 0,
    pressesPerSecond: 0,
    maxPps: 0,
  });
  const [includeIcons, setIncludeIcons] = useState(true);

  // Use refs to avoid re-renders during rapid tapping
  const pressCountRef = useRef(0);
  const maxPpsRef = useRef(0);
  const lastUpdateTime = useRef(Date.now());
  const pressesInWindow = useRef(0);
  const displayIntervalRef = useRef<ReturnType<typeof setInterval> | undefined>(
    undefined
  );

  // Start display update interval on mount
  useEffect(() => {
    displayIntervalRef.current = setInterval(() => {
      const now = Date.now();
      const elapsed = now - lastUpdateTime.current;

      if (elapsed >= 1000) {
        // Calculate presses per second
        const pps = pressesInWindow.current;
        if (pps > maxPpsRef.current) {
          maxPpsRef.current = pps;
        }

        setDisplayState({
          pressCount: pressCountRef.current,
          pressesPerSecond: pps,
          maxPps: maxPpsRef.current,
        });

        // Reset window
        pressesInWindow.current = 0;
        lastUpdateTime.current = now;
      } else {
        // Update press count more frequently for responsiveness
        setDisplayState((prev) => ({
          ...prev,
          pressCount: pressCountRef.current,
        }));
      }
    }, 100); // Update display every 100ms

    return () => {
      if (displayIntervalRef.current) {
        clearInterval(displayIntervalRef.current);
      }
    };
  }, []);

  // No setState on press - just update refs
  const handlePress = () => {
    pressCountRef.current += 1;
    pressesInWindow.current += 1;
  };

  const resetStats = () => {
    pressCountRef.current = 0;
    maxPpsRef.current = 0;
    pressesInWindow.current = 0;
    lastUpdateTime.current = Date.now();
    setDisplayState({
      pressCount: 0,
      pressesPerSecond: 0,
      maxPps: 0,
    });
  };

  return (
    <View style={styles.testContainer}>
      <Text style={styles.testTitle}>OnPress Stress (Tap rapidly!)</Text>
      <Text style={styles.expectation}>
        Tap buttons as fast as possible. Measures press handling performance.
      </Text>

      <Text style={styles.renderInfo}>
        Presses: {displayState.pressCount} | Rate:{' '}
        {displayState.pressesPerSecond}/sec | Max: {displayState.maxPps}/sec
      </Text>

      <View style={styles.pressTestButtons}>
        <BaseButton
          label="Tap!"
          hierarchy="primary"
          size="large"
          onPress={handlePress}
        />
        <BaseButton
          label="With Icons"
          hierarchy="secondary"
          size="large"
          leadingIcon={includeIcons ? MockIcon : undefined}
          trailingIcon={includeIcons ? MockIconRound : undefined}
          onPress={handlePress}
        />
      </View>

      <View style={styles.buttonRow}>
        <BaseButton
          label="Reset"
          hierarchy="secondary"
          onPress={resetStats}
          size="small"
        />
        <BaseButton
          label={includeIcons ? 'Icons ON' : 'Icons OFF'}
          hierarchy={includeIcons ? 'secondary' : 'primary'}
          onPress={() => setIncludeIcons(!includeIcons)}
          size="small"
        />
      </View>

      <Text style={styles.expectation}>
        Good: &gt;10 taps/sec | Fast tapper: &gt;15/sec
      </Text>
    </View>
  );
}

// =============================================================================
// MANY BUTTONS TEST
// =============================================================================
function ManyButtonsTest() {
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
    startTime.current = Date.now();
    setParentRenderCount((c) => c + 1);
  };

  const hierarchies: ButtonHierarchy[] = ['primary', 'secondary', 'tertiary'];
  const sizes: ButtonSize[] = ['small', 'medium', 'large'];

  return (
    <View style={styles.testContainer}>
      <Text style={styles.testTitle}>20 Buttons Test</Text>
      <Text style={styles.renderInfo}>
        Last render time: {renderTime}ms (should be &lt;100ms)
      </Text>

      <BaseButton
        label={`Force Re-render (${parentRenderCount})`}
        size="small"
        onPress={handleRerender}
      />

      <View style={styles.buttonGrid}>
        {Array.from({ length: 20 }).map((_, i) => (
          <BaseButton
            key={i}
            label={`Btn ${i + 1}`}
            size={sizes[i % 3]}
            hierarchy={hierarchies[i % 3]}
            leadingIcon={i % 4 === 0 ? MockIcon : undefined}
            onPress={() => {}}
          />
        ))}
      </View>
    </View>
  );
}

// =============================================================================
// PERFORMANCE TAB CONTENT
// =============================================================================
function PerformanceTests() {
  const [activeTest, setActiveTest] = useState<
    'variants' | 'renderStress' | 'pressStress' | 'many'
  >('variants');

  return (
    <View>
      <View style={styles.tabBar}>
        <BaseButton
          label="Variants"
          size="small"
          hierarchy={activeTest === 'variants' ? 'secondary' : 'primary'}
          onPress={() => setActiveTest('variants')}
        />
        <BaseButton
          label="Render"
          size="small"
          hierarchy={activeTest === 'renderStress' ? 'secondary' : 'primary'}
          onPress={() => setActiveTest('renderStress')}
        />
        <BaseButton
          label="Press"
          size="small"
          hierarchy={activeTest === 'pressStress' ? 'secondary' : 'primary'}
          onPress={() => setActiveTest('pressStress')}
        />
        <BaseButton
          label="Many"
          size="small"
          hierarchy={activeTest === 'many' ? 'secondary' : 'primary'}
          onPress={() => setActiveTest('many')}
        />
      </View>

      {activeTest === 'variants' && <VariantChangesTest />}
      {activeTest === 'renderStress' && <RenderStressTest />}
      {activeTest === 'pressStress' && <OnPressStressTest />}
      {activeTest === 'many' && <ManyButtonsTest />}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
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
    gap: 5,
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
    padding: 16,
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
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  instrumentedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  instrumentedButtonStacked: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
  },
  renderTime: {
    fontSize: 11,
    color: '#777',
  },
  note: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  noteInline: {
    fontSize: 11,
    color: '#888',
    fontStyle: 'italic',
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
  buttonGrid: {
    marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tabBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 16,
  },
  stressTestButtonContainer: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  pressTestButtons: {
    flexDirection: 'row',
    gap: 12,
    marginVertical: 16,
  },
});

export default ButtonGallery;

// =============================================================================
// HOW TO USE — DEV MODE SWITCH
// =============================================================================
//
// Option A: Simple toggle in App.tsx
// -----------------------------------
// import ButtonGallery from './src/screens/dev/ButtonGallery';
// import MainApp from './src/App';
//
// const SHOW_GALLERY = __DEV__ && true; // ← Flip to 'true' to show gallery
//
// export default function App() {
//   if (SHOW_GALLERY) {
//     return <ButtonGallery />;
//   }
//   return <MainApp />;
// }
//
//
// Option B: Expo Router (add as dev route)
// ----------------------------------------
// 1. Create file: apps/rider/src/app/dev/button-gallery.tsx
//
//    export { ButtonGallery as default } from '@/screens/dev/ButtonGallery';
//
// 2. In _layout.tsx:
//
//    {__DEV__ && (
//      <Stack.Screen
//        name="dev/button-gallery"
//        options={{ title: 'Button Gallery' }}
//      />
//    )}
//
// 3. Add a hidden trigger somewhere (e.g., triple-tap version number):
//
//    import { router } from 'expo-router';
//    router.push('/dev/button-gallery');
//
