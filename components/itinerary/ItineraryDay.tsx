'use client';

import { Activity } from '@/lib/types';
import { getDayOfWeek, sortActivitiesByTime } from '@/lib/utils';
import { ItineraryActivityCard } from './ItineraryActivityCard';
import { useCallback } from 'react';

interface ItineraryDayProps {
  date: string;
  activities: Activity[];
}

export function ItineraryDay({ date, activities }: ItineraryDayProps) {
  const sortedActivities = useCallback(
    () => activities.length > 0 ? sortActivitiesByTime(activities) : [],
    [activities]
  );

  return (
    <div className={styles.container}>
      <div className={styles.dayHeader}>
        <div className={styles.dateInfo}>
          <h5 className={styles.date}>{date}</h5>
          <span className={styles.dayOfWeek}>{getDayOfWeek(date)}</span>
        </div>
        <span className={styles.activityCount}>
          {activities.length} atividade{activities.length !== 1 ? 's' : ''}
        </span>
      </div>
      
      <div className={styles.activitiesContainer}>
        {sortedActivities().map((activity, index) => (
          <ItineraryActivityCard
            key={activity.id || index}
            activity={activity}
            isLast={index === activities.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: 'space-y-4',
  dayHeader: 'flex items-center justify-between p-4 bg-midnight-blue rounded-lg',
  dateInfo: 'space-y-1',
  date: 'text-lg font-semibold text-parchment-white',
  dayOfWeek: 'text-sm text-mist-gray capitalize',
  activityCount: 'text-sm text-mist-gray bg-slate-dark px-3 py-1 rounded-full',
  activitiesContainer: 'space-y-3',
};
