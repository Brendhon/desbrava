import { OpeningHours } from '@/components/activity/info';
import { ActivityTypeKey } from '@/lib/types';
import { Place } from '@/lib/types/places';
import { cn } from '@/lib/utils';
import { DollarSign, DollarSignIcon, Globe, MapPin, Phone, Star, UtensilsCrossed } from 'lucide-react';

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
    case 'transportation':
      return <TransportationPlaceInfo place={place} />;
    case 'leisure':
      return <LeisurePlaceInfo place={place} />;
    case 'other':
      return <OtherPlaceInfo place={place} />;
    default:
      return <DefaultPlaceInfo place={place} />;
  }
}

// Base Place Info Component
function BasePlaceInfo({ place }: { place: Place }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.name}>{place.displayName.text}</h3>
        {place.rating && (
          <div className={styles.rating}>
            <Star className={styles.starIcon} />
            <span className={styles.ratingText}>
              {place.rating.toFixed(1)} ({place.userRatingCount || 0})
            </span>
          </div>
        )}
      </div>

      <div className={styles.baseInfoSection}>
        {place.formattedAddress && (
          <div className={styles.addressSection}>
            <MapPin className={styles.addressIcon} />
            <p className={styles.address}>{place.formattedAddress}</p>
          </div>
        )}

        {place.priceLevel && (
          <div className={styles.priceSection}>
            <DollarSign className={styles.priceIcon} />
            <span className={styles.priceText}>
              {formatPriceLevel(place.priceLevel)}
            </span>
          </div>
        )}

        {place.websiteUri && (
          <div className={styles.lodgingItem}>
            <Globe className={styles.lodgingIcon} />
            <a
              href={place.websiteUri}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.websiteLink}
            >
              Visitar site
            </a>
          </div>
        )}

        {place.priceRange && (
          <div className={styles.priceRange}>
            <DollarSignIcon className={styles.priceIcon} />
            <span>Preço: {place.priceRange.startPrice.units} - {place.priceRange.endPrice.units} {place.priceRange.startPrice.currencyCode}</span>
          </div>
        )}


        {place.internationalPhoneNumber || place.nationalPhoneNumber && (
          <div>
            <Phone className={styles.contactIcon} />

            {place.internationalPhoneNumber && (
              <div className={styles.contactItem}>
                <span>Telefone Internacional: </span>
                <span>{place.internationalPhoneNumber}</span>
              </div>
            )}
            {place.nationalPhoneNumber && (
              <div className={styles.contactItem}> 
                <span>Telefone Nacional: </span>
                <span>{place.nationalPhoneNumber}</span>
              </div>
            )}
          </div>
        )}


      </div>

    </div>
  );
}

