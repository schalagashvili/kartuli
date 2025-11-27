import type { Location } from '@kartuli/types';

export function calculateDistance(loc1: Location, loc2: Location): number {
  const R = 6371;
  const dLat = toRad(loc2.latitude - loc1.latitude);
  const dLon = toRad(loc2.longitude - loc1.longitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(loc1.latitude)) *
      Math.cos(toRad(loc2.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export function estimateDuration(distanceKm: number): number {
  const avgSpeed = 25;
  return Math.round((distanceKm / avgSpeed) * 60);
}

export function calculateFare(distanceKm: number): number {
  const BASE_FARE = 2;
  const PRICE_PER_KM = 0.9;
  const MIN_FARE = 5;

  const fare = BASE_FARE + distanceKm * PRICE_PER_KM;
  return Math.max(fare, MIN_FARE);
}
