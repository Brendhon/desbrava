'use client';

import { useToastContext } from '@/context/ToastContext';
import { Toast as ToastType } from '@/lib/types';
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

interface ToastProps {
  toast: ToastType;
}

const Toast = ({ toast }: ToastProps) => {
  const { removeToast } = useToastContext();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleRemove = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => removeToast(toast.id), 300);
  }, [toast.id, removeToast]);

  const getIcon = useCallback(() => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className={styles.icon} />;
      case 'error':
        return <AlertCircle className={styles.icon} />;
      case 'warning':
        return <AlertTriangle className={styles.icon} />;
      case 'info':
        return <Info className={styles.icon} />;
      default:
        return <Info className={styles.icon} />;
    }
  }, [toast.type]);

  const getToastStyles = useCallback(() => {
    const baseStyles = styles.toast;
    switch (toast.type) {
      case 'success':
        return `${baseStyles} ${styles.success}`;
      case 'error':
        return `${baseStyles} ${styles.error}`;
      case 'warning':
        return `${baseStyles} ${styles.warning}`;
      case 'info':
        return `${baseStyles} ${styles.info}`;
      default:
        return baseStyles;
    }
  }, [toast.type]);

  return (
    <div
      className={`${getToastStyles()} ${
        isVisible ? styles.visible : styles.hidden
      }`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className={styles.content}>
        <div className={styles.iconContainer}>{getIcon()}</div>
        <div className={styles.textContainer}>
          <h4 className={styles.title}>{toast.title}</h4>
          <p className={styles.description}>{toast.description}</p>
        </div>
      </div>
      <button
        onClick={handleRemove}
        className={styles.closeButton}
        aria-label="Fechar notificação"
      >
        <X className={styles.closeIcon} />
      </button>
    </div>
  );
};

export default Toast;

const styles = {
  toast: `
    relative
    w-full max-w-sm
    bg-gray-900
    border border-gray-700
    rounded-lg shadow-lg
    p-4
    transform transition-all duration-300 ease-in-out
    flex items-start justify-between
    gap-3
  `,
  visible: 'translate-x-0 opacity-100',
  hidden: 'translate-x-full opacity-0',
  success: 'border-green-700 bg-green-900/80',
  error: 'border-red-700 bg-red-900/80',
  warning: 'border-yellow-700 bg-yellow-900/80',
  info: 'border-blue-700 bg-blue-900/80',
  content: 'flex items-start gap-3 flex-1',
  iconContainer: 'flex-shrink-0',
  icon: 'w-5 h-5',
  textContainer: 'flex-1 min-w-0',
  title: 'text-sm font-medium text-gray-100 mb-1',
  description: 'text-sm text-gray-400',
  closeButton: `
    flex-shrink-0
    p-1
    text-parchment-white/80
    hover:bg-royal-purple
    rounded-md
    transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
  `,
  closeIcon: 'w-5 h-5',
};
