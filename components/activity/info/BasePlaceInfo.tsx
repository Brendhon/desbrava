import { CardPlaceInfo } from ".";
import { Place } from "@/lib/types/places";
import { MapPin, Star } from "lucide-react";

interface BasePlaceInfoProps {
  place: Place;
}

const Description = ({ place }: { place: Place }) => {
  if (!place.formattedAddress) return null;

  return (
    place.rating && (
      <div className={styles.rating}>
        <Star className={styles.starIcon} />
        <span className={styles.ratingText}>
          {place.rating.toFixed(1)} ({place.userRatingCount || 0})
        </span>
      </div>
    )
  );
};

export default function BasePlaceInfo({ place }: BasePlaceInfoProps) {
  if (!place.formattedAddress) return null;

  return (
    <CardPlaceInfo
      title={place.displayName.text}
      description={<Description place={place} />}>
      <div className={styles.locationSection}>
        <div className={styles.addressItem}>
          <MapPin className={styles.addressIcon} />
          <p className={styles.address}>{place.formattedAddress}</p>
        </div>
      </div>
    </CardPlaceInfo>
  );
}

const styles = {
  locationSection: 'flex flex-col items-start gap-2',
  locationText: 'text-mist-gray text-sm',

  addressItem: 'flex items-start gap-3 w-full',
  addressIcon: 'w-4 h-4 text-royal-purple mt-0.5 flex-shrink-0',
  address: 'text-mist-gray text-sm leading-relaxed',

  rating: 'flex items-center gap-2',
  starIcon: 'w-4 h-4 text-yellow-400 fill-current',
  ratingText: 'text-mist-gray text-sm',
};
