import {
  GEORGIA_COUNTRY_CODE,
  GEORGIA_PHONE_LENGTH,
} from '../constants/constants';

export function isValidGeorgianPhone(phone: string): boolean {
  // Remove all non-digits
  const digits = phone.replace(/\D/g, '');

  // Check if starts with country code
  if (digits.startsWith('995')) {
    return digits.length === 12; // +995 + 9 digits
  }

  // Check if local format
  return digits.length === GEORGIA_PHONE_LENGTH;
}

export function formatGeorgianPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');

  if (digits.startsWith('995')) {
    // Already has country code
    return `+${digits}`;
  }

  return `${GEORGIA_COUNTRY_CODE}${digits}`;
}

export function isValidLocation(lat: number, lng: number): boolean {
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}
