import {
  createInternalErrorResponse,
  createSuccessResponse,
  requireAuth,
} from '@/lib/utils';
import { getLastActivity } from '@/services/firebase/activity.service';
import { NextRequest, NextResponse } from 'next/server';

interface TripParams {
  params: Promise<{ tripId: string }>;
}

/**
 * GET /api/trips/[tripId]/activities/last
 * Get the last activity for a specific trip
 */
export async function GET(request: NextRequest, { params }: TripParams) {
  try {
    // Check authentication
    const authResult = await requireAuth();
    if (authResult instanceof NextResponse) return authResult;

    // Get the trip ID
    const { tripId } = await params;

    // Get the last activity
    const lastActivity = await getLastActivity(tripId);

    // Return the last activity
    return createSuccessResponse(lastActivity, undefined, 200);
  } catch (error) {
    return createInternalErrorResponse(error, 'fetching last activity');
  }
}
