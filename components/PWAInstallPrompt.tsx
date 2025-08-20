'use client';

import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already installed
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);
    
    // Check if iOS device
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream);

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
        setShowInstallPrompt(false);
        setDeferredPrompt(null);
      } else {
        console.log('User dismissed the install prompt');
      }
    }
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
  };

  // Don't show if already installed or if no prompt available
  if (isStandalone || !showInstallPrompt) {
    return null;
  }

  const styles = {
    container: 'fixed bottom-4 left-4 right-4 bg-ardosia-escuro border border-roxo-real rounded-lg p-4 shadow-lg z-50 max-w-sm mx-auto',
    header: 'flex items-center justify-between mb-3',
    title: 'text-branco-pergaminho font-semibold text-sm',
    closeButton: 'text-cinza-nevoa hover:text-branco-pergaminho transition-colors',
    description: 'text-cinza-nevoa text-xs mb-4',
    installButton: 'w-full bg-roxo-real hover:bg-roxo-real/90 text-branco-pergaminho py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2',
    iosInstructions: 'text-cinza-nevoa text-xs mt-3 p-3 bg-azul-meia-noite rounded border border-cinza-nevoa/20'
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Instalar App</h3>
        <button onClick={handleDismiss} className={styles.closeButton}>
          <X size={16} />
        </button>
      </div>
      
      <p className={styles.description}>
        Instale o Desbrava no seu dispositivo para uma experiência mais rápida e offline.
      </p>

      {!isIOS ? (
        <button onClick={handleInstallClick} className={styles.installButton}>
          <Download size={16} />
          Instalar Desbrava
        </button>
      ) : (
        <div className={styles.iosInstructions}>
          <p className="font-medium mb-2">Para instalar no iOS:</p>
          <ol className="list-decimal list-inside space-y-1 text-xs">
            <li>Toque no botão compartilhar ⎋</li>
            <li>Selecione "Adicionar à Tela Inicial" ➕</li>
            <li>Toque em "Adicionar"</li>
          </ol>
        </div>
      )}
    </div>
  );
}
