import enRider from './locales/en/rider.json';
import kaRider from './locales/ka/rider.json';

export const namespaces = {
  rider: {
    en: enRider,
    ka: kaRider,
  },
  // Example: Add more namespaces as your app grows
  // orders: {
  //   en: enOrders,
  //   ka: kaOrders,
  // },
} as const;

export type RiderKey = keyof typeof enRider;

export const NAMESPACE_NAMES = Object.keys(
  namespaces
) as (keyof typeof namespaces)[];
