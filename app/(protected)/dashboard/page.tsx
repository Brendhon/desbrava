'use client';

import Button from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { useTrips } from '@/hooks/useTrips';
import { TripStats, TripList, EmptyState } from '@/components/dashboard';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
import { Trip } from '@/lib/types/trip';

export default function DashboardPage() {
  const { session } = useAuth();
  const {
    trips,
    loading,
    error,
    fetchTrips,
    deleteTrip,
    clearError
  } = useTrips();

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  const handleDeleteTrip = async (tripId: string) => {
    if (confirm('Tem certeza que deseja deletar esta viagem?')) {
      const success = await deleteTrip(tripId);
      if (success) {
        // Trip will be automatically removed from state
        console.log('Viagem deletada com sucesso');
      }
    }
  };

  const handleEditTrip = (trip: Trip) => {
    // TODO: Implement edit functionality
    console.log('Editar viagem:', trip);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>

        <div>
          <h1 className={styles.title}>
            Olá, {session?.user?.name || 'Viajante'}! 👋
          </h1>
          <p className={styles.subtitle}>Bem-vindo ao seu painel de viagens</p>
        </div>

        <div className={styles.headerActions}>
          <Link href="/trip" aria-label="Criar nova viagem">
            <Button variant="primary" icon={Plus}>
              Nova Viagem
            </Button>
          </Link>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className={styles.errorContainer}>
          <p className={styles.errorText}>{error}</p>
          <Button
            variant="secondary"
            size="sm"
            onClick={clearError}
            className={styles.errorButton}
          >
            Fechar
          </Button>
        </div>
      )}

      {/* Stats Section */}
      <TripStats trips={trips} />

      {/* Trips Section */}
      <div className={styles.tripsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            Suas Viagens
          </h2>
        </div>

        {trips.length === 0 && !loading ? (
          <EmptyState />
        ) : (
          <TripList
            trips={trips}
            loading={loading}
            onEdit={handleEditTrip}
            onDelete={handleDeleteTrip}
          />
        )}
      </div>
    </div>
  );
}

const styles = {
  container: 'max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 space-y-8',
  header: 'flex gap-4 flex-col lg:flex-row justify-center items-center lg:items-start lg:justify-between',
  title: 'text-3xl md:text-4xl font-bold text-parchment-white',
  subtitle: 'text-lg text-mist-gray',
  headerActions: 'flex flex-col sm:flex-row gap-3 pt-4',
  searchToggle: 'self-start sm:self-auto',
  errorContainer: 'bg-red-900/20 border border-red-700 rounded-lg p-4 flex items-center justify-between',
  errorText: 'text-red-300',
  errorButton: 'text-red-300 hover:text-red-100',
  tripsSection: 'space-y-6',
  sectionHeader: 'space-y-2',
  sectionTitle: 'text-2xl font-bold text-parchment-white',
};
