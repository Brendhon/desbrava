'use client';

import { cn } from '@/lib/utils';
import StepButton from './StepButton';
import StepInfo from './StepInfo';
import StepConnector from './StepConnector';
import { Step } from '@/lib/types';

interface StepItemProps {
  isCurrent: boolean;
  isCompleted: boolean;
  isClickable: boolean;
  handleStepClick: (stepIndex: number) => void;
  index: number;
  steps: Step[];
  className?: string;
}

const StepItem = ({ isCurrent, isCompleted, isClickable, handleStepClick, index, steps, className }: StepItemProps) => {
  // Step wrapper classes
  const stepWrapperClasses = (isCurrent: boolean) => {
    return cn(
      styles.stepWrapper,
      isCurrent ? styles.stepWrapperCurrent : styles.stepWrapperNotCurrent,
    );
  };

  return (
    <div key={index} className={styles.step}>
      <div className={cn(styles.stepContainer, className)}>
        <div className={stepWrapperClasses(isCurrent)}>
          {/* Step Circle */}
          <StepButton
            index={index}
            isCompleted={isCompleted}
            isCurrent={isCurrent}
            isClickable={isClickable}
            handleStepClick={handleStepClick}
          />

          {/* Step Info */}
          <StepInfo
            title={steps[index].title}
            description={steps[index].description}
            isCompleted={isCompleted}
            isCurrent={isCurrent}
          />
        </div>

        {/* Step Connector */}
        <StepConnector
          isCompleted={isCompleted}
          index={index}
          steps={steps}
        />
      </div>
    </div>
  );
};

const styles = {
  step: 'w-full',
  stepContainer: 'flex items-center justify-between w-full overflow-x-auto',
  stepWrapper: 'flex items-center flex-col flex-1 justify-center gap-2',
  stepWrapperCurrent: 'flex',
  stepWrapperNotCurrent: 'md:flex hidden',
};

export default StepItem;
