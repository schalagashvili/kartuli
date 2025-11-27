import { create } from 'zustand';

import type { User } from '@kartuli/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User, token: string) => void;
  clearAuth: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user, token) =>
    set({ user, token, isAuthenticated: true, isLoading: false }),

  clearAuth: () =>
    set({ user: null, token: null, isAuthenticated: false, isLoading: false }),

  setLoading: (loading) => set({ isLoading: loading }),
}));
