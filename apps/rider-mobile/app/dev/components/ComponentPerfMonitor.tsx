/* eslint-disable react-hooks/rules-of-hooks */
import React, { Profiler, memo, useCallback, useState } from 'react';

import { Platform, StyleSheet, Text, View } from 'react-native';

interface ComponentPerfMonitorProps {
  children: React.ReactNode;
  /** Unique ID for the profiler (required by React.Profiler) */
  name: string;
  /** Toggle to disable profiling overhead completely */
  enabled?: boolean;
  /** Display mode: inline shows duration + count, minimal shows only duration */
  mode?: 'inline' | 'minimal';
}

/**
 * Self-contained performance profiler wrapper.
 *
 * **Architecture Decision:**
 * Uses local state (not lifted to parent) to prevent "Ripple Effect" where
 * updating metrics would re-render the entire parent gallery and invalidate measurements.
 *
 * **How it works:**
 * 1. React.Profiler measures actualDuration (pure JS execution time)
 * 2. onRender callback updates local state with new metrics
 * 3. Noise filter (< 0.1ms) prevents feedback loops
 * 4. Stats display is sibling (not child) to avoid affecting measurement
 *
 * **Trade-offs:**
 * - ✅ Isolated: One wrapper's state update doesn't affect others
 * - ✅ Simple: Drop-in, no parent refactoring needed
 * - ✅ Accurate: Uses React's actualDuration (JS execution only)
 * - ⚠️ Local state: Can't aggregate metrics across all components
 * - ⚠️ Self-measuring: Wrapper's own re-render is part of the system
 *
 * @example
 * ```tsx
 * <ComponentPerfMonitor name="primary-button" enabled={showPerf}>
 *   <Button label="Primary" hierarchy="primary" />
 * </ComponentPerfMonitor>
 * ```
 */
export const ComponentPerfMonitor = memo<ComponentPerfMonitorProps>(
  ({ children, name, enabled = true, mode = 'inline' }) => {
    // Zero overhead mode: completely bypass profiling when disabled
    if (!enabled || !__DEV__) {
      return <>{children}</>;
    }

    const [stats, setStats] = useState({
      lastRender: 0,
      renderCount: 0,
    });

    const onRender: React.ProfilerOnRenderCallback = useCallback(
      (
        _id,
        _phase,
        actualDuration, // Pure JS execution time (ms)
        _baseDuration, // Time without memoization
        _startTime,
        _commitTime
      ) => {
        /**
         * 🛡️ NOISE FILTER: Critical safety mechanism
         *
         * Why < 0.1ms threshold?
         * 1. Prevents infinite loops: Stats update triggers wrapper re-render,
         *    which would trigger onRender again. Filter catches this.
         * 2. Filters measurement noise: Sub-0.1ms durations are usually
         *    reconciliation overhead, not meaningful component work.
         * 3. React Native + Hermes is fast: Real button renders are > 0.5ms
         *
         * If you see renders < 0.1ms consistently, the child is either:
         * - Properly memoized and doing no work
         * - Or you're measuring the wrong thing
         */
        if (actualDuration < 0.1) return;

        setStats((prev) => ({
          lastRender: actualDuration,
          renderCount: prev.renderCount + 1,
        }));
      },
      []
    );

    /**
     * Color coding based on frame budgets:
     * - 60fps = 16.67ms per frame
     * - 30fps = 33.33ms per frame
     *
     * Green: < 8ms (excellent, leaves budget for other work)
     * Orange: 8-16ms (acceptable, hitting 60fps budget)
     * Red: > 16ms (slow, risk of dropped frames)
     */
    const getColor = (ms: number): string => {
      if (ms < 8) return '#22C55E'; // Green
      if (ms < 16) return '#F59E0B'; // Orange
      return '#EF4444'; // Red
    };

    return (
      <View style={styles.wrapper}>
        {/* 
        Child Container: 
        - flexShrink: 1 prevents squashing button when stats are wide
        - alignSelf: flex-start prevents stretching to full width
      */}
        <View style={styles.childContainer}>
          <Profiler id={name} onRender={onRender}>
            {children}
          </Profiler>
        </View>

        {/* 
        Stats Container (Sibling, not child):
        - Sibling placement prevents stats from being inside profiled tree
        - minWidth prevents layout jitter when numbers change (0.5ms → 10.2ms)
        - Monospace font (Menlo/tabular-nums) for stable digit width
      */}
        <View style={styles.statsContainer}>
          {mode === 'inline' ? (
            <>
              <Text
                style={[styles.timeText, { color: getColor(stats.lastRender) }]}
              >
                {stats.lastRender.toFixed(1)}ms
              </Text>
              <Text style={styles.countText}>#{stats.renderCount}</Text>
            </>
          ) : (
            <Text
              style={[styles.timeText, { color: getColor(stats.lastRender) }]}
            >
              {stats.lastRender.toFixed(1)}ms
            </Text>
          )}
        </View>
      </View>
    );
  }
);

ComponentPerfMonitor.displayName = 'ComponentPerfMonitor';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 4,
  },
  childContainer: {
    alignSelf: 'flex-start',
    flexShrink: 1,
  },
  statsContainer: {
    minWidth: 55, // Fits "10.2ms" without jitter
    alignItems: 'flex-end',
  },
  timeText: {
    fontSize: 10,
    fontWeight: '700',
    // Monospace prevents layout shifts as numbers change
    fontFamily: Platform.select({
      ios: 'Menlo',
      android: 'monospace',
      default: 'monospace',
    }),
    // Tabular nums ensures all digits have same width
    fontVariant: ['tabular-nums'],
  },
  countText: {
    fontSize: 9,
    color: '#9CA3AF',
    fontVariant: ['tabular-nums'],
    marginTop: 2,
  },
});
