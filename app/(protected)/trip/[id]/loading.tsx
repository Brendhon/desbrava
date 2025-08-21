import {
  ButtonSkeleton,
  LoadingSkeleton,
} from '@/components/ui/loading-skeleton';

export default function TripDetailsLoading() {
  return (
    <div className={styles.container}>
      {/* Header Skeleton */}
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <LoadingSkeleton className={styles.backLink} />
          <ButtonSkeleton />
        </div>
        <LoadingSkeleton className={styles.title} />
        <LoadingSkeleton className={styles.description} />
      </div>

      {/* Trip Info Cards Skeleton */}
      <div className={styles.infoGrid}>
        <div className={styles.infoCard}>
          <div className={styles.infoIcon} />
          <div className={styles.infoContent}>
            <LoadingSkeleton className={styles.infoLabel} />
            <LoadingSkeleton className={styles.infoValue} />
          </div>
        </div>

        <div className={styles.infoCard}>
          <div className={styles.infoIcon} />
          <div className={styles.infoContent}>
            <LoadingSkeleton className={styles.infoLabel} />
            <LoadingSkeleton className={styles.infoValue} />
          </div>
        </div>

        <div className={styles.infoCard}>
          <div className={styles.infoIcon} />
          <div className={styles.infoContent}>
            <LoadingSkeleton className={styles.infoLabel} />
            <LoadingSkeleton className={styles.infoValue} />
          </div>
        </div>
      </div>

      {/* Trip Info Cards Skeleton */}
      <div className={styles.infoGrid}>
        <div className={styles.infoCard}>
          <div className={styles.infoIcon} />
          <div className={styles.infoContent}>
            <LoadingSkeleton className={styles.infoLabel} />
            <LoadingSkeleton className={styles.infoValue} />
          </div>
        </div>

        <div className={styles.infoCard}>
          <div className={styles.infoIcon} />
          <div className={styles.infoContent}>
            <LoadingSkeleton className={styles.infoLabel} />
            <LoadingSkeleton className={styles.infoValue} />
          </div>
        </div>

        <div className={styles.infoCard}>
          <div className={styles.infoIcon} />
          <div className={styles.infoContent}>
            <LoadingSkeleton className={styles.infoLabel} />
            <LoadingSkeleton className={styles.infoValue} />
          </div>
        </div>
      </div>

      {/* Content Area Skeleton */}
      <div className={styles.card}>
        <LoadingSkeleton className={styles.content} />
        <LoadingSkeleton className={styles.content} />
        <LoadingSkeleton className={styles.content} />
      </div>
    </div>
  );
}

const styles = {
  container: 'max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-8',
  header: 'mb-8',
  headerTop: 'flex items-center justify-between mb-6',
  backLink: 'h-10 w-40',
  title: 'h-10 w-80 mb-3',
  description: 'h-6 w-96',
  infoGrid: 'grid grid-cols-1 md:grid-cols-3 gap-6 mb-8',
  infoCard:
    'bg-slate-dark rounded-lg border border-midnight-blue/20 p-6 flex items-center gap-4 animate-pulse',
  infoIcon: 'w-8 h-8 bg-royal-purple/20 rounded-full',
  infoContent: 'space-y-2',
  infoLabel: 'h-4 w-20',
  infoValue: 'h-5 w-32',
  card: 'bg-slate-dark rounded-lg shadow-lg border border-midnight-blue/20 p-8 animate-pulse',
  content: 'h-6 w-full mb-4',
};
