import { Timestamp } from 'firebase/firestore';
import { Place, PlaceSearchType } from './places';

export interface Activity {
  id?: string;
  tripId: string;
  description?: string;
  type: ActivityTypeKey;
  subType: PlaceSearchType;
  place: Place;
  startDate: string;
  endDate: string;
  startTime: string;
  startAt?: Timestamp;
  endAt?: Timestamp;
  endTime: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Data structure for creating a new activity
 */
export interface CreateActivityData {
  tripId: string;
  description?: string;
  type: ActivityTypeKey;
  subType: PlaceSearchType;
  place: Place;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}

/**
 * Data structure for updating an existing activity
 */
export interface UpdateActivityData {
  description?: string;
  type?: ActivityTypeKey;
  subType?: PlaceSearchType;
  place?: Place;
  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  startAt?: Timestamp;
  endAt?: Timestamp;
  updatedAt?: string;
}

/**
 * ActivityType groups activities into broader categories.
 * Use this type for classifying trip activities.
 */
export enum ActivityType {
  accommodation = 'Acomodação', // Lodging, hotels, hostels, etc.
  transportation = 'Transporte', // Flights, trains, buses, car rentals, etc.
  food = 'Alimentação', // Restaurants, cafes, bakeries, supermarkets, etc.
  leisure = 'Lazer', // Attractions, entertainment, culture, nature, sports, wellness, shopping, etc.
  other = 'Outro', // Any activity not covered by the above
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
  other:
    'Selecione esta categoria para escolher entre serviços, comércios, instituições e outros locais que não se encaixam nas categorias acima.',
};

export const ACTIVITY_SUB_TYPE_PLACE_PLACEHOLDERS: Record<
  ActivityTypeKey,
  string
> = {
  accommodation: 'Escolha o tipo de acomodação que deseja buscar...',
  transportation:
    'Escolha o tipo de serviço de transporte que deseja buscar...',
  food: 'Escolha o tipo de estabelecimento de alimentação que deseja buscar...',
  leisure: 'Escolha o tipo de atração ou local de lazer que deseja buscar...',
  other: 'Escolha o tipo de serviço ou estabelecimento que deseja buscar...',
};
