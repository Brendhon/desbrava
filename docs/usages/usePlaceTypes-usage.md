# usePlaceTypes Hook Usage

## Overview

The `usePlaceTypes` hook provides a simple way to manage place types by category in the Desbrava project. It allows you to fetch and manage different types of places (accommodation, transportation, food, leisure, other) from the place types API.

## Import

```typescript
import { usePlaceTypes } from '@/hooks/usePlaceTypes';
```

## Basic Usage

### Simple category selection

```typescript
import { usePlaceTypes } from '@/hooks/usePlaceTypes';
import { ActivityTypeKey } from '@/lib/types/activity';

function PlaceTypeSelector() {
  const { placeTypes, loading, error, category, setCategory } = usePlaceTypes();

  const handleCategoryChange = (newCategory: ActivityTypeKey) => {
    setCategory(newCategory);
  };

  return (
    <div>
      <select 
        value={category || ''} 
        onChange={(e) => setCategory(e.target.value as ActivityTypeKey)}
      >
        <option value="">Select a category</option>
        <option value="accommodation">🏨 Accommodation</option>
        <option value="transportation">✈️ Transportation</option>
        <option value="food">🍽️ Food</option>
        <option value="leisure">🎯 Leisure</option>
        <option value="other">📝 Other</option>
      </select>

      {loading && <p>Loading place types...</p>}
      {error && <p>Error: {error}</p>}
      
      {placeTypes.length > 0 && (
        <div>
          <h3>Place Types for {category}:</h3>
          <ul>
            {placeTypes.map((placeType) => (
              <li key={placeType.key}>
                <strong>{placeType.key}:</strong> {placeType.value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
```

### With initial category

```typescript
function AccommodationTypes() {
  const { placeTypes, loading, error } = usePlaceTypes('accommodation');

  if (loading) return <p>Loading accommodation types...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Accommodation Types</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {placeTypes.map((placeType) => (
          <div key={placeType.key} className="p-4 border rounded-lg">
            <h3 className="font-semibold">{placeType.value}</h3>
            <p className="text-sm text-gray-600">{placeType.key}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Manual category fetching

```typescript
function PlaceTypeManager() {
  const { 
    placeTypes, 
    loading, 
    error, 
    getAllPlaceTypes, 
    getPlaceTypesByCategory 
  } = usePlaceTypes();

  const handleFetchAll = async () => {
    try {
      const allTypes = await getAllPlaceTypes();
      console.log('All place types:', allTypes);
    } catch (error) {
      console.error('Failed to fetch all types:', error);
    }
  };

  const handleFetchCategory = async (category: ActivityTypeKey) => {
    try {
      const categoryTypes = await getPlaceTypesByCategory(category);
      console.log(`${category} types:`, categoryTypes);
    } catch (error) {
      console.error(`Failed to fetch ${category} types:`, error);
    }
  };

  return (
    <div>
      <div className="space-x-2 mb-4">
        <button 
          onClick={handleFetchAll}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Fetch All Types
        </button>
        <button 
          onClick={() => handleFetchCategory('food')}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Fetch Food Types
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      
      {placeTypes.length > 0 && (
        <div>
          <h3>Current Place Types ({placeTypes.length})</h3>
          <ul>
            {placeTypes.map((placeType) => (
              <li key={placeType.key}>{placeType.value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
```

## API Endpoints

The hook uses the following API endpoints:

- `GET /api/place-types` - Get all place types organized by category
- `GET /api/place-types/{category}` - Get place types for a specific category (path parameter)

## Hook Return Values

```typescript
interface UsePlaceTypesReturn {
  placeTypes: PlaceType[];           // Array of place types for current category
  loading: boolean;                  // Loading state
  error: string | null;              // Error message if any
  category: ActivityTypeKey | null;  // Current selected category
  setCategory: (category: ActivityTypeKey | null) => void;  // Set category function
  getAllPlaceTypes: () => Promise<Record<string, PlaceType[]>>;  // Fetch all types
  getPlaceTypesByCategory: (category: ActivityTypeKey) => Promise<PlaceType[]>;  // Fetch by category
}
```

## PlaceType Interface

```typescript
interface PlaceType {
  key: string;    // Unique identifier (e.g., "hotel", "restaurant")
  value: string;  // Human-readable name in Portuguese (e.g., "Hotel", "Restaurante")
}
```

## Error Handling

The hook automatically handles errors and provides error messages. Common error scenarios:

- Invalid category type
- Network errors
- API response errors

## Performance Considerations

- The hook automatically loads place types when the category changes
- No debouncing is implemented since the data is static
- Consider memoizing the hook result if used in multiple components

## Best Practices

1. **Always check loading and error states** before rendering data
2. **Use the category parameter** to pre-select a category when the hook initializes
3. **Handle errors gracefully** by showing user-friendly error messages
4. **Use the manual fetch functions** when you need to load data on-demand
5. **Memoize expensive operations** if you're processing the place types data
