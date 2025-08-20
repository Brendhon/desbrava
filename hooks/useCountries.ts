import { useState, useEffect } from 'react';
import { Continent, Country } from '@/lib/types/country';
import { useDebounce } from './useDebounce';

interface UseCountriesReturn {
  countries: Country[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  getCountryByName: (name: string) => Promise<Country>;
}

/**
 * Hook to search countries using the countries API with debouncing
 * @param initialSearchTerm - Initial search term
 * @param debounceDelay - Delay for debouncing in milliseconds (default: 300ms)
 * @returns Object with countries data, loading state, error state, and search controls
 */
export function useCountries(
  initialSearchTerm: string = '',
  debounceDelay: number = 300
): UseCountriesReturn {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get country by name
  const getCountryByName = async (name: string) => {
    const response = await fetch(`/api/countries/${name}`);
    const data = await response.json();
    return (
      data.data || {
        continent: Continent.Outro,
        id: 0,
        language: [],
        region: '',
        country: name,
        currency_code: '',
        currency_name_pt: '',
        iso_country: '',
      }
    );
  };

  // Debounce the search term to avoid excessive API calls
  const debouncedSearchTerm = useDebounce(searchTerm, debounceDelay);

  useEffect(() => {
    const searchCountries = async () => {
      // Don't search for very short terms or empty terms
      if (
        !debouncedSearchTerm.trim() ||
        debouncedSearchTerm.trim().length < 2
      ) {
        setCountries([]);
        setError(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/countries?name=${encodeURIComponent(debouncedSearchTerm)}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          setCountries(data.data);
        } else {
          setError(data.message || 'Failed to search countries');
          setCountries([]);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to search countries';
        setError(errorMessage);
        setCountries([]);
      } finally {
        setLoading(false);
      }
    };

    searchCountries();
  }, [debouncedSearchTerm]);

  return {
    countries,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    getCountryByName,
  };
}
