import {
  LoadingSkeleton,
  CardSkeleton,
} from '@/components/loading/loading-skeleton';

export default function CreateActivityLoading() {
  return (
    <div className={styles.container}>
      {/* Header Skeleton */}
      <div className={styles.header}>
        <div className={styles.backButton}>
          <LoadingSkeleton count={1} className={styles.loadingSkeleton} />
        </div>
        <div className={styles.headerContent}>
          <LoadingSkeleton count={1} className={styles.loadingSkeleton} />
          <LoadingSkeleton count={1} className={styles.loadingSkeleton} />
        </div>
      </div>

      {/* Steps Progress Skeleton */}
      <div className={styles.stepsContainer}>
        <CardSkeleton />
      </div>

      {/* Current Step Content Skeleton */}
      <div className={styles.stepContentContainer}>
        <CardSkeleton />
      </div>
    </div>
  );
}

const styles = {
  container: 'max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 space-y-6',
  header: 'flex items-center space-x-4',
  backButton: 'flex-shrink-0',
  headerContent: 'space-y-3',
  stepsContainer: 'overflow-x-auto',
  stepItem: 'flex flex-col items-center space-y-2',
  stepNumber: 'flex-shrink-0',
  stepContent: 'flex flex-col items-center space-y-1 text-center',
  stepContentContainer: 'mt-8',
  loadingSkeleton: 'w-48 h-8',
};
