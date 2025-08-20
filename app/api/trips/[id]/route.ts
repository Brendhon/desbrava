import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import {
  getTripById,
  updateTrip,
  deleteTrip,
} from '@/services/firebase/trip.service';
import { UpdateTripData } from '@/lib/types/trip';

/**
 * GET /api/trips/[id]
 * Get a specific trip by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized',
          message: 'You must be logged in to access trips',
        },
        { status: 401 }
      );
    }

    const tripId = params.id;
    const trip = await getTripById(tripId);

    if (!trip) {
      return NextResponse.json(
        {
          success: false,
          error: 'Not found',
          message: 'Trip not found',
        },
        { status: 404 }
      );
    }

    // Check if the trip belongs to the authenticated user
    if (trip.userId !== session.user.id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Forbidden',
          message: 'You can only access your own trips',
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      data: trip,
    });
  } catch (error) {
    console.error('Error fetching trip:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'Failed to fetch trip',
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/trips/[id]
 * Update a specific trip
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized',
          message: 'You must be logged in to update trips',
        },
        { status: 401 }
      );
    }

    const tripId = params.id;

    // Check if trip exists and belongs to user
    const existingTrip = await getTripById(tripId);
    if (!existingTrip) {
      return NextResponse.json(
        {
          success: false,
          error: 'Not found',
          message: 'Trip not found',
        },
        { status: 404 }
      );
    }

    if (existingTrip.userId !== session.user.id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Forbidden',
          message: 'You can only update your own trips',
        },
        { status: 403 }
      );
    }

    // Parse request body
    const body = await request.json();
    const updateData: UpdateTripData = body;

    // Validate required fields
    if (
      !updateData.name &&
      !updateData.description &&
      !updateData.startDate &&
      !updateData.endDate &&
      !updateData.country
    ) {
      return NextResponse.json(
        {
          success: false,
          error: 'Bad request',
          message: 'At least one field must be provided for update',
        },
        { status: 400 }
      );
    }

    // Update the trip
    await updateTrip(tripId, updateData);

    // Get the updated trip
    const updatedTrip = await getTripById(tripId);

    return NextResponse.json({
      success: true,
      data: updatedTrip,
      message: 'Trip updated successfully',
    });
  } catch (error) {
    console.error('Error updating trip:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'Failed to update trip',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/trips/[id]
 * Delete a specific trip
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized',
          message: 'You must be logged in to delete trips',
        },
        { status: 401 }
      );
    }

    const tripId = params.id;

    // Check if trip exists and belongs to user
    const existingTrip = await getTripById(tripId);
    if (!existingTrip) {
      return NextResponse.json(
        {
          success: false,
          error: 'Not found',
          message: 'Trip not found',
        },
        { status: 404 }
      );
    }

    if (existingTrip.userId !== session.user.id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Forbidden',
          message: 'You can only delete your own trips',
        },
        { status: 403 }
      );
    }

    // Delete the trip
    await deleteTrip(tripId);

    return NextResponse.json({
      success: true,
      message: 'Trip deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting trip:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'Failed to delete trip',
      },
      { status: 500 }
    );
  }
}
