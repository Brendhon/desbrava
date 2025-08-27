import { NextRequest, NextResponse } from 'next/server';
import {
  getTripById,
  updateTrip,
  deleteTrip,
} from '@/services/firebase/trip.service';
import { UpdateTripData } from '@/lib/types/trip';
import {
  requireAuth,
  createSuccessResponse,
  createErrorResponse,
  checkResourceOwnership,
  createNotFoundResponse,
  createInternalErrorResponse,
} from '@/lib/utils';

interface TripParams {
  params: Promise<{ tripId: string }>;
}
/**
 * GET /api/trips/[tripId]
 * Get a specific trip by ID
 */
export async function GET(
  request: NextRequest,
  { params }: TripParams
) {
  try {
    // Check authentication
    const authResult = await requireAuth();
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const { userEmail } = authResult;
    const { tripId } = await params;
    const trip = await getTripById(tripId);

    if (!trip) {
      return createNotFoundResponse('Trip');
    }

    // Check if the trip belongs to the authenticated user
    const ownershipError = checkResourceOwnership(trip.user, userEmail, 'trip');
    if (ownershipError) {
      return ownershipError;
    }

    return createSuccessResponse(trip);
  } catch (error) {
    return createInternalErrorResponse(error, 'fetching trip');
  }
}

/**
 * PUT /api/trips/[tripId]
 * Update a specific trip
 */
export async function PUT(
  request: NextRequest,
  { params }: TripParams
) {
  try {
    // Check authentication
    const authResult = await requireAuth();
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const { userEmail } = authResult;
    const { tripId } = await params;

    // Check if trip exists and belongs to user
    const existingTrip = await getTripById(tripId);
    if (!existingTrip) {
      return createNotFoundResponse('Trip');
    }

    const ownershipError = checkResourceOwnership(
      existingTrip.user,
      userEmail,
      'trip'
    );
    if (ownershipError) {
      return ownershipError;
    }

    // Parse request body
    const body = await request.json();
    const updateData: UpdateTripData = body;

    // Validate that at least one field is provided
    const hasUpdates = Object.values(updateData).some(
      (value) => value !== undefined
    );
    if (!hasUpdates) {
      return createErrorResponse(
        'Bad request',
        'At least one field must be provided for update',
        400
      );
    }

    // Update the trip
    await updateTrip(tripId, updateData);

    // Get the updated trip
    const updatedTrip = await getTripById(tripId);

    return createSuccessResponse(updatedTrip, 'Trip updated successfully');
  } catch (error) {
    return createInternalErrorResponse(error, 'update trip');
  }
}

/**
 * DELETE /api/trips/[tripId]
 * Delete a specific trip
 */
export async function DELETE(
  request: NextRequest,
  { params }: TripParams
) {
  try {
    // Check authentication
    const authResult = await requireAuth();
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const { userEmail } = authResult;
    const { tripId } = await params;

    // Check if trip exists and belongs to user
    const existingTrip = await getTripById(tripId);
    if (!existingTrip) {
      return createNotFoundResponse('Trip');
    }

    const ownershipError = checkResourceOwnership(
      existingTrip.user,
      userEmail,
      'trip'
    );
    if (ownershipError) {
      return ownershipError;
    }

    // Delete the trip
    await deleteTrip(tripId);

    return createSuccessResponse(null, 'Trip deleted successfully');
  } catch (error) {
    return createInternalErrorResponse(error, 'delete trip');
  }
}
