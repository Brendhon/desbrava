# 🗺️ Google Places Service - Guia de Uso

Este documento descreve como usar os serviços da Google Places API criados para o projeto Desbrava.

## 📦 Instalação e Configuração

### 1. Variável de Ambiente

Certifique-se de que a variável `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY` está configurada no seu arquivo `.env.local`:

```bash
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=sua_chave_api_aqui
```

### 2. Importação dos Serviços

```typescript
// Importar funções específicas
import { 
  getDestinationSuggestions,
  findNearbyHotels,
  searchRestaurantsByText,
  getPlaceDetails,
  generateSessionToken
} from '@/lib/services';

// Ou importar todas as funções
import * as PlacesAPI from '@/lib/services';
```

## 🚀 Exemplos de Uso

### Funções Principais

```typescript
// Buscar destinos (cidades, países, regiões)
const destinations = await getDestinationSuggestions('Rio de Janeiro', 5);

// Buscar hotéis próximos
const nearbyHotels = await findNearbyHotels(-22.9068, -43.1729, 5000);

// Buscar restaurantes por texto
const restaurants = await searchRestaurantsByText('pizza italiana', -22.9068, -43.1729);

// Obter detalhes de um lugar
const placeDetails = await getPlaceDetails('ChIJ0T2NLikpdTERKxE8d61aX_E');
```

### Autocompletar

```typescript
// Buscar sugestões de hotéis
const hotelSuggestions = await getHotelSuggestions(
  'Copacabana',
  -22.9068,
  -43.1729,
  50000
);

// Gerar token de sessão
const sessionToken = generateSessionToken();
```

### Busca por Proximidade

```typescript
// Encontrar restaurantes próximos
const nearbyRestaurants = await findNearbyRestaurants(
  -22.9068,
  -43.1729,
  3000,
  15
);

// Encontrar atrações turísticas
const attractions = await findNearbyAttractions(
  -22.9068,
  -43.1729,
  10000
);
```

### Busca por Texto

```typescript
// Buscar hotéis específicos
const hotels = await searchHotelsByText(
  'Copacabana Palace',
  -22.9068,
  -43.1729
);

// Buscar qualquer tipo de lugar
const places = await searchAnyPlaceByText(
  'museu arte moderna',
  -22.9068,
  -43.1729
);
```

### Detalhes de Lugares

```typescript
// Obter informações básicas
const basicDetails = await getBasicPlaceDetails('place_id_aqui');

// Obter informações completas
const extendedDetails = await getExtendedPlaceDetails('place_id_aqui');

// Obter detalhes específicos de hotéis
const hotelDetails = await getHotelDetails('place_id_aqui');

// Obter múltiplos lugares
const multipleDetails = await getMultiplePlaceDetails([
  'place_id_1',
  'place_id_2',
  'place_id_3'
]);
```

## 🎯 Casos de Uso Comuns

### 1. Campo de Busca de Destinos

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
      console.error('Erro na busca:', error);
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
        placeholder="Digite o destino..."
      />
      
      {loading && <div>Buscando...</div>}
      
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

### 2. Busca de Hotéis Próximos

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
    console.error('Erro ao buscar hotéis:', error);
    return [];
  }
}
```

### 3. Busca de Restaurantes

```typescript
import { searchRestaurantsByText } from '@/lib/services';

export async function searchRestaurants(query: string, lat: number, lng: number) {
  try {
    const restaurants = await searchRestaurantsByText(
      query,
      lat,
      lng,
      3000,
      15
    );
    
    return restaurants.places;
  } catch (error) {
    console.error('Erro ao buscar restaurantes:', error);
    return [];
  }
}
```

## 🛠️ Utilitários

### Formatação de Dados

```typescript
import { 
  formatPlaceName,
  formatPlaceAddress,
  formatPlaceRating,
  getPrimaryPlaceType,
  calculateDistance,
  sortPlacesByDistance
} from '@/lib/utils';

// Formatar nome do lugar
const name = formatPlaceName(place);

// Formatar endereço
const address = formatPlaceAddress(place);

// Formatar avaliação
const rating = formatPlaceRating(place);

// Obter tipo principal
const type = getPrimaryPlaceType(place);

// Calcular distância
const distance = calculateDistance(lat1, lon1, lat2, lon2);

// Ordenar lugares por distância
const sortedPlaces = sortPlacesByDistance(places, referenceLat, referenceLon);
```

## ⚠️ Tratamento de Erros

```typescript
import { PlacesApiError } from '@/lib/services';

try {
  const results = await getDestinationSuggestions('Rio');
} catch (error) {
  if (error instanceof PlacesApiError) {
    console.error(`Erro da API: ${error.message} (Status: ${error.status})`);
    
    if (error.status === 429) {
      // Rate limit excedido
      console.log('Muitas requisições. Aguarde um momento.');
    } else if (error.status === 400) {
      // Requisição inválida
      console.log('Parâmetros inválidos.');
    }
  } else {
    console.error('Erro inesperado:', error);
  }
}
```

## 💡 Dicas de Otimização

### 1. Uso de Session Tokens

```typescript
// Para autocompletar relacionado, use o mesmo token de sessão
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

### 2. Cache de Resultados

```typescript
// Implementar cache local para resultados frequentes
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

### 3. Debounce para Autocompletar

```typescript
import { useCallback } from 'react';
import { debounce } from 'lodash';

const debouncedSearch = useCallback(
  debounce((query: string) => {
    handleSearch(query);
  }, 300),
  []
);
```

## 🔧 Configuração Avançada

### Personalizar Configurações

```typescript
import { getDestinationSuggestions } from '@/lib/services';

const config = {
  timeout: 15000, // 15 segundos
  baseUrl: 'https://places.googleapis.com/v1' // URL personalizada
};

const results = await getDestinationSuggestions('Rio', 10, config);
```

### Tratamento de Timeout

```typescript
try {
  const results = await getDestinationSuggestions('Rio');
} catch (error) {
  if (error instanceof PlacesApiError && error.status === 408) {
    console.log('Requisição expirou. Tente novamente.');
  }
}
```

## 📚 Recursos Adicionais

- [Tipos TypeScript](./types/places.ts) - Definições completas de tipos
- [Utilitários](./utils/places.ts) - Funções auxiliares para formatação
- [Diretriz da API](./guidelines/google-places-api-guideline.md) - Documentação da API Google Places

---

*Este serviço foi criado especificamente para o projeto Desbrava e segue as melhores práticas de desenvolvimento React/Next.js.*
