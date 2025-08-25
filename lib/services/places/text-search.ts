// Text search functions for Google Places API
// Handles searching places by text queries

import {
  PlaceSearchType,
  PlacesApiConfig,
  PlacesApiError,
  PlaceTextSearchRequest,
  PlaceTextSearchResponse,
  TextSearchOptions,
} from '@/lib/types';
import { makePlacesRequest, validateLocation, validateRadius } from './base';

/**
 * Search for places using text queries
 */
export async function searchPlacesByText(
  options: TextSearchOptions
): Promise<PlaceTextSearchResponse> {
  const { query, latitude, longitude, radius = 10000, type, config } = options;

  if (!query || query.trim().length === 0) {
    throw new Error('Search query is required');
  }

  if (query.trim().length < 2) {
    throw new Error('Search query must be at least 2 characters long');
  }

  const request: PlaceTextSearchRequest = {
    textQuery: query.trim(),
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

  // Add type filtering if specified
  if (type) {
    request.includedTypes = [type];
  }

  try {
    return await makePlacesRequest<PlaceTextSearchResponse>(
      '/places:searchText',
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
      `Failed to search places by text: ${error instanceof Error ? error.message : 'Unknown error'}`,
      500
    );
  }
}

/**
 * Search for hotels by name or description
 */
export async function searchHotelsByText(
  type: PlaceSearchType,
  query: string,
  latitude?: number,
  longitude?: number,
  radius: number = 10000,
  config?: PlacesApiConfig
): Promise<PlaceTextSearchResponse> {
  return searchPlacesByText({
    query,
    latitude,
    longitude,
    radius,
    type,
    config,
  });
}

/**
 * Search for restaurants by name, cuisine, or description
 */
export async function searchRestaurantsByText(
  type: PlaceSearchType,
  query: string,
  latitude?: number,
  longitude?: number,
  radius: number = 5000,
  config?: PlacesApiConfig
): Promise<PlaceTextSearchResponse> {
  return searchPlacesByText({
    query,
    latitude,
    longitude,
    radius,
    type,
    config,
  });
}

/**
 * Search for tourist attractions by name or description
 */
export async function searchAttractionsByText(
  type: PlaceSearchType,
  query: string,
  latitude?: number,
  longitude?: number,
  radius: number = 10000,
  config?: PlacesApiConfig
): Promise<PlaceTextSearchResponse> {
  return searchPlacesByText({
    query,
    latitude,
    longitude,
    radius,
    type,
    config,
  });
}

/**
 * Search for transportation options
 */
export async function searchTransportationByText(
  type: PlaceSearchType,
  query: string,
  latitude?: number,
  longitude?: number,
  radius: number = 10000,
  config?: PlacesApiConfig
): Promise<PlaceTextSearchResponse> {
  return searchPlacesByText({
    query,
    latitude,
    longitude,
    radius,
    type,
    config,
  });
}

/**
 * Search for any type of place
 */
export async function searchAnyPlaceByText(
  type: PlaceSearchType,
  query: string,
  latitude?: number,
  longitude?: number,
  radius: number = 10000,
  config?: PlacesApiConfig
): Promise<PlaceTextSearchResponse> {
  return searchPlacesByText({
    query,
    latitude,
    longitude,
    radius,
    type,
    config,
  });
}
