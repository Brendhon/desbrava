'use client';

import { useState, useEffect } from 'react';
import { Download, X, Smartphone, Star } from 'lucide-react';
import Button from './ui/Button';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

// Extend Window interface to include MSStream property
interface ExtendedWindow extends Window {
  MSStream?: unknown;
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
    const extendedWindow = window as ExtendedWindow;
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent) && !extendedWindow.MSStream);

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

  return (
    <div className={styles.container}>
      {/* Decorative background with gradient */}
      <div className={styles.backgroundGradient} />

      {/* Header with icon and close button */}
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <div className={styles.iconContainer}>
            <Smartphone className={styles.icon} />
          </div>
          <div>
            <h3 className={styles.title}>Instalar App</h3>
            <p className={styles.subtitle}>Desbrava PWA</p>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className={styles.closeButton}
          aria-label="Fechar prompt de instalação"
        >
          <X size={18} />
        </button>
      </div>

      {/* Description with benefits */}
      <div className={styles.descriptionSection}>
        <p className={styles.description}>
          Instale o Desbrava no seu dispositivo para uma experiência mais rápida e offline.
        </p>
        <div className={styles.benefits}>
          <div className={styles.benefitItem}>
            <Star className={styles.benefitIcon} />
            <span>Acesso offline</span>
          </div>
          <div className={styles.benefitItem}>
            <Star className={styles.benefitIcon} />
            <span>Carregamento rápido</span>
          </div>
        </div>
      </div>

      {/* Install button or iOS instructions */}
      {!isIOS ? (
        <div className={styles.installButtonContainer}>
          <Button
            size='sm'
            onClick={handleInstallClick}
            aria-label="Instalar aplicativo Desbrava"
            variant="primary"
            icon={Download}
          >
            Instalar Desbrava
          </Button>
        </div>
      ) : (
        <div className={styles.iosInstructions}>
          <h4 className={styles.iosTitle}>Para instalar no iOS:</h4>
          <ol className={styles.iosSteps}>
            <li>Toque no botão compartilhar ⎋</li>
            <li>Selecione &quot;Adicionar à Tela Inicial&quot; ➕</li>
            <li>Toque em &quot;Adicionar&quot;</li>
          </ol>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: 'fixed top-4 right-4 w-80 bg-slate-dark border border-royal-purple/30 rounded-xl shadow-2xl z-50 overflow-hidden transition-all duration-300 ease-out hover:shadow-royal-purple/20',
  backgroundGradient: 'absolute inset-0 bg-gradient-to-br from-royal-purple/5 to-midnight-blue/10',
  header: 'flex items-start justify-between p-4 pb-3',
  titleSection: 'flex items-center gap-3',
  iconContainer: 'w-10 h-10 bg-royal-purple/20 rounded-lg flex items-center justify-center',
  icon: 'w-5 h-5 text-royal-purple',
  title: 'text-parchment-white font-semibold text-sm',
  subtitle: 'text-mist-gray text-xs',
  closeButton: 'text-mist-gray hover:text-parchment-white transition-colors duration-200 p-1 rounded-md hover:bg-slate-dark/50',
  descriptionSection: 'px-4 pb-3',
  description: 'text-mist-gray text-xs leading-relaxed mb-3',
  benefits: 'space-y-2',
  benefitItem: 'flex items-center gap-2 text-xs text-mist-gray',
  benefitIcon: 'w-3 h-3 text-royal-purple flex-shrink-0',
  installButtonContainer: 'flex justify-center my-4',
  iosInstructions: 'mx-4 mb-4 p-3 bg-midnight-blue/50 rounded-lg border border-royal-purple/20',
  iosTitle: 'text-parchment-white text-xs font-medium mb-2',
  iosSteps: 'list-decimal list-inside space-y-1 text-xs text-mist-gray leading-relaxed',
};
