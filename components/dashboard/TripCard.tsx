'use client';

import { Button, Card } from '@/components/ui';
import { TripRoutes } from '@/lib/types';
import { Trip } from '@/lib/types/trip';
import {
  calculateTripDuration,
  formatTripDates,
  getTripStatus,
} from '@/lib/utils';
import { Calendar, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useMemo } from 'react';

interface TripCardProps {
  trip: Trip;
}

// Components
// FlagImage
const FlagImage = ({ trip }: { trip: Trip }) => {
  return (
    trip.country.flag && (
      <img
        loading="lazy"
        src={trip.country.flag}
        alt={trip.country.country}
        className={styles.detailImage}
      />
    )
  );
};

// Description
const Description = ({ trip }: { trip: Trip }) => {
  return (
    <p className={styles.description} title={trip.description}>
      {trip.description || 'Sem descrição'}
    </p>
  );
};

// Details
const Details = ({
  trip,
  formattedDates,
  duration,
}: {
  trip: Trip;
  formattedDates: string;
  duration: number;
}) => {
  return (
    <div className={styles.details}>
      <div className={styles.detailItem}>
        <MapPin className={styles.detailIcon} />
        <span className={styles.detailText}>{trip.country.country}</span>
      </div>

      <div className={styles.detailItem}>
        <Calendar className={styles.detailIcon} />
        <span className={styles.detailText}>
          {formattedDates} ({duration} {duration === 1 ? 'dia' : 'dias'})
        </span>
      </div>
    </div>
  );
};

// Footer
const Footer = ({ trip }: { trip: Trip }) => {
  return (
    <div className={styles.footer}>
      <Link
        href={TripRoutes.details(trip.id)}
        aria-label={`Ver detalhes da viagem ${trip.name}`}
      >
        <Button variant="primary" size="sm">
          Ver Detalhes
        </Button>
      </Link>
    </div>
  );
};

// Status
const Status = ({ status }: { status: string }) => {
  // Status Text
  const getStatusText = useCallback((status: string) => {
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
  }, []);

  // Status Color
  const getStatusColor = useCallback((status: string) => {
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
  }, []);

  return (
    <span className={`${styles.status} ${getStatusColor(status)}`}>
      {getStatusText(status)}
    </span>
  );
};

// Header
const Header = ({ trip, status }: { trip: Trip; status: string }) => {
  return (
    <div className={styles.header}>
      <div className={styles.titleSection}>
        <h3 className={styles.title}>{trip.name}</h3>
        <Status status={status} />
      </div>

      <FlagImage trip={trip} />
    </div>
  );
};

// TripCard
export default function TripCard({ trip }: TripCardProps) {
  // Status
  const status = useMemo(() => getTripStatus(trip), [trip]);

  // Duration
  const duration = useMemo(
    () => calculateTripDuration(trip.startDate, trip.endDate),
    [trip.startDate, trip.endDate]
  );

  // Formatted Dates
  const formattedDates = useMemo(
    () => formatTripDates(trip.startDate, trip.endDate),
    [trip.startDate, trip.endDate]
  );

  return (
    <Card
      padding="lg"
      shadow="xl"
      background="dark"
      maxWidth="none"
      border={false}
      className={styles.card}
    >
      <Header trip={trip} status={status} />

      <Description trip={trip} />

      <Details
        trip={trip}
        formattedDates={formattedDates}
        duration={duration}
      />

      <Footer trip={trip} />
    </Card>
  );
}

const styles = {
  card: 'hover:shadow-lg transition-shadow duration-200',
  header: 'flex items-center justify-between mb-4 gap-4',
  titleSection: 'flex items-center gap-3',
  title: 'text-xl font-semibold text-parchment-white',
  status: 'px-3 py-1 text-xs font-medium text-white rounded-full',
  description:
    'text-mist-gray mb-4 line-clamp-2 text-sm text-ellipsis overflow-hidden whitespace-nowrap',
  details: 'space-y-2 mb-4',
  detailItem: 'flex items-center gap-2',
  detailImage: 'w-6 h-auto rounded-xs',
  detailIcon: 'w-4 h-4 text-royal-purple',
  detailText: 'text-sm text-mist-gray',
  footer: 'pt-4 border-t border-slate-700 flex justify-center',
};
