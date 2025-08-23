import { useState, useEffect, useRef } from 'react';
import { useDebounce } from './useDebounce';
import { Place, PlaceType, getPlaceTypesByCategory } from '@/lib/types/places';
import {
  getPlaceSuggestions,
  generateSessionToken,
} from '@/lib/services/places';

interface UsePlacesReturn {
  places: Place[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchByType: (input: string, types: PlaceType[]) => Promise<void>;
  clearResults: () => void;
}

interface UsePlacesOptions {
  initialSearchTerm?: string;
  debounceDelay?: number;
  defaultTypes?: PlaceType[];
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
  const {
    initialSearchTerm = '',
    debounceDelay = 2000,
    defaultTypes = getPlaceTypesByCategory('other'),
    latitude,
    longitude,
    radius = 50000,
    maxResults = 20,
  } = options;

  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionToken] = useState(() => generateSessionToken());

  // Cache to store last search parameters and avoid duplicate API calls
  const lastSearchCache = useRef<{
    input: string;
    types: PlaceType[];
    timestamp: number;
  } | null>(null);

  // Debounce the search term to avoid excessive API calls
  const debouncedSearchTerm = useDebounce(searchTerm, debounceDelay);

  // Search places by type
  const searchByType = async (input: string, types: PlaceType[]) => {
    if (!input.trim() || input.trim().length < 2) {
      setPlaces([]);
      return;
    }

    // Check if this exact search has already been performed recently
    const normalizedInput = input.trim().toLowerCase();
    const normalizedTypes = types.sort().join(',');

    if (lastSearchCache.current) {
      const normalizedLastInput = lastSearchCache.current.input
        .trim()
        .toLowerCase();
      const normalizedLastTypes = lastSearchCache.current.types
        .sort()
        .join(',');

      // If input and types are the same, skip the search
      if (
        normalizedInput === normalizedLastInput &&
        normalizedTypes === normalizedLastTypes
      ) {
        return;
      }
    }

    setLoading(true);
    setError(null);

    try {
      const response = await getPlaceSuggestions({
        input,
        types,
        latitude,
        longitude,
        radius,
        maxResults,
        sessionToken,
      });

      // Convert suggestions to places format
      const placeSuggestions = response.suggestions.map(
        (suggestion) =>
          ({
            id: suggestion.placePrediction.placeId,
            displayName: {
              text: suggestion.placePrediction.text.text,
              languageCode: 'pt-BR',
            },
            formattedAddress:
              suggestion.placePrediction.structuredFormat?.secondaryText
                ?.text || '',
            location: { latitude: 0, longitude: 0 }, // Will be filled by details API if needed
            types,
          }) as Place
      );

      setPlaces(placeSuggestions);

      // Update the search cache with current parameters
      lastSearchCache.current = {
        input: input.trim(),
        types: [...types],
        timestamp: Date.now(),
      };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to search places';
      setError(errorMessage);
      setPlaces([]);
    } finally {
      setLoading(false);
    }
  };

  // Clear results
  const clearResults = () => {
    setPlaces([]);
    setError(null);
    setLoading(false);
    lastSearchCache.current = null;
  };

  useEffect(() => {
    const searchPlaces = async () => {
      // Don't search for very short terms or empty terms
      if (
        !debouncedSearchTerm.trim() ||
        debouncedSearchTerm.trim().length < 2
      ) {
        setPlaces([]);
        setError(null);
        setLoading(false);
        return;
      }

      // Check if this search is already cached to avoid duplicate calls
      const normalizedInput = debouncedSearchTerm.trim().toLowerCase();
      const normalizedTypes = defaultTypes.sort().join(',');

      if (lastSearchCache.current) {
        const normalizedLastInput = lastSearchCache.current.input
          .trim()
          .toLowerCase();
        const normalizedLastTypes = lastSearchCache.current.types
          .sort()
          .join(',');

        // If input and types are the same, skip the search
        if (
          normalizedInput === normalizedLastInput &&
          normalizedTypes === normalizedLastTypes
        ) {
          return;
        }
      }

      await searchByType(debouncedSearchTerm, defaultTypes);
    };

    searchPlaces();
  }, [debouncedSearchTerm, defaultTypes]);

  return {
    places,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    searchByType,
    clearResults,
  };
}
