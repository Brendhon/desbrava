import { CreateTripData, Trip } from '@/lib/types/trip';
import { normalizeString } from './string-utils';

/**
 * Validate trip data before creation
 */
export function validateTripData(data: CreateTripData): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Check required fields
  if (!data.name?.trim()) {
    errors.push('Trip name is required');
  }

  if (!data.description?.trim()) {
    errors.push('Trip description is required');
  }

  if (!data.startDate) {
    errors.push('Start date is required');
  }

  if (!data.endDate) {
    errors.push('End date is required');
  }

  if (!data.country) {
    errors.push('Country is required');
  }

  // Validate dates if they exist
  if (data.startDate && data.endDate) {
    const startDate = parsePtBrToDate(data.startDate);
    const endDate = parsePtBrToDate(data.endDate);

    if (isNaN(startDate.getTime())) {
      errors.push('Invalid start date format');
    }

    if (isNaN(endDate.getTime())) {
      errors.push('Invalid end date format');
    }

    if (startDate >= endDate) {
      errors.push('Start date must be before end date');
    }

    // Check if start date is not in the past (optional validation)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (startDate < today) {
      errors.push('Start date cannot be in the past');
    }
  }

  // Validate name length
  if (data.name && data.name.length > 100) {
    errors.push('Trip name must be less than 100 characters');
  }

  // Validate description length
  if (data.description && data.description.length > 500) {
    errors.push('Trip description must be less than 500 characters');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Format trip dates for display
 */
export function formatTripDates(startDate: string, endDate: string): string {
  const start = parsePtBrToDate(startDate);
  const end = parsePtBrToDate(endDate);

  const startFormatted = start.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const endFormatted = end.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return `${startFormatted} - ${endFormatted}`;
}

/**
 * Calculate trip duration in days
 */
export function calculateTripDuration(
  startDate?: string,
  endDate?: string
): number {
  if (!startDate || !endDate) return 0;

  const start = parsePtBrToDate(startDate);
  const end = parsePtBrToDate(endDate);

  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays + 1;
}

/**
 * Check if trip is currently active
 */
export function isTripActive(trip: Trip): boolean {
  const now = new Date();
  const start = parsePtBrToDate(trip.startDate);
  const end = parsePtBrToDate(trip.endDate);

  return now >= start && now <= end;
}

/**
 * Check if trip is in the future
 */
export function isTripFuture(trip: Trip): boolean {
  const now = new Date();
  const start = parsePtBrToDate(trip.startDate);

  return start > now;
}

/**
 * Check if trip is in the past
 */
export function isTripPast(trip: Trip): boolean {
  const now = new Date();
  const end = parsePtBrToDate(trip.endDate);

  return end < now;
}

/**
 * Get trip status
 */
export function getTripStatus(trip: Trip): 'past' | 'active' | 'future' {
  if (isTripActive(trip)) return 'active';
  if (isTripFuture(trip)) return 'future';
  return 'past';
}

/**
 * Sort trips by proximity to the current date.
 * If order is 'asc', trips closer to now come first.
 * If order is 'desc', trips farther from now come first.
 */
export function sortTripsByDate(
  trips: Trip[],
  order: 'asc' | 'desc' = 'asc'
): Trip[] {
  const now = new Date().getTime();
  return [...trips].sort((a, b) => {
    const dateA = parsePtBrToDate(a.startDate).getTime();
    const dateB = parsePtBrToDate(b.startDate).getTime();
    const diffA = Math.abs(dateA - now);
    const diffB = Math.abs(dateB - now);

    return order === 'asc' ? diffA - diffB : diffB - diffA;
  });
}

/**
 * Filter trips by status
 */
export function filterTripsByStatus(
  trips: Trip[],
  status: 'past' | 'active' | 'future'
): Trip[] {
  return trips.filter((trip) => getTripStatus(trip) === status);
}

/**
 * Search trips by text
 */
export function searchTripsByText(trips: Trip[], searchTerm: string): Trip[] {
  const term = normalizeString(searchTerm);

  if (!term) return trips;

  return trips.filter(
    (trip) =>
      normalizeString(trip.name).includes(term) ||
      normalizeString(trip.description).includes(term) ||
      normalizeString(trip.country.country).includes(term) ||
      normalizeString(trip.startDate).includes(term) ||
      normalizeString(trip.endDate).includes(term)
  );
}

/**
 * Parse date from string to Date
 */
export function parsePtBrToDate(date: string): Date {
  const [day, month, year] = date.split('/');
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}
