import { Timestamp } from 'firebase/firestore';
import { Country } from './country';

export interface Trip {
  id: string;
  user: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  country: Country;
  createdAt?: string;
  updatedAt?: string;
  startAt?: Timestamp;
  endAt?: Timestamp;
}

export interface CreateTripData {
  user: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  country: Country;
  startAt?: Timestamp;
  endAt?: Timestamp;
}

export interface UpdateTripData {
  name?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  country?: Country;
  startAt?: Timestamp;
  endAt?: Timestamp;
  updatedAt?: string;
}

export const STATUS_OPTIONS = ['all', 'past', 'active', 'future'] as const;
export type StatusFilter = (typeof STATUS_OPTIONS)[number];
