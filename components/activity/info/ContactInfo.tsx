import { CardPlaceInfo } from ".";
import { Place } from "@/lib/types/places";
import { Phone, Globe } from "lucide-react";

interface ContactInfoProps {
  place: Place;
}

const Description = ({ place }: { place: Place }) => {
  const hasContactInfo = place.internationalPhoneNumber || place.nationalPhoneNumber || place.websiteUri;
  
  if (!hasContactInfo) return null;
  
  return (
    <div className={styles.contactText}>
      Informações de contato disponíveis
    </div>
  );
};

export default function ContactInfo({ place }: ContactInfoProps) {
  const hasContactInfo = place.internationalPhoneNumber || place.nationalPhoneNumber || place.websiteUri;
  
  if (!hasContactInfo) return null;

  return (
    <CardPlaceInfo
      title="Informações de Contato"
      description={<Description place={place} />}>
      <div className={styles.contactSection}>
        {place.internationalPhoneNumber && (
          <div className={styles.contactItem}>
            <Phone className={styles.contactIcon} />
            <div className={styles.contactDetails}>
              <span className={styles.contactLabel}>Telefone Internacional:</span>
              <span className={styles.contactValue}>{place.internationalPhoneNumber}</span>
            </div>
          </div>
        )}

        {place.nationalPhoneNumber && (
          <div className={styles.contactItem}>
            <Phone className={styles.contactIcon} />
            <div className={styles.contactDetails}>
              <span className={styles.contactLabel}>Telefone Nacional:</span>
              <span className={styles.contactValue}>{place.nationalPhoneNumber}</span>
            </div>
          </div>
        )}

        {place.websiteUri && (
          <div className={styles.contactItem}>
            <Globe className={styles.contactIcon} />
            <div className={styles.contactDetails}>
              <span className={styles.contactLabel}>Website:</span>
              <a
                href={place.websiteUri}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.websiteLink}
              >
                Visitar site
              </a>
            </div>
          </div>
        )}
      </div>
    </CardPlaceInfo>
  );
}

const styles = {
  contactSection: 'flex flex-col items-start gap-3',
  contactText: 'text-mist-gray text-sm',
  
  contactItem: 'flex items-start gap-3 w-full',
  contactIcon: 'w-4 h-4 text-royal-purple mt-0.5 flex-shrink-0',
  contactDetails: 'flex flex-col gap-1',
  contactLabel: 'text-mist-gray text-xs font-medium',
  contactValue: 'text-mist-gray text-sm',
  websiteLink: 'text-mist-gray hover:text-royal-purple/80 underline transition-colors text-sm',
};
