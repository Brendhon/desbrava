import {
  Hotel,
  Plane,
  Utensils,
  Drama,
  NotebookPen,
  LucideIcon,
} from 'lucide-react';
import { ActivityTypeKey } from '@/lib/types';

/**
 * Gets the appropriate icon for each activity type
 */
export function getActivityTypeIcon(type: ActivityTypeKey): LucideIcon {
  const icons: Record<ActivityTypeKey, LucideIcon> = {
    accommodation: Hotel,
    transportation: Plane,
    food: Utensils,
    leisure: Drama,
    other: NotebookPen,
  };

  return icons[type];
}

/**
 * Gets the appropriate color class for each activity type
 */
export function getActivityTypeColor(type: ActivityTypeKey): string {
  const colors: Record<ActivityTypeKey, string> = {
    accommodation: 'bg-blue-600',
    transportation: 'bg-green-600',
    food: 'bg-orange-600',
    leisure: 'bg-purple-600',
    other: 'bg-gray-600',
  };

  return colors[type];
}

/**
 * Gets the display label for activity type
 */
export function getActivityTypeLabel(type: ActivityTypeKey): string {
  const labels: Record<ActivityTypeKey, string> = {
    accommodation: 'Acomodação',
    transportation: 'Transporte',
    food: 'Alimentação',
    leisure: 'Lazer',
    other: 'Outro',
  };

  return labels[type];
}

/**
 * Gets the activity type from a string value
 */
export function getActivityTypeFromString(
  value: string
): ActivityTypeKey | null {
  const validTypes: ActivityTypeKey[] = [
    'accommodation',
    'transportation',
    'food',
    'leisure',
    'other',
  ];
  return validTypes.includes(value as ActivityTypeKey)
    ? (value as ActivityTypeKey)
    : null;
}
