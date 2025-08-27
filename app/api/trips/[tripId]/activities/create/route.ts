import { NextRequest, NextResponse } from 'next/server';
import { createActivity } from '@/services/firebase/activity.service';
import { CreateActivityData } from '@/lib/types/activity';
import {
  requireAuth,
  createSuccessResponse,
  validateRequiredFields,
  createErrorResponse,
  createInternalErrorResponse,
} from '@/lib/utils';

interface TripParams {
  params: Promise<{ tripId: string }>;
}

/**
 * POST /api/trips/[tripId]/activities/create
 * Create a new activity
 */
export async function POST(request: NextRequest, { params }: TripParams) {
  try {
    // Check authentication
    const authResult = await requireAuth();
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const { tripId } = await params;

    // Parse request body
    const body = await request.json();
    const activityData: CreateActivityData = body;

    // Validate required fields
    const requiredFields = [
      'type',
      'subType',
      'place',
      'startDate',
      'endDate',
      'startTime',
      'endTime',
    ];
    const validationError = validateRequiredFields(
      activityData,
      requiredFields
    );
    if (validationError) {
      return validationError;
    }

    // Validate that place has required fields
    if (
      !activityData.place.displayName?.text ||
      !activityData.place.formattedAddress
    ) {
      return createErrorResponse(
        'Bad request',
        'Place must have displayName.text and formattedAddress',
        400
      );
    }

    // Create the activity
    const activityId = await createActivity(tripId, activityData);

    return createSuccessResponse(
      {
        id: activityId,
        ...activityData,
      },
      'Activity created successfully',
      201
    );
  } catch (error) {
    return createInternalErrorResponse(error, 'create activity');
  }
}
