'use client';

import { Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  showText?: boolean;
  className?: string;
}

export default function LoadingSpinner({
  size = 'lg',
  showText = true,
  className = '',
}: LoadingSpinnerProps) {
  const [textIndex, setTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const loadingTexts = [
    'Preparando sua aventura...',
    'Carregando experiências incríveis...',
    'Quase lá, só um instante...',
    'Montando o cenário perfeito...',
    'Conectando com o universo...',
  ];

  const sizeClasses = {
    sm: 24,
    md: 36,
    lg: 48,
    xl: 64,
    '2xl': 80,
    '3xl': 96,
    '4xl': 112,
    '5xl': 128,
  };

  const variantClasses = {
    default: 'border-royal-purple border-t-transparent',
    primary: 'border-blue-500 border-t-transparent',
    secondary: 'border-emerald-500 border-t-transparent',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
  };

  useEffect(() => {
    setIsVisible(true);

    const textInterval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 2000);

    return () => clearInterval(textInterval);
  }, [loadingTexts.length]);

  return (
    <div className={`${styles.container} ${className}`}>
      {/* Main spinner container */}
      <Loader2 size={sizeClasses[size]} className={`${styles.spinner} ${isVisible ? styles.visible : styles.hidden}`} />

      {/* Loading text */}
      {showText && (
        <div className={styles.textContainer}>
          <p
            className={`${textSizeClasses[size]} ${styles.loadingText} ${isVisible ? styles.textVisible : styles.textHidden
              }`}
          >
            {loadingTexts[textIndex]}
          </p>

          {/* Progress dots */}
          <div className={styles.progressDots}>
            {loadingTexts.map((_, index) => (
              <div
                key={index}
                className={`${styles.progressDot} ${index === textIndex
                    ? styles.progressDotActive
                    : styles.progressDotInactive
                  }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: 'flex flex-col items-center justify-center min-h-screen px-4',
  spinner: 'text-royal-purple animate-spin',
  visible: 'opacity-100 scale-100',
  hidden: 'opacity-0 scale-95',
  textContainer: 'mt-4 sm:mt-6 text-center',
  loadingText: 'text-parchment-white font-medium transition-all duration-500 text-center',
  textVisible: 'opacity-100 translate-y-0',
  textHidden: 'opacity-0 translate-y-2',
  progressDots: 'flex justify-center mt-2 sm:mt-3 space-x-1',
  progressDot: 'w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300',
  progressDotActive: 'bg-royal-purple scale-125',
  progressDotInactive: 'bg-royal-purple/30 scale-100',
};
