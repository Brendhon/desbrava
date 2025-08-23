// Nearby search functions for Google Places API
// Handles finding places near a specific location

import {
  NearbySearchOptions,
  PLACE_TYPES,
  PlaceNearbySearchRequest,
  PlaceNearbySearchResponse,
  PlacesApiConfig,
  PlacesApiError,
} from '@/lib/types';
import { makePlacesRequest, validateLocation, validateRadius } from './base';
import {
  ACCOMMODATION_TYPES,
  getPlaceTypesByCategory,
} from '@/lib/types/places';

/**
 * Search for places near a specific location
 */
export async function searchNearbyPlaces(
  options: NearbySearchOptions
): Promise<PlaceNearbySearchResponse> {
  const {
    latitude,
    longitude,
    radius,
    types,
    rankByDistance = false,
    config,
  } = options;

  validateLocation(latitude, longitude);
  validateRadius(radius);

  if (!types || types.length === 0) {
    throw new Error('At least one place type must be specified');
  }

  const request: PlaceNearbySearchRequest = {
    includedTypes: types,
    locationRestriction: {
      circle: {
        center: { latitude, longitude },
        radius,
      },
    },
    rankPreference: rankByDistance ? 'DISTANCE' : 'RELEVANCE',
  };

  try {
    return await makePlacesRequest<PlaceNearbySearchResponse>(
      '/places:searchNearby',
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
      `Failed to search nearby places: ${error instanceof Error ? error.message : 'Unknown error'}`,
      500
    );
  }
}

/**
 * Find hotels near a location
 */
export async function findNearbyHotels(
  latitude: number,
  longitude: number,
  radius: number = 5000,
  maxResults: number = 20,
  config?: PlacesApiConfig
): Promise<PlaceNearbySearchResponse> {
  return searchNearbyPlaces({
    latitude,
    longitude,
    radius,
    types: getPlaceTypesByCategory('accommodation'),
    maxResults,
    config,
  });
}

/**
 * Find restaurants near a location
 */
export async function findNearbyRestaurants(
  latitude: number,
  longitude: number,
  radius: number = 3000,
  maxResults: number = 20,
  config?: PlacesApiConfig
): Promise<PlaceNearbySearchResponse> {
  return searchNearbyPlaces({
    latitude,
    longitude,
    radius,
    types: getPlaceTypesByCategory('food'),
    maxResults,
    config,
  });
}

/**
 * Find tourist attractions near a location
 */
export async function findNearbyAttractions(
  latitude: number,
  longitude: number,
  radius: number = 10000,
  maxResults: number = 20,
  config?: PlacesApiConfig
): Promise<PlaceNearbySearchResponse> {
  return searchNearbyPlaces({
    latitude,
    longitude,
    radius,
    types: getPlaceTypesByCategory('leisure'),
    maxResults,
    config,
  });
}

/**
 * Find transportation options near a location
 */
export async function findNearbyTransportation(
  latitude: number,
  longitude: number,
  radius: number = 5000,
  maxResults: number = 20,
  config?: PlacesApiConfig
): Promise<PlaceNearbySearchResponse> {
  return searchNearbyPlaces({
    latitude,
    longitude,
    radius,
    types: getPlaceTypesByCategory('transportation'),
    maxResults,
    config,
  });
}

/**
 * Find all types of places near a location
 */
export async function findAllNearbyPlaces(
  latitude: number,
  longitude: number,
  radius: number = 5000,
  maxResults: number = 20,
  config?: PlacesApiConfig
): Promise<PlaceNearbySearchResponse> {
  return searchNearbyPlaces({
    latitude,
    longitude,
    radius,
    types: getPlaceTypesByCategory('other'),
    maxResults,
    config,
  });
}
