'use client';

import { Card } from '@/components/ui';
import { Activity, ActivityTypeKey } from '@/lib/types';
import { ItineraryFilters } from './ItineraryFilters';
import { ItineraryStats } from './ItineraryStats';
import { useState, useMemo } from 'react';
import { ItineraryList } from './ItineraryList';
import { ItineraryEmptyState } from './ItineraryEmptyState';
import { ItineraryHeader } from './ItineraryHeader';

interface ItineraryContainerProps {
  tripId: string;
  activities: Activity[];
  loading?: boolean;
}

export function ItineraryContainer({
  tripId,
  activities,
  loading = false,
}: ItineraryContainerProps) {
  const [selectedTypes, setSelectedTypes] = useState<ActivityTypeKey[]>([]);
  
  const filteredActivities = useMemo(() => {
    if (selectedTypes.length === 0) return activities;
    return activities.filter(activity => selectedTypes.includes(activity.type));
  }, [activities, selectedTypes]);

  const hasActivities = activities.length > 0;

  return (
    <Card
      shadow="none"
      background="dark"
      maxWidth="none"
      border={false}
      className={styles.container}
    >
      <ItineraryHeader tripId={tripId} />
      
      {hasActivities && (
        <ItineraryFilters
          selectedTypes={selectedTypes}
          onTypeChange={setSelectedTypes}
          totalActivities={activities.length}
          filteredCount={filteredActivities.length}
        />
      )}
      
      {loading ? (
        <div className={styles.loadingState}>
          <div className={styles.loadingSpinner} />
          <p className={styles.loadingText}>Carregando atividades...</p>
        </div>
      ) : filteredActivities.length > 0 ? (
        <ItineraryList activities={filteredActivities} />
      ) : hasActivities ? (
        <div className={styles.noResults}>
          <p className={styles.noResultsText}>
            Nenhuma atividade encontrada com os filtros selecionados.
          </p>
        </div>
      ) : (
        <ItineraryEmptyState />
      )}
    </Card>
  );
}

const styles = {
  container: 'space-y-6',
  loadingState: 'flex flex-col items-center justify-center py-16 space-y-4',
  loadingSpinner: 'w-8 h-8 border-2 border-royal-purple border-t-transparent rounded-full animate-spin',
  loadingText: 'text-mist-gray text-sm',
  noResults: 'text-center py-16',
  noResultsText: 'text-mist-gray text-lg',
};
