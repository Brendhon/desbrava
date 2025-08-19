'use client';

import HeroSection from '@/components/ui/HeroSection';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useAuth } from '@/hooks/useAuth';

export default function Home() {
  const { isAuthenticated, isLoading, login, redirectIfAuthenticated } = useAuth();

  // Redirects authenticated users to the dashboard
  redirectIfAuthenticated();

  // Login with Google
  const handleGoogleLogin = async () => await login('google');

  // Shows loading while checking the session
  if (isLoading) return <LoadingSpinner size="lg" variant="default" />;

  // If already authenticated, show nothing (will be redirected)
  if (isAuthenticated) return null;

  return (
    <main className={styles.main}>
      <HeroSection onGoogleLogin={handleGoogleLogin} isLoading={false} />
    </main>
  );
}

const styles = {
  main: "bg-midnight-blue min-h-screen",
}
