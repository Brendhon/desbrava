'use client';

import Button from '@/components/ui/Button';
import { MapPin, Plus } from 'lucide-react';
import Link from 'next/link';

export default function EmptyState() {
  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyIcon}>
        <MapPin className={styles.emptyIconImage} aria-hidden="true" />
      </div>
      <h2 className={styles.emptyTitle}>Nenhuma viagem ainda</h2>
      <p className={styles.emptyDescription}>
        Comece criando sua primeira viagem para explorar o mundo!
      </p>
      <Link href="/trip" aria-label="Criar primeira viagem">
        <Button variant="primary" icon={Plus} className="mx-auto">
          Criar Primeira Viagem
        </Button>
      </Link>
    </div>
  );
}

const styles = {
  emptyState: 'text-center py-16',
  emptyIcon:
    'w-20 h-20 bg-slate-dark rounded-full flex items-center justify-center mx-auto mb-6',
  emptyIconImage: 'w-10 h-10 text-mist-gray',
  emptyTitle: 'text-2xl font-bold text-parchment-white mb-3',
  emptyDescription: 'text-mist-gray mb-8 max-w-md mx-auto',
};
