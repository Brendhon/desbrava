'use client';

import { useState, useEffect } from 'react';

interface ServiceWorkerState {
  isSupported: boolean;
  isRegistered: boolean;
  isUpdateAvailable: boolean;
  registration: ServiceWorkerRegistration | null;
}

export function useServiceWorker() {
  const [state, setState] = useState<ServiceWorkerState>({
    isSupported: false,
    isRegistered: false,
    isUpdateAvailable: false,
    registration: null,
  });

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      setState((prev) => ({ ...prev, isSupported: true }));
      registerServiceWorker();
    }
  }, []);

  const registerServiceWorker = async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none',
      });

      setState((prev) => ({
        ...prev,
        isRegistered: true,
        registration,
      }));

      // Check for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (
              newWorker.state === 'installed' &&
              navigator.serviceWorker.controller
            ) {
              setState((prev) => ({ ...prev, isUpdateAvailable: true }));
            }
          });
        }
      });

      // Handle controller change (new service worker activated)
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        setState((prev) => ({ ...prev, isUpdateAvailable: false }));
        window.location.reload();
      });
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  };

  const updateServiceWorker = async () => {
    if (state.registration && state.isUpdateAvailable) {
      try {
        await state.registration.update();
      } catch (error) {
        console.error('Service Worker update failed:', error);
      }
    }
  };

  const unregisterServiceWorker = async () => {
    if (state.registration) {
      try {
        await state.registration.unregister();
        setState((prev) => ({
          ...prev,
          isRegistered: false,
          registration: null,
        }));
      } catch (error) {
        console.error('Service Worker unregistration failed:', error);
      }
    }
  };

  return {
    ...state,
    updateServiceWorker,
    unregisterServiceWorker,
  };
}
