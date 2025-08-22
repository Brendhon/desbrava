import { ReactNode } from 'react';

export interface Step {
  title: string;
  description?: string;
  status: 'pending' | 'current' | 'completed';
  children: ReactNode;
}

export interface StepsProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  className?: string;
}
