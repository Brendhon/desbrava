// Google Places API Types for Desbrava Project

import { ActivityTypeKey } from "./activity";

export interface PlaceLocation {
  latitude: number;
  longitude: number;
}

export interface PlaceCircle {
  center: PlaceLocation;
  radius: number;
}

export interface PlaceLocationBias {
  circle: PlaceCircle;
}

export interface PlaceLocationRestriction {
  circle: PlaceCircle;
}

export interface PlaceAutocompleteRequest {
  input: string;
  locationBias?: PlaceLocationBias;
  includedPrimaryTypes?: string[];
  sessionToken?: string;
}

export interface PlaceAutocompleteResponse {
  suggestions: PlaceSuggestion[];
}

export interface PlaceSuggestion {
  placePrediction: PlacePrediction;
}

export interface PlacePrediction {
  text: PlaceText;
  placeId: string;
  types: string[];
  structuredFormat?: PlaceStructuredFormat;
}

export interface PlaceText {
  text: string;
  matches: PlaceMatch[];
}

export interface PlaceMatch {
  startIndex: number;
  length: number;
}

export interface PlaceStructuredFormat {
  mainText: PlaceText;
  secondaryText: PlaceText;
}

export interface PlaceNearbySearchRequest {
  includedTypes: string[];
  locationRestriction: PlaceLocationRestriction;
  rankPreference?: 'DISTANCE' | 'RELEVANCE';
}

export interface PlaceNearbySearchResponse {
  places: Place[];
}

export interface PlaceTextSearchRequest {
  textQuery: string;
  locationBias?: PlaceLocationBias;
  includedTypes?: string[];
}

export interface PlaceTextSearchResponse {
  places: Place[];
}

export interface PlaceDetailsRequest {
  placeId: string;
  fields?: string[];
}

export interface PlaceDetailsResponse {
  place: Place;
}

export interface PlaceDetailsOptions {
  placeId: string;
  fields?: string[];
  config?: PlacesApiConfig;
}

export class PlacesApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = 'PlacesApiError';
  }
}

export interface PlacesApiConfig {
  baseUrl?: string;
  apiKey?: string;
  timeout?: number;
}

export interface Place {
  id: string;
  displayName: PlaceDisplayName;
  formattedAddress: string;
  location: PlaceLocation;
  rating?: number;
  userRatingCount?: number;
  currentOpeningHours?: PlaceOpeningHours;
  photos?: PlacePhoto[];
  websiteUri?: string;
  types: string[];
  priceLevel?:
    | 'FREE'
    | 'INEXPENSIVE'
    | 'MODERATE'
    | 'EXPENSIVE'
    | 'VERY_EXPENSIVE';
  businessStatus?: 'OPERATIONAL' | 'CLOSED_TEMPORARILY' | 'CLOSED_PERMANENTLY';
}

export interface PlaceDisplayName {
  text: string;
  languageCode: string;
}

export interface PlaceOpeningHours {
  openNow: boolean;
  periods: PlacePeriod[];
  weekdayDescriptions: string[];
}

export interface PlacePeriod {
  open: PlaceTime;
  close: PlaceTime;
}

export interface PlaceTime {
  day: number;
  hour: number;
  minute: number;
}

export interface PlacePhoto {
  name: string;
  widthPx: number;
  heightPx: number;
  authorAttributions: PlaceAuthorAttribution[];
}

export interface PlaceAuthorAttribution {
  displayName: string;
  uri: string;
  photoUri: string;
}

// Place Types organized by activity categories for Desbrava Project
// Based on the 5 main activity types: accommodation, transportation, food, leisure, other

// ACCOMMODATION - Places for staying overnight
export const ACCOMMODATION_TYPES = {
  HOTEL: 'hotel',
  MOTEL: 'motel',
  HOSTEL: 'hostel',
  GUEST_HOUSE: 'guest_house',
  BED_AND_BREAKFAST: 'bed_and_breakfast',
} as const;

// TRANSPORTATION - Places for getting around
export const TRANSPORTATION_TYPES = {
  AIRPORT: 'airport',
  TRAIN_STATION: 'train_station',
  BUS_STATION: 'bus_station',
  SUBWAY_STATION: 'subway_station',
  TRANSIT_STATION: 'transit_station',
  FERRY_TERMINAL: 'ferry_terminal',
  TAXI_STAND: 'taxi_stand',
  CAR_RENTAL: 'car_rental',
  PARKING: 'parking',
  GAS_STATION: 'gas_station',
} as const;

