import { NextResponse } from 'next/server';
import { auth } from '@/auth';

/**
 * API Response Types
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  count?: number;
  total?: number;
  searchTerm?: string;
  filters?: Record<string, unknown>;
  exact?: boolean;
}

/**
 * Authentication Helper
 * Checks if user is authenticated and returns session or error response
 */
export async function requireAuth(): Promise<
  { session: unknown; userEmail: string } | NextResponse
> {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json(
      {
        success: false,
        error: 'Unauthorized',
        message: 'You must be logged in to access this resource',
      },
      { status: 401 }
    );
  }

  return { session, userEmail: session.user.email };
}

/**
 * Standard Error Response Helper
 */
export function createErrorResponse(
  error: string,
  message: string,
  status: number = 400
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error,
      message,
    },
    { status }
  );
}

/**
 * Standard Success Response Helper
 */
export function createSuccessResponse<T>(
  data: T,
  message?: string,
  status: number = 200,
  additionalFields?: Partial<ApiResponse<T>>
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      message,
      ...additionalFields,
    },
    { status }
  );
}

/**
 * Resource Ownership Check Helper
 * Verifies if a resource belongs to the authenticated user
 */
export function checkResourceOwnership(
  resourceUser: string,
  authenticatedUser: string,
  resourceName: string = 'resource'
): NextResponse | null {
  if (resourceUser !== authenticatedUser) {
    return createErrorResponse(
      'Forbidden',
      `You can only access your own ${resourceName}s`,
      403
    );
  }

  return null;
}

/**
 * Required Fields Validation Helper
 */
export function validateRequiredFields(
  data: Record<string, unknown>,
  requiredFields: string[]
): NextResponse | null {
  const missingFields = requiredFields.filter((field) => !data[field]);

  if (missingFields.length > 0) {
    return createErrorResponse(
      'Bad request',
      `Missing required fields: ${missingFields.join(', ')}`,
      400
    );
  }

  return null;
}

/**
 * Date Validation Helper
 */
export function validateDateRange(
  startDate: Date,
  endDate: Date
): NextResponse | null {
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return createErrorResponse('Bad request', 'Invalid date format', 400);
  }

  if (startDate >= endDate) {
    return createErrorResponse(
      'Bad request',
      'Start date must be before end date',
      400
    );
  }

  return null;
}

/**
 * Resource Not Found Helper
 */
export function createNotFoundResponse(
  resourceName: string = 'Resource'
): NextResponse<ApiResponse> {
  return createErrorResponse('Not found', `${resourceName} not found`, 404);
}

/**
 * Internal Server Error Helper
 */
export function createInternalErrorResponse(
  error: unknown,
  operation: string
): NextResponse<ApiResponse> {
  console.error(`Error ${operation}:`, error);

  return createErrorResponse(
    'Internal server error',
    `Failed to ${operation}`,
    500
  );
}
