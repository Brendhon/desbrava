'use client';

import { LoadingSpinner } from '@/components/ui';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function ProtectedRoute({
  children,
  fallback,
}: ProtectedRouteProps) {
  // Get auth state from hook
  const { isLoading, isAuthenticated, redirectIfNotAuthenticated } = useAuth();

  // Redirect unauthenticated users
  redirectIfNotAuthenticated();

  // Show loading while checking session
  if (isLoading) return <LoadingSpinner size="lg" />;

  // If not authenticated, show fallback or nothing (will be redirected)
  if (!isAuthenticated) return fallback || null;

  // If authenticated, show children
  return <>{children}</>;
}
