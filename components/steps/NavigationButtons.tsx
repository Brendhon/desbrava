import { cn } from '@/lib/utils';
import { Button } from '../ui';

interface NavigationButtonsProps {
  onBack: () => void;
  onNext: () => void;
  canProceed: boolean;
  nextButtonText?: string;
  canGoBack?: boolean;
}

export default function NavigationButtons({
  onBack,
  onNext,
  canProceed,
  canGoBack = true,
  nextButtonText = 'Continuar',
}: NavigationButtonsProps) {
  return (
    <div className={styles.container}>
      <Button
        variant="secondary"
        onClick={onBack}
        className={cn(!canGoBack && styles.invisible)}
      >
        Voltar
      </Button>

      <Button variant="primary" onClick={onNext} disabled={!canProceed}>
        {nextButtonText}
      </Button>
    </div>
  );
}

const styles = {
  container: 'flex justify-between pt-6',
  invisible: 'invisible',
};
