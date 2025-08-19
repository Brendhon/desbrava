import { ReactNode } from "react";

export interface SelectOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
  data?: Record<string, any>; // Optional field for additional data
}
