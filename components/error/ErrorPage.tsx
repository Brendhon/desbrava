'use client';

import { PageHeader } from '@/components/layout';
import { Card } from '@/components/ui';

interface ErrorPageProps {
  backHref: string;
  backText: string;
  backAriaLabel: string;
  title: string;
  subtitle: string;
  errorMessage: string;
  onRetry?: () => void;
  retryButtonText?: string;
  showRetryButton?: boolean;
}

export default function ErrorPage({
  backHref,
  backText,
  backAriaLabel,
  title,
  subtitle,
  errorMessage,
  onRetry,
  retryButtonText = 'Tentar Novamente',
  showRetryButton = true,
}: ErrorPageProps) {
  return (
    <div className={styles.container}>
      <PageHeader
        backHref={backHref}
        backText={backText}
        backAriaLabel={backAriaLabel}
        title={title}
        subtitle={subtitle}
      />
      <Card
        padding="xl"
        shadow="lg"
        background="dark"
        maxWidth="none"
        border={false}
        className={styles.errorContainer}
      >
        <div className={styles.errorContent}>
          <p className={styles.errorMessage}>{errorMessage}</p>
          {showRetryButton && onRetry && (
            <button
              onClick={onRetry}
              className={styles.retryButton}
              aria-label={retryButtonText}
            >
              {retryButtonText}
            </button>
          )}
        </div>
      </Card>
    </div>
  );
}

const styles = {
  container: 'max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-6',
  errorContainer: 'text-center',
  errorContent: 'text-center py-8',
  errorMessage: 'text-red-400 mb-4',
  retryButton:
    'px-4 py-2 bg-royal-purple text-parchment-white rounded-lg hover:bg-royal-purple/80 transition-colors',
};
