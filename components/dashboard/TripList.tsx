'use client';

import { Trip } from '@/lib/types/trip';
import { filterTripsByStatus, sortTripsByDate } from '@/lib/utils/trip';
import { memo, useCallback, useMemo, useState } from 'react';
import LoadingSpinner from '../ui/LoadingSpinner';
import EmptyState from './EmptyState';
import TripCard from './TripCard';
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

const Filters = memo(
  ({
    statusFilter,
    setStatusFilter,
    getStatusCount,
    getStatusLabel,
  }: {
    statusFilter: StatusFilter;
    setStatusFilter: (status: StatusFilter) => void;
    getStatusCount: (status: StatusFilter) => number;
    getStatusLabel: (status: StatusFilter) => string;
  }) => {
    const handleStatusFilter = useCallback(
      (status: StatusFilter) => setStatusFilter(status),
      [setStatusFilter]
    );

    return (
      <div className={styles.controls}>
        <div className={styles.statusFilters}>
          {STATUS_OPTIONS.map((status) => (
            <button
              key={status}
              onClick={() => handleStatusFilter(status)}
              className={`${styles.statusFilter} ${
                statusFilter === status ? styles.statusFilterActive : ''
              }`}
            >
              {getStatusLabel(status)}
              <span className={styles.statusCount}>
                ({getStatusCount(status)})
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }
);

export default function TripList({ trips, loading = false }: TripListProps) {
  // Status filter
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  // Filter trips
  const filteredTrips = useMemo(
    () =>
      statusFilter === 'all' ? trips : filterTripsByStatus(trips, statusFilter),
    [trips, statusFilter]
  );

  // Sort trips
  const sortedTrips = useMemo(
    () => sortTripsByDate(filteredTrips, 'asc'),
    [filteredTrips]
  );

  // Get status count
  const getStatusCount = useCallback(
    (status: StatusFilter) =>
      status === 'all'
        ? trips.length
        : filterTripsByStatus(trips, status).length,
    [trips]
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
      <Filters
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
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
  controls:
    'flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4',
  statusFilters: 'flex flex-wrap gap-2',
  statusFilter:
    'px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-slate-700 text-mist-gray hover:text-parchment-white',
  statusFilterActive:
    'bg-royal-purple text-parchment-white hover:bg-royal-purple/90',
  statusCount: 'ml-1 opacity-75',
  sortControl: 'flex items-center gap-2',
  sortLabel: 'text-sm text-mist-gray',
  sortSelect:
    'px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-parchment-white focus:outline-none focus:ring-2 focus:ring-royal-purple focus:border-transparent',
  tripsGrid: 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6',
};
