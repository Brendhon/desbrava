'use client';

import { Trip } from '@/lib/types/trip';
import {
  filterTripsByStatus,
  sortTripsByDate,
  searchTripsByText,
} from '@/lib/utils/trip';
import { memo, useCallback, useMemo, useState } from 'react';
import LoadingSpinner from '../ui/LoadingSpinner';
import EmptyState from './EmptyState';
import TripCard from './TripCard';
import TripFilter from './TripFilter';
import { Loader2 } from 'lucide-react';

interface TripListProps {
  trips: Trip[];
  loading?: boolean;
}

// Constants
const STATUS_OPTIONS = ['all', 'past', 'active', 'future'] as const;
type StatusFilter = (typeof STATUS_OPTIONS)[number];

// Components
const LoadingState = () => (
  <Loader2 className={styles.loadingContainer} size={48} strokeWidth={2.5} />
);

// Grid
const Grid = memo(({ trips, loading }: { trips: Trip[]; loading: boolean }) => {
  // Loading State
  if (loading) return <LoadingState />;

  // Empty State
  if (trips.length === 0) return <EmptyState />;

  // Grid
  return (
    <div className={styles.tripsGrid}>
      {trips.map((trip) => (
        <TripCard key={trip.id} trip={trip} />
      ))}
    </div>
  );
});

export default function TripList({ trips, loading = false }: TripListProps) {
  // Status filter
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  // Country filter
  const [countryFilter, setCountryFilter] = useState<string>('');

  // Filter trips by country first
  const countryFilteredTrips = useMemo(
    () => searchTripsByText(trips, countryFilter),
    [trips, countryFilter]
  );

  // Filter trips by status
  const filteredTrips = useMemo(
    () =>
      statusFilter === 'all'
        ? countryFilteredTrips
        : filterTripsByStatus(countryFilteredTrips, statusFilter),
    [countryFilteredTrips, statusFilter]
  );

  // Sort trips
  const sortedTrips = useMemo(
    () => sortTripsByDate(filteredTrips, 'asc'),
    [filteredTrips]
  );

  // Get status count (considering country filter)
  const getStatusCount = useCallback(
    (status: StatusFilter) =>
      status === 'all'
        ? countryFilteredTrips.length
        : filterTripsByStatus(countryFilteredTrips, status).length,
    [countryFilteredTrips]
  );

  // Get status label
  const getStatusLabel = useCallback((status: StatusFilter) => {
    switch (status) {
      case 'all':
        return 'Todas';
      case 'past':
        return 'Concluídas';
      case 'active':
        return 'Em Andamento';
      case 'future':
        return 'Futuras';
      default:
        return 'Todas';
    }
  }, []);

  return (
    <div className={styles.container}>
      {/* Filters and Controls */}
      <TripFilter
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        countryFilter={countryFilter}
        setCountryFilter={setCountryFilter}
        getStatusCount={getStatusCount}
        getStatusLabel={getStatusLabel}
      />

      {/* Trips Grid */}
      <Grid trips={sortedTrips} loading={loading} />
    </div>
  );
}

const styles = {
  container: 'space-y-6',
  loadingContainer: 'animate-spin mx-auto my-4 text-royal-purple',
  emptyState: 'text-center py-16',
  emptyIcon:
    'w-20 h-20 bg-slate-dark rounded-full flex items-center justify-center mx-auto mb-6',
  emptyIconImage: 'w-10 h-10 text-mist-gray',
  emptyTitle: 'text-2xl font-bold text-parchment-white mb-3',
  emptyDescription: 'text-mist-gray mb-8 max-w-md mx-auto',
  tripsGrid: 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6',
};
