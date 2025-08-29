'use client';

import { NavigationButtons } from '@/components/steps';
import { PageStructure } from '@/components/ui';
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

  // Handle next step
  const handleNext = useCallback(
    () => onNext(destinations),
    [destinations, onNext]
  );

  // Handle search change
  const handleSearchChange = useCallback((place?: Place) => {
    setDestinations((prev) => ({ ...prev, place }));
  }, []);

  // Handle search type change
  const handleSearchTypeChange = useCallback((searchType: SearchType) => {
    setDestinations((prev) => ({ ...prev, searchType }));
  }, []);

  // Render
  return (
    <PageStructure
      title="Onde será a atividade?"
      description="Selecione o local onde acontecerá a atividade"
    >
      {/* Selectors */}
      <PlaceSelector
        title={'Local da Atividade'}
        defaultData={defaultData}
        activityType={activityType}
        onSearchChange={handleSearchChange}
        onSearchTypeChange={handleSearchTypeChange}
        selectedPlace={destinations.place}
        showSearchTypeButtons={!!lastActivity?.place?.location}
        lastActivity={lastActivity}
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
