// Autocomplete functions for Google Places API
// Handles place suggestions and predictions

import {
  AutocompleteOptions,
  PlaceAutocompleteRequest,
  PlaceAutocompleteResponse,
  PlacesApiError,
} from '@/lib/types';
import { generateRandomId } from '@/lib/utils';
import { makePlacesRequest, validateLocation, validateRadius } from './base';

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
    type,
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

  if (type) {
    request.includedPrimaryTypes = [type];
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
 * Generate a session token for grouping related requests
 */
export function generateSessionToken(): string {
  return generateRandomId(`session_${Date.now()}`);
}
