'use client';

import { GroupSection } from '@/components/ui';
import { Activity, ActivityType } from '@/lib/types';
import { formatTripDates, getActivityTypeIcon } from '@/lib/utils';
import {
  Calendar,
  CheckCircle,
  Clock,
  MapPin,
  NotebookIcon,
} from 'lucide-react';
import PlaceInfo from './destination/PlaceInfo';
import { usePlaceTypes } from '@/hooks/usePlaceTypes';
import { useMemo } from 'react';

interface ActivityInfoViewProps {
  activity: Activity;
  className?: string;
}

function ActivityItem({
  label,
  value,
  Icon,
}: {
  label: string;
  value: string;
  Icon: React.ComponentType<{ className?: string }>;
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

/**
 * ActivityInfoView Component
 *
 * A reusable component that displays all information about an activity.
 * Can be used in various contexts like activity details, summaries, or previews.
 *
 * @param activity - The activity object containing all activity information
 * @param className - Optional additional CSS classes
 */
export default function ActivityInfoView({
  activity,
  className = '',
}: ActivityInfoViewProps) {
  // Hooks
  const { getSubtypeLabel } = usePlaceTypes();

  // Get the label for the activity type
  const activityTypeLabel = useMemo(() => {
    return activity.subType
      ? getSubtypeLabel(activity.type, activity.subType)
      : ActivityType[activity.type];
  }, [activity.type, activity.subType, getSubtypeLabel]);

  // Render
  return (
    <div className={`${styles.container} ${className}`}>
      {/* Activity Type Group */}
      <GroupSection
        title="Informações básicas"
        description="Data, hora e outras informações da atividade"
        icon={CheckCircle}
      >
        {/* Period Section */}
        <div className={styles.section}>
          {/* Activity Type Section */}
          <ActivityItem
            label={ActivityType[activity.type]}
            value={activityTypeLabel}
            Icon={getActivityTypeIcon(activity.type)}
          />

          {/* Date Section */}
          <ActivityItem
            label="Data"
            value={formatTripDates(activity.startDate, activity.endDate)}
            Icon={Calendar}
          />

          {/* Time Section */}
          <div className={styles.row}>
            {/* Start Time Section */}
            {activity.startTime && (
              <ActivityItem
                label="Início"
                value={activity.startTime}
                Icon={Clock}
              />
            )}

            {/* End Time Section */}
            {activity.endTime && (
              <ActivityItem label="Fim" value={activity.endTime} Icon={Clock} />
            )}
          </div>

          {/* Description Section */}
          {activity.description && (
            <ActivityItem
              label="Observações e Notas"
              value={activity.description}
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
        {activity.place && (
          <PlaceInfo place={activity.place} type={activity.type} />
        )}
      </GroupSection>
    </div>
  );
}

const styles = {
  container: 'space-y-6',
  section: 'space-y-4',
  row: 'grid grid-cols-1 sm:grid-cols-2 gap-4',
  item: 'flex items-start gap-3 p-4 bg-slate-800/20 rounded-lg border border-slate-700/30',
  icon: 'w-5 h-5 text-royal-purple mt-0.5 flex-shrink-0',
  label: 'text-sm font-medium text-mist-gray mb-1',
  value: 'text-parchment-white text-sm leading-relaxed',
};
