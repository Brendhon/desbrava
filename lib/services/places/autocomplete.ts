// Autocomplete functions for Google Places API
// Handles place suggestions and predictions

import {
  AutocompleteSearchOptions,
  PlaceAutocompleteRequest,
  PlaceAutocompleteResponse,
  PlacesApiError,
} from '@/lib/types';
import { generateRandomId } from '@/lib/utils';
import { handleSearchError, makePlacesRequest, validateLocation, validateRadius, validateSearchQuery } from './base';

/**
 * Get place suggestions for autocomplete
 */
export async function getPlaceSuggestions(
  options: AutocompleteSearchOptions
): Promise<PlaceAutocompleteResponse | PlacesApiError> {
  const {
    input,
    latitude,
    longitude,
    radius = 50000,
    type,
    sessionToken,
    config,
  } = options;

  // Validate the input
  validateSearchQuery(input);

  // Create the initial request
  const request: PlaceAutocompleteRequest = { input: input.trim() };

  // Add location bias if coordinates are provided
  if (!!latitude && !!longitude) {
    // Validate the location and radius
    validateLocation(latitude, longitude);
    validateRadius(radius);

    // Add location bias to the request
    request.locationBias = {
      circle: {
        center: { latitude, longitude },
        radius,
      },
    };
  }

  // Add session token if provided
  if (sessionToken) request.sessionToken = sessionToken;

  // Add type filtering if specified
  if (type) request.includedPrimaryTypes = [type];

  try {
    // Create the URL, body and method
    const url = '/places:autocomplete';
    const body = JSON.stringify(request);
    const method = 'POST';

    // Make the request
    return await makePlacesRequest<PlaceAutocompleteResponse>(url, config, { method, body });
  } catch (error) {
    return handleSearchError('autocomplete', error);
  }
}

/**
 * Generate a session token for grouping related requests
 */
export function generateSessionToken(): string {
  return generateRandomId(`session_${Date.now()}`);
}
