import {
  AccommodationInfo,
  BasePlaceInfo,
  ContactInfo,
  EditorialSummary,
  FoodOptions,
  FoodServices,
  OpeningHours,
  PriceInfo,
} from '@/components/activity/info';
import { ActivityTypeKey } from '@/lib/types';
import { Place } from '@/lib/types/places';

interface PlaceInfoProps {
  place: Place;
  type: ActivityTypeKey;
}

/**
 * PlaceInfo Component
 *
 * Displays detailed information about a place based on the activity type.
 * Renders different information sections depending on whether it's a restaurant,
 * hotel, transportation hub, leisure attraction, or other type of place.
 *
 * @param place - The place object containing all place information
 * @param type - The activity type to determine which specific info to display
 */
export default function PlaceInfo({ place, type }: PlaceInfoProps) {
  // Render specific component based on activity type
  switch (type) {
    case 'food':
      return <FoodPlaceInfo place={place} />;
    case 'accommodation':
      return <AccommodationPlaceInfo place={place} />;
    case 'leisure':
      return <LeisurePlaceInfo place={place} />;
    default:
      return <BaseInfo place={place} />;
  }
}

// Base Place Info Component
function BaseInfo({ place }: { place: Place }) {
  return (
    <>
      {/* Render all base info components */}
      <BasePlaceInfo place={place} />
      <PriceInfo place={place} />
      <ContactInfo place={place} />
    </>
  );
}

// Food-specific Place Info
function FoodPlaceInfo({ place }: { place: Place }) {
  return (
    <>
      <BaseInfo place={place} />
      <OpeningHours place={place} />
      <FoodServices place={place} />
      <FoodOptions place={place} />
    </>
  );
}

// Accommodation-specific Place Info
function AccommodationPlaceInfo({ place }: { place: Place }) {
  return (
    <>
      <BaseInfo place={place} />
      <AccommodationInfo place={place} />
    </>
  );
}

// Leisure-specific Place Info
function LeisurePlaceInfo({ place }: { place: Place }) {
  return (
    <>
      <BaseInfo place={place} />
      <EditorialSummary place={place} />
    </>
  );
}
