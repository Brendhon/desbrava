import { ActivityTypeKey, ActivityTypeKeys } from '@/lib/types/activity';
import { createInternalErrorResponse, createSuccessResponse } from '@/lib/utils';
import placeTypesData from '@/public/data/place_types.json';
import { NextRequest } from 'next/server';

interface RouteParams {
  params: {
    type: string;
  };
}

/**
 * GET /api/place-types/[type]
 * Get place types for a specific category
 * Path parameters:
 * - type: Category type (accommodation, transportation, food, leisure, other)
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { type } = params;

    // Validate if the type is valid
    if (!ActivityTypeKeys.includes(type as ActivityTypeKey)) {
      return createSuccessResponse([], undefined, 200, {
        count: 0,
        message: `Invalid type. Must be one of: ${ActivityTypeKeys.join(', ')}`,
      });
    }

    // Get place types for the specified category
    const categoryData = placeTypesData[type as ActivityTypeKey] ?? [];

    if (!categoryData) {
      return createSuccessResponse([], undefined, 200, {
        count: 0,
        message: `No place types found for category: ${type}`,
      });
    }

    return createSuccessResponse(categoryData, undefined, 200, {
      count: categoryData.length
    });
  } catch (error) {
    return createInternalErrorResponse(error, 'get place types by category');
  }
}
