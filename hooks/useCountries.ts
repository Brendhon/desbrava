import { Continent, Country } from '@/lib/types/country';
import CountriesData from '@/public/data/countries.json';

interface UseCountriesReturn {
  countries: Country[];
  getCountryByName: (name: string) => Country;
  getCountryByCode: (code: string) => Country;
}

const defaultCountry: Country = {
  continent: Continent.Outro,
  id: 0,
  language: [],
  region: '',
  country: '',
  currency_code: '',
  currency_name_pt: '',
  iso_country: '',
};

const getCountries = () => CountriesData as Country[];

/**
 * Hook to search countries
 * @returns Object with countries data
 */
export function useCountries(): UseCountriesReturn {
  // Get country by name
  const getCountryByName = (name: string): Country => {
    const country = getCountries().find((country) => country.country === name);
    return country || defaultCountry;
  };

  // Get country by code
  const getCountryByCode = (code: string): Country => {
    const country = getCountries().find(
      (country) => country.iso_country === code
    );
    return country || defaultCountry;
  };

  return {
    countries: getCountries(),
    getCountryByName,
    getCountryByCode,
  };
}
