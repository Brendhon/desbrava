'use client';

import { cn } from '@/lib/utils';
import { Step } from '@/lib/types';

interface StepConnectorProps {
  isCompleted: boolean;
  index: number;
  steps: Step[];
}

const StepConnector = ({ isCompleted, index, steps }: StepConnectorProps) => {
  // Connector classes
  const connectorClasses = (isCompleted: boolean) => {
    return cn(
      styles.connector,
      isCompleted ? styles.connectorCompleted : styles.connectorPending,
    );
  };

  return index < steps.length - 1 && <div className={connectorClasses(isCompleted)} />;
};

const styles = {
  connector: 'h-0.5 transition-colors duration-300 flex-1 hidden md:block mx-auto',
  connectorCompleted: 'bg-royal-purple',
  connectorPending: 'bg-mist-gray/30',
};

export default StepConnector;
