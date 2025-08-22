import { Place } from '@/lib/types/places';

interface PlaceInfoProps {
  place: Place;
}

export default function PlaceInfo({ place }: PlaceInfoProps) {
  return (
    <div className={styles.container}>
      <p className={styles.name}>
        {place.displayName.text}
      </p>
      {place.formattedAddress && (
        <p className={styles.address}>
          {place.formattedAddress}
        </p>
      )}
    </div>
  );
}

const styles = {
  container: 'bg-royal-purple/20 border-royal-purple/30 rounded-lg border p-3',
  name: 'text-parchment-white font-medium',
  address: 'text-mist-gray text-sm',
};
