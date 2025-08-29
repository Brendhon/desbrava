import { PlaceInfo } from '@/components/activity/destination';
import { PlaceSearchSelect } from '@/components/form/selects';
import { Button } from '@/components/ui';
import { usePlaces } from '@/hooks/usePlaces';
import { Activity, SearchType } from '@/lib/types';
import { Place } from '@/lib/types/places';
import { cn } from '@/lib/utils';
import { MapPin } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { ActivityTypeData } from '../ActivityTypeSelector';
import { DestinationData } from '../DestinationSelector';

interface PlaceSelectorProps {
  title: string;
  searchLabel: string;
  searchPlaceholder: string;
  activityType: ActivityTypeData;
  onSearchChange: (value?: Place) => void;
  onSearchTypeChange: (value: SearchType) => void;
  selectedPlace?: Place;
  showSearchTypeButtons?: boolean;
  lastActivity: Activity | null;
  defaultData?: DestinationData;
}

export default function PlaceSelector({
  title,
  searchLabel,
  searchPlaceholder,
  activityType,
  defaultData,
  onSearchChange,
  onSearchTypeChange,
  selectedPlace,
  lastActivity,
  showSearchTypeButtons = true,
}: PlaceSelectorProps) {
  // Search state
  const [search, setSearch] = useState('');

  // Search type state
  const [searchType, setSearchType] = useState<SearchType>(
    defaultData?.searchType || 'searchText'
  );

  // Places API
  const { getPlaceFromApi } = usePlaces({ activityType });

  // Listen to search value change to fetch place from API
  useEffect(() => {
    getPlaceFromApi(search).then(onSearchChange);
  }, [search]);

  // Listen to search type change to fetch place from API
  useEffect(() => {
    onSearchTypeChange(searchType);
  }, [searchType]);

  // Get a clear and explanatory search type description for the user
  const searchTypeDescription = useMemo(() => {
    switch (searchType) {
      // Search text
      case 'searchText':
        return 'Busca padrão: digite o nome, endereço ou outro termo para encontrar o local desejado usando autocompletar.';

      // Search nearby
      case 'searchNearby':
        // Get the display name of the last activity
        const displayName = lastActivity?.place?.displayName?.text;
        return `Busca por proximidade: mostra locais próximos ao local da última atividade cadastrada ${displayName ? `(${displayName})` : ''}.`;

      // Default
      default:
        return '';
    }
  }, [searchType, lastActivity]);

  // Render
  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        {/* Title */}
        <h3 className={styles.title}>
          <MapPin className={styles.icon} />
          {title}
        </h3>

        {/* Search type buttons */}
        <div
          className={cn(
            styles.searchTypeButtons,
            !showSearchTypeButtons && styles.invisible
          )}
        >
          <span
            onClick={() => setSearchType('searchText')}
            className={cn(
              styles.searchTypeButton,
              searchType === 'searchText' && styles.active
            )}
          >
            Texto
          </span>

          <span
            onClick={() => setSearchType('searchNearby')}
            className={cn(
              styles.searchTypeButton,
              searchType === 'searchNearby' && styles.active
            )}
          > Proximidade </span>
        </div>
      </div>

      {/* Search */}
      <div className={styles.searchContainer}>
        <PlaceSearchSelect
          label={searchLabel}
          placeholder={searchPlaceholder}
          helperText={searchTypeDescription}
          onValueChange={(value) => setSearch(value)}
          defaultValue={defaultData?.place}
          activityType={activityType}
          searchType={searchType}
          latitude={lastActivity?.place?.location?.latitude}
          longitude={lastActivity?.place?.location?.longitude}
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
  searchTypeButtons: 'flex gap-1 rounded-md px-2 py-1',
  searchTypeButton: 'text-xs cursor-pointer',
  active: 'bg-royal-purple text-white',
  loadingContainer: 'text-mist-gray flex items-center gap-2 text-sm',
  spinner:
    'border-mist-gray h-4 w-4 animate-spin rounded-full border-2 border-t-transparent',
  invisible: 'invisible',
};
