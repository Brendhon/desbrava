# 🗺️ Google Places API - Endpoints para o Projeto Desbrava

Este documento descreve os endpoints mais relevantes da Google Places API para implementar as funcionalidades do projeto Desbrava, um planejador de viagens PWA.

## 📋 Visão Geral

A Google Places API oferece acesso a dados de mais de 200 milhões de locais, permitindo funcionalidades como:
- Busca e autocompletar de lugares
- Detalhes de estabelecimentos
- Busca por proximidade
- Informações sobre restaurantes e pontos turísticos

## 🚀 Endpoints Principais

### 1. **Place Autocomplete (New)** - `POST /v1/places:autocomplete`

**Endpoint:** `https://places.googleapis.com/v1/places:autocomplete`

**Descrição:** Fornece sugestões de autocompletar para buscas baseadas em texto, retornando lugares, negócios, endereços e pontos de interesse conforme o usuário digita.

**Uso no Desbrava:**
- Campo de busca para destinos de viagem
- Autocompletar para hotéis e pontos de referência
- Sugestões de cidades e países

**Parâmetros Principais:**
```json
{
  "input": "Rio de Janeiro",
  "locationBias": {
    "circle": {
      "center": {
        "latitude": -22.9068,
        "longitude": -43.1729
      },
      "radius": 50000.0
    }
  },
  "includedPrimaryTypes": ["(cities)", "lodging", "tourist_attraction"]
}
```

**Campos de Resposta Recomendados:**
- `suggestions.placePrediction.text` - Nome do lugar
- `suggestions.placePrediction.placeId` - ID único do lugar
- `suggestions.placePrediction.types` - Tipos de lugar

---

### 2. **Nearby Search (New)** - `POST /v1/places:searchNearby`

**Endpoint:** `https://places.googleapis.com/v1/places:searchNearby`

**Descrição:** Busca lugares próximos a uma localização específica, ideal para encontrar restaurantes, hotéis e pontos turísticos ao redor de um destino.

**Uso no Desbrava:**
- Buscar restaurantes próximos ao hotel
- Encontrar pontos turísticos na região
- Sugerir atividades baseadas na localização

**Parâmetros Principais:**
```json
{
  "includedTypes": ["restaurant", "tourist_attraction"],
  "maxResultCount": 20,
  "locationRestriction": {
    "circle": {
      "center": {
        "latitude": -22.9068,
        "longitude": -43.1729
      },
      "radius": 5000.0
    }
  }
}
```

**Campos de Resposta Recomendados:**
- `places.displayName` - Nome do estabelecimento
- `places.formattedAddress` - Endereço formatado
- `places.location` - Coordenadas (lat/lng)
- `places.rating` - Avaliação (se disponível)
- `places.types` - Tipos de lugar

---

### 3. **Text Search (New)** - `POST /v1/places:searchText`

**Endpoint:** `https://places.googleapis.com/v1/places:searchText`

**Descrição:** Busca lugares baseada em consultas de texto, permitindo encontrar locais específicos por nome, tipo ou descrição.

**Uso no Desbrava:**
- Buscar hotéis específicos por nome
- Encontrar restaurantes por tipo de culinária
- Localizar pontos turísticos por descrição

**Parâmetros Principais:**
```json
{
  "textQuery": "hotel Copacabana Palace",
  "maxResultCount": 10,
  "locationBias": {
    "circle": {
      "center": {
        "latitude": -22.9068,
        "longitude": -43.1729
      },
      "radius": 10000.0
    }
  }
}
```

**Campos de Resposta Recomendados:**
- `places.displayName` - Nome do lugar
- `places.formattedAddress` - Endereço completo
- `places.location` - Coordenadas geográficas
- `places.types` - Categorias do lugar

---

### 4. **Place Details (New)** - `GET /v1/places/{placeId}`

**Endpoint:** `https://places.googleapis.com/v1/places/{placeId}`

**Descrição:** Obtém informações detalhadas sobre um lugar específico usando seu Place ID, incluindo horários, avaliações, fotos e mais.

**Uso no Desbrava:**
- Exibir detalhes completos de um hotel
- Mostrar informações de restaurantes
- Apresentar dados de pontos turísticos

**Parâmetros:**
- `placeId` - ID único do lugar (obtido de outros endpoints)
- `fields` - Campos específicos a retornar (via header `X-Goog-FieldMask`)

**Campos Recomendados:**
```http
X-Goog-FieldMask: places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.currentOpeningHours,places.photos,places.websiteUri
```

