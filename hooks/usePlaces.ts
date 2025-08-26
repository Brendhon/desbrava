import { ActivityTypeData } from '@/components/activity/ActivityTypeSelector';
import {
  generateSessionToken,
  getPlaceDetailsById,
  getPlaceSuggestions,
} from '@/lib/services/places';
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
  const searchType = options.activityType?.subType;

  // Debounce the search term to avoid excessive API calls
  const debouncedTerm = useDebounce(searchTerm, options.debounceDelay || 1000);

  // Search places by type
  const searchByType = async (input: string, type: PlaceSearchType) => {
    // Set loading state
    setLoading(true);
    setError(null);

    try {
      // Get place suggestions
      const response = await getPlaceSuggestions({
        input,
        type,
        latitude: options.latitude,
        longitude: options.longitude,
        radius: options.radius || 50000,
        sessionToken,
      });

      // If the response is an error, set the error and return
      if (response instanceof PlacesApiError) throw response;

      // Parse suggestions to places format
      const placeSuggestions = parsePlaceSuggestions(response.suggestions);

      // Set the places to the state
      setPlaces(placeSuggestions);
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
      const invalid = !term || term.length < 2 || !searchType;

      // Clear results if the search term is invalid or the default type is not set
      return invalid
        ? clearResults() // Clear results if the search term is invalid
        : searchByType(term, searchType); // Search for the default type if it is set
    };

    // Search for the places
    searchPlaces();

    // Clear results if the search term is invalid or the default type is not set
    return () => clearResults();
  }, [debouncedTerm]);

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
