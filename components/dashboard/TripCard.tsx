'use client';

import Card from '@/components/ui/Card';
import { Trip } from '@/lib/types/trip';
import { formatTripDates, calculateTripDuration, getTripStatus } from '@/lib/utils/trip';
import { Calendar, MapPin, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface TripCardProps {
  trip: Trip;
  onEdit?: (trip: Trip) => void;
  onDelete?: (tripId: string) => void;
}

export default function TripCard({ trip, onEdit, onDelete }: TripCardProps) {
  const status = getTripStatus(trip);
  const duration = calculateTripDuration(trip.startDate, trip.endDate);
  const formattedDates = formatTripDates(trip.startDate, trip.endDate);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-500';
      case 'future':
        return 'bg-blue-500';
      case 'past':
        return 'bg-slate-500';
      default:
        return 'bg-slate-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Em Andamento';
      case 'future':
        return 'Futura';
      case 'past':
        return 'Concluída';
      default:
        return 'Desconhecido';
    }
  };

  return (
    <Card
      padding="lg"
      shadow="md"
      background="dark"
      maxWidth="none"
      border={false}
      className={styles.card}
    >
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h3 className={styles.title}>{trip.name}</h3>
          <span className={`${styles.status} ${getStatusColor(status)}`}>
            {getStatusText(status)}
          </span>
        </div>

        <div className={styles.actions}>
          {onEdit && (
            <button
              onClick={() => onEdit(trip)}
              className={styles.actionButton}
              aria-label="Editar viagem"
            >
              <Edit className={styles.actionIcon} />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(trip.id)}
              className={styles.actionButton}
              aria-label="Deletar viagem"
            >
              <Trash2 className={styles.actionIcon} />
            </button>
          )}
        </div>
      </div>

      <p className={styles.description} title={trip.description}>{trip.description || 'Sem descrição'}</p>

      <div className={styles.details}>
        <div className={styles.detailItem}>
          {
            trip.country.flag
              ? <img src={trip.country.flag} alt={trip.country.country} className={styles.detailImage} />
              : <MapPin className={styles.detailIcon} />
          }
          <span className={styles.detailText}>
            {trip.country.country}
          </span>
        </div>

        <div className={styles.detailItem}>
          <Calendar className={styles.detailIcon} />
          <span className={styles.detailText}>
            {formattedDates} ({duration} {duration === 1 ? 'dia' : 'dias'})
          </span>
        </div>
      </div>

      <div className={styles.footer}>
        <Link
          href={`/trip/${trip.id}`}
          className={styles.viewButton}
          aria-label={`Ver detalhes da viagem ${trip.name}`}
        >
          Ver Detalhes
        </Link>
      </div>
    </Card>
  );
}

const styles = {
  card: 'hover:shadow-lg transition-shadow duration-200',
  header: 'flex items-start justify-between mb-4',
  titleSection: 'flex items-center gap-3',
  title: 'text-xl font-semibold text-parchment-white',
  status: 'px-3 py-1 text-xs font-medium text-white rounded-full',
  actions: 'flex items-center gap-2',
  actionButton: 'p-2 text-mist-gray hover:text-parchment-white transition-colors duration-200',
  actionIcon: 'w-4 h-4',
  description: 'text-mist-gray mb-4 line-clamp-2 text-sm text-ellipsis overflow-hidden whitespace-nowrap',
  details: 'space-y-2 mb-4',
  detailItem: 'flex items-center gap-2',
  detailImage: 'w-5 h-4',
  detailIcon: 'w-4 h-4 text-royal-purple',
  detailText: 'text-sm text-mist-gray',
  footer: 'pt-4 border-t border-slate-700 flex justify-center',
  viewButton: 'inline-flex items-center px-4 py-2 bg-royal-purple text-parchment-white rounded-lg hover:bg-royal-purple/90 transition-colors duration-200 text-sm font-medium',
};
