import { Platform, type ViewStyle } from 'react-native';

import { type ShadowKey, semanticShadows } from '../tokens/semantics/shadows';

export const applyShadow = (key: ShadowKey): ViewStyle => {
  const def = semanticShadows[key];

  if (Platform.OS === 'android') {
    return {
      elevation: def.elevation,
    };
  }

  return {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: def.offsetY },
    shadowOpacity: def.opacity,
    shadowRadius: def.blur,
  };
};
