import { useToastContext } from '@/context/ToastContext';
import { ToastOptions } from '@/types/toast';

export const useToast = () => {
  const { addToast, removeToast, clearToasts } = useToastContext();

  const success = (title: string, description: string, duration?: number) => {
    addToast({ type: 'success', title, description, duration });
  };

  const error = (title: string, description: string, duration?: number) => {
    addToast({ type: 'error', title, description, duration });
  };

  const warning = (title: string, description: string, duration?: number) => {
    addToast({ type: 'warning', title, description, duration });
  };

  const info = (title: string, description: string, duration?: number) => {
    addToast({ type: 'info', title, description, duration });
  };

  return {
    success,
    error,
    warning,
    info,
    removeToast,
    clearToasts,
  };
};
