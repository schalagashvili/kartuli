export interface User {
  id: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  role: 'rider' | 'driver';
  createdAt: string;
  updatedAt: string;
}

export interface Rider extends User {
  role: 'rider';
  rating: number;
  totalRides: number;
}

export interface Driver extends User {
  role: 'driver';
  rating: number;
  totalRides: number;
  vehicleInfo: VehicleInfo;
  isOnline: boolean;
  isVerified: boolean;
  documents: DriverDocuments;
}

export interface VehicleInfo {
  make: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
}

export interface DriverDocuments {
  licenseUrl?: string;
  insuranceUrl?: string;
  vehicleRegistrationUrl?: string;
  verified: boolean;
}

export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
  timestamp?: string;
}

export type RideStatus =
  | 'requested'
  | 'accepted'
  | 'arrived'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export interface Ride {
  id: string;
  riderId: string;
  driverId?: string;
  status: RideStatus;
  pickupLocation: Location;
  dropoffLocation: Location;
  fare: number;
  distance: number;
  estimatedDuration: number;
  requestedAt: string;
  acceptedAt?: string;
  startedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  cancelledBy?: 'rider' | 'driver';
}

export type PaymentMethod = 'cash' | 'card';
export type PaymentStatus = 'pending' | 'completed' | 'failed';

export interface Payment {
  id: string;
  rideId: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  createdAt: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
}
