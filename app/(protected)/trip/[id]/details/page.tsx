'use client';

import { ErrorPage } from '@/components/error';
import { PageHeader } from '@/components/layout';
import { Button, Card } from '@/components/ui';
import { useToast } from '@/hooks/useToast';
import { useTrips } from '@/hooks/useTrips';
import { Trip } from '@/lib/types/trip';
import { calculateTripDuration } from '@/lib/utils/trip';
import {
  Calendar,
  DollarSign,
  Globe,
  LanguagesIcon,
  LucideIcon,
  Map,
  MapIcon,
  Plus,
  Settings,
  TimerIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import TripDetailsLoading from './loading';
import { DashboardRoutes, TripRoutes, ActivityRoutes } from '@/lib/types';

const TripInfoCard = ({
  Icon,
  label,
  children,
}: {
  Icon: LucideIcon;
  label: string;
  children: ReactNode;
}) => {
  return (
    <Card
      padding="sm"
      shadow="none"
      background="dark"
      maxWidth="none"
      border={false}
      className={styles.infoCard}
    >
      <Icon className={styles.infoIcon} aria-hidden="true" />
      <div>
        <p className={styles.infoLabel}>{label}</p>
        <p className={styles.infoValue}>{children}</p>
      </div>
    </Card>
  );
};

export default function TripDetailsPage() {
  const params = useParams();
  const tripId = params.id as string;

  // State for trip data
  const [trip, setTrip] = useState<Trip | null>(null);
  const [isLoadingTrip, setIsLoadingTrip] = useState(true);

  // Hooks
  const { fetchTrip, error, clearError } = useTrips();
  const { error: showErrorToast } = useToast();

  // Duration
  const duration = useMemo(
    () => calculateTripDuration(trip?.startDate, trip?.endDate),
    [trip?.startDate, trip?.endDate]
  );

  const loadTrip = useCallback(async () => {
    // If tripId is not set, return
    if (!tripId) return;

    // Set loading state to true
    setIsLoadingTrip(true);

    try {
      // Fetch trip data
      const tripData = await fetchTrip(tripId);

      if (tripData) {
        setTrip(tripData);
      } else {
        showErrorToast(
          'Viagem não encontrada',
          'A viagem solicitada não foi encontrada ou você não tem permissão para acessá-la.'
        );
      }
    } finally {
      // Set loading state to false
      setIsLoadingTrip(false);
    }
  }, [tripId]);

  // Load trip data when tripId changes
  useEffect(() => void loadTrip(), [loadTrip]);

  // Show loading while fetching trip data
  if (isLoadingTrip) return <TripDetailsLoading />;

  // Show error state
  if (error) {
    return (
      <ErrorPage
        backHref={DashboardRoutes.dashboard()}
        backText="Voltar ao Dashboard"
        backAriaLabel="Voltar ao Dashboard"
        title="Erro ao Carregar Viagem"
        subtitle="Ocorreu um erro ao carregar os dados da viagem"
        errorMessage={error}
        onRetry={clearError}
        retryButtonText="Tentar Novamente"
      />
    );
  }

  // Don't render content until we have trip data
  if (!trip) return null;

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        {/* Header */}
        <PageHeader
          backHref={DashboardRoutes.dashboard()}
          backText="Voltar ao Dashboard"
          backAriaLabel="Voltar ao Dashboard"
          title={trip.name}
          subtitle={trip.description}
        />

        <Link
          href={TripRoutes.settings(tripId)}
          className={styles.settingsLink}
          aria-label="Configurações da viagem"
        >
          <Settings className={styles.settingsIcon} aria-hidden="true" />
          Configurações
        </Link>
      </div>

      {/* Trip Info Cards */}
      <div className={styles.infoGrid}>
        <TripInfoCard Icon={Globe} label="País">
          {trip.country.country}
        </TripInfoCard>

        <TripInfoCard Icon={MapIcon} label="Continente">
          {trip.country.continent || 'Não especificado'}
        </TripInfoCard>

        <TripInfoCard Icon={LanguagesIcon} label="Idioma (local)">
          {trip.country.language?.join(', ') || 'Não especificado'}
        </TripInfoCard>

        <TripInfoCard Icon={DollarSign} label="Moeda (local)">
          {trip.country.currency_name_pt || 'Não especificado'}
        </TripInfoCard>

        <TripInfoCard Icon={Calendar} label="Período">
          {trip.startDate} - {trip.endDate}
        </TripInfoCard>

        <TripInfoCard Icon={TimerIcon} label="Duração">
          {duration} dias
        </TripInfoCard>
      </div>

      {/* Content Tabs */}
      <Card
        shadow="none"
        background="dark"
        maxWidth="none"
        border={false}
        className={styles.tabContainer}
      >
        {/* Itinerary Tab */}
        <div className={styles.itineraryContent}>
          <div className={styles.itineraryHeader}>
            <h3 className={styles.itineraryTitle}>Seu Itinerário</h3>
            <Link href={ActivityRoutes.create(tripId)}>
              <Button
                variant="primary"
                icon={Plus}
                aria-label="Adicionar nova atividade"
                size="sm"
              >
                Adicionar Atividade
              </Button>
            </Link>
          </div>

          {/* Empty State */}
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <Map className={styles.emptyIconImage} aria-hidden="true" />
            </div>
            <h3 className={styles.emptyTitle}>Nenhuma atividade planejada</h3>
            <p className={styles.emptyDescription}>
              Comece adicionando atividades ao seu itinerário para organizar
              melhor sua viagem.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

const styles = {
  container: 'max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8',
  headerContainer: 'flex items-start justify-between',
  settingsLink:
    'inline-flex items-center gap-2 bg-slate-dark text-mist-gray px-4 py-2 rounded-lg hover:bg-slate-dark/60 hover:text-parchment-white transition-colors',
  settingsIcon: 'w-4 h-4',
  infoGrid: 'grid grid-cols-1 md:grid-cols-3 gap-4 mb-8',
  infoCard: 'flex items-center gap-3',
  infoIcon: 'w-5 h-5 text-royal-purple',
  infoLabel: 'text-sm text-mist-gray',
  infoValue: 'text-parchment-white font-medium',
  tabContainer: '',
  tabNav: 'border-b border-slate-dark/20',
  tabNavContent: 'flex space-x-8 px-6',
  tabButton:
    'py-4 px-1 border-b-2 border-transparent text-mist-gray hover:text-parchment-white font-medium',
  tabButtonActive:
    'py-4 px-1 border-b-2 border-royal-purple text-royal-purple font-medium',
  tabContent: 'p-6',
  itineraryContent: 'space-y-6',
  itineraryHeader: 'flex items-center justify-between',
  itineraryTitle: 'text-xl font-semibold text-parchment-white',
  emptyState: 'text-center py-16',
  emptyIcon:
    'w-20 h-20 bg-midnight-blue rounded-full flex items-center justify-center mx-auto mb-6',
  emptyIconImage: 'w-10 h-10 text-mist-gray',
  emptyTitle: 'text-xl font-semibold text-parchment-white mb-3',
  emptyDescription: 'text-mist-gray mb-6 max-w-md mx-auto',
};
