'use client';

import { useAuth } from '@/hooks/useAuth';
import HeroSection from '@/components/ui/HeroSection';

export default function Home() {
  const { isAuthenticated, isLoading, login, redirectIfAuthenticated } = useAuth();

  // Redireciona usuários autenticados para o dashboard
  redirectIfAuthenticated();

  const handleGoogleLogin = async () => {
    await login('google');
  };

  // Mostra loading enquanto verifica a sessão
  if (isLoading) {
    return (
      <main className={styles.main}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p className={styles.loadingText}>Carregando...</p>
        </div>
      </main>
    );
  }

  // Se já estiver autenticado, não mostra nada (será redirecionado)
  if (isAuthenticated) {
    return null;
  }

  return (
    <main className={styles.main}>
      <HeroSection onGoogleLogin={handleGoogleLogin} isLoading={false} />
    </main>
  );
}

const styles = {
  main: "bg-midnight-blue min-h-screen",
  loadingContainer: "flex flex-col items-center justify-center min-h-screen",
  loadingSpinner: "w-8 h-8 border-4 border-royal-purple border-t-transparent rounded-full animate-spin mb-4",
  loadingText: "text-parchment-white text-lg",
}
