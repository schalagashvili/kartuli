/**
 * Translation namespaces registry for the Rider app
 *
 * This file centralizes all translation namespaces used in the app,
 * making it easy to:
 * - See all available namespaces at a glance
 * - Add new namespaces by simply adding new entries
 * - Keep types in sync with namespace files
 */
import enRider from './locales/en/rider.json';
import kaRider from './locales/ka/rider.json';

/**
 * Namespace definitions
 * Add new namespaces here when adding new translation domains
 */
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

/**
 * Type-safe keys for each namespace
 */
export type RiderKey = keyof typeof enRider;
// export type OrdersKey = keyof typeof enOrders;

/**
 * Get all namespace names
 */
export const NAMESPACE_NAMES = Object.keys(
  namespaces
) as (keyof typeof namespaces)[];
