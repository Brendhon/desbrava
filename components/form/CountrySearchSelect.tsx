'use client';

import { forwardRef, useMemo } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { useCountries } from '@/hooks/useCountries';
import { Country } from '@/lib/types/country';
import { SelectOption } from '@/lib/types';
import SearchSelect from './SearchSelect';

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
}

/**
 * CountrySearchSelect component that provides dynamic country search using the countries API
 * with debouncing to avoid excessive API calls
 */
const CountrySearchSelect = forwardRef<
  HTMLInputElement,
  CountrySearchSelectProps
>(
  (
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
      ...props
    },
    ref
  ) => {
    const {
      countries,
      loading,
      error: searchError,
      searchTerm,
      setSearchTerm,
    } = useCountries('', debounceDelay);

    // Convert countries to SelectOption format with simplified labels
    const countryOptions: SelectOption[] = useMemo(() => {
      return countries.map((country: Country) => ({
        value: country.country,
        label: country.country, // Simplified label for better compatibility
        // Store additional data for display purposes
        data: {
          image: country.flag,
          desc: country.continent,
          name: country.country,
        },
      }));
    }, [countries]);

    // Handle option selection and search updates
    const handleValueChange = (value: string) => {
      // Update search term for API calls
      setSearchTerm(value);

      // Call the original onValueChange if provided
      if (onValueChange) {
        onValueChange(value);
      }
    };

    // Show loading state or error in helper text
    const displayHelperText = searchError
      ? `Erro na busca: ${searchError}`
      : loading && searchTerm.trim().length >= 2
        ? 'Buscando países...'
        : helperText;

    return (
      <div className="w-full">
        <SearchSelect
          ref={ref}
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
          iconPosition="left"
          onValueChange={handleValueChange}
          {...props}
        />
      </div>
    );
  }
);

CountrySearchSelect.displayName = 'CountrySearchSelect';

export default CountrySearchSelect;
