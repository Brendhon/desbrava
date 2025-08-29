// Nearby search functions for Google Places API
// Handles finding places near a specific location

import {
  NearbySearchOptions,
  PlaceNearbySearchRequest,
  PlaceNearbySearchResponse,
  PlacesApiError,
} from '@/lib/types';
import {
  createFieldMask,
  handleSearchError,
  makePlacesRequest,
  validateLocation,
  validatePlaceType,
  validateRadius,
} from './base';
import { DEFAULT_FIELDS } from '@/lib/utils';

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
    includedPrimaryTypes: [type],
    locationRestriction: {
      circle: {
        center: { latitude: latitude!, longitude: longitude! },
        radius,
      },
    },
    rankPreference: rankByDistance ? 'DISTANCE' : 'POPULARITY',
  };

  // Make the request
  try {
    // Create the URL, body and method
    const url = '/places:searchNearby';
    const body = JSON.stringify(request);
    const method = 'POST';

    // Make the request
    return await makePlacesRequest<PlaceNearbySearchResponse>(url, config, {
      method,
      body,
      headers: {
        'X-Goog-FieldMask': createFieldMask(DEFAULT_FIELDS, 'places.'),
      },
    });
  } catch (error) {
    return handleSearchError('nearby-search', error);
  }
}
