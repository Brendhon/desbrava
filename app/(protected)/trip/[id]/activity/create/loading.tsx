import { Card } from '@/components/ui';
import { 
  LoadingSkeleton, 
  CardSkeleton, 
  FormSectionSkeleton, 
  InputSkeleton, 
  ButtonSkeleton 
} from '@/components/loading/loading-skeleton';

export default function CreateActivityLoading() {
  return (
    <div className={styles.container}>
      {/* Header Skeleton */}
      <div className={styles.headerContainer}>
        <div className={styles.headerSkeleton}>
          <div className={styles.backButtonSkeleton}></div>
          <div className={styles.titleSkeleton}>
            <LoadingSkeleton count={1} className="w-48 h-8" />
            <LoadingSkeleton count={1} className="w-64 h-5" />
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
              <LoadingSkeleton count={1} className="w-32 h-6 mb-4" />
              
              <div className={styles.fieldGroup}>
                <LoadingSkeleton count={1} className="w-24 h-4 mb-2" />
                <InputSkeleton />
              </div>

              <div className={styles.fieldGroup}>
                <LoadingSkeleton count={1} className="w-32 h-4 mb-2" />
                <InputSkeleton />
              </div>

              <div className={styles.fieldGroup}>
                <LoadingSkeleton count={1} className="w-28 h-4 mb-2" />
                <div className="h-24 bg-mist-gray/20 rounded-md animate-pulse" />
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
              <LoadingSkeleton count={1} className="w-32 h-6 mb-4" />
              
              <div className={styles.fieldGroup}>
                <LoadingSkeleton count={1} className="w-16 h-4 mb-2" />
                <InputSkeleton />
              </div>

              <div className={styles.timeGrid}>
                <div className={styles.fieldGroup}>
                  <LoadingSkeleton count={1} className="w-32 h-4 mb-2" />
                  <InputSkeleton />
                </div>

                <div className={styles.fieldGroup}>
                  <LoadingSkeleton count={1} className="w-28 h-4 mb-2" />
                  <InputSkeleton />
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <LoadingSkeleton count={1} className="w-36 h-4 mb-2" />
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
              <LoadingSkeleton count={1} className="w-32 h-6 mb-4" />
              
              <div className={styles.fieldGroup}>
                <LoadingSkeleton count={1} className="w-24 h-4 mb-2" />
                <InputSkeleton />
              </div>

              <div className={styles.fieldGroup}>
                <LoadingSkeleton count={1} className="w-16 h-4 mb-2" />
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
              <LoadingSkeleton count={1} className="w-32 h-6 mb-4" />
              
              <div className={styles.fieldGroup}>
                <LoadingSkeleton count={1} className="w-48 h-6" />
              </div>

              <div className={styles.fieldGroup}>
                <LoadingSkeleton count={1} className="w-24 h-4 mb-2" />
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
              <LoadingSkeleton count={1} className="w-20 h-6 mb-4" />
              
              <div className={styles.costGrid}>
                <div className={styles.fieldGroup}>
                  <LoadingSkeleton count={1} className="w-20 h-4 mb-2" />
                  <InputSkeleton />
                </div>

                <div className={styles.fieldGroup}>
                  <LoadingSkeleton count={1} className="w-24 h-4 mb-2" />
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
              <LoadingSkeleton count={1} className="w-32 h-6 mb-4" />
              
              <div className={styles.fieldGroup}>
                <LoadingSkeleton count={1} className="w-40 h-4 mb-2" />
                <div className="h-24 bg-mist-gray/20 rounded-md animate-pulse" />
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
