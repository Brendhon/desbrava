# API Helpers Usage Guide

This document explains how to use the reusable API helper functions to standardize API responses and reduce code duplication.

## Overview

The API helpers are located in `lib/utils/api-helpers.ts` and provide standardized functions for:

- Authentication checks
- Response formatting
- Error handling
- Validation helpers

## Available Functions

### Authentication

#### `requireAuth()`

Checks if the user is authenticated and returns either the session data or an error response.

```typescript
import { requireAuth } from '@/lib/utils';

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const authResult = await requireAuth();
    if (authResult instanceof NextResponse) {
      return authResult; // Returns 401 Unauthorized
    }

    const { session, userEmail } = authResult;
    // Continue with authenticated user...
  } catch (error) {
    // Handle errors...
  }
}
```

### Response Helpers

#### `createSuccessResponse(data, message?, status?, additionalFields?)`

Creates a standardized success response.

```typescript
import { createSuccessResponse } from '@/lib/utils';

// Basic success response
return createSuccessResponse(data);

// With message and custom status
return createSuccessResponse(data, 'Resource created successfully', 201);

// With additional fields
return createSuccessResponse(data, undefined, 200, {
  count: results.length,
  total: totalCount,
  filters: appliedFilters,
});
```

#### `createErrorResponse(error, message, status)`

Creates a standardized error response.

```typescript
import { createErrorResponse } from '@/lib/utils';

return createErrorResponse('Bad request', 'Missing required fields', 400);
```

#### `createNotFoundResponse(resourceName)`

Creates a standardized 404 response.

```typescript
import { createNotFoundResponse } from '@/lib/utils';

return createNotFoundResponse('Trip');
return createNotFoundResponse('User');
```

#### `createInternalErrorResponse(error, operation)`

Creates a standardized 500 response with logging.

```typescript
import { createInternalErrorResponse } from '@/lib/utils';

return createInternalErrorResponse(error, 'fetching trips');
return createInternalErrorResponse(error, 'creating user');
```

### Validation Helpers

#### `validateRequiredFields(data, requiredFields, resourceName?)`

Validates that all required fields are present.

```typescript
import { validateRequiredFields } from '@/lib/utils';

const requiredFields = ['name', 'email', 'password'];
const validationError = validateRequiredFields(
  userData,
  requiredFields,
  'user'
);
if (validationError) {
  return validationError; // Returns 400 Bad Request
}
```

#### `validateDateRange(startDate, endDate, resourceName?)`

Validates that start date is before end date.

```typescript
import { validateDateRange } from '@/lib/utils';

const dateValidationError = validateDateRange(startDate, endDate, 'trip');
if (dateValidationError) {
  return dateValidationError; // Returns 400 Bad Request
}
```

#### `checkResourceOwnership(resourceUser, authenticatedUser, resourceName?)`

Checks if a resource belongs to the authenticated user.

```typescript
import { checkResourceOwnership } from '@/lib/utils';

const ownershipError = checkResourceOwnership(trip.user, userEmail, 'trip');
if (ownershipError) {
  return ownershipError; // Returns 403 Forbidden
}
```

## Complete Example

Here's a complete example of how to use these helpers in an API route:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getTripById } from '@/services/firebase/trip.service';
import {
  requireAuth,
  createSuccessResponse,
  checkResourceOwnership,
  createNotFoundResponse,
  createInternalErrorResponse,
} from '@/lib/utils';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const authResult = await requireAuth();
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const { userEmail } = authResult;
    const { id: tripId } = await params;

    // Get the resource
    const trip = await getTripById(tripId);
    if (!trip) {
      return createNotFoundResponse('Trip');
    }

    // Check ownership
    const ownershipError = checkResourceOwnership(trip.user, userEmail, 'trip');
    if (ownershipError) {
      return ownershipError;
    }

    // Return success response
    return createSuccessResponse(trip);
  } catch (error) {
    return createInternalErrorResponse(error, 'fetching trip');
  }
}
```

## Benefits

1. **Consistency**: All API responses follow the same structure
2. **DRY Principle**: No more duplicated authentication and error handling code
3. **Maintainability**: Changes to response format only need to be made in one place
4. **Type Safety**: Full TypeScript support with proper interfaces
5. **Logging**: Automatic error logging for internal server errors

## Response Format

All responses follow this standardized format:

```typescript
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  count?: number;
  total?: number;
  searchTerm?: string;
  filters?: Record<string, any>;
}
```

## Error Status Codes

- `400` - Bad Request (validation errors, missing fields)
- `401` - Unauthorized (not authenticated)
- `403` - Forbidden (authenticated but no permission)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error (server-side errors)
