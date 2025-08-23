
import { ActivityTypeKey } from '@/lib/types/activity';
import { SelectOption } from '@/lib/types/form';
import { PlaceTypeOptions } from '@/lib/types/places';
import PlaceTypesData from '@/public/data/place_types.json';

interface UsePlaceTypesReturn {
  placeTypes: PlaceTypeOptions;
  getPlaceOptionsByType: (type: ActivityTypeKey | undefined) => SelectOption[];
  getSubtypesByType: (type: ActivityTypeKey | undefined, subType?: string) => SelectOption;
}

const defaultPlaceOptions: SelectOption = { label: '', value: '' };

// Get place types
const getPlaceTypes = () => PlaceTypesData as PlaceTypeOptions;

/**
 * Hook to search countries
 * @returns Object with countries data
 */
export function usePlaceTypes(): UsePlaceTypesReturn {

  // Get place options by type
  const getPlaceOptionsByType = (type: ActivityTypeKey | undefined): SelectOption[] => {
    if (!type) return [defaultPlaceOptions];
    return getPlaceTypes()[type] || [defaultPlaceOptions];
  };
  
  // Get subtypes by type
  const getSubtypesByType = (type: ActivityTypeKey | undefined, subType?: string): SelectOption => {
    if (!type || !subType) return defaultPlaceOptions;
    return getPlaceTypes()[type].find((option) => option.value === subType) || defaultPlaceOptions;
  };

  return {
    placeTypes: getPlaceTypes(),
    getPlaceOptionsByType,
    getSubtypesByType,
  };
}
