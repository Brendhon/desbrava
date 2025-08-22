import { Card } from '@/components/ui';
import {
  LoadingSkeleton,
  CardSkeleton,
  FormSectionSkeleton,
  InputSkeleton,
  ButtonSkeleton,
} from '@/components/loading/loading-skeleton';

export default function CreateActivityLoading() {
  return (
    <div className={styles.container}>
      {/* Header Skeleton */}
      <div className={styles.headerContainer}>
        <div className={styles.headerSkeleton}>
          <div className={styles.backButtonSkeleton}></div>
          <div className={styles.titleSkeleton}>
            <LoadingSkeleton count={1} className="h-8 w-48" />
            <LoadingSkeleton count={1} className="h-5 w-64" />
          </div>
        </div>
      </div>

      {/* Form Skeleton */}
      <div className={styles.form}>
        <div className={styles.formGrid}>
          {/* Left Column */}
          <div className={styles.leftColumn}>
            {/* Basic Information */}
            <Card
              shadow="none"
              background="dark"
              maxWidth="none"
              border={false}
              className={styles.section}
            >
              <LoadingSkeleton count={1} className="mb-4 h-6 w-32" />

              <div className={styles.fieldGroup}>
                <LoadingSkeleton count={1} className="mb-2 h-4 w-24" />
                <InputSkeleton />
              </div>

              <div className={styles.fieldGroup}>
                <LoadingSkeleton count={1} className="mb-2 h-4 w-32" />
                <InputSkeleton />
              </div>

              <div className={styles.fieldGroup}>
                <LoadingSkeleton count={1} className="mb-2 h-4 w-28" />
                <div className="bg-mist-gray/20 h-24 animate-pulse rounded-md" />
              </div>
            </Card>

            {/* Date and Time */}
            <Card
              shadow="none"
              background="dark"
              maxWidth="none"
              border={false}
              className={styles.section}
            >
              <LoadingSkeleton count={1} className="mb-4 h-6 w-32" />

              <div className={styles.fieldGroup}>
                <LoadingSkeleton count={1} className="mb-2 h-4 w-16" />
                <InputSkeleton />
              </div>

              <div className={styles.timeGrid}>
                <div className={styles.fieldGroup}>
                  <LoadingSkeleton count={1} className="mb-2 h-4 w-32" />
                  <InputSkeleton />
                </div>

                <div className={styles.fieldGroup}>
                  <LoadingSkeleton count={1} className="mb-2 h-4 w-28" />
                  <InputSkeleton />
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <LoadingSkeleton count={1} className="mb-2 h-4 w-36" />
                <InputSkeleton />
              </div>
            </Card>

            {/* Priority and Tags */}
            <Card
              shadow="none"
              background="dark"
              maxWidth="none"
              border={false}
              className={styles.section}
            >
              <LoadingSkeleton count={1} className="mb-4 h-6 w-32" />

              <div className={styles.fieldGroup}>
                <LoadingSkeleton count={1} className="mb-2 h-4 w-24" />
                <InputSkeleton />
              </div>

              <div className={styles.fieldGroup}>
                <LoadingSkeleton count={1} className="mb-2 h-4 w-16" />
                <InputSkeleton />
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className={styles.rightColumn}>
            {/* Location */}
            <Card
              shadow="none"
              background="dark"
              maxWidth="none"
              border={false}
              className={styles.section}
            >
              <LoadingSkeleton count={1} className="mb-4 h-6 w-32" />

              <div className={styles.fieldGroup}>
                <LoadingSkeleton count={1} className="h-6 w-48" />
              </div>

              <div className={styles.fieldGroup}>
                <LoadingSkeleton count={1} className="mb-2 h-4 w-24" />
                <InputSkeleton />
              </div>
            </Card>

            {/* Cost */}
            <Card
              shadow="none"
              background="dark"
              maxWidth="none"
              border={false}
              className={styles.section}
            >
              <LoadingSkeleton count={1} className="mb-4 h-6 w-20" />

              <div className={styles.costGrid}>
                <div className={styles.fieldGroup}>
                  <LoadingSkeleton count={1} className="mb-2 h-4 w-20" />
                  <InputSkeleton />
                </div>

                <div className={styles.fieldGroup}>
                  <LoadingSkeleton count={1} className="mb-2 h-4 w-24" />
                  <InputSkeleton />
                </div>
              </div>
            </Card>

            {/* Notes */}
            <Card
              shadow="none"
              background="dark"
              maxWidth="none"
              border={false}
              className={styles.section}
            >
              <LoadingSkeleton count={1} className="mb-4 h-6 w-32" />

              <div className={styles.fieldGroup}>
                <LoadingSkeleton count={1} className="mb-2 h-4 w-40" />
                <div className="bg-mist-gray/20 h-24 animate-pulse rounded-md" />
              </div>
            </Card>
          </div>
        </div>

        {/* Form Actions Skeleton */}
        <div className={styles.formActions}>
          <ButtonSkeleton />
          <ButtonSkeleton />
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: 'max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8',
  headerContainer: 'mb-8',
  headerSkeleton: 'flex items-center gap-4',
  backButtonSkeleton: 'w-8 h-8 bg-slate-dark/40 rounded-lg animate-pulse',
  titleSkeleton: 'space-y-2',
  form: 'space-y-8',
  formGrid: 'grid grid-cols-1 lg:grid-cols-3 gap-8',
  leftColumn: 'lg:col-span-2 space-y-6',
  rightColumn: 'space-y-6',
  section: 'p-6',
  fieldGroup: 'mb-4',
  timeGrid: 'grid grid-cols-2 gap-4',
  costGrid: 'grid grid-cols-2 gap-4',
  formActions: 'flex justify-end gap-4 pt-6 border-t border-slate-dark/20',
};
