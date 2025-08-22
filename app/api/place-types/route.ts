import { createInternalErrorResponse, createSuccessResponse } from '@/lib/utils';
import placeTypesData from '@/public/data/place_types.json';

/**
 * GET /api/place-types
 * Get place types by category
 * Query parameters:
 * - type: Category type (accommodation, transportation, food, leisure, other)
 */
export async function GET() {
  try {
    // Get place types for the specified category
    const categoryData = placeTypesData;

    if (!categoryData) {
      return createSuccessResponse([], undefined, 200, {
        count: 0,
        message: `Failed to get place types`,
      });
    }

    return createSuccessResponse(categoryData, undefined, 200);
  } catch (error) {
    return createInternalErrorResponse(error, 'get place types');
  }
}
