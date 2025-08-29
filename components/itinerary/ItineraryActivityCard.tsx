'use client';

import { Card } from '@/components/ui';
import { Activity, ActivityRoutes, ActivityType } from '@/lib/types';
import {
  formatTime,
  getActivityTypeColor,
  getActivityTypeIcon,
} from '@/lib/utils';
import {
  Calendar,
  Clock,
  ExternalLink,
  EyeIcon,
  MapPin,
  Trash2
} from 'lucide-react';
import Link from 'next/link';

interface ItineraryActivityCardProps {
  activity: Activity;
  isLast?: boolean;
}

export function ItineraryActivityCard({
  activity,
  isLast = false,
}: ItineraryActivityCardProps) {
  const ActivityIcon = getActivityTypeIcon(activity.type);
  const typeColor = getActivityTypeColor(activity.type);
  const isSameDay = activity.startDate === activity.endDate;

  return (
    <Card
      padding="md"
      shadow="lg"
      maxWidth="none"
      border={false}
      className={styles.container}
    >
      <div className={styles.header}>
        <div className={styles.typeSection}>
          <div className={`${styles.typeIcon} ${typeColor}`}>
            <ActivityIcon className={styles.icon} aria-hidden="true" />
          </div>
          <div className={styles.typeInfo}>
            <span className={styles.typeLabel}>
              {ActivityType[activity.type]}
            </span>
            {activity.subType && (
              <span className={styles.subType}>{activity.subType}</span>
            )}
          </div>
        </div>

        <div className={styles.actions}>
          <Link
            href={ActivityRoutes.details(activity.tripId, activity.id!)}
            className={styles.actionButton}
            aria-label="Ver detalhes da atividade"
          >
            <EyeIcon className={styles.actionIcon} />
          </Link>
          <button
            className={`${styles.actionButton} ${styles.deleteButton}`}
            aria-label="Excluir atividade"
          >
            <Trash2 className={styles.actionIcon} />
          </button>
        </div>
      </div>

      <div className={styles.content}>
        {activity.description && (
          <p className={styles.description}>{activity.description}</p>
        )}

        <div className={styles.placeInfo}>
          <MapPin className={styles.placeIcon} />
          <div className={styles.placeDetails}>
            <h6 className={styles.placeName}>
              {activity.place.displayName.text}
            </h6>
            {activity.place.formattedAddress && (
              <p className={styles.placeAddress}>
                {activity.place.formattedAddress}
              </p>
            )}
          </div>
          {activity.place.websiteUri && (
            <a
              href={activity.place.websiteUri}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.websiteLink}
              aria-label="Abrir website do local"
            >
              <ExternalLink className={styles.websiteIcon} />
            </a>
          )}
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.timeInfo}>
          <Clock className={styles.timeIcon} />
          <span className={styles.time}>
            {formatTime(activity.startTime)} - {formatTime(activity.endTime)}
          </span>
        </div>

        {!isSameDay && (
          <div className={styles.dateInfo}>
            <Calendar className={styles.dateIcon} />
            <span className={styles.date}>
              {activity.startDate} até {activity.endDate}
            </span>
          </div>
        )}
      </div>
    </Card>
  );
}

const styles = {
  container: 'relative transition-colors bg-slate-dark/40',
  header:
    'flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-3',
  typeSection: 'flex items-center gap-3',
  typeIcon: 'w-10 h-10 rounded-lg flex items-center justify-center',
  icon: 'w-5 h-5 text-parchment-white',
  typeInfo: 'space-y-1',
  typeLabel: 'text-sm font-medium text-parchment-white block',
  subType: 'text-xs text-mist-gray block',
  actions: 'flex items-center gap-2 justify-end sm:justify-start',
  actionButton:
    'p-2 text-mist-gray hover:text-parchment-white hover:bg-slate-dark/60 rounded-md transition-colors',
  deleteButton: 'hover:text-red-400 hover:bg-red-400/10',
  actionIcon: 'w-4 h-4',
  content: 'space-y-4 mb-4',
  description: 'text-mist-gray text-sm leading-relaxed',
  placeInfo: 'flex flex-col sm:flex-row sm:items-start gap-3',
  placeIcon: 'w-4 h-4 text-royal-purple mt-0.5',
  placeDetails: 'flex-1 space-y-1',
  placeName: 'text-parchment-white font-medium',
  placeAddress: 'text-mist-gray text-sm',
  websiteLink:
    'p-1 text-mist-gray hover:text-royal-purple transition-colors self-start sm:self-auto',
  websiteIcon: 'w-4 h-4',
  footer:
    'flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm text-mist-gray',
  timeInfo: 'flex items-center gap-2',
  timeIcon: 'w-4 h-4',
  time: 'font-medium',
  dateInfo: 'flex items-center gap-2',
  dateIcon: 'w-4 h-4',
  date: 'font-medium',
};
