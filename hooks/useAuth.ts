'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const login = async (provider: string = 'google') => {
    try {
      await signIn(provider, { callbackUrl: '/dashboard' });
    } catch (error) {
      console.error('Erro no login:', error);
    }
  };

  const logout = async () => {
    try {
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  };

  const redirectIfAuthenticated = (path: string = '/dashboard') => {
    useEffect(() => {
      if (status === 'authenticated' && session) {
        router.push(path);
      }
    }, [session, status, router, path]);
  };

  const redirectIfNotAuthenticated = (path: string = '/') => {
    useEffect(() => {
      if (status === 'unauthenticated') {
        router.push(path);
      }
    }, [status, router, path]);
  };

  return {
    session,
    status,
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
    login,
    logout,
    redirectIfAuthenticated,
    redirectIfNotAuthenticated,
  };
}
