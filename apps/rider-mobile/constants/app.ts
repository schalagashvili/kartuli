import Constants from 'expo-constants';

export interface AppIdentity {
  appName: string;
  appVersion: string;
  bundleId: string;
}

const expoConfig = Constants.expoConfig;

if (!expoConfig) {
  throw new Error('Expo config not found');
}

export const APP_IDENTITY: AppIdentity = {
  appName: expoConfig.name,
  appVersion: expoConfig.version ?? '1.0.0',
  bundleId:
    expoConfig.ios?.bundleIdentifier ??
    expoConfig.android?.package ??
    'unknown',
} as const;
