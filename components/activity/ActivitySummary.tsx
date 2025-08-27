'use client';

import { NavigationButtons } from '@/components/steps';
import { GroupSection, PageStructure } from '@/components/ui';
import { ActivityDetailsData } from '@/lib/schemas/period';
import { ActivityType } from '@/lib/types';
import { formatTripDates } from '@/lib/utils';
import {
  Calendar,
  CheckCircle,
  Clock,
  Drama,
  Hotel,
  LucideIcon,
  MapPin,
  NotebookIcon,
  NotebookPen,
  Plane,
  Utensils,
} from 'lucide-react';
import { useCallback } from 'react';
import { ActivityTypeData } from './ActivityTypeSelector';
import { DestinationData } from './DestinationSelector';
import PlaceInfo from './destination/PlaceInfo';
import { usePlaceTypes } from '@/hooks/usePlaceTypes';

interface ActivitySummaryProps {
  activityType: ActivityTypeData;
  destinations: DestinationData;
  periodData: ActivityDetailsData;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

function ActivityItem({
  label,
  value,
  Icon,
}: {
  label: string;
  value: string;
  Icon: LucideIcon;
}) {
  return (
    <div className={styles.item}>
      <Icon className={styles.icon} />
      <div>
        <p className={styles.label}>{label}</p>
        <p className={styles.value}>{value}</p>
      </div>
    </div>
  );
}

export default function ActivitySummary({
  activityType,
  destinations,
  periodData,
  onBack,
  onSubmit,
  isSubmitting = false,
}: ActivitySummaryProps) {
  // Hooks
  const { getSubtypeLabel } = usePlaceTypes();

  // Get the icon for the activity type
  const getActivityTypeIcon = useCallback((): LucideIcon => {
    // Define the icons for each activity type
    const icons = {
      accommodation: Hotel,
      transportation: Plane,
      food: Utensils,
      leisure: Drama,
      other: NotebookPen,
    };

    // Return the icon for the activity type
    return icons[activityType.type];
  }, [activityType.type]);

  // Get the label for the activity type
  const activityTypeLabel = useCallback(() => {
    return getSubtypeLabel(activityType.type, activityType.subType);
  }, [activityType.type, activityType.subType]);

  return (
    <PageStructure
      title="Resumo da Atividade"
      description="Revise as informações antes de criar a atividade"
    >
      <div className={styles.container}>
        {/* Activity Type Group */}
        <GroupSection
          title="Informações básicas"
          description="Confirme as informações básicas da atividade"
          icon={CheckCircle}
        >
          {/* Period Section */}
          <div className={styles.section}>
            {/* Activity Type Section */}
            <ActivityItem
              label={ActivityType[activityType.type]}
              value={activityTypeLabel()}
              Icon={getActivityTypeIcon()}
            />

            {/* Date Section */}
            <ActivityItem
              label="Data"
              value={formatTripDates(periodData.startDate, periodData.endDate)}
              Icon={Calendar}
            />

            {/* Time Section */}
            <div className={styles.row}>
              {/* Start Time Section */}
              {periodData.startTime && (
                <ActivityItem
                  label="Início"
                  value={periodData.startTime}
                  Icon={Clock}
                />
              )}

              {/* End Time Section */}
              {periodData.endTime && (
                <ActivityItem
                  label="Fim"
                  value={periodData.endTime}
                  Icon={Clock}
                />
              )}
            </div>

            {/* Description Section */}
            {periodData.description && (
              <ActivityItem
                label="Observações e Notas"
                value={periodData.description}
                Icon={NotebookIcon}
              />
            )}
          </div>
        </GroupSection>

        {/* Destinations Group */}
        <GroupSection
          title="Local da Atividade"
          description="Detalhes do local selecionado"
          icon={MapPin}
        >
          {destinations.place && (
            <PlaceInfo place={destinations.place} type={activityType.type} />
          )}
        </GroupSection>

        {/* Navigation Buttons */}
        <NavigationButtons
          onBack={onBack}
          onNext={onSubmit}
          canProceed={true}
          nextButtonText={isSubmitting ? 'Criando...' : 'Criar Atividade'}
        />
      </div>
    </PageStructure>
  );
}

const styles = {
  container: 'space-y-8',
  section: ' flex gap-4 flex-col',
  item: 'flex gap-3',
  row: 'flex items-center gap-8 flex-wrap',
  icon: 'text-mist-gray min-w-4 w-4 pt-0.5',
  label: 'text-mist-gray text-xs uppercase tracking-wide font-medium',
  value: 'text-parchment-white font-medium text-left text-sm ',
};
