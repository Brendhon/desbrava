import { PlacesApiConfig, PlaceSearchType } from './places';

// Base interface with common search properties
export interface BaseSearchOptions {
  latitude?: number;
  longitude?: number;
  radius?: number;
  type?: PlaceSearchType;
  config?: PlacesApiConfig;
}

export interface AutocompleteSearchOptions extends BaseSearchOptions {
  input: string;
  sessionToken?: string;
}

export interface TextSearchOptions extends BaseSearchOptions {
  query: string;
  maxResults?: number;
}

export interface NearbySearchOptions extends BaseSearchOptions {
  latitude: number; // Required for nearby search
  radius: number; // Required for nearby search
  type: PlaceSearchType; // Required for nearby search
  maxResults?: number;
  rankByDistance?: boolean;
}
