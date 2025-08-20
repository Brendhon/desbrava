import { NextRequest, NextResponse } from 'next/server';
import { getUserTrips, searchTrips } from '@/services/firebase/trip.service';
import {
  requireAuth,
  createSuccessResponse,
  createInternalErrorResponse,
} from '@/lib/utils';

/**
 * GET /api/trips
 * Get trips for the authenticated user
 * Query parameters:
 * - search: Search term for trip name, description, or country
 * - startDate: Filter trips starting from this date
 * - endDate: Filter trips ending before this date
 * - country: Filter trips by country code
 */
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const authResult = await requireAuth();
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const { userEmail } = authResult;
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const country = searchParams.get('country');

    let results;
    let total = 0;

    // If search parameters are provided, use search function
    if (search || startDate || endDate || country) {
      const filters = {
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        country: country || undefined,
      };

      results = await searchTrips(userEmail, search || undefined, filters);
      total = results.length;
    }
    // Default: get all user trips
    else {
      results = await getUserTrips(userEmail);
      total = results.length;
    }

    return createSuccessResponse(results, undefined, 200, {
      count: results.length,
      total,
      searchTerm: search || undefined,
      filters: {
        startDate,
        endDate,
        country,
      },
    });
  } catch (error) {
    return createInternalErrorResponse(error, 'fetching trips');
  }
}
