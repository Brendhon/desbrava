import { CreateTripData } from '@/lib/types/trip';
import {
  createInternalErrorResponse,
  createSuccessResponse,
  parsePtBrToDate,
  requireAuth,
  validateDateRange,
  validateRequiredFields,
} from '@/lib/utils';
import { createTrip } from '@/services/firebase/trip.service';
import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/trips/create
 * Create a new trip
 */
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authResult = await requireAuth();
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const { userEmail } = authResult;

    // Parse request body
    const body = await request.json();
    const tripData: Omit<CreateTripData, 'user'> = body;

    // Validate required fields
    const requiredFields = ['name', 'startDate', 'endDate', 'country'];
    const validationError = validateRequiredFields(tripData, requiredFields);
    if (validationError) {
      return validationError;
    }

    // Validate dates
    const startDate = parsePtBrToDate(tripData.startDate);
    const endDate = parsePtBrToDate(tripData.endDate);

    const dateValidationError = validateDateRange(startDate, endDate);
    if (dateValidationError) {
      return dateValidationError;
    }

    // Create the trip with user ID
    const createData: CreateTripData = {
      ...tripData,
      user: userEmail,
    };

    const tripId = await createTrip(createData);

    return createSuccessResponse(
      {
        id: tripId,
        ...createData,
      },
      'Trip created successfully',
      201
    );
  } catch (error) {
    return createInternalErrorResponse(error, 'create trip');
  }
}
