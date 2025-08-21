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
}

export interface CreateTripData {
  user: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  country: Country;
}

export interface UpdateTripData {
  name?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  country?: Country;
}

export const STATUS_OPTIONS = ['all', 'past', 'active', 'future'] as const;
export type StatusFilter = (typeof STATUS_OPTIONS)[number];
