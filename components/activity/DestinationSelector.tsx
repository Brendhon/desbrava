'use client';

import { NavigationButtons } from '@/components/steps';
import { usePlaceTypes } from '@/hooks/usePlaceTypes';
import { Place } from '@/lib/types/places';
import { useCallback, useState } from 'react';
import { ActivityTypeData } from './ActivityTypeSelector';
import { PageHeader, PlaceSelector } from './destination';

export interface DestinationData {
  place?: Place;
  searchType: 'searchText' | 'searchNearby' | 'street';
}

interface DestinationSelectorProps {
  activityType: ActivityTypeData;
  onNext: (destinations: DestinationData) => void;
  onBack: () => void;
}

export default function DestinationSelector({
  activityType,
  onNext,
  onBack,
}: DestinationSelectorProps) {
  const [destinations, setDestinations] = useState<DestinationData>({
    searchType: 'searchText',
  });

  const [searchOrigin, setSearchOrigin] = useState('');
  const [isSearchingOrigin, setIsSearchingOrigin] = useState(false);

  // Hooks
  const { getSubtypeLabel } = usePlaceTypes();

  // Handle next step
  const handleNext = useCallback(() => {
    onNext({
      place: destinations.place,
      searchType: destinations.searchType,
    });
  }, [destinations.place, destinations.searchType, onNext]);

  // Form placeholder 
  const placeholder = useCallback(() => {
    const localName = getSubtypeLabel(activityType.type, activityType.subType);
    return `Digite o nome do(a) ${localName.toLowerCase()} desejado`;
  }, [activityType]);

  // Render
  return (
    <div className={styles.container}>
      {/* Page Header */}
      <PageHeader needsMultipleDestinations={false} />

      {/* Selectors */}
      <div className={styles.selectorsContainer}>
        <PlaceSelector
          title={'Local da Atividade'}
          searchLabel={'Buscar local'}
          searchPlaceholder={placeholder()}
          searchValue={searchOrigin}
          activityType={activityType}
          onSearchChange={setSearchOrigin}
          isSearching={isSearchingOrigin}
          selectedPlace={destinations.place}
          showBorder={false}
        />
      </div>

      {/* Navigation Buttons */}
      <NavigationButtons
        onBack={onBack}
        onNext={handleNext}
        canProceed={!!destinations.place}
      />
    </div>
  );
}

const styles = {
  container: 'space-y-6',
  selectorsContainer: 'flex w-full flex-col gap-4 lg:flex-row',
};
