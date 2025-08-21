// Place details functions for Google Places API
// Handles retrieving detailed information about specific places

import {
  PlaceDetailsOptions, 
  PlaceDetailsRequest,
  PlaceDetailsResponse, 
  PlacesApiError
} from '@/lib/types';
import { DEFAULT_FIELDS, EXTENDED_FIELDS } from '@/lib/utils';
import {
  createFieldMask,
  makePlacesRequest
} from './base';

/**
 * Get detailed information about a specific place
 */
export async function getPlaceDetails(options: PlaceDetailsOptions): Promise<PlaceDetailsResponse> {
  const { placeId, fields, config } = options;

  if (!placeId || placeId.trim().length === 0) {
    throw new Error('Place ID is required');
  }

  const request: PlaceDetailsRequest = {
    placeId: placeId.trim(),
    fields: fields || DEFAULT_FIELDS
  };

  try {
    const response = await makePlacesRequest<PlaceDetailsResponse>(
      `/places/${placeId}`,
      config,
      {
        method: 'GET',
        headers: {
          'X-Goog-FieldMask': createFieldMask(request.fields!)
        }
      }
    );

    return response;
  } catch (error) {
    if (error instanceof PlacesApiError) {
      throw error;
    }
    throw new PlacesApiError(
      `Failed to get place details: ${error instanceof Error ? error.message : 'Unknown error'}`,
      500
    );
  }
}

/**
 * Get basic place information (name, address, location, rating)
 */
export async function getBasicPlaceDetails(
  placeId: string,
  config?: { baseUrl?: string; apiKey?: string; timeout?: number; }
): Promise<PlaceDetailsResponse> {
  return getPlaceDetails({
    placeId,
    fields: DEFAULT_FIELDS,
    config
  });
}

/**
 * Get comprehensive place information including photos and hours
 */
export async function getExtendedPlaceDetails(
  placeId: string,
  config?: { baseUrl?: string; apiKey?: string; timeout?: number; }
): Promise<PlaceDetailsResponse> {
  return getPlaceDetails({
    placeId,
    fields: EXTENDED_FIELDS,
    config
  });
}

/**
 * Get hotel details with accommodation-specific information
 */
export async function getHotelDetails(
  placeId: string,
  config?: { baseUrl?: string; apiKey?: string; timeout?: number; }
): Promise<PlaceDetailsResponse> {
  const hotelFields = [
    'places.displayName',
    'places.formattedAddress',
    'places.location',
    'places.rating',
    'places.userRatingCount',
    'places.currentOpeningHours',
    'places.photos',
    'places.websiteUri',
    'places.types',
    'places.priceLevel',
    'places.businessStatus'
  ];

  return getPlaceDetails({
    placeId,
    fields: hotelFields,
    config
  });
}

/**
 * Get restaurant details with dining-specific information
 */
export async function getRestaurantDetails(
  placeId: string,
  config?: { baseUrl?: string; apiKey?: string; timeout?: number; }
): Promise<PlaceDetailsResponse> {
  const restaurantFields = [
    'places.displayName',
    'places.formattedAddress',
    'places.location',
    'places.rating',
    'places.userRatingCount',
    'places.currentOpeningHours',
    'places.photos',
    'places.websiteUri',
    'places.types',
    'places.priceLevel',
    'places.businessStatus'
  ];

  return getPlaceDetails({
    placeId,
    fields: restaurantFields,
    config
  });
}

/**
 * Get tourist attraction details
 */
export async function getAttractionDetails(
  placeId: string,
  config?: { baseUrl?: string; apiKey?: string; timeout?: number; }
): Promise<PlaceDetailsResponse> {
  const attractionFields = [
    'places.displayName',
    'places.formattedAddress',
    'places.location',
    'places.rating',
    'places.userRatingCount',
    'places.currentOpeningHours',
    'places.photos',
    'places.websiteUri',
    'places.types',
    'places.businessStatus',
    'places.editorialSummary'
  ];

  return getPlaceDetails({
    placeId,
    fields: attractionFields,
    config
  });
}

/**
 * Get multiple place details in parallel
 */
export async function getMultiplePlaceDetails(
  placeIds: string[],
  config?: { baseUrl?: string; apiKey?: string; timeout?: number; }
): Promise<PlaceDetailsResponse[]> {
  if (!placeIds || placeIds.length === 0) {
    throw new Error('At least one place ID is required');
  }

  if (placeIds.length > 10) {
    throw new Error('Cannot fetch more than 10 places at once');
  }

  const promises = placeIds.map(placeId => 
    getBasicPlaceDetails(placeId, config)
  );

  try {
    return await Promise.all(promises);
  } catch (error) {
    throw new PlacesApiError(
      `Failed to get multiple place details: ${error instanceof Error ? error.message : 'Unknown error'}`,
      500
    );
  }
}
