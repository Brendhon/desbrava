// Google Places API Types for Desbrava Project
// Updated to match Google Places API v1 specification

import { SelectOption } from './form';

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
  types: PlaceSearchType[];
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

// Updated Place interface to match Google Places API v1
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
  types: PlaceSearchType[];
  priceRange?: PriceRange;
  priceLevel?:
    | 'FREE'
    | 'PRICE_LEVEL_INEXPENSIVE'
    | 'PRICE_LEVEL_MODERATE'
    | 'PRICE_LEVEL_EXPENSIVE'
    | 'PRICE_LEVEL_VERY_EXPENSIVE';
  businessStatus?: 'OPERATIONAL' | 'CLOSED_TEMPORARILY' | 'CLOSED_PERMANENTLY';
  editorialSummary?: PlaceEditorialSummary;
  reviews?: PlaceReview[];
  utcOffsetMinutes?: number;
  adrFormatAddress?: string;
  internationalPhoneNumber?: string;
  nationalPhoneNumber?: string;
  primaryType?: string;
  primaryTypeDisplayName?: PlaceDisplayName;
  shortFormattedAddress?: string;
  subDestinations?: PlaceSubDestination[];
  viewport?: PlaceViewport;
  // Restaurant-specific fields
  servesBeer?: boolean;
  servesBreakfast?: boolean;
  servesBrunch?: boolean;
  servesDinner?: boolean;
  servesLunch?: boolean;
  servesVegetarianFood?: boolean;
  servesWine?: boolean;
  takeout?: boolean;
  delivery?: boolean;
  dineIn?: boolean;
  reservable?: boolean;
  wheelchairAccessibleEntrance?: boolean;
  // Hotel-specific fields
  lodging?: PlaceLodging;
}

export interface PlaceDisplayName {
  text: string;
  languageCode: string;
}

export interface PriceRange {
  startPrice: Price;
  endPrice: Price;
}

export interface Price {
  currencyCode: string;
  units: string;
}

export interface PlaceOpeningHours {
  openNow: boolean;
  periods: PlacePeriod[];
  weekdayDescriptions: string[];
  nextOpenTime?: Date;
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

export interface PlaceEditorialSummary {
  text: string;
  languageCode: string;
}

export interface PlaceReview {
  name: string;
  relativePublishTimeDescription: string;
  rating: number;
  text: PlaceText;
  authorAttribution: PlaceAuthorAttribution;
  originalText: PlaceText;
}

export interface PlaceSubDestination {
  name: string;
  placeId: string;
  displayName: PlaceDisplayName;
  types: PlaceSearchType[];
}

export interface PlaceViewport {
  low: PlaceLocation;
  high: PlaceLocation;
}

export interface PlaceLodging {
  name: string;
  placeId: string;
  displayName: PlaceDisplayName;
  types: PlaceSearchType[];
  rating?: number;
  userRatingCount?: number;
  photos?: PlacePhoto[];
  websiteUri?: string;
  currentOpeningHours?: PlaceOpeningHours;
  businessStatus?: 'OPERATIONAL' | 'CLOSED_TEMPORARILY' | 'CLOSED_PERMANENTLY';
  editorialSummary?: PlaceEditorialSummary;
  reviews?: PlaceReview[];
  utcOffsetMinutes?: number;
  adrFormatAddress?: string;
  internationalPhoneNumber?: string;
  nationalPhoneNumber?: string;
  primaryType?: string;
  primaryTypeDisplayName?: PlaceDisplayName;
  shortFormattedAddress?: string;
  subDestinations?: PlaceSubDestination[];
  viewport?: PlaceViewport;
  wheelchairAccessibleEntrance?: boolean;
}

// Place Types organized by activity categories for Desbrava Project
// Based on the 5 main activity types: accommodation, transportation, food, leisure, other

/**
 * PlaceSearchType includes all possible place types for search in the Desbrava Project.
 * This type unifies accommodation, transportation, food, leisure, and other categories.
 */
export type PlaceSearchType =
  // Accommodation
  | 'hotel'
  | 'motel'
  | 'hostel'
  | 'guest_house'
  | 'bed_and_breakfast'
  // Transportation
  | 'airport'
  | 'train_station'
  | 'bus_station'
  | 'subway_station'
  | 'transit_station'
  | 'ferry_terminal'
  | 'taxi_stand'
  | 'car_rental'
  | 'parking'
  | 'gas_station'
  // Food
  | 'restaurant'
  | 'cafe'
  | 'bar'
  | 'bakery'
  | 'meal_takeaway'
  | 'meal_delivery'
  | 'food'
  | 'seafood_restaurant'
  | 'steak_house'
  | 'italian_restaurant'
  | 'chinese_restaurant'
  | 'japanese_restaurant'
  | 'mexican_restaurant'
  | 'indian_restaurant'
  | 'thai_restaurant'
  | 'pizza_restaurant'
  | 'burger_restaurant'
  | 'sushi_restaurant'
  | 'vegetarian_restaurant'
  | 'vegan_restaurant'
  | 'fast_food_restaurant'
  | 'ice_cream_shop'
  | 'coffee_shop'
  | 'tea_house'
  | 'brewery'
  | 'winery'
  | 'distillery'
  // Leisure
  | 'tourist_attraction'
  | 'museum'
  | 'art_gallery'
  | 'amusement_park'
  | 'aquarium'
  | 'zoo'
  | 'park'
  | 'national_park'
  | 'historic_site'
  | 'monument'
  | 'statue'
  | 'castle'
  | 'palace'
  | 'church'
  | 'temple'
  | 'mosque'
  | 'synagogue'
  | 'library'
  | 'theater'
  | 'cinema'
  | 'stadium'
  | 'arena'
  | 'bowling_alley'
  | 'casino'
  | 'race_track'
  | 'golf_course'
  | 'ski_resort'
  | 'water_park'
  | 'hiking_trail'
  | 'beach'
  | 'mountain'
  | 'lake'
  | 'river'
  | 'waterfall'
  | 'forest'
  | 'cave'
  | 'volcano'
  | 'island'
  // Other (administrative, general, shopping, health, emergency)
  | 'locality'
  | 'neighborhood'
  | 'street_address'
  | 'postal_code'
  | 'country'
  | 'point_of_interest'
  | 'establishment'
  | 'landmark'
  | 'shopping_mall'
  | 'grocery_store'
  | 'pharmacy'
  | 'bank'
  | 'atm'
  | 'post_office'
  | 'hospital'
  | 'police_station'
  | 'fire_station';

export interface PlaceTypeOptions {
  accommodation: SelectOption[];
  transportation: SelectOption[];
  food: SelectOption[];
  leisure: SelectOption[];
  other: SelectOption[];
}
