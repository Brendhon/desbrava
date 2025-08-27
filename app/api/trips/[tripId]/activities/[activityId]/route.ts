import { NextRequest, NextResponse } from 'next/server';
import {
  getActivityById,
  updateActivity,
  deleteActivity,
} from '@/services/firebase/activity.service';
import { UpdateActivityData } from '@/lib/types/activity';
import {
  requireAuth,
  createSuccessResponse,
  createErrorResponse,
  createNotFoundResponse,
  createInternalErrorResponse,
} from '@/lib/utils';

interface ActivityParams {
  params: Promise<{ activityId: string; tripId: string }>;
}

/**
 * GET /api/trips/[tripId]/activities/[activityId]
 * Get a specific activity by ID
 */
export async function GET(request: NextRequest, { params }: ActivityParams) {
  try {
    // Check authentication
    const authResult = await requireAuth();
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const { activityId, tripId } = await params;
    const activity = await getActivityById(tripId, activityId);

    if (!activity) {
      return createNotFoundResponse('Activity');
    }

    return createSuccessResponse(activity);
  } catch (error) {
    return createInternalErrorResponse(error, 'fetching activity');
  }
}

/**
 * PUT /api/trips/[tripId]/activities/[activityId]
 * Update a specific activity
 */
export async function PUT(request: NextRequest, { params }: ActivityParams) {
  try {
    // Check authentication
    const authResult = await requireAuth();
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const { activityId, tripId } = await params;

    // Check if activity exists
    const existingActivity = await getActivityById(tripId, activityId);
    if (!existingActivity) {
      return createNotFoundResponse('Activity');
    }

    // Parse request body
    const body = await request.json();
    const updateData: UpdateActivityData = body;

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

    // Update the activity
    await updateActivity(tripId, activityId, updateData);

    // Get the updated activity
    const updatedActivity = await getActivityById(tripId, activityId);

    return createSuccessResponse(
      updatedActivity,
      'Activity updated successfully'
    );
  } catch (error) {
    return createInternalErrorResponse(error, 'update activity');
  }
}

/**
 * DELETE /api/trips/[tripId]/activities/[activityId]
 * Delete a specific activity
 */
export async function DELETE(request: NextRequest, { params }: ActivityParams) {
  try {
    // Check authentication
    const authResult = await requireAuth();
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const { activityId, tripId } = await params;

    // Check if activity exists
    const existingActivity = await getActivityById(tripId, activityId);
    if (!existingActivity) {
      return createNotFoundResponse('Activity');
    }

    // Delete the activity
    await deleteActivity(tripId, activityId);

    return createSuccessResponse(null, 'Activity deleted successfully');
  } catch (error) {
    return createInternalErrorResponse(error, 'delete activity');
  }
}
