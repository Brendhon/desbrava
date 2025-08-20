import { LoadingSkeleton, CardSkeleton, ButtonSkeleton } from '@/components/ui/loading-skeleton';

export default function TripSettingsLoading() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Settings Form */}
        <div className={styles.formSection}>
          <LoadingSkeleton count={3} />
        </div>
        
        {/* Privacy Settings */}
        <CardSkeleton />
        
        {/* Danger Zone */}
        <div className={styles.dangerZone}>
          <LoadingSkeleton count={1} />
          <div className={styles.dangerContent}>
            <LoadingSkeleton count={2} />
            <ButtonSkeleton />
          </div>
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
  dangerZone: 'bg-slate-dark rounded-lg shadow-lg border border-midnight-blue/20 p-6 mb-6',
  dangerContent: 'border border-red-500/70 rounded-lg p-4 bg-red-500/20',
  actions: 'flex justify-end space-x-4',
};
