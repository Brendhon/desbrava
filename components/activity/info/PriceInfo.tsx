import { CardPlaceInfo } from ".";
import { Place } from "@/lib/types/places";
import { DollarSign, DollarSignIcon } from "lucide-react";

interface PriceInfoProps {
  place: Place;
}

const Description = ({ place }: { place: Place }) => {
  const hasPriceInfo = place.priceLevel || place.priceRange;
  
  if (!hasPriceInfo) return null;
  
  return (
    <div className={styles.priceText}>
      Informações de preço disponíveis
    </div>
  );
};

export default function PriceInfo({ place }: PriceInfoProps) {
  const hasPriceInfo = place.priceLevel || place.priceRange;
  
  if (!hasPriceInfo) return null;

  return (
    <CardPlaceInfo
      title="Informações de Preço"
      description={<Description place={place} />}>
      <div className={styles.priceSection}>
        {place.priceLevel && (
          <div className={styles.priceItem}>
            <DollarSign className={styles.priceIcon} />
            <div className={styles.priceDetails}>
              <span className={styles.priceLabel}>Nível de Preço:</span>
              <span className={styles.priceValue}>
                {formatPriceLevel(place.priceLevel)}
              </span>
            </div>
          </div>
        )}

        {place.priceRange && (
          <div className={styles.priceItem}>
            <DollarSignIcon className={styles.priceIcon} />
            <div className={styles.priceDetails}>
              <span className={styles.priceLabel}>Faixa de Preço:</span>
              <span className={styles.priceValue}>
                {place.priceRange.startPrice.units} - {place.priceRange.endPrice.units} {place.priceRange.startPrice.currencyCode}
              </span>
            </div>
          </div>
        )}
      </div>
    </CardPlaceInfo>
  );
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
  priceSection: 'flex flex-col items-start gap-3',
  priceText: 'text-mist-gray text-sm',
  
  priceItem: 'flex items-start gap-3 w-full',
  priceIcon: 'w-4 h-4 text-royal-purple mt-0.5 flex-shrink-0',
  priceDetails: 'flex flex-col gap-1',
  priceLabel: 'text-mist-gray text-xs font-medium',
  priceValue: 'text-mist-gray text-sm',
};
