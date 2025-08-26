import { CardPlaceInfo } from ".";
import { Place } from "@/lib/types/places";
import { UtensilsCrossed } from "lucide-react";

interface FoodServicesProps {
  place: Place;
}

const Description = ({ place }: { place: Place }) => {
  const hasServices = place.takeout || place.delivery || place.dineIn || place.reservable;
  
  if (!hasServices) return null;
  
  return (
    <div className={styles.servicesText}>
      Serviços disponíveis
    </div>
  );
};

export default function FoodServices({ place }: FoodServicesProps) {
  const hasServices = place.takeout || place.delivery || place.dineIn || place.reservable;
  
  if (!hasServices) return null;

  return (
    <CardPlaceInfo
      title="Serviços"
      description={<Description place={place} />}>
      <div className={styles.servicesSection}>
        <div className={styles.serviceGrid}>
          {place.takeout && (
            <div className={styles.serviceItem}>
              <span className={styles.serviceText}>Para viagem</span>
            </div>
          )}
          {place.delivery && (
            <div className={styles.serviceItem}>
              <span className={styles.serviceText}>Delivery</span>
            </div>
          )}
          {place.dineIn && (
            <div className={styles.serviceItem}>
              <span className={styles.serviceText}>Local</span>
            </div>
          )}
          {place.reservable && (
            <div className={styles.serviceItem}>
              <span className={styles.serviceText}>Reservas</span>
            </div>
          )}
        </div>
      </div>
    </CardPlaceInfo>
  );
}

const styles = {
  servicesSection: 'flex flex-col items-start gap-2',
  servicesText: 'text-mist-gray text-sm',
  
  serviceGrid: 'flex flex-wrap gap-2 w-full',
  serviceItem: 'flex items-center gap-2 text-mist-gray text-xs',
  serviceIcon: 'w-3 h-3 text-royal-purple',
  serviceText: 'bg-royal-purple/80 text-parchment-white text-xs px-2 py-1 rounded-full',
};
