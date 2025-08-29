'use client';

import { Activity } from '@/lib/types';
import { groupActivitiesByDate, parsePtBrToDate } from '@/lib/utils';
import { ItineraryDay } from './ItineraryDay';

interface ItineraryListProps {
  activities: Activity[];
}

/**
 * Sort grouped activities by date
 */
function sortGroupedActivities(groupedActivities: Record<string, Activity[]>) {
  return Object.keys(groupedActivities).sort((a, b) => {
    const dateA = parsePtBrToDate(a);
    const dateB = parsePtBrToDate(b);
    if (!dateA || !dateB) return 0;
    return dateA.getTime() - dateB.getTime();
  });
}

export function ItineraryList({ activities }: ItineraryListProps) {
  const groupedActivities = groupActivitiesByDate(activities);
  const sortedDates = sortGroupedActivities(groupedActivities);

  if (sortedDates.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4 className={styles.title}>Atividades Organizadas por Dia</h4>
        <span className={styles.count}>
          {activities.length} atividade{activities.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className={styles.daysContainer}>
        {sortedDates.map((date) => (
          <ItineraryDay
            key={date}
            date={date}
            activities={groupedActivities[date]}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: 'space-y-6',
  header:
    'flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-dark/20 pb-4 gap-3',
  title: 'text-lg font-medium text-parchment-white text-center sm:text-left',
  count:
    'text-sm text-mist-gray bg-slate-dark px-3 py-1 rounded-full text-center sm:text-left',
  daysContainer: 'space-y-6',
};
