import { useState, useEffect } from 'react';
import { ActivityTypeKey } from '@/lib/types/activity';

interface PlaceType {
  key: string;
  value: string;
}

interface UsePlaceTypesReturn {
  placeTypes: PlaceType[];
  loading: boolean;
  error: string | null;
  category: ActivityTypeKey | null;
  setCategory: (category: ActivityTypeKey | null) => void;
  getAllPlaceTypes: () => Promise<Record<string, PlaceType[]>>;
  getPlaceTypesByCategory: (category: ActivityTypeKey) => Promise<PlaceType[]>;
}

/**
 * Hook to manage place types by category
 * @param initialCategory - Initial category to load (optional)
 * @returns Object with place types data, loading state, error state, and category controls
 */
export function usePlaceTypes(
  initialCategory: ActivityTypeKey | null = null
): UsePlaceTypesReturn {
  const [category, setCategory] = useState<ActivityTypeKey | null>(initialCategory);
  const [placeTypes, setPlaceTypes] = useState<PlaceType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get all place types organized by category
  const getAllPlaceTypes = async (): Promise<Record<string, PlaceType[]>> => {
    try {
      const response = await fetch('/api/place-types');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        return data.data;
      } else {
        throw new Error(data.message || 'Failed to fetch place types');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch place types';
      throw new Error(errorMessage);
    }
  };

  // Get place types for a specific category
  const getPlaceTypesByCategory = async (category: ActivityTypeKey): Promise<PlaceType[]> => {
    try {
      const response = await fetch(`/api/place-types/${category}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        return data.data;
      } else {
        throw new Error(data.message || 'Failed to fetch place types for category');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch place types for category';
      throw new Error(errorMessage);
    }
  };

  // Load place types when category changes
  useEffect(() => {
    const loadPlaceTypes = async () => {
      if (!category) {
        setPlaceTypes([]);
        setError(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await getPlaceTypesByCategory(category);
        setPlaceTypes(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load place types';
        setError(errorMessage);
        setPlaceTypes([]);
      } finally {
        setLoading(false);
      }
    };

    loadPlaceTypes();
  }, [category]);

  return {
    placeTypes,
    loading,
    error,
    category,
    setCategory,
    getAllPlaceTypes,
    getPlaceTypesByCategory,
  };
}
