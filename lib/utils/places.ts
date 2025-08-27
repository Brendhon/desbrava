// Utility functions for places data
// Handles formatting, validation, and common operations

import { Place, PlaceSuggestion } from '../types/places';

/**
 * Format a place's display name
 */
export function formatPlaceName(place: Place): string {
  return place.displayName?.text || 'Unknown Place';
}

/**
 * Format a place's address
 */
export function formatPlaceAddress(place: Place): string {
  return place.formattedAddress || 'Address not available';
}

/**
 * Get place coordinates as a string
 */
export function formatPlaceCoordinates(place: Place): string {
  if (!place.location) return 'Coordinates not available';
  return `${place.location.latitude.toFixed(6)}, ${place.location.longitude.toFixed(6)}`;
}

/**
 * Format place rating with count
 */
export function formatPlaceRating(place: Place): string {
  if (!place.rating) return 'No rating';

  const rating = place.rating.toFixed(1);
  const count = place.userRatingCount || 0;

  if (count === 0) return `${rating} stars`;
  if (count === 1) return `${rating} stars (1 review)`;
  return `${rating} stars (${count} reviews)`;
}

/**
 * Check if a place is currently open
 */
export function isPlaceOpen(place: Place): boolean | null {
  if (!place.currentOpeningHours) return null;
  return place.currentOpeningHours.openNow;
}

/**
 * Get place status text
 */
export function getPlaceStatusText(place: Place): string {
  if (place.businessStatus === 'CLOSED_PERMANENTLY') {
    return 'Permanently Closed';
  }

  if (place.businessStatus === 'CLOSED_TEMPORARILY') {
    return 'Temporarily Closed';
  }

  if (place.currentOpeningHours) {
    return place.currentOpeningHours.openNow ? 'Open Now' : 'Closed Now';
  }

  return 'Status Unknown';
}

/**
 * Calculate distance between two coordinates (Haversine formula)
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Format distance for display
 */
export function formatDistance(distanceKm: number): string {
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)}m`;
  }
  if (distanceKm < 10) {
    return `${distanceKm.toFixed(1)}km`;
  }
  return `${Math.round(distanceKm)}km`;
}

/**
 * Sort places by distance from a reference point
 */
export function sortPlacesByDistance(
  places: Place[],
  referenceLat: number,
  referenceLon: number
): Place[] {
  return [...places].sort((a, b) => {
    if (!a.location || !b.location) return 0;

    const distanceA = calculateDistance(
      referenceLat,
      referenceLon,
      a.location.latitude,
      a.location.longitude
    );

    const distanceB = calculateDistance(
      referenceLat,
      referenceLon,
      b.location.latitude,
      b.location.longitude
    );

    return distanceA - distanceB;
  });
}

/**
 * Get place photo URL (if available)
 */
export function getPlacePhotoUrl(place: Place): string | null {
  if (!place.photos || place.photos.length === 0) return null;

  // Return the first photo URL
  // Note: In a real implementation, you'd need to use the Places Photo API
  // to get the actual photo URLs from the photo references
  return place.photos[0]?.name || null;
}

/**
 * Parse place suggestions to places
 */
export function parsePlaceSuggestions(
  suggestions?: PlaceSuggestion[]
): Place[] {
  // Check if there are suggestions
  if (!suggestions) return [];

  // Parse the suggestions to places
  return suggestions.map((suggestion) => ({
    id: suggestion.placePrediction.placeId,
    displayName: {
      text: suggestion.placePrediction.text.text,
      languageCode: 'pt-BR',
    },
    formattedAddress:
      suggestion.placePrediction.structuredFormat?.secondaryText?.text || '',
    location: { latitude: 0, longitude: 0 },
    types: suggestion.placePrediction.types,
    websiteUri: '',
    rating: 0,
    userRatingCount: 0,
    currentOpeningHours: undefined,
    priceLevel: undefined,
    businessStatus: undefined,
    editorialSummary: undefined,
  }));
}

// Default fields to retrieve for most use cases
// Based on Google Places API v1 documentation
export const DEFAULT_FIELDS = [
  'id',
  'displayName',
  'formattedAddress',
  'location',
  'rating',
  'userRatingCount',
  'types',
  'businessStatus',
];

// Extended fields for detailed information
export const EXTENDED_FIELDS = [
  'id',
  'displayName',
  'formattedAddress',
  'location',
  'rating',
  'userRatingCount',
  'currentOpeningHours',
  'websiteUri',
  'types',
  'priceLevel',
  'priceRange',
  'businessStatus',
  'editorialSummary',
  'utcOffsetMinutes',
  'adrFormatAddress',
  'internationalPhoneNumber',
  'nationalPhoneNumber',
  'primaryType',
  'primaryTypeDisplayName',
  'shortFormattedAddress',
  'subDestinations',
  'viewport',
];

export const RESTAURANT_FIELDS = [
  'id',
  'displayName',
  'formattedAddress',
  'location',
  'rating',
  'userRatingCount',
  'currentOpeningHours',
  'websiteUri',
  'types',
  'priceLevel',
  'priceRange',
  'businessStatus',
  'editorialSummary',
  'utcOffsetMinutes',
  'adrFormatAddress',
  'internationalPhoneNumber',
  'nationalPhoneNumber',
  'primaryType',
  'primaryTypeDisplayName',
  'shortFormattedAddress',
  'servesBeer',
  'servesBreakfast',
  'servesBrunch',
  'servesDinner',
  'servesLunch',
  'servesVegetarianFood',
  'servesWine',
  'takeout',
  'delivery',
  'dineIn',
  'reservable',
];

export const ATTRACTION_FIELDS = [
  'id',
  'displayName',
  'formattedAddress',
  'location',
  'rating',
  'userRatingCount',
  'currentOpeningHours',
  'websiteUri',
  'types',
  'priceLevel',
  'priceRange',
  'businessStatus',
  'editorialSummary',
  'utcOffsetMinutes',
  'adrFormatAddress',
  'internationalPhoneNumber',
  'nationalPhoneNumber',
  'primaryType',
  'primaryTypeDisplayName',
  'shortFormattedAddress',
  'subDestinations',
  'viewport',
];

export const HOTEL_FIELDS = [
  'id',
  'displayName',
  'formattedAddress',
  'location',
  'rating',
  'userRatingCount',
  'currentOpeningHours',
  'websiteUri',
  'types',
  'priceLevel',
  'priceRange',
  'businessStatus',
  'utcOffsetMinutes',
  'adrFormatAddress',
  'internationalPhoneNumber',
  'nationalPhoneNumber',
  'primaryType',
  'primaryTypeDisplayName',
  'shortFormattedAddress',
  'subDestinations',
  'viewport',
];
