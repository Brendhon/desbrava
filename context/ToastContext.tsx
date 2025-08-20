'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Toast, ToastOptions } from '@/types/toast';

interface ToastState {
  toasts: Toast[];
}

type ToastAction =
  | { type: 'ADD_TOAST'; payload: Toast }
  | { type: 'REMOVE_TOAST'; payload: string }
  | { type: 'CLEAR_TOASTS' };

const ToastContext = createContext<{
  state: ToastState;
  addToast: (options: ToastOptions) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
} | null>(null);

const toastReducer = (state: ToastState, action: ToastAction): ToastState => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [...state.toasts, action.payload],
      };
    case 'REMOVE_TOAST':
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.payload),
      };
    case 'CLEAR_TOASTS':
      return {
        ...state,
        toasts: [],
      };
    default:
      return state;
  }
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(toastReducer, { toasts: [] });

  const addToast = (options: ToastOptions) => {
    const id = Math.random().toString(36).substr(2, 9);
    const toast: Toast = {
      id,
      type: options.type,
      title: options.title,
      description: options.description,
      duration: options.duration || 5000,
      createdAt: new Date(),
    };

    dispatch({ type: 'ADD_TOAST', payload: toast });

    // Auto-remove toast after duration
    if (toast.duration) {
      setTimeout(() => {
        dispatch({ type: 'REMOVE_TOAST', payload: id });
      }, toast.duration);
    }
  };

  const removeToast = (id: string) => {
    dispatch({ type: 'REMOVE_TOAST', payload: id });
  };

  const clearToasts = () => {
    dispatch({ type: 'CLEAR_TOASTS' });
  };

  return (
    <ToastContext.Provider
      value={{
        state,
        addToast,
        removeToast,
        clearToasts,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
};
