# 🚀 Trips API Usage Guide

## Overview

The Trips API provides a complete CRUD interface for managing travel data in the Desbrava project. It follows the same architectural patterns as the Countries API and integrates with Firebase for data persistence.

## Base URL

```
/api/trips
```

## Authentication

All endpoints require authentication. The API automatically checks for a valid session using NextAuth.js.

## Endpoints

### 1. Get All Trips

**GET** `/api/trips`

Returns all trips for the authenticated user.

**Query Parameters:**
- `search` (optional): Search term for trip name, description, or country
- `startDate` (optional): Filter trips starting from this date
- `endDate` (optional): Filter trips ending before this date
- `country` (optional): Filter trips by country code
- `page` (optional): Page number for pagination (default: 1)
- `pageSize` (optional): Number of trips per page (default: 10)

**Example Request:**
```typescript
const response = await fetch('/api/trips?search=paris&page=1&pageSize=5');
const result = await response.json();
```

**Response:**
```json
{
  "success": true,
  "data": [...],
  "count": 5,
  "total": 25,
  "hasMore": true,
  "page": 1,
  "pageSize": 5,
  "searchTerm": "paris",
  "filters": {
    "startDate": null,
    "endDate": null,
    "country": null
  }
}
```

### 2. Get Specific Trip

**GET** `/api/trips/[id]`

Returns a specific trip by ID.

**Example Request:**
```typescript
const response = await fetch('/api/trips/abc123');
const result = await response.json();
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "abc123",
    "userId": "user123",
    "name": "Paris Adventure",
    "description": "Exploring the City of Light",
    "startDate": "2024-06-01",
    "endDate": "2024-06-07",
    "country": {
      "code": "FR",
      "country": "France",
      "flag": "🇫🇷"
    },
    "createdAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-15T10:00:00Z"
  }
}
```

### 3. Create New Trip

**POST** `/api/trips/create`

Creates a new trip for the authenticated user.

**Request Body:**
```typescript
{
  "name": "Trip Name",
  "description": "Trip Description",
  "startDate": "2024-06-01",
  "endDate": "2024-06-07",
  "country": {
    "code": "FR",
    "country": "France",
    "flag": "🇫🇷"
  }
}
```

**Example Request:**
```typescript
const response = await fetch('/api/trips/create', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(tripData),
});
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "newTripId",
    "userId": "user123",
    "name": "Trip Name",
    "description": "Trip Description",
    "startDate": "2024-06-01",
    "endDate": "2024-06-07",
    "country": {...},
    "createdAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-15T10:00:00Z"
  },
  "message": "Trip created successfully"
}
```

### 4. Update Trip

**PUT** `/api/trips/[id]`

Updates an existing trip.

**Request Body:**
```typescript
{
  "name": "Updated Trip Name",
  "description": "Updated Description"
}
```

**Example Request:**
```typescript
const response = await fetch('/api/trips/abc123', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(updateData),
});
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "abc123",
    "userId": "user123",
    "name": "Updated Trip Name",
    "description": "Updated Description",
    "startDate": "2024-06-01",
    "endDate": "2024-06-07",
    "country": {...},
    "createdAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-15T11:00:00Z"
  },
  "message": "Trip updated successfully"
}
```

### 5. Delete Trip

**DELETE** `/api/trips/[id]`

Deletes a specific trip.

**Example Request:**
```typescript
const response = await fetch('/api/trips/abc123', {
  method: 'DELETE',
});
```

**Response:**
```json
{
  "success": true,
  "message": "Trip deleted successfully"
}
```

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error Type",
  "message": "Human-readable error message"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created (for POST requests)
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (not authenticated)
- `403` - Forbidden (not authorized to access resource)
- `404` - Not Found
- `500` - Internal Server Error

## Using the Hook

The project provides a custom hook for easy integration:

```typescript
import { useTrips } from '@/hooks/useTrips';

function TripComponent() {
  const { 
    trips, 
    loading, 
    error, 
    fetchTrips, 
    createTrip 
  } = useTrips();

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  const handleCreateTrip = async () => {
    const newTrip = await createTrip({
      name: "New Trip",
      description: "Description",
      startDate: "2024-06-01",
      endDate: "2024-06-07",
      country: { code: "FR", country: "France", flag: "🇫🇷" }
    });
    
    if (newTrip) {
      console.log('Trip created:', newTrip);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {trips.map(trip => (
        <div key={trip.id}>{trip.name}</div>
      ))}
    </div>
  );
}
```

## Data Validation

The API includes comprehensive validation:

- **Required Fields**: name, description, startDate, endDate, country
- **Date Validation**: startDate must be before endDate
- **Length Limits**: name (100 chars), description (500 chars)
- **Date Format**: ISO 8601 string format
- **User Ownership**: Users can only access their own trips

## Firebase Integration

The API automatically:
- Creates timestamps (`createdAt`, `updatedAt`)
- Associates trips with authenticated users
- Handles Firebase errors gracefully
- Maintains data consistency

## Best Practices

1. **Always handle errors** from API responses
2. **Use the custom hook** for consistent state management
3. **Validate data** before sending to the API
4. **Handle loading states** for better UX
5. **Use pagination** for large datasets
6. **Implement search and filtering** for better user experience
