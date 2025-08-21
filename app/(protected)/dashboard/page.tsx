'use client';

import { TripList, TripStats } from '@/components/dashboard';
import { Separator } from '@/components/layout';
import { Button } from '@/components/ui';
import { useAuth } from '@/hooks/useAuth';
import { useTrips } from '@/hooks/useTrips';
import { Filter, Plus } from 'lucide-react';
import { Session } from 'next-auth';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const ErrorState = ({
  error,
  clearError,
}: {
  error: string | null;
  clearError: () => void;
}) => {
  if (!error) return null;

  return (
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
  );
};

const Actions = ({
  showFilters,
  setShowFilters,
}: {
  showFilters: boolean;
  setShowFilters: (showFilters: boolean) => void;
}) => {
  return (
    <div className={styles.headerActions}>
      <Button
        variant="ghost"
        icon={Filter}
        onClick={() => setShowFilters(!showFilters)}
      >
        {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
      </Button>

      <Link href="/trip/create" aria-label="Criar nova viagem">
        <Button variant="primary" icon={Plus}>
          Nova Viagem
        </Button>
      </Link>
    </div>
  );
};

const Title = ({ session }: { session: Session | null }) => {
  return (
    <div>
      <h1 className={styles.title}>
        Olá, {session?.user?.name || 'Viajante'}! 👋
      </h1>
      <p className={styles.subtitle}>Bem-vindo ao seu painel de viagens</p>
    </div>
  );
};

export default function DashboardPage() {
  const { session } = useAuth();
  const { trips, loading, error, fetchTrips, clearError } = useTrips();
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => void fetchTrips(), [fetchTrips]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title session={session} />
        <Actions showFilters={showFilters} setShowFilters={setShowFilters} />
      </div>

      {/* Error Display */}
      <ErrorState error={error} clearError={clearError} />

      {/* Stats Section */}
      <TripStats trips={trips} />

      {/* Separator */}
      <Separator />

      {/* Trips Section */}
      <TripList trips={trips} loading={loading} canShowFilters={showFilters} />
    </div>
  );
}

const styles = {
  container: 'max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 space-y-8',
  header:
    'flex gap-4 flex-col lg:flex-row justify-center items-center lg:justify-between',
  title: 'text-3xl md:text-4xl font-bold text-parchment-white',
  subtitle: 'text-lg text-mist-gray',
  headerActions: 'flex flex-col sm:flex-row gap-3 pt-4',
  searchToggle: 'self-start sm:self-auto pt-4',
  errorContainer:
    'bg-red-900/20 border border-red-700 rounded-lg p-4 flex items-center justify-between',
  errorText: 'text-red-300',
  errorButton: 'text-red-300 hover:text-red-100',
};
