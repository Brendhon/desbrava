// Autocomplete functions for Google Places API
// Handles place suggestions and predictions

import {
  AutocompleteOptions,
  getPlaceTypesByCategory,
  PLACE_TYPES,
  PlaceAutocompleteRequest,
  PlaceAutocompleteResponse,
  PlacesApiConfig,
} from '@/lib/types';
import { makePlacesRequest, validateLocation, validateRadius } from './base';
import { PlacesApiError } from '@/lib/types';
import { get } from 'http';

/**
 * Get place suggestions for autocomplete
 */
export async function getPlaceSuggestions(
  options: AutocompleteOptions
): Promise<PlaceAutocompleteResponse> {
  const {
    input,
    latitude,
    longitude,
    radius = 50000,
    types,
    maxResults = 20,
    sessionToken,
    config,
  } = options;

  if (!input || input.trim().length === 0) {
    throw new Error('Input text is required');
  }

  if (input.trim().length < 2) {
    throw new Error('Input text must be at least 2 characters long');
  }

  const request: PlaceAutocompleteRequest = {
    input: input.trim(),
  };

  // Add location bias if coordinates are provided
  if (latitude !== undefined && longitude !== undefined) {
    validateLocation(latitude, longitude);
    validateRadius(radius);

    request.locationBias = {
      circle: {
        center: { latitude, longitude },
        radius,
      },
    };
  }

  // Add session token if provided
  if (sessionToken) {
    request.sessionToken = sessionToken;
  }

  try {
    return await makePlacesRequest<PlaceAutocompleteResponse>(
      '/places:autocomplete',
      config,
      {
        method: 'POST',
        body: JSON.stringify(request),
      }
    );
  } catch (error) {
    if (error instanceof PlacesApiError) {
      throw error;
    }
    throw new PlacesApiError(
      `Failed to get autocomplete suggestions: ${error instanceof Error ? error.message : 'Unknown error'}`,
      500
    );
  }
}

/**
 * Get destination suggestions (cities, countries, regions)
 */
export async function getDestinationSuggestions(
  input: string,
  maxResults: number = 10,
  config?: PlacesApiConfig
): Promise<PlaceAutocompleteResponse> {
  return getPlaceSuggestions({
    input,
    types: getPlaceTypesByCategory('transportation'),
    maxResults,
    config,
  });
}

/**
 * Get hotel suggestions
 */
export async function getHotelSuggestions(
  input: string,
  latitude?: number,
  longitude?: number,
  radius: number = 50000,
  maxResults: number = 10,
  config?: PlacesApiConfig
): Promise<PlaceAutocompleteResponse> {
  return getPlaceSuggestions({
    input,
    latitude,
    longitude,
    radius,
    types: getPlaceTypesByCategory('accommodation'),
    maxResults,
    config,
  });
}

/**
 * Get restaurant suggestions
 */
export async function getRestaurantSuggestions(
  input: string,
  latitude?: number,
  longitude?: number,
  radius: number = 5000,
  maxResults: number = 10,
  config?: PlacesApiConfig
): Promise<PlaceAutocompleteResponse> {
  return getPlaceSuggestions({
    input,
    latitude,
    longitude,
    radius,
    types: getPlaceTypesByCategory('food'),
    maxResults,
    config,
  });
}

/**
 * Get tourist attraction suggestions
 */
export async function getTouristAttractionSuggestions(
  input: string,
  latitude?: number,
  longitude?: number,
  radius: number = 10000,
  maxResults: number = 10,
  config?: PlacesApiConfig
): Promise<PlaceAutocompleteResponse> {
  return getPlaceSuggestions({
    input,
    latitude,
    longitude,
    radius,
    types: getPlaceTypesByCategory('leisure'),
    maxResults,
    config,
  });
}

/**
 * Generate a session token for grouping related requests
 */
export function generateSessionToken(): string {
  return `session_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
}
