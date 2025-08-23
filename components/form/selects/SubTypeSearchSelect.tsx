'use client';

import { SearchSelect, SearchSelectRef } from '@/components/form/selects';
import { usePlaceTypes } from '@/hooks/usePlaceTypes';
import { SelectOption, SubTypeSearchSelectProps } from '@/lib/types';
import { useEffect, useRef, useState } from 'react';

/**
 * SubTypeSearchSelect component that provides dynamic subtype search for activity types
 * using the place types data with support for initial/default values
 */
export default function SubTypeSearchSelect({
  label = 'Tipo de atividade',
  error,
  size = 'md',
  variant = 'default',
  helperText = 'Selecione o tipo específico de atividade',
  className = '',
  id,
  placeholder = 'Selecione o tipo de atividade',
  register,
  defaultValue,
  activityType,
  onSelect,
}: SubTypeSearchSelectProps) {
  // States
  const [subTypeOptions, setSubTypeOptions] = useState<SelectOption[]>([]);
  const [defaultValueOption, setDefaultValueOption] = useState<SelectOption | undefined>(undefined);

  // Ref for SearchSelect to call clear method
  const searchSelectRef = useRef<SearchSelectRef>(null);

  // Use place types hook
  const { getPlaceOptionsByType, getSubtypesByType } = usePlaceTypes();

  useEffect(() => {
    // Update subtypes options
    if (activityType) {
      // Clear the input before updating options
      searchSelectRef.current?.clear();

      // Get subtypes options for the selected activity type
      const options = getPlaceOptionsByType(activityType);

      // Update subtypes options
      setSubTypeOptions(options);
    } else setSubTypeOptions([]);
  }, [activityType]);

  useEffect(() => {
    // Set default value option
    defaultValue && activityType
      ? setDefaultValueOption(getSubtypesByType(activityType, defaultValue))
      : setDefaultValueOption(undefined);
  }, [defaultValue, activityType, getSubtypesByType]);

  // Don't render if no activity type is selected
  if (!activityType) return null;

  // Render the component
  return (
    <div className={styles.container}>
      <SearchSelect
        label={label}
        error={error}
        size={size}
        register={register}
        variant={variant}
        position="top"
        helperText={helperText}
        className={className}
        id={id}
        options={subTypeOptions}
        placeholder={placeholder}
        defaultValue={defaultValueOption}
        onSelect={(option: SelectOption) => onSelect?.(option)}
        ref={searchSelectRef}
      />
    </div>
  );
}

const styles = {
  container: 'w-full',
};
