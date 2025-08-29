'use client';

import { SearchSelect, SearchSelectRef } from '@/components/form/selects';
import { usePlaces } from '@/hooks/usePlaces';
import { PlaceSearchSelectProps, SelectOption } from '@/lib/types';
import { Place } from '@/lib/types/places';
import { useEffect, useMemo, useRef, useState } from 'react';

const PlaceItem = ({ place }: { place: Place }) => {
  return <h3>{place.displayName.text}</h3>;
};

const getPlaceSelectOption = (place: Place): SelectOption => {
  return {
    value: place.id,
    label: place.displayName.text,
    item: <PlaceItem place={place} />,
  };
};

/**
 * PlaceSearchSelect component that provides dynamic place search using the Google Places API
 * with debouncing to avoid excessive API calls and support for initial/default values
 */
export default function PlaceSearchSelect({
  label = 'Local',
  error,
  size = 'md',
  variant = 'default',
  helperText = 'Local da sua viagem',
  className = '',
  id,
  placeholder = 'Digite para buscar um local...',
  onValueChange,
  debounceDelay = 500,
  defaultValue,
  searchType = 'searchText',
  activityType,
  latitude,
  longitude,
  radius,
  maxResults = 20,
  ...props
}: PlaceSearchSelectProps) {
  // Internal state for selected value
  const [selectedValue, setSelectedValue] = useState<SelectOption | undefined>(
    defaultValue ? getPlaceSelectOption(defaultValue) : undefined
  );
  // Internal state for search type
  const [searchTypeState, setSearchTypeState] = useState(searchType);

  // Ref for SearchSelect to call clear method
  const searchSelectRef = useRef<SearchSelectRef>(null);

  // Places API
  const {
    places,
    error: searchError,
    loading,
    setSearchTerm,
  } = usePlaces({
    initialSearchTerm: '',
    debounceDelay,
    activityType,
    latitude,
    longitude,
    radius,
    maxResults,
    searchType,
  });

  // Convert places to SelectOption format
  const placeOptions: SelectOption[] = useMemo(
    () => places?.map((place: Place) => getPlaceSelectOption(place)) || [],
    [places]
  );

  // Effect to apply the initial value after loading the places
  useEffect(() => {
    if (defaultValue) {
      const initialValue = getPlaceSelectOption(defaultValue);
      setSelectedValue(initialValue);
      setSearchTerm(initialValue.value);
      onValueChange?.(initialValue.value);
    }
  }, [defaultValue]);

  useEffect(() => {
    if (searchSelectRef.current && searchTypeState !== searchType) {
      searchSelectRef.current.clear();
      setSearchTypeState(searchType);
    }
  }, [searchType]);

  // Handle option selection and search updates
  const handleValueChange = (newValue: SelectOption) => {
    // Update internal state with the new value
    setSelectedValue(newValue);

    // Update search term for API calls to the places API
    setSearchTerm(newValue.value);

    // Call the original onValueChange if provided to the parent component
    onValueChange?.(newValue.value);
  };

  // Render the component
  return (
    <div className="w-full">
      <SearchSelect
        label={label}
        error={error || searchError}
        size={size}
        variant={variant}
        helperText={helperText}
        className={className}
        id={id}
        options={placeOptions}
        placeholder={placeholder}
        defaultValue={selectedValue}
        onInputChange={setSearchTerm}
        onSelect={handleValueChange}
        isLoading={loading}
        ref={searchSelectRef}
        {...props}
      />
    </div>
  );
}
