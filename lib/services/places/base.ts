// Base utilities for Google Places API
// This module provides common functionality and configuration

import { PlacesApiConfig, PlacesApiError, PlaceSearchType } from '@/lib/types';

const GOOGLE_PLACES_API_BASE = 'https://places.googleapis.com/v1';
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

if (!API_KEY) {
  throw new Error('NEXT_PUBLIC_GOOGLE_PLACES_API_KEY is not configured');
}

/**
 * Make a request to the Google Places API
 */
export async function makePlacesRequest<T>(
  endpoint: string,
  config: PlacesApiConfig = {},
  options: RequestInit = {}
): Promise<T> {
  const baseUrl = config.baseUrl || GOOGLE_PLACES_API_BASE;
  const apiKey = config.apiKey || API_KEY!;
  const timeout = config.timeout || 10000;

  const url = `${baseUrl}${endpoint}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        ...options.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new PlacesApiError(
        errorData.error?.message || `HTTP ${response.status}`,
        response.status,
        errorData.error?.code
      );
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof PlacesApiError) {
      throw error;
    }

    if (error instanceof Error && error.name === 'AbortError') {
      throw new PlacesApiError('Request timeout', 408);
    }

    throw new PlacesApiError(
      error instanceof Error ? error.message : 'Unknown error',
      500
    );
  }
}

/**
 * Create a field mask for API requests
 */
export function createFieldMask(fields: string[]): string {
  return fields.join(',');
}

/**
 * Validate location coordinates
 */
export function validateLocation(lat?: number, lng?: number): void {
  if (!lat || !lng) {
    throw new Error('Latitude and longitude are required');
  }

  if (lat < -90 || lat > 90) {
    throw new Error('Latitude must be between -90 and 90');
  }
  if (lng < -180 || lng > 180) {
    throw new Error('Longitude must be between -180 and 180');
  }
}

/**
 * Validate radius value
 */
export function validateRadius(radius: number): void {
  if (radius <= 0 || radius > 50000) {
    throw new Error('Radius must be between 0 and 50000 meters');
  }
}

/**
 * Validate search query
 */
export function validateSearchQuery(query: string): void {
  if (!query || query.trim().length === 0) {
    throw new Error('Search query is required');
  }

  if (query.trim().length < 2) {
    throw new Error('Search query must be at least 2 characters long');
  }
}

/**
 * Validate place type
 */
export function validatePlaceType(type: PlaceSearchType): void {
  if (!type) {
    throw new Error('Place type is required');
  }
}

/**
 * Handle error
 */
export const handleSearchError = (searchType: string, error: unknown): PlacesApiError => {
  // If the error is an instance of PlacesApiError, throw it
  if (error instanceof PlacesApiError) {
    throw error;
  }

  // Create the message
  const message = `${searchType}: ${error instanceof Error ? error.message : 'Unknown error'}`;

  // Throw a new PlacesApiError with the message and status code 500
  throw new PlacesApiError(message, 500);
};