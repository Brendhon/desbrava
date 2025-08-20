'use client';

import { MapPin } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyIcon}>
        <MapPin className={styles.emptyIconImage} aria-hidden="true" />
      </div>
      <h2 className={styles.emptyTitle}>Nenhuma viagem encontrada</h2>
      <p className={styles.emptyDescription}>
        Não há viagens para exibir no momento. 🎒
      </p>
      <p className={styles.emptyDescription}>
        Tente ajustar os filtros ou adicione novas viagens para começar a
        explorar! 🗺️
      </p>
    </div>
  );
}

const styles = {
  emptyState: 'text-center py-8',
  emptyIcon:
    'w-20 h-20 bg-slate-dark rounded-full flex items-center justify-center mx-auto mb-6',
  emptyIconImage: 'w-10 h-10 text-mist-gray',
  emptyTitle: 'text-2xl font-bold text-parchment-white mb-3',
  emptyDescription: 'text-mist-gray mb-2 max-w-md mx-auto',
};
