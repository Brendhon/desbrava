// Place details functions for Google Places API
// Handles retrieving detailed information about specific places

import {
  PlacesApiConfig,
  PlaceDetailsOptions,
  PlaceDetailsRequest,
  PlaceDetailsResponse,
  PlacesApiError,
  PlaceSearchType,
  ActivityTypeKey,
  Place,
} from '@/lib/types';
import {
  ATTRACTION_FIELDS,
  DEFAULT_FIELDS,
  EXTENDED_FIELDS,
  HOTEL_FIELDS,
  RESTAURANT_FIELDS,
} from '@/lib/utils';
import { createFieldMask, makePlacesRequest } from './base';

/**
 * Get detailed information about a specific place
 */
async function makePlaceDetailsRequest(
  options: PlaceDetailsOptions
): Promise<Place> {
  const { placeId, fields, config } = options;

  if (!placeId || placeId.trim().length === 0) {
    throw new Error('Place ID is required');
  }

  const request: PlaceDetailsRequest = {
    placeId: placeId.trim(),
    fields: fields || DEFAULT_FIELDS,
  };

  try {
    const response = await makePlacesRequest<Place>(
      `/places/${placeId}`,
      config,
      {
        method: 'GET',
        headers: {
          'X-Goog-FieldMask': createFieldMask(request.fields!),
        },
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
  config?: PlacesApiConfig
): Promise<Place> {
  return makePlaceDetailsRequest({
    placeId,
    fields: DEFAULT_FIELDS,
    config,
  });
}

/**
 * Get comprehensive place information including photos and hours
 */
export async function getExtendedPlaceDetails(
  placeId: string,
  config?: PlacesApiConfig
): Promise<Place> {
  return makePlaceDetailsRequest({
    placeId,
    fields: EXTENDED_FIELDS,
    config,
  });
}

/**
 * Get hotel details with accommodation-specific information
 */
export async function getHotelDetails(
  placeId: string,
  config?: PlacesApiConfig
): Promise<Place> {
  return makePlaceDetailsRequest({ placeId, fields: HOTEL_FIELDS, config });
}

/**
 * Get restaurant details with dining-specific information
 */
export async function getRestaurantDetails(
  placeId: string,
  config?: PlacesApiConfig
): Promise<Place> {
  return makePlaceDetailsRequest({ placeId, fields: RESTAURANT_FIELDS, config });
}

/**
 * Get tourist attraction details
 */
export async function getAttractionDetails(
  placeId: string,
  config?: PlacesApiConfig
): Promise<Place> {
  return makePlaceDetailsRequest({ placeId, fields: ATTRACTION_FIELDS, config });
}

/**
 * Get multiple place details in parallel
 */
export async function getMultiplePlaceDetails(
  placeIds: string[],
  config?: PlacesApiConfig
): Promise<Place[]> {
  if (!placeIds || placeIds.length === 0) {
    throw new Error('At least one place ID is required');
  }

  if (placeIds.length > 10) {
    throw new Error('Cannot fetch more than 10 places at once');
  }

  const promises = placeIds.map((placeId) =>
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

/**
 * Get place details by id
 * @param placeId - The id of the place
 * @param config - The config for the request
 * @returns The place details
 */
export async function getPlaceDetailsById(
  type: ActivityTypeKey,
  placeId: string,
  config?: PlacesApiConfig
): Promise<Place> {
  switch (type) {
    case 'accommodation':
      return getHotelDetails(placeId, config);
    case 'food':
      return getRestaurantDetails(placeId, config);
    case 'leisure':
      return getAttractionDetails(placeId, config);
    default:
      return getBasicPlaceDetails(placeId, config);
  }
}