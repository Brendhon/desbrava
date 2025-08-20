import {
  ButtonSkeleton,
  LoadingSkeleton,
} from '@/components/ui/loading-skeleton';

export default function DashboardLoading() {
  return (
    <div className={styles.container}>
      {/* Header Skeleton */}
      <div className={styles.header}>
        <div>
          <LoadingSkeleton className={styles.title} />
          <LoadingSkeleton className={styles.subtitle} />
        </div>
        <div className={styles.headerActions}>
          <ButtonSkeleton />
          <ButtonSkeleton />
        </div>
      </div>

      {/* Stats Section Skeleton */}
      <div className={styles.statsGrid}>
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className={styles.statCard}>
            <LoadingSkeleton className={styles.statLabel} />
            <LoadingSkeleton className={styles.statValue} />
          </div>
        ))}
      </div>

      {/* Separator */}
      <hr className={styles.separator} />

      {/* Trips Section Skeleton */}
      <div className={styles.tripsSection}>
        <div className={styles.tripsHeader}>
          <LoadingSkeleton className={styles.tripsTitle} />
          <ButtonSkeleton />
        </div>

        <div className={styles.tripsGrid}>
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className={styles.tripCard}>
              <LoadingSkeleton className={styles.tripTitle} />
              <LoadingSkeleton className={styles.tripText} />
              <LoadingSkeleton className={styles.tripText} />
              <div className={styles.tripActions}>
                <ButtonSkeleton />
                <ButtonSkeleton />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: 'max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 space-y-8',
  header:
    'flex gap-4 flex-col lg:flex-row justify-center items-center lg:justify-between',
  title: 'h-10 w-80 mb-3',
  subtitle: 'h-6 w-96',
  headerActions: 'flex flex-col sm:flex-row gap-3 pt-4',
  statsGrid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6',
  statCard:
    'bg-slate-dark rounded-lg border border-midnight-blue/20 p-6 animate-pulse',
  statLabel: 'h-4 w-24 mb-3',
  statValue: 'h-8 w-16',
  separator: 'my-8 border-t border-gray-700',
  tripsSection: 'space-y-6',
  tripsHeader: 'flex items-center justify-between',
  tripsTitle: 'h-8 w-48',
  tripsGrid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
  tripCard:
    'bg-slate-dark rounded-lg border border-midnight-blue/20 p-6 animate-pulse space-y-4',
  tripTitle: 'h-6 w-40',
  tripText: 'h-4 w-full',
  tripActions: 'flex gap-3 pt-2',
};
