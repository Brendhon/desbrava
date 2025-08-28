import { Activity } from '@/lib/types';
import { parsePtBrToDate } from './date';

/**
 * Groups activities by date for itinerary organization
 */
export function groupActivitiesByDate(activities: Activity[]): Record<string, Activity[]> {
  return activities.reduce((groups, activity) => {
    const date = activity.startDate;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(activity);
    return groups;
  }, {} as Record<string, Activity[]>);
}

/**
 * Sorts activities by start time within each day
 */
export function sortActivitiesByTime(activities: Activity[]): Activity[] {
  return activities.sort((a, b) => {
    const timeA = parsePtBrToDate(a.startTime);
    const timeB = parsePtBrToDate(b.startTime);
    if (!timeA || !timeB) return 0;
    return timeA.getTime() - timeB.getTime();
  });
}

/**
 * Gets the total duration of activities for a specific day
 */
export function getDayActivitiesDuration(activities: Activity[]): number {
  return activities.reduce((total, activity) => {
    const start = parsePtBrToDate(activity.startTime);
    const end = parsePtBrToDate(activity.endTime);
    if (!start || !end) return total;
    const duration = end.getTime() - start.getTime();
    return total + duration;
  }, 0);
}

/**
 * Checks if activities overlap in time
 */
export function hasTimeConflict(activities: Activity[]): boolean {
  const sortedActivities = sortActivitiesByTime(activities);
  
  for (let i = 0; i < sortedActivities.length - 1; i++) {
    const current = sortedActivities[i];
    const next = sortedActivities[i + 1];
    
    const currentEnd = parsePtBrToDate(current.endTime);
    const nextStart = parsePtBrToDate(next.startTime);
    
    if (!currentEnd || !nextStart) return false;
    if (currentEnd > nextStart) {
      return true;
    }
  }
  
  return false;
}

/**
 * Gets activities for a specific date range
 */
export function getActivitiesInDateRange(
  activities: Activity[],
  startDate: string,
  endDate: string
): Activity[] {
  return activities.filter(activity => {
    // Parse the dates
    const activityDate = parsePtBrToDate(activity.startDate);
    const rangeStart = parsePtBrToDate(startDate);
    const rangeEnd = parsePtBrToDate(endDate);

    // If any of the dates are invalid, return false
    if (!activityDate || !rangeStart || !rangeEnd) return false;

    // Check if the activity date is within the range
    return activityDate >= rangeStart && activityDate <= rangeEnd;
  });
}
