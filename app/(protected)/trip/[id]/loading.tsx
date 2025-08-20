import { LoadingSkeleton, CardSkeleton, ButtonSkeleton } from '@/components/ui/loading-skeleton';

export default function TripDetailsLoading() {
  return (
    <div className={styles.container}>
      {/* Header with Actions */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <LoadingSkeleton count={1} />
          <div className={styles.headerActions}>
            <ButtonSkeleton />
            <ButtonSkeleton />
          </div>
        </div>
        <LoadingSkeleton count={1} />
      </div>

      {/* Trip Info Card */}
      <CardSkeleton />

      {/* Tabs Navigation */}
      <div className={styles.tabs}>
        {Array.from({ length: 4 }).map((_, index) => (
          <LoadingSkeleton key={index} count={1} />
        ))}
      </div>

      {/* Content Area */}
      <CardSkeleton />
    </div>
  );
}

const styles = {
  container: 'container mx-auto px-4 py-8',
  header: 'mb-8',
  headerContent: 'flex items-center justify-between mb-6',
  headerActions: 'flex space-x-3',
  tabs: 'mb-6 flex space-x-6 border-b border-midnight-blue/20',
};
