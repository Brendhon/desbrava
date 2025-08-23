import { ReactNode } from 'react';

export interface SelectOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
  item?: ReactNode;
}
