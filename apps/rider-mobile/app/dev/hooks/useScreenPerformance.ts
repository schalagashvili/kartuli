/* eslint-disable no-console */
import { useEffect, useRef, useState } from 'react';

import { InteractionManager } from 'react-native';

export interface ScreenPerformanceMetrics {
  screenName: string;
  mountTime: number;
  timeToInteractive: number;
  updateCount: number;
  lastUpdateTime: number;
  interactiveAt: number | null;
}

interface UseScreenPerformanceOptions {
  screenName: string;
  enabled?: boolean;
  logToConsole?: boolean;
}

/**
 * Hook for tracking screen-level performance metrics.
 *
 * Measures:
 * 1. Mount time: Component mount → first render complete
 * 2. Time to Interactive (TTI): Mount → all async work complete
 * 3. Update count: Number of re-renders
 * 4. Update time: Duration of last re-render
 */
export const useScreenPerformance = (options: UseScreenPerformanceOptions) => {
  const { screenName, enabled = true, logToConsole = false } = options;

  // Capture mount start time immediately
  const mountStartRef = useRef<number>(performance.now());
  const renderCountRef = useRef<number>(0);
  const lastRenderStartRef = useRef<number>(0);
  const isInteractiveRef = useRef<boolean>(false);

  const [metrics, setMetrics] = useState<ScreenPerformanceMetrics>({
    screenName,
    mountTime: 0,
    timeToInteractive: 0,
    updateCount: 0,
    lastUpdateTime: 0,
    interactiveAt: null,
  });

  // Capture render start time (runs before commit)
  lastRenderStartRef.current = performance.now();

  useEffect(() => {
    if (!enabled || !__DEV__) return;

    const renderEnd = performance.now();
    const renderDuration = renderEnd - lastRenderStartRef.current;
    renderCountRef.current += 1;

    const isFirstRender = renderCountRef.current === 1;

    if (isFirstRender) {
      // Mount time: from component creation to first render complete
      const mountTime = renderEnd - mountStartRef.current;

      setMetrics((prev) => ({
        ...prev,
        mountTime,
        updateCount: 0,
      }));

      if (logToConsole) {
        console.log(`📊 [${screenName}] Mount: ${mountTime.toFixed(1)}ms`);
      }

      // Measure Time to Interactive (TTI)
      const interactionHandle = InteractionManager.runAfterInteractions(() => {
        const ttiEnd = performance.now();
        const tti = ttiEnd - mountStartRef.current;

        isInteractiveRef.current = true;

        setMetrics((prev) => ({
          ...prev,
          timeToInteractive: tti,
          interactiveAt: ttiEnd,
        }));

        if (logToConsole) {
          console.log(`✅ [${screenName}] TTI: ${tti.toFixed(1)}ms`);
        }
      });

      return () => {
        interactionHandle.cancel();
      };
    } else {
      // Update metrics for re-renders
      setMetrics((prev) => ({
        ...prev,
        updateCount: renderCountRef.current - 1,
        lastUpdateTime: renderDuration,
      }));

      if (logToConsole && renderDuration > 16) {
        console.warn(
          `⚠️ [${screenName}] Slow update: ${renderDuration.toFixed(1)}ms (update #${renderCountRef.current - 1})`
        );
      }
    }
  }, [enabled, logToConsole, screenName]);

  // Reset metrics on unmount
  useEffect(() => {
    return () => {
      if (enabled && __DEV__ && logToConsole) {
        console.log(
          `🔚 [${screenName}] Unmount after ${renderCountRef.current} renders`
        );
      }
    };
  }, [enabled, logToConsole, screenName]);

  return {
    metrics,
    isInteractive: isInteractiveRef.current,
  };
};
