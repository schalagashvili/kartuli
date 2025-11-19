import { create } from 'zustand';

import type { Location } from '@kartuli/types';

interface LocationState {
  currentLocation: Location | null;
  permissionGranted: boolean;
  isTracking: boolean;

  // Actions
  setCurrentLocation: (location: Location) => void;
  setPermissionGranted: (granted: boolean) => void;
  setTracking: (tracking: boolean) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  currentLocation: null,
  permissionGranted: false,
  isTracking: false,

  setCurrentLocation: (location) => set({ currentLocation: location }),
  setPermissionGranted: (granted) => set({ permissionGranted: granted }),
  setTracking: (tracking) => set({ isTracking: tracking }),
}));
