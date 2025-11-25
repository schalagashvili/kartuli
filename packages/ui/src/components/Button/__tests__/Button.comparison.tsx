/* eslint-disable no-console */
/* eslint-disable react-native/no-inline-styles */
import React, { Profiler, useEffect, useRef, useState } from 'react';

import { ScrollView, Text, View } from 'react-native';

import { Button } from '../Button';
import { ButtonOptimized } from './Button.optimized.example';

type ProfilerPhase = 'mount' | 'update' | 'nested-update';

interface ProfilerData {
  id: string;
  phase: ProfilerPhase;
  actualDuration: number;
  baseDuration: number;
  startTime: number;
  commitTime: number;
}

export const ButtonComparisonTest = () => {
  const [renderCount, setRenderCount] = useState(0);
  const [currentMetrics, setCurrentMetrics] = useState<ProfilerData[]>([]);
  const [optimizedMetrics, setOptimizedMetrics] = useState<ProfilerData[]>([]);

  const onCurrentRender = (
    id: string,
    phase: ProfilerPhase,
    actualDuration: number,
    baseDuration: number,
    startTime: number,
    commitTime: number
  ) => {
    setCurrentMetrics((prev) => [
      ...prev,
      { id, phase, actualDuration, baseDuration, startTime, commitTime },
    ]);
  };

  const onOptimizedRender = (
    id: string,
    phase: ProfilerPhase,
    actualDuration: number,
    baseDuration: number,
    startTime: number,
    commitTime: number
  ) => {
    setOptimizedMetrics((prev) => [
      ...prev,
      { id, phase, actualDuration, baseDuration, startTime, commitTime },
    ]);
  };

  const avgCurrent =
    currentMetrics.length > 0
      ? (
          currentMetrics.reduce((sum, m) => sum + m.actualDuration, 0) /
          currentMetrics.length
        ).toFixed(2)
      : '0';

  const avgOptimized =
    optimizedMetrics.length > 0
      ? (
          optimizedMetrics.reduce((sum, m) => sum + m.actualDuration, 0) /
          optimizedMetrics.length
        ).toFixed(2)
      : '0';

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Button Performance Comparison
      </Text>

      <Text style={{ fontSize: 14, color: '#666', marginBottom: 20 }}>
        Compare current Button vs optimized (useMemo on variants).{'\n'}
        Force re-renders and check which is faster.
      </Text>

      {/* Metrics Display */}
      <View
        style={{
          backgroundColor: '#f5f5f5',
          padding: 15,
          borderRadius: 8,
          marginBottom: 20,
        }}
      >
        <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>
          Performance Metrics
        </Text>
        <Text>Current Button: {avgCurrent}ms avg render time</Text>
        <Text>Optimized Button: {avgOptimized}ms avg render time</Text>
        <Text style={{ marginTop: 5, fontSize: 12, color: '#666' }}>
          Renders tracked: {currentMetrics.length} vs {optimizedMetrics.length}
        </Text>
      </View>

      {/* Force Re-render Control */}
      <Button
        label={`Force Parent Re-render (${renderCount})`}
        onPress={() => setRenderCount((c) => c + 1)}
        hierarchy="secondary"
        style={{ marginBottom: 30 }}
      />

      {/* Current Button Section */}
      <View style={{ marginBottom: 30 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
          Current Button
        </Text>
        <Profiler id="current-button" onRender={onCurrentRender}>
          <Button label="Current Implementation" size="medium" />
        </Profiler>
      </View>

      {/* Optimized Button Section */}
      <View style={{ marginBottom: 30 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
          Optimized Button (useMemo variants)
        </Text>
        <Profiler id="optimized-button" onRender={onOptimizedRender}>
          <ButtonOptimized label="Optimized Implementation" size="medium" />
        </Profiler>
      </View>

      {/* Clear Metrics */}
      <Button
        label="Clear Metrics"
        hierarchy="tertiary"
        onPress={() => {
          setCurrentMetrics([]);
          setOptimizedMetrics([]);
        }}
      />

      {/* Detailed Metrics */}
      {currentMetrics.length > 0 && (
        <View style={{ marginTop: 30 }}>
          <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>
            Last 5 Current Renders:
          </Text>
          {currentMetrics.slice(-5).map((m, i) => (
            <Text key={i} style={{ fontSize: 12, fontFamily: 'monospace' }}>
              {m.phase}: {m.actualDuration.toFixed(2)}ms
            </Text>
          ))}
        </View>
      )}

      {optimizedMetrics.length > 0 && (
        <View style={{ marginTop: 20, marginBottom: 30 }}>
          <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>
            Last 5 Optimized Renders:
          </Text>
          {optimizedMetrics.slice(-5).map((m, i) => (
            <Text key={i} style={{ fontSize: 12, fontFamily: 'monospace' }}>
              {m.phase}: {m.actualDuration.toFixed(2)}ms
            </Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

// =============================================================================
// SIMPLE CONSOLE LOGGER TEST
// Run this in your app and check the console
// =============================================================================
export const SimpleRenderTest = () => {
  const [count, setCount] = useState(0);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>
        Simple Render Test (Check Console)
      </Text>

      <Text style={{ marginBottom: 10 }}>Parent renders: {count}</Text>

      <Button
        label="Force Re-render"
        onPress={() => setCount((c) => c + 1)}
        style={{ marginBottom: 20 }}
      />

      {/* This button should NOT log re-renders when parent re-renders */}
      <RenderLogger name="Static Button">
        <Button label="Static Props" size="medium" hierarchy="primary" />
      </RenderLogger>

      {/* This button SHOULD log re-renders */}
      <RenderLogger name="Dynamic Button">
        <Button label={`Dynamic ${count}`} size="medium" hierarchy="primary" />
      </RenderLogger>
    </View>
  );
};

// =============================================================================
// RENDER LOGGER HELPER
// =============================================================================
interface RenderLoggerProps {
  name: string;
  children: React.ReactNode;
}

const RenderLogger: React.FC<RenderLoggerProps> = ({ name, children }) => {
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
    console.log(`[${name}] Render #${renderCount.current}`);
  });

  return <>{children}</>;
};
