'use client';

import { HeroSection } from '@/components/marketing';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAuthenticated, isLoading, login, redirectIfAuthenticated } =
    useAuth();

  // Redirects authenticated users to the dashboard
  redirectIfAuthenticated();

  // Login with Google
  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    await login('google');
    setIsSubmitting(false);
  };

  // Shows loading while checking the session
  if (isLoading) return <LoadingSpinner size="lg" />;

  // If already authenticated, show nothing (will be redirected)
  if (isAuthenticated) return null;

  return (
    <main className={styles.main}>
      <HeroSection onGoogleLogin={handleGoogleLogin} isLoading={isSubmitting} />
    </main>
  );
}

const styles = {
  main: 'bg-midnight-blue min-h-screen',
};
