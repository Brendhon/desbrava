import { PlacesApiConfig, PlaceType } from './places';

export interface AutocompleteOptions {
  input: string;
  latitude?: number;
  longitude?: number;
  radius?: number;
  types?: PlaceType[];
  maxResults?: number;
  sessionToken?: string;
  config?: PlacesApiConfig;
}
