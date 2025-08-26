import { Place } from '@/lib/types/places';
import { Star } from 'lucide-react';
import { CardPlaceInfo } from '.';

interface AccommodationInfoProps {
  place: Place;
}

const Description = ({ place }: { place: Place }) => {
  if (!place.lodging) return null;

  return (
    <div className={styles.accommodationText}>Informações da acomodação</div>
  );
};

export default function AccommodationInfo({ place }: AccommodationInfoProps) {
  if (!place.lodging) return null;

  return (
    <CardPlaceInfo
      title="Informações da Acomodação"
      description={<Description place={place} />}
    >
      <div className={styles.accommodationSection}>
        {place.lodging.rating && (
          <div className={styles.ratingItem}>
            <Star className={styles.ratingIcon} />
            <div className={styles.ratingDetails}>
              <span className={styles.ratingLabel}>Avaliação:</span>
              <span className={styles.ratingValue}>
                {place.lodging.rating.toFixed(1)} (
                {place.lodging.userRatingCount || 0})
              </span>
            </div>
          </div>
        )}
      </div>
    </CardPlaceInfo>
  );
}

const styles = {
  accommodationSection: 'flex flex-col items-start gap-2',
  accommodationText: 'text-mist-gray text-sm',

  ratingItem: 'flex items-start gap-3 w-full',
  ratingIcon: 'w-4 h-4 text-yellow-400 fill-current mt-0.5 flex-shrink-0',
  ratingDetails: 'flex flex-col gap-1',
  ratingLabel: 'text-mist-gray text-xs font-medium',
  ratingValue: 'text-mist-gray text-sm',
};
