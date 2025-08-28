'use client';

import { Activity } from '@/lib/types';
import { groupActivitiesByDate } from '@/lib/utils';
import { ItineraryDay } from './ItineraryDay';

interface ItineraryListProps {
  activities: Activity[];
}

export function ItineraryList({ activities }: ItineraryListProps) {
  const groupedActivities = groupActivitiesByDate(activities);
  const sortedDates = Object.keys(groupedActivities).sort();

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
  header: 'flex items-center justify-between border-b border-slate-dark/20 pb-4',
  title: 'text-lg font-medium text-parchment-white',
  count: 'text-sm text-mist-gray bg-slate-dark px-3 py-1 rounded-full',
  daysContainer: 'space-y-6',
};
