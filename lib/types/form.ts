import { ReactNode } from 'react';

export interface SelectOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: Record<string, any>;
}
