'use client';

import Card from '@/components/ui/Card';
import { Trip } from '@/lib/types/trip';
import { parsePtBrToDate } from '@/lib/utils/trip';
import { Calendar, MapPin } from 'lucide-react';

interface TripStatsProps {
  trips: Trip[];
}

export default function TripStats({ trips }: TripStatsProps) {
  // Calculate total trips
  const totalTrips = trips.length;
  
  // Find next trip (closest future trip)
  const now = new Date();
  const futureTrips = trips.filter(trip => parsePtBrToDate(trip.startDate) > now);
  const nextTrip = futureTrips.length > 0 
    ? futureTrips.sort((a, b) => parsePtBrToDate(a.startDate).getTime() - parsePtBrToDate(b.startDate).getTime())[0]
    : null;

  return (
    <div className={styles.statsGrid}>
      <Card
        padding="md"
        shadow="lg"
        background="dark"
        maxWidth="none"
        border={false}
        className={styles.statCard}
      >
        <div className={styles.statIcon}>
          <MapPin className={styles.icon} aria-hidden="true" />
        </div>
        <div className={styles.statContent}>
          <h3 className={styles.statNumber}>{totalTrips}</h3>
          <p className={styles.statLabel}>
            {totalTrips === 1 ? 'Viagem Criada' : 'Viagens Criadas'}
          </p>
        </div>
      </Card>

      <Card
        padding="md"
        shadow="lg"
        background="dark"
        maxWidth="none"
        border={false}
        className={styles.statCard}
      >
        <div className={styles.statIcon}>
          <Calendar className={styles.icon} aria-hidden="true" />
        </div>
        <div className={styles.statContent}>
          {nextTrip ? (
            <>
              <h3 className={styles.statNumber}>{nextTrip.name}</h3>
              <p className={styles.statLabel}>
                Próxima Viagem • {nextTrip.startDate}
              </p>
            </>
          ) : (
            <>
              <h3 className={styles.statNumber}>-</h3>
              <p className={styles.statLabel}>Nenhuma viagem agendada</p>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}

const styles = {
  statsGrid: 'grid grid-cols-1 md:grid-cols-2 gap-6',
  statCard: 'flex items-center gap-4',
  statIcon:
    'w-12 h-12 bg-royal-purple rounded-lg flex items-center justify-center',
  icon: 'w-6 h-6 text-parchment-white',
  statContent: 'space-y-1',
  statNumber: 'text-3xl font-bold text-parchment-white',
  statLabel: 'text-mist-gray',
};
