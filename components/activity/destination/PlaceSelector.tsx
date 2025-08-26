import { PlaceInfo } from '@/components/activity/destination';
import { PlaceSearchSelect } from '@/components/form/selects';
import { usePlaces } from '@/hooks/usePlaces';
import { Place } from '@/lib/types/places';
import { cn } from '@/lib/utils';
import { MapPin, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ActivityTypeData } from '../ActivityTypeSelector';
import { DestinationData } from '../DestinationSelector';
import { Button } from '@/components/ui';
import { SearchType } from '@/lib/types';

interface PlaceSelectorProps {
  title: string;
  searchLabel: string;
  searchPlaceholder: string;
  activityType: ActivityTypeData;
  onSearchChange: (value?: Place) => void;
  selectedPlace?: Place;
  showBorder?: boolean;
  defaultData?: DestinationData;
}

export default function PlaceSelector({
  title,
  searchLabel,
  searchPlaceholder,
  activityType,
  defaultData,
  onSearchChange,
  selectedPlace,
  showBorder = false,
}: PlaceSelectorProps) {
  // Search state
  const [search, setSearch] = useState('');

  // Search type state
  const [searchType, setSearchType] = useState<SearchType>(defaultData?.searchType || 'searchText');

  // Places API
  const { getPlaceFromApi } = usePlaces({ activityType });

  // Listen to search value change to fetch place from API
  useEffect(() => {
    getPlaceFromApi(search).then(onSearchChange);
  }, [search]);

  return (
    <div className={cn(styles.container, showBorder && styles.border)}>
      {/* Header */}
      <div className={styles.header}>
        <h3 className={styles.title}>
          <MapPin className={styles.icon} />
          {title}
        </h3>

        <div className={styles.searchTypeButtons}>
          <Button size='sm' variant={searchType === 'searchText' ? 'primary' : 'ghost'} onClick={() => setSearchType('searchText')}>
            <span> Texto </span>
          </Button>

          <Button size='sm' variant={searchType === 'searchNearby' ? 'primary' : 'ghost'} onClick={() => setSearchType('searchNearby')}>
            <span> Proximidade </span>
          </Button>

        </div>
      </div>

      {/* Search */}
      <div className={styles.searchContainer}>
        <PlaceSearchSelect
          label={searchLabel}
          placeholder={searchPlaceholder}
          helperText="Digite para buscar um local..."
          onValueChange={(value) => setSearch(value)}
          defaultValue={defaultData?.place}
          activityType={activityType}
        />
      </div>

      {/* Place info */}
      {selectedPlace && (
        <PlaceInfo type={activityType.type} place={selectedPlace} />
      )}
    </div>
  );
}

const styles = {
  container: 'px-2 sm:px-4 md:px-6 lg:px-8 w-full',
  border: 'border-r-0 border-mist-gray/50 lg:border-r',
  header: 'mb-4 flex items-center justify-between flex-wrap gap-2',
  title: 'flex items-center gap-2 text-lg font-semibold',
  icon: 'text-royal-purple h-5 w-5',
  searchContainer: 'space-y-3',
  loadingContainer: 'text-mist-gray flex items-center gap-2 text-sm',
  spinner:
    'border-mist-gray h-4 w-4 animate-spin rounded-full border-2 border-t-transparent',
  searchTypeButtons: 'flex gap-1',
};
