'use client';

import { NavigationButtons } from '@/components/steps';
import { usePlaceTypes } from '@/hooks/usePlaceTypes';
import { Place } from '@/lib/types/places';
import { Fragment, useCallback, useState } from 'react';
import { ActivityTypeData } from './ActivityTypeSelector';
import { PageHeader, PlaceSelector } from './destination';
import { SearchType } from '@/lib/types';

export interface DestinationData {
  place?: Place;
  searchType: SearchType;
}

interface DestinationSelectorProps {
  defaultData?: DestinationData;
  activityType: ActivityTypeData;
  onNext: (destinations: DestinationData) => void;
  onBack: () => void;
}

export default function DestinationSelector({
  defaultData,
  activityType,
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
    <Fragment>
      {/* Page Header */}
      <PageHeader needsMultipleDestinations={false} />

      {/* Selectors */}
      <PlaceSelector
        title={'Local da Atividade'}
        searchLabel={'Buscar local'}
        searchPlaceholder={placeholder()}
        defaultData={defaultData}
        activityType={activityType}
        onSearchChange={handleSearchChange}
        selectedPlace={destinations.place}
        showBorder={false}
      />

      {/* Navigation Buttons */}
      <NavigationButtons
        onBack={onBack}
        onNext={handleNext}
        canProceed={!!destinations.place}
      />
    </Fragment>
  );
}
