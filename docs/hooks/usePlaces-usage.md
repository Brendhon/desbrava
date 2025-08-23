# usePlaces Hook

## Overview

The `usePlaces` hook provides a comprehensive interface for searching places using the Google Places API. It handles search state management, debouncing, error handling, and provides methods for different types of place searches.

## Features

- **Search State Management**: Manages places, loading state, and errors
- **Debouncing**: Prevents excessive API calls with configurable delay
- **Type Filtering**: Search for specific place types
- **Location Bias**: Optional location-based search with radius
- **Session Management**: Automatic session token generation
- **Error Handling**: Comprehensive error handling and recovery

## Parameters

### UsePlacesOptions

| Property            | Type          | Default                        | Description                          |
| ------------------- | ------------- | ------------------------------ | ------------------------------------ |
| `initialSearchTerm` | `string`      | `''`                           | Initial search term                  |
| `debounceDelay`     | `number`      | `400`                          | Delay for debouncing in milliseconds |
| `defaultTypes`      | `PlaceType[]` | `[CITIES, REGIONS, COUNTRIES]` | Default place types to search for    |
| `latitude`          | `number`      | `undefined`                    | Latitude for location bias           |
| `longitude`         | `number`      | `undefined`                    | Longitude for location bias          |
| `radius`            | `number`      | `50000`                        | Search radius in meters              |
| `maxResults`        | `number`      | `20`                           | Maximum number of results            |

## Return Value

### UsePlacesReturn

| Property        | Type                                                   | Description                          |
| --------------- | ------------------------------------------------------ | ------------------------------------ |
| `places`        | `Place[]`                                              | Array of places from the search      |
| `loading`       | `boolean`                                              | Loading state indicator              |
| `error`         | `string \| null`                                       | Error message if search failed       |
| `searchTerm`    | `string`                                               | Current search term                  |
| `setSearchTerm` | `(term: string) => void`                               | Function to update search term       |
| `searchByType`  | `(input: string, types: PlaceType[]) => Promise<void>` | Search places by specific types      |
| `clearResults`  | `() => void`                                           | Clear search results and reset state |

## Usage

### Basic Usage

```tsx
import { usePlaces } from '@/hooks/usePlaces';

function MyComponent() {
  const { places, loading, error, searchTerm, setSearchTerm } = usePlaces();

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar lugares..."
      />

      {loading && <p>Buscando...</p>}
      {error && <p>Erro: {error}</p>}

      <ul>
        {places.map((place) => (
          <li key={place.id}>{place.displayName.text}</li>
        ))}
      </ul>
    </div>
  );
}
```

### With Custom Configuration

```tsx
import { usePlaces, PLACE_TYPES } from '@/hooks/usePlaces';

function MyComponent() {
  const { places, loading, error, searchTerm, setSearchTerm, searchByType } =
    usePlaces({
      debounceDelay: 600,
      defaultTypes: [PLACE_TYPES.RESTAURANT, PLACE_TYPES.CAFE],
      latitude: -23.5505,
      longitude: -46.6333,
      radius: 10000,
      maxResults: 15,
    });

  const handleRestaurantSearch = () => {
    searchByType('pizza', [PLACE_TYPES.RESTAURANT]);
  };

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar restaurantes..."
      />

      <button onClick={handleRestaurantSearch}>Buscar Pizzarias</button>

      {loading && <p>Buscando...</p>}
      {error && <p>Erro: {error}</p>}

      <ul>
        {places.map((place) => (
          <li key={place.id}>{place.displayName.text}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Advanced Usage with Type Switching

```tsx
import { usePlaces, PLACE_TYPES } from '@/hooks/usePlaces';
import { useState } from 'react';

function AdvancedSearch() {
  const [searchType, setSearchType] = useState<
    'general' | 'hotels' | 'restaurants'
  >('general');

  const {
    places,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    searchByType,
    clearResults,
  } = usePlaces({
    debounceDelay: 500,
    latitude: -23.5505,
    longitude: -46.6333,
    radius: 20000,
  });

  const handleTypeChange = (type: 'general' | 'hotels' | 'restaurants') => {
    setSearchType(type);
    clearResults();

    if (searchTerm.trim().length >= 2) {
      switch (type) {
        case 'hotels':
          searchByType(searchTerm, [PLACE_TYPES.LODGING]);
          break;
        case 'restaurants':
          searchByType(searchTerm, [PLACE_TYPES.RESTAURANT, PLACE_TYPES.CAFE]);
          break;
        default:
          searchByType(searchTerm, [PLACE_TYPES.CITIES, PLACE_TYPES.REGIONS]);
      }
    }
  };

  return (
    <div>
      <div>
        <button
          onClick={() => handleTypeChange('general')}
          className={searchType === 'general' ? 'active' : ''}
        >
          Geral
        </button>
        <button
          onClick={() => handleTypeChange('hotels')}
          className={searchType === 'hotels' ? 'active' : ''}
        >
          Hotéis
        </button>
        <button
          onClick={() => handleTypeChange('restaurants')}
          className={searchType === 'restaurants' ? 'active' : ''}
        >
          Restaurantes
        </button>
      </div>

      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={`Buscar ${searchType === 'general' ? 'lugares' : searchType}...`}
      />

      {loading && <p>Buscando...</p>}
      {error && <p>Erro: {error}</p>}

      <ul>
        {places.map((place) => (
          <li key={place.id}>
            <strong>{place.displayName.text}</strong>
            <br />
            <small>{place.formattedAddress}</small>
            <br />
            <small>Tipos: {place.types.join(', ')}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## Behavior

### Debouncing

The hook automatically debounces search terms to prevent excessive API calls. The default delay is 400ms, but this can be customized.

### Search Triggers

Searches are automatically triggered when:

- The debounced search term changes
- The search term is at least 2 characters long
- The `defaultTypes` array changes

### Error Handling

The hook provides comprehensive error handling:

- API errors are captured and stored in the `error` state
- Network failures are handled gracefully
- Invalid search terms are prevented
- Errors can be cleared by calling `clearResults()`

### Session Management

Each hook instance generates a unique session token for the Google Places API, which helps group related requests and improve API performance.

## Dependencies

- `@/lib/services/places` - Google Places API services
- `@/lib/types/places` - TypeScript types for Places API
- `@/hooks/useDebounce` - Debouncing utility hook

## Notes

- Requires `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY` environment variable
- Minimum search term length is 2 characters
- Maximum results per search is 20 (Google Places API limit)
- Location bias requires both latitude and longitude coordinates
- Session tokens are automatically generated for each hook instance
- The hook automatically handles cleanup and prevents memory leaks
