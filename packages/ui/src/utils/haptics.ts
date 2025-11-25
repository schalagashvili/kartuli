import * as Haptics from 'expo-haptics';

/**
 * Triggers haptic feedback with error handling.
 * Silently fails in environments that don't support haptics.
 *
 * @param style - The haptic feedback style to trigger
 */
export const triggerHaptic = async (
  style: Haptics.ImpactFeedbackStyle
): Promise<void> => {
  try {
    await Haptics.impactAsync(style);
  } catch (error) {
    if (__DEV__) {
      console.warn('[Haptics] Feedback failed:', error);
    }
  }
};

/**
 * Convenience wrappers for common haptic patterns.
 * Use these for consistent haptic feedback across the app.
 *
 * @example
 * ```tsx
 * import { haptics } from '@kartuli/ui/utils';
 *
 * <Button onPress={() => haptics.light()} />
 * ```
 */
export const haptics = {
  /** Light impact - for lightweight interactions like button taps */
  light: () => triggerHaptic(Haptics.ImpactFeedbackStyle.Light),

  /** Medium impact - for standard interactions like toggles, selections */
  medium: () => triggerHaptic(Haptics.ImpactFeedbackStyle.Medium),

  /** Heavy impact - for significant actions like confirmations, completions */
  heavy: () => triggerHaptic(Haptics.ImpactFeedbackStyle.Heavy),

  /** Rigid impact - for precise interactions like sliders at min/max */
  rigid: () => triggerHaptic(Haptics.ImpactFeedbackStyle.Rigid),

  /** Soft impact - for subtle feedback like hover states */
  soft: () => triggerHaptic(Haptics.ImpactFeedbackStyle.Soft),
} as const;
