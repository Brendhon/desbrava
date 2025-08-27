'use client';

import { NavigationButtons } from '@/components/steps';
import { PageStructure } from '@/components/ui';
import { usePlaceTypes } from '@/hooks/usePlaceTypes';
import { Activity, SearchType } from '@/lib/types';
import { Place } from '@/lib/types/places';
import { useCallback, useState } from 'react';
import { ActivityTypeData } from './ActivityTypeSelector';
import { PlaceSelector } from './destination';

export interface DestinationData {
  place?: Place;
  searchType: SearchType;
}

interface DestinationSelectorProps {
  defaultData?: DestinationData;
  activityType: ActivityTypeData;
  lastActivity: Activity | null;
  onNext: (destinations: DestinationData) => void;
  onBack: () => void;
}

export default function DestinationSelector({
  defaultData,
  activityType,
  lastActivity,
  onNext,
  onBack,
}: DestinationSelectorProps) {
  const [destinations, setDestinations] = useState<DestinationData>(
    defaultData || {
      searchType: 'searchText',
    }
  );

  // Hooks
  const { getSubtypeLabel } = usePlaceTypes();

  // Handle next step
  const handleNext = useCallback(
    () => onNext(destinations),
    [destinations, onNext]
  );

  // Handle search change
  const handleSearchChange = useCallback((place?: Place) => {
    setDestinations((prev) => ({ ...prev, place }));
  }, []);

  // Form placeholder
  const placeholder = useCallback(() => {
    const localName = getSubtypeLabel(activityType.type, activityType.subType);
    return `Digite o nome do(a) ${localName.toLowerCase()} desejado`;
  }, [activityType]);

  // Render
  return (
    <PageStructure
      title="Onde será a atividade?"
      description="Selecione o local onde acontecerá a atividade"
    >
      {/* Selectors */}
      <PlaceSelector
        title={'Local da Atividade'}
        searchLabel={'Buscar local'}
        searchPlaceholder={placeholder()}
        defaultData={defaultData}
        activityType={activityType}
        onSearchChange={handleSearchChange}
        selectedPlace={destinations.place}
        showSearchTypeButtons={!!lastActivity}
      />

      {/* Navigation Buttons */}
      <NavigationButtons
        onBack={onBack}
        onNext={handleNext}
        canProceed={!!destinations.place}
      />
    </PageStructure>
  );
}
