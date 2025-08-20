'use client';

import TripCard from './TripCard';
import { Trip } from '@/lib/types/trip';
import { sortTripsByDate, filterTripsByStatus } from '@/lib/utils/trip';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import { MapPin, Plus } from 'lucide-react';
import Link from 'next/link';

interface TripListProps {
  trips: Trip[];
  loading?: boolean;
  onEdit?: (trip: Trip) => void;
  onDelete?: (tripId: string) => void;
}

export default function TripList({ trips, loading = false, onEdit, onDelete }: TripListProps) {
  const [statusFilter, setStatusFilter] = useState<'all' | 'past' | 'active' | 'future'>('all');

  // Filter and sort trips
  const filteredTrips = statusFilter === 'all' 
    ? trips 
    : filterTripsByStatus(trips, statusFilter);
  
  const sortedTrips = sortTripsByDate(filteredTrips, 'asc');

  const getStatusCount = (status: string) => {
    if (status === 'all') return trips.length;
    return filterTripsByStatus(trips, status as any).length;
  };

  const getStatusLabel = (status: string) => {
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
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p className={styles.loadingText}>Carregando viagens...</p>
      </div>
    );
  }

  if (trips.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>
          <MapPin className={styles.emptyIconImage} aria-hidden="true" />
        </div>
        <h2 className={styles.emptyTitle}>Nenhuma viagem ainda</h2>
        <p className={styles.emptyDescription}>
          Comece criando sua primeira viagem para explorar o mundo!
        </p>
        <Link href="/trip" aria-label="Criar primeira viagem">
          <Button variant="primary" icon={Plus} className="mx-auto">
            Criar Primeira Viagem
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Filters and Controls */}
      <div className={styles.controls}>
        <div className={styles.statusFilters}>
          {(['all', 'past', 'active', 'future'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`${styles.statusFilter} ${
                statusFilter === status ? styles.statusFilterActive : ''
              }`}
            >
              {getStatusLabel(status)}
              <span className={styles.statusCount}>({getStatusCount(status)})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Trips Grid */}
      <div className={styles.tripsGrid}>
        {sortedTrips.map((trip) => (
          <TripCard
            key={trip.id}
            trip={trip}
            onDelete={onDelete}
          />
        ))}
      </div>

      {/* Results Summary */}
      <div className={styles.resultsSummary}>
        <p className={styles.resultsText}>
          Mostrando {sortedTrips.length} de {trips.length} viagens
          {statusFilter !== 'all' && ` (${getStatusLabel(statusFilter)})`}
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: 'space-y-6',
  loadingContainer: 'text-center py-16',
  loadingSpinner: 'w-12 h-12 border-4 border-royal-purple border-t-transparent rounded-full animate-spin mx-auto mb-4',
  loadingText: 'text-mist-gray',
  emptyState: 'text-center py-16',
  emptyIcon: 'w-20 h-20 bg-slate-dark rounded-full flex items-center justify-center mx-auto mb-6',
  emptyIconImage: 'w-10 h-10 text-mist-gray',
  emptyTitle: 'text-2xl font-bold text-parchment-white mb-3',
  emptyDescription: 'text-mist-gray mb-8 max-w-md mx-auto',
  controls: 'flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4',
  statusFilters: 'flex flex-wrap gap-2',
  statusFilter: 'px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-slate-700 text-mist-gray hover:text-parchment-white',
  statusFilterActive: 'bg-royal-purple text-parchment-white hover:bg-royal-purple/90',
  statusCount: 'ml-1 opacity-75',
  sortControl: 'flex items-center gap-2',
  sortLabel: 'text-sm text-mist-gray',
  sortSelect: 'px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-parchment-white focus:outline-none focus:ring-2 focus:ring-royal-purple focus:border-transparent',
  tripsGrid: 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6',
  resultsSummary: 'text-center py-4',
  resultsText: 'text-sm text-mist-gray',
};
