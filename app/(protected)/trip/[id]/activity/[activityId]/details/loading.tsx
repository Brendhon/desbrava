import { ButtonSkeleton, LoadingSkeleton } from '@/components/loading';

export default function ActivityDetailsLoading() {
  return (
    <div className={styles.container}>
      {/* Header Skeleton */}
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <LoadingSkeleton className={styles.backLink} />
          <div className={styles.actionsContainer}>
            <ButtonSkeleton />
            <ButtonSkeleton />
          </div>
        </div>
        <LoadingSkeleton className={styles.title} />
        <LoadingSkeleton className={styles.description} />
      </div>

      {/* Activity Info Skeleton */}
      <div className={styles.contentArea}>
        {/* Basic Info Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <LoadingSkeleton className={styles.sectionIcon} />
            <div>
              <LoadingSkeleton className={styles.sectionTitle} />
              <LoadingSkeleton className={styles.sectionDescription} />
            </div>
          </div>

          <div className={styles.infoItems}>
            <div className={styles.infoItem}>
              <div className={styles.itemIcon} />
              <div className={styles.itemContent}>
                <LoadingSkeleton className={styles.itemLabel} />
                <LoadingSkeleton className={styles.itemValue} />
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.itemIcon} />
              <div className={styles.itemContent}>
                <LoadingSkeleton className={styles.itemLabel} />
                <LoadingSkeleton className={styles.itemValue} />
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.itemIcon} />
              <div className={styles.itemContent}>
                <LoadingSkeleton className={styles.itemLabel} />
                <LoadingSkeleton className={styles.itemValue} />
              </div>
            </div>
          </div>
        </div>

        {/* Destination Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <LoadingSkeleton className={styles.sectionIcon} />
            <div>
              <LoadingSkeleton className={styles.sectionTitle} />
              <LoadingSkeleton className={styles.sectionDescription} />
            </div>
          </div>

          <div className={styles.placeInfo}>
            <LoadingSkeleton className={styles.placeName} />
            <LoadingSkeleton className={styles.placeAddress} />
            <LoadingSkeleton className={styles.placeType} />
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: 'max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8',
  header: 'mb-8',
  headerTop: 'flex items-center justify-between mb-6',
  backLink: 'h-10 w-40',
  actionsContainer: 'flex items-center gap-3',
  title: 'h-10 w-80 mb-3',
  description: 'h-6 w-96',
  contentArea: 'space-y-6',
  section:
    'bg-slate-dark rounded-lg border border-midnight-blue/20 p-6 animate-pulse',
  sectionHeader: 'flex items-center gap-3 mb-6',
  sectionIcon: 'w-6 h-6 bg-royal-purple/20 rounded-full',
  sectionTitle: 'h-6 w-32 mb-2',
  sectionDescription: 'h-4 w-48',
  infoItems: 'space-y-4',
  infoItem:
    'flex items-start gap-3 p-4 bg-slate-800/20 rounded-lg border border-slate-700/30',
  itemIcon: 'w-5 h-5 bg-royal-purple/20 rounded-full mt-0.5 flex-shrink-0',
  itemContent: 'space-y-2',
  itemLabel: 'h-4 w-24',
  itemValue: 'h-4 w-32',
  placeInfo:
    'p-4 bg-slate-800/20 rounded-lg border border-slate-700/30 space-y-3',
  placeName: 'h-5 w-48',
  placeAddress: 'h-4 w-64',
  placeType: 'h-4 w-32',
};
