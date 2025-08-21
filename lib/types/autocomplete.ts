import { PlaceType } from "./places";

export interface AutocompleteOptions {
  input: string;
  latitude?: number;
  longitude?: number;
  radius?: number;
  types?: PlaceType[];
  maxResults?: number;
  sessionToken?: string;
  config?: {
    baseUrl?: string;
    apiKey?: string;
    timeout?: number;
  };
}