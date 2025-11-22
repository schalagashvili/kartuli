export const GEORGIA_COUNTRY_CODE = '+995';
export const GEORGIA_PHONE_LENGTH = 9;

export const APP_CONFIG = {
  name: 'Kartuli',
  version: '1.0.0',
  defaultLocale: 'ka-GE',
  supportedLocales: ['ka-GE', 'en-US', 'ru-RU'],
} as const;

export const RIDE_CONFIG = {
  maxSearchRadiusKm: 10,
  driverTimeoutSeconds: 30,
  minFareGEL: 3,
  baseFareGEL: 2.5,
  pricePerKmGEL: 0.8,
  pricePerMinuteGEL: 0.2,
  platformFeePercent: 20,
  driverSharePercent: 80,
} as const;

export const MAP_CONFIG = {
  defaultRegion: {
    latitude: 41.7151,
    longitude: 44.8271,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
  zoomLevels: {
    city: 12,
    neighborhood: 14,
    street: 16,
  },
  locationUpdateInterval: 5000, // ms
  locationUpdateDistance: 10, // meters
} as const;

export const VALIDATION = {
  phoneRegex: /^\+9955\d{8}$/,
  otpLength: 6,
  otpExpirySeconds: 120,
  maxLoginAttempts: 5,
} as const;

export const UI_CONFIG = {
  animationDuration: 200,
  toastDuration: 3000,
  debounceMs: 300,
  paginationLimit: 20,
} as const;
