'use client';

import { Step } from '@/lib/types';
import { cn } from '@/lib/utils';

interface StepConnectorProps {
  isCompleted: boolean;
  index: number;
  steps: Step[];
  invisible?: boolean;
}

const StepConnector = ({ isCompleted, index, steps, invisible = false }: StepConnectorProps) => {
  // Connector classes
  const connectorClasses = (isCompleted: boolean) => {
    return cn(
      styles.connector,
      isCompleted ? styles.connectorCompleted : styles.connectorPending,
      (index === steps.length - 1 || invisible) && styles.invisible
    );
  };

  return <div className={connectorClasses(isCompleted)} />;
};

const styles = {
  connector: 'h-0.5 transition-colors w-1/3 duration-300 hidden md:block',
  connectorCompleted: 'bg-royal-purple',
  invisible: 'invisible',
  connectorPending: 'bg-mist-gray/30',
};

export default StepConnector;
