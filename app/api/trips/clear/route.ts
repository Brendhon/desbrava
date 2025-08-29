import {
  createInternalErrorResponse,
  createSuccessResponse,
  requireAuth
} from '@/lib/utils';
import { deleteAllTripsByUser } from '@/services/firebase';
import { NextResponse } from 'next/server';

/**
 * DELETE /api/trips/clear
 * Clear all trips for the authenticated user
 */
export async function DELETE() {
  try {
    // Check authentication
    const authResult = await requireAuth();

    // Check if the user is authenticated
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    // Get the user email
    const { userEmail } = authResult;

    // Delete all trips for the user
    await deleteAllTripsByUser(userEmail);

    // Return success response
    return createSuccessResponse(null, 'All trips cleared successfully');
  } catch (error) {
    return createInternalErrorResponse(error, 'fetching trip');
  }
}
