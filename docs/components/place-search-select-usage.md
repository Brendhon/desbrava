# PlaceSearchSelect Component

## Overview

The `PlaceSearchSelect` component provides dynamic place search functionality using the Google Places API. It's designed to search for cities, regions, countries, and other place types with debouncing to avoid excessive API calls.

## Features

- **Dynamic Search**: Real-time search using Google Places API
- **Debouncing**: Configurable delay to prevent excessive API calls
- **Type Filtering**: Search for specific place types (cities, regions, countries, etc.)
- **Location Bias**: Optional location-based search with radius
- **Form Integration**: Compatible with React Hook Form
- **Responsive Design**: Fully responsive with Tailwind CSS
- **Error Handling**: Comprehensive error handling and loading states

## Props

| Prop            | Type                                | Default                            | Description                          |
| --------------- | ----------------------------------- | ---------------------------------- | ------------------------------------ |
| `label`         | `React.ReactNode`                   | `'Local'`                          | Label displayed above the input      |
| `error`         | `string`                            | `undefined`                        | Error message to display             |
| `size`          | `'sm' \| 'md' \| 'lg'`              | `'md'`                             | Size of the input field              |
| `variant`       | `'default' \| 'error' \| 'success'` | `'default'`                        | Visual variant of the input          |
| `register`      | `UseFormRegisterReturn`             | `undefined`                        | React Hook Form register function    |
| `helperText`    | `string`                            | `'Local da sua viagem'`            | Helper text below the input          |
| `className`     | `string`                            | `''`                               | Additional CSS classes               |
| `id`            | `string`                            | `undefined`                        | HTML id attribute                    |
| `placeholder`   | `string`                            | `'Digite para buscar um local...'` | Placeholder text                     |
| `onValueChange` | `(value: string) => void`           | `undefined`                        | Callback when value changes          |
| `debounceDelay` | `number`                            | `400`                              | Delay for debouncing in milliseconds |
| `defaultValue`  | `string`                            | `undefined`                        | Initial/default value                |
| `placeTypes`    | `PlaceType[]`                       | `[CITIES, REGIONS, COUNTRIES]`     | Types of places to search for        |
| `latitude`      | `number`                            | `undefined`                        | Latitude for location bias           |
| `longitude`     | `number`                            | `undefined`                        | Longitude for location bias          |
| `radius`        | `number`                            | `50000`                            | Search radius in meters              |
| `maxResults`    | `number`                            | `20`                               | Maximum number of results            |

## Usage

### Basic Usage

```tsx
import { PlaceSearchSelect } from '@/components/form';

function MyComponent() {
  const handlePlaceChange = (placeId: string) => {
    console.log('Selected place:', placeId);
  };

  return (
    <PlaceSearchSelect
      label="Destino"
      helperText="Escolha o destino da sua viagem"
      onValueChange={handlePlaceChange}
    />
  );
}
```

### With React Hook Form

```tsx
import { useForm } from 'react-hook-form';
import { PlaceSearchSelect } from '@/components/form';

function MyForm() {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PlaceSearchSelect
        label="Local de Partida"
        register={register('departurePlace')}
        helperText="De onde você vai partir?"
      />

      <PlaceSearchSelect
        label="Destino"
        register={register('destination')}
        helperText="Para onde você vai?"
      />

      <button type="submit">Enviar</button>
    </form>
  );
}
```

### With Location Bias

```tsx
import { PlaceSearchSelect } from '@/components/form';

function MyComponent() {
  // São Paulo coordinates
  const latitude = -23.5505;
  const longitude = -46.6333;

  return (
    <PlaceSearchSelect
      label="Local Próximo"
      helperText="Busque locais próximos a São Paulo"
      latitude={latitude}
      longitude={longitude}
      radius={10000} // 10km
    />
  );
}
```

### Custom Place Types

```tsx
import { PlaceSearchSelect, PLACE_TYPES } from '@/components/form';

function RestaurantSearch() {
  return (
    <PlaceSearchSelect
      label="Restaurante"
      helperText="Busque restaurantes próximos"
      placeTypes={[PLACE_TYPES.RESTAURANT, PLACE_TYPES.CAFE]}
      radius={5000} // 5km
    />
  );
}

function HotelSearch() {
  return (
    <PlaceSearchSelect
      label="Hotel"
      helperText="Busque hotéis e acomodações"
      placeTypes={[PLACE_TYPES.LODGING]}
      radius={20000} // 20km
    />
  );
}
```

## Place Types

The component supports various place types defined in `PLACE_TYPES`:

- **Cities & Regions**: `CITIES`, `REGIONS`, `COUNTRIES`
- **Accommodation**: `LODGING`, `CAMPGROUND`, `RV_PARK`
- **Food & Beverage**: `RESTAURANT`, `CAFE`, `BAR`, `BAKERY`
- **Tourist Attractions**: `TOURIST_ATTRACTION`, `MUSEUM`, `PARK`
- **Transportation**: `AIRPORT`, `TRAIN_STATION`, `BUS_STATION`

## Styling

The component uses Tailwind CSS classes and follows the project's design system. All styling is handled through the `SearchSelect` component with consistent variants and sizes.

## Error Handling

The component provides comprehensive error handling:

- **API Errors**: Displays error messages from the Google Places API
- **Loading States**: Shows loading indicators during searches
- **Validation**: Prevents searches with less than 2 characters
- **Network Issues**: Handles network failures gracefully

## Performance

- **Debouncing**: Configurable delay prevents excessive API calls
- **Session Tokens**: Uses Google Places API session tokens for related requests
- **Memoization**: Results are memoized to prevent unnecessary re-renders
- **Abort Controller**: Requests can be cancelled to prevent race conditions

## Dependencies

- `@/hooks/usePlaces` - Custom hook for Places API integration
- `@/components/form/SearchSelect` - Base search select component
- `@/lib/services/places` - Google Places API services
- `@/lib/types/places` - TypeScript types for Places API
- `react-hook-form` - Form handling (optional)

## Notes

- Requires `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY` environment variable
- Minimum search term length is 2 characters
- Maximum results per search is 20 (Google Places API limit)
- Location bias requires both latitude and longitude coordinates
- Session tokens are automatically generated for each component instance