// Food-specific Place Info
function FoodPlaceInfo({ place }: { place: Place }) {
  return (
    <div>
      <BasePlaceInfo place={place} />
      <OpeningHours place={place} />

      <div className={cn(styles.container, styles.foodDetails)}>
        <div className={styles.foodServices}>
          <h4 className={styles.sectionTitle}>Serviços</h4>
          <div className={styles.serviceGrid}>
            {place.takeout && (
              <div className={styles.serviceItem}>
                <UtensilsCrossed className={styles.serviceIcon} />
                <span>Para viagem</span>
              </div>
            )}
            {place.delivery && (
              <div className={styles.serviceItem}>
                <UtensilsCrossed className={styles.serviceIcon} />
                <span>Delivery</span>
              </div>
            )}
            {place.dineIn && (
              <div className={styles.serviceItem}>
                <UtensilsCrossed className={styles.serviceIcon} />
                <span>Local</span>
              </div>
            )}
            {place.reservable && (
              <div className={styles.serviceItem}>
                <UtensilsCrossed className={styles.serviceIcon} />
                <span>Reservas</span>
              </div>
            )}
          </div>
        </div>

        <div className={styles.foodOptions}>
          <h4 className={styles.sectionTitle}>Opções</h4>
          <div className={styles.optionGrid}>
            {place.servesBreakfast && (
              <span className={styles.optionTag}>Café da manhã</span>
            )}
            {place.servesLunch && (
              <span className={styles.optionTag}>Almoço</span>
            )}
            {place.servesDinner && (
              <span className={styles.optionTag}>Jantar</span>
            )}
            {place.servesVegetarianFood && (
              <span className={styles.optionTag}>Vegetariano</span>
            )}
            {place.servesBeer && (
              <span className={styles.optionTag}>Cerveja</span>
            )}
            {place.servesWine && (
              <span className={styles.optionTag}>Vinho</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Accommodation-specific Place Info
function AccommodationPlaceInfo({ place }: { place: Place }) {
  return (
    <div>
      <BasePlaceInfo place={place} />

      <div className={cn(styles.container, styles.accommodationDetails)}>
        {place.lodging && (
          <div className={styles.lodgingInfo}>
            <h4 className={styles.sectionTitle}>Informações da Acomodação</h4>
            <div className={styles.lodgingGrid}>
              {place.lodging.rating && (
                <div className={styles.lodgingItem}>
                  <Star className={styles.lodgingIcon} />
                  <span>{place.lodging.rating.toFixed(1)} ({place.lodging.userRatingCount || 0})</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Transportation-specific Place Info
function TransportationPlaceInfo({ place }: { place: Place }) {
  return (
    <div>
      <BasePlaceInfo place={place} />
    </div>
  );
}

// Leisure-specific Place Info
function LeisurePlaceInfo({ place }: { place: Place }) {
  return (
    <div>
      <BasePlaceInfo place={place} />

      <div className={cn(styles.container, styles.leisureDetails)}>
        {place.editorialSummary && (
          <div className={styles.summary}>
            <h4 className={styles.sectionTitle}>Descrição</h4>
            <p className={styles.summaryText}>{place.editorialSummary.text}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Other Place Info
function OtherPlaceInfo({ place }: { place: Place }) {
  return <BasePlaceInfo place={place} />
}

// Default Place Info (fallback)
function DefaultPlaceInfo({ place }: { place: Place }) {
  return <BasePlaceInfo place={place} />;
}

// Utility functions
function formatPriceLevel(priceLevel: string): string {
  const priceMap = {
    'FREE': 'Gratuito',
    'PRICE_LEVEL_INEXPENSIVE': 'Barato',
    'PRICE_LEVEL_MODERATE': 'Moderado',
    'PRICE_LEVEL_EXPENSIVE': 'Caro',
    'PRICE_LEVEL_VERY_EXPENSIVE': 'Muito caro'
  };
  return priceMap[priceLevel as keyof typeof priceMap] || priceLevel;
}

const styles = {
  container: 'bg-royal-purple/20 border-royal-purple/30 rounded-lg border p-4 mt-4 space-y-4',

  // Header styles
  header: 'flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2',
  name: 'text-parchment-white font-semibold text-lg',

  // Rating styles
  rating: 'flex items-center gap-2',
  starIcon: 'w-4 h-4 text-yellow-400 fill-current',
  ratingText: 'text-mist-gray text-sm',

  // Address styles
  addressSection: 'flex items-start gap-2',
  addressIcon: 'w-4 h-4 text-royal-purple mt-0.5 flex-shrink-0',
  address: 'text-mist-gray text-sm',

  // Price styles
  priceSection: 'flex items-center gap-2',
  priceIcon: 'w-4 h-4 text-royal-purple',
  priceText: 'text-mist-gray text-sm',

  // Food-specific styles
  foodDetails: 'space-y-4 pt-2 border-t border-royal-purple/20',
  foodServices: 'space-y-2',
  sectionTitle: 'text-parchment-white font-medium text-sm',
  serviceGrid: 'grid grid-cols-2 sm:grid-cols-4 gap-2',
  serviceItem: 'flex items-center gap-2 text-mist-gray text-xs',
  serviceIcon: 'w-3 h-3 text-royal-purple',
  foodOptions: 'space-y-2',
  optionGrid: 'flex flex-wrap gap-2',
  optionTag: 'bg-royal-purple/30 text-parchment-white text-xs px-2 py-1 rounded-full',

  // Accommodation-specific styles
  accommodationDetails: 'space-y-4 pt-2 border-t border-royal-purple/20',
  lodgingInfo: 'space-y-2',
  lodgingGrid: 'space-y-2',
  lodgingItem: 'flex items-center gap-2 text-mist-gray text-sm',
  lodgingIcon: 'w-4 h-4 text-royal-purple',
  accessibility: 'pt-2',
  accessibilityTag: 'bg-green-600/30 text-green-300 text-xs px-2 py-1 rounded-full',

  // Transportation-specific styles
  transportationDetails: 'space-y-4 pt-2 border-t border-royal-purple/20',
  transportType: 'space-y-2',
  typeGrid: 'flex flex-wrap gap-2',
  typeTag: 'bg-royal-purple/30 text-parchment-white text-xs px-2 py-1 rounded-full',

  // Leisure-specific styles
  leisureDetails: 'space-y-4 pt-2 border-t border-royal-purple/20',
  attractionType: 'space-y-2',
  summary: 'space-y-2',
  summaryText: 'text-mist-gray text-sm leading-relaxed',

  // Other-specific styles
  otherDetails: 'space-y-4 pt-2 border-t border-royal-purple/20',
  contactInfo: 'space-y-2',
  contactItem: 'flex items-center gap-2 text-mist-gray text-sm',
  contactIcon: 'w-4 h-4 text-royal-purple',

  // Common styles
  websiteLink: 'text-mist-gray hover:text-royal-purple/80 underline transition-colors',
  photosSection: 'flex items-center gap-2',
  baseInfoSection: 'flex items-center gap-4 flex-wrap',
  priceRange: 'flex items-center gap-2 text-mist-gray text-sm',
};
