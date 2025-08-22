'use client';

import { Card } from '@/components/ui';
import { StepsProps } from '@/lib/types';
import { useCallback } from 'react';
import StepContent from './StepContent';
import StepItem from './StepItem';
import StepConnector from './StepConnector';

export default function Steps({
  steps,
  currentStep,
  onStepClick,
  className = '',
}: StepsProps) {
  // Handle step click
  const handleStepClick = useCallback(
    (stepIndex: number) => {
      if (onStepClick && stepIndex <= currentStep) onStepClick(stepIndex);
    },
    [onStepClick, currentStep]
  );

  // Render
  return (
    <div className={styles.container}>
      <Card border={false} className={styles.steps}>
        {/* Step Connector - Invisible */}
        <StepConnector
          isCompleted={false}
          index={-1}
          steps={steps}
          invisible={true}
        />

        {/* Steps */}
        {steps.map((_, index) => (
          <StepItem
            key={index}
            index={index}
            isCurrent={index === currentStep}
            isCompleted={index < currentStep}
            isClickable={!!(onStepClick && index <= currentStep)}
            handleStepClick={handleStepClick}
            steps={steps}
            className={className}
          />
        ))}
      </Card>

      {/* Step Content - Current Step */}
      <StepContent>{steps[currentStep].children}</StepContent>
    </div>
  );
}

const styles = {
  container: 'flex flex-col gap-6',
  steps: 'flex',
};
