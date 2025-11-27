import * as Haptics from 'expo-haptics';

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

export const haptics = {
  light: () => triggerHaptic(Haptics.ImpactFeedbackStyle.Light),
  medium: () => triggerHaptic(Haptics.ImpactFeedbackStyle.Medium),
  heavy: () => triggerHaptic(Haptics.ImpactFeedbackStyle.Heavy),
  rigid: () => triggerHaptic(Haptics.ImpactFeedbackStyle.Rigid),
  soft: () => triggerHaptic(Haptics.ImpactFeedbackStyle.Soft),
} as const;
