'use client';

import { SearchSelect } from '@/components/form/selects';
import { usePlaceTypes } from '@/hooks/usePlaceTypes';
import { SelectOption } from '@/lib/types';
import { ActivityTypeKey } from '@/lib/types/activity';
import { useEffect, useState } from 'react';

export interface SubTypeSearchSelectProps {
  label?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'error' | 'success';
  helperText?: string;
  className?: string;
  id?: string;
  placeholder?: string;
  register?: any;
  defaultValue?: string;
  activityType: ActivityTypeKey;
  onSelect?: (option: SelectOption) => void;
}

/**
 * SubTypeSearchSelect component that provides dynamic activity subtype search
 * based on the selected activity type, with support for initial/default values
 */
export default function SubTypeSearchSelect({
  label = 'Tipo de atividade',
  error,
  size = 'md',
  variant = 'default',
  helperText = 'Selecione o tipo específico de atividade',
  className = '',
  id,
  placeholder = 'Selecione o tipo de atividade...',
  register,
  defaultValue,
  activityType,
  onSelect,
}: SubTypeSearchSelectProps) {

  // States
  const [subTypeOptions, setSubTypeOptions] = useState<SelectOption[]>([]);
  const [defaultValueOption, setDefaultValueOption] = useState<SelectOption | undefined>(undefined);

  // Use place types hook
  const { getPlaceOptionsByType, getSubtypesByType } = usePlaceTypes();

  useEffect(() => {
    // Get subtype options based on activity type
    if (activityType) {
      const options = getPlaceOptionsByType(activityType);

      // Set subtype options
      setSubTypeOptions(options);
    }
  }, [activityType, getPlaceOptionsByType]);

  useEffect(() => {
    // Get default value option
    if (activityType && defaultValue) {
      const defaultValueOption = getSubtypesByType(activityType, defaultValue);

      // Set default value option
      setDefaultValueOption(defaultValueOption);
    } else {
      setDefaultValueOption(undefined);
    }
  }, [defaultValue, activityType, getSubtypesByType]);

  // Handle select change
  const handleSelect = (option: SelectOption) => {
    if (onSelect) {
      onSelect(option);
    }
  };

  // Render the component
  return (
    <SearchSelect
      label={label}
      error={error}
      size={size}
      register={register}
      variant={variant}
      helperText={helperText}
      className={className}
      id={id}
      options={subTypeOptions}
      placeholder={placeholder}
      defaultValue={defaultValueOption || undefined}
      onSelect={handleSelect}
    />
  );
}
