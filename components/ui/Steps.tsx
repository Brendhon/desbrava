'use client';

import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { Fragment, useCallback } from 'react';

export interface Step {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'current' | 'completed';
}

interface StepsProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  className?: string;
}

export default function Steps({
  steps,
  currentStep,
  onStepClick,
  className = '',
}: StepsProps) {

  // Handle step click
  const handleStepClick = useCallback((stepIndex: number) => {
    if (onStepClick && stepIndex <= currentStep) onStepClick(stepIndex);
  }, [onStepClick, currentStep]);

  // Button classes
  const buttonClasses = (isCompleted: boolean, isCurrent: boolean, isClickable: boolean) => {
    return cn(
      styles.stepButton,
      isCompleted ? styles.stepButtonCompleted : '',
      isCurrent ? styles.stepButtonCurrent : '',
      !isCompleted && !isCurrent ? styles.stepButtonPending : '',
      isClickable ? styles.stepButtonClickable : styles.stepButtonDisabled,
    );
  };

  // Step wrapper classes
  const stepWrapperClasses = (isCurrent: boolean) => {
    return cn(
      styles.stepWrapper,
      isCurrent ? styles.stepWrapperCurrent : styles.stepWrapperNotCurrent,
    );
  };

  // Step info classes
  const stepInfoClasses = (isCompleted: boolean, isCurrent: boolean) => {
    return cn(
      styles.stepTitle,
      isCompleted ? styles.stepTitleCompleted : '',
      isCurrent ? styles.stepTitleCurrent : '',
      !isCompleted && !isCurrent ? styles.stepTitlePending : '',
    );
  };

  // Step description classes
  const stepDescriptionClasses = (isCompleted: boolean, isCurrent: boolean) => {
    return cn(
      styles.stepDescription,
      isCompleted ? styles.stepDescriptionCompleted : '',
      isCurrent ? styles.stepDescriptionCurrent : '',
      !isCompleted && !isCurrent ? styles.stepDescriptionPending : '',
    );
  };

  // Connector classes
  const connectorClasses = (isCompleted: boolean) => {
    return cn(
      styles.connector,
      isCompleted ? styles.connectorCompleted : styles.connectorPending,
    );
  };

  // Render
  return (
    <div className={cn(styles.container, className)}>
      {steps.map((step, index) => {
        const isCurrent = index === currentStep;
        const isCompleted = index < currentStep;
        const isClickable = !!(onStepClick && index <= currentStep);

        return (
          <Fragment key={step.id}>
            <div className={stepWrapperClasses(isCurrent)}>
              {/* Step Circle */}
              <button
                onClick={() => handleStepClick(index)}
                disabled={!isClickable}
                className={buttonClasses(isCompleted, isCurrent, isClickable)}
              >
                {
                  isCompleted
                    ? <Check className={styles.checkIcon} />
                    : <span className={styles.stepNumber}>{index + 1}</span>
                }

              </button>

              {/* Step Info */}
              <div className={styles.stepInfo}>
                <h3 className={stepInfoClasses(isCompleted, isCurrent)}>
                  {step.title}
                </h3>
                {step.description && (
                  <p
                    title={step.description}
                    className={stepDescriptionClasses(isCompleted, isCurrent)}>
                    {step.description}
                  </p>
                )}
              </div>

            </div>
            {index < steps.length - 1 && <div className={connectorClasses(isCompleted)} />}
          </Fragment>
        );
      })}
    </div>
  );
}

const styles = {
  container: 'flex items-center justify-between w-full overflow-x-auto',
  stepWrapper: 'flex items-center flex-col flex-1 justify-center gap-2',
  stepButton: 'flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ease-in-out',
  stepButtonCompleted: 'bg-royal-purple border-royal-purple text-white shadow-lg',
  stepButtonCurrent: 'bg-royal-purple/20 border-royal-purple text-royal-purple shadow-md',
  stepButtonPending: 'bg-mist-gray/20 border-mist-gray text-mist-gray',
  stepButtonClickable: 'cursor-pointer hover:scale-110 hover:shadow-lg active:scale-95',
  stepButtonDisabled: 'cursor-default',
  checkIcon: 'w-4 h-4 sm:w-5 sm:h-5',
  stepNumber: 'text-sm font-semibold',
  stepInfo: 'text-center',
  stepTitle: 'text-sm font-medium transition-colors duration-300 leading-tight',
  stepTitleCompleted: 'text-royal-purple',
  stepTitleCurrent: 'text-parchment-white',
  stepTitlePending: 'text-mist-gray',
  stepDescription: 'text-xs mt-1 transition-colors duration-300 leading-tight line-clamp-1',
  stepDescriptionCompleted: 'text-royal-purple/80',
  stepDescriptionCurrent: 'text-parchment-white',
  stepDescriptionPending: 'text-mist-gray/80',
  stepWrapperCurrent: 'flex',
  stepWrapperNotCurrent: 'md:flex hidden',
  connector: 'h-0.5 transition-colors duration-300 flex-1 hidden md:block mx-auto',
  connectorCompleted: 'bg-royal-purple',
  connectorPending: 'bg-mist-gray/30',
};

