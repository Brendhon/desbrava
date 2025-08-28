import { Trip } from '@/lib/types/trip';
import { parsePtBrToDate } from './date';
import { normalizeString } from './string-utils';

/**
 * Format trip dates for display
 */
export function formatTripDates(startDate: string, endDate: string): string {
  const start = parsePtBrToDate(startDate);
  const end = parsePtBrToDate(endDate);

  const startFormatted = start?.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const endFormatted = end?.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  // If start date is the same as end date, return only the start date
  if (startFormatted === endFormatted) return startFormatted ?? '';

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

  const diffTime = Math.abs((end?.getTime() ?? 0) - (start?.getTime() ?? 0));
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

  return now >= (start ?? 0) && now <= (end ?? 0);
}

/**
 * Check if trip is in the future
 */
export function isTripFuture(trip: Trip): boolean {
  const now = new Date();
  const start = parsePtBrToDate(trip.startDate);

  return (start ?? 0) > now;
}

/**
 * Check if trip is in the past
 */
export function isTripPast(trip: Trip): boolean {
  const now = new Date();
  const end = parsePtBrToDate(trip.endDate);

  return (end ?? 0) < now;
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
    const dateA = parsePtBrToDate(a.startDate)?.getTime() ?? 0;
    const dateB = parsePtBrToDate(b.startDate)?.getTime() ?? 0;
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
