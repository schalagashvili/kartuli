/* eslint-disable no-console */
import React, {
  Profiler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { InteractionManager, StyleSheet, Text, View } from 'react-native';

interface ScreenPerfMonitorProps {
  children: React.ReactNode;
  screenName: string;
  enabled?: boolean;
}

/**
 * Screen-level performance monitor with TTI tracking.
 *
 * Tracks:
 * 1. MOUNT: Initial render time
 * 2. TTI: Time until screen is interactive (async work complete)
 * 3. UPDATE: Re-render cost
 */
export const ScreenPerfMonitor = ({
  children,
  screenName,
  enabled = true,
}: ScreenPerfMonitorProps) => {
  // Track mount start immediately (before first render)
  const mountStartRef = useRef(performance.now());
  const [metrics, setMetrics] = useState({
    mountTime: 0,
    tti: 0,
    lastUpdate: 0,
    updateCount: 0,
  });

  const onRender: React.ProfilerOnRenderCallback = useCallback(
    (_id, phase, actualDuration) => {
      if (actualDuration < 0.5) return;

      if (phase === 'mount') {
        setMetrics((prev) => ({ ...prev, mountTime: actualDuration }));
      } else {
        setMetrics((prev) => ({
          ...prev,
          lastUpdate: actualDuration,
          updateCount: prev.updateCount + 1,
        }));
      }
    },
    []
  );

  // Measure TTI (Time to Interactive)
  useEffect(() => {
    if (!enabled || !__DEV__) return;

    const handle = InteractionManager.runAfterInteractions(() => {
      const ttiEnd = performance.now();
      const tti = ttiEnd - mountStartRef.current;

      setMetrics((prev) => ({ ...prev, tti }));

      console.log(`✅ [${screenName}] TTI: ${tti.toFixed(1)}ms`);
    });

    return () => handle.cancel();
  }, [screenName, enabled]);

  const getColor = (ms: number) => {
    if (ms === 0) return '#6B7280'; // Gray (not measured yet)
    if (ms < 100) return '#22C55E'; // Green (< 100ms excellent)
    if (ms < 300) return '#F59E0B'; // Orange (< 300ms acceptable)
    return '#EF4444'; // Red (slow)
  };

  return <>{children}</>;
  if (!enabled || !__DEV__) {
  }

  return (
    <View style={styles.container}>
      <Profiler id={`screen-${screenName}`} onRender={onRender}>
        {children}
      </Profiler>

      {/* Floating Overlay */}
      <View style={styles.overlay} pointerEvents="none">
        <View style={styles.badge}>
          <Text style={styles.label}>MOUNT</Text>
          <Text style={[styles.value, { color: getColor(metrics.mountTime) }]}>
            {metrics.mountTime > 0 ? `${metrics.mountTime.toFixed(1)}ms` : '⏳'}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.badge}>
          <Text style={styles.label}>TTI</Text>
          <Text style={[styles.value, { color: getColor(metrics.tti) }]}>
            {metrics.tti > 0 ? `${metrics.tti.toFixed(0)}ms` : '⏳'}
          </Text>
        </View>

        {metrics.updateCount > 0 && (
          <>
            <View style={styles.divider} />
            <View style={styles.badge}>
              <Text style={styles.label}>UPDATE</Text>
              <Text
                style={[styles.value, { color: getColor(metrics.lastUpdate) }]}
              >
                {metrics.lastUpdate.toFixed(1)}ms
              </Text>
              <Text style={styles.count}>#{metrics.updateCount}</Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 50,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderRadius: 8,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    zIndex: 9999,
  },
  badge: {
    alignItems: 'flex-end',
  },
  label: {
    fontSize: 9,
    color: '#9CA3AF',
    fontWeight: '600',
    marginBottom: 2,
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'Menlo',
    fontVariant: ['tabular-nums'],
  },
  count: {
    fontSize: 9,
    color: '#6B7280',
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
});
