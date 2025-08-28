'use client';

import { Map } from 'lucide-react';

export function ItineraryEmptyState() {
  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        <Map className={styles.icon} aria-hidden="true" />
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>Nenhuma atividade planejada</h3>
        <p className={styles.description}>
          Comece adicionando atividades ao seu itinerário para organizar
          melhor sua viagem e aproveitar ao máximo cada dia.
        </p>
        
        <div className={styles.tips}>
          <h4 className={styles.tipsTitle}>Dicas para começar:</h4>
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
  container: 'text-center py-16',
  iconContainer: 'w-20 h-20 bg-midnight-blue rounded-full flex items-center justify-center mx-auto mb-6',
  icon: 'w-10 h-10 text-mist-gray',
  content: 'space-y-4',
  title: 'text-xl font-semibold text-parchment-white',
  description: 'text-mist-gray max-w-md mx-auto',
  tips: 'mt-8 text-left max-w-lg mx-auto',
  tipsTitle: 'text-sm font-medium text-parchment-white mb-3',
  tipsList: 'space-y-2 text-sm text-mist-gray',
};
