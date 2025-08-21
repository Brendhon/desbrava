'use client';

import { SearchSelect } from '@/components/form';
import { useCountries } from '@/hooks/useCountries';
import { SelectOption } from '@/lib/types';
import { Country } from '@/lib/types/country';
import { forwardRef, useEffect, useMemo, useState } from 'react';
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
      defaultValue,
      ...props
    },
    ref
  ) => {
    // Estado interno para controlar o valor selecionado
    const [selectedValue, setSelectedValue] = useState<string>(
      defaultValue || ''
    );

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

    // Effect para aplicar o valor inicial após carregar os países
    useEffect(() => {
      if (defaultValue) {
        const initialValue = defaultValue || '';
        setSelectedValue(initialValue);

        // Se não há países carregados ainda, fazer uma busca inicial
        if (countries.length === 0 && initialValue.trim().length > 0) {
          setSearchTerm(initialValue);
        }
      }
    }, [defaultValue, countries.length, setSearchTerm]);

    // Effect para sincronizar com mudanças externas de value
    useEffect(() => {
      if (defaultValue !== undefined && defaultValue !== selectedValue) {
        setSelectedValue(defaultValue);
      }
    }, [defaultValue, selectedValue]);

    // Handle option selection and search updates
    const handleValueChange = (newValue: string) => {
      // Update internal state
      setSelectedValue(newValue);

      // Update search term for API calls
      setSearchTerm(newValue);

      // Call the original onValueChange if provided
      if (onValueChange) {
        onValueChange(newValue);
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
          value={selectedValue}
          onValueChange={handleValueChange}
          {...props}
        />
      </div>
    );
  }
);

CountrySearchSelect.displayName = 'CountrySearchSelect';

export default CountrySearchSelect;
