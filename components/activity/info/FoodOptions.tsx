import { CardPlaceInfo } from ".";
import { Place } from "@/lib/types/places";
import { UtensilsCrossed } from "lucide-react";

interface FoodOptionsProps {
  place: Place;
}

const Description = ({ place }: { place: Place }) => {
  const hasOptions = place.servesBreakfast || place.servesLunch || place.servesDinner || 
                    place.servesVegetarianFood || place.servesBeer || place.servesWine;
  
  if (!hasOptions) return null;
  
  return (
    <div className={styles.optionsText}>
      Opções de alimentação disponíveis
    </div>
  );
};

export default function FoodOptions({ place }: FoodOptionsProps) {
  const hasOptions = place.servesBreakfast || place.servesLunch || place.servesDinner || 
                    place.servesVegetarianFood || place.servesBeer || place.servesWine;
  
  if (!hasOptions) return null;

  return (
    <CardPlaceInfo
      title="Opções de Alimentação"
      description={<Description place={place} />}>
      <div className={styles.optionsSection}>
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
    </CardPlaceInfo>
  );
}

const styles = {
  optionsSection: 'flex flex-col items-start gap-2',
  optionsText: 'text-mist-gray text-sm',
  
  optionGrid: 'flex flex-wrap gap-2 w-full',
  optionTag: 'bg-royal-purple/80 text-parchment-white text-xs px-2 py-1 rounded-full',
};
