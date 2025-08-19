import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { createTrip } from '@/services/firebase/trip.service';
import { CreateTripData } from '@/lib/types/trip';
import { parsePtBrToDate } from '@/lib/utils/trip';

/**
 * POST /api/trips/create
 * Create a new trip
 */
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized',
          message: 'You must be logged in to create trips'
        },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const tripData: Omit<CreateTripData, 'userId'> = body;

    // Validate required fields
    if (!tripData.name || !tripData.startDate || !tripData.endDate || !tripData.country) {
      return NextResponse.json(
        {
          success: false,
          error: 'Bad request',
          message: 'All fields are required: name, startDate, endDate, country'
        },
        { status: 400 }
      );
    }

    // Validate dates
    const startDate = parsePtBrToDate(tripData.startDate);
    const endDate = parsePtBrToDate(tripData.endDate);
    
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return NextResponse.json(
        {
          success: false,
          error: 'Bad request',
          message: 'Invalid date format'
        },
        { status: 400 }
      );
    }

    if (startDate >= endDate) {
      return NextResponse.json(
        {
          success: false,
          error: 'Bad request',
          message: 'Start date must be before end date'
        },
        { status: 400 }
      );
    }

    // Create the trip with user ID
    const createData: CreateTripData = {
      ...tripData,
      user: session.user.email
    };

    const tripId = await createTrip(createData);

    return NextResponse.json({
      success: true,
      data: {
        id: tripId,
        ...createData
      },
      message: 'Trip created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating trip:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'Failed to create trip'
      },
      { status: 500 }
    );
  }
}
