// Text search functions for Google Places API
// Handles searching places by text queries

import {
  PlacesApiError,
  PlaceTextSearchRequest,
  PlaceTextSearchResponse,
  TextSearchOptions,
} from '@/lib/types';
import {
  handleSearchError,
  makePlacesRequest,
  validateLocation,
  validateRadius,
  validateSearchQuery,
} from './base';

/**
 * Search for places using text queries
 */
export async function searchPlacesByText(
  options: TextSearchOptions
): Promise<PlaceTextSearchResponse | PlacesApiError> {
  // Get the options
  const { query, latitude, longitude, radius = 10000, type, config } = options;

  // Validate the search query
  validateSearchQuery(query);

  // Create the initial request
  const request: PlaceTextSearchRequest = { textQuery: query };

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

  // Add type filtering if specified
  if (type) request.includedTypes = [type];

  // Make the request
  try {
    // Create the URL, body and method
    const url = '/places:searchText';
    const body = JSON.stringify(request);
    const method = 'POST';

    // Make the request
    return await makePlacesRequest<PlaceTextSearchResponse>(url, config, {
      method,
      body,
    });
  } catch (error) {
    return handleSearchError('text-search', error);
  }
}
