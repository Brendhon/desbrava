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

export const ActivityTypeKeys = ['accommodation', 'transportation', 'food', 'leisure', 'other'] as const;

export type ActivityTypeKey = typeof ActivityTypeKeys[number];

/**
 * Options for activity types, as an array for use in select components.
 * Each option includes a value (ActivityTypeKey) and a label.
 */
export const ACTIVITY_TYPE_OPTIONS: { value: ActivityTypeKey; label: string }[] = [
  { value: 'accommodation', label: '🏨 Acomodação' },
  { value: 'transportation', label: '🚗 Transporte' },
  { value: 'food', label: '🍽️ Alimentação' },
  { value: 'leisure', label: '🎯 Lazer' },
  { value: 'other', label: '📝 Outro' },
];

/**
 * Enum with descriptions and examples for each ActivityType.
 */
export const ACTIVITY_TYPE_INFO: Record<ActivityTypeKey, string> = {
  accommodation: 'Acomodação: Inclui hotéis, hostels, guesthouses, e qualquer tipo de acomodação.',
  transportation: 'Transporte: Inclui voos, trens, ônibus, aluguel de carros, e transferências.',
  food: 'Alimentação: Inclui restaurantes, cafés, padarias, supermercados, e qualquer tipo de alimentação.',
  leisure: 'Lazer: Inclui atrações turísticas, entretenimento (cinema, teatro, concertos), sites culturais (museus, galerias), natureza (parques, trilhas), esportes (partidas, atividades), bem-estar (spas, academias), e compras (shoppings, mercados).',
  other: 'Outro: Qualquer atividade que não se encaixa nas categorias acima.',
}

export type ActivityStatus = 
  | 'planned'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export type ActivityPriority = 
  | 'low'
  | 'medium'
  | 'high'
  | 'critical';


// Status options for the form
export const ACTIVITY_STATUS_OPTIONS: SelectOption[] = [
  { value: 'planned', label: 'Planejado' },
  { value: 'completed', label: 'Concluído' },
  { value: 'cancelled', label: 'Cancelado' },
];
