'use client';

import { NavigationButtons } from '@/components/steps';
import { ACTIVITY_PLACE_PLACEHOLDERS } from '@/lib/types/activity';
import { Place } from '@/lib/types/places';
import { useCallback, useMemo, useState } from 'react';
import {
  PageHeader,
  PlaceSelector,
} from './destination';
import { ActivityTypeData } from './ActivityTypeSelector';

export interface DestinationData {
  place?: Place;
  destination?: Place;
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
  const [destinations, setDestinations] = useState<DestinationData>({});

  const [searchOrigin, setSearchOrigin] = useState('');
  const [searchDestination, setSearchDestination] = useState('');
  const [isSearchingOrigin, setIsSearchingOrigin] = useState(false);
  const [isSearchingDestination, setIsSearchingDestination] = useState(false);

  // Determine if this activity type needs multiple destinations
  const needsMultiple = useMemo(() => activityType.type === 'transportation', [activityType.type]);

  // Handle next step
  const handleNext = useCallback(() => {
    onNext({ place: destinations.place, destination: needsMultiple ? destinations.destination : undefined });
  }, [needsMultiple, destinations.place, destinations.destination, onNext]);

  // Check if can proceed
  const canProceed = useMemo(() => needsMultiple
    ? destinations.place && destinations.destination
    : destinations.destination, [needsMultiple, destinations.place, destinations.destination]);

  // Render
  return (
    <div className={styles.container}>
      {/* Page Header */}
      <PageHeader needsMultipleDestinations={needsMultiple} />

      {/* Selectors */}
      <div className={styles.selectorsContainer}>
        <PlaceSelector
          title={needsMultiple ? 'Ponto de partida' : 'Local da Atividade'}
          searchLabel={needsMultiple ? "Buscar local de origem" : 'Buscar local'}
          searchPlaceholder={ACTIVITY_PLACE_PLACEHOLDERS[activityType.type]}
          searchValue={searchOrigin}
          activityType={activityType.type}
          onSearchChange={setSearchOrigin}
          isSearching={isSearchingOrigin}
          selectedPlace={destinations.place}
          showBorder={needsMultiple}
        />

        {needsMultiple && (
          <PlaceSelector
            title="Local de destino"
            searchLabel="Buscar local de destino"
            searchPlaceholder="Digite para buscar cidades, aeroportos, estações..."
            searchValue={searchDestination}
            activityType={activityType.type}
            onSearchChange={setSearchDestination}
            isSearching={isSearchingDestination}
            selectedPlace={destinations.destination}
          />
        )}
      </div>

      {/* Navigation Buttons */}
      <NavigationButtons
        onBack={onBack}
        onNext={handleNext}
        canProceed={!!canProceed}
      />
    </div>
  );
}

const styles = {
  container: 'space-y-6',
  selectorsContainer: 'flex w-full flex-col gap-4 lg:flex-row',
};
