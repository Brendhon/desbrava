'use client';

import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface StepButtonProps {
  index: number;
  isCompleted: boolean;
  isCurrent: boolean;
  isClickable: boolean;
  handleStepClick: (stepIndex: number) => void;
}

export default function StepButton({
  index,
  isCompleted,
  isCurrent,
  isClickable,
  handleStepClick,
}: StepButtonProps) {
  const buttonClasses = (
    isCompleted: boolean,
    isCurrent: boolean,
    isClickable: boolean
  ) => {
    return cn(
      styles.stepButton,
      isCompleted ? styles.stepButtonCompleted : '',
      isCurrent ? styles.stepButtonCurrent : '',
      !isCompleted && !isCurrent ? styles.stepButtonPending : '',
      isClickable ? styles.stepButtonClickable : styles.stepButtonDisabled
    );
  };

  return (
    <button
      onClick={() => handleStepClick(index)}
      disabled={!isClickable}
      className={buttonClasses(isCompleted, isCurrent, isClickable)}
    >
      {isCompleted ? (
        <Check className={styles.checkIcon} />
      ) : (
        <span className={styles.stepNumber}>{index + 1}</span>
      )}
    </button>
  );
}

const styles = {
  stepButton:
    'flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ease-in-out',
  stepButtonCompleted:
    'bg-royal-purple border-royal-purple text-white shadow-lg',
  stepButtonCurrent:
    'bg-royal-purple/20 border-royal-purple text-royal-purple shadow-md',
  stepButtonPending: 'bg-mist-gray/20 border-mist-gray text-mist-gray',
  stepButtonClickable: 'cursor-pointer hover:shadow-lg hover:opacity-60',
  stepButtonDisabled: 'cursor-default',
  checkIcon: 'w-4 h-4 sm:w-5 sm:h-5',
  stepNumber: 'text-sm font-semibold',
};

