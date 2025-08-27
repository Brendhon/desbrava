'use client';

import { useState, useCallback } from 'react';
import { Activity, CreateActivityData, UpdateActivityData } from '@/lib/types/activity';

interface UseActivitiesReturn {
  activities: Activity[];
  loading: boolean;
  error: string | null;
  fetchTripActivities: (tripId: string) => Promise<void>;
  fetchActivity: (tripId: string, id: string) => Promise<Activity | null>;
  createActivity: (tripId: string, data: CreateActivityData) => Promise<Activity | null>;
  updateActivity: (tripId: string, id: string, data: UpdateActivityData) => Promise<Activity | null>;
  deleteActivity: (tripId: string, id: string) => Promise<boolean>;
  getLastActivity: (tripId: string) => Promise<Activity | null>;
  searchTripActivities: (tripId: string, searchTerm: string, filters?: any) => Promise<void>;
  clearError: () => void;
}

const formPath = (tripId: string, path?: string) => {
  return `/api/trips/${tripId}/activities${path ? `/${path}` : ''}`;
};

export function useActivities(): UseActivitiesReturn {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const handleError = useCallback((error: any) => {
    console.error('Activity operation error:', error);
    const message = error?.message || 'An unexpected error occurred';
    setError(message);
  }, []);

  const fetchTripActivities = useCallback(async (tripId: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(formPath(tripId));
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch trip activities');
      }

      setActivities(result.data || []);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  const fetchActivity = useCallback(
    async (tripId: string, id: string): Promise<Activity | null> => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(formPath(tripId, id));
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || 'Failed to fetch activity');
        }

        return result.data;
      } catch (error) {
        handleError(error);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [handleError]
  );

  const createActivity = useCallback(
    async (tripId: string, data: CreateActivityData): Promise<Activity | null> => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(formPath(tripId, 'create'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || 'Failed to create activity');
        }

        const newActivity = result.data;
        setActivities((prev) => [newActivity, ...prev]);

        return newActivity;
      } catch (error) {
        handleError(error);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [handleError]
  );

  const updateActivity = useCallback(
    async (tripId: string, id: string, data: UpdateActivityData): Promise<Activity | null> => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(formPath(tripId, id), {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || 'Failed to update activity');
        }

        const updatedActivity = result.data;
        setActivities((prev) =>
          prev.map((activity) =>
            activity.id === id ? updatedActivity : activity
          )
        );

        return updatedActivity;
      } catch (error) {
        handleError(error);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [handleError]
  );

  const deleteActivity = useCallback(
    async (tripId: string, id: string): Promise<boolean> => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(formPath(tripId, id), {
          method: 'DELETE',
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || 'Failed to delete activity');
        }

        setActivities((prev) => prev.filter((activity) => activity.id !== id));
        return true;
      } catch (error) {
        handleError(error);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [handleError]
  );

  const getLastActivity = useCallback(
    async (tripId: string): Promise<Activity | null> => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(formPath(tripId, 'last'));
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || 'Failed to fetch last activity');
        }

        return result.data;
      } catch (error) {
        handleError(error);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [handleError]
  );

  const searchTripActivities = useCallback(
    async (tripId: string, searchTerm: string, filters?: any) => {
      try {
        setLoading(true);
        setError(null);

        const searchParams = new URLSearchParams({
          tripId,
          search: searchTerm,
          ...filters,
        });

        const response = await fetch(`${formPath(tripId)}?${searchParams}`);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || 'Failed to search activities');
        }

        setActivities(result.data || []);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    },
    [handleError]
  );

  return {
    activities,
    loading,
    error,
    fetchTripActivities,
    fetchActivity,
    createActivity,
    updateActivity,
    deleteActivity,
    getLastActivity,
    searchTripActivities,
    clearError,
  };
}
