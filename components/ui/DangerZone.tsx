import { LucideIcon } from 'lucide-react';
import Button from './Button';
import Card from './Card';

interface DangerZoneProps {
  icon: LucideIcon;
  title: string;
  description: string;
  warningText: string;
  actionLabel: string;
  onAction: () => void;
  isLoading?: boolean;
  loadingText?: string;
}

export default function DangerZone({
  icon: Icon,
  title,
  description,
  warningText,
  actionLabel,
  onAction,
  isLoading = false,
  loadingText = 'Processando...',
}: DangerZoneProps) {
  return (
    <Card
      padding="xl"
      shadow="lg"
      background="dark"
      maxWidth="none"
      border={false}
    >
      <div className={styles.sectionHeader}>
        <Icon className={styles.sectionIcon} aria-hidden="true" />
        <h2 className={styles.sectionTitle}>{title}</h2>
      </div>

      <div className={styles.dataContent}>
        <div className={styles.dataInfo}>
          <h3 className={styles.dataTitle}>{title}</h3>
          <p className={styles.dataDescription}>{description}</p>
          <div className={styles.dataWarning}>
            <p className={styles.warningText}>⚠️ {warningText}</p>
          </div>
        </div>

        <div className={styles.dataActions}>
          <Button
            onClick={onAction}
            disabled={isLoading}
            variant="danger"
            className={styles.dangerButton}
            aria-label={actionLabel}
          >
            {isLoading ? loadingText : actionLabel}
          </Button>
        </div>
      </div>
    </Card>
  );
}

const styles = {
  sectionHeader: 'flex items-center gap-3 mb-6',
  sectionIcon: 'w-6 h-6 text-royal-purple',
  sectionTitle: 'text-xl font-semibold text-parchment-white',
  dataContent: 'space-y-6',
  dataInfo: 'space-y-3',
  dataTitle: 'text-lg font-medium text-parchment-white',
  dataDescription: 'text-mist-gray',
  dataWarning: 'mt-4 p-4 bg-red-900/20 border border-red-500/30 rounded-lg',
  warningText: 'text-red-300 text-sm',
  dataActions: 'flex justify-start',
  dangerButton:
    'px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200',
};
