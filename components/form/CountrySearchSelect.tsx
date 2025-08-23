'use client';

import { SearchSelect } from '@/components/form';
import { SelectOption } from '@/lib/types';
import { Country } from '@/lib/types/country';
import { useState } from 'react';
import CountriesData from '@/public/data/countries.json';

interface CountrySearchSelectProps {
  label?: React.ReactNode;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'error' | 'success';
  helperText?: string;
  className?: string;
  id?: string;
  placeholder?: string;
  onValueChange?: (value: string) => void;
  debounceDelay?: number;
  defaultValue?: string;
}

const CountryItem = ({ country }: { country: Country }) => {
  return (
    <div className={styles.renderOptionContent}>
      <span className={styles.renderOptionContentLabel}>
        {country.country}
      </span>
      {country.continent && (
        <span className={styles.renderOptionContentDesc}>
          {country.continent}
        </span>
      )}
    </div>
  );
};

const getCountries = (): SelectOption[] => {
  // Get countries
  const countries = CountriesData as Country[];

  // Check if countries exists
  if (!countries) return [];

  // Return countries
  return countries.map((c) => ({
    value: c.iso_country || c.country,
    label: c.country,
    item: <CountryItem country={c} />,
  }));
};

/**
 * CountrySearchSelect component that provides dynamic country search using the countries API
 * with debouncing to avoid excessive API calls and support for initial/default values
 */
export default function CountrySearchSelect({
  label = 'País',
  error,
  size = 'md',
  variant = 'default',
  helperText = 'País principal da sua viagem',
  className = '',
  id,
  placeholder = 'Digite para buscar um país...',
  onValueChange,
  debounceDelay = 400,
  defaultValue = '',
}: CountrySearchSelectProps) {
  // Internal state for selected value
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue);

  // Search term
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Country options
  const [countryOptions, setCountryOptions] = useState<SelectOption[]>(getCountries());

  // Handle option selection and search updates
  const handleValueChange = (newValue: SelectOption) => {
    // Update internal state with the new value
    setSelectedValue(newValue.value);

    // Update search term for API calls to the countries API
    setSearchTerm(newValue.value);

    // Call the original onValueChange if provided to the parent component
    if (onValueChange) {
      onValueChange(newValue.value);
    }
  };

  return (
    <div className="w-full">
      <SearchSelect
        label={label}
        error={error}
        size={size}
        variant={variant}
        helperText={helperText}
        className={className}
        id={id}
        options={countryOptions}
        placeholder={placeholder}
        value={selectedValue}
        defaultValue={countryOptions.find((option) => option.value === defaultValue)}
        onSelect={handleValueChange}
        onInputChange={setSearchTerm}
      />
    </div>
  );
}

const styles = {
  renderOptionContent: 'flex items-center gap-2 w-full',
  renderOptionContentImage: 'w-4 h-4 rounded-sm object-cover flex-shrink-0',
  renderOptionContentDesc: 'text-xs text-mist-gray ml-auto flex-shrink-0',
  renderOptionContentLabel: 'flex-1 truncate',
};