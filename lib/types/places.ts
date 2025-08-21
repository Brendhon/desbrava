// Google Places API Types for Desbrava Project

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
  maxResultCount?: number;
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
  maxResultCount?: number;
  locationRestriction: PlaceLocationRestriction;
  rankPreference?: 'DISTANCE' | 'RELEVANCE';
}

export interface PlaceNearbySearchResponse {
  places: Place[];
}

export interface PlaceTextSearchRequest {
  textQuery: string;
  maxResultCount?: number;
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

// Common place types for the Desbrava project
export const PLACE_TYPES = {
  // Accommodation
  LODGING: 'lodging',
  CAMPGROUND: 'campground',
  RV_PARK: 'rv_park',

  // Food & Beverage
  RESTAURANT: 'restaurant',
  CAFE: 'cafe',
  BAR: 'bar',
  BAKERY: 'bakery',
  MEAL_TAKEAWAY: 'meal_takeaway',

  // Tourist Attractions
  TOURIST_ATTRACTION: 'tourist_attraction',
  MUSEUM: 'museum',
  ART_GALLERY: 'art_gallery',
  AMUSEMENT_PARK: 'amusement_park',
  AQUARIUM: 'aquarium',
  ZOO: 'zoo',
  PARK: 'park',

  // Transportation
  AIRPORT: 'airport',
  TRAIN_STATION: 'train_station',
  BUS_STATION: 'bus_station',
  SUBWAY_STATION: 'subway_station',

  // Cities and Regions
  CITIES: '(cities)',
  REGIONS: '(regions)',
  COUNTRIES: '(countries)',
} as const;

export type PlaceType = (typeof PLACE_TYPES)[keyof typeof PLACE_TYPES];
