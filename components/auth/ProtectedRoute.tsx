'use client';

import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { isLoading, isAuthenticated, redirectIfNotAuthenticated } = useAuth();

  // Redirect unauthenticated users
  redirectIfNotAuthenticated();

  // Show loading while checking session
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p className={styles.loadingText}>Checking authentication...</p>
      </div>
    );
  }

  // If not authenticated, show fallback or nothing (will be redirected)
  if (!isAuthenticated) {
    return fallback || null;
  }

  return <>{children}</>;
}

const styles = {
  loadingContainer: "flex flex-col items-center justify-center min-h-screen",
  loadingSpinner: "w-8 h-8 border-4 border-royal-purple border-t-transparent rounded-full animate-spin mb-4",
  loadingText: "text-parchment-white text-lg",
}
