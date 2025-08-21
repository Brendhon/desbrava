// Text search functions for Google Places API
// Handles searching places by text queries

import {
  PLACE_TYPES,
  PlacesApiError,
  PlaceTextSearchRequest,
  PlaceTextSearchResponse,
  PlaceType,
} from '@/lib/types';
import { makePlacesRequest, validateLocation, validateRadius } from './base';

export interface TextSearchOptions {
  query: string;
  latitude?: number;
  longitude?: number;
  radius?: number;
  types?: PlaceType[];
  maxResults?: number;
  config?: {
    baseUrl?: string;
    apiKey?: string;
    timeout?: number;
  };
}

/**
 * Search for places using text queries
 */
export async function searchPlacesByText(
  options: TextSearchOptions
): Promise<PlaceTextSearchResponse> {
  const {
    query,
    latitude,
    longitude,
    radius = 10000,
    types,
    maxResults = 20,
    config,
  } = options;

  if (!query || query.trim().length === 0) {
    throw new Error('Search query is required');
  }

  if (query.trim().length < 2) {
    throw new Error('Search query must be at least 2 characters long');
  }

  const request: PlaceTextSearchRequest = {
    textQuery: query.trim(),
    maxResultCount: Math.min(maxResults, 20), // API limit is 20
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
  if (types && types.length > 0) {
    request.includedTypes = types;
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
  query: string,
  latitude?: number,
  longitude?: number,
  radius: number = 10000,
  maxResults: number = 20,
  config?: { baseUrl?: string; apiKey?: string; timeout?: number }
): Promise<PlaceTextSearchResponse> {
  return searchPlacesByText({
    query,
    latitude,
    longitude,
    radius,
    types: [PLACE_TYPES.LODGING],
    maxResults,
    config,
  });
}

/**
 * Search for restaurants by name, cuisine, or description
 */
export async function searchRestaurantsByText(
  query: string,
  latitude?: number,
  longitude?: number,
  radius: number = 5000,
  maxResults: number = 20,
  config?: { baseUrl?: string; apiKey?: string; timeout?: number }
): Promise<PlaceTextSearchResponse> {
  return searchPlacesByText({
    query,
    latitude,
    longitude,
    radius,
    types: [
      PLACE_TYPES.RESTAURANT,
      PLACE_TYPES.CAFE,
      PLACE_TYPES.BAR,
      PLACE_TYPES.BAKERY,
    ],
    maxResults,
    config,
  });
}

/**
 * Search for tourist attractions by name or description
 */
export async function searchAttractionsByText(
  query: string,
  latitude?: number,
  longitude?: number,
  radius: number = 10000,
  maxResults: number = 20,
  config?: { baseUrl?: string; apiKey?: string; timeout?: number }
): Promise<PlaceTextSearchResponse> {
  return searchPlacesByText({
    query,
    latitude,
    longitude,
    radius,
    types: [
      PLACE_TYPES.TOURIST_ATTRACTION,
      PLACE_TYPES.MUSEUM,
      PLACE_TYPES.ART_GALLERY,
      PLACE_TYPES.PARK,
      PLACE_TYPES.AMUSEMENT_PARK,
      PLACE_TYPES.AQUARIUM,
      PLACE_TYPES.ZOO,
    ],
    maxResults,
    config,
  });
}

/**
 * Search for transportation options
 */
export async function searchTransportationByText(
  query: string,
  latitude?: number,
  longitude?: number,
  radius: number = 10000,
  maxResults: number = 20,
  config?: { baseUrl?: string; apiKey?: string; timeout?: number }
): Promise<PlaceTextSearchResponse> {
  return searchPlacesByText({
    query,
    latitude,
    longitude,
    radius,
    types: [
      PLACE_TYPES.AIRPORT,
      PLACE_TYPES.TRAIN_STATION,
      PLACE_TYPES.BUS_STATION,
      PLACE_TYPES.SUBWAY_STATION,
    ],
    maxResults,
    config,
  });
}

/**
 * Search for any type of place
 */
export async function searchAnyPlaceByText(
  query: string,
  latitude?: number,
  longitude?: number,
  radius: number = 10000,
  maxResults: number = 20,
  config?: { baseUrl?: string; apiKey?: string; timeout?: number }
): Promise<PlaceTextSearchResponse> {
  return searchPlacesByText({
    query,
    latitude,
    longitude,
    radius,
    maxResults,
    config,
  });
}
