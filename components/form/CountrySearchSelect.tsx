'use client';

import { SearchSelect } from '@/components/form';
import { SelectOption } from '@/lib/types';
import { Country } from '@/lib/types/country';
import CountriesData from '@/public/data/countries.json';
import { useMemo } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface CountrySearchSelectProps {
  label?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'error' | 'success';
  helperText?: string;
  className?: string;
  id?: string;
  placeholder?: string;
  defaultValue?: string; // Country code
  register?: UseFormRegisterReturn;
}

const CountryItem = ({ country }: { country: Country }) => {
  return (
    <div className={styles.renderOptionContent}>
      <span className={styles.renderOptionContentEmoji}>
        {country.emoji}
      </span>
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
  register,
  defaultValue,
}: CountrySearchSelectProps) {
  // Country options
  const countryOptions = useMemo(() => getCountries(), []);

  // Render the component
  return (
    <div className={styles.container}>
      <SearchSelect
        label={label}
        error={error}
        size={size}
        register={register}
        variant={variant}
        helperText={helperText}
        className={className}
        id={id}
        options={countryOptions}
        placeholder={placeholder}
        defaultValue={countryOptions.find((option) => option.value === defaultValue)}
      />
    </div>
  );
}

const styles = {
  container: 'w-full',
  renderOptionContent: 'flex items-center gap-2 w-full',
  renderOptionContentEmoji: 'w-4 h-4 rounded-sm',
  renderOptionContentDesc: 'text-xs text-mist-gray ml-auto flex-shrink-0',
  renderOptionContentLabel: 'flex-1 truncate',
};