// FOOD - Places for eating and drinking
export const FOOD_TYPES = {
  RESTAURANT: 'restaurant',
  CAFE: 'cafe',
  BAR: 'bar',
  BAKERY: 'bakery',
  MEAL_TAKEAWAY: 'meal_takeaway',
  MEAL_DELIVERY: 'meal_delivery',
  FOOD: 'food',
  SEAFOOD_RESTAURANT: 'seafood_restaurant',
  STEAK_HOUSE: 'steak_house',
  ITALIAN_RESTAURANT: 'italian_restaurant',
  CHINESE_RESTAURANT: 'chinese_restaurant',
  JAPANESE_RESTAURANT: 'japanese_restaurant',
  MEXICAN_RESTAURANT: 'mexican_restaurant',
  INDIAN_RESTAURANT: 'indian_restaurant',
  THAI_RESTAURANT: 'thai_restaurant',
  PIZZA_RESTAURANT: 'pizza_restaurant',
  BURGER_RESTAURANT: 'burger_restaurant',
  SUSHI_RESTAURANT: 'sushi_restaurant',
  VEGETARIAN_RESTAURANT: 'vegetarian_restaurant',
  VEGAN_RESTAURANT: 'vegan_restaurant',
  FAST_FOOD_RESTAURANT: 'fast_food_restaurant',
  ICE_CREAM_SHOP: 'ice_cream_shop',
  COFFEE_SHOP: 'coffee_shop',
  TEA_HOUSE: 'tea_house',
  BREWERY: 'brewery',
  WINERY: 'winery',
  DISTILLERY: 'distillery',
} as const;

// LEISURE - Places for entertainment and recreation
export const LEISURE_TYPES = {
  TOURIST_ATTRACTION: 'tourist_attraction',
  MUSEUM: 'museum',
  ART_GALLERY: 'art_gallery',
  AMUSEMENT_PARK: 'amusement_park',
  AQUARIUM: 'aquarium',
  ZOO: 'zoo',
  PARK: 'park',
  NATIONAL_PARK: 'national_park',
  HISTORIC_SITE: 'historic_site',
  MONUMENT: 'monument',
  STATUE: 'statue',
  CASTLE: 'castle',
  PALACE: 'palace',
  CHURCH: 'church',
  TEMPLE: 'temple',
  MOSQUE: 'mosque',
  SYNAGOGUE: 'synagogue',
  LIBRARY: 'library',
  THEATER: 'theater',
  CINEMA: 'cinema',
  STADIUM: 'stadium',
  ARENA: 'arena',
  BOWLING_ALLEY: 'bowling_alley',
  CASINO: 'casino',
  RACE_TRACK: 'race_track',
  GOLF_COURSE: 'golf_course',
  SKI_RESORT: 'ski_resort',
  WATER_PARK: 'water_park',
  HIKING_TRAIL: 'hiking_trail',
  BEACH: 'beach',
  MOUNTAIN: 'mountain',
  LAKE: 'lake',
  RIVER: 'river',
  WATERFALL: 'waterfall',
  FOREST: 'forest',
  CAVE: 'cave',
  VOLCANO: 'volcano',
  ISLAND: 'island',
} as const;

// OTHER - Administrative and general places
export const OTHER_TYPES = {
  // Administrative areas
  LOCALITY: 'locality',
  NEIGHBORHOOD: 'neighborhood',
  STREET_ADDRESS: 'street_address',
  POSTAL_CODE: 'postal_code',
  COUNTRY: 'country',
  
  // General points of interest
  POINT_OF_INTEREST: 'point_of_interest',
  ESTABLISHMENT: 'establishment',
  LANDMARK: 'landmark',
  
  // Shopping and services (basic)
  SHOPPING_MALL: 'shopping_mall',
  GROCERY_STORE: 'grocery_store',
  PHARMACY: 'pharmacy',
  BANK: 'bank',
  ATM: 'atm',
  POST_OFFICE: 'post_office',
  
  // Health and emergency
  HOSPITAL: 'hospital',
  POLICE_STATION: 'police_station',
  FIRE_STATION: 'fire_station',
} as const;

// Legacy constant for backward compatibility
// Contains all types organized by category
export const PLACE_TYPES = {
  ...ACCOMMODATION_TYPES,
  ...TRANSPORTATION_TYPES,
  ...FOOD_TYPES,
  ...LEISURE_TYPES,
  ...OTHER_TYPES,
} as const;

// Type definitions
export type AccommodationType = (typeof ACCOMMODATION_TYPES)[keyof typeof ACCOMMODATION_TYPES];
export type TransportationType = (typeof TRANSPORTATION_TYPES)[keyof typeof TRANSPORTATION_TYPES];
export type FoodType = (typeof FOOD_TYPES)[keyof typeof FOOD_TYPES];
export type LeisureType = (typeof LEISURE_TYPES)[keyof typeof LEISURE_TYPES];
export type OtherType = (typeof OTHER_TYPES)[keyof typeof OTHER_TYPES];
export type PlaceType = (typeof PLACE_TYPES)[keyof typeof PLACE_TYPES];

// Helper function to get types by activity category
export const getPlaceTypesByCategory = (category: ActivityTypeKey): PlaceType[] => {
  switch (category) {
    case 'accommodation':
      return Object.values(ACCOMMODATION_TYPES);
    case 'transportation':
      return Object.values(TRANSPORTATION_TYPES);
    case 'food':
      return Object.values(FOOD_TYPES);
    case 'leisure':
      return Object.values(LEISURE_TYPES);
    case 'other':
      return Object.values(OTHER_TYPES);
    default:
      return Object.values(PLACE_TYPES);
  }
};
