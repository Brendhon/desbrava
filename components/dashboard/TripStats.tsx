'use client';

import { Card } from '@/components/ui';
import { Trip } from '@/lib/types/trip';
import { parsePtBrToDate } from '@/lib/utils/trip';
import { Calendar, LucideIcon, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

interface TripStatsProps {
  trips: Trip[];
}

// Components
// StartLabel
const StartLabel = ({ children }: { children: React.ReactNode }) => {
  return <p className={styles.statLabel}>{children}</p>;
};

// StartTitle
const StartTitle = ({ children }: { children: React.ReactNode }) => {
  return <h3 className={styles.statNumber}>{children}</h3>;
};

// StatCard
const StatCard = ({
  Icon,
  children,
}: {
  Icon: LucideIcon;
  children: React.ReactNode;
}) => {
  return (
    <Card
      padding="md"
      shadow="lg"
      background="dark"
      maxWidth="none"
      border={false}
      className={styles.statCard}
    >
      <div className={styles.statIcon}>
        <Icon className={styles.icon} aria-hidden="true" />
      </div>
      <div className={styles.statContent}>{children}</div>
    </Card>
  );
};

// NextTrip
const NextTrip = ({ nextTrip }: { nextTrip: Trip | undefined }) => {
  return (
    <StatCard Icon={Calendar}>
      {nextTrip ? (
        <>
          <StartTitle>{nextTrip.name}</StartTitle>
          <StartLabel> Próxima Viagem • {nextTrip.startDate} </StartLabel>
        </>
      ) : (
        <>
          <StartTitle>-</StartTitle>
          <StartLabel>Nenhuma viagem agendada</StartLabel>
        </>
      )}
    </StatCard>
  );
};

// TotalTrips
const TotalTrips = ({ totalTrips }: { totalTrips: number }) => {
  return (
    <StatCard Icon={MapPin}>
      <StartTitle>{totalTrips}</StartTitle>
      <StartLabel>
        {' '}
        {totalTrips === 1 ? 'Viagem Criada' : 'Viagens Criadas'}{' '}
      </StartLabel>
    </StatCard>
  );
};

export default function TripStats({ trips }: TripStatsProps) {
  const [totalTrips, setTotalTrips] = useState<number>(0);
  const [nextTrip, setNextTrip] = useState<Trip | undefined>(undefined);

  // Calculate total trips
  useEffect(() => {
    // Calculate total trips
    const totalTrips = trips.length;

    // Set total trips
    setTotalTrips(totalTrips);

    // Find next trip (closest future trip)
    const nextTrip = trips
      .slice()
      .sort(
        (a, b) =>
          parsePtBrToDate(a.startDate)!.getTime() -
          parsePtBrToDate(b.startDate)!.getTime()
      )?.[0];

    // Set next trip
    setNextTrip(nextTrip);
  }, [trips]);

  return (
    <div className={styles.statsGrid}>
      <TotalTrips totalTrips={totalTrips} />
      <NextTrip nextTrip={nextTrip} />
    </div>
  );
}

const styles = {
  statsGrid: 'grid grid-cols-1 md:grid-cols-2 gap-6 mb-0',
  statCard: 'flex items-center gap-4',
  statIcon:
    'w-12 h-12 bg-royal-purple rounded-lg flex items-center justify-center',
  icon: 'w-6 h-6 text-parchment-white',
  statContent: 'space-y-1',
  statNumber: 'text-3xl font-bold text-parchment-white',
  statLabel: 'text-mist-gray',
};
