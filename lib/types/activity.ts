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
    'Inclui hotéis, hostels, guesthouses, e qualquer tipo de acomodação.',
  transportation:
    'Inclui voos, trens, ônibus, aluguel de carros, e transferências.',
  food: 'Inclui restaurantes, cafés, padarias, supermercados, e qualquer tipo de alimentação.',
  leisure:
    'Inclui atrações, entretenimento, cultura, natureza, esportes, bem-estar e compras.',
  other: 'Qualquer atividade que não se encaixa nas categorias acima.',
};

export const ACTIVITY_PLACE_PLACEHOLDERS: Record<ActivityTypeKey, string> = {
  accommodation: 'Digite para buscar hotéis, hostels, guesthouses, etc.',
  transportation:
    'Digite para buscar voos, trens, ônibus, aluguel de carros, etc.',
  food: 'Digite para buscar restaurantes, cafés, padarias, supermercados, etc.',
  leisure:
    'Digite para buscar atrações, entretenimento, cultura, natureza, esportes, bem-estar, compras, etc.',
  other:
    'Digite para buscar qualquer atividade que não se encaixa nas outras categorias.',
};

export type ActivityStatus =
  | 'planned'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export type ActivityPriority = 'low' | 'medium' | 'high' | 'critical';

// Status options for the form
export const ACTIVITY_STATUS_OPTIONS: SelectOption[] = [
  { value: 'planned', label: 'Planejado' },
  { value: 'completed', label: 'Concluído' },
  { value: 'cancelled', label: 'Cancelado' },
];
