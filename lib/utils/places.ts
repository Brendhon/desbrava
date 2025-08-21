// Utility functions for places data
// Handles formatting, validation, and common operations

import { Place, PlaceType, PLACE_TYPES } from '../types/places';

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
 * Get place type display name
 */
export function getPlaceTypeDisplayName(type: PlaceType): string {
  const typeNames: Record<PlaceType, string> = {
    [PLACE_TYPES.LODGING]: 'Hotel',
    [PLACE_TYPES.CAMPGROUND]: 'Camping',
    [PLACE_TYPES.RV_PARK]: 'RV Park',
    [PLACE_TYPES.RESTAURANT]: 'Restaurant',
    [PLACE_TYPES.CAFE]: 'Café',
    [PLACE_TYPES.BAR]: 'Bar',
    [PLACE_TYPES.BAKERY]: 'Bakery',
    [PLACE_TYPES.MEAL_TAKEAWAY]: 'Takeaway',
    [PLACE_TYPES.TOURIST_ATTRACTION]: 'Tourist Attraction',
    [PLACE_TYPES.MUSEUM]: 'Museum',
    [PLACE_TYPES.ART_GALLERY]: 'Art Gallery',
    [PLACE_TYPES.AMUSEMENT_PARK]: 'Amusement Park',
    [PLACE_TYPES.AQUARIUM]: 'Aquarium',
    [PLACE_TYPES.ZOO]: 'Zoo',
    [PLACE_TYPES.PARK]: 'Park',
    [PLACE_TYPES.AIRPORT]: 'Airport',
    [PLACE_TYPES.TRAIN_STATION]: 'Train Station',
    [PLACE_TYPES.BUS_STATION]: 'Bus Station',
    [PLACE_TYPES.SUBWAY_STATION]: 'Subway Station',
    [PLACE_TYPES.CITIES]: 'City',
    [PLACE_TYPES.REGIONS]: 'Region',
    [PLACE_TYPES.COUNTRIES]: 'Country'
  };

  return typeNames[type] || type;
}

/**
 * Get primary place type for display
 */
export function getPrimaryPlaceType(place: Place): string {
  if (!place.types || place.types.length === 0) {
    return 'Place';
  }

  // Priority order for display
  const priorityTypes = [
    PLACE_TYPES.LODGING,
    PLACE_TYPES.RESTAURANT,
    PLACE_TYPES.TOURIST_ATTRACTION,
    PLACE_TYPES.MUSEUM,
    PLACE_TYPES.PARK,
    PLACE_TYPES.AIRPORT
  ];

  for (const priorityType of priorityTypes) {
    if (place.types.includes(priorityType)) {
      return getPlaceTypeDisplayName(priorityType);
    }
  }

  // Return first available type
  return getPlaceTypeDisplayName(place.types[0] as PlaceType);
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
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
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
 * Filter places by type
 */
export function filterPlacesByType(places: Place[], types: PlaceType[]): Place[] {
  if (!types || types.length === 0) return places;
  
  return places.filter(place => 
    place.types && place.types.some(type => types.includes(type as PlaceType))
  );
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


// Default fields to retrieve for most use cases
export const DEFAULT_FIELDS = [
  'places.displayName',
  'places.formattedAddress',
  'places.location',
  'places.rating',
  'places.userRatingCount',
  'places.types',
  'places.businessStatus'
];

// Extended fields for detailed information
export const EXTENDED_FIELDS = [
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
  'places.businessStatus',
  'places.editorialSummary'
];