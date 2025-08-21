import {
  ButtonSkeleton,
  LoadingSkeleton,
} from '@/components/ui/loading-skeleton';

export default function TripCreationLoading() {
  return (
    <div className={styles.container}>
      {/* Header Skeleton */}
      <div className={styles.header}>
        <LoadingSkeleton className={styles.title} />
        <LoadingSkeleton className={styles.subtitle} />
      </div>

      {/* Form Skeleton */}
      <div className={styles.card}>
        <div className={styles.form}>
          {/* Form Fields */}
          <LoadingSkeleton className={styles.field} />
          <LoadingSkeleton className={styles.field} />

          {/* Date Grid */}
          <div className={styles.dateGrid}>
            <LoadingSkeleton className={styles.field} />
            <LoadingSkeleton className={styles.field} />
          </div>

          <LoadingSkeleton className={styles.field} />

          {/* Buttons */}
          <div className={styles.buttonGroup}>
            <ButtonSkeleton />
            <ButtonSkeleton />
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
  card: 'bg-slate-dark rounded-lg shadow-lg border border-midnight-blue/20 p-8 animate-pulse',
  form: 'space-y-6',
  field: 'h-16 w-full',
  dateGrid: 'grid grid-cols-1 md:grid-cols-2 gap-6',
  buttonGroup: 'flex flex-col sm:flex-row gap-4 pt-4',
};
