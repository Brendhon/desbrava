'use client';

import ActivityInfoView from '@/components/activity/ActivityInfoView';
import { ErrorPage } from '@/components/error';
import { PageHeader } from '@/components/layout';
import { useActivities } from '@/hooks';
import { useToast } from '@/hooks/useToast';
import { Activity, ActivityRoutes, TripRoutes } from '@/lib/types';
import { Settings } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import ActivityDetailsLoading from './loading';

export default function ActivityDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const tripId = params.id as string;
  const activityId = params.activityId as string;

  // State for activity data
  const [activity, setActivity] = useState<Activity | null>(null);
  const [isLoadingActivity, setIsLoadingActivity] = useState(true);

  // Hooks
  const { fetchActivity, error, clearError } = useActivities();
  const { error: showErrorToast } = useToast();

  const loadActivity = useCallback(async () => {
    // If tripId or activityId is not set, return
    if (!tripId || !activityId) return;

    // Set loading state to true
    setIsLoadingActivity(true);

    try {
      // Fetch activity data
      const activityData = await fetchActivity(tripId, activityId);

      if (activityData) {
        // Set activity data
        setActivity(activityData);
      } else {
        showErrorToast(
          'Atividade não encontrada',
          'A atividade solicitada não foi encontrada ou você não tem permissão para acessá-la.'
        );
        // Redirect back to trip details
        router.push(TripRoutes.details(tripId));
      }
    } finally {
      // Set loading state to false
      setIsLoadingActivity(false);
    }
  }, [tripId, activityId]);

  // Load activity data when tripId or activityId changes
  useEffect(() => void loadActivity(), [loadActivity]);

  // Show loading while fetching activity data
  if (isLoadingActivity) {
    return <ActivityDetailsLoading />;
  }

  // Show error state
  if (error) {
    return (
      <ErrorPage
        backHref={TripRoutes.details(tripId)}
        backText="Voltar aos Detalhes da Viagem"
        backAriaLabel="Voltar aos Detalhes da Viagem"
        title="Erro ao Carregar Atividade"
        subtitle="Ocorreu um erro ao carregar os dados da atividade"
        errorMessage={error}
        onRetry={clearError}
        retryButtonText="Tentar Novamente"
      />
    );
  }

  // Don't render content until we have activity data
  if (!activity) return null;

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        {/* Header */}
        <PageHeader
          backHref={TripRoutes.details(tripId)}
          backText="Voltar aos Detalhes da Viagem"
          backAriaLabel="Voltar aos Detalhes da Viagem"
          title='Detalhes da Atividade'
          subtitle="Informações completas sobre esta atividade"
        />

        <div className={styles.actionsContainer}>
          <Link
            href={ActivityRoutes.edit(tripId, activityId)}
            className={styles.settingsLink}
            aria-label="Configurações da viagem"
          >
            <Settings className={styles.settingsIcon} aria-hidden="true" />
            Configurações
          </Link>
        </div>
      </div>

      {/* Activity Info */}
      <ActivityInfoView activity={activity} />
    </div>
  );
}

const styles = {
  container: 'max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8',
  headerContainer: 'flex items-start justify-between',
  actionsContainer: 'flex items-center gap-3',
  backLink:
    'inline-flex items-center gap-2 bg-slate-700 text-mist-gray px-4 py-2 rounded-lg hover:bg-slate-600 hover:text-parchment-white transition-colors',
  backIcon: 'w-4 h-4',
  settingsLink:
    'inline-flex items-center gap-2 bg-slate-dark text-mist-gray px-4 py-2 rounded-lg hover:bg-slate-dark/60 hover:text-parchment-white transition-colors',
  settingsIcon: 'w-4 h-4',

};
