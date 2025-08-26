import { Place } from '@/lib/types/places';
import { CardPlaceInfo } from '.';

interface EditorialSummaryProps {
  place: Place;
}

const Description = ({ place }: { place: Place }) => {
  if (!place.editorialSummary) return null;

  return <div className={styles.summaryText}>Descrição do local</div>;
};

export default function EditorialSummary({ place }: EditorialSummaryProps) {
  if (!place.editorialSummary) return null;

  return (
    <CardPlaceInfo
      title="Descrição"
      description={<Description place={place} />}
    >
      <div className={styles.summarySection}>
        <p className={styles.summaryContent}>{place.editorialSummary.text}</p>
      </div>
    </CardPlaceInfo>
  );
}

const styles = {
  summarySection: 'flex flex-col items-start gap-2',
  summaryText: 'text-mist-gray text-sm',

  summaryContent: 'text-mist-gray text-sm leading-relaxed',
};
