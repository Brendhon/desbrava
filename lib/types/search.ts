import { PlaceSearchType, PlacesApiConfig } from './places';

export interface TextSearchOptions {
  query: string;
  latitude?: number;
  longitude?: number;
  radius?: number;
  type?: PlaceSearchType;
  maxResults?: number;
  config?: PlacesApiConfig;
}

export interface NearbySearchOptions {
  latitude: number;
  longitude: number;
  radius: number;
  type: PlaceSearchType;
  maxResults?: number;
  rankByDistance?: boolean;
  config?: PlacesApiConfig;
}
