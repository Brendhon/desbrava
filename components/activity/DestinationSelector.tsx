'use client';

import { NavigationButtons } from '@/components/steps';
import { ACTIVITY_PLACE_PLACEHOLDERS } from '@/lib/types/activity';
import { Place } from '@/lib/types/places';
import { useCallback, useState } from 'react';
import { PageHeader, PlaceSelector } from './destination';
import { ActivityTypeData } from './ActivityTypeSelector';

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

  // Handle next step
  const handleNext = useCallback(() => {
    onNext({
      place: destinations.place,
      searchType: destinations.searchType,
    });
  }, [destinations.place, destinations.searchType, onNext]);

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
          searchPlaceholder={ACTIVITY_PLACE_PLACEHOLDERS[activityType.type]}
          searchValue={searchOrigin}
          activityType={activityType.type}
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
