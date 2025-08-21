'use client';

import { Toast } from '@/components/ui';
import { useToastContext } from '@/context/ToastContext';

const ToastContainer = () => {
  const { state } = useToastContext();

  if (state.toasts.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      {state.toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  );
};

export default ToastContainer;

const styles = {
  container: `
    fixed top-4 right-4 z-50
    flex flex-col gap-3
    max-h-screen overflow-hidden
    pointer-events-none
  `,
};
