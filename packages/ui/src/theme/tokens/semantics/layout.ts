import { Platform } from 'react-native';

export const semanticLayout = {
  header: {
    height: Platform.select({ ios: 44, default: 56 }),
  },

  tabBar: {
    height: Platform.select({ ios: 49, default: 56 }),
  },

  bottomSheet: {
    handleHeight: 24,
    peekHeight: 80,
    collapsed: '15%',
    expanded: '90%',
  },

  // Map overlay safe zones (for Kartuli)
  mapOverlay: {
    topInset: 100, // Space for search bar
    bottomInset: 140, // Space for ride card
    sideInset: 16, // Edge padding
  },

  hitSlop: {
    sm: 8,
    md: 12,
    lg: 16,
  },
} as const;

export type SemanticLayout = typeof semanticLayout;
