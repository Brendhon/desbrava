'use client';

import { useAuth } from '@/hooks/useAuth';
import { MapPin, Calendar, Plus } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { session } = useAuth();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          Olá, {session?.user?.name || "Viajante"}! 👋
        </h1>
        <p className={styles.subtitle}>
          Bem-vindo ao seu painel de viagens
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <MapPin className={styles.icon} aria-hidden="true" />
            </div>
            <div className={styles.statContent}>
              <h3 className={styles.statNumber}>0</h3>
              <p className={styles.statLabel}>Viagens Criadas</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <Calendar className={styles.icon} aria-hidden="true" />
            </div>
            <div className={styles.statContent}>
              <h3 className={styles.statNumber}>0</h3>
              <p className={styles.statLabel}>Dias de Viagem</p>
            </div>
          </div>
        </div>

        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <MapPin className={styles.emptyIconImage} aria-hidden="true" />
          </div>
          <h2 className={styles.emptyTitle}>
            Nenhuma viagem ainda
          </h2>
          <p className={styles.emptyDescription}>
            Comece criando sua primeira viagem para explorar o mundo!
          </p>
          <Link
            href="/trip"
            className={styles.createButton}
            aria-label="Criar primeira viagem"
          >
            <Plus className={styles.createButtonIcon} aria-hidden="true" />
            Criar Primeira Viagem
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: "max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8",
  header: "mb-12",
  title: "text-3xl md:text-4xl font-bold text-parchment-white mb-3",
  subtitle: "text-lg text-mist-gray",
  content: "space-y-8",
  statsGrid: "grid grid-cols-1 md:grid-cols-2 gap-6",
  statCard: "bg-slate-dark rounded-lg p-6 flex items-center gap-4",
  statIcon: "w-12 h-12 bg-royal-purple rounded-lg flex items-center justify-center",
  icon: "w-6 h-6 text-parchment-white",
  statContent: "space-y-1",
  statNumber: "text-3xl font-bold text-parchment-white",
  statLabel: "text-mist-gray",
  emptyState: "text-center py-16",
  emptyIcon: "w-20 h-20 bg-slate-dark rounded-full flex items-center justify-center mx-auto mb-6",
  emptyIconImage: "w-10 h-10 text-mist-gray",
  emptyTitle: "text-2xl font-bold text-parchment-white mb-3",
  emptyDescription: "text-mist-gray mb-8 max-w-md mx-auto",
  createButton: "inline-flex items-center gap-2 bg-royal-purple text-parchment-white px-6 py-3 rounded-lg hover:bg-royal-purple/80 transition-colors font-medium",
  createButtonIcon: "w-5 h-5",
};
