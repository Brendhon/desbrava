'use client';

import { Button } from '@/components/ui';
import { ActivityRoutes } from '@/lib/types';
import { Plus } from 'lucide-react';
import Link from 'next/link';

interface ItineraryHeaderProps {
  tripId: string;
}

export function ItineraryHeader({ tripId }: ItineraryHeaderProps) {
  return (
    <div className={styles.header}>
      <div className={styles.titleSection}>
        <h3 className={styles.title}>Seu Itinerário</h3>
        <p className={styles.subtitle}>
          Organize e visualize todas as suas atividades planejadas
        </p>
      </div>
      
      <Link href={ActivityRoutes.create(tripId)}>
        <Button
          variant="primary"
          icon={Plus}
          aria-label="Adicionar nova atividade"
          size="sm"
        >
          Adicionar Atividade
        </Button>
      </Link>
    </div>
  );
}

const styles = {
  header: 'flex items-start justify-between',
  titleSection: 'space-y-1',
  title: 'text-xl font-semibold text-parchment-white',
  subtitle: 'text-sm text-mist-gray',
};
