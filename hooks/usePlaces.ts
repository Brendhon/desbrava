import { ActivityTypeData } from '@/components/activity/ActivityTypeSelector';
import {
  generateSessionToken,
  getPlaceDetailsById,
  getPlaceSuggestions,
  searchNearbyPlaces,
  searchPlacesByText,
} from '@/lib/services/places';
import { SearchType } from '@/lib/types';
import { Place, PlacesApiError, PlaceSearchType } from '@/lib/types/places';
import { parsePlaceSuggestions } from '@/lib/utils/places';
import { useEffect, useState } from 'react';
import { useDebounce } from './useDebounce';

interface UsePlacesReturn {
  places: Place[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  clearResults: () => void;
  getPlaceFromApi: (placeId?: string) => Promise<Place | undefined>;
}

interface UsePlacesOptions {
  initialSearchTerm?: string;
  debounceDelay?: number;
  activityType?: ActivityTypeData;
  latitude?: number;
  longitude?: number;
  radius?: number;
  maxResults?: number;
  searchType?: SearchType;
}

/**
 * Hook to search places using the Google Places API with debouncing and duplicate search prevention
 * @param options - Configuration options for the places search
 * @returns Object with places data, loading state, error state, and search controls
 */
export function usePlaces(options: UsePlacesOptions = {}): UsePlacesReturn {
  const [searchTerm, setSearchTerm] = useState(options.initialSearchTerm || '');
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionToken] = useState(() => generateSessionToken());

  // Get the activity type
  const activityType = options.activityType?.type;
  const subType = options.activityType?.subType;

  // Get the search type
  const searchType = options.searchType || 'searchText';

  // Debounce the search term to avoid excessive API calls
  const debouncedTerm = useDebounce(searchTerm, options.debounceDelay || 1000);

  // Search places by type
  const searchByType = async (
    input: string,
    type: PlaceSearchType,
    searchType: SearchType
  ) => {
    // Set loading state
    setLoading(true);
    setError(null);

    try {
      // Get the radius (default 150km)
      const radius = options.radius || 50000;

      // Create the request body
      const reqBody = {
        latitude: options.latitude ?? 0,
        longitude: options.longitude ?? 0,
        radius,
        type,
      };

      // Get place suggestions
      const response =
        searchType === 'searchText'
          ? await getPlaceSuggestions({
              ...reqBody,
              sessionToken,
              query: input,
            })
          : await searchNearbyPlaces(reqBody);

      // If the response is an error, set the error and return
      if (response instanceof PlacesApiError) throw response;

      // Parse suggestions to places format
      const placesResult =
        'suggestions' in response
          ? parsePlaceSuggestions(response.suggestions)
          : response.places;

      // Set the places to the state
      setPlaces(placesResult);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle error
  const handleError = (err: unknown) => {
    const errorMessage =
      err instanceof Error ? err.message : 'Failed to search places';
    setError(errorMessage);
    setPlaces([]);
    console.error(err);
  };

  // Clear results
  const clearResults = () => {
    setPlaces([]);
    setError(null);
  };

  // Fetch place from API
  const getPlaceFromApi = async (placeId?: string) => {
    if (!activityType || !placeId) return undefined;
    return getPlaceDetailsById(activityType, placeId);
  };

  // Search places with debounced search term
  useEffect(() => {
    const searchPlaces = () => {
      // Get the debounced term
      const term = debouncedTerm?.trim();

      // Check if the search term is valid
      const invalid = !term || !subType;

      // Clear results if the search term is invalid or the default type is not set
      return invalid
        ? clearResults() // Clear results if the search term is invalid
        : searchByType(term, subType, searchType); // Search for the default type if it is set
    };

    // Search for the places
    searchPlaces();

    // Clear results if the search term is invalid or the default type is not set
    return () => clearResults();
  }, [debouncedTerm, searchType]);

  return {
    places,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    getPlaceFromApi,
    clearResults,
  };
}
