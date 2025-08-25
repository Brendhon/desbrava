// Nearby search functions for Google Places API
// Handles finding places near a specific location

import {
  NearbySearchOptions,
  PlaceNearbySearchRequest,
  PlaceNearbySearchResponse,
  PlacesApiError
} from '@/lib/types';
import {
  handleSearchError,
  makePlacesRequest,
  validateLocation,
  validatePlaceType,
  validateRadius,
} from './base';

/**
 * Search for places near a specific location
 */
export async function searchNearbyPlaces(
  options: NearbySearchOptions
): Promise<PlaceNearbySearchResponse | PlacesApiError> {
  // Get the options
  const {
    latitude,
    longitude,
    radius,
    type,
    rankByDistance = false,
    config,
  } = options;

  // Validate the location and radius
  validateLocation(latitude, longitude);
  validateRadius(radius);

  // Validate the place type
  validatePlaceType(type);

  // Create the request
  const request: PlaceNearbySearchRequest = {
    includedTypes: [type],
    locationRestriction: {
      circle: {
        center: { latitude, longitude },
        radius,
      },
    },
    rankPreference: rankByDistance ? 'DISTANCE' : 'RELEVANCE',
  };

  // Make the request
  try {
    // Create the URL, body and method
    const url = '/places:searchNearby';
    const body = JSON.stringify(request);
    const method = 'POST';

    // Make the request
    return await makePlacesRequest<PlaceNearbySearchResponse>(url, config, { method, body });
  } catch (error) {
    return handleSearchError('nearby-search', error);
  }
}