---

## 🏷️ Tipos de Lugar Mais Relevantes

### **Hospedagem:**
- `lodging` - Hotéis, pousadas, hostels
- `campground` - Campings
- `rv_park` - Parques para trailers

### **Alimentação:**
- `restaurant` - Restaurantes
- `cafe` - Cafés
- `bar` - Bares
- `bakery` - Padarias
- `meal_takeaway` - Comida para viagem

### **Pontos Turísticos:**
- `tourist_attraction` - Atrações turísticas
- `museum` - Museus
- `art_gallery` - Galerias de arte
- `amusement_park` - Parques de diversão
- `aquarium` - Aquários
- `zoo` - Zoológicos
- `park` - Parques

### **Transporte:**
- `airport` - Aeroportos
- `train_station` - Estações de trem
- `bus_station` - Pontos de ônibus
- `subway_station` - Estações de metrô

---

## 💰 Estratégias de Otimização de Custos

### **1. Uso de Field Masks**
Sempre especifique apenas os campos necessários para reduzir custos:
```http
X-Goog-FieldMask: places.displayName,places.formattedAddress,places.location
```

### **2. Session Tokens**
Use tokens de sessão para agrupar requisições relacionadas e reduzir custos de autocompletar.

### **3. Limitação de Resultados**
Configure `maxResultCount` para retornar apenas o necessário (padrão: 20).

### **4. Cache Local**
Implemente cache local para dados que não mudam frequentemente (ex: informações básicas de lugares).

---

## 🔧 Implementação Recomendada

### **1. Autocompletar de Destinos**
```typescript
// Buscar cidades e países
const searchDestinations = async (query: string) => {
  const response = await fetch('/api/places/autocomplete', {
    method: 'POST',
    body: JSON.stringify({
      input: query,
      includedPrimaryTypes: ['(cities)', '(regions)']
    })
  });
  return response.json();
};
```

### **2. Busca de Hotéis Próximos**
```typescript
// Buscar hotéis próximos a um destino
const searchNearbyHotels = async (lat: number, lng: number, radius: number = 5000) => {
  const response = await fetch('/api/places/nearby', {
    method: 'POST',
    body: JSON.stringify({
      includedTypes: ['lodging'],
      locationRestriction: {
        circle: {
          center: { latitude: lat, longitude: lng },
          radius: radius
        }
      }
    })
  });
  return response.json();
};
```

### **3. Busca de Restaurantes**
```typescript
// Buscar restaurantes por tipo de culinária
const searchRestaurants = async (query: string, lat: number, lng: number) => {
  const response = await fetch('/api/places/text-search', {
    method: 'POST',
    body: JSON.stringify({
      textQuery: query,
      locationBias: {
        circle: {
          center: { latitude: lat, longitude: lng },
          radius: 3000.0
        }
      }
    })
  });
  return response.json();
};
```

---

## 📱 Considerações para PWA

### **1. Funcionalidade Offline**
- Cache de resultados de busca frequentes
- Armazenamento local de dados de lugares visitados
- Sincronização quando online

### **2. Performance**
- Implementar debounce para autocompletar
- Lazy loading de detalhes de lugares
- Paginação para resultados extensos

### **3. Experiência do Usuário**
- Indicadores de carregamento
- Tratamento de erros gracioso
- Fallbacks para dados indisponíveis

---

## 🚨 Limitações e Considerações

### **1. Quotas e Custos**
- Monitore o uso da API para controlar custos
- Implemente rate limiting para evitar exceder quotas
- Use cache para reduzir requisições repetidas

### **2. Precisão dos Dados**
- Dados podem não estar sempre atualizados
- Implemente validação de dados críticos
- Considere múltiplas fontes para informações importantes

### **3. Disponibilidade**
- Implemente fallbacks para quando a API estiver indisponível
- Cache local para funcionalidades essenciais
- Tratamento de erros robusto

---

## 📚 Recursos Adicionais

- [Documentação Oficial da Places API](https://developers.google.com/maps/documentation/places/web-service)
- [Guia de Migração para Nova API](https://developers.google.com/maps/documentation/places/web-service/migration)
- [Tipos de Lugar Suportados](https://developers.google.com/maps/documentation/places/web-service/supported_types)
- [Exemplos de Código](https://developers.google.com/maps/documentation/places/web-service/examples)

---

*Este documento foi criado especificamente para o projeto Desbrava e deve ser atualizado conforme as necessidades do projeto evoluem.*
