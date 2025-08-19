import { Country } from "./country";

export interface Trip {
  id: string;
  userId: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  country: Country;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateTripData {
  userId: string;
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