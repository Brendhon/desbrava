'use client';

import { cn } from '@/lib/utils';

interface StepInfoProps {
  title: string;
  description?: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

const StepInfo = ({
  title,
  description,
  isCompleted,
  isCurrent,
}: StepInfoProps) => {
  // Step info classes
  const stepInfoClasses = (isCompleted: boolean, isCurrent: boolean) => {
    return cn(
      styles.stepTitle,
      isCompleted ? styles.stepTitleCompleted : '',
      isCurrent ? styles.stepTitleCurrent : '',
      !isCompleted && !isCurrent ? styles.stepTitlePending : ''
    );
  };

  // Step description classes
  const stepDescriptionClasses = (isCompleted: boolean, isCurrent: boolean) => {
    return cn(
      styles.stepDescription,
      isCompleted ? styles.stepDescriptionCompleted : '',
      isCurrent ? styles.stepDescriptionCurrent : '',
      !isCompleted && !isCurrent ? styles.stepDescriptionPending : ''
    );
  };

  return (
    <div className={styles.stepInfo}>
      <h3 className={stepInfoClasses(isCompleted, isCurrent)}>{title}</h3>
      {description && (
        <p className={stepDescriptionClasses(isCompleted, isCurrent)}>
          {description}
        </p>
      )}
    </div>
  );
};

const styles = {
  stepInfo: 'text-center',
  stepTitle: 'text-sm font-medium transition-colors duration-300 leading-tight',
  stepTitleCompleted: 'text-royal-purple',
  stepTitleCurrent: 'text-parchment-white',
  stepTitlePending: 'text-mist-gray',
  stepDescription:
    'text-xs mt-1 transition-colors duration-300 leading-tight line-clamp-1',
  stepDescriptionCompleted: 'text-royal-purple/80',
  stepDescriptionCurrent: 'text-parchment-white',
  stepDescriptionPending: 'text-mist-gray/80',
};

export default StepInfo;
