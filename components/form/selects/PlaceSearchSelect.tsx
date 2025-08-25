'use client';

import { SearchSelect } from '@/components/form/selects';
import { usePlaces } from '@/hooks/usePlaces';
import { PlaceSearchSelectProps, SelectOption } from '@/lib/types';
import { Place } from '@/lib/types/places';
import { useEffect, useMemo, useState } from 'react';

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
  debounceDelay = 2000,
  defaultValue,
  placeType,
  latitude,
  longitude,
  radius = 50000,
  maxResults = 20,
  ...props
}: PlaceSearchSelectProps) {
  // Internal state for selected value
  const [selectedValue, setSelectedValue] = useState<string>(
    defaultValue || ''
  );

  // Places API
  const {
    places,
    loading,
    error: searchError,
    searchTerm,
    setSearchTerm,
  } = usePlaces({
    initialSearchTerm: '',
    debounceDelay,
    defaultType: placeType,
    latitude,
    longitude,
    radius,
    maxResults,
  });

  const PlaceItem = ({ place }: { place: Place }) => {
    return (
      <div className={styles.placeItem}>
        <h3>{place.displayName.text}</h3>
        <p>{place.formattedAddress}</p>
        <p>{place.types.join(', ')}</p>
        <p>
          {place.location.latitude}, {place.location.longitude}
        </p>
      </div>
    );
  };

  // Convert places to SelectOption format
  const placeOptions: SelectOption[] = useMemo(() => {
    return places.map((place: Place) => ({
      value: place.id,
      label: place.displayName.text,
      item: <PlaceItem place={place} />,
    }));
  }, [places]);

  // Effect to apply the initial value after loading the places
  useEffect(() => {
    if (defaultValue) {
      const initialValue = defaultValue || '';
      setSelectedValue(initialValue);

      // If no places are loaded yet, make an initial search
      if (places.length === 0 && initialValue.trim().length > 0) {
        setSearchTerm(initialValue);
      }
    }
  }, [defaultValue]);

  // Handle option selection and search updates
  const handleValueChange = (newValue: SelectOption) => {
    // Update internal state with the new value
    setSelectedValue(newValue.value);

    // Update search term for API calls to the places API
    setSearchTerm(newValue.value);

    // Call the original onValueChange if provided to the parent component
    if (onValueChange) {
      onValueChange(newValue.value);
    }
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
        value={selectedValue}
        onInputChange={setSearchTerm}
        onSelect={handleValueChange}
        {...props}
      />
    </div>
  );
}

const styles = {
  placeItem: 'flex flex-col gap-2',
};
