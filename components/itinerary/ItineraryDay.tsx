'use client';

import { Activity } from '@/lib/types';
import {
  getDayOfWeek,
  parsePtBrToDate,
  sortActivitiesByTime,
} from '@/lib/utils';
import { ItineraryActivityCard } from './ItineraryActivityCard';
import { useCallback, useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface ItineraryDayProps {
  date: string;
  activities: Activity[];
  onDelete: (activity: Activity) => Promise<void>;
}

export function ItineraryDay({
  date,
  activities,
  onDelete,
}: ItineraryDayProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sortedActivities = useCallback(
    () => (activities.length > 0 ? sortActivitiesByTime(activities) : []),
    [activities]
  );

  // Auto-collapse if the current date is after the itinerary date
  useEffect(() => {
    if (date) {
      const currentDate = new Date();
      const itineraryDate = parsePtBrToDate(date)!;

      // Reset time to compare only dates
      currentDate.setHours(0, 0, 0, 0);
      itineraryDate.setHours(0, 0, 0, 0);

      // If current date is after itinerary date, collapse automatically
      if (currentDate > itineraryDate) {
        setIsCollapsed(true);
      }
    }
  }, [date]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.dayHeader}
        onClick={toggleCollapse}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleCollapse();
          }
        }}
      >
        <div className={styles.dateInfo}>
          <h5 className={styles.date}>{date}</h5>
          <span className={styles.dayOfWeek}>{getDayOfWeek(date)}</span>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.activityCount}>
            {activities.length} atividade{activities.length !== 1 ? 's' : ''}
          </span>
          <ChevronDown
            className={`${styles.chevron} ${isCollapsed ? styles.chevronCollapsed : ''}`}
            size={20}
          />
        </div>
      </div>

      <div
        className={`${styles.activitiesContainer} ${isCollapsed ? styles.collapsed : ''}`}
      >
        {sortedActivities().map((activity, index) => (
          <ItineraryActivityCard
            key={activity.id || index}
            activity={activity}
            isLast={index === activities.length - 1}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: 'space-y-4',
  dayHeader:
    'flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 mb-2 bg-midnight-blue rounded-lg cursor-pointer hover:bg-midnight-blue/90 transition-colors duration-200 select-none gap-3',
  dateInfo: 'space-y-1',
  date: 'text-lg font-semibold text-parchment-white',
  dayOfWeek: 'text-sm text-mist-gray capitalize',
  headerRight: 'flex items-center justify-between sm:justify-end gap-3',
  activityCount: 'text-sm text-mist-gray bg-slate-dark px-3 py-1 rounded-full',
  activitiesContainer:
    'space-y-3 transition-all duration-300 ease-in-out overflow-hidden',
  collapsed: 'max-h-0 opacity-0 space-y-0',
  chevron: 'text-mist-gray transition-transform duration-300 ease-in-out',
  chevronCollapsed: 'rotate-180',
};
