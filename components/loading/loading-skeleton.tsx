import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
  count?: number;
}

export function LoadingSkeleton({
  className,
  count = 1,
}: LoadingSkeletonProps) {
  return (
    <div className={cn(styles.skeleton, className)}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={cn(
            styles.text,
            styles.mb2,
            index === count - 1 && styles.mb0
          )}
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
  return <div className={cn(styles.button, styles.w32)} />;
}

export function InputSkeleton() {
  return <div className={styles.input} />;
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
  text: 'h-6 bg-mist-gray/20 rounded-md', // Increased height from h-4 to h-6
  textSmall: 'h-4 bg-mist-gray/20 rounded-md', // Increased height from h-3 to h-4
  textLarge: 'h-12 bg-mist-gray/20 rounded-md', // Increased height from h-8 to h-12
  title: 'h-8 bg-mist-gray/20 rounded-md w-48', // Increased height from h-6 to h-8 and width from w-32 to w-48

  // Layout utilities
  mb2: 'mb-3', // Increased margin from mb-2 to mb-3
  mb3: 'mb-4', // Increased margin from mb-3 to mb-4
  mb4: 'mb-6', // Increased margin from mb-4 to mb-6
  mb6: 'mb-8', // Increased margin from mb-6 to mb-8
  mb0: 'mb-1', // Slightly increased from mb-0 to mb-1

  // Width utilities
  w12: 'w-3/4', // Increased from w-1/2 to w-3/4
  w13: 'w-1/2', // Increased from w-1/3 to w-1/2
  w20: 'w-32', // Increased from w-20 to w-32
  w23: 'w-5/6', // Increased from w-2/3 to w-5/6
  w24: 'w-40', // Increased from w-24 to w-40
  w28: 'w-48', // Increased from w-28 to w-48
  w32: 'w-56', // Increased from w-32 to w-56
  w34: 'w-full', // Increased from w-3/4 to w-full
  w45: 'w-full', // Increased from w-4/5 to w-full
  w46: 'w-full', // Increased from w-4/6 to w-full
  w56: 'w-full', // Increased from w-5/6 to w-full

  // Component styles
  card: 'bg-slate-dark rounded-lg shadow-lg border border-midnight-blue/20 p-10 animate-pulse', // Increased padding from p-6 to p-10
  tripCard:
    'bg-slate-dark rounded-lg shadow-lg border border-midnight-blue/20 p-8 animate-pulse', // Increased padding from p-4 to p-8
  button: 'h-14 bg-royal-purple/20 rounded-md', // Increased height from h-10 to h-14
  input: 'h-14 bg-mist-gray/20 rounded-md w-full animate-pulse', // Increased height from h-10 to h-14

  // Layout components
  flexBetween: 'flex justify-between items-center',
  statsGrid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12', // Increased gap from gap-6 to gap-8 and mb from mb-8 to mb-12
  formSection: 'space-y-6', // Increased vertical spacing from space-y-4 to space-y-6
};
