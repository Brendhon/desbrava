import { CardPlaceInfo } from '.';
import { Place } from '@/lib/types/places';
import { Clock } from 'lucide-react';

interface OpeningHoursProps {
  place: Place;
}

function Weekday({ weekday }: { weekday: string }) {
  // Split the weekday into a weekday name and a time
  const [weekdayFullName, weekdayTime] = weekday.split(/ (.+)/).filter(Boolean);

  // Remove the last character of the weekdayName
  const weekdayName = weekdayFullName.slice(0, -1);

  return (
    <div className={styles.weekday}>
      <strong className={styles.weekdayText}>{weekdayName}</strong>
      <span className={styles.weekdayText}>
        {weekdayTime.includes('24') ? '24 horas' : weekdayTime}
      </span>
    </div>
  );
}

const Description = ({ place }: { place: Place }) => {
  return (
    <div className={styles.hoursContainer}>
      <Clock className={styles.hoursIcon} />
      <span className={styles.hoursText}>
        {place.currentOpeningHours?.openNow ? 'Aberto' : 'Fechado'}
      </span>
    </div>
  );
};

export default function OpeningHours({ place }: OpeningHoursProps) {
  return (
    place.currentOpeningHours && (
      <CardPlaceInfo
        title="Horário local de funcionamento"
        description={<Description place={place} />}
      >
        <div className={styles.hoursSection}>
          {/* Periods */}
          <div className={styles.periods}>
            {place.currentOpeningHours.weekdayDescriptions.map((weekday) => (
              <Weekday key={weekday} weekday={weekday} />
            ))}
          </div>
        </div>
      </CardPlaceInfo>
    )
  );
}

const styles = {
  // Base
  hoursContainer: 'flex items-center gap-2',
  hoursSection: 'flex flex-col items-start gap-2',
  hoursText: 'text-mist-gray text-sm',
  hoursIcon: 'w-4 h-4 text-royal-purple',
  // Periods
  periods: 'pt-2 flex gap-4 flex-wrap w-full justify-between',

  // Weekday
  weekday: 'flex items-center gap-2 flex-col',
  weekdayIcon: 'w-4 h-4 text-royal-purple',
  weekdayText: 'text-mist-gray text-sm',

  // Next Open time
  nextOpenTime: 'flex items-center gap-2',
  nextOpenTimeIcon: 'w-4 h-4 text-royal-purple',
  nextOpenTimeText: 'text-mist-gray text-sm',
};
