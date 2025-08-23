'use client';

import { SearchSelect } from '@/components/form/selects';
import { SelectOption } from '@/lib/types';
import { Country } from '@/lib/types/country';
import { useEffect, useState } from 'react';
import { CountrySearchSelectProps } from '@/lib/types';
import { useCountries } from '@/hooks';

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

  // States
  const [countriesOptions, setCountriesOptions] = useState<SelectOption[]>([]);
  const [defaultValueOption, setDefaultValueOption] = useState<SelectOption | undefined>(undefined);

  // Use countries hook
  const { countries } = useCountries();

  useEffect(() => {  
    // Get countries options
    const options = countries.map((c) => ({
      value: c.iso_country || c.country,
      label: c.country,
      item: <CountryItem country={c} />,
    }));

    // Return countries
    setCountriesOptions(options);
  }, [countries]);

  useEffect(() => {
    // Get default value option
    const defaultValueOption = countriesOptions.find((o) => o.value === defaultValue);

    // Set default value option
    setDefaultValueOption(defaultValueOption);
  }, [countriesOptions, defaultValue]);

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
        options={countriesOptions}
        placeholder={placeholder}
        defaultValue={defaultValueOption}
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