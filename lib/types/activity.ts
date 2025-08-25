import { SelectOption } from './form';
import { Place } from './places';

export interface Activity {
  id: string;
  tripId: string;
  name: string;
  description?: string;
  type: ActivityTypeKey;
  place: Place;
  destination?: Place;
  date: string;
  startTime?: string;
  endTime?: string;
  duration?: number; // in minutes
  notes?: string;
  status: ActivityStatus;
  priority: ActivityPriority;
  cost?: {
    amount: number;
    currency: string;
  };
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateActivityData {
  tripId: string;
  name: string;
  description?: string;
  type: ActivityTypeKey;
  place: Place;
  destination?: Place;
  date: string;
  startTime?: string;
  endTime?: string;
  duration?: number;
  notes?: string;
  priority: ActivityPriority;
  cost?: {
    amount: number;
    currency: string;
  };
  tags?: string[];
}

/**
 * ActivityType groups activities into broader categories.
 * Use this type for classifying trip activities.
 */
export enum ActivityType {
  ACCOMMODATION = 'Acomodação', // Lodging, hotels, hostels, etc.
  TRANSPORTATION = 'Transporte', // Flights, trains, buses, car rentals, etc.
  FOOD = 'Alimentação', // Restaurants, cafes, bakeries, supermarkets, etc.
  LEISURE = 'Lazer', // Attractions, entertainment, culture, nature, sports, wellness, shopping, etc.
  OTHER = 'Outro', // Any activity not covered by the above
}

export const ActivityTypeKeys = [
  'accommodation',
  'transportation',
  'food',
  'leisure',
  'other',
] as const;

export type ActivityTypeKey = (typeof ActivityTypeKeys)[number];

/**
 * Options for activity types, as an array for use in select components.
 * Each option includes a value (ActivityTypeKey) and a label.
 */
export const ACTIVITY_TYPE_OPTIONS: {
  value: ActivityTypeKey;
  label: string;
  icon: string;
}[] = [
  { value: 'accommodation', label: 'Acomodação', icon: '🏨' },
  { value: 'transportation', label: 'Transporte', icon: '✈️' },
  { value: 'food', label: 'Alimentação', icon: '🍽️' },
  { value: 'leisure', label: 'Lazer', icon: '🎯' },
  { value: 'other', label: 'Outro', icon: '📝' },
];

/**
 * Enum with descriptions and examples for each ActivityType.
 */
export const ACTIVITY_TYPE_INFO: Record<ActivityTypeKey, string> = {
  accommodation:
    'Selecione esta categoria para escolher entre hotéis, hostels, pousadas, resorts e outros tipos de acomodação.',
  transportation:
    'Selecione esta categoria para escolher entre aeroportos, estações, aluguel de carros, postos de gasolina e outros serviços de transporte.',
  food: 'Selecione esta categoria para escolher entre restaurantes, cafés, padarias, supermercados e outros estabelecimentos de alimentação.',
  leisure:
    'Selecione esta categoria para escolher entre atrações turísticas, museus, parques, centros esportivos, shoppings e outros locais de lazer.',
  other: 'Selecione esta categoria para escolher entre serviços, comércios, instituições e outros locais que não se encaixam nas categorias acima.',
};

export const ACTIVITY_PLACE_PLACEHOLDERS: Record<ActivityTypeKey, string> = {
  accommodation: '🏨 Digite o nome do hotel, pousada, resort, hostel, acomodação ou outro local de acomodação',
  transportation:
    '🚗 Digite o nome do aeroporto, estação, locadora de carros, posto de gasolina, serviço de transporte ou outro local de transporte',
  food: '🍽️ Digite o nome do restaurante, café, padaria, supermercado, mercado ou estabelecimento de alimentação',
  leisure:
    '🎭 Digite o nome do parque, museu, shopping, centro esportivo, atração turística ou local de lazer',
  other:
    '🏢 Digite o nome do serviço, comércio, instituição ou local que deseja encontrar (ex: farmácia, clínica, etc.)',
};

export type ActivityStatus =
  | 'planned'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

  export const ACTIVITY_SUB_TYPE_PLACE_PLACEHOLDERS: Record<ActivityTypeKey, string> = {
    accommodation: 'Escolha o tipo de acomodação que deseja buscar...',
    transportation:
      'Escolha o tipo de serviço de transporte que deseja buscar...',
    food: 'Escolha o tipo de estabelecimento de alimentação que deseja buscar...',
    leisure:
      'Escolha o tipo de atração ou local de lazer que deseja buscar...',
    other:
      'Escolha o tipo de serviço ou estabelecimento que deseja buscar...',
  };
  

export type ActivityPriority = 'low' | 'medium' | 'high' | 'critical';

// Status options for the form
export const ACTIVITY_STATUS_OPTIONS: SelectOption[] = [
  { value: 'planned', label: 'Planejado' },
  { value: 'completed', label: 'Concluído' },
  { value: 'cancelled', label: 'Cancelado' },
];
