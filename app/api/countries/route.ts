import { NextRequest } from 'next/server';
import {
  findBestMatch,
  containsString,
  createSuccessResponse,
  createInternalErrorResponse,
} from '@/lib/utils';
import { Country } from '@/lib/types/country';
import countriesData from '@/public/data/countries.json';

/**
 * GET /api/countries
 * Search for countries by name
 * Query parameters:
 * - name: Country name to search for
 * - exact: Whether to search for exact matches only (default: false)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');
    const exact = searchParams.get('exact') === 'true';

    // If no name provided, return all countries
    if (!name) {
      return createSuccessResponse(countriesData, undefined, 200, {
        count: countriesData.length,
      });
    }

    let results: Country[] = [];

    if (exact) {
      // Search for exact matches using normalized comparison
      results = (countriesData as Country[]).filter(
        (country) => findBestMatch(name, [country.country]) === country.country
      );
    } else {
      // Search for partial matches
      results = (countriesData as Country[]).filter((country) =>
        containsString(country.country, name)
      );
    }

    // If no exact matches found, try to find similar matches
    if (results.length === 0 && !exact) {
      const countryNames = (countriesData as Country[]).map((c) => c.country);
      const bestMatch = findBestMatch(name, countryNames);

      if (bestMatch) {
        results = (countriesData as Country[]).filter(
          (country) => country.country === bestMatch
        );
      }
    }

    return createSuccessResponse(results, undefined, 200, {
      count: results.length,
      searchTerm: name,
      exact: exact,
    });
  } catch (error) {
    return createInternalErrorResponse(error, 'search countries');
  }
}
