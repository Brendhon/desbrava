import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
  count?: number;
}

export function LoadingSkeleton({ className, count = 1 }: LoadingSkeletonProps) {
  return (
    <div className={cn(styles.skeleton, className)}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={cn(styles.text, styles.mb2, index === count - 1 && styles.mb0)}
        />
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className={styles.card}>
      <div className={cn(styles.text, styles.mb4, styles.w34)} />
      <div className={cn(styles.textSmall, styles.mb2)} />
      <div className={cn(styles.textSmall, styles.mb2, styles.w56)} />
      <div className={cn(styles.textSmall, styles.w46)} />
    </div>
  );
}

export function TripCardSkeleton() {
  return (
    <div className={styles.tripCard}>
      <div className={cn(styles.text, styles.mb3, styles.w23)} />
      <div className={cn(styles.textSmall, styles.mb2)} />
      <div className={cn(styles.textSmall, styles.mb3, styles.w45)} />
      <div className={styles.flexBetween}>
        <div className={cn(styles.textSmall, styles.w13)} />
        <div className={cn(styles.button, styles.w20)} />
      </div>
    </div>
  );
}

export function ButtonSkeleton() {
  return (
    <div className={cn(styles.button, styles.w32)} />
  );
}

export function InputSkeleton() {
  return (
    <div className={styles.input} />
  );
}

export function StatsGridSkeleton() {
  return (
    <div className={styles.statsGrid}>
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className={styles.card}>
          <div className={cn(styles.text, styles.mb2, styles.w12)} />
          <div className={cn(styles.textLarge, styles.w34)} />
        </div>
      ))}
    </div>
  );
}

export function FormSectionSkeleton() {
  return (
    <div className={styles.card}>
      <div className={cn(styles.title, styles.mb6)} />
      <div className={styles.formSection}>
        <div>
          <div className={cn(styles.text, styles.mb2, styles.w24)} />
          <InputSkeleton />
        </div>
        <div>
          <div className={cn(styles.text, styles.mb2, styles.w32)} />
          <InputSkeleton />
        </div>
        <div>
          <div className={cn(styles.text, styles.mb2, styles.w28)} />
          <InputSkeleton />
        </div>
      </div>
    </div>
  );
}

const styles = {
  // Base skeleton styles
  skeleton: 'animate-pulse',
  text: 'h-4 bg-mist-gray/20 rounded-md',
  textSmall: 'h-3 bg-mist-gray/20 rounded-md',
  textLarge: 'h-8 bg-mist-gray/20 rounded-md',
  title: 'h-6 bg-mist-gray/20 rounded-md w-32',
  
  // Layout utilities
  mb2: 'mb-2',
  mb3: 'mb-3',
  mb4: 'mb-4',
  mb6: 'mb-6',
  mb0: 'mb-0',
  
  // Width utilities
  w12: 'w-1/2',
  w13: 'w-1/3',
  w20: 'w-20',
  w23: 'w-2/3',
  w24: 'w-24',
  w28: 'w-28',
  w32: 'w-32',
  w34: 'w-3/4',
  w45: 'w-4/5',
  w46: 'w-4/6',
  w56: 'w-5/6',
  
  // Component styles
  card: 'bg-slate-dark rounded-lg shadow-lg border border-midnight-blue/20 p-6 animate-pulse',
  tripCard: 'bg-slate-dark rounded-lg shadow-lg border border-midnight-blue/20 p-4 animate-pulse',
  button: 'h-10 bg-royal-purple/20 rounded-md',
  input: 'h-10 bg-mist-gray/20 rounded-md w-full animate-pulse',
  
  // Layout components
  flexBetween: 'flex justify-between items-center',
  statsGrid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8',
  formSection: 'space-y-4',
};
