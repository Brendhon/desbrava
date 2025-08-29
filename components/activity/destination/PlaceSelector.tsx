import { PlaceInfo } from '@/components/activity/destination';
import { PlaceSearchSelect } from '@/components/form/selects';
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
  activityType: ActivityTypeData;
  onSearchChange: (value?: Place) => void;
  onSearchTypeChange: (value: SearchType) => void;
  selectedPlace?: Place;
  showSearchTypeButtons?: boolean;
  lastActivity: Activity | null;
  defaultData?: DestinationData;
}

interface SearchTypeButton {
  label: string;
  buttonText: string;
  placeholder: string;
}

const searchTypeButtons: Record<SearchType, SearchTypeButton> = {
  street: {
    label: 'Busca por Nome de Rua',
    buttonText: 'Buscar por Rua',
    placeholder:
      'Digite o nome da rua (ex: "Rua das Flores", "Avenida Paulista")',
  },
  searchText: {
    label: 'Busca por Texto com Autocompletar',
    buttonText: 'Já sei o que quero',
    placeholder:
      'Digite o nome do lugar, endereço ou qualquer termo que você lembrar',
  },
  searchNearby: {
    label: 'Busca por Proximidade',
    buttonText: 'Me dê sugestões',
    placeholder:
      'Descubra lugares interessantes próximos à sua última atividade',
  },
};

const SearchTypeButtons = ({
  searchType,
  setSearchType,
  showSearchTypeButtons = true,
}: {
  searchType: SearchType;
  setSearchType: (value: SearchType) => void;
  showSearchTypeButtons?: boolean;
}) => {
  return (
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
        {searchTypeButtons.searchText.buttonText}
      </span>

      <span
        onClick={() => setSearchType('searchNearby')}
        className={cn(
          styles.searchTypeButton,
          searchType === 'searchNearby' && styles.active
        )}
      >
        {' '}
        {searchTypeButtons.searchNearby.buttonText}{' '}
      </span>
    </div>
  );
};

export default function PlaceSelector({
  title,
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
        return 'Digite o nome do lugar, endereço ou qualquer termo que você lembrar. Vamos te ajudar com sugestões enquanto você digita.';

      // Search nearby
      case 'searchNearby':
        // Get the display name of the last activity
        const displayName = lastActivity?.place?.displayName?.text;
        return `Vamos te mostrar lugares próximos (até 50km) à sua última atividade${displayName ? ` em ${displayName}` : ''}. Ideal para descobrir novos locais na região.`;

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
        <SearchTypeButtons
          searchType={searchType}
          setSearchType={setSearchType}
          showSearchTypeButtons={showSearchTypeButtons}
        />
      </div>

      {/* Search */}
      <div className={styles.searchContainer}>
        <PlaceSearchSelect
          label={searchTypeButtons[searchType].label}
          placeholder={searchTypeButtons[searchType].placeholder}
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
  searchTypeButtons: 'flex gap-1 bg-midnight-blue/80 rounded-lg',
  searchTypeButton: 'text-xs cursor-pointer px-3 py-2 rounded-lg',
  active: 'bg-royal-purple text-white',
  loadingContainer: 'text-mist-gray flex items-center gap-2 text-sm',
  spinner:
    'border-mist-gray h-4 w-4 animate-spin rounded-full border-2 border-t-transparent',
  invisible: 'invisible',
};
