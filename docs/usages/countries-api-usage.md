# Countries API Usage Guide

This document describes how to use the Countries API endpoints for searching and retrieving country information.

## Overview

The Countries API provides endpoints to search for countries by name and retrieve country details by ID. The API includes intelligent search capabilities that handle accents and partial matches.

## Base URL

```
/api/countries
```

## Endpoints

### 1. Search Countries

**GET** `/api/countries`

Search for countries by name with support for partial matches and accent normalization.

#### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `name` | string | No | - | Country name to search for |
| `exact` | boolean | No | false | Whether to search for exact matches only |

#### Examples

##### Get all countries
```bash
GET /api/countries
```

**Response:**
```json
{
  "success": true,
  "data": [...],
  "count": 2718
}
```

##### Search by country name (partial match)
```bash
GET /api/countries?name=brazil
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "continent": "América do Sul",
      "flag": "https://www.worldometers.info//img/flags/small/tn_br-flag.gif ",
      "id": 28,
      "language": ["Português"],
      "region": "América Latina",
      "country": "Brasil",
      "currency_code": "BRL",
      "currency_name_pt": "Real brasileiro",
      "iso_country": "BR"
    }
  ],
  "count": 1,
  "searchTerm": "brasil",
  "exact": false
}
```

##### Search by country name (exact match)
```bash
GET /api/countries?name=Brasil&exact=true
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "continent": "América do Sul",
      "flag": "https://www.worldometers.info//img/flags/small/tn_br-flag.gif ",
      "id": 28,
      "language": ["Português"],
      "region": "América Latina",
      "country": "Brasil",
      "currency_code": "BRL",
      "currency_name_pt": "Real brasileiro",
      "iso_country": "BR"
    }
  ],
  "count": 1,
  "searchTerm": "Brasil",
  "exact": true
}
```

##### Search with accents (normalized)
```bash
GET /api/countries?name=brasil
```

**Response:** Will find "Brasil" even though the search term doesn't have accents.

### 2. Get Country by ID

**GET** `/api/countries/[id]`

Retrieve a specific country by its unique ID.

#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | number | Yes | Unique country identifier |

#### Examples

##### Get country by ID
```bash
GET /api/countries/28
```

**Response:**
```json
{
  "success": true,
  "data": {
    "continent": "América do Sul",
    "flag": "https://www.worldometers.info//img/flags/small/tn_br-flag.gif ",
    "id": 28,
    "language": ["Português"],
    "region": "América Latina",
    "country": "Brasil",
    "currency_code": "BRL",
    "currency_name_pt": "Real brasileiro",
    "iso_country": "BR"
  }
}
```

## Data Structure

### Country Object

```typescript
interface Country {
  continent: string;           // Continent name
  flag: string | null;         // URL to country flag image
  id: number;                  // Unique identifier
  language: string[];          // Array of official languages
  region: string;              // Geographic region
  country: string;             // Country name
  currency_code: string | null; // ISO currency code
  currency_name_pt: string | null; // Currency name in Portuguese
  iso_country: string;         // ISO country code
}
```

## Search Features

### Accent Normalization

The API automatically handles accents and special characters in search queries:

- **Input:** "brasil", "Brasil", "BRASIL"
- **All find:** "Brasil" (with accent)

### Partial Matching

When `exact=false` (default), the API searches for partial matches:

- **Input:** "bra"
- **Finds:** "Brasil", "Brasil", "Brasil"

### Intelligent Search

The API uses a three-tier search strategy:

1. **Exact matches** (when `exact=true`)
2. **Partial matches** (contains the search term)
3. **Best match** (closest match when no results found)

## Error Handling

### Error Response Format

```json
{
  "success": false,
  "error": "Error type",
  "message": "Human-readable error message"
}
```

### Common Error Codes

| Status | Error | Description |
|--------|-------|-------------|
| 400 | Invalid ID format | Country ID must be a number |
| 404 | Country not found | No country found with the specified ID |
| 500 | Internal server error | Server-side error occurred |

### Example Error Response

```json
{
  "success": false,
  "error": "Country not found",
  "message": "No country found with ID 9999"
}
```

## Usage Examples

### JavaScript/TypeScript

```typescript
// Search for countries
const searchCountries = async (name: string) => {
  const response = await fetch(`/api/countries?name=${encodeURIComponent(name)}`);
  const data = await response.json();
  
  if (data.success) {
    return data.data;
  } else {
    throw new Error(data.message);
  }
};

// Get country by ID
const getCountryById = async (id: number) => {
  const response = await fetch(`/api/countries/${id}`);
  const data = await response.json();
  
  if (data.success) {
    return data.data;
  } else {
    throw new Error(data.message);
  }
};

// Usage
try {
  const countries = await searchCountries('brazil');
  console.log('Found countries:', countries);
  
  const country = await getCountryById(28);
  console.log('Country details:', country);
} catch (error) {
  console.error('Error:', error.message);
}
```

### React Hook Example

```typescript
import { useState, useEffect } from 'react';

interface Country {
  id: number;
  country: string;
  continent: string;
  flag: string | null;
  // ... other properties
}

const useCountriesSearch = (searchTerm: string) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchCountries = async () => {
      if (!searchTerm.trim()) {
        setCountries([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/countries?name=${encodeURIComponent(searchTerm)}`
        );
        const data = await response.json();

        if (data.success) {
          setCountries(data.data);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('Failed to search countries');
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchCountries, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  return { countries, loading, error };
};

// Usage in component
const CountrySearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { countries, loading, error } = useCountriesSearch(searchTerm);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search countries..."
      />
      
      {loading && <p>Searching...</p>}
      {error && <p className="error">{error}</p>}
      
      <ul>
        {countries.map(country => (
          <li key={country.id}>
            {country.flag && (
              <img src={country.flag} alt={`${country.country} flag`} />
            )}
            {country.country} - {country.continent}
          </li>
        ))}
      </ul>
    </div>
  );
};
```

## Best Practices

### 1. Debounce Search Queries

Implement debouncing for search inputs to avoid excessive API calls:

```typescript
const [searchTerm, setSearchTerm] = useState('');
const debouncedSearchTerm = useDebounce(searchTerm, 300);
```

### 2. Error Handling

Always handle potential errors and provide user feedback:

```typescript
if (data.success) {
  // Handle success
} else {
  // Handle error
  console.error(data.error, data.message);
}
```

### 3. Loading States

Show loading indicators during API calls:

```typescript
const [loading, setLoading] = useState(false);

// Show spinner or loading text when loading is true
```

### 4. Input Validation

Validate user input before making API calls:

```typescript
if (searchTerm.trim().length < 2) {
  return; // Don't search for very short terms
}
```

## Rate Limiting

Currently, there are no rate limits implemented. However, it's recommended to:

- Implement client-side debouncing (300-500ms)
- Cache results when possible
- Avoid making requests for empty search terms

## Support

For questions or issues with the Countries API, please refer to the project documentation or create an issue in the project repository.
