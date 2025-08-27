import {
  createInternalErrorResponse,
  createSuccessResponse,
  requireAuth,
} from '@/lib/utils';
import {
  getTripActivities,
  searchTripActivities,
} from '@/services/firebase/activity.service';
import { NextRequest, NextResponse } from 'next/server';

interface TripParams {
  params: Promise<{ tripId: string }>;
}

/**
 * GET /api/trips/[tripId]/activities
 * Get activities for a specific trip
 * Query parameters:
 * - tripId: ID of the trip to get activities for (required)
 * - search: Search term for activity description or place name
 * - type: Filter activities by type
 * - subType: Filter activities by subType
 * - startDate: Filter activities starting from this date
 * - endDate: Filter activities ending before this date
 */
export async function GET(request: NextRequest, { params }: TripParams) {
  try {
    // Check authentication
    const authResult = await requireAuth();
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const { tripId } = await params;
    const { searchParams } = new URL(request.url);

    const search = searchParams.get('search');
    const type = searchParams.get('type');
    const subType = searchParams.get('subType');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    let results;
    let total = 0;

    // If search parameters or filters are provided, use search function
    if (search || type || subType || startDate || endDate) {
      const filters = {
        type: type || undefined,
        subType: subType || undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
      };

      results = await searchTripActivities(
        tripId,
        search || undefined,
        filters
      );
      total = results.length;
    }
    // Default: get all trip activities
    else {
      results = await getTripActivities(tripId);
      total = results.length;
    }

    return createSuccessResponse(results, undefined, 200, {
      count: results.length,
      total,
      searchTerm: search || undefined,
      filters: {
        tripId,
        type,
        subType,
        startDate,
        endDate,
      },
    });
  } catch (error) {
    return createInternalErrorResponse(error, 'fetching activities');
  }
}
