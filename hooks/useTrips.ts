'use client';

import { useState, useCallback } from 'react';
import { Trip, CreateTripData, UpdateTripData } from '@/lib/types/trip';

interface UseTripsReturn {
  trips: Trip[];
  loading: boolean;
  error: string | null;
  fetchTrips: () => Promise<void>;
  fetchTrip: (id: string) => Promise<Trip | null>;
  createTrip: (data: Omit<CreateTripData, 'user'>) => Promise<Trip | null>;
  updateTrip: (id: string, data: UpdateTripData) => Promise<Trip | null>;
  deleteTrip: (id: string) => Promise<boolean>;
  searchTrips: (searchTerm: string, filters?: any) => Promise<void>;
  clearError: () => void;
}

export function useTrips(): UseTripsReturn {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const handleError = useCallback((error: any) => {
    console.error('Trip operation error:', error);
    const message = error?.message || 'An unexpected error occurred';
    setError(message);
  }, []);

  const fetchTrips = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/trips');
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch trips');
      }
      
      setTrips(result.data || []);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  const fetchTrip = useCallback(async (id: string): Promise<Trip | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/trips/${id}`);
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch trip');
      }
      
      return result.data;
    } catch (error) {
      handleError(error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  const createTrip = useCallback(async (data: Omit<CreateTripData, 'user'>): Promise<Trip | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/trips/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to create trip');
      }
      
      const newTrip = result.data;
      setTrips(prev => [newTrip, ...prev]);
      
      return newTrip;
    } catch (error) {
      handleError(error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  const updateTrip = useCallback(async (id: string, data: UpdateTripData): Promise<Trip | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/trips/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to update trip');
      }
      
      const updatedTrip = result.data;
      setTrips(prev => prev.map(trip => 
        trip.id === id ? updatedTrip : trip
      ));
      
      return updatedTrip;
    } catch (error) {
      handleError(error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  const deleteTrip = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/trips/${id}`, {
        method: 'DELETE',
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to delete trip');
      }
      
      setTrips(prev => prev.filter(trip => trip.id !== id));
      return true;
    } catch (error) {
      handleError(error);
      return false;
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  const searchTrips = useCallback(async (searchTerm: string, filters?: any) => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (filters?.startDate) params.append('startDate', filters.startDate);
      if (filters?.endDate) params.append('endDate', filters.endDate);
      if (filters?.country) params.append('country', filters.country);
      
      const response = await fetch(`/api/trips?${params.toString()}`);
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to search trips');
      }
      
      setTrips(result.data || []);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  return {
    trips,
    loading,
    error,
    fetchTrips,
    fetchTrip,
    createTrip,
    updateTrip,
    deleteTrip,
    searchTrips,
    clearError,
  };
}
