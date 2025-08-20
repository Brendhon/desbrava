import {
  ButtonSkeleton,
  LoadingSkeleton,
} from '@/components/ui/loading-skeleton';

export default function AccountLoading() {
  return (
    <div className={styles.container}>
      {/* Header Skeleton */}
      <div className={styles.header}>
        <LoadingSkeleton className={styles.title} />
        <LoadingSkeleton className={styles.subtitle} />
      </div>

      <div className={styles.content}>
        {/* Simplified Card Skeletons */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.icon} />
            <LoadingSkeleton className={styles.cardTitle} />
          </div>
          <div className={styles.cardContent}>
            <LoadingSkeleton className={styles.text} />
            <LoadingSkeleton className={styles.text} />
            <ButtonSkeleton />
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.icon} />
            <LoadingSkeleton className={styles.cardTitle} />
          </div>
          <div className={styles.cardContent}>
            <LoadingSkeleton className={styles.text} />
            <LoadingSkeleton className={styles.text} />
            <ButtonSkeleton />
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.icon} />
            <LoadingSkeleton className={styles.cardTitle} />
          </div>
          <div className={styles.cardContent}>
            <LoadingSkeleton className={styles.text} />
            <LoadingSkeleton className={styles.text} />
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardContent}>
            <LoadingSkeleton className={styles.cardTitle} />
            <LoadingSkeleton className={styles.text} />
            <div className={styles.buttonCenter}>
              <ButtonSkeleton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: 'max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-6',
  header: 'mb-8',
  title: 'h-10 w-80 mb-3',
  subtitle: 'h-6 w-96',
  content: 'space-y-8',
  card: 'bg-slate-dark rounded-lg shadow-lg border border-midnight-blue/20 p-8 animate-pulse',
  cardHeader: 'flex items-center gap-3 mb-6',
  icon: 'w-6 h-6 bg-royal-purple/20 rounded-full',
  cardTitle: 'h-6 w-48',
  cardContent: 'space-y-4',
  text: 'h-4 w-full',
  buttonCenter: 'flex justify-center',
};
