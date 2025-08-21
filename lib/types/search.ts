import { PlaceType, PlacesApiConfig } from "./places";

export interface TextSearchOptions {
  query: string;
  latitude?: number;
  longitude?: number;
  radius?: number;
  types?: PlaceType[];
  maxResults?: number;
  config?: PlacesApiConfig;
}

export interface NearbySearchOptions {
  latitude: number;
  longitude: number;
  radius: number;
  types: PlaceType[];
  maxResults?: number;
  rankByDistance?: boolean;
  config?: PlacesApiConfig
}
