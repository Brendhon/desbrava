# Google Places Service - Usage Guide

This guide provides instructions on how to use the Google Places API services available in the project.

## Installation

Import the necessary functions from `@/lib/services`:

```typescript
// Import specific functions
import { 
  getDestinationSuggestions,
  findNearbyHotels,
  searchRestaurantsByText,
  getPlaceDetails,
  generateSessionToken
} from '@/lib/services';

// Or import the entire module
import * as PlacesAPI from '@/lib/services';
```

## Core Functions

Here are examples of the main functions available.

### Search & Suggestions

```typescript
// Get destination suggestions (cities, countries, etc.)
const destinations = await getDestinationSuggestions('Rio de Janeiro', 5);

// Get hotel suggestions for autocomplete
const hotelSuggestions = await getHotelSuggestions(
  'Copacabana',
  -22.9068,
  -43.1729,
  50000
);

// Find nearby hotels
const nearbyHotels = await findNearbyHotels(-22.9068, -43.1729, 5000);

// Find nearby restaurants
const nearbyRestaurants = await findNearbyRestaurants(
  -22.9068,
  -43.1729,
  3000,
  15
);

// Find nearby tourist attractions
const attractions = await findNearbyAttractions(
  -22.9068,
  -43.1729,
  10000
);

// Search for restaurants by a text query
const restaurants = await searchRestaurantsByText('italian pizza', -22.9068, -43.1729);

// Search for hotels by a text query
const hotels = await searchHotelsByText(
  'Copacabana Palace',
  -22.9068,
  -43.1729
);

// Search for any type of place by text
const places = await searchAnyPlaceByText(
  'modern art museum',
  -22.9068,
  -43.1729
);
```

### Place Details

```typescript
// Get basic details for a place
const basicDetails = await getBasicPlaceDetails('place_id_here');

// Get extended details for a place
const extendedDetails = await getExtendedPlaceDetails('place_id_here');

// Get specific details for a hotel
const hotelDetails = await getHotelDetails('place_id_here');

// Get details for multiple places at once
const multipleDetails = await getMultiplePlaceDetails([
  'place_id_1',
  'place_id_2',
  'place_id_3'
]);
```

### Session Token

```typescript
// Generate a session token for autocomplete sessions
const sessionToken = generateSessionToken();
```

## Common Use Cases

### 1. Destination Search Input

```typescript
import { useState } from 'react';
import { getDestinationSuggestions } from '@/lib/services';

export function DestinationSearch() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchQuery: string) => {
    if (searchQuery.length < 2) return;

    setLoading(true);
    try {
      const results = await getDestinationSuggestions(searchQuery, 10);
      setSuggestions(results.suggestions);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          handleSearch(e.target.value);
        }}
        placeholder="Enter a destination..."
      />
      
      {loading && <div>Searching...</div>}
      
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index}>
            {suggestion.placePrediction.text.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### 2. Finding Nearby Hotels

```typescript
import { findNearbyHotels } from '@/lib/services';

export async function findHotelsNearDestination(lat: number, lng: number) {
  try {
    const hotels = await findNearbyHotels(lat, lng, 5000, 20);
    
    return hotels.places.map(hotel => ({
      id: hotel.id,
      name: hotel.displayName.text,
      address: hotel.formattedAddress,
      rating: hotel.rating,
      location: hotel.location
    }));
  } catch (error) {
    console.error('Error fetching hotels:', error);
    return [];
  }
}
```

## Utility Functions

Helper functions are available to format data, calculate distances, and sort results.

```typescript
import { 
  formatPlaceName,
  formatPlaceAddress,
  formatPlaceRating,
  getPrimaryPlaceType,
  calculateDistance,
  sortPlacesByDistance
} from '@/lib/utils';

// Format place name
const name = formatPlaceName(place);

// Format address
const address = formatPlaceAddress(place);

// Format rating
const rating = formatPlaceRating(place);

// Get primary type
const type = getPrimaryPlaceType(place);

// Calculate distance between two points
const distance = calculateDistance(lat1, lon1, lat2, lon2);

// Sort places by distance from a reference point
const sortedPlaces = sortPlacesByDistance(places, referenceLat, referenceLon);
```

## Error Handling

The API service throws a `PlacesApiError` for request-related errors.

```typescript
import { PlacesApiError } from '@/lib/services';

try {
  const results = await getDestinationSuggestions('Rio');
} catch (error) {
  if (error instanceof PlacesApiError) {
    console.error(`API Error: ${error.message} (Status: ${error.status})`);
    
    if (error.status === 429) {
      // Rate limit exceeded
      console.log('Too many requests. Please wait a moment.');
    } else if (error.status === 400) {
      // Invalid request
      console.log('Invalid parameters.');
    }
  } else {
    console.error('Unexpected error:', error);
  }
}
```

## Optimization

### 1. Session Tokens

For autocomplete, use the same session token for related queries to reduce costs.

```typescript
const sessionToken = generateSessionToken();

const suggestions1 = await getPlaceSuggestions({
  input: 'Rio',
  sessionToken
});

const suggestions2 = await getPlaceSuggestions({
  input: 'Rio de',
  sessionToken
});
```

### 2. Caching

Cache results locally to avoid redundant API calls for frequent requests.

```typescript
const cache = new Map();

async function getCachedPlaceDetails(placeId: string) {
  if (cache.has(placeId)) {
    return cache.get(placeId);
  }
  
  const details = await getPlaceDetails(placeId);
  cache.set(placeId, details);
  return details;
}
```

## Advanced Configuration

### Custom Settings

You can override default settings like `timeout` or `baseUrl`.

```typescript
import { getDestinationSuggestions } from '@/lib/services';

const config = {
  timeout: 15000, // 15 seconds
  baseUrl: 'https://places.googleapis.com/v1' // Custom URL
};

const results = await getDestinationSuggestions('Rio', 10, config);
```

### Timeout Handling

Handle timeout errors specifically.

```typescript
try {
  const results = await getDestinationSuggestions('Rio');
} catch (error) {
  if (error instanceof PlacesApiError && error.status === 408) {
    console.log('Request timed out. Please try again.');
  }
}
```