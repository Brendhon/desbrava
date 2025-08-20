import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { 
  getUserTrips, 
  searchTrips
} from '@/services/firebase/trip.service';

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
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized',
          message: 'You must be logged in to access trips'
        },
        { status: 401 }
      );
    }

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
        country: country || undefined
      };
      
      results = await searchTrips(session.user.email, search || undefined, filters);
      total = results.length;
    } 
    // Default: get all user trips
    else {
      results = await getUserTrips(session.user.email);
      total = results.length;
    }

    return NextResponse.json({
      success: true,
      data: results,
      count: results.length,
      total,
      searchTerm: search,
      filters: {
        startDate,
        endDate,
        country
      }
    });

  } catch (error) {
    console.error('Error fetching trips:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'Failed to fetch trips'
      },
      { status: 500 }
    );
  }
}
