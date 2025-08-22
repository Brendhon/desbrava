'use client';

import { SearchSelect } from '@/components/form';
import { useCountries } from '@/hooks/useCountries';
import { SelectOption } from '@/lib/types';
import { Country } from '@/lib/types/country';
import { useEffect, useMemo, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface CountrySearchSelectProps {
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
}

/**
 * CountrySearchSelect component that provides dynamic country search using the countries API
 * with debouncing to avoid excessive API calls and support for initial/default values
 */
export default function CountrySearchSelect(  
  {
      label = 'País',
      error,
      size = 'md',
      variant = 'default',
      register,
      helperText = 'País principal da sua viagem',
      className = '',
      id,
      placeholder = 'Digite para buscar um país...',
      onValueChange,
      debounceDelay = 400,
      defaultValue,
      ...props
      }: CountrySearchSelectProps
  ) {
    // Internal state for selected value
    const [selectedValue, setSelectedValue] = useState<string>(
      defaultValue || ''
    );

    // Countries API
    const {
      countries,
      loading,
      error: searchError,
      searchTerm,
      setSearchTerm,
    } = useCountries('', debounceDelay);

    // Convert countries to SelectOption format with simplified labels for better compatibility
    const countryOptions: SelectOption[] = useMemo(() => {
      return countries.map((country: Country) => ({
        value: country.country,
        label: country.country,
        data: {
          image: country.flag,
          desc: country.continent,
          name: country.country,
        },
      }));
    }, [countries]);

    // Effect to apply the initial value after loading the countries
    useEffect(() => {
      if (defaultValue) {
        const initialValue = defaultValue || '';
        setSelectedValue(initialValue);

        // If no countries are loaded yet, make an initial search
        if (countries.length === 0 && initialValue.trim().length > 0) {
          setSearchTerm(initialValue);
        }
      }
    }, [defaultValue, countries.length, setSearchTerm]);

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

      // Update search term for API calls to the countries API
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
        ? 'Buscando países...'
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
          options={countryOptions}
          placeholder={placeholder}
          value={selectedValue}
          onValueChange={handleValueChange}
          {...props}
        />
      </div>
    );
  }
