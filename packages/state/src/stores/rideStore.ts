import { create } from 'zustand';

import type { Ride } from '@kartuli/types';

interface RideState {
  currentRide: Ride | null;
  rideHistory: Ride[];
  setCurrentRide: (ride: Ride | null) => void;
  addToHistory: (ride: Ride) => void;
  clearHistory: () => void;
}

export const useRideStore = create<RideState>((set) => ({
  currentRide: null,
  rideHistory: [],

  setCurrentRide: (ride) => set({ currentRide: ride }),
  addToHistory: (ride) =>
    set((state) => ({ rideHistory: [ride, ...state.rideHistory] })),
  clearHistory: () => set({ rideHistory: [] }),
}));
