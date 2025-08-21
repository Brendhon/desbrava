'use client';

import { EmptyState, TripCard, TripFilter } from '@/components/dashboard';
import { StatusFilter, Trip } from '@/lib/types/trip';
import {
  filterTripsByStatus,
  searchTripsByText,
  sortTripsByDate,
} from '@/lib/utils/trip';
import { Loader2 } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';

interface TripListProps {
  trips: Trip[];
  loading?: boolean;
  canShowFilters?: boolean;
}

// Components
const LoadingState = () => (
  <Loader2 className={styles.loadingContainer} size={48} strokeWidth={2.5} />
);

// Grid
const Grid = ({ trips, loading }: { trips: Trip[]; loading: boolean }) => {
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
};

export default function TripList({
  trips,
  loading = false,
  canShowFilters = true,
}: TripListProps) {
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
      {canShowFilters && (
        <TripFilter
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          countryFilter={countryFilter}
          setCountryFilter={setCountryFilter}
          getStatusCount={getStatusCount}
          getStatusLabel={getStatusLabel}
        />
      )}

      {/* Trips Grid */}
      <Grid trips={sortedTrips} loading={loading} />
    </div>
  );
}

const styles = {
  container: 'space-y-6',
  loadingContainer: 'animate-spin mx-auto mt-16 text-royal-purple',
  tripsGrid: 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6',
};
