'use client';

import { SearchSelect } from '@/components/form';
import { usePlaces } from '@/hooks/usePlaces';
import { SelectOption } from '@/lib/types';
import { Place, PlaceType, PLACE_TYPES, getPlaceTypesByCategory } from '@/lib/types/places';
import { useEffect, useMemo, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface PlaceSearchSelectProps {
  label?: React.ReactNode;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'error' | 'success';
  register?: UseFormRegisterReturn;
  helperText?: string;
  className?: string;
  id?: string;
  placeholder?: string;
  onValueChange?: (value: string) => void;
  debounceDelay?: number;
  defaultValue?: string;
  placeTypes?: PlaceType[];
  latitude?: number;
  longitude?: number;
  radius?: number;
  maxResults?: number;
}

/**
 * PlaceSearchSelect component that provides dynamic place search using the Google Places API
 * with debouncing to avoid excessive API calls and support for initial/default values
 */
export default function PlaceSearchSelect({
  label = 'Local',
  error,
  size = 'md',
  variant = 'default',
  register,
  helperText = 'Local da sua viagem',
  className = '',
  id,
  placeholder = 'Digite para buscar um local...',
  onValueChange,
  debounceDelay = 2000,
  defaultValue,
  placeTypes = getPlaceTypesByCategory('other'),
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
    defaultTypes: placeTypes,
    latitude,
    longitude,
    radius,
    maxResults,
  });

  // Convert places to SelectOption format
  const placeOptions: SelectOption[] = useMemo(() => {
    return places.map((place: Place) => ({
      value: place.id,
      label: place.displayName.text,
      data: {
        name: place.displayName.text,
        address: place.formattedAddress,
        types: place.types,
        location: place.location,
      },
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
  }, [defaultValue, places.length, setSearchTerm]);

  // Effect to synchronize with external changes in value
  useEffect(() => {
    if (defaultValue !== undefined && defaultValue !== selectedValue) {
      setSelectedValue(defaultValue);
    }
  }, [defaultValue, selectedValue]);

  // Handle option selection and search updates
  const handleValueChange = (newValue: string) => {
    // Update internal state with the new value
    setSelectedValue(newValue);

    // Update search term for API calls to the places API
    setSearchTerm(newValue);

    // Call the original onValueChange if provided to the parent component
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  // Show loading state or error in helper text if there is an error
  const displayHelperText = searchError
    ? `Erro na busca: ${searchError}`
    : loading && searchTerm.trim().length >= 2
      ? 'Buscando locais...'
      : helperText;

  return (
    <div className="w-full">
      <SearchSelect
        label={label}
        error={error}
        size={size}
        variant={variant}
        register={register}
        helperText={displayHelperText}
        className={className}
        id={id}
        options={placeOptions}
        placeholder={placeholder}
        value={selectedValue}
        onValueChange={handleValueChange}
        {...props}
      />
    </div>
  );
}
