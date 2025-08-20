import { NextRequest } from 'next/server';
import { Country } from '@/lib/types/country';
import countriesData from '@/public/data/countries.json';
import {
  createSuccessResponse,
  createErrorResponse,
  createNotFoundResponse,
  createInternalErrorResponse,
} from '@/lib/utils';

/**
 * GET /api/countries/[name]
 * Get country by name
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params;

    if (!name) {
      return createErrorResponse(
        'Invalid name format',
        'Country name is required',
        400
      );
    }

    const country = (countriesData as Country[]).find(
      (c) => c.country === name
    );

    if (!country) {
      return createNotFoundResponse('Country');
    }

    return createSuccessResponse(country);
  } catch (error) {
    return createInternalErrorResponse(error, 'fetch country');
  }
}
