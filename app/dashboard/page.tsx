'use client';

import { useAuth } from '@/hooks/useAuth';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { LogOut, User, Calendar, MapPin } from 'lucide-react';

function DashboardContent() {
  const { session, logout } = useAuth();

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>
              {session?.user?.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || "Usuário"}
                  className={styles.avatarImage}
                />
              ) : (
                <User className={styles.avatarIcon} />
              )}
            </div>
            <div className={styles.userDetails}>
              <h1 className={styles.welcome}>
                Olá, {session?.user?.name || "Viajante"}! 👋
              </h1>
              <p className={styles.subtitle}>
                Bem-vindo ao seu painel de viagens
              </p>
            </div>
          </div>
          
          <button onClick={logout} className={styles.logoutButton}>
            <LogOut className={styles.logoutIcon} />
            Sair
          </button>
        </header>

        <div className={styles.content}>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <MapPin className={styles.icon} />
              </div>
              <div className={styles.statContent}>
                <h3 className={styles.statNumber}>0</h3>
                <p className={styles.statLabel}>Viagens Criadas</p>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <Calendar className={styles.icon} />
              </div>
              <div className={styles.statContent}>
                <h3 className={styles.statNumber}>0</h3>
                <p className={styles.statLabel}>Dias de Viagem</p>
              </div>
            </div>
          </div>

          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <MapPin className={styles.icon} />
            </div>
            <h2 className={styles.emptyTitle}>Nenhuma viagem ainda</h2>
            <p className={styles.emptyDescription}>
              Comece criando sua primeira viagem para explorar o mundo!
            </p>
            <button className={styles.createButton}>
              Criar Primeira Viagem
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

const styles = {
  main: "bg-midnight-blue min-h-screen",
  container: "max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8",
  header: "flex items-center justify-between mb-12",
  userInfo: "flex items-center gap-4",
  avatar: "w-16 h-16 rounded-full bg-royal-purple flex items-center justify-center",
  avatarImage: "w-16 h-16 rounded-full object-cover",
  avatarIcon: "w-8 h-8 text-parchment-white",
  userDetails: "space-y-1",
  welcome: "text-2xl md:text-3xl font-bold text-parchment-white",
  subtitle: "text-lg text-mist-gray",
  logoutButton: "flex items-center gap-2 bg-slate-dark text-parchment-white px-4 py-2 rounded-lg hover:bg-slate-dark/60 transition-colors cursor-pointer",
  logoutIcon: "w-4 h-4",
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
  emptyTitle: "text-2xl font-bold text-parchment-white mb-3",
  emptyDescription: "text-mist-gray mb-8 max-w-md mx-auto",
  createButton: "bg-royal-purple text-parchment-white px-6 py-3 rounded-lg hover:bg-royal-purple/80 transition-colors font-medium",
}
