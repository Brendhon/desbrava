import { PlacesApiConfig, PlaceSearchType } from './places';

export interface AutocompleteOptions {
  input: string;
  latitude?: number;
  longitude?: number;
  radius?: number;
  type?: PlaceSearchType;
  sessionToken?: string;
  config?: PlacesApiConfig;
}
