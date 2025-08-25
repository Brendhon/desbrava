import { PlaceInfo } from '@/components/activity/destination';
import { PlaceSearchSelect } from '@/components/form/selects';
import { usePlaces } from '@/hooks/usePlaces';
import { Place } from '@/lib/types/places';
import { cn } from '@/lib/utils';
import { MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ActivityTypeData } from '../ActivityTypeSelector';

interface PlaceSelectorProps {
  title: string;
  searchLabel: string;
  searchPlaceholder: string;
  activityType: ActivityTypeData;
  onSearchChange: (value?: Place) => void;
  selectedPlace?: Place;
  showBorder?: boolean;
}

export default function PlaceSelector({
  title,
  searchLabel,
  searchPlaceholder,
  activityType,
  onSearchChange,
  selectedPlace,
  showBorder = false,
}: PlaceSelectorProps) {
  // Search state
  const [search, setSearch] = useState('');

  // Places API
  const { getPlaceFromApi } = usePlaces({ activityType });

  // Listen to search value change to fetch place from API
  useEffect(() => {
    getPlaceFromApi(search).then(onSearchChange);
  }, [search]);

  return (
    <div className={cn(styles.container, showBorder && styles.border)}>
      {/* Title */}
      <h3 className={styles.title}>
        <MapPin className={styles.icon} />
        {title}
      </h3>

      {/* Search */}
      <div className={styles.searchContainer}>
        <PlaceSearchSelect
          label={searchLabel}
          placeholder={searchPlaceholder}
          helperText="Digite para buscar um local..."
          onValueChange={(value) => setSearch(value)}
          defaultValue={search}
          activityType={activityType}
        />
      </div>

      {/* Place info */}
      {selectedPlace && <PlaceInfo type={activityType.type} place={selectedPlace} />}
    </div>
  );
}

const styles = {
  container: 'px-8 w-full',
  border: 'border-r-0 border-mist-gray/50 lg:border-r',
  title:
    'mb-4 flex items-center gap-2 text-lg font-semibold',
  icon: 'text-royal-purple h-5 w-5',
  searchContainer: 'space-y-3',
  loadingContainer: 'text-mist-gray flex items-center gap-2 text-sm',
  spinner:
    'border-mist-gray h-4 w-4 animate-spin rounded-full border-2 border-t-transparent',
};
