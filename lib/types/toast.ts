export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description: string;
  duration?: number;
  createdAt: Date;
}

export interface ToastOptions {
  type: ToastType;
  title: string;
  description: string;
  duration?: number;
}
