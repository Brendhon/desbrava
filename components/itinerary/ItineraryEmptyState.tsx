'use client';

import { Map } from 'lucide-react';

export function ItineraryEmptyState() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.contentItem}>
          <div className={styles.iconContainer}>
            <Map className={styles.icon} aria-hidden="true" />
          </div>
          <h3 className={styles.title}>Nenhuma atividade planejada</h3>
          <p className={styles.description}>
            Comece adicionando atividades ao seu itinerário para organizar
            melhor sua viagem e aproveitar ao máximo cada dia.
          </p>
        </div>

        <div className={styles.tips}>
          <h4 className={styles.tipsTitle}>Dicas para começar</h4>
          <ul className={styles.tipsList}>
            <li>Adicione sua acomodação para saber onde ficar</li>
            <li>Inclua voos e transportes principais</li>
            <li>Planeje refeições em restaurantes locais</li>
            <li>Organize passeios e atrações turísticas</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: 'text-center py-8 sm:py-16 ',
  iconContainer:
    'w-16 h-16 sm:w-20 sm:h-20 bg-midnight-blue rounded-full flex items-center justify-center mx-auto',
  icon: 'w-8 h-8 sm:w-10 sm:h-10 text-mist-gray',
  content: 'flex flex-wrap items-center justify-evenly',
  contentItem: 'flex flex-col items-center gap-4',
  title: 'text-lg sm:text-xl font-semibold text-parchment-white',
  description: 'text-mist-gray max-w-md mx-auto text-sm sm:text-base',
  tips: 'mt-6 text-center',
  tipsTitle: 'text-lg font-medium text-parchment-white mb-3',
  tipsList: 'space-y-2 text-sm text-mist-gray',
};
