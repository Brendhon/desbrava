import { LoadingSkeleton, ButtonSkeleton } from '@/components/ui/loading-skeleton';

export default function TripCreationLoading() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Form Skeleton */}
        <div className={styles.formSection}>
          <LoadingSkeleton count={4} />
        </div>
        
        {/* Actions */}
        <div className={styles.actions}>
          <ButtonSkeleton />
          <ButtonSkeleton />
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: 'container mx-auto px-4 py-8',
  content: 'max-w-2xl mx-auto',
  formSection: 'mb-6',
  actions: 'flex justify-end space-x-4 pt-6',
